import { NextResponse } from 'next/server'; import fs from 'node:fs/promises'; import path from 'node:path'; import { live } from '@/lib/db'; import { can, currentAdmin } from '@/lib/auth'; import { uuid } from '@/lib/validate';
/** Certificates are public only when the lot is published AND verified by an authorised admin. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!uuid.safeParse(id).success) return new NextResponse('Not found', { status: 404 });
  const [c] = await live()`SELECT c.*, l.published, l.verified FROM lot_certificates c JOIN lots l ON l.id = c.lot_id WHERE c.id = ${id}`; if (!c || (!(c.published && c.verified) && !can(await currentAdmin(), 'inventory'))) return new NextResponse('Not found', { status: 404 });
  if (c.file_path) { try { const b = await fs.readFile(path.join(process.cwd(), 'uploads', path.basename(c.file_path))); return new NextResponse(new Uint8Array(b), { headers: { 'content-type': c.mime, 'content-disposition': 'inline; filename="certificate"', 'content-security-policy': "default-src 'none'; sandbox", 'x-content-type-options': 'nosniff' } }); } catch { return new NextResponse('Not found', { status: 404 }); } }
  return c.url ? NextResponse.redirect(c.url) : new NextResponse('Not found', { status: 404 });
}
