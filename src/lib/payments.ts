import 'server-only';
import type { Tx } from './db';
import type { Settings } from './settings';

/**
 * Payment provider abstraction. To add an online gateway: implement PaymentProvider, add it to REGISTRY with the environment
 * variables it needs, then enable online payments in admin settings. Checkout, orders and admin need no other change.
 * `begin` runs inside the order transaction and records a pending payment. An online provider must only be marked "collected"
 * by its signature-verified webhook, never by the browser.
 */
export interface PaymentProvider { id: string; label: string; note: string; online: boolean; configured(): boolean; begin(t: Tx, o: { orderId: string; amount: number }): Promise<void> }
const cod: PaymentProvider = {
  id: 'cod', label: 'Cash on delivery', note: 'Pay in cash when your order arrives.', online: false, configured: () => true,
  async begin(t, o) { await t`INSERT INTO payments ${t({ order_id: o.orderId, provider: 'cod', method: 'cod', amount_paise: o.amount, status: 'pending' })}`; },
};
const REGISTRY: PaymentProvider[] = [cod];
export const PLANNED = [{ id: 'upi', label: 'UPI' }, { id: 'card', label: 'Cards' }, { id: 'netbanking', label: 'Netbanking' }];
const enabled = (p: PaymentProvider, s: Settings) => p.configured() && (p.online ? s.commerce.online_payments_enabled && s.commerce.payment_provider === p.id : s.commerce.cod_enabled);
export const provider = (id: string, s: Settings) => REGISTRY.find(p => p.id === id && enabled(p, s)) || null;
export const available = (s: Settings) => REGISTRY.filter(p => enabled(p, s)).map(({ id, label, note }) => ({ id, label, note }));
