import 'server-only';
import { cookies } from 'next/headers';
import { live, type AnySql, type Tx } from './db';
import { sha, token, cookieOpts } from './auth';
import { getSettings, type Settings } from './settings';
import { priceCart, type PCoupon, type PLine, type PPoints, type Priced } from './pricing';
import { currentCustomer } from './auth';
import { account } from './loyalty';
import { requote } from './custom';
import { loadSettings } from './settings';

export type CartLine = { id: string; custom: { id: string; kind: 'mix' | 'gift'; lines: { name: string; g: number }[]; message: string | null } | null; promo_ok: boolean; loyalty_ok: boolean; ceiling_bp: number | null; floor: number | null; variant_id: string; product_id: string; slug: string; name: string; grade: string | null; sku: string; label: string; family: string; image: string; qty: number; unit: number; list: number; bundle: boolean; gst_bp: number | null; avail: number | null; problem: string | null };
export type CartView = { id: string | null; lines: CartLine[]; count: number; coupon: string | null; points: { balance: number; use: number; value: number; min: number; earn: number } | null; date: string | null; reward: { id: string; name: string } | null; price: Priced; addon: { slug: string; name: string; label: string; price: number; image: string; variant_id: string; grade: string | null } | null };

export const CART_COOKIE = 'mv_cart';
export async function cartId(create = false): Promise<string | null> {
  const c = await cookies(); const t = c.get(CART_COOKIE)?.value;
  if (t) { const [r] = await live()<{ id: string }[]>`SELECT id FROM carts WHERE token_hash = ${sha(t)} AND status = 'open'`; if (r) return r.id; }
  if (!create) return null;
  const nt = token(); const [r] = await live()<{ id: string }[]>`INSERT INTO carts (token_hash, visitor_id) VALUES (${sha(nt)}, ${c.get('mv_vid')?.value ?? null}) RETURNING id`;
  c.set(CART_COOKIE, nt, cookieOpts(60 * 86400)); return r.id;
}
export async function cartLines(sql: AnySql, id: string): Promise<CartLine[]> {
  const rows = await sql<(CartLine & { on_sale: boolean; reason: string | null; ck: 'mix' | 'gift' | null; cid: string | null; cfg: unknown; ctitle: string; cprice: number; cmsg: string | null; pk: number | null; pc: number | null })[]>`
    SELECT ci.id, ci.variant_id, p.id AS product_id, p.slug, p.name, p.grade, p.family, v.sku, v.label, ci.qty, v.price_paise AS unit, p.kind <> 'single' AS bundle, v.gst_rate_bp AS gst_bp, p.promo_ok, p.loyalty_ok, v.discount_ceiling_bp AS ceiling_bp, st.on_sale, st.reason, st.avail, c.kind AS ck, c.id AS cid, c.config AS cfg, c.title AS ctitle, c.price_paise AS cprice, c.gift_message AS cmsg, vc.product_cost_paise AS pc, vc.packaging_cost_paise AS pk,
      (SELECT src FROM product_images i WHERE i.product_id = p.id ORDER BY sort LIMIT 1) AS image,
      CASE WHEN p.kind = 'bundle' THEN (SELECT sum(x.price_paise * bc.qty)::int FROM bundle_components bc JOIN product_variants x ON x.id = bc.component_variant_id WHERE bc.bundle_variant_id = v.id HAVING bool_and(x.price_paise IS NOT NULL)) ELSE v.price_paise END AS list
    FROM cart_items ci JOIN product_variants v ON v.id = ci.variant_id JOIN products p ON p.id = v.product_id JOIN variant_state st ON st.variant_id = v.id LEFT JOIN variant_costs vc ON vc.variant_id = v.id LEFT JOIN custom_items c ON c.id = ci.custom_id WHERE ci.cart_id = ${id} ORDER BY ci.added_at, v.sku`;
  const s = rows.some(r => r.cid) ? await loadSettings(sql) : null; const out: CartLine[] = [];
  for (const { on_sale, reason, ck, cid, cfg, ctitle, cprice, cmsg, pc, pk, ...l } of rows) {
    if (cid && ck && s) { const q = await requote(sql, ck, cfg, s); if (q.ok && q.price !== cprice) await sql`UPDATE custom_items SET price_paise = ${q.price}, list_paise = ${q.list} WHERE id = ${cid}`; out.push({ ...l, name: q.ok ? q.title : ctitle, label: q.ok ? `${q.weight} g` : '', unit: q.ok ? q.price : cprice, list: q.ok ? q.list : cprice, bundle: true, avail: null, floor: null, custom: { id: cid, kind: ck, lines: q.ok ? q.lines.map(x => ({ name: x.name, g: x.g })) : [], message: cmsg }, problem: q.ok ? null : q.error }); continue; }
    out.push({ ...l, unit: l.unit ?? 0, list: Math.max(l.list ?? 0, l.unit ?? 0), custom: null, floor: pc != null && pk != null ? pc + pk : null, problem: !on_sale ? reason || 'No longer available' : l.avail != null && l.avail < l.qty ? (l.avail === 0 ? 'Out of stock' : `Only ${l.avail} available`) : null });
  }
  return out;
}
export const toP = (l: CartLine): PLine => ({ variantId: l.id, unit: l.unit, list: l.list, qty: l.qty, bundle: l.bundle, gstBp: l.gst_bp, promoOk: l.promo_ok, loyaltyOk: l.loyalty_ok, ceilingBp: l.ceiling_bp, floor: l.floor });
export const pointRules = (s: Settings, use: number): PPoints => ({ use, valuePaise: s.loyalty.point_value_paise, maxBp: s.loyalty.max_redeem_bp, min: s.loyalty.min_redeem });
export async function loadCoupon(sql: AnySql, code: string | null, opts: { lock?: boolean; phone?: string; customer?: string | null } = {}): Promise<{ coupon: PCoupon | null; error: string | null }> {
  if (!code) return { coupon: null, error: null };
  const [c] = opts.lock ? await sql`SELECT * FROM coupons WHERE code = ${code} FOR UPDATE` : await sql`SELECT * FROM coupons WHERE code = ${code}`;
  const now = Date.now();
  if (!c || !c.active) return { coupon: null, error: 'This code is not valid.' };
  if (c.starts_at && +new Date(c.starts_at) > now) return { coupon: null, error: 'This code is not active yet.' };
  if (c.ends_at && +new Date(c.ends_at) < now) return { coupon: null, error: 'This code has expired.' };
  if (c.usage_limit != null && c.used_count >= c.usage_limit) return { coupon: null, error: 'This code has been fully used.' };
  if (c.customer_id && c.customer_id !== (opts.customer ?? null)) return { coupon: null, error: 'This voucher belongs to another account. Sign in to use it.' };
  if (opts.phone && c.per_customer_limit != null) { const [{ n }] = await sql<{ n: number }[]>`SELECT count(*)::int AS n FROM orders WHERE coupon_code = ${code} AND phone = ${opts.phone} AND status <> 'cancelled'`; if (n >= c.per_customer_limit) return { coupon: null, error: 'You have already used this code.' }; }
  return { coupon: { code: c.code, kind: c.kind, value: c.value, scope: c.scope, minSubtotal: c.min_subtotal_paise }, error: null };
}
const ADDON: Record<string, string[]> = { almond: ['date', 'mix'], cashew: ['mix', 'date'], date: ['almond', 'makhana'], raisin: ['cashew'], makhana: ['mix', 'date'], mix: ['makhana', 'almond'], bundle: ['makhana', 'mix'] };
export async function getCart(cod = false, settings?: Settings): Promise<CartView> {
  const s = settings || await getSettings(); const id = await cartId(); const sql = live(); const me = await currentCustomer();
  if (!id) return { id: null, lines: [], count: 0, coupon: null, points: null, date: null, reward: null, price: priceCart([], s.commerce), addon: null };
  const lines = await cartLines(sql, id); const [c] = await sql<{ coupon_code: string | null; use_points: number; d: string | null; rid: string | null; rname: string | null }[]>`SELECT c.coupon_code, c.use_points, c.delivery_date::text AS d, rc.id AS rid, r.name AS rname FROM carts c LEFT JOIN reward_claims rc ON rc.id=c.reward_id AND rc.status='claimed' LEFT JOIN rewards r ON r.id=rc.reward_id WHERE c.id = ${id}`;
  const { coupon, error } = await loadCoupon(sql, c.coupon_code, { customer: me?.id }); const acc = me && s.loyalty.enabled ? await account(me.id) : null; const use = acc && !acc.flagged ? Math.min(c.use_points, Math.max(0, acc.balance)) : 0;
  const ok = lines.filter(l => l.unit > 0); const price = priceCart(ok.map(toP), s.commerce, { coupon, cod, points: use ? pointRules(s, use) : null }); if (error) price.couponNote = error;
  const eligible = ok.filter(l => l.loyalty_ok).reduce((a, l) => a + l.unit * l.qty - (price.lineDiscount[l.id] || 0), 0);
  let addon: CartView['addon'] = null;
  if (lines.length) {
    const ids = lines.map(l => l.product_id); const have = new Set(lines.map(l => l.family)); const want = lines.flatMap(l => ADDON[l.family] || []).filter(f => !have.has(f));
    const [a] = await sql`WITH co AS (SELECT y.product_id AS id, count(DISTINCT x.order_id) AS n FROM order_items x JOIN order_items y ON y.order_id=x.order_id AND y.product_id<>x.product_id WHERE x.product_id=ANY(${ids}::uuid[]) GROUP BY 1 HAVING count(DISTINCT x.order_id)>=3) SELECT p.slug, p.name, p.grade, v.label, v.price_paise AS price, v.id AS variant_id, (SELECT src FROM product_images i WHERE i.product_id = p.id ORDER BY sort LIMIT 1) AS image FROM products p JOIN product_variants v ON v.product_id = p.id JOIN variant_state st ON st.variant_id = v.id LEFT JOIN co ON co.id=p.id WHERE st.on_sale AND COALESCE(st.avail,1) > 0 AND p.kind = 'single' AND NOT p.id=ANY(${ids}::uuid[]) AND (co.n IS NOT NULL OR EXISTS (SELECT 1 FROM product_relations pr WHERE pr.product_id=ANY(${ids}::uuid[]) AND pr.related_id=p.id AND pr.kind='pair') OR p.family = ANY(${want})) ORDER BY co.n DESC NULLS LAST, abs(v.price_paise - ${Math.max(0, price.toFreeShipping)}) * ${price.toFreeShipping > 0 ? 1 : 0}::int, p.merch_rank, v.sort LIMIT 1`; addon = (a as CartView['addon']) || null;
  }
  return { id, lines, count: lines.reduce((a, l) => a + l.qty, 0), coupon: c.coupon_code, points: acc && !acc.flagged ? { balance: Math.max(0, acc.balance), use: c.use_points, value: s.loyalty.point_value_paise, min: s.loyalty.min_redeem, earn: Math.floor(eligible / 10000 * s.loyalty.points_per_100 * acc.multiplier_bp / 10000) } : null, date: c.d, reward: c.rid ? { id: c.rid, name: c.rname! } : null, price, addon };
}
/** Explode cart/order lines into physical component quantities. */
export async function components(sql: Tx, lines: { variant_id: string; qty: number; bundle: boolean; custom?: unknown }[]) {
  const need = new Map<string, number>(); const detail = new Map<string, { variant_id: string; sku: string; qty: number }[]>();
  for (const l of lines) {
    if (l.custom) continue;
    if (!l.bundle) { need.set(l.variant_id, (need.get(l.variant_id) || 0) + l.qty); continue; }
    const parts = await sql<{ variant_id: string; sku: string; qty: number }[]>`SELECT bc.component_variant_id AS variant_id, v.sku, bc.qty FROM bundle_components bc JOIN product_variants v ON v.id = bc.component_variant_id WHERE bc.bundle_variant_id = ${l.variant_id}`;
    detail.set(l.variant_id, [...parts]); for (const p of parts) need.set(p.variant_id, (need.get(p.variant_id) || 0) + p.qty * l.qty);
  }
  return { need, detail };
}
