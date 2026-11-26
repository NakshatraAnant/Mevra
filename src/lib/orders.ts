import 'server-only';
import { randomInt } from 'node:crypto';
import { live, type DB, type Tx } from './db';
import { token } from './auth';
import { cartLines, components, loadCoupon, pointRules, toP } from './cart';
import { book, earnPending, lock, onClosed, onDelivered } from './loyalty';
import { dispatch } from './integrations';
import { priceCart } from './pricing';
import { loadSettings } from './settings';
import { provider } from './payments';
import { track, type Ctx } from './events';
import { inr } from './money';

export class OrderError extends Error { constructor(public code: string, m: string) { super(m); } }
export type CheckoutInput = { name: string; phone: string; email: string | null; line: string; landmark: string | null; pin: string; city: string; state: string; gst_invoice: boolean; gstin: string | null; gst_business_name: string | null; wa_updates: boolean; note: string | null; method: string; expected_total: number; key: string };
const A = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const orderNo = () => { const d = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: '2-digit', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/\D/g, ''); return `MV-${d}-${Array.from({ length: 6 }, () => A[randomInt(A.length)]).join('')}`; };

export async function placeOrder(cart: string, input: CheckoutInput, customerId: string | null, ctx: Ctx): Promise<{ token: string; order_no: string }> {
  const sql = live();
  const run = () => sql.begin(async t => {
    const [c] = await t`SELECT id, status, coupon_code, use_points, reward_id, delivery_date FROM carts WHERE id = ${cart} FOR UPDATE`;
    const [dupe] = await t<{ token: string; order_no: string; cart_id: string }[]>`SELECT public_token AS token, order_no, cart_id FROM orders WHERE idempotency_key = ${input.key}`;
    if (dupe && dupe.cart_id === cart) return { token: dupe.token, order_no: dupe.order_no };
    if (!c || c.status !== 'open') throw new OrderError('cart', 'Your cart has already been ordered or is empty.');
    const s = await loadSettings(t); const lines = await cartLines(t, cart);
    if (!lines.length) throw new OrderError('cart', 'Your cart is empty.');
    const bad = lines.find(l => l.problem); if (bad) throw new OrderError('stock', `${bad.name}: ${bad.problem}. Please update your cart.`);
    const pay = provider(input.method, s); if (!pay) throw new OrderError('payment', 'This payment method is not available.');
    if (input.method === 'cod') {
      if (s.commerce.cod_blocked_pins.includes(input.pin)) throw new OrderError('cod', 'Cash on delivery is not available at this PIN code.');
    }
    const { coupon, error } = await loadCoupon(t, c.coupon_code, { lock: true, phone: input.phone, customer: customerId });
    const balance = customerId && c.use_points > 0 && s.loyalty.enabled ? await lock(t, customerId) : 0; const usePts = Math.min(c.use_points, balance);
    if (error) throw new OrderError('coupon', `${error} Remove it to continue.`);
    const pr = priceCart(lines.map(toP), s.commerce, { coupon, cod: input.method === 'cod', points: usePts ? pointRules(s, usePts) : null });
    if (pr.belowMinimum > 0) throw new OrderError('minimum', `The minimum order is ${inr(s.commerce.min_order_paise)}.`);
    if (input.method === 'cod' && s.commerce.cod_max_paise && pr.total > s.commerce.cod_max_paise) throw new OrderError('cod', `Cash on delivery is available up to ${inr(s.commerce.cod_max_paise)}.`);
    if (pr.total !== input.expected_total) throw new OrderError('price', 'Prices changed while you were checking out. Please review the updated total.');
    // Stock: lock in a stable order so concurrent checkouts cannot oversell or deadlock.
    const { need, detail } = await components(t, lines);
    const ids = [...need.keys()].sort();
    const inv = await t<{ variant_id: string; tracked: boolean; on_hand: number; reserved: number; sku: string }[]>`SELECT i.variant_id, i.tracked, i.on_hand, i.reserved, v.sku FROM inventory i JOIN product_variants v ON v.id = i.variant_id WHERE i.variant_id = ANY(${ids}::uuid[]) ORDER BY i.variant_id FOR UPDATE OF i`;
    for (const r of inv) if (r.tracked && r.on_hand - r.reserved < need.get(r.variant_id)!) throw new OrderError('stock', 'An item in your cart just sold out. Please update your cart.');
    let cid = customerId;
    if (cid) await t`UPDATE customers SET wa_opt_in = wa_opt_in OR ${input.wa_updates}, consent_at = CASE WHEN ${input.wa_updates} THEN now() ELSE consent_at END WHERE id = ${cid}`;
    else {
      const [r] = await t<{ id: string }[]>`INSERT INTO customers (name, phone, email, wa_opt_in, consent_at, acq_source, acq_medium, acq_campaign) VALUES (${input.name}, ${input.phone}, ${input.email}, ${input.wa_updates}, ${input.wa_updates ? new Date() : null}, ${ctx.source}, ${ctx.medium}, ${ctx.campaign})
        ON CONFLICT (phone) WHERE NOT registered DO UPDATE SET name = EXCLUDED.name, email = COALESCE(EXCLUDED.email, customers.email), wa_opt_in = customers.wa_opt_in OR EXCLUDED.wa_opt_in, consent_at = COALESCE(EXCLUDED.consent_at, customers.consent_at) RETURNING id`; cid = r.id;
    }
    const no = orderNo(), pub = token(18);
    const [o] = await t<{ id: string }[]>`INSERT INTO orders ${t({ order_no: no, public_token: pub, idempotency_key: input.key, customer_id: cid, cart_id: cart, payment_method: input.method, list_paise: pr.list, subtotal_paise: pr.subtotal, discount_paise: pr.couponDiscount + pr.pointsDiscount, points_used: pr.pointsUsed, points_discount_paise: pr.pointsDiscount, requested_date: c.delivery_date, shipping_paise: pr.shipping, cod_fee_paise: pr.codFee, tax_included_paise: pr.tax, total_paise: pr.total, coupon_code: pr.couponDiscount > 0 ? c.coupon_code : null, name: input.name, phone: input.phone, email: input.email, line: input.line, landmark: input.landmark, pin: input.pin, city: input.city, state: input.state, gst_invoice: input.gst_invoice, gstin: input.gst_invoice ? input.gstin : null, gst_business_name: input.gst_invoice ? input.gst_business_name : null, wa_updates: input.wa_updates, customer_note: input.note, visitor_id: ctx.visitor, source: ctx.source, medium: ctx.medium, campaign: ctx.campaign, device: ctx.device })} RETURNING id`;
    const costs = await t<{ variant_id: string; pc: number | null; pk: number | null }[]>`SELECT variant_id, product_cost_paise AS pc, packaging_cost_paise AS pk FROM variant_costs`; const cost = new Map(costs.map(x => [x.variant_id, x]));
    for (const l of lines) {
      const parts = detail.get(l.variant_id); const sum = (k: 'pc' | 'pk') => parts ? parts.reduce<number | null>((a, p) => { const v = cost.get(p.variant_id)?.[k]; return a == null || v == null ? null : a + v * p.qty; }, 0) : cost.get(l.variant_id)?.[k] ?? null;
      await t`INSERT INTO order_items ${t({ order_id: o.id, variant_id: l.variant_id, product_id: l.product_id, name: l.name, sku: l.sku, pack: l.label, grade: l.grade, qty: l.qty, list_paise: l.list, unit_paise: l.unit, discount_paise: pr.lineDiscount[l.id] || 0, custom_id: l.custom?.id ?? null, custom: l.custom ? t.json(l.custom) : null, gst_rate_bp: l.gst_bp, product_cost_paise: sum('pc'), packaging_cost_paise: sum('pk'), components: parts ? t.json(parts) : null })}`;
    }
    for (const r of inv) if (r.tracked) { const q = need.get(r.variant_id)!; await t`UPDATE inventory SET reserved = reserved + ${q}, updated_at = now() WHERE variant_id = ${r.variant_id}`; await t`INSERT INTO stock_movements ${t({ variant_id: r.variant_id, kind: 'reserve', qty: q, order_id: o.id, actor: 'checkout' })}`; }
    if (coupon && pr.couponDiscount > 0) await t`UPDATE coupons SET used_count = used_count + 1 WHERE code = ${coupon.code}`;
    if (pr.pointsUsed > 0) { if (!(await book(t, cid!, { type: 'redeemed', points: -pr.pointsUsed, source: 'order', order: o.id, ref: `use:${o.id}`, note: `Order ${no}` }))) throw new OrderError('points', 'Points could not be used. Please try again.'); await track('points_redeemed', { customer_id: cid, props: { points: pr.pointsUsed } }, t, ctx); }
    if (c.reward_id && customerId) { const [rc] = await t`UPDATE reward_claims SET status='attached', order_id=${o.id} WHERE id=${c.reward_id} AND customer_id=${customerId} AND status='claimed' RETURNING reward_id`; if (rc) await t`UPDATE orders SET reward=(SELECT jsonb_build_object('name', name, 'kind', kind) FROM rewards WHERE id=${rc.reward_id}) WHERE id=${o.id}`; }
    await earnPending(t, { id: o.id, customer_id: cid!, order_no: no, source: ctx.source, medium: ctx.medium, campaign: ctx.campaign, points_used: pr.pointsUsed });
    await pay.begin(t, { orderId: o.id, amount: pr.total });
    await t`INSERT INTO order_events ${t({ order_id: o.id, kind: 'status', to_status: 'placed', actor: 'customer', note: `${pay.label} order` })}`;
    await t`UPDATE carts SET status = 'converted', updated_at = now() WHERE id = ${cart}`;
    await track('order_placed', { order_id: o.id, customer_id: cid, props: { total: pr.total, items: lines.length, method: input.method } }, t, ctx);
    const body = `Thank you ${input.name}. We have received your MEVRA order ${no} for ${inr(pr.total)} (${pay.label}). We will confirm before dispatch.`;
    if (input.email) await notify(t, 'email', input.email, 'order_confirmation', body, o.id, `MEVRA order ${no} received`);
    if (input.wa_updates) await notify(t, 'whatsapp', input.phone, 'order_confirmation', body, o.id);
    return { token: pub, order_no: no };
  });
  return run() as Promise<{ token: string; order_no: string }>;
}
/** Development transport: messages are written to the outbox and never leave this machine. */
export async function notify(t: Tx, channel: string, to: string, template: string, body: string, orderId: string | null, subject: string | null = null) {
  const outcome = await dispatch(t, channel, template, { to, subject, body, template, order: orderId });
  await t`INSERT INTO notifications ${t({ channel, recipient: to, template, subject, body, order_id: orderId, status: outcome === 'sent' ? 'sent' : outcome === 'failed' ? 'failed' : 'logged_dev' })}`;
}

export const FLOW: Record<string, string[]> = { placed: ['confirmed', 'cancelled'], confirmed: ['packed', 'cancelled'], packed: ['shipped', 'cancelled'], shipped: ['out_for_delivery', 'delivered', 'failed', 'rto'], out_for_delivery: ['delivered', 'failed', 'rto'], failed: ['out_for_delivery', 'delivered', 'rto'], delivered: ['returned'], cancelled: [], rto: [], returned: [] };
export const STATUS_LABEL: Record<string, string> = { placed: 'Placed', confirmed: 'Confirmed', packed: 'Packed', shipped: 'Shipped', out_for_delivery: 'Out for delivery', delivered: 'Delivered', cancelled: 'Cancelled', failed: 'Delivery failed', rto: 'Returned to origin', returned: 'Returned' };
type Change = { to: string; actor: string; note?: string | null; courier?: string | null; tracking?: string | null; shipCost?: number | null; returnCost?: number | null; collected?: boolean; restock?: boolean; refund?: number | null };

export async function changeStatus(sql: DB, id: string, ch: Change) {
  await sql.begin(async t => {
    const [o] = await t`SELECT * FROM orders WHERE id = ${id} FOR UPDATE`; if (!o) throw new OrderError('nf', 'Order not found.');
    if (!FLOW[o.status]?.includes(ch.to)) throw new OrderError('flow', `An order cannot move from ${STATUS_LABEL[o.status]} to ${STATUS_LABEL[ch.to] || ch.to}.`);
    const items = await t<{ id: string; variant_id: string; qty: number; components: { variant_id: string; qty: number }[] | null; custom_id: string | null }[]>`SELECT id, variant_id, qty, components, custom_id FROM order_items WHERE order_id = ${id}`;
    const phys = items.filter(i => !i.custom_id).flatMap(i => i.components ? i.components.map(c => ({ item: i.id, v: c.variant_id, q: c.qty * i.qty })) : [{ item: i.id, v: i.variant_id, q: i.qty }]).sort((a, b) => a.v < b.v ? -1 : 1);
    const held = new Map((await t<{ variant_id: string; n: number }[]>`SELECT variant_id, sum(CASE kind WHEN 'reserve' THEN qty WHEN 'release' THEN -qty WHEN 'ship' THEN -qty ELSE 0 END)::int AS n FROM stock_movements WHERE order_id = ${id} AND kind IN ('reserve','release','ship') GROUP BY 1`).map(r => [r.variant_id, Math.max(0, r.n)]));
    const mv = (variant_id: string, kind: string, qty: number, lot_id: string | null = null) => t`INSERT INTO stock_movements ${t({ variant_id, kind, qty, lot_id, order_id: id, actor: ch.actor })}`;
    if (ch.to === 'packed') for (const p of phys) { // FEFO lot allocation gives customer-level traceability
      let left = p.q;
      for (const l of await t<{ id: string; qty_remaining: number }[]>`SELECT id, qty_remaining FROM lots WHERE variant_id = ${p.v} AND qty_remaining > 0 AND testing_status <> 'failed' AND (best_before IS NULL OR best_before > current_date) ORDER BY best_before NULLS LAST, received_date NULLS LAST FOR UPDATE`) {
        if (left <= 0) break; const q = Math.min(left, l.qty_remaining); left -= q;
        await t`UPDATE lots SET qty_remaining = qty_remaining - ${q} WHERE id = ${l.id}`; await t`INSERT INTO order_lots (order_item_id, lot_id, qty) VALUES (${p.item}, ${l.id}, ${q}) ON CONFLICT (order_item_id, lot_id) DO UPDATE SET qty = order_lots.qty + EXCLUDED.qty`;
      }
    }
    if (ch.to === 'shipped') for (const p of phys) {
      const [iv] = await t`SELECT tracked, on_hand, reserved FROM inventory WHERE variant_id = ${p.v} FOR UPDATE`; if (!iv?.tracked) continue; const r = Math.min(held.get(p.v) || 0, p.q); held.set(p.v, (held.get(p.v) || 0) - r);
      await t`UPDATE inventory SET on_hand = GREATEST(0, on_hand - ${p.q}), reserved = GREATEST(0, reserved - ${r}), updated_at = now() WHERE variant_id = ${p.v}`; await mv(p.v, 'ship', p.q);
    }
    if (ch.to === 'cancelled') {
      for (const [v, n] of [...held].sort()) if (n > 0) { await t`UPDATE inventory SET reserved = GREATEST(0, reserved - ${n}), updated_at = now() WHERE variant_id = ${v}`; await mv(v, 'release', n); }
      await returnLots(t, id);
      if (o.coupon_code) await t`UPDATE coupons SET used_count = GREATEST(0, used_count - 1) WHERE code = ${o.coupon_code}`;
    }
    if ((ch.to === 'rto' || ch.to === 'returned') && ch.restock) {
      for (const p of phys) { const u = await t`UPDATE inventory SET on_hand = on_hand + ${p.q}, updated_at = now() WHERE variant_id = ${p.v} AND tracked`; if (u.count) await mv(p.v, 'return', p.q); }
      await returnLots(t, id);
    }
    const refund = ch.to === 'returned' ? Math.max(0, Math.min(ch.refund ?? 0, o.total_paise - o.refunded_paise)) : 0;
    const pay = ch.to === 'cancelled' || ch.to === 'rto' ? (o.payment_status === 'pending' ? 'void' : o.payment_status) : ch.to === 'delivered' && ch.collected ? 'collected' : refund > 0 ? 'refunded' : o.payment_status;
    await t`UPDATE orders SET status = ${ch.to}, payment_status = ${pay}, refunded_paise = refunded_paise + ${refund}, courier = COALESCE(${ch.courier ?? null}, courier), tracking_no = COALESCE(${ch.tracking ?? null}, tracking_no), shipping_cost_paise = COALESCE(${ch.shipCost ?? null}, shipping_cost_paise), return_cost_paise = COALESCE(${ch.returnCost ?? null}, return_cost_paise),
      cancel_reason = CASE WHEN ${ch.to} IN ('cancelled','rto','returned','failed') THEN COALESCE(${ch.note ?? null}, cancel_reason) ELSE cancel_reason END,
      confirmed_at = CASE WHEN ${ch.to} = 'confirmed' THEN now() ELSE confirmed_at END, packed_at = CASE WHEN ${ch.to} = 'packed' THEN now() ELSE packed_at END, shipped_at = CASE WHEN ${ch.to} = 'shipped' THEN now() ELSE shipped_at END, delivered_at = CASE WHEN ${ch.to} = 'delivered' THEN now() ELSE delivered_at END, closed_at = CASE WHEN ${ch.to} IN ('cancelled','rto','returned','delivered') THEN now() ELSE closed_at END WHERE id = ${id}`;
    if (pay !== o.payment_status) { await t`UPDATE payments SET status = ${pay}, updated_at = now() WHERE order_id = ${id}`; await t`INSERT INTO order_events ${t({ order_id: id, kind: 'payment', from_status: o.payment_status, to_status: pay, actor: ch.actor })}`; }
    await t`INSERT INTO order_events ${t({ order_id: id, kind: 'status', from_status: o.status, to_status: ch.to, note: ch.note ?? null, actor: ch.actor })}`;
    const ctx: Ctx = { visitor: o.visitor_id || 'unknown', session: 'system', source: o.source || 'direct', medium: o.medium || 'none', campaign: o.campaign, device: o.device || 'unknown', path: null, skip: false };
    const lo = { id, customer_id: o.customer_id, order_no: o.order_no, source: o.source, medium: o.medium, campaign: o.campaign, points_used: o.points_used }; if (ch.to === 'delivered') { await onDelivered(t, lo, ctx); await t`UPDATE reward_claims SET status='fulfilled' WHERE order_id=${id} AND status='attached'`; } else if (['cancelled', 'rto', 'returned'].includes(ch.to)) await onClosed(t, lo, ch.to);
    await track(ch.to === 'delivered' ? 'order_delivered' : 'order_status', { order_id: id, customer_id: o.customer_id, props: { to: ch.to } }, t, ctx);
    if (pay !== o.payment_status) await track('payment_status', { order_id: id, customer_id: o.customer_id, props: { to: pay } }, t, ctx);
    const body = `Your MEVRA order ${o.order_no} is now: ${STATUS_LABEL[ch.to]}.${ch.tracking ? ` Tracking: ${ch.courier || ''} ${ch.tracking}` : ''}`;
    if (o.wa_updates) await notify(t, 'whatsapp', o.phone, `order_${ch.to}`, body, id); if (o.email) await notify(t, 'email', o.email, `order_${ch.to}`, body, id, `MEVRA order ${o.order_no}: ${STATUS_LABEL[ch.to]}`);
  });
}
async function returnLots(t: Tx, id: string) {
  await t`UPDATE lots l SET qty_remaining = l.qty_remaining + x.q FROM (SELECT ol.lot_id, sum(ol.qty)::int AS q FROM order_lots ol JOIN order_items oi ON oi.id = ol.order_item_id WHERE oi.order_id = ${id} GROUP BY 1) x WHERE l.id = x.lot_id`;
  await t`DELETE FROM order_lots ol USING order_items oi WHERE oi.id = ol.order_item_id AND oi.order_id = ${id}`;
}
