import { z } from 'zod'; import { NextResponse } from 'next/server';
import { CLIENT_EVENTS, context } from '@/lib/events'; import { allow, currentCustomer } from '@/lib/auth'; import { live } from '@/lib/db'; import { sameOrigin } from '@/lib/origin';
const S = z.object({ events: z.array(z.object({ id: z.uuid(), name: z.enum(CLIENT_EVENTS), path: z.string().max(200), at: z.iso.datetime(), product_id: z.uuid().optional(), props: z.record(z.string().max(40), z.union([z.string().max(120), z.number(), z.boolean()])).optional() })).min(1).max(20) });
export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  const ctx = await context(); if (ctx.skip) return new NextResponse(null, { status: 204 });
  if (!(await allow('events', 240, 60))) return new NextResponse(null, { status: 429 });
  const raw = await req.text(); if (raw.length > 20000) return new NextResponse(null, { status: 413 });
  let j: unknown; try { j = JSON.parse(raw); } catch { return new NextResponse(null, { status: 400 }); }
  const p = S.safeParse(j); if (!p.success) return new NextResponse(null, { status: 400 });
  const cust = (await currentCustomer())?.id ?? null; const sql = live(); const now = Date.now();
  // client clocks are only trusted within ten minutes
  const rows = p.data.events.map(e => ({ id: e.id, name: e.name, at: Math.abs(now - Date.parse(e.at)) < 600000 && Date.parse(e.at) <= now ? new Date(e.at) : new Date(), visitor_id: ctx.visitor, session_id: ctx.session, customer_id: cust, product_id: e.product_id ?? null, path: e.path, source: ctx.source, medium: ctx.medium, campaign: ctx.campaign, device: ctx.device, props: sql.json(e.props || {}) }));
  await sql`INSERT INTO events ${sql(rows as never)} ON CONFLICT DO NOTHING`;
  return new NextResponse(null, { status: 204 });
}
