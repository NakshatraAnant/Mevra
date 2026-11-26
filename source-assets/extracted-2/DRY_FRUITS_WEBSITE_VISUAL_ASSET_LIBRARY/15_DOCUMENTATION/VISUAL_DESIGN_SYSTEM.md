# VISUAL_DESIGN_SYSTEM

Source: deck slide 26 (brand platform), slides 30-35 (mockups and photo directions). Hex values below are **proposed** - the deck names the colours but gives no codes (see MISSING_INFORMATION.md).

## Colour

| Role | Name | Proposed hex | Use |
|---|---|---|---|
| Primary | Forest green | `#1F4D3A` | Buttons, facts strip, nav, sleeves, icons |
| Background | Warm ivory | `#F5EFE3` | Page background, pouch colour, cards |
| Text | Charcoal | `#2B2B2B` | Body and headings |
| Accent | Muted antique gold | `#A88B4A` | Thin rules, foil, icon accents, gifting only in volume |
| Surface tone (photo) | Sandstone | `#E9DECB` | Placeholder tone; real Jaipur sandstone in photos |

Gold never exceeds ~5% of any screen. No other hues in UI. In photos, the only strong colours allowed are the food itself, green sleeves/aprons and small marigold accents on gifting/festival images.

## Typography (from deck)
Serif for brand name and headings; clean sans for facts panel and UI. Never in images.

## Photography direction

- **Light:** natural daylight from upper left through diffusion; soft fill; soft real contact shadows. One light logic across the library.
- **Surfaces:** sandstone (honed pale-pink Jaipur sandstone slab with fine natural grain), oak (light oak table with fine grain, matte finish), linen (warm ivory handloom linen over light oak), seamless (seamless warm-ivory studio sweep, very soft floor shadow), white (pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only), haveli (weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus), packroom (clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window), kitchen (professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light), lab (clean small quality-check bench: white laminate, glass beakers, digital scale, daylight).
- **Styling:** few props (brass scoop, ivory ceramic bowl, linen, chai). Never add ingredients a product does not contain.
- **People:** hands only (packer, baker, halwai). No faces (deck slide 34: "no faces without consent").
- **Texture:** every product image must hold real micro-texture - almond skin furrows, cashew matte surface, date wrinkles, makhana husk speckles.
- **No text in images**: no logos, labels, prices, dates, lot codes, QR codes or headlines. All of these are rendered in code.
- **Packaging:** matte-ivory or kraft stand-up pouch, clear window, blank label; real artwork overlaid later.

## Composition and text-safe zones

| Code | Rule | Typical use |
|---|---|---|
| left40 | subject in right 55%; left 40% empty for copy | desktop heroes and banners |
| right40 | subject left; right 40% empty | editorial blocks with copy on the right |
| top35 | portrait; top 35% empty | mobile heroes |
| bottom35 | portrait; bottom 35% empty | tiles with caption overlay |
| center | centred, 10% crop-safe border | product, tiles, gift boxes |
| fill | full-bleed texture/macro | detail shots |

The dashed box on each placeholder shows its zone exactly.

## Image ratios and sizes

| Placement | Web size | Ratio |
|---|---|---|
| Desktop hero | 2400x1000 | 12:5 |
| Mobile hero | 1080x1350 | 4:5 |
| Tablet hero | 1536x1152 | 4:3 |
| Collection header desktop / mobile | 2400x700 / 1080x720 | 24:7 / 3:2 |
| Product gallery | 2048x2048 | 1:1 |
| Category / need tiles | 800x800 / 1000x1250 | 1:1 / 4:5 |
| Bundle card | 900x1125 | 4:5 |
| Promo bands | 2400x900 or 2000x800 | 8:3 / 5:2 |
| Editorial blocks | 1600x1200 | 4:3 |
| Social share | 1200x630 | 40:21 |

Delivery: WebP quality ~80 (target under 250 KB for heroes, under 180 KB for product images), `srcset` at 50% and 100%. PNG only for cut-out pouches. SVG for icons, patterns and the facts strip.

## Treatments by area

- **Gifting:** warmer, slightly lower-key light; haveli stone; block-print sleeves (see `pattern-block-print-*.svg`), brass-tone foil, cotton thread, blank note card. Heritage stays an accent, not the whole frame.
- **B2B:** clean stainless kitchens, orderly tubs and bags, hands at work; reliable and professional, never a commodity-trading look (no piles of jute sacks as the main subject).
- **Our Standards:** documentary-style process close-ups; never show certificates, results or pass marks.

## Consistency test (run on every batch)
Place any new image beside the approved homepage hero and one product main image. Same light direction? Same white balance (warm-neutral, ~5200K look)? Same palette? Would a customer believe one photographer shot all three? If not, regenerate.
