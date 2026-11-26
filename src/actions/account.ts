'use server';
import { z } from 'zod'; import { redirect } from 'next/navigation'; import { revalidatePath } from 'next/cache'; import { cookies, headers } from 'next/headers';
import { ensureAccount, joinReferral } from '@/lib/loyalty';
import { live } from '@/lib/db'; import { allow, currentCustomer, endSession, hashPassword, startSession, verifyPassword } from '@/lib/auth'; import { context, track } from '@/lib/events'; import { email, flag, name, optText, parse, phone, pin, text, uuid, type FormState } from '@/lib/validate'; import { addToCart } from './cart';
const pw = z.string().min(10, 'Use at least 10 characters').max(200);
const echo = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([k, v]) => typeof v === 'string' && !k.startsWith('$') && k !== 'password' && k !== 'website').map(([k, v]) => [k, String(v)]));
const safe = (n: FormDataEntryValue | null) => typeof n === 'string' && /^\/(?![\/\\])[\w\-/?=&%.]*$/.test(n) ? n : '/account';
export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  if (fd.get('website')) return { ok: false, message: 'Unable to create account.' };
  const p = parse(z.object({ name, email, phone, password: pw, marketing: flag }), fd); if (p.state) return { ...p.state, data: echo(fd) }; if (!(await allow('signup', 6, 900))) return { ok: false, message: 'Too many attempts. Please try later.', data: echo(fd) };
  const sql = live(); const h = await hashPassword(p.data.password); const x = await context();
  const [r] = await sql`INSERT INTO customers (name, email, phone, password_hash, registered, email_opt_in, consent_at, acq_source, acq_medium, acq_campaign) VALUES (${p.data.name}, ${p.data.email}, ${p.data.phone}, ${h}, true, ${p.data.marketing}, ${p.data.marketing ? new Date() : null}, ${x.source}, ${x.medium}, ${x.campaign}) ON CONFLICT DO NOTHING RETURNING id`;
  if (!r) return { ok: false, message: 'An account with this email already exists. Please sign in.', data: echo(fd) };
  await startSession('customer', r.id); await track('signup', { customer_id: r.id }); await ensureAccount(sql, r.id); const rc = (await cookies()).get('mv_ref')?.value; if (rc && /^[A-Z0-9]{5,12}$/.test(rc)) { await joinReferral(sql, r.id, rc); await track('referral_joined', { customer_id: r.id }); (await cookies()).delete('mv_ref'); } redirect(safe(fd.get('next')));
}
export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  const p = parse(z.object({ email, password: z.string().min(1, 'Enter your password').max(200) }), fd); if (p.state) return { ...p.state, data: echo(fd) };
  if (!(await allow('login', 10, 600)) || !(await allow('login:' + p.data.email, 8, 600))) return { ok: false, message: 'Too many attempts. Please wait ten minutes.', data: echo(fd) };
  const [c] = await live()`SELECT id, password_hash FROM customers WHERE lower(email) = ${p.data.email} AND registered`;
  if (!(await verifyPassword(p.data.password, c?.password_hash))) return { ok: false, message: 'Email or password is not correct.', data: echo(fd) };
  await startSession('customer', c.id); redirect(safe(fd.get('next')));
}
export async function signOut() { await endSession('customer'); redirect('/'); }
const need = async () => { const me = await currentCustomer(); if (!me) redirect('/account'); return me; };
export async function saveProfile(_: FormState, fd: FormData): Promise<FormState> { const me = await need(); const p = parse(z.object({ name, phone, wa: flag, em: flag, birthday: z.union([z.literal('').transform(() => null), z.iso.date()]).nullish() }), fd); if (p.state) return p.state; await live()`UPDATE customers SET name = ${p.data.name}, phone = ${p.data.phone}, birthday = COALESCE(birthday, ${p.data.birthday ?? null}), wa_opt_in = ${p.data.wa}, email_opt_in = ${p.data.em}, consent_at = now() WHERE id = ${me.id}`; revalidatePath('/account'); return { ok: true, message: 'Saved.' }; }
export async function saveAddress(_: FormState, fd: FormData): Promise<FormState> {
  const me = await need(); const p = parse(z.object({ label: text(30).min(1, 'Add a label'), name, phone, line: text(240).min(8, 'Enter a full address'), landmark: optText(120), pin, city: text(60).min(2, 'Enter a city'), state: text(60).min(2, 'Choose a state') }), fd); if (p.state) return { ...p.state, data: echo(fd) };
  const sql = live(); const [{ n }] = await sql`SELECT count(*)::int AS n FROM addresses WHERE customer_id = ${me.id}`; if (n >= 10) return { ok: false, message: 'You can save up to ten addresses.' };
  await sql`INSERT INTO addresses ${sql({ ...p.data, customer_id: me.id, is_default: n === 0 })}`; revalidatePath('/account'); return { ok: true, message: 'Address saved.' };
}
export async function deleteAddress(fd: FormData) { const me = await need(); const id = uuid.safeParse(fd.get('id')); if (id.success) await live()`DELETE FROM addresses WHERE id = ${id.data} AND customer_id = ${me.id}`; revalidatePath('/account'); }
export async function toggleWish(product: string): Promise<{ on: boolean; signin?: boolean }> {
  const me = await currentCustomer(); if (!me) return { on: false, signin: true }; if (!uuid.safeParse(product).success) return { on: false }; const sql = live();
  if ((await sql`DELETE FROM wishlists WHERE customer_id = ${me.id} AND product_id = ${product}`).count) return { on: false };
  await sql`INSERT INTO wishlists (customer_id, product_id) SELECT ${me.id}, id FROM products WHERE id = ${product} ON CONFLICT DO NOTHING`; await track('wishlist_add', { product_id: product, customer_id: me.id }); return { on: true };
}
export async function removeWish(fd: FormData) { await need(); await toggleWish(String(fd.get('id'))); revalidatePath('/account/wishlist'); }
export async function reorder(fd: FormData) {
  const me = await need(); const id = uuid.safeParse(fd.get('id')); if (!id.success) return; const its = await live()`SELECT i.variant_id, i.qty FROM order_items i JOIN orders o ON o.id = i.order_id WHERE o.id = ${id.data} AND o.customer_id = ${me.id} AND i.custom_id IS NULL`; await track('reorder', { customer_id: me.id });
  for (const i of its) await addToCart(i.variant_id, i.qty); void (await headers()); redirect('/cart');
}
