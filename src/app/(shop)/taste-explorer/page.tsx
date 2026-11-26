import type { Metadata } from 'next'; import { TasteQuiz } from '@/components/tastequiz';
export const metadata: Metadata = { title: 'Taste Explorer', description: 'Seven quick questions about sweet, crunchy, plain and bold, then suggestions from the catalogue with the reason for each.', alternates: { canonical: '/taste-explorer' } };
export default function Page() { return <div className="wrap py-8 lg:py-16"><h1 className="h1">Taste Explorer</h1><p className="lead mb-8 mt-3">Seven choices. Suggestions come from tags on each product, and we show why each one matched.</p><TasteQuiz /></div>; }
