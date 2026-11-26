'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { live } from '@/lib/db';
import { cartId, getCart, loadCoupon, type CartView } from '@/lib/cart';
import { allow, currentCustomer, token } from '@/lib/auth';
import { getSettings } from '@/lib/settings';
import { GiftCfg, MixCfg, requote, type GiftCfgT } from '@/lib/custom';
import { track } from '@/lib/events';
export type CartResult = { cart: CartView; error?: string; message?: string };
const Id = z.uuid(), Qty = z.number().int().min(0).max(50);
const lim = () => allow('cart', 120, 60);
export async function fetchCart(): Promise<CartResult> { return { cart: await getCart() }; }
export async function addToCart(variant: string, qty = 1): Promise<CartResult> {
  if (!Id.safeParse(variant).success || !Qty.safeParse(qty).success || qty < 1 || !(await lim())) return { cart: await getCart(), error: 'Could not add this item. Please try again.' };
  const sql = live();
  const [v] = await sql`SELECT v.id, v.price_paise, p.name, p.id AS pid, p.kind, st.avail, st.on_sale, st.reason FROM product_variants v JOIN products p ON p.id = v.product_id JOIN variant_state st ON st.variant_id = v.id WHERE v.id = ${variant}`;
  if (!v) return { cart: await getCart(), error: 'This product is not available.' };
  if (!v.on_sale) return { cart: await getCart(), error: `${v.name}: ${(v.reason || 'not available').toLowerCase()}.` };
  const id = (await cartId(true))!; const [cur] = await sql`SELECT qty FROM cart_items WHERE cart_id = ${id} AND variant_id = ${variant} AND custom_id IS NULL`;
  const next = Math.min(50, (cur?.qty || 0) + qty); if (v.avail != null && next > v.avail) return { cart: await getCart(), error: v.avail === 0 ? `${v.name} is out of stock.` : `Only ${v.avail} available.` };
  await sql`INSERT INTO cart_items (cart_id, variant_id, qty) VALUES (${id}, ${variant}, ${next}) ON CONFLICT (cart_id, variant_id) WHERE custom_id IS NULL DO UPDATE SET qty = ${next}`;
  const cust = (await currentCustomer())?.id ?? null; await sql`UPDATE carts SET updated_at = now(), customer_id = COALESCE(${cust}, customer_id) WHERE id = ${id}`;
  await track('add_to_cart', { product_id: v.pid, customer_id: cust, props: { variant_id: variant, qty, value: v.price_paise * qty } });
  return { cart: await getCart(), message: `${v.name} added to your cart` };
}
export async function setQty(line: string, qty: number): Promise<CartResult> {
  if (!Id.safeParse(line).success || !Qty.safeParse(qty).success || !(await lim())) return { cart: await getCart(), error: 'Could not update the cart.' };
  const id = await cartId(); if (!id) return { cart: await getCart() }; const sql = live();
  const [cur] = await sql`SELECT ci.qty, ci.variant_id, v.product_id FROM cart_items ci JOIN product_variants v ON v.id = ci.variant_id WHERE ci.cart_id = ${id} AND ci.id = ${line}`; if (!cur) return { cart: await getCart() };
  if (qty === 0) await sql`DELETE FROM cart_items WHERE cart_id = ${id} AND id = ${line}`; else await sql`UPDATE cart_items SET qty = ${qty} WHERE cart_id = ${id} AND id = ${line}`;
  await sql`UPDATE carts SET updated_at = now() WHERE id = ${id}`;
  if (qty < cur.qty) await track('remove_from_cart', { product_id: cur.product_id, props: { variant_id: cur.variant_id, qty: cur.qty - qty } }); else if (qty > cur.qty) await track('add_to_cart', { product_id: cur.product_id, props: { variant_id: cur.variant_id, qty: qty - cur.qty } });
  return { cart: await getCart() };
}
export async function applyCoupon(code: string): Promise<CartResult> {
  const c = code.trim().toUpperCase().slice(0, 24); const id = await cartId(); if (!id || !c) return { cart: await getCart() };
  if (!(await allow('coupon', 12, 300))) return { cart: await getCart(), error: 'Too many attempts. Please wait a few minutes.' };
  const { error } = await loadCoupon(live(), c, { customer: (await currentCustomer())?.id }); if (error) return { cart: await getCart(), error };
  await live()`UPDATE carts SET coupon_code = ${c} WHERE id = ${id}`; const cart = await getCart();
  if (cart.price.couponDiscount) await track('coupon_applied', { customer_id: (await currentCustomer())?.id ?? null, props: { code: c, discount: cart.price.couponDiscount } });
  return cart.price.couponDiscount ? { cart, message: 'Code applied' } : { cart, error: cart.price.couponNote || 'This code does not change your total.' };
}
export async function removeCoupon(): Promise<CartResult> { const id = await cartId(); if (id) await live()`UPDATE carts SET coupon_code = NULL WHERE id = ${id}`; return { cart: await getCart() }; }
export async function applyPoints(n: number): Promise<CartResult> { const id = await cartId(); if (!id || !Number.isInteger(n) || n < 0 || n > 1e6 || !(await currentCustomer())) return { cart: await getCart(), error: 'Sign in to use points.' }; await live()`UPDATE carts SET use_points = ${n} WHERE id = ${id}`; const cart = await getCart(); return n && !cart.price.pointsUsed ? { cart, error: cart.price.pointsNote || 'Points cannot be used on this order.' } : { cart, message: n ? `${cart.price.pointsUsed} points applied` : undefined }; }
export async function setDate(d: string | null): Promise<CartResult> { const id = await cartId(); const s = await getSettings(); if (!id) return { cart: await getCart() }; if (d && (!s.gift.allow_dates || !/^\d{4}-\d{2}-\d{2}$/.test(d) || Date.parse(d) < Date.now() + (s.gift.lead_days - 1) * 864e5)) return { cart: await getCart(), error: `Choose a date at least ${s.gift.lead_days} days away.` }; await live()`UPDATE carts SET delivery_date = ${d} WHERE id = ${id}`; return { cart: await getCart() }; }
export async function addCustom(kind: 'mix' | 'gift', config: unknown): Promise<CartResult & { ok?: boolean }> {
  if (!(await lim())) return { cart: await getCart(), error: 'Please wait a moment and try again.' }; const s = await getSettings(), sql = live(); const p = (kind === 'mix' ? MixCfg : GiftCfg).safeParse(config); if (!p.success) return { cart: await getCart(), error: 'Please check your choices.' }; const q = await requote(sql, kind, p.data, s); if (!q.ok) return { cart: await getCart(), error: q.error };
  const me = (await currentCustomer())?.id ?? null; const id = (await cartId(true))!; const g = kind === 'gift' ? (p.data as GiftCfgT) : null;
  await sql.begin(async t => { const [n] = await t`SELECT count(*)::int AS n FROM cart_items WHERE cart_id=${id} AND custom_id IS NOT NULL`; if (n.n >= 10) return; const [c] = await t`INSERT INTO custom_items (kind, title, config, price_paise, list_paise, weight_g, gift_message, gift_token, customer_id) VALUES (${kind}, ${q.title}, ${t.json(p.data as never)}, ${q.price}, ${q.list}, ${q.weight}, ${g?.message || null}, ${g ? token(15) : null}, ${me}) RETURNING id`; await t`INSERT INTO cart_items (cart_id, variant_id, qty, custom_id) SELECT ${id}, id, 1, ${c.id} FROM product_variants WHERE sku=${kind === 'mix' ? 'SYS-MIX' : 'SYS-GIFT'}`; await t`UPDATE carts SET updated_at=now() WHERE id=${id}`; });
  await track(kind === 'mix' ? 'mix_added' : 'gift_configured', { customer_id: me, props: { value: q.price, weight: q.weight } }); const [pr] = await sql`SELECT product_id FROM product_variants WHERE sku=${kind === 'mix' ? 'SYS-MIX' : 'SYS-GIFT'}`; await track('add_to_cart', { product_id: pr.product_id, customer_id: me, props: { value: q.price, custom: kind } }); return { cart: await getCart(), message: `${q.title} added to your cart`, ok: true };
}
export async function beginCheckout() {
  const id = await cartId(); if (!id) return; const r = await live()`UPDATE carts SET checkout_started_at = now() WHERE id = ${id} AND checkout_started_at IS NULL RETURNING id`;
  if (r.count) await track('checkout_started', { customer_id: (await currentCustomer())?.id ?? null, path: '/checkout' });
}
export async function setAnalyticsOptOut(off: boolean) { const c = await cookies(); if (off) { c.set('mv_optout', '1', { path: '/', maxAge: 31536000, sameSite: 'lax' }); c.delete('mv_vid'); c.delete('mv_sid'); c.delete('mv_utm'); } else c.delete('mv_optout'); }
