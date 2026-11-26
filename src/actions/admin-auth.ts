'use server';
import { redirect } from 'next/navigation'; import { cookies } from 'next/headers'; import { z } from 'zod'; import { live } from '@/lib/db'; import { allow, cookieOpts, endSession, requireAdmin, startSession, verifyPassword } from '@/lib/auth'; import { email, parse, type FormState } from '@/lib/validate';
export async function adminSignIn(_: FormState, fd: FormData): Promise<FormState> {
  const p = parse(z.object({ email, password: z.string().min(1).max(200) }), fd); if (p.state) return { ok: false, message: 'Enter your email and password.' };
  if (!(await allow('admin-login', 10, 900)) || !(await allow('admin-login:' + p.data.email, 8, 900))) return { ok: false, message: 'Too many attempts. Wait fifteen minutes.' };
  const sql = live(); const [a] = await sql`SELECT id, password_hash FROM admin_users WHERE email = ${p.data.email} AND active`;
  if (!(await verifyPassword(p.data.password, a?.password_hash))) { await sql`INSERT INTO audit_logs (actor, action, entity) VALUES (${p.data.email}, 'login_failed', 'admin')`; return { ok: false, message: 'Email or password is not correct.' }; }
  await startSession('admin', a.id); await sql`UPDATE admin_users SET last_login_at = now() WHERE id = ${a.id}`; await sql`INSERT INTO audit_logs (admin_id, actor, action, entity) VALUES (${a.id}, ${p.data.email}, 'login', 'admin')`; redirect('/admin');
}
export async function adminSignOut() { await endSession('admin'); redirect('/admin/login'); }
export async function setScope(demo: boolean) { await requireAdmin(); const c = await cookies(); if (demo) c.set('mv_scope', 'demo', cookieOpts(86400)); else c.delete('mv_scope'); }
