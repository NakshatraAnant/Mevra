import { z } from 'zod';
export const phone = z.string().trim().transform(s => s.replace(/[\s-]/g, '').replace(/^(\+?91|0)(?=\d{10}$)/, '')).pipe(z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'));
export const pin = z.string().trim().regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit PIN code');
export const name = z.string().trim().min(2, 'Please enter your name').max(80);
export const email = z.email('Enter a valid email address').trim().max(120).transform(s => s.toLowerCase());
export const optEmail = z.union([z.literal('').transform(() => null), email]).nullish().transform(v => v || null);
export const text = (max = 300) => z.string().trim().max(max);
export const optText = (max = 300) => z.string().trim().max(max).nullish().transform(v => v || null);
export const gstin = z.string().trim().toUpperCase().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, 'Enter a valid 15-character GSTIN');
export const optGstin = z.union([z.literal('').transform(() => null), gstin]).nullish().transform(v => v || null);
export const flag = z.union([z.literal('on'), z.literal('true'), z.literal('false'), z.literal(''), z.boolean()]).nullish().transform(v => v === 'on' || v === 'true' || v === true);
export const uuid = z.uuid();
export const rupees = z.union([z.literal('').transform(() => null), z.coerce.number().min(0).max(1e7).transform(n => Math.round(n * 100))]).nullish().transform(v => v ?? null);
export type FormState = { ok?: boolean; message?: string; errors?: Record<string, string>; data?: Record<string, string> };
export function parse<T extends z.ZodType>(schema: T, fd: FormData): { data: z.output<T>; state?: undefined } | { data?: undefined; state: FormState } {
  const raw: Record<string, unknown> = {}; for (const [k, v] of fd.entries()) if (typeof v === 'string' && !k.startsWith('$')) raw[k] = v;
  const r = schema.safeParse(raw); if (r.success) return { data: r.data };
  const errors: Record<string, string> = {}; for (const i of r.error.issues) errors[String(i.path[0] ?? 'form')] ||= i.message.startsWith('Invalid input') ? 'This field is required' : i.message;
  return { state: { ok: false, errors, message: 'Please check the highlighted fields.' } };
}
export { PIN_STATE, STATES } from './geo';
