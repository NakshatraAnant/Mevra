import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/account', '/cart', '/checkout', '/order-confirmation', '/search', '/compare', '/gift/', '/r/', '/business/portal'] }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100'}/sitemap.xml` }; }
