'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
const ck = (k: string) => document.cookie.match(new RegExp(`(?:^|; )${k}=([^;]*)`))?.[1];
const set = (k: string, v: string, age: number) => { document.cookie = `${k}=${v}; path=/; max-age=${age}; samesite=lax`; };
const queue: object[] = []; let timer: ReturnType<typeof setTimeout> | undefined;
const flush = () => { if (!queue.length) return; const b = JSON.stringify({ events: queue.splice(0, 20) }); fetch('/api/events', { method: 'POST', body: b, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {}); };
export function send(name: string, e: { product_id?: string; props?: Record<string, string | number | boolean> } = {}) {
  let sid = ck('mv_sid'); if (!sid) sid = crypto.randomUUID(); set('mv_sid', sid, 1800);
  queue.push({ id: crypto.randomUUID(), name, path: location.pathname, at: new Date().toISOString(), ...e }); clearTimeout(timer); timer = setTimeout(flush, 600);
}
function attribution(q: URLSearchParams) { // last non-direct touch, 30 days
  const s = q.get('utm_source'); let u: { s: string; m: string; c: string } | null = null;
  if (s) u = { s: s.toLowerCase(), m: (q.get('utm_medium') || 'unspecified').toLowerCase(), c: q.get('utm_campaign') || '' };
  else if (q.get('gclid')) u = { s: 'google', m: 'cpc', c: '' }; else if (q.get('fbclid')) u = { s: 'facebook', m: 'social', c: '' };
  else if (document.referrer) { try { const h = new URL(document.referrer).hostname.replace(/^www\./, ''); if (h !== location.hostname.replace(/^www\./, '') && !ck('mv_sid')) u = { s: /google\./.test(h) ? 'google' : /instagram/.test(h) ? 'instagram' : /facebook|fb\.com/.test(h) ? 'facebook' : /whatsapp|wa\.me/.test(h) ? 'whatsapp' : h, m: /google|bing|duckduckgo|yahoo/.test(h) ? 'organic' : /instagram|facebook|whatsapp/.test(h) ? 'social' : 'referral', c: '' }; } catch {} }
  if (u) set('mv_utm', encodeURIComponent(JSON.stringify(u)), 30 * 86400);
}
export function Tracker() {
  const path = usePathname(), q = useSearchParams();
  useEffect(() => { attribution(new URLSearchParams(location.search)); send('page_view'); }, [path]);
  useEffect(() => { void q; }, [q]);
  useEffect(() => { const c = (e: MouseEvent) => { const t = (e.target as HTMLElement).closest?.('[data-track]'); if (t) send(t.getAttribute('data-track')!); }; const h = () => flush(); document.addEventListener('click', c); addEventListener('pagehide', h); return () => { document.removeEventListener('click', c); removeEventListener('pagehide', h); }; }, []);
  return null;
}
export function TrackView({ name, product, props }: { name: string; product?: string; props?: Record<string, string | number> }) { const k = JSON.stringify(props || {}); useEffect(() => { send(name, { product_id: product, props: JSON.parse(k) }); if (product) try { const r: string[] = JSON.parse(localStorage.getItem('mv_recent') || '[]'); localStorage.setItem('mv_recent', JSON.stringify([product, ...r.filter(x => x !== product)].slice(0, 8))); } catch {} }, [name, product, k]); return null; }
