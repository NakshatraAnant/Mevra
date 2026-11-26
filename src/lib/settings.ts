import 'server-only';
import { cache } from 'react';
import { live, type AnySql } from './db';
export type Settings = {
  brand: { name: string; tagline: string; mission: string; colors: Record<'forest' | 'deep' | 'ivory' | 'cream' | 'charcoal' | 'gold' | 'grey' | 'border', string>; logo_path: string };
  announcement: { enabled: boolean; text: string; href: string };
  commerce: { min_order_paise: number; free_shipping_paise: number; shipping_paise: number; cod_enabled: boolean; cod_fee_paise: number; cod_max_paise: number; cod_blocked_pins: string[]; site_discount_ceiling_bp: number; festival_discount_ceiling_bp: number; cod_share_target_bp: number; online_payments_enabled: boolean; payment_provider: string };
  delivery: { zones: { prefixes: string[]; label: string; min: number; max: number }[]; note: string };
  gifting: { min_corporate: number; min_wedding: number; min_festival: number };
  b2b: { min_drop_paise: number; service_area: string; new_terms: string; proven_terms: string; show_price_list: boolean };
  business: Record<'legal_name' | 'fssai' | 'gstin' | 'address' | 'city' | 'state' | 'email' | 'phone' | 'whatsapp' | 'hours' | 'instagram' | 'facebook' | 'youtube', string>;
  home: Record<'hero_title' | 'hero_copy' | 'hero_cta' | 'hero_cta2' | 'bestseller_heading' | 'bestseller_note', string>;
  finance: { target_margin_bp: number; cod_collection_cost_paise: number; default_shipping_cost_paise: number; rto_cost_paise: number; cost_inputs_set: boolean };
  loyalty: { enabled: boolean; points_per_100: number; point_value_paise: number; min_redeem: number; max_redeem_bp: number; expiry_days: number; review_points: number; birthday_points: number; welcome_points: number; referral_referrer: number; referral_referee: number; referral_min_order_paise: number; referral_monthly_cap: number; margin_floor: boolean };
  mix: { min_g: number; max_g: number; step_g: number; max_ingredients: number; saving_threshold_g: number; saving_bp: number };
  gift: { message_max: number; lead_days: number; allow_dates: boolean };
  refill: { enabled: boolean; mode: string; intervals: number[] };
  nav: { items: { label: string; href: string }[] };
  home2: Record<'hero_title' | 'hero_copy' | 'hero_cta' | 'hero_cta2' | 'week_slug' | 'week_note', string>;
  integrations: { feed_enabled: boolean };
  legal_display: Record<'manufacturer' | 'packer' | 'marketer' | 'consumer_care', string>;
  analytics: { churn_days: number; dormant_days: number; high_value_percentile: number; min_repeat_for_interval: number; min_sessions_for_conversion: number };
};
export async function loadSettings(sql: AnySql): Promise<Settings> {
  const rows = await sql<{ key: string; value: unknown }[]>`SELECT key, value FROM site_settings`;
  return Object.fromEntries(rows.map(r => [r.key, r.value])) as Settings;
}
export const getSettings = cache(() => loadSettings(live()));
export const waLink = (wa: string, text: string) => wa ? `https://wa.me/${wa.replace(/\D/g, '')}?text=${encodeURIComponent(text)}` : null;
