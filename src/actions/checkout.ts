'use server';
import { z } from 'zod'; import { cookies } from 'next/headers'; import { redirect } from 'next/navigation';
import { cartId, CART_COOKIE } from '@/lib/cart'; import { allow, cookieOpts, currentCustomer } from '@/lib/auth'; import { context } from '@/lib/events'; import { OrderError, placeOrder } from '@/lib/orders'; import { flag, name, optEmail, optGstin, optText, parse, phone, pin, STATES, text, uuid, type FormState } from '@/lib/validate';
const S = z.object({ name, phone, email: optEmail, line: text(240).min(8, 'Enter your full address'), landmark: optText(120), pin, city: text(60).min(2, 'Enter your city'), state: z.enum(STATES as [string, ...string[]], 'Choose your state'), gst_invoice: flag, gstin: optGstin, gst_business_name: optText(120), wa_updates: flag, note: optText(300), method: text(20), expected_total: z.coerce.number().int().positive(), key: uuid })
  .superRefine((v, c) => { if (v.gst_invoice && !v.gstin) c.addIssue({ code: 'custom', path: ['gstin'], message: 'Enter your GSTIN' }); if (v.gst_invoice && !v.gst_business_name) c.addIssue({ code: 'custom', path: ['gst_business_name'], message: 'Enter the registered business name' }); });
export async function submitOrder(_: FormState, fd: FormData): Promise<FormState> {
  const p = parse(S, fd); if (p.state) return p.state; if (!(await allow('order', 10, 600))) return { ok: false, message: 'Too many attempts. Please wait a few minutes.' };
  const id = await cartId(); if (!id) return { ok: false, message: 'Your cart is empty or has already been ordered. If you just placed an order, check Track an order.' };
  const [me, ctx] = await Promise.all([currentCustomer(), context()]); let r;
  try { r = await placeOrder(id, p.data, me?.id ?? null, ctx); } catch (e) { if (e instanceof OrderError) return { ok: false, message: e.message, data: { code: e.code } }; console.error('order failed', e instanceof Error ? e.message : e); return { ok: false, message: 'We could not place your order. You have not been charged. Please try again.' }; }
  const c = await cookies(); c.delete(CART_COOKIE); c.set('mv_last', r.token, cookieOpts(86400)); redirect(`/order-confirmation/${r.token}`);
}
