// Idempotent launch seed: catalogue, settings, gift tiers, first owner. Contains NO stock, lots, certificates, reviews, customers or orders.
import postgres from 'postgres';
import { pathToFileURL } from 'node:url';
import { scryptSync, randomBytes } from 'node:crypto';
import { env, ROOT } from './env.mjs'; import fs from 'node:fs'; import path from 'node:path';
import { ensureDb } from './pg.mjs'; import { seedV2 } from './catalogue.mjs'; import { seedContent } from './content.mjs';

export const hashPassword = p => { const s = randomBytes(16); return `scrypt$${s.toString('hex')}$${scryptSync(p.normalize('NFKC'), s, 64, { N: 16384, r: 8, p: 1 }).toString('hex')}`; };

export const SETTINGS = {
  brand: { name: 'MEVRA', tagline: 'Graded. Dated. Honest.', mission: 'Honest dry fruits, served personally.', colors: { forest: '#173D32', deep: '#102D25', ivory: '#F7F3EA', cream: '#EFE8DA', charcoal: '#282923', gold: '#B49A65', grey: '#67645b', border: '#E5DED1' }, logo_path: '' },
  announcement: { enabled: true, text: 'Free shipping on orders above ₹999', href: '/shipping-returns' },
  commerce: { min_order_paise: 49900, free_shipping_paise: 99900, shipping_paise: 7900, cod_enabled: true, cod_fee_paise: 4000, cod_max_paise: 0, cod_blocked_pins: [], site_discount_ceiling_bp: 1000, festival_discount_ceiling_bp: 1500, cod_share_target_bp: 2000, online_payments_enabled: false, payment_provider: '' },
  delivery: { zones: [], note: 'Delivery timelines will be shown here once the delivery partner is configured. Our team confirms the expected date after you order.' },
  gifting: { min_corporate: 25, min_wedding: 50, min_festival: 25 },
  b2b: { min_drop_paise: 500000, service_area: 'Jaipur', new_terms: 'Cash or UPI on delivery', proven_terms: '7–15 day terms for proven buyers', show_price_list: true },
  business: { legal_name: '', fssai: '', gstin: '', address: '', city: 'Jaipur', state: 'Rajasthan', email: '', phone: '', whatsapp: '', hours: '', instagram: '', facebook: '', youtube: '' },
  home: { hero_title: 'Graded. Dated. Honest.', hero_copy: 'Dry fruits with the grade, origin and pack date clearly shown. Carefully sourced, thoughtfully packed and delivered to your door.', hero_cta: 'Shop the Collection', hero_cta2: 'Explore Our Standards', bestseller_heading: 'Start here', bestseller_note: 'Our launch selection, chosen by the team. A true best-seller list will follow real sales.' },
  finance: { target_margin_bp: 0, cod_collection_cost_paise: 0, default_shipping_cost_paise: 0, rto_cost_paise: 0, cost_inputs_set: false },
  analytics: { churn_days: 120, dormant_days: 75, high_value_percentile: 80, min_repeat_for_interval: 2, min_sessions_for_conversion: 100 },
};

const P = (o) => o;
const PRODUCTS = [
  P({ sku: 'ALM-IND-500', slug: 'california-almonds-independence-23-25', name: 'California Almonds Independence', cat: 'almonds-cashews', family: 'almond', grade: '23/25', label: '500 g', g: 500, price: 649, rank: 1, featured: true, img: 'almonds-independence-23-25-500g', noun: 'almonds', uses: ['Everyday snacking', 'Cooking & baking'], terms: 'badam baadaam almond almonds amond independance giri', pairs: ['DAT-KIM-500', 'MIX-4SEED-250'],
    short: 'A generous, everyday almond in a clearly stated 23/25 size.', overview: 'Whole brown-skinned almonds of the Independence variety, sold by count. 23/25 means roughly 23 to 25 kernels make up an ounce (28 g), so you know the size before the pack arrives.', taste: 'Mild, gently sweet and firm, with a clean crunch. Independence has a lighter skin and a smoother bite than many everyday almonds.', note: '23/25 is a count per ounce. A lower count means a larger kernel. It describes size, not taste, and it is stated so you can compare like with like.', best: 'Soaking overnight, snacking, chopping into kheer and halwa, and roasting with a little salt.' }),
  P({ sku: 'ALM-NON-250', slug: 'california-almonds-nonpareil', name: 'California Almonds Nonpareil', cat: 'almonds-cashews', family: 'almond', grade: 'Nonpareil', label: '250 g', g: 250, price: 379, rank: 5, img: 'almonds-nonpareil-250g', noun: 'almonds', uses: ['Everyday snacking', 'Gifting & guests'], terms: 'badam baadaam almond nonpareil non pareil nonparil mamra premium', pairs: ['DAT-KIM-500', 'RAI-AFG-250'],
    short: 'The smooth, flat, elegant almond, in a smaller everyday pack.', overview: 'Nonpareil is an almond variety known for its flat, even shape and thin, light-coloured skin. Choose it when appearance matters: for a guest bowl, slicing or garnishing.', taste: 'Delicate and sweet with a fine, even crunch and little skin bitterness.', note: 'Nonpareil is a variety name rather than a size count. The size count of each lot is shown when it has been recorded.', best: 'Serving whole, slivering over desserts, and gifting bowls.' }),
  P({ sku: 'CAS-W320-500', slug: 'cashew-w320', name: 'Cashew W320', cat: 'almonds-cashews', family: 'cashew', grade: 'W320', label: '500 g', g: 500, price: 629, rank: 6, img: 'cashew-w320-500g', noun: 'cashews', uses: ['Everyday snacking', 'Cooking & baking'], terms: 'kaju kajoo cashew cashews cashewnut casew w320 whole white', pairs: ['MIX-4SEED-250', 'RAI-AFG-250'],
    short: 'Whole white cashews in the dependable W320 grade.', overview: 'W320 stands for whole white kernels at roughly 320 pieces per pound (about 700 per kilogram). It is the most widely used whole-cashew grade for homes and kitchens.', taste: 'Creamy, mild and buttery with a tender bite.', note: '“W” means whole white. The number is the approximate kernel count per pound: W240 is larger, W320 is the everyday standard.', best: 'Curries and gravies, kaju katli, roasting, and the snack jar.' }),
  P({ sku: 'DAT-KIM-500', slug: 'soft-kimia-dates', name: 'Soft Kimia Dates', cat: 'dates-raisins', family: 'date', grade: 'Kimia', label: '500 g', g: 500, price: 249, rank: 2, featured: true, img: 'soft-kimia-dates-500g', noun: 'dates', uses: ['Everyday snacking', 'Natural sweetening'], terms: 'khajoor khajur dates date kimia kimiya mazafati soft', pairs: ['ALM-IND-500', 'MAK-4SUT-100'],
    short: 'Dark, soft and syrupy dates that need no dressing up.', overview: 'Kimia is a soft, dark date with a high-moisture, melting texture. Because it is soft, it is best kept chilled and enjoyed within the period stated on the pack.', taste: 'Deep caramel sweetness with a moist, almost fudge-like texture.', note: 'Kimia is the type of date. Softness is a feature of the type; skins may loosen slightly and that is natural.', best: 'Eating as they are, stuffing with almonds, and blending into shakes and laddoos.', storage: 'Keep refrigerated in the original pack or an airtight box. Follow the best-before date on your pack.' }),
  P({ sku: 'RAI-AFG-250', slug: 'afghan-green-raisins', name: 'Afghan Green Raisins', cat: 'dates-raisins', family: 'raisin', grade: 'Green Raisins', label: '250 g', g: 250, price: null, rank: 8, img: 'afghan-green-raisins-250g', noun: 'raisins', uses: ['Cooking & baking', 'Natural sweetening'], terms: 'kishmish kismis kishmis raisins raisin green afghan hari', pairs: ['CAS-W320-500', 'ALM-NON-250'],
    short: 'Long green raisins with a bright, fruity sweetness.', overview: 'Elongated green raisins for the kitchen and the snack bowl. The selling price for this pack is being finalised. Leave your number or email and we will let you know when it opens.', taste: 'Sweet with a light tang and a tender chew.', note: 'Green Raisins describes the type and colour. Lot-level origin and grade details appear once recorded and verified.', best: 'Pulao, kheer, baking, and mixing with roasted nuts.' }),
  P({ sku: 'MAK-4SUT-100', slug: 'makhana-4-sut', name: 'Makhana', cat: 'seeds-makhana-mixes', family: 'makhana', grade: '4-Sut', label: '100 g', g: 100, price: 199, rank: 3, featured: true, img: 'makhana-4-sut-100g', noun: 'makhana', uses: ['Everyday snacking', 'Fasting & festive'], terms: 'makhana makhane foxnut fox nut fox nuts lotus seed phool 4sut 4 sut', pairs: ['MIX-TRAIL-200', 'DAT-KIM-500'],
    short: 'Light, well-popped fox nuts, sized 4-Sut.', overview: 'Popped lotus seeds, plain and unseasoned. “Sut” is the traditional trade measure for makhana size, taken from the sieve used to sort it.', taste: 'Neutral and airy. Crisp after a few minutes of slow roasting.', note: '4-Sut is a size grade. A higher sut number means a larger popped seed.', best: 'Roasting with ghee and salt, kheer, and curries.' }),
  P({ sku: 'MIX-4SEED-250', slug: 'four-seed-mix', name: 'Four-Seed Mix', cat: 'seeds-makhana-mixes', family: 'mix', grade: 'Four Seed', label: '250 g', g: 250, price: 249, rank: 4, featured: true, img: 'four-seed-mix-250g', noun: 'mixed seeds', uses: ['Everyday snacking', 'Cooking & baking'], terms: 'seeds seed mix four 4 pumpkin sunflower melon flax beej', pairs: ['CAS-W320-500', 'ALM-IND-500'],
    short: 'A ready-to-sprinkle blend of four edible seeds.', overview: 'One pack for salads, curd, rotis and baking. The exact seeds and their proportions will be published here from the approved recipe and the printed label.', taste: 'Nutty and savoury, with a mixture of crunch and chew.', note: 'Four Seed refers to the number of seed types in the mix.', best: 'Salads, curd bowls, dough, granola and soups.', ingredients: 'The final recipe and proportions are awaiting confirmation. Images are illustrative. Please read the pack label before consumption.' }),
  P({ sku: 'MIX-TRAIL-200', slug: 'trail-mix', name: 'Trail Mix', cat: 'seeds-makhana-mixes', family: 'mix', grade: 'Mixed', label: '200 g', g: 200, price: 299, rank: 7, img: 'trail-mix-200g', noun: 'trail mix', uses: ['Everyday snacking', 'Travel & office'], terms: 'trail mix mixed nuts panchmeva panch mewa mewa meva travel office', pairs: ['MAK-4SUT-100', 'ALM-IND-500'],
    short: 'An easy handful for the desk, drive or trek.', overview: 'A mixed pack of nuts, dried fruit and seeds. The exact composition will be published here from the approved recipe and the printed label.', taste: 'Sweet and nutty with plenty of crunch.', note: 'Mixed describes a blend. Each ingredient carries its own grade, listed on the label once confirmed.', best: 'Office drawers, travel and lunch boxes.', ingredients: 'The final recipe and proportions are awaiting confirmation. Images are illustrative. Please read the pack label before consumption.' }),
];
const BUNDLES = [
  { sku: 'BND-NUT', slug: 'nut-lovers-bundle', name: 'Nut Lovers’ Bundle', price: 1199, rank: 20, img: 'nut-lovers-bundle', parts: ['ALM-IND-500', 'CAS-W320-500'], short: 'Two pantry essentials, one kilogram in all.', uses: ['Everyday snacking', 'Cooking & baking'] },
  { sku: 'BND-PANTRY', slug: 'everyday-pantry-bundle', name: 'Everyday Pantry Bundle', price: 1029, rank: 21, img: 'everyday-pantry-bundle', parts: ['ALM-IND-500', 'DAT-KIM-500', 'MAK-4SUT-100'], short: 'Almonds, dates and makhana for the week ahead.', uses: ['Everyday snacking'] },
  { sku: 'BND-FAMILY', slug: 'family-bundle', name: 'Family Bundle', price: 1659, rank: 22, img: 'family-consumption-bundle', parts: ['ALM-IND-500', 'CAS-W320-500', 'DAT-KIM-500', 'MIX-4SEED-250'], short: 'A fuller shelf for a bigger household.', uses: ['Everyday snacking', 'Cooking & baking'] },
  { sku: 'BND-PREMIUM', slug: 'premium-assortment-bundle', name: 'Premium Assortment', price: 1229, rank: 23, img: 'premium-assortment-bundle', parts: ['ALM-NON-250', 'CAS-W320-500', 'MIX-TRAIL-200'], short: 'Nonpareil almonds, whole cashews and trail mix.', uses: ['Gifting & guests', 'Everyday snacking'] },
  { sku: 'BND-SNACK', slug: 'mixed-snacking-bundle', name: 'Mixed Snacking Bundle', price: 699, rank: 24, img: 'mixed-dry-fruit-assortment', parts: ['MAK-4SUT-100', 'MIX-4SEED-250', 'MIX-TRAIL-200'], short: 'Three light, ready-to-eat packs.', uses: ['Everyday snacking', 'Travel & office'] },
];
// Seasonal / gifting-only lines exist in the catalogue but stay inactive until the owner activates them.
const DEFERRED = [
  ['WAL-SEA-250', 'walnuts', 'Walnuts', 'almonds-cashews', 'walnut', '250 g', 250, 'Seasonal from September'], ['ANJ-SEA-250', 'anjeer', 'Anjeer (Dried Figs)', 'dates-raisins', 'fig', '250 g', 250, 'Seasonal from October'],
  ['PIS-GFT-250', 'pistachio', 'Pistachio', 'almonds-cashews', 'pistachio', '250 g', 250, 'Gifting only'], ['CAS-W240-500', 'cashew-w240', 'Cashew W240', 'almonds-cashews', 'cashew', '500 g', 500, 'Gifting only'],
];
const CATS = [
  ['almonds-cashews', 'Almonds & Cashews', 'Sized, counted and named by grade.', 1], ['dates-raisins', 'Dates & Raisins', 'Naturally sweet, soft and bright.', 2],
  ['seeds-makhana-mixes', 'Seeds, Makhana & Mixes', 'Light, crunchy and ready to eat.', 3], ['bundles', 'Bundles', 'Packs that belong together, at an honest saving.', 4],
];
const PURPOSES = [['main', 'Pack presentation'], ['detail', 'Texture close-up'], ['lifestyle', 'Serving'], ['ingredient-flatlay', 'What is inside'], ['scale-quantity', 'Pack and quantity'], ['editorial', 'Still life']];
const STORAGE = 'Store in a cool, dry place away from sunlight. Reseal or move to an airtight jar after opening. Follow the best-before date on your pack.';
const PACKAGING = 'Packed in a resealable pouch. Final pack artwork is in preparation; images show an illustrative, unlabelled pouch.';
const FAQ = n => [{ q: 'What grade will I receive?', a: 'The grade stated beside the product name. If a lot differs, it will not be sold under this listing.' }, { q: 'How do I find the pack date?', a: 'It is printed on the pack with the lot number. When a lot is recorded, you can also look it up on our standards page.' }, { q: 'What if my pack arrives damaged?', a: `Keep the ${n} and the packaging, and contact us with your order number and photos. See Shipping & returns for details.` }];

export async function seedCatalogue(sql, { quiet } = {}) {
  for (const [k, v] of Object.entries(SETTINGS)) await sql`INSERT INTO site_settings (key, value) VALUES (${k}, ${sql.json(v)}) ON CONFLICT (key) DO NOTHING`;
  if ((await sql`SELECT 1 FROM products LIMIT 1`).length) return false;
  await sql.begin(async t => {
    const cat = {}; for (const [slug, name, blurb, sort] of CATS) [{ id: cat[slug] }] = await t`INSERT INTO categories (slug, name, blurb, sort, hero_asset, thumb_asset) VALUES (${slug}, ${name}, ${blurb}, ${sort}, ${`/assets/mevra/categories/${slug}-category-hero.webp`}, ${`/assets/mevra/categories/${slug}-category-thumb.webp`}) RETURNING id`;
    const vid = {};
    for (const p of PRODUCTS) {
      const [{ id }] = await t`INSERT INTO products ${t({ slug: p.slug, name: p.name, category_id: cat[p.cat], family: p.family, grade: p.grade, short_desc: p.short, overview: p.overview, taste: p.taste, grade_note: p.note, best_uses: p.best, ingredients: p.ingredients || `${p.noun[0].toUpperCase() + p.noun.slice(1)}. Please read the pack label for the final declaration.`, storage: p.storage || STORAGE, packaging: PACKAGING, uses: p.uses, search_terms: p.terms, pairs_with: p.pairs, merch_rank: p.rank, featured: !!p.featured, faqs: t.json(FAQ(p.noun)) })} RETURNING id`;
      const [v] = await t`INSERT INTO product_variants ${t({ product_id: id, sku: p.sku, label: p.label, weight_g: p.g, price_paise: p.price ? p.price * 100 : null })} RETURNING id`; vid[p.sku] = { id: v.id, ...p };
      await t`INSERT INTO inventory (variant_id) VALUES (${v.id})`; await t`INSERT INTO variant_costs (variant_id) VALUES (${v.id})`;
      let i = 0; for (const [pu, label] of PURPOSES) await t`INSERT INTO product_images ${t({ product_id: id, purpose: pu, src: `/assets/mevra/products/${p.img}-${pu}.webp`, alt: `${label}: ${p.name}, ${p.label} (illustrative visual)`, sort: i++ })}`;
    }
    for (const b of BUNDLES) {
      const parts = b.parts.map(s => vid[s]); const g = parts.reduce((a, x) => a + x.g, 0);
      const [{ id }] = await t`INSERT INTO products ${t({ slug: b.slug, name: b.name, kind: 'bundle', category_id: cat.bundles, family: 'bundle', short_desc: b.short, overview: `${b.short} This bundle contains ${parts.map(x => `${x.name} (${x.grade}, ${x.label})`).join(', ')}. The saving shown is calculated from the current prices of the individual packs.`, taste: 'Each pack keeps its own character. See the individual product pages for taste notes.', grade_note: 'Every pack in the bundle carries its own grade.', best_uses: 'Stocking the pantry in one order.', ingredients: parts.map(x => x.name).join(', ') + '. Please read each pack label.', storage: STORAGE, packaging: 'Supplied as individual sealed pouches, shipped together.', uses: b.uses, search_terms: 'bundle combo pack set hamper', pairs_with: [], merch_rank: b.rank, featured: ['BND-NUT', 'BND-PANTRY', 'BND-FAMILY'].includes(b.sku), faqs: t.json(FAQ('packs')) })} RETURNING id`;
      const [v] = await t`INSERT INTO product_variants ${t({ product_id: id, sku: b.sku, label: `${parts.length} packs`, weight_g: g, price_paise: b.price * 100 })} RETURNING id`;
      await t`INSERT INTO inventory (variant_id) VALUES (${v.id})`; await t`INSERT INTO variant_costs (variant_id) VALUES (${v.id})`;
      for (const x of parts) await t`INSERT INTO bundle_components (bundle_variant_id, component_variant_id) VALUES (${v.id}, ${x.id})`;
      await t`INSERT INTO product_images ${t({ product_id: id, purpose: 'main', src: `/assets/mevra/bundles/${b.img}.webp`, alt: `${b.name}: ${parts.map(x => x.name).join(', ')} (illustrative visual)`, sort: 0 })}`;
      let i = 1; for (const x of parts) await t`INSERT INTO product_images ${t({ product_id: id, purpose: 'component', src: `/assets/mevra/products/${x.img}-detail.webp`, alt: `${x.name}, included in this bundle (illustrative visual)`, sort: i++ })}`;
    }
    for (const [sku, slug, name, c, family, label, g, note] of DEFERRED) {
      const [{ id }] = await t`INSERT INTO products ${t({ slug, name, category_id: cat[c], family, active: false, availability_note: note, merch_rank: 90, storage: STORAGE, packaging: PACKAGING })} RETURNING id`;
      const [v] = await t`INSERT INTO product_variants ${t({ product_id: id, sku, label, weight_g: g, price_paise: null })} RETURNING id`; await t`INSERT INTO inventory (variant_id) VALUES (${v.id})`; await t`INSERT INTO variant_costs (variant_id) VALUES (${v.id})`;
    }
    const tiers = [['classic', 'Classic', 400, 749, 'A compact rigid box with a printed sleeve.', 'A considered gesture for a wider list.', 1], ['signature', 'Signature', 600, 1449, 'A larger compartment box with foil detailing.', 'The one we would send to a client.', 2], ['premium', 'Premium', 800, 2699, 'Our fullest presentation box with a note card.', 'For the family closest to you.', 3]];
    for (const [slug, name, g, pr, contents, blurb, sort] of tiers) await t`INSERT INTO gift_tiers ${t({ slug, name, weight_g: g, price_paise: pr * 100, contents, blurb, sort })}`;
    let s = 0; for (const [item, grade, pack] of [['California Almonds Independence', '23/25', '10 kg'], ['California Almonds Nonpareil', 'Nonpareil', '10 kg'], ['Cashew', 'W320', '10 kg'], ['Dates', 'Kimia', 'Per carton'], ['Green Raisins', 'Green', '10 kg'], ['Makhana', '4-Sut', '10 kg']]) await t`INSERT INTO b2b_prices ${t({ item, grade, pack, sort: s++ })}`;
  });
  if (!quiet) console.log('seeded launch catalogue'); return true;
}

export async function seed() {
  for (const schema of ['public', 'demo']) {
    const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => { }, connection: { search_path: schema } });
    try {
      await seedCatalogue(sql); await seedV2(sql); await seedContent(sql);
      { const root = path.join(ROOT, 'public'); const FO = { mobile: 'homepage', catalogue: 'products', categories: 'products', bundles: 'products', standards: 'editorial', models: '3d' }; const rows = []; const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(webp|glb|svg)$/.test(e.name)) { const rel = '/' + path.relative(root, p).replace(/\\/g, '/'); const seg = rel.split('/').slice(-2)[0]; const sk = e.name.startsWith('snack-') || seg.startsWith('sk-') ? 'snack-king' : e.name.startsWith('pantry-') ? 'pantry' : FO[seg] || seg; rows.push({ kind: e.name.endsWith('glb') ? 'model3d' : e.name.endsWith('svg') ? 'vector' : 'image', folder: sk, path: rel, alt: e.name.replace(/\.\w+$/, '').replace(/-/g, ' '), status: e.name === 'homepage-hero-desktop.webp' ? 'supplied' : 'illustrative', bytes: fs.statSync(p).size }); } } }; for (const d of ['assets/mevra', 'models']) if (fs.existsSync(path.join(root, d))) walk(path.join(root, d)); if (rows.length) await sql`INSERT INTO media_assets ${sql(rows)} ON CONFLICT (path) DO NOTHING`; }
      if (schema === 'public' && !(await sql`SELECT 1 FROM admin_users LIMIT 1`).length && env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
        await sql`INSERT INTO admin_users ${sql({ email: env.ADMIN_EMAIL.toLowerCase(), name: 'Owner', role: 'owner', password_hash: hashPassword(env.ADMIN_PASSWORD) })}`; console.log('seeded owner account (see .env.local)');
      }
    } finally { await sql.end(); }
  }
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) { const stop = await ensureDb(); await seed(); await stop(); process.exit(0); }
