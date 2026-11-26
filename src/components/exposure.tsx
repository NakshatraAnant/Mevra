'use client';
import { useEffect } from 'react'; import { send } from './tracker';
export function Exposure({ e }: { e: { key: string; variant: string }[] }) { const k = JSON.stringify(e); useEffect(() => { for (const x of JSON.parse(k) as { key: string; variant: string }[]) { const id = `mv_x_${x.key}`; if (sessionStorage.getItem(id) === x.variant) continue; sessionStorage.setItem(id, x.variant); send('experiment_exposure', { props: { experiment: x.key, variant: x.variant } }); } }, [k]); return null; }
