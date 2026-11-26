'use server';
import { live } from '@/lib/db'; import { allow } from '@/lib/auth'; import { phone, type FormState } from '@/lib/validate'; import { redirect } from 'next/navigation';
export async function trackOrder(_: FormState, fd: FormData): Promise<FormState> {
  const no = String(fd.get('order_no') || '').trim().toUpperCase().slice(0, 30), ph = phone.safeParse(String(fd.get('phone') || '')); const data = { order_no: no };
  if (!no || !ph.success) return { ok: false, data, errors: { ...(no ? {} : { order_no: 'Enter your order number' }), ...(ph.success ? {} : { phone: 'Enter the mobile number used for the order' }) }, message: 'Please check the highlighted fields.' };
  if (!(await allow('track', 10, 600))) return { ok: false, data, message: 'Too many attempts. Please wait ten minutes.' };
  const [o] = await live()`SELECT public_token FROM orders WHERE order_no = ${no} AND phone = ${ph.data}`; if (!o) return { ok: false, data, message: 'We could not find an order with those details.' };
  redirect(`/order-confirmation/${o.public_token}`);
}
