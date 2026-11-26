import { NextResponse, type NextRequest } from 'next/server';
// Anonymous first-party visitor id for funnel analytics; skipped when the visitor opts out or sends Global Privacy Control.
export function proxy(req: NextRequest) {
  if (process.env.SHOWCASE === '1' && req.nextUrl.pathname === '/admin/login') return NextResponse.redirect(new URL('/admin', req.url));
  const res = NextResponse.next();
  if (!req.cookies.get('mv_vid') && req.headers.get('sec-gpc') !== '1' && req.cookies.get('mv_optout')?.value !== '1') res.cookies.set('mv_vid', crypto.randomUUID(), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 365, secure: req.nextUrl.protocol === 'https:' });
  return res;
}
export const config = { matcher: ['/((?!_next|assets|favicon|icon|robots|sitemap|api).*)'] };
