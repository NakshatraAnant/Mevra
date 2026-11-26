import type { Metadata } from 'next'; import { CartPage } from '@/components/cartpage'; import { getSettings } from '@/lib/settings'; import { listProducts } from '@/lib/catalog'; import { Recent } from '@/components/product';
export const metadata: Metadata = { title: 'Your cart', robots: { index: false } };
export default async function Page() { const [s, all] = await Promise.all([getSettings(), listProducts()]); return <><CartPage min={s.commerce.min_order_paise} lead={s.gift.lead_days} codFee={s.commerce.cod_enabled ? s.commerce.cod_fee_paise : 0} /><Recent all={all} /></>; }
