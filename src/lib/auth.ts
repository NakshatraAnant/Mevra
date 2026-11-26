import 'server-only';
import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { scrypt, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
import { live } from './db';

const run = (p: string, s: Buffer) => new Promise<Buffer>((ok, no) => scrypt(p.normalize('NFKC'), s, 64, { N: 16384, r: 8, p: 1 }, (e, k) => e ? no(e) : ok(k)));
export async function hashPassword(p: string) { const s = randomBytes(16); return `scrypt$${s.toString('hex')}$${(await run(p, s)).toString('hex')}`; }
const DUMMY = `scrypt$${'00'.repeat(16)}$${'00'.repeat(64)}`;
export async function verifyPassword(p: string, h: string | null | undefined) {
  const [, s, k] = (h || DUMMY).split('$'); const a = await run(p, Buffer.from(s, 'hex')), b = Buffer.from(k, 'hex'); return timingSafeEqual(a, b) && !!h;
}
export const sha = (t: string) => createHash('sha256').update(t).digest('hex');
export const token = (n = 32) => randomBytes(n).toString('base64url');
const COOKIE = { customer: 'mv_cust', admin: 'mv_admin' } as const;
const DAYS = { customer: 60, admin: 1 } as const;
export const cookieOpts = (maxAge: number) => ({ httpOnly: true, sameSite: 'lax' as const, secure: process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https') ?? false, path: '/', maxAge });

export async function startSession(kind: 'customer' | 'admin', subject: string) {
  const t = token(); const sec = DAYS[kind] * 86400;
  await live()`INSERT INTO sessions (token_hash, kind, subject_id, expires_at) VALUES (${sha(t)}, ${kind}, ${subject}, now() + ${sec} * interval '1 second')`;
  (await cookies()).set(COOKIE[kind], t, { ...cookieOpts(sec), sameSite: kind === 'admin' ? 'strict' : 'lax' });
}
export async function endSession(kind: 'customer' | 'admin') {
  const c = await cookies(); const t = c.get(COOKIE[kind])?.value; if (t) await live()`DELETE FROM sessions WHERE token_hash = ${sha(t)}`; c.delete(COOKIE[kind]);
}
export type Customer = { id: string; name: string; email: string; phone: string; wa_opt_in: boolean; email_opt_in: boolean };
export const currentCustomer = cache(async (): Promise<Customer | null> => {
  const t = (await cookies()).get('mv_cust')?.value; if (!t) return null;
  const [r] = await live()<Customer[]>`SELECT c.id, c.name, c.email, c.phone, c.wa_opt_in, c.email_opt_in FROM sessions s JOIN customers c ON c.id = s.subject_id WHERE s.token_hash = ${sha(t)} AND s.kind = 'customer' AND s.expires_at > now() AND c.registered`;
  return r || null;
});
export type Role = 'owner' | 'manager' | 'support' | 'analyst';
export type Admin = { id: string; email: string; name: string; role: Role };
export const currentAdmin = cache(async (): Promise<Admin | null> => {
  const t = (await cookies()).get('mv_admin')?.value; if (!t) return null;
  const [r] = await live()<Admin[]>`SELECT a.id, a.email, a.name, a.role FROM sessions s JOIN admin_users a ON a.id = s.subject_id WHERE s.token_hash = ${sha(t)} AND s.kind = 'admin' AND s.expires_at > now() AND a.active`;
  return r || null;
});
// Capability matrix. Every admin page, action and export calls requireAdmin with the capability it needs.
const CAN: Record<string, Role[]> = {
  analytics: ['owner', 'manager', 'analyst'], finance: ['owner', 'analyst'], orders: ['owner', 'manager', 'support'], customers: ['owner', 'manager', 'support', 'analyst'],
  pii: ['owner', 'manager', 'support'], catalogue: ['owner', 'manager'], inventory: ['owner', 'manager'], enquiries: ['owner', 'manager', 'support'], promotions: ['owner', 'manager'], settings: ['owner'], users: ['owner'], content: ['owner', 'manager'], export: ['owner', 'analyst'], any: ['owner', 'manager', 'support', 'analyst'],
};
export type Cap = keyof typeof CAN;
export const can = (a: Admin | null, cap: string) => !!a && (CAN[cap] || []).includes(a.role);
export async function requireAdmin(cap = 'any'): Promise<Admin> {
  const a = await currentAdmin(); if (!a) redirect('/admin/login'); if (!can(a, cap)) redirect('/admin/denied'); return a;
}
export async function clientIp() { const h = await headers(); return (h.get('x-forwarded-for')?.split(',')[0] || 'local').trim(); }
/** Fixed-window limiter in Postgres. Returns true when the call is allowed. */
export async function allow(bucket: string, max: number, seconds: number) {
  const key = `${bucket}:${sha(await clientIp()).slice(0, 16)}`;
  const [r] = await live()<{ hits: number }[]>`INSERT INTO rate_limits (bucket, window_start) VALUES (${key}, to_timestamp(floor(extract(epoch FROM now()) / ${seconds}::int) * ${seconds}::int)) ON CONFLICT (bucket, window_start) DO UPDATE SET hits = rate_limits.hits + 1 RETURNING hits`;
  return r.hits <= max;
}
