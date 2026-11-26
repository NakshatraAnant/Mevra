// Pure pricing rules. All amounts are integer paise, GST-inclusive. Unit-tested in tests/unit.
// A line marked `bundle` (bundles, custom mixes, gift boxes) already carries its saving and never takes a site coupon or points.
export type PLine = { variantId: string; unit: number; list: number; qty: number; bundle: boolean; gstBp?: number | null; promoOk?: boolean; loyaltyOk?: boolean; ceilingBp?: number | null; floor?: number | null };
export type PCoupon = { code: string; kind: 'percent' | 'flat'; value: number; scope: 'site' | 'festival_bundle'; minSubtotal: number };
export type PPoints = { use: number; valuePaise: number; maxBp: number; min: number };
export type PRules = { min_order_paise: number; free_shipping_paise: number; shipping_paise: number; cod_fee_paise: number; site_discount_ceiling_bp: number; festival_discount_ceiling_bp: number };
export type Priced = { list: number; subtotal: number; bundleSaving: number; couponDiscount: number; couponNote: string | null; pointsUsed: number; pointsDiscount: number; pointsNote: string | null; shipping: number; codFee: number; tax: number | null; total: number; toFreeShipping: number; belowMinimum: number; lineDiscount: Record<string, number> };
const spread = (total: number, rooms: [string, number][], into: Record<string, number>) => { const sum = rooms.reduce((a, r) => a + r[1], 0); let left = total; rooms.forEach(([id, room], i) => { const d = i === rooms.length - 1 ? Math.min(left, room) : Math.min(room, Math.floor(total * room / (sum || 1))); into[id] = (into[id] || 0) + d; left -= d; }); for (const [id, room] of rooms) { if (left <= 0) break; const used = into[id] || 0; const add = Math.min(left, Math.max(0, room - used)); into[id] = used + add; left -= add; } return total - Math.max(0, left); };
export function priceCart(lines: PLine[], rules: PRules, opts: { coupon?: PCoupon | null; cod?: boolean; points?: PPoints | null } = {}): Priced {
  const list = lines.reduce((a, l) => a + Math.max(l.list, l.unit) * l.qty, 0), subtotal = lines.reduce((a, l) => a + l.unit * l.qty, 0);
  const lineDiscount: Record<string, number> = {}; let couponDiscount = 0, couponNote: string | null = null, pointsUsed = 0, pointsDiscount = 0, pointsNote: string | null = null; const c = opts.coupon;
  // Room left under the ceiling, the ₹1 minimum and the margin floor (cost plus packaging, when known).
  const room = (l: PLine, bp: number) => { const lp = Math.max(l.list, l.unit); const cap = Math.min(bp, l.ceilingBp ?? bp); return Math.max(0, Math.min(Math.floor(lp * cap / 10000) - (lp - l.unit), l.unit - 100, l.floor != null ? l.unit - l.floor : Infinity)) * l.qty; };
  if (c) {
    const el = lines.filter(l => (c.scope === 'site' ? !l.bundle : l.bundle) && l.promoOk !== false); const base = el.reduce((a, l) => a + l.unit * l.qty, 0); const rooms = el.map(l => [l.variantId, room(l, c.scope === 'site' ? rules.site_discount_ceiling_bp : rules.festival_discount_ceiling_bp)] as [string, number]); const total = rooms.reduce((a, r) => a + r[1], 0);
    if (subtotal < c.minSubtotal) couponNote = 'This code needs a higher order value.'; else if (!base) couponNote = c.scope === 'site' ? 'This code does not apply to bundles, mixes or gift boxes, which are already priced together.' : 'This code applies to bundles only.';
    else { const want = c.kind === 'percent' ? Math.floor(base * Math.min(c.value, 10000) / 10000) : c.value; couponDiscount = Math.max(0, Math.min(want, total)); if (couponDiscount < want) couponNote = 'Reduced to our maximum discount.'; couponDiscount = spread(couponDiscount, rooms, lineDiscount); }
  }
  const p = opts.points;
  if (p && p.use > 0 && p.valuePaise > 0) {
    const el = lines.filter(l => !l.bundle && l.loyaltyOk !== false); const rooms = el.map(l => [l.variantId, Math.max(0, room(l, rules.site_discount_ceiling_bp) - (lineDiscount[l.variantId] || 0))] as [string, number]); const net = el.reduce((a, l) => a + l.unit * l.qty - (lineDiscount[l.variantId] || 0), 0);
    const cap = Math.min(rooms.reduce((a, r) => a + r[1], 0), Math.floor(net * p.maxBp / 10000), p.use * p.valuePaise); const n = Math.floor(cap / p.valuePaise);
    if (n < p.min) pointsNote = p.use < p.min ? `At least ${p.min} points are needed.` : 'This order has reached its maximum discount, so points cannot be used.';
    else { const own: Record<string, number> = {}; pointsDiscount = spread(n * p.valuePaise, rooms, own); pointsUsed = n; for (const k in own) lineDiscount[k] = (lineDiscount[k] || 0) + own[k]; if (n < p.use) pointsNote = `Up to ${n} points can be used on this order.`; }
  }
  const net = subtotal - couponDiscount - pointsDiscount; const shipping = lines.length === 0 || net >= rules.free_shipping_paise ? 0 : rules.shipping_paise; const codFee = opts.cod && lines.length ? rules.cod_fee_paise : 0;
  const tax = lines.length && lines.every(l => l.gstBp != null) ? lines.reduce((a, l) => { const v = l.unit * l.qty - (lineDiscount[l.variantId] || 0); return a + Math.round(v * l.gstBp! / (10000 + l.gstBp!)); }, 0) : null;
  return { list, subtotal, bundleSaving: list - subtotal, couponDiscount, couponNote, pointsUsed, pointsDiscount, pointsNote, shipping, codFee, tax, total: net + shipping + codFee, toFreeShipping: lines.length ? Math.max(0, rules.free_shipping_paise - net) : rules.free_shipping_paise, belowMinimum: Math.max(0, rules.min_order_paise - net), lineDiscount };
}
export const perKg = (paise: number | null, g: number) => paise == null ? null : Math.round(paise * 1000 / g);
export const per100 = (paise: number | null, g: number) => paise == null ? null : Math.round(paise * 100 / g);
