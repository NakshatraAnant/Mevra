# START_HERE

## Read this first
This package is the **complete visual production kit** for the dry-fruit e-commerce site described in `Dry_Fruits_Business_Strategy_and_Execution_Blueprint.pptx`.

**The photographs have not been generated yet.** The environment that produced this kit has no image-generation model. So every photographic asset exists as a **placeholder at its final filename, size and format**, visibly stamped "PLACEHOLDER - NOT FINAL ARTWORK", with its shot description and text-safe zone drawn on it. The vector graphics (icons, patterns, facts strip, layout guides) are final.

That means a developer can build the full site now, with every `<img>` pointing at its permanent path, and the images are swapped in place later with no code changes.

| | Count |
|---|---|
| Photographic assets planned | 196 |
| ...with placeholder at final size/name | 196 |
| ...generated and approved | **0** |
| Final vector (SVG) assets | 11 (+ PNG previews) |
| Desktop-specific / Mobile-specific / Tablet | 21 / 22 / 1 |

## Folder map
- `01_HOMEPAGE` ... `09_SUPPORTING_WEBSITE_VISUALS` - assets in their page/section folders (the canonical location).
- `10_MOBILE_ASSETS`, `11_DESKTOP_ASSETS` - **index files** listing the device-specific assets and their desktop/mobile pairs (files are not duplicated).
- `12_MASTER_HIGH_RESOLUTION` - empty until generation; where full-size masters go.
- `13_IMAGE_GENERATION_PROMPTS` - every prompt as JSON and CSV, keyed to the output path.
- `14_VISUAL_REFERENCE_RESEARCH` - research board and live-site review checklist.
- `15_DOCUMENTATION` - this file, manifest, mapping, design system, prompts, missing information, QA report.

## For the developer
1. Use `WEBSITE_ASSET_MAPPING.md` to find the image for each section; filenames are stable.
2. Device-specific pairs: use `<picture>` with `-mobile` under 768 px and `-desktop` above; the tablet hero at 768-1199 px.
3. Keep headlines inside the text-safe zone drawn on each placeholder (left 40% on desktop heroes, top 35% on mobile heroes).
4. Never render text, prices or facts into images. The facts strip is `04_PRODUCT_PACKAGING/Packaging Details/facts-strip-template.svg` (or rebuild it in HTML) fed with real lot data.
5. Product grid cards use `03_PRODUCT_PHOTOGRAPHY/<SKU>/*-01-main.webp`.
6. Add a build check that fails if any shipped image is still a placeholder: placeholders are listed with Generation status = "Placeholder" in the manifest.

## For whoever generates the images
Run the prompts in `13_IMAGE_GENERATION_PROMPTS/` in priority order (P0 first: 52 assets), follow the loop at the top of `IMAGE_GENERATION_PROMPTS.md`, overwrite each placeholder at its path, save masters in `12_`, and update the manifest status columns.
