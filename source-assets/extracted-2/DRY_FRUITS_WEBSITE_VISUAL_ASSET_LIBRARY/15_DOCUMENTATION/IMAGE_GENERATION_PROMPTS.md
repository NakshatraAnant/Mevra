# IMAGE_GENERATION_PROMPTS

Every planned photographic asset has one prompt. **None of these prompts has been run yet** - this workspace has no image-generation model (see FINAL_QA_REPORT.md). They are written to be pasted into any modern photoreal model (GPT-Image, Imagen, Midjourney v7, Flux). Machine-readable copies: `13_IMAGE_GENERATION_PROMPTS/image_generation_prompts.json` and `.csv`.

## Shared style block (already appended to every prompt)

> Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark.

## Shared negative prompt (use for every image)

> text, letters, numbers, words, typography, logo, brand mark, watermark, fake label, gibberish print, plastic or waxy food, CGI look, illustration, oversaturated colour, neon, harsh flash, floating ingredients, levitating food, splashes, cluttered props, distorted packaging, warped hands, extra fingers, visible faces, ingredients not listed in the prompt (especially pistachio, walnut, berries, chocolate, cranberry), stock-photo look

## Generation loop for each asset

1. Generate 4 candidates at the master size. 2. Reject any with text, logos, extra ingredients or distorted products. 3. Check product accuracy against the SKU description (grade, shape, colour). 4. Check the text-safe zone is truly empty. 5. Compare beside two already-approved images for lighting and palette match. 6. Export master (PNG/TIFF) to `12_MASTER_HIGH_RESOLUTION/`, and the web file (WebP, q80) at the listed size to the listed path, overwriting the placeholder. 7. Update Generation/Approval status in the manifest.

## 01_HOMEPAGE

### PR-001 - HOME-HERO-01 - `homepage-hero-desktop.webp`
*Home > 3 Hero - 2400x1000 (12:5) - Desktop - priority P0*

```
A generous low mound of whole raw California almonds and a smaller cluster of soft dark dates on a honed Jaipur sandstone slab; a packer's clean hands (no face, sleeves of a forest-green apron) gently levelling almonds with a brass scoop; a matte-ivory stand-up pouch with a clear window, blank label, standing behind. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree elevated angle, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

Note: Deck slide 30 photo direction: almonds and dates on Jaipur sandstone, packer's hands.

### PR-002 - HOME-HERO-02 - `homepage-hero-mobile.webp`
*Home > 3 Hero (mobile) - 1080x1350 (4:5) - Mobile - priority P0*

```
Same scene recomposed vertically: almonds spilling from a brass scoop onto sandstone in the lower half, a few soft dates at the front, packer's hands entering from the bottom right, blank ivory pouch slightly out of focus behind. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree angle, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-003 - HOME-HERO-03 - `homepage-hero-tablet.webp`
*Home > 3 Hero (tablet) - 1536x1152 (4:3) - Tablet - priority P1*

```
Same hero scene as desktop, framed 4:3 with almonds, dates and blank pouch in the right half. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree angle, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3072x2304 px or larger.
```

### PR-004 - HOME-HERO-04 - `homepage-hero-alt-desktop.webp`
*Home > 3 Hero (alternate / seasonal rotation) - 2400x1000 (12:5) - Desktop - priority P0*

```
Overhead editorial arrangement of eight small brass-rimmed ivory ceramic bowls in two neat rows, each holding one launch product: Independence almonds, Nonpareil almonds, W320 cashews, soft dark dates, Afghan green raisins, makhana, four-seed mix, trail mix; nothing else. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: top-down 90-degree, 35mm, f/8, even daylight. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

### PR-005 - HOME-HERO-05 - `homepage-hero-alt-mobile.webp`
*Home > 3 Hero alternate (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
The eight product bowls arranged in a vertical 2x4 grid, overhead. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: top-down 90-degree, 35mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-006 - HOME-NEED-01 - `shop-by-need-snacking.webp`
*Home > 6 Shop by need - 1000x1250 (4:5) - All - priority P1*

```
A small ivory ceramic bowl of makhana and a bowl of trail mix on a light oak desk beside a cup of masala chai, afternoon window light; hand reaching for a makhana. Subject sits in the upper 60% of a portrait frame; the bottom 35% is clean, evenly lit negative space for copy and a button. Camera: 40-degree angle, 85mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2000x2500 px or larger.
```

### PR-007 - HOME-NEED-02 - `shop-by-need-gifting.webp`
*Home > 6 Shop by need - 1000x1250 (4:5) - All - priority P1*

```
Two rigid gift boxes wrapped in forest-green Jaipur block-print paper sleeves with thin cotton thread, one lid open showing almonds, cashews, raisins and dates in compartments. Subject sits in the upper 60% of a portrait frame; the bottom 35% is clean, evenly lit negative space for copy and a button. Camera: 40-degree angle, 85mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2000x2500 px or larger.
```

### PR-008 - HOME-NEED-03 - `shop-by-need-cooking.webp`
*Home > 6 Shop by need - 1000x1250 (4:5) - All - priority P1*

```
Slivered almonds and whole cashews being sprinkled from fingers over a brass bowl of kheer, wooden board, cardamom pods nearby. Subject sits in the upper 60% of a portrait frame; the bottom 35% is clean, evenly lit negative space for copy and a button. Camera: 40-degree angle, 85mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2000x2500 px or larger.
```

### PR-009 - HOME-STORY-01 - `graded-dated-explainer-desktop.webp`
*Home > 7 Graded & dated explanation - 1600x1000 (8:5) - Desktop - priority P0*

```
Close study of a packer's hand holding a single almond next to a small brass grading sieve and a neat row of almonds of identical size on sandstone; a blank date-stamp and ink pad nearby. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: low 20-degree angle, 100mm macro, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:5; render at 3200x2000 px or larger.
```

### PR-010 - HOME-STORY-02 - `graded-dated-explainer-mobile.webp`
*Home > 7 Graded & dated explanation (mobile) - 1080x1080 (1:1) - Mobile - priority P1*

```
Hand holding one almond above a neat row of identical almonds, brass sieve beside. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: low angle, 100mm macro, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2160x2160 px or larger.
```

### PR-011 - HOME-SRC-01 - `sourcing-story-teaser-desktop.webp`
*Home > 12 Sourcing story - 1600x1200 (4:3) - Desktop - priority P1*

```
Hessian sacks and open steel trays of almonds, cashews and raisins at a traditional Jaipur wholesale dry-fruit shop, an inspector's hands lifting a sample onto a brass scale; warm bazaar light, no faces. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: eye-level, 35mm, f/2.8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-012 - HOME-SRC-02 - `sourcing-story-teaser-mobile.webp`
*Home > 12 Sourcing story (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Inspector's hands lifting almonds onto a brass scale, sacks behind. Subject sits in the upper 60% of a portrait frame; the bottom 35% is clean, evenly lit negative space for copy and a button. Camera: eye-level, 50mm, f/2.8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-013 - HOME-BUN-01 - `bundles-band-desktop.webp`
*Home > 8 Bundles - 2000x800 (5:2) - Desktop - priority P1*

```
Three pairs of matte-ivory stand-up pouches with clear windows (almonds+cashews, dates+raisins, makhana+seed mix) tied in pairs with thin forest-green cotton tape, standing in a row; blank labels. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: straight-on eye level, 70mm, f/5.6. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 5:2; render at 3200x1280 px or larger.
```

### PR-014 - HOME-BUN-02 - `bundles-band-mobile.webp`
*Home > 8 Bundles (mobile) - 1080x1080 (1:1) - Mobile - priority P1*

```
One tied pair of pouches (almonds + cashews) front and centre, the other pairs softly behind. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: eye level, 70mm, f/4. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2160x2160 px or larger.
```

### PR-015 - HOME-GIFT-01 - `gifting-banner-desktop.webp`
*Home > 9 Gifting section - 2400x900 (8:3) - Desktop - priority P0*

```
A neat stack of five rigid gift boxes in forest-green Jaipur block-print sleeves with brass-tone foil edge, tied with natural cotton thread, on a sandstone haveli step; one open box showing nuts and dates. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-016 - HOME-GIFT-02 - `gifting-banner-mobile.webp`
*Home > 9 Gifting section (mobile) - 1080x1350 (4:5) - Mobile - priority P0*

```
Vertical stack of sleeved gift boxes on a haveli step, one open at the front. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: eye-level, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-017 - HOME-LOT-01 - `lot-lookup-visual.webp`
*Home > 10 Lot-certificate lookup - 1200x900 (4:3) - All - priority P1*

```
A hand holding a smartphone (screen blank, glowing softly) above the facts-strip area of a matte-ivory pouch lying on sandstone, the phone camera aimed at a blank square QR zone. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 45-degree angle, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 2400x1800 px or larger.
```

Note: Phone screen and QR must stay blank; real QR/lot UI rendered in code.

### PR-018 - HOME-WA-01 - `whatsapp-signup-visual.webp`
*Home > 14 WhatsApp signup - 1200x900 (4:3) - All - priority P1*

```
Hands holding a smartphone with a blank screen beside an open pouch of soft dates and a cup of chai on a light oak table, morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree angle, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 2400x1800 px or larger.
```

Note: No WhatsApp logo in image (trademark); add official badge in code if required.

### PR-019 - HOME-B2B-01 - `b2b-banner-desktop.webp`
*Home > 13 B2B section - 2400x900 (8:3) - Desktop - priority P0*

```
Orderly row of food-grade clear tubs and a 10 kg sealed bag of cashew pieces, sliced almonds and golden raisins on a stainless bakery bench, a baker's floured hands scattering sliced almonds over cake batter tins. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-020 - HOME-B2B-02 - `b2b-banner-mobile.webp`
*Home > 13 B2B section (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Baker's hands scattering sliced almonds from a clear tub over batter tins, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-021 - HOME-FOOT-01 - `footer-texture-sandstone.webp`
*Home > 15 Footer (optional texture) - 2400x400 (6:1) - Desktop - priority P3*

```
Flat, evenly lit macro texture of honed Jaipur sandstone, no objects. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: top-down, even light. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 6:1; render at 3840x640 px or larger.
```

Note: Optional. A plain colour footer is acceptable.

## 02_SHOP_AND_CATEGORIES

### PR-022 - CAT-01-HERO-D - `category-all-products-hero-desktop.webp`
*Shop > All eight launch products together > Collection header - 2400x700 (24:7) - Desktop - priority P0*

```
Overhead row of all eight launch products, each in a small mound on sandstone in a gentle arc: Independence almonds, Nonpareil almonds, W320 cashews, soft dark dates, Afghan green raisins, makhana, four-seed mix, trail mix. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 25-degree angle, 50mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 24:7; render at 3840x1120 px or larger.
```

### PR-023 - CAT-01-HERO-M - `category-all-products-hero-mobile.webp`
*Shop > All eight launch products together > Collection header (mobile) - 1080x720 (3:2) - Mobile - priority P1*

```
Overhead row of all eight launch products, each in a small mound on sandstone in a gentle arc: Independence almonds, Nonpareil almonds, W320 cashews, soft dark dates, Afghan green raisins, makhana, four-seed mix, trail mix, composed tighter for a phone. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: overhead, 35mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 3:2; render at 2160x1440 px or larger.
```

### PR-024 - CAT-01-THUMB - `category-all-products-thumbnail.webp`
*Shop / Home nav > All eight launch products together > Category tile - 800x800 (1:1) - All - priority P1*

```
Overhead row of all eight launch products, each in a small mound on sandstone in a gentle arc: Independence almonds, Nonpareil almonds, W320 cashews, soft dark dates, Afghan green raisins, makhana, four-seed mix, trail mix, tight crop on the product. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-025 - CAT-01-ARR - `category-all-products-arrangement.webp`
*Shop > All eight launch products together > In-grid editorial tile / banner - 1600x1200 (4:3) - All - priority P1*

```
Overhead row of all eight launch products, each in a small mound on sandstone in a gentle arc: Independence almonds, Nonpareil almonds, W320 cashews, soft dark dates, Afghan green raisins, makhana, four-seed mix, trail mix, editorial composition with one prop at most. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 85mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-026 - CAT-02-HERO-D - `category-almonds-and-cashews-hero-desktop.webp`
*Shop > Almonds & cashews > Collection header - 2400x700 (24:7) - Desktop - priority P0*

```
Two generous mounds, whole raw California almonds and whole white W320 cashews, meeting on light oak with a brass scoop between them. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 25-degree angle, 50mm, f/5.6. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 24:7; render at 3840x1120 px or larger.
```

### PR-027 - CAT-02-HERO-M - `category-almonds-and-cashews-hero-mobile.webp`
*Shop > Almonds & cashews > Collection header (mobile) - 1080x720 (3:2) - Mobile - priority P1*

```
Two generous mounds, whole raw California almonds and whole white W320 cashews, meeting on light oak with a brass scoop between them, composed tighter for a phone. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: overhead, 35mm, f/8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 3:2; render at 2160x1440 px or larger.
```

### PR-028 - CAT-02-THUMB - `category-almonds-and-cashews-thumbnail.webp`
*Shop / Home nav > Almonds & cashews > Category tile - 800x800 (1:1) - All - priority P1*

```
Two generous mounds, whole raw California almonds and whole white W320 cashews, meeting on light oak with a brass scoop between them, tight crop on the product. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-029 - CAT-02-ARR - `category-almonds-and-cashews-arrangement.webp`
*Shop > Almonds & cashews > In-grid editorial tile / banner - 1600x1200 (4:3) - All - priority P1*

```
Two generous mounds, whole raw California almonds and whole white W320 cashews, meeting on light oak with a brass scoop between them, editorial composition with one prop at most. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 85mm, f/3.5. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-030 - CAT-03-HERO-D - `category-dates-and-raisins-hero-desktop.webp`
*Shop > Dates & raisins > Collection header - 2400x700 (24:7) - Desktop - priority P0*

```
Soft dark Kimia dates piled in a shallow brass bowl beside a heap of long Afghan green raisins on ivory linen. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 25-degree angle, 50mm, f/5.6. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 24:7; render at 3840x1120 px or larger.
```

### PR-031 - CAT-03-HERO-M - `category-dates-and-raisins-hero-mobile.webp`
*Shop > Dates & raisins > Collection header (mobile) - 1080x720 (3:2) - Mobile - priority P1*

```
Soft dark Kimia dates piled in a shallow brass bowl beside a heap of long Afghan green raisins on ivory linen, composed tighter for a phone. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: overhead, 35mm, f/8. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 3:2; render at 2160x1440 px or larger.
```

### PR-032 - CAT-03-THUMB - `category-dates-and-raisins-thumbnail.webp`
*Shop / Home nav > Dates & raisins > Category tile - 800x800 (1:1) - All - priority P1*

```
Soft dark Kimia dates piled in a shallow brass bowl beside a heap of long Afghan green raisins on ivory linen, tight crop on the product. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-033 - CAT-03-ARR - `category-dates-and-raisins-arrangement.webp`
*Shop > Dates & raisins > In-grid editorial tile / banner - 1600x1200 (4:3) - All - priority P1*

```
Soft dark Kimia dates piled in a shallow brass bowl beside a heap of long Afghan green raisins on ivory linen, editorial composition with one prop at most. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 85mm, f/3.5. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-034 - CAT-04-HERO-D - `category-seeds-makhana-mixes-hero-desktop.webp`
*Shop > Seeds, makhana & mixes > Collection header - 2400x700 (24:7) - Desktop - priority P0*

```
Three low heaps side by side: bright white makhana, four-seed mix, and trail mix, on sandstone, a wooden spoon resting in the seeds. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 25-degree angle, 50mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 24:7; render at 3840x1120 px or larger.
```

### PR-035 - CAT-04-HERO-M - `category-seeds-makhana-mixes-hero-mobile.webp`
*Shop > Seeds, makhana & mixes > Collection header (mobile) - 1080x720 (3:2) - Mobile - priority P1*

```
Three low heaps side by side: bright white makhana, four-seed mix, and trail mix, on sandstone, a wooden spoon resting in the seeds, composed tighter for a phone. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: overhead, 35mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 3:2; render at 2160x1440 px or larger.
```

### PR-036 - CAT-04-THUMB - `category-seeds-makhana-mixes-thumbnail.webp`
*Shop / Home nav > Seeds, makhana & mixes > Category tile - 800x800 (1:1) - All - priority P1*

```
Three low heaps side by side: bright white makhana, four-seed mix, and trail mix, on sandstone, a wooden spoon resting in the seeds, tight crop on the product. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-037 - CAT-04-ARR - `category-seeds-makhana-mixes-arrangement.webp`
*Shop > Seeds, makhana & mixes > In-grid editorial tile / banner - 1600x1200 (4:3) - All - priority P1*

```
Three low heaps side by side: bright white makhana, four-seed mix, and trail mix, on sandstone, a wooden spoon resting in the seeds, editorial composition with one prop at most. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 85mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-038 - CAT-05-HERO-D - `category-bundles-hero-desktop.webp`
*Shop > Bundles > Collection header - 2400x700 (24:7) - Desktop - priority P0*

```
Pairs of matte-ivory windowed pouches tied with forest-green cotton tape, arranged on a seamless ivory sweep. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 25-degree angle, 50mm, f/5.6. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 24:7; render at 3840x1120 px or larger.
```

### PR-039 - CAT-05-HERO-M - `category-bundles-hero-mobile.webp`
*Shop > Bundles > Collection header (mobile) - 1080x720 (3:2) - Mobile - priority P1*

```
Pairs of matte-ivory windowed pouches tied with forest-green cotton tape, arranged on a seamless ivory sweep, composed tighter for a phone. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: overhead, 35mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 3:2; render at 2160x1440 px or larger.
```

### PR-040 - CAT-05-THUMB - `category-bundles-thumbnail.webp`
*Shop / Home nav > Bundles > Category tile - 800x800 (1:1) - All - priority P1*

```
Pairs of matte-ivory windowed pouches tied with forest-green cotton tape, arranged on a seamless ivory sweep, tight crop on the product. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-041 - CAT-05-ARR - `category-bundles-arrangement.webp`
*Shop > Bundles > In-grid editorial tile / banner - 1600x1200 (4:3) - All - priority P1*

```
Pairs of matte-ivory windowed pouches tied with forest-green cotton tape, arranged on a seamless ivory sweep, editorial composition with one prop at most. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 85mm, f/3.5. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

## 03_PRODUCT_PHOTOGRAPHY

### PR-042 - PRD-ALM-IND-500-1 - `almonds-independence-23-25-500g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-043 - PRD-ALM-IND-500-2 - `almonds-independence-23-25-500g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-044 - PRD-ALM-IND-500-3 - `almonds-independence-23-25-500g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-045 - PRD-ALM-IND-500-4 - `almonds-independence-23-25-500g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-046 - PRD-ALM-IND-500-5 - `almonds-independence-23-25-500g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-047 - PRD-ALM-IND-500-6 - `almonds-independence-23-25-500g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-048 - PRD-ALM-NP-250-1 - `almonds-nonpareil-23-25-250g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce), shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-049 - PRD-ALM-NP-250-2 - `almonds-nonpareil-23-25-250g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce); every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-050 - PRD-ALM-NP-250-3 - `almonds-nonpareil-23-25-250g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce) served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-051 - PRD-ALM-NP-250-4 - `almonds-nonpareil-23-25-250g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce) spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-052 - PRD-ALM-NP-250-5 - `almonds-nonpareil-23-25-250g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce), with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-053 - PRD-ALM-NP-250-6 - `almonds-nonpareil-23-25-250g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce) spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-054 - PRD-CSH-W320-500-1 - `cashew-w320-500g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-055 - PRD-CSH-W320-500-2 - `cashew-w320-500g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-056 - PRD-CSH-W320-500-3 - `cashew-w320-500g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-057 - PRD-CSH-W320-500-4 - `cashew-w320-500g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-058 - PRD-CSH-W320-500-5 - `cashew-w320-500g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-059 - PRD-CSH-W320-500-6 - `cashew-w320-500g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-060 - PRD-DAT-KIM-500-1 - `dates-soft-kimia-500g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-061 - PRD-DAT-KIM-500-2 - `dates-soft-kimia-500g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-062 - PRD-DAT-KIM-500-3 - `dates-soft-kimia-500g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-063 - PRD-DAT-KIM-500-4 - `dates-soft-kimia-500g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-064 - PRD-DAT-KIM-500-5 - `dates-soft-kimia-500g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-065 - PRD-DAT-KIM-500-6 - `dates-soft-kimia-500g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-066 - PRD-RAI-AFG-250-1 - `raisins-afghan-green-long-250g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-067 - PRD-RAI-AFG-250-2 - `raisins-afghan-green-long-250g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-068 - PRD-RAI-AFG-250-3 - `raisins-afghan-green-long-250g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-069 - PRD-RAI-AFG-250-4 - `raisins-afghan-green-long-250g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-070 - PRD-RAI-AFG-250-5 - `raisins-afghan-green-long-250g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-071 - PRD-RAI-AFG-250-6 - `raisins-afghan-green-long-250g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-072 - PRD-MAK-4S-100-1 - `makhana-4-sut-100g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-073 - PRD-MAK-4S-100-2 - `makhana-4-sut-100g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-074 - PRD-MAK-4S-100-3 - `makhana-4-sut-100g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-075 - PRD-MAK-4S-100-4 - `makhana-4-sut-100g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-076 - PRD-MAK-4S-100-5 - `makhana-4-sut-100g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-077 - PRD-MAK-4S-100-6 - `makhana-4-sut-100g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-078 - PRD-SEED-4M-250-1 - `four-seed-mix-250g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-079 - PRD-SEED-4M-250-2 - `four-seed-mix-250g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-080 - PRD-SEED-4M-250-3 - `four-seed-mix-250g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-081 - PRD-SEED-4M-250-4 - `four-seed-mix-250g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-082 - PRD-SEED-4M-250-5 - `four-seed-mix-250g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-083 - PRD-SEED-4M-250-6 - `four-seed-mix-250g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-084 - PRD-TRL-200-1 - `trail-mix-200g-01-main.webp`
*Product page > Gallery image 1 - 2048x2048 (1:1) - All - priority P0*

```
trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed, shown as a neat heap in front of a matte-ivory stand-up pouch with a clear window that shows the same product; pouch label area completely blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 85mm, f/8, even soft light. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

Note: Card image on category grid & best sellers.

### PR-085 - PRD-TRL-200-2 - `trail-mix-200g-02-detail.webp`
*Product page > Gallery image 2 - 2048x2048 (1:1) - All - priority P0*

```
Macro close-up of trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed; every kernel/piece sharp and accurate, natural surface texture visible. Subject fills the frame edge to edge; centre-weighted so a square or 4:5 crop still works. Camera: macro 100mm, f/8, focus stacked. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-086 - PRD-TRL-200-3 - `trail-mix-200g-03-lifestyle.webp`
*Product page > Gallery image 3 - 2048x2048 (1:1) - All - priority P1*

```
trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed served in a small brass-rimmed ivory ceramic bowl on a light oak table with a cup of chai and a folded linen napkin, a hand reaching in; homely Indian morning light. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 40-degree, 50mm, f/2.8. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-087 - PRD-TRL-200-4 - `trail-mix-200g-04-flatlay.webp`
*Product page > Gallery image 4 - 2048x2048 (1:1) - All - priority P1*

```
Overhead editorial flat-lay of trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed spread in a loose circle with a few single pieces placed separately to show shape; brass scoop; nothing else added. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down 90-degree, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-088 - PRD-TRL-200-5 - `trail-mix-200g-05-scale.webp`
*Product page > Gallery image 5 - 2048x2048 (1:1) - All - priority P1*

```
An open adult palm holding a small handful of trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed, with the full pack's quantity poured into a shallow ivory bowl beside it for scale. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 45-degree, 85mm, f/4. Surface/setting: warm ivory handloom linen over light oak. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-089 - PRD-TRL-200-6 - `trail-mix-200g-06-editorial.webp`
*Product page > Gallery image 6 - 2048x2048 (1:1) - All - priority P1*

```
Moody-but-bright premium editorial still life of trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed spilling from a tipped brass measure onto sandstone, long soft window shadow, one sprig of natural texture at most. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: low 15-degree, 100mm, f/3.5. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3276x3276 px or larger.
```

### PR-090 - PRD-ALM-CMP - `almonds-independence-vs-nonpareil-comparison.webp`
*Product page / Grading guide > Grade comparison - 2048x1280 (8:5) - All - priority P1*

```
Two neat rows of almonds on sandstone separated by a thin brass rule: left row Independence (plumper, warmer brown, slight colour variation), right row Nonpareil (flatter, lighter tan, very uniform); identical lighting. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 100mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:5; render at 3276x2048 px or larger.
```

## 04_PRODUCT_PACKAGING

### PR-091 - PKG-ALM-IND-500-F - `pouch-almonds-independence-23-25-500g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-092 - PKG-ALM-IND-500-Q - `pouch-almonds-independence-23-25-500g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of whole raw California almonds of the Independence variety, skin on, warm mid-brown skin with natural fine furrows, plump teardrop kernels of uniform medium size (23/25 kernels per ounce), slight natural colour variation at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-093 - PKG-ALM-NP-250-F - `pouch-almonds-nonpareil-23-25-250g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce); a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-094 - PKG-ALM-NP-250-Q - `pouch-almonds-nonpareil-23-25-250g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of whole raw California Nonpareil almonds, skin on, smooth light-tan skin, flatter elongated teardrop shape, very uniform size and colour (23/25 kernels per ounce) at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-095 - PKG-CSH-W320-500-F - `pouch-cashew-w320-500g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-096 - PKG-CSH-W320-500-Q - `pouch-cashew-w320-500g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of whole white cashew kernels grade W320: pale ivory-white, intact curved kidney shape, uniform medium size, no splits, no scorch marks, matte natural surface at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-097 - PKG-DAT-KIM-500-F - `pouch-dates-soft-kimia-500g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-098 - PKG-DAT-KIM-500-Q - `pouch-dates-soft-kimia-500g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of soft Kimia-style dates: plump, very dark brown to near-black, glossy moist wrinkled skin, oval shape, soft yielding flesh, whole with seed at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-099 - PKG-RAI-AFG-250-F - `pouch-raisins-afghan-green-long-250g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-100 - PKG-RAI-AFG-250-Q - `pouch-raisins-afghan-green-long-250g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of long slender Afghan green raisins: olive-green to golden-green, slightly translucent, finely wrinkled, elongated 1.5-2 cm berries, loose not clumped at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-101 - PKG-MAK-4S-100-F - `pouch-makhana-4-sut-100g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-102 - PKG-MAK-4S-100-Q - `pouch-makhana-4-sut-100g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of large plain puffed fox nuts (makhana), 4-sut size grade: irregular round puffs, bright white puffy surface with natural brown speckled husk patches, light and airy, unflavoured at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-103 - PKG-SEED-4M-250-F - `pouch-four-seed-mix-250g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-104 - PKG-SEED-4M-250-Q - `pouch-four-seed-mix-250g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of raw four-seed mix [PROPOSED COMPOSITION - confirm with founder]: green pumpkin seed kernels, grey-beige sunflower kernels, small white melon seeds (magaz) and brown flax seeds, evenly mixed at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-105 - PKG-TRL-200-F - `pouch-trail-mix-200g-front.png`
*Product page / cards > Pouch front (cut-out) - 1600x1600 (1:1) - All - priority P1*

```
Single matte-ivory (or natural kraft) stand-up zip pouch, front-facing, with a vertical clear window showing trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed; a forest-green band across the bottom left completely blank for a later facts strip; blank label, no printing at all. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: straight-on, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Final file must be cut out to transparent PNG. Overlay real label artwork after pack design is approved.

### PR-106 - PKG-TRL-200-Q - `pouch-trail-mix-200g-three-quarter.webp`
*Product page > Pouch three-quarter - 1600x1600 (1:1) - All - priority P1*

```
Same blank matte-ivory windowed pouch at a three-quarter angle, slight gusset visible, a small heap of trail mix [PROPOSED COMPOSITION - confirm with founder] using only launch-range ingredients: whole almonds, whole W320 cashews, Afghan green raisins, green pumpkin seeds and sunflower kernels, evenly mixed at its base. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree turn, 100mm, f/11. Surface/setting: pure off-white seamless background (#F7F3EA) for clean cut-out, soft contact shadow only. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-107 - PKG-FAM-D - `product-family-desktop.webp`
*Home / Shop / Amazon > Product family - 2400x1000 (12:5) - Desktop - priority P1*

```
All eight blank matte-ivory windowed pouches standing in a gently stepped row, each window showing its own product (almonds x2, cashews, dates, green raisins, makhana, seed mix, trail mix). Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

### PR-108 - PKG-FAM-M - `product-family-mobile.webp`
*Home / Shop / Amazon > Product family (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
The eight blank pouches in two staggered rows of four, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-109 - PKG-FAM-SQ - `product-family-square.webp`
*Home / Shop / Amazon > Product family (square / social) - 1600x1600 (1:1) - All - priority P1*

```
The eight blank pouches clustered tightly, overhead three-quarter. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-110 - PKG-MULTI-01 - `multipack-almonds-cashews.webp`
*Home / Shop / Amazon > Two-pack composition (Amazon bundle style) - 1600x1600 (1:1) - All - priority P1*

```
Two blank windowed pouches, almonds and cashews, standing together tied with forest-green cotton tape. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-111 - PKG-MULTI-02 - `multipack-dates-raisins.webp`
*Home / Shop / Amazon > Two-pack composition - 1600x1600 (1:1) - All - priority P1*

```
Two blank windowed pouches, soft dates and Afghan green raisins, tied together. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-112 - PKG-MULTI-03 - `multipack-makhana-seeds.webp`
*Home / Shop / Amazon > Two-pack composition - 1600x1600 (1:1) - All - priority P1*

```
Two blank windowed pouches, makhana and four-seed mix, tied together. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 70mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-113 - PKG-DET-01 - `pack-detail-facts-strip-area.webp`
*Product page / Our Standards > Facts-strip area close-up - 1600x1200 (4:3) - All - priority P1*

```
Macro of the lower front of a matte-ivory pouch: an empty forest-green band and an empty square QR zone, fine matte paper texture, nothing printed. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

Note: Real facts strip (grade/origin/date/lot/QR) is overlaid in code from SVG template - never AI-generated.

### PR-114 - PKG-DET-02 - `pack-detail-window.webp`
*Product page / Our Standards > Window close-up - 1600x1200 (4:3) - All - priority P1*

```
Macro through the clear pouch window showing almonds pressed against the film, soft reflections. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

Note: Real facts strip (grade/origin/date/lot/QR) is overlaid in code from SVG template - never AI-generated.

### PR-115 - PKG-DET-03 - `pack-detail-zip-seal.webp`
*Product page / Our Standards > Zip and heat seal - 1600x1200 (4:3) - All - priority P1*

```
Fingers pressing the resealable zip of an ivory pouch closed, heat-seal ridges visible at top. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

Note: Real facts strip (grade/origin/date/lot/QR) is overlaid in code from SVG template - never AI-generated.

### PR-116 - PKG-DET-04 - `pack-detail-date-stamp-area.webp`
*Product page / Our Standards > Date/lot stamp area - 1600x1200 (4:3) - All - priority P1*

```
Close-up of a hand pressing a small blank rubber stamp onto the blank side panel of an ivory pouch, no legible characters. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

Note: Real facts strip (grade/origin/date/lot/QR) is overlaid in code from SVG template - never AI-generated.

## 05_GIFTING

### PR-117 - GFT-HERO-D - `gifting-hero-desktop.webp`
*Gifting > Hero - 2400x1000 (12:5) - Desktop - priority P0*

```
A stack of sleeved gift boxes on a Jaipur haveli step; a pair of hands tying natural cotton thread around the top box; a blank handwritten-style note card tucked under the thread. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

Note: Deck slide 34 photo direction: sleeved boxes on haveli step; hands tying thread; no faces.

### PR-118 - GFT-HERO-M - `gifting-hero-mobile.webp`
*Gifting > Hero (mobile) - 1080x1350 (4:5) - Mobile - priority P0*

```
Hands tying thread around a tall stack of sleeved boxes on a haveli step, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: eye-level, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-119 - GFT-CLA-1 - `gift-classic-400g-closed.webp`
*Gifting > Tier card: Classic 400 g - 1200x1200 (1:1) - All - priority P0*

```
Closed a rigid ivory box with a forest-green block-print paper sleeve, tied with cotton thread, sandstone surface. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree, 85mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-120 - GFT-CLA-2 - `gift-classic-400g-open.webp`
*Gifting > Tier detail: Classic contents - 1600x1600 (1:1) - All - priority P0*

```
Overhead view of a rigid ivory box with a forest-green block-print paper sleeve; four compartments: Independence almonds, W320 cashews, Afghan green raisins, soft dark dates; contents exactly as listed, nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-121 - GFT-CLA-3 - `gift-classic-400g-detail.webp`
*Gifting > Tier detail: Classic material - 1600x1200 (4:3) - All - priority P1*

```
Macro of the corner of a rigid ivory box with a forest-green block-print paper sleeve: paper texture, block-print motif, thread knot. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-122 - GFT-SIG-1 - `gift-signature-600g-closed.webp`
*Gifting > Tier card: Signature 600 g - 1200x1200 (1:1) - All - priority P0*

```
Closed a rigid forest-green box with a block-print sleeve and thin brass-tone foil border, tied with cotton thread, sandstone surface. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree, 85mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-123 - GFT-SIG-2 - `gift-signature-600g-open.webp`
*Gifting > Tier detail: Signature contents - 1600x1600 (1:1) - All - priority P0*

```
Overhead view of a rigid forest-green box with a block-print sleeve and thin brass-tone foil border; five compartments: Nonpareil almonds, large W240 cashews, roasted salted in-shell pistachios, Afghan green raisins, dried figs (anjeer); contents exactly as listed, nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-124 - GFT-SIG-3 - `gift-signature-600g-detail.webp`
*Gifting > Tier detail: Signature material - 1600x1200 (4:3) - All - priority P1*

```
Macro of the corner of a rigid forest-green box with a block-print sleeve and thin brass-tone foil border: paper texture, block-print motif, thread knot. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-125 - GFT-PRE-1 - `gift-premium-800g-closed.webp`
*Gifting > Tier card: Premium 800 g - 1200x1200 (1:1) - All - priority P0*

```
Closed a heavy rigid deep-green box with brass-tone foil edging and a block-print sleeve, tied with cotton thread, sandstone surface. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 30-degree, 85mm, f/5.6. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-126 - GFT-PRE-2 - `gift-premium-800g-open.webp`
*Gifting > Tier detail: Premium contents - 1600x1600 (1:1) - All - priority P0*

```
Overhead view of a heavy rigid deep-green box with brass-tone foil edging and a block-print sleeve; five compartments: jumbo Nonpareil almonds, extra-large W210 cashews, in-shell pistachios, plump Medjool dates, dried figs (anjeer); contents exactly as listed, nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-127 - GFT-PRE-3 - `gift-premium-800g-detail.webp`
*Gifting > Tier detail: Premium material - 1600x1200 (4:3) - All - priority P1*

```
Macro of the corner of a heavy rigid deep-green box with brass-tone foil edging and a block-print sleeve: paper texture, block-print motif, thread knot. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: macro 100mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-128 - GFT-CORPORATE-ARRANGEMENT - `gifting-corporate-arrangement.webp`
*Gifting > Corporate section - 2000x1200 (5:3) - All - priority P0*

```
Rows of identical sleeved Signature gift boxes on a long light-oak conference table ready for dispatch, each with a blank name card, a stack of blank kraft shipping cartons behind; office daylight. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 5:3; render at 3200x1920 px or larger.
```

### PR-129 - GFT-CORPORATE-ARRANGEMENT-M - `gifting-corporate-arrangement-mobile.webp`
*Gifting > Corporate section (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Rows of identical sleeved Signature gift boxes on a long light-oak conference table ready for dispatch, each with a blank name card, a stack of blank kraft shipping cartons behind; office daylight, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree, 50mm, f/4. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-130 - GFT-CORPORATE-NOTE-CARD - `gifting-corporate-note-card.webp`
*Gifting > Corporate section - 1600x1200 (4:3) - All - priority P1*

```
A single sleeved gift box with a blank ivory note card and a blank space on the sleeve where a company logo will sit; fountain pen beside. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-131 - GFT-CORPORATE-STACK - `gifting-corporate-stack.webp`
*Gifting > Corporate section - 1600x1600 (1:1) - All - priority P1*

```
Tall neat stack of 12 sleeved gift boxes, slightly fanned, warm daylight. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: light oak table with fine grain, matte finish. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-132 - GFT-WEDDING-FAVOURS - `gifting-wedding-favours.webp`
*Gifting > Wedding section - 2000x1200 (5:3) - All - priority P0*

```
Small wedding favour boxes in ivory and forest-green block-print sleeves arranged in rows on a sandstone ledge with marigold petals sparingly scattered, brass diya unlit. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 5:3; render at 3200x1920 px or larger.
```

### PR-133 - GFT-WEDDING-FAVOURS-M - `gifting-wedding-favours-mobile.webp`
*Gifting > Wedding section (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Small wedding favour boxes in ivory and forest-green block-print sleeves arranged in rows on a sandstone ledge with marigold petals sparingly scattered, brass diya unlit, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-134 - GFT-WEDDING-HANDS-TYING - `gifting-wedding-hands-tying.webp`
*Gifting > Wedding section - 1600x1600 (1:1) - All - priority P1*

```
Hands with light mehndi tying a gold-tone cotton thread on a small favour box, close-up, no face. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-135 - GFT-FESTIVAL-DIWALI - `gifting-festival-diwali.webp`
*Gifting > Festival section - 2000x1200 (5:3) - All - priority P0*

```
Signature and Premium gift boxes with lit small clay diyas and a few marigolds on a haveli step at dusk, warm restrained glow. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 5:3; render at 3200x1920 px or larger.
```

### PR-136 - GFT-FESTIVAL-DIWALI-M - `gifting-festival-diwali-mobile.webp`
*Gifting > Festival section (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Signature and Premium gift boxes with lit small clay diyas and a few marigolds on a haveli step at dusk, warm restrained glow, vertical framing. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-137 - GFT-FESTIVAL-STACK - `gifting-festival-stack.webp`
*Gifting > Festival section - 1600x1600 (1:1) - All - priority P1*

```
Mixed stack of the three gift tiers (small, medium, large boxes) tied together for festival gifting. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

### PR-138 - GFT-CUSTOM-SLEEVE - `gifting-custom-sleeve-options.webp`
*Gifting > Custom sleeves & presentation - 1600x1200 (4:3) - All - priority P1*

```
Three identical rigid boxes with block-print sleeves in forest green, ivory-and-gold and charcoal-and-gold, side by side, each with a blank logo panel. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

## 06_B2B

### PR-139 - B2B-HERO-D - `b2b-hero-desktop.webp`
*For Business > Hero - 2400x1000 (12:5) - Desktop - priority P0*

```
Clean stainless prep bench in a Jaipur sweet-shop kitchen with neatly labelled-blank clear 5 kg tubs of cashew pieces, sliced almonds, golden raisins, makhana and melon seeds (magaz); a halwai's hands weighing cashews on a digital scale; no faces. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

### PR-140 - B2B-HERO-M - `b2b-hero-mobile.webp`
*For Business > Hero (mobile) - 1080x1350 (4:5) - Mobile - priority P0*

```
Hands weighing cashew pieces on a digital scale, tubs behind, vertical. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 45-degree, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-141 - B2B-LINE-01 - `b2b-line-cashew-lwp-splits.webp`
*For Business > Weekly price list row thumbnail - 800x800 (1:1) - All - priority P1*

```
A heaped stainless steel scoop of large white cashew pieces and split halves (LWP) resting on an open food-grade bulk bag of the same. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-142 - B2B-LINE-02 - `b2b-line-almonds-sliced.webp`
*For Business > Weekly price list row thumbnail - 800x800 (1:1) - All - priority P1*

```
A heaped stainless steel scoop of thin skin-on sliced almond flakes resting on an open food-grade bulk bag of the same. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-143 - B2B-LINE-03 - `b2b-line-raisins-indian-golden.webp`
*For Business > Weekly price list row thumbnail - 800x800 (1:1) - All - priority P1*

```
A heaped stainless steel scoop of plump golden-yellow Indian raisins resting on an open food-grade bulk bag of the same. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-144 - B2B-LINE-04 - `b2b-line-makhana-regular.webp`
*For Business > Weekly price list row thumbnail - 800x800 (1:1) - All - priority P1*

```
A heaped stainless steel scoop of regular-size plain makhana resting on an open food-grade bulk bag of the same. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-145 - B2B-LINE-05 - `b2b-line-magaz-melon-seeds.webp`
*For Business > Weekly price list row thumbnail - 800x800 (1:1) - All - priority P1*

```
A heaped stainless steel scoop of small white peeled melon seeds (magaz) resting on an open food-grade bulk bag of the same. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: top-down, 50mm, f/8. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 1600x1600 px or larger.
```

### PR-146 - B2B-SUP-01 - `b2b-bulk-supply-arrangement.webp`
*For Business > Ingredient Supply - 1600x1200 (4:3) - All - priority P1*

```
Sealed bulk bags and clear tubs of the five kitchen lines stacked tidily on a steel rack in a clean storeroom, labels blank. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-147 - B2B-SUP-02 - `b2b-storage-preparation.webp`
*For Business > Ingredient Supply - 1600x1200 (4:3) - All - priority P1*

```
Packer in apron (no face) decanting sliced almonds from a 5 kg bag into an airtight tub, digital scale, clean steel table. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-148 - B2B-KIT-01 - `b2b-bakery-use.webp`
*For Business > Professional Kitchens - 1600x1200 (4:3) - All - priority P1*

```
Baker's hands pressing sliced almonds and cashew pieces onto rows of unbaked cookies on a tray, stainless bench. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-149 - B2B-KIT-02 - `b2b-sweet-shop-use.webp`
*For Business > Professional Kitchens - 1600x1200 (4:3) - All - priority P0*

```
Halwai garnishing a large tray of kaju katli and barfi with slivered almonds and magaz in a traditional Jaipur sweet-shop kitchen, brass karahi behind. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-150 - B2B-KIT-03 - `b2b-caterer-hotel-kitchen.webp`
*For Business > Professional Kitchens - 1600x1200 (4:3) - All - priority P1*

```
Commercial hotel kitchen line, chef's hands adding cashews and golden raisins to a large pot of pulao, steel containers of ingredients. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-151 - B2B-KIT-04 - `b2b-ingredient-composition.webp`
*For Business > Professional Kitchens - 1600x1200 (4:3) - All - priority P1*

```
Overhead of five stainless bowls of the five kitchen lines on a steel bench with a notepad (blank) and pen. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-152 - B2B-KIT-05 - `b2b-delivery-handover.webp`
*For Business > Professional Kitchens - 1600x1200 (4:3) - All - priority P1*

```
Hands handing a sealed carton and a 10 kg bag across a sweet-shop counter, early morning, no faces. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-153 - B2B-SMP-01 - `b2b-sample-kit.webp`
*For Business > Sample Kits - 1600x1200 (4:3) - All - priority P0*

```
Free sample kit: a kraft carton opened to show five small clear sample pouches of the kitchen lines and a blank price-list card. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-154 - B2B-SMP-02 - `b2b-sample-kit-mobile.webp`
*For Business > Sample Kits - 1080x1080 (1:1) - Mobile - priority P1*

```
Sample kit carton overhead, five small sample pouches fanned out. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 35mm, f/4. Surface/setting: professional Indian commercial kitchen, stainless steel, clean and orderly, warm practical light. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2160x2160 px or larger.
```

## 07_OUR_STANDARDS

### PR-155 - STD-HERO-D - `standards-hero-desktop.webp`
*Our Standards > Sourcing Story - 2400x1000 (12:5) - Desktop - priority P0*

```
Wide calm still life: four small groups on one sandstone slab - a brass sieve with almonds, a blank date stamp, a glass beaker with almond sample, and a sleeved gift box. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 12:5; render at 3840x1600 px or larger.
```

### PR-156 - STD-HERO-M - `standards-hero-mobile.webp`
*Our Standards > Sourcing Story - 1080x1350 (4:5) - Mobile - priority P0*

```
The same four groups stacked vertically. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-157 - STD-GRD-01 - `standards-graded-sorting.webp`
*Our Standards > Graded - 1600x1200 (4:3) - All - priority P0*

```
Packer's hands sorting almonds on a steel tray, pushing broken and undersize kernels to one side. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-158 - STD-GRD-02 - `standards-graded-count-per-ounce.webp`
*Our Standards > Graded - 1200x1200 (1:1) - All - priority P1*

```
A precise digital scale holding a small glass dish of 24 almonds, a second row of exactly-matched kernels beside; scale display blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-159 - STD-GRD-03 - `standards-graded-cashew-sizes.webp`
*Our Standards > Graded - 1600x1000 (8:5) - All - priority P1*

```
Three neat rows of whole cashews of increasing size (W320, W240, W210) on sandstone, no labels. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:5; render at 3200x2000 px or larger.
```

### PR-160 - STD-DAT-01 - `standards-dated-packing.webp`
*Our Standards > Dated - 1600x1200 (4:3) - All - priority P0*

```
Weekly packing: hands filling ivory pouches on a scale, heat sealer, row of filled pouches. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-161 - STD-DAT-02 - `standards-dated-stamp.webp`
*Our Standards > Dated - 1200x1200 (1:1) - All - priority P1*

```
Close-up of a rubber date stamp pressing onto a pouch side panel; characters not legible. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-162 - STD-TST-01 - `standards-tested-lab-sample.webp`
*Our Standards > Tested - 1600x1200 (4:3) - All - priority P0*

```
Gloved hands placing a ground almond sample into a sealed sample bag at a clean quality-check bench, beakers and a moisture meter beside; no documents, no certificates. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small quality-check bench: white laminate, glass beakers, digital scale, daylight. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

Note: Do not show any certificate, result or pass mark.

### PR-163 - STD-TST-02 - `standards-tested-moisture-check.webp`
*Our Standards > Tested - 1200x1200 (1:1) - All - priority P1*

```
Handheld grain moisture meter probe in a tray of raisins, display blank. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small quality-check bench: white laminate, glass beakers, digital scale, daylight. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

Note: Do not show any certificate, result or pass mark.

### PR-164 - STD-SRV-01 - `standards-served-gift-packing.webp`
*Our Standards > Served - 1600x1200 (4:3) - All - priority P0*

```
Hands placing a blank note card into a gift box before closing, sleeves and thread nearby. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-165 - STD-SRV-02 - `standards-served-customer-support.webp`
*Our Standards > Served - 1200x1200 (1:1) - All - priority P1*

```
A hand typing on a smartphone (blank screen) next to an order packing slip (blank) and a sealed parcel. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

### PR-166 - STD-SRV-03 - `standards-served-dispatch.webp`
*Our Standards > Served - 1600x1200 (4:3) - All - priority P1*

```
Neat stack of sealed kraft parcels and gift boxes by a doorway at morning, ready for courier. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: clean small packing room: stainless worktable, light oak shelves, ivory walls, daylight window. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-167 - STD-SRC-01 - `standards-sourcing-inspection.webp`
*Our Standards > Sourcing Story - 1600x1200 (4:3) - All - priority P0*

```
Hands breaking a cashew in half to inspect it at a wholesale shop, sacks and trays behind, no faces. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-168 - STD-SRC-02 - `standards-sourcing-bazaar.webp`
*Our Standards > Sourcing Story - 2000x1200 (5:3) - All - priority P1*

```
Traditional Jaipur wholesale dry-fruit shop interior with sacks and steel trays of almonds, cashews, raisins, dates; warm light; shopfront signage out of frame. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 5:3; render at 3200x1920 px or larger.
```

### PR-169 - STD-SRC-03 - `standards-traceability-visual.webp`
*Our Standards > Sourcing Story - 1600x1200 (4:3) - All - priority P1*

```
A row of three identical pouches each with a blank tag tied on, beside a small open sample jar from the same lot. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-170 - STD-SRC-04 - `standards-lot-verification.webp`
*Our Standards > Sourcing Story - 1200x1200 (1:1) - All - priority P1*

```
Phone (blank screen) held over the blank QR zone of a pouch on a counter. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2400x2400 px or larger.
```

## 08_BUNDLES_AND_COLLECTIONS

### PR-171 - BUN-01-MAIN - `bundle-nut-lovers-main.webp`
*Shop > Bundles / Home > Bundles > Nut lovers' bundle - 1600x1600 (1:1) - All - priority P0*

```
Blank matte-ivory windowed pouches containing almonds and cashews, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: Contents inferred from price; confirm.

### PR-172 - BUN-01-CARD - `bundle-nut-lovers-card.webp`
*Shop > Bundles / Home > Bundles > Nut lovers' bundle - 900x1125 (4:5) - All - priority P0*

```
Tight 4:5 crop of tied pouches of almonds and cashews. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: Contents inferred from price; confirm.

### PR-173 - BUN-02-MAIN - `bundle-everyday-pantry-main.webp`
*Shop > Bundles / Home > Bundles > Everyday pantry bundle - 1600x1600 (1:1) - All - priority P2*

```
Blank matte-ivory windowed pouches containing soft dates, Afghan green raisins, four-seed mix, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-174 - BUN-02-CARD - `bundle-everyday-pantry-card.webp`
*Shop > Bundles / Home > Bundles > Everyday pantry bundle - 900x1125 (4:5) - All - priority P2*

```
Tight 4:5 crop of tied pouches of soft dates, Afghan green raisins, four-seed mix. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-175 - BUN-03-MAIN - `bundle-premium-assortment-main.webp`
*Shop > Bundles / Home > Bundles > Premium dry-fruit assortment - 1600x1600 (1:1) - All - priority P2*

```
Blank matte-ivory windowed pouches containing Nonpareil almonds, cashews, Afghan green raisins, soft dates, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-176 - BUN-03-CARD - `bundle-premium-assortment-card.webp`
*Shop > Bundles / Home > Bundles > Premium dry-fruit assortment - 900x1125 (4:5) - All - priority P2*

```
Tight 4:5 crop of tied pouches of Nonpareil almonds, cashews, Afghan green raisins, soft dates. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-177 - BUN-04-MAIN - `bundle-family-main.webp`
*Shop > Bundles / Home > Bundles > Family consumption bundle - 1600x1600 (1:1) - All - priority P2*

```
Blank matte-ivory windowed pouches containing almonds, cashews, soft dates, makhana, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-178 - BUN-04-CARD - `bundle-family-card.webp`
*Shop > Bundles / Home > Bundles > Family consumption bundle - 900x1125 (4:5) - All - priority P2*

```
Tight 4:5 crop of tied pouches of almonds, cashews, soft dates, makhana. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-179 - BUN-05-MAIN - `bundle-gifting-main.webp`
*Shop > Bundles / Home > Bundles > Gifting bundle - 1600x1600 (1:1) - All - priority P2*

```
Blank matte-ivory windowed pouches containing a sleeved Classic gift box beside two tied pouches, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-180 - BUN-05-CARD - `bundle-gifting-card.webp`
*Shop > Bundles / Home > Bundles > Gifting bundle - 900x1125 (4:5) - All - priority P2*

```
Tight 4:5 crop of tied pouches of a sleeved Classic gift box beside two tied pouches. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-181 - BUN-06-MAIN - `bundle-mixed-assortment-main.webp`
*Shop > Bundles / Home > Bundles > Mixed dry-fruit assortment - 1600x1600 (1:1) - All - priority P2*

```
Blank matte-ivory windowed pouches containing trail mix, four-seed mix, makhana, tied together with forest-green cotton tape, small heaps of the same products in front; nothing else. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 3200x3200 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

### PR-182 - BUN-06-CARD - `bundle-mixed-assortment-card.webp`
*Shop > Bundles / Home > Bundles > Mixed dry-fruit assortment - 900x1125 (4:5) - All - priority P2*

```
Tight 4:5 crop of tied pouches of trail mix, four-seed mix, makhana. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: eye-level, 85mm, f/8. Surface/setting: seamless warm-ivory studio sweep, very soft floor shadow. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 1800x2250 px or larger.
```

Note: PROPOSED CONCEPT - bundle contents not defined in deck.

## 09_SUPPORTING_WEBSITE_VISUALS

### PR-183 - SUP-ABOUT-01 - `about-founder-packing-room.webp`
*About / Sourcing story > Story image - 1600x1200 (4:3) - All - priority P1*

```
Founder's hands (no face) at the home packing room workbench weighing almonds, shelves of ivory pouches behind, daylight. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-184 - SUP-GRADE-01 - `grading-guide-cashew-w-grades.webp`
*Grading guide > W-grade explainer - 1600x1000 (8:5) - All - priority P1*

```
Whole cashews in three size rows (W210, W240, W320) with a brass ruler beside, top-down, no labels. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:5; render at 3200x2000 px or larger.
```

### PR-185 - SUP-GRADE-02 - `grading-guide-makhana-sut.webp`
*Grading guide > Makhana size explainer - 1600x1000 (8:5) - All - priority P2*

```
Makhana puffs in rows from small to large, top-down on sandstone, brass ruler, no labels. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:5; render at 3200x2000 px or larger.
```

### PR-186 - SUP-STORE-01 - `storage-guide-airtight.webp`
*Storage guide > How to store - 1600x1200 (4:3) - All - priority P1*

```
Almonds and dates decanted into glass airtight jars on a cool pantry shelf, one jar in an open refrigerator door. Subject sits in the left 55% of the frame; the right 40% is calm, uncluttered negative space for copy. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:3; render at 3200x2400 px or larger.
```

### PR-187 - SUP-CONTACT-01 - `contact-support.webp`
*Help > Contact / WhatsApp > Header image - 1600x900 (16:9) - All - priority P2*

```
A neat desk with a phone (blank screen), an open order notebook (blank pages) and a gift box. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 16:9; render at 3200x1800 px or larger.
```

### PR-188 - SUP-TRACK-01 - `track-order-parcel.webp`
*Help > Track order > Header image - 1600x900 (16:9) - All - priority P2*

```
A sealed kraft parcel with blank shipping label on a doorstep, morning light. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 16:9; render at 3200x1800 px or larger.
```

### PR-189 - SUP-EMPTY-01 - `empty-cart-visual.webp`
*Cart > Empty-cart state - 1000x1000 (1:1) - All - priority P3*

```
One almond and one date on an empty ivory ceramic bowl, top-down, lots of space. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 1:1; render at 2000x2000 px or larger.
```

### PR-190 - SUP-SEAS-01 - `seasonal-diwali-desktop.webp`
*Home / Gifting > Seasonal banner: Diwali corporate (Aug-Oct) - 2400x900 (8:3) - Desktop - priority P1*

```
Gift boxes with lit diyas and a few marigolds on a dark sandstone step at dusk, warm restrained glow. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-191 - SUP-SEAS-02 - `seasonal-diwali-mobile.webp`
*Home / Gifting > Seasonal banner: Diwali (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Gift boxes with lit diyas, vertical. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-192 - SUP-SEAS-03 - `seasonal-wedding-desktop.webp`
*Home / Gifting > Seasonal banner: Wedding season (Oct-Feb) - 2400x900 (8:3) - Desktop - priority P1*

```
Rows of favour boxes on a haveli ledge with marigold strings softly behind. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-193 - SUP-SEAS-04 - `seasonal-wedding-mobile.webp`
*Home / Gifting > Seasonal banner: Wedding (mobile) - 1080x1350 (4:5) - Mobile - priority P1*

```
Favour boxes and marigolds, vertical. Subject sits in the lower 60% of a portrait frame; the top 35% is clean, evenly lit negative space for a headline. Camera: 35-degree, 50mm, f/4. Surface/setting: weathered sandstone step of a Jaipur haveli courtyard, soft morning shade, carved jali softly out of focus. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 4:5; render at 2160x2700 px or larger.
```

### PR-194 - SUP-SEAS-05 - `seasonal-eid-dates-desktop.webp`
*Home > Seasonal banner: Ramadan/Eid dates bundle (Mar) - 2400x900 (8:3) - Desktop - priority P2*

```
Brass platter of soft dark dates with a small brass lantern, evening light, sandstone. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-195 - SUP-SEAS-06 - `seasonal-summer-chill-desktop.webp`
*Home > Seasonal banner: summer 'chill after opening' (Apr-Jun) - 2400x900 (8:3) - Desktop - priority P2*

```
Pouch of almonds and a glass jar of raisins on a refrigerator shelf, cool daylight. Subject sits in the right 55% of the frame; the left 40% is calm, softly lit, uncluttered negative space for a headline and two buttons. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 8:3; render at 3840x1440 px or larger.
```

### PR-196 - SUP-OG-01 - `social-share-default.webp`
*All pages > Open Graph / share image - 1200x630 (40:21) - All - priority P1*

```
Overhead arc of almonds, cashews, dates and raisins on sandstone, space in centre for logo. Subject centred with generous margins; keep 10% crop-safe border on every side; no important detail near edges. Camera: 35-degree, 50mm, f/4. Surface/setting: honed pale-pink Jaipur sandstone slab with fine natural grain. Photorealistic premium commercial food photography, art-directed for a modern Indian dry-fruit house. Soft natural daylight from the upper left through a large diffuser, gentle fill, soft realistic contact shadows. Restrained palette: warm ivory, honey sandstone, light oak, deep forest-green and muted antique-gold accents only. True-to-life food colour, crisp micro-texture, natural imperfections, shallow depth of field, editorial styling, few props. No text, no letters, no logos, no labels, no watermark. Aspect ratio 40:21; render at 2400x1260 px or larger.
```
