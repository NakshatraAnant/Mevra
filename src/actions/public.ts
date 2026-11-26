'use server';
import { z } from 'zod'; import { randomInt } from 'node:crypto';
import { live, demo } from '@/lib/db'; import { allow, currentCustomer } from '@/lib/auth'; import { getSettings, waLink } from '@/lib/settings'; import { context, track } from '@/lib/events';
import { email, flag, gstin as _g, name, optEmail, optGstin, optText, parse, phone, pin, text, type FormState, PIN_STATE, uuid } from '@/lib/validate';
void _g;
const ref = (p: string) => p + '-' + Array.from({ length: 6 }, () => '23456789ABCDEFGHJKMNPQRSTUVWXYZ'[randomInt(31)]).join('');
const echo = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([k, v]) => typeof v === 'string' && !k.startsWith('$') && k !== 'website').map(([k, v]) => [k, String(v).slice(0, 1000)]));
const bot = (fd: FormData) => !!fd.get('website');
const addr = z.union([email.transform(a => ({ channel: 'email', a })), phone.transform(a => ({ channel: 'whatsapp', a }))]);
const CONSENT = 'I agree to receive occasional updates from MEVRA on this channel. I can withdraw at any time.';

export async function subscribe(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; if (!(await allow('subscribe', 6, 600))) return { ok: false, message: 'Too many attempts. Please try later.' };
  const ch = fd.get('channel') === 'whatsapp' ? 'whatsapp' : 'email'; const r = (ch === 'email' ? email : phone).safeParse(String(fd.get('address') || ''));
  const errors: Record<string, string> = {}; if (!r.success) errors.address = ch === 'email' ? 'Enter a valid email address' : 'Enter a valid 10-digit mobile number'; if (fd.get('consent') !== 'on') errors.consent = 'Please tick the box so we have your consent.';
  if (Object.keys(errors).length) return { ok: false, errors };
  await live()`INSERT INTO subscribers (channel, address, purpose, consent_text) VALUES (${ch}, ${r.data as string}, 'news', ${CONSENT}) ON CONFLICT (channel, address, purpose) DO UPDATE SET unsubscribed_at = NULL`;
  return { ok: true, message: 'You are on the list. Thank you.' };
}
export async function notifyMe(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; if (!(await allow('notify', 8, 600))) return { ok: false, message: 'Too many attempts. Please try later.' };
  const a = addr.safeParse(String(fd.get('address') || '')); const slug = text(80).safeParse(fd.get('slug')); if (!a.success || !slug.success) return { ok: false, errors: { address: 'Enter a valid email address or 10-digit mobile number' } };
  const [p] = await live()`SELECT id FROM products WHERE slug = ${slug.data}`; if (!p) return { ok: false, message: 'Product not found.' };
  await live()`INSERT INTO subscribers (channel, address, purpose, consent_text) VALUES (${a.data.channel}, ${a.data.a}, ${'notify:' + slug.data}, 'One availability message for this product') ON CONFLICT DO NOTHING`;
  return { ok: true, message: 'Noted. We will send you one message when it is available.' };
}
export type LotResult = { message: string; demo?: boolean; lot?: { lot_number: string; product: string; grade: string | null; origin: string | null; packing_date: string | null; best_before: string | null; testing_status: 'not_tested' | 'awaiting_result' | 'passed' | 'failed'; verified: boolean; certificate: string | null } };
export async function lookupLot(q: string): Promise<LotResult> {
  const n = String(q).trim().toUpperCase().slice(0, 40); if (!/^[A-Z0-9][A-Z0-9/_-]{2,39}$/.test(n)) return { message: 'That does not look like a lot number.' };
  if (!(await allow('lot', 30, 60))) return { message: 'Too many lookups. Please wait a minute.' };
  const isDemo = n.startsWith('DEMO-'); const sql = isDemo ? demo() : live();
  const [l] = await sql`SELECT l.*, p.name || ', ' || v.label AS product, (SELECT c.id FROM lot_certificates c WHERE c.lot_id = l.id ORDER BY created_at DESC LIMIT 1) AS cert FROM lots l JOIN product_variants v ON v.id = l.variant_id JOIN products p ON p.id = v.product_id WHERE upper(l.lot_number) = ${n} AND l.published`;
  if (!l) return { message: 'We have no published record for this lot number.' };
  const d = (x: Date | null) => x ? new Date(x).toISOString() : null;
  return { message: '', demo: isDemo, lot: { lot_number: l.lot_number, product: l.product, grade: l.grade, origin: l.origin, packing_date: d(l.packing_date), best_before: d(l.best_before), testing_status: l.testing_status, verified: l.verified, certificate: l.cert && l.verified && !isDemo ? `/api/certificates/${l.cert}` : null } };
}
export async function checkPin(p: string): Promise<{ ok: boolean; message: string; cod?: boolean }> {
  const r = pin.safeParse(p); if (!r.success) return { ok: false, message: 'Enter a valid 6-digit PIN code.' }; if (!(await allow('pin', 40, 60))) return { ok: false, message: 'Please wait a moment and try again.' };
  const s = await getSettings(); const z = s.delivery.zones.find(z => z.prefixes.some(x => r.data.startsWith(x))); const cod = s.commerce.cod_enabled && !s.commerce.cod_blocked_pins.includes(r.data);
  const st = PIN_STATE[r.data.slice(0, 2)]; return { ok: true, cod, message: z ? `Estimated delivery in ${z.min}–${z.max} days (${z.label}).` : `${st ? st + ': ' : ''}${s.delivery.note}` };
}
const base = { name, phone, email: optEmail, notes: optText(1000) };
const G = z.object({ ...base, kind: z.enum(['gifting_corporate', 'gifting_wedding', 'gifting_festival', 'gifting_personal']), organisation: text(120).min(2, 'Enter a company or family name'), occasion: text(80).min(2, 'Tell us the occasion'), quantity: z.coerce.number('Enter a number').int().min(1, 'Enter the number of boxes').max(100000), delivery_date: z.iso.date('Choose a date'), budget: optText(60), customisation: optText(600), city: text(60).min(2, 'Enter a city'), guests: optText(10), style: optText(40), inserts: optText(300), gstin: optGstin, sample: optText(5) });
export async function giftEnquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; const p = parse(G, fd); if (p.state) return { ...p.state, data: echo(fd) }; const d = p.data; const s = await getSettings();
  const min = { gifting_corporate: s.gifting.min_corporate, gifting_wedding: s.gifting.min_wedding, gifting_festival: s.gifting.min_festival, gifting_personal: 1 }[d.kind];
  if (d.quantity < min) return { ok: false, errors: { quantity: `Our minimum for this service is ${min} boxes` }, message: 'Please check the highlighted fields.', data: echo(fd) };
  if (new Date(d.delivery_date) <= new Date()) return { ok: false, errors: { delivery_date: 'Choose a future date' }, message: 'Please check the highlighted fields.', data: echo(fd) };
  return save(d.kind, 'GFT', d, { occasion: d.occasion, quantity: d.quantity, delivery_date: d.delivery_date, budget_per_box: d.budget, customisation: d.customisation, city: d.city, guests: d.guests, gift_style: d.style, inserts: d.inserts, gstin: d.gstin, gst_invoice: !!d.gstin, sample_requested: d.sample === 'Yes', notes: d.notes }, `gifting enquiry for ${d.quantity} boxes`, fd);
}
const B = z.object({ ...base, organisation: text(120).min(2, 'Enter your business name'), business_type: text(60).min(2, 'Choose a business type'), monthly_kg: z.coerce.number('Enter a number').min(1, 'Enter an approximate quantity').max(1e6), products: text(400).min(2, 'Tell us what you need'), pin: text(80).min(2, 'Enter an area or PIN code'), gstin: optGstin, sample_kit: flag });
export async function businessEnquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; const p = parse(B, fd); if (p.state) return { ...p.state, data: echo(fd) }; const d = p.data;
  return save('b2b', 'B2B', d, { business_type: d.business_type, monthly_kg: d.monthly_kg, products: d.products, delivery_area: d.pin, gstin: d.gstin, sample_kit: d.sample_kit, notes: d.notes }, `business enquiry for about ${d.monthly_kg} kg a month`, fd);
}
const K = z.object({ name, phone, email: optEmail, topic: text(120).min(2, 'Choose a topic'), message: text(1000).min(5, 'Please write a short message'), order_no: optText(30) });
export async function contactEnquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; const p = parse(K, fd); if (p.state) return { ...p.state, data: echo(fd) }; const d = p.data;
  return save('contact', 'MSG', d, { topic: d.topic, message: d.message, order_no: d.order_no }, `message about: ${d.topic}`, fd);
}
async function save(kind: string, pre: string, d: { name: string; phone: string; email: string | null; organisation?: string }, details: Record<string, string | number | boolean | null>, line: string, fd: FormData): Promise<FormState> {
  if (!(await allow('enquiry', 6, 900))) return { ok: false, message: 'Too many requests. Please try again in a few minutes.', data: echo(fd) };
  const ctx = await context(); const r = ref(pre); const sql = live();
  await sql`INSERT INTO enquiries ${sql({ ref: r, kind, name: d.name, organisation: d.organisation ?? null, phone: d.phone, email: d.email, details: sql.json(details), source: ctx.source, medium: ctx.medium, campaign: ctx.campaign })}`;
  await track('enquiry_submitted', { props: { kind } }, sql, ctx);
  const s = await getSettings(); const n = s.business.whatsapp.replace(/\D/g, ''); const wa = waLink(n.length === 10 ? '91' + n : n, `Hello MEVRA, I have just sent a ${line}. Reference ${r}.`);
  return { ok: true, message: 'Thank you. Your request is with our team.', data: { ref: r, ...(wa ? { wa } : {}) } };
}
const RV = z.object({ product_id: uuid, name, rating: z.coerce.number('Choose a rating').int().min(1, 'Choose a rating').max(5), title: text(80), body: text(1500).min(10, 'Please write a little more') });
export async function submitReview(_: FormState, fd: FormData): Promise<FormState> {
  if (bot(fd)) return { ok: true, message: 'Thank you.' }; const p = parse(RV, fd); if (p.state) return { ...p.state, data: echo(fd) }; if (!(await allow('review', 4, 3600))) return { ok: false, message: 'Too many reviews. Please try later.' };
  const me = await currentCustomer(); const sql = live(); const [o] = me ? await sql`SELECT o.id FROM orders o JOIN order_items i ON i.order_id = o.id WHERE o.customer_id = ${me.id} AND i.product_id = ${p.data.product_id} AND o.status = 'delivered' LIMIT 1` : [];
  if (!(await sql`SELECT 1 FROM products WHERE id = ${p.data.product_id} AND active`).length) return { ok: false, message: 'Product not found.' };
  await sql`INSERT INTO reviews ${sql({ ...p.data, customer_id: me?.id ?? null, order_id: o?.id ?? null, verified_purchase: !!o })}`;
  return { ok: true, message: 'Thank you. Your review will appear once our team has read it.' };
}
