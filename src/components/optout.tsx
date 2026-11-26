'use client';
import { useState } from 'react'; import { setAnalyticsOptOut } from '@/actions/cart';
export function OptOut() { const [d, set] = useState(false); return <button className="min-h-11 underline underline-offset-4" onClick={async () => { await setAnalyticsOptOut(!d); set(!d); }}>{d ? 'Analytics off. Turn on' : 'Turn off analytics'}</button>; }
