import 'server-only'; import type { AnySql } from './db';
// Adapter registry. Every adapter reports whether it is configured; without credentials it records, and never claims to have sent.
export type Adapter = { id: string; label: string; env: string[]; purpose: string; setup: string };
export const ADAPTERS: Adapter[] = [
  { id: 'payment', label: 'Payment gateway (Razorpay)', env: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET'], purpose: 'UPI, cards and netbanking', setup: 'Add keys, implement the provider in src/lib/payments.ts with a signature-verified webhook, then enable online payments.' },
  { id: 'email', label: 'Email (SMTP or API)', env: ['EMAIL_API_URL', 'EMAIL_API_KEY', 'EMAIL_FROM'], purpose: 'Order and reward messages', setup: 'Point EMAIL_API_URL at a JSON endpoint that accepts to, from, subject and text.' },
  { id: 'whatsapp', label: 'WhatsApp Business', env: ['WHATSAPP_PHONE_ID', 'WHATSAPP_TOKEN'], purpose: 'Order updates to people who opted in', setup: 'Approve templates with Meta first. Only opted-in numbers are ever queued.' },
  { id: 'shipping', label: 'Shipping and courier', env: ['SHIPPING_API_URL', 'SHIPPING_API_KEY'], purpose: 'Serviceability, rates, tracking', setup: 'Until connected, zones in Settings drive estimates and tracking is entered by hand.' },
  { id: 'meta', label: 'Meta Ads and Pixel', env: ['META_PIXEL_ID', 'META_CAPI_TOKEN'], purpose: 'Conversions and spend import', setup: 'Requires a consent banner before activation.' }, { id: 'google', label: 'Google Ads and Analytics', env: ['GA_MEASUREMENT_ID', 'GA_API_SECRET'], purpose: 'Measurement and spend import', setup: 'Requires a consent banner before activation.' },
  { id: 'feed', label: 'Product feed', env: [], purpose: 'Google Merchant compatible XML at /feeds/products.xml', setup: 'Always available. Lists only products that can be bought now.' },
];
export const configured = (id: string) => { const a = ADAPTERS.find(x => x.id === id); return !!a && a.env.every(k => !!process.env[k]); };
export const missing = (a: Adapter) => a.env.filter(k => !process.env[k]);
/** Development fallback for message adapters: writes an audit row and returns 'recorded'. */
export async function dispatch(sql: AnySql, adapter: string, action: string, detail: Record<string, string | number | null>): Promise<'sent' | 'recorded' | 'failed'> {
  let outcome: 'sent' | 'recorded' | 'failed' = 'recorded';
  if (adapter === 'email' && configured('email')) { try { const r = await fetch(process.env.EMAIL_API_URL!, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.EMAIL_API_KEY}` }, body: JSON.stringify({ from: process.env.EMAIL_FROM, to: detail.to, subject: detail.subject, text: detail.body }), signal: AbortSignal.timeout(8000) }); outcome = r.ok ? 'sent' : 'failed'; } catch { outcome = 'failed'; } }
  await sql`INSERT INTO integration_log (adapter, action, outcome, detail) VALUES (${adapter}, ${action}, ${outcome}, ${sql.json({ template: detail.template ?? null, order: detail.order ?? null })})`; return outcome;
}
