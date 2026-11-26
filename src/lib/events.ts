import 'server-only';
import { cookies, headers } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { live, type AnySql } from './db';

/** Event taxonomy. Client may send only CLIENT_EVENTS; commerce events are recorded server-side so they cannot be forged. */
export const CLIENT_EVENTS = ['page_view', 'product_view', 'search', 'whatsapp_click', 'lot_lookup', 'category_view', 'filter_used', 'compare_added', 'experiment_exposure', 'viewer_opened', 'grade_explored'] as const;
export const SERVER_EVENTS = ['add_to_cart', 'remove_from_cart', 'checkout_started', 'order_placed', 'payment_status', 'order_status', 'order_delivered', 'enquiry_submitted', 'signup', 'wishlist_add', 'coupon_applied', 'points_earned', 'points_redeemed', 'referral_joined', 'referral_rewarded', 'subscription_created', 'gift_configured', 'mix_added', 'reorder', 'quiz_completed', 'b2b_quote'] as const;
export type EventName = (typeof CLIENT_EVENTS)[number] | (typeof SERVER_EVENTS)[number];
export type Ctx = { visitor: string; session: string; source: string; medium: string; campaign: string | null; device: string; path: string | null; skip: boolean };
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit/i;
export async function context(): Promise<Ctx> {
  const c = await cookies(), h = await headers(); const ua = h.get('user-agent') || '';
  let u: { s?: string; m?: string; c?: string } = {}; try { u = JSON.parse(decodeURIComponent(c.get('mv_utm')?.value || '{}')); } catch {}
  const clip = (x: unknown, n = 80) => typeof x === 'string' && x ? x.slice(0, n) : null;
  return { visitor: clip(c.get('mv_vid')?.value, 64) || 'unknown', session: clip(c.get('mv_sid')?.value, 64) || 'unknown', source: clip(u.s) || 'direct', medium: clip(u.m) || 'none', campaign: clip(u.c),
    device: /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android/i.test(ua) ? 'mobile' : 'desktop', path: null,
    skip: !c.get('mv_vid') || !!c.get('mv_admin') || h.get('sec-gpc') === '1' || c.get('mv_optout')?.value === '1' || BOT.test(ua) };
}
export async function track(name: EventName, p: { id?: string; product_id?: string | null; order_id?: string | null; customer_id?: string | null; path?: string | null; props?: Record<string, string | number | boolean | null> } = {}, sql: AnySql = live(), ctx?: Ctx) {
  const x = ctx || await context(); if (x.skip && !p.order_id) return;
  await sql`INSERT INTO events (id, name, visitor_id, session_id, customer_id, product_id, order_id, path, source, medium, campaign, device, props) VALUES (${p.id || randomUUID()}, ${name}, ${x.visitor}, ${x.session}, ${p.customer_id ?? null}, ${p.product_id ?? null}, ${p.order_id ?? null}, ${p.path ?? x.path}, ${x.source}, ${x.medium}, ${x.campaign}, ${x.device}, ${sql.json(p.props || {})}) ON CONFLICT DO NOTHING`;
}
