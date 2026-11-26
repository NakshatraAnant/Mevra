import type { Metadata } from 'next'; import Link from 'next/link'; import { getCart } from '@/lib/cart'; import { getSettings } from '@/lib/settings'; import { available, PLANNED } from '@/lib/payments'; import { currentCustomer } from '@/lib/auth'; import { live } from '@/lib/db'; import { Checkout } from '@/components/checkout'; import { inr } from '@/lib/money';
export const metadata: Metadata = { title: 'Checkout', robots: { index: false } };
export default async function Page() {
  const s = await getSettings(); const methods = available(s); const cod = methods.some(m => m.id === 'cod'); const [cart, me] = await Promise.all([getCart(cod, s), currentCustomer()]);
  if (!cart.lines.length) return <div className="wrap py-24 text-center"><h1 className="h1">Nothing to check out</h1><Link href="/shop" className="btn btn-p mt-6">Shop the collection</Link></div>;
  if (cart.price.belowMinimum > 0 || cart.lines.some(l => l.problem)) return <div className="wrap max-w-xl! py-24 text-center"><h1 className="h1">Almost there</h1><p className="mt-4">{cart.price.belowMinimum > 0 ? `Add ${inr(cart.price.belowMinimum)} more to reach our minimum order of ${inr(s.commerce.min_order_paise)}.` : 'An item in your cart needs attention.'}</p><Link href="/cart" className="btn btn-p mt-6">Back to cart</Link></div>;
  const addresses = me ? [...await live()`SELECT id, label, name, phone, line, landmark, pin, city, state FROM addresses WHERE customer_id = ${me.id} ORDER BY is_default DESC`] : [];
  return <Checkout cart={cart} methods={methods} planned={PLANNED} me={me ? { name: me.name, phone: me.phone, email: me.email } : null} addresses={addresses as never} codFee={s.commerce.cod_fee_paise} idem={crypto.randomUUID()} />;
}
