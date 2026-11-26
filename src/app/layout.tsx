import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { getSettings } from '@/lib/settings';
const serif = localFont({ src: [{ path: '../fonts/newsreader-latin-standard-normal.woff2', style: 'normal', weight: '200 800' }, { path: '../fonts/newsreader-latin-standard-italic.woff2', style: 'italic', weight: '200 800' }], variable: '--f-serif', display: 'swap' });
const sans = localFont({ src: '../fonts/figtree-latin-wght-normal.woff2', weight: '300 900', variable: '--f-sans', display: 'swap', declarations: [{ prop: 'unicode-range', value: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2122,U+2191,U+2193,U+2212,U+2215' }] });
const sansx = localFont({ src: '../fonts/figtree-latin-ext-wght-normal.woff2', weight: '300 900', variable: '--f-sansx', display: 'swap', preload: false, adjustFontFallback: false, declarations: [{ prop: 'unicode-range', value: 'U+0100-02BA,U+20A0-20C0' }] });
const sk = localFont({ src: '../fonts/bricolage-grotesque-latin-wdth-normal.woff2', weight: '200 800', variable: '--f-sk', display: 'swap', preload: false, declarations: [{ prop: 'font-stretch', value: '75% 100%' }] });
export const dynamic = 'force-dynamic';
export const viewport: Viewport = { themeColor: '#173D32', width: 'device-width', initialScale: 1 };
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100'), title: { default: `${s.brand.name} | Dry fruits, graded, dated and honest`, template: `%s | ${s.brand.name}` }, description: 'Premium, fairly priced dry fruits from Jaipur with the grade, origin and pack date clearly shown. Almonds, cashews, dates, makhana, seeds and gifting.', openGraph: { siteName: s.brand.name, type: 'website', locale: 'en_IN', images: [{ url: '/assets/mevra/homepage/homepage-hero-desktop.webp', width: 1536, height: 1024, alt: 'Bowls of almonds, cashews, dates, raisins and makhana (illustrative visual)' }] }, formatDetection: { telephone: false } };
}
export default async function Root({ children }: { children: React.ReactNode }) {
  const c = (await getSettings()).brand.colors; const ok = (x: string) => /^#[0-9a-f]{6}$/i.test(x);
  const vars = Object.entries(c).filter(([, v]) => ok(v)).map(([k, v]) => `--mv-${k}:${v}`).join(';');
  return <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${sansx.variable} ${sk.variable}`} data-scroll-behavior="smooth"><head><style>{`:root{${vars}}`}</style></head><body>{children}</body></html>;
}
