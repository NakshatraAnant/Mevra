import type { NextConfig } from 'next';
const dev = process.env.NODE_ENV !== 'production';
const csp = ["default-src 'self'", `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`, "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self' data:", `connect-src 'self'${dev ? ' ws:' : ''}`, "frame-ancestors 'none'", "form-action 'self'", "base-uri 'self'", "object-src 'none'"].join('; ');
const config: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.NEXT_DIST || '.next',
  experimental: { serverActions: { bodySizeLimit: '9mb' } },
  serverExternalPackages: ['postgres'],
  images: { formats: ['image/webp'], qualities: [75, 88], deviceSizes: [360, 430, 640, 828, 1080, 1280, 1600], imageSizes: [96, 160, 256, 320] },
  redirects: async () => [['/shipping', '/shipping-returns'], ['/returns', '/shipping-returns'], ['/privacy', '/privacy-policy'], ['/terms', '/terms-and-conditions'], ['/our-standards', '/standards'], ['/standards/grading', '/grading-guide'], ['/gifting/wedding', '/gifting/weddings'], ['/order-confirmation', '/track-order'], ['/categories/:slug', '/collections/:slug'], ['/account/profile', '/account']].map(([source, destination]) => ({ source, destination, permanent: false })),
  headers: async () => [{ source: '/:path*', headers: [
    { key: 'Content-Security-Policy', value: csp }, { key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }] },
    { source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] }],
};
export default config;
