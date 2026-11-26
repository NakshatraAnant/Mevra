import { NextResponse } from 'next/server'; import { parseIntent, searchProducts } from '@/lib/catalog'; import { allow } from '@/lib/auth';
export async function GET(req: Request) {
  if (!(await allow('search', 160, 60))) return NextResponse.json({ results: [], notes: [], total: 0 }, { status: 429 }); const q = (new URL(req.url).searchParams.get('q') || '').slice(0, 60); const all = await searchProducts(q);
  return NextResponse.json({ total: all.length, notes: parseIntent(q).notes, results: all.slice(0, 9).map(p => { const v = p.variants.find(v => v.on_sale) || p.variants[0]; return { slug: p.slug, name: p.name, grade: p.grade, image: p.image?.src, label: v?.label, price: v?.price ?? null, status: p.status, on_sale: p.on_sale, basis: v?.basis }; }) });
}
