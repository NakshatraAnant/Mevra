# MEVRA

Dry-fruits commerce and intelligence platform. Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL 18.

## Run
```
npm install
npm run dev        # development, http://localhost:3100
```
Production mode: `npm run build` then `npm start`.
Both commands start a bundled local PostgreSQL (data in .pgdata, port 5434), apply migrations and seed the launch catalogue. The first run creates .env.local with a random owner password. Admin: /admin.

| Command | Purpose |
|---|---|
| npm run db:migrate / db:seed | Migrations in db/migrations; launch catalogue and settings |
| npm run db:demo | Rebuild the synthetic dataset in the separate "demo" schema |
| npm run db:backup | Back up the database to backups/ |
| npm run db:demo2 | Add loyalty, B2B, refill and quality records to the demo schema, if absent |
| node scripts/migrate.mjs down 004_v2.sql | Reverse the 2.0 migration. Back up first: it drops the 2.0 tables |
| npm test / npm run test:e2e | Pricing unit tests / browser suite against a throw-away database (needs a build and Chrome) |
| npm run typecheck / lint | Static checks |
| npm run assets:render -- --missing | Render missing illustrative visuals |

## Structure
- src/lib: pricing (pure rules), cart, orders (transactions, stock, lots), payments (provider interface), events (taxonomy), auth (roles)
- src/lib/analytics: reusable metric services used by dashboards and CSV exports
- src/app/(shop): storefront. src/app/admin: operations and intelligence
- docs: asset manifest and availability report. source-assets: original ZIP

- src/lib: also loyalty (append-only ledger), custom (mix and gift quotes), challenges, recommend, experiments, integrations, grades
- src/three: procedural ingredients and scenes; tools/render/bake.mjs writes public/models
- tests/e2e/v2.mjs: 2.0 coverage. Build with NEXT_PUBLIC_SITE_URL=http://localhost:3101 to test a separate NEXT_DIST
- docs/INTEGRATIONS.md: adapter setup

## Data rules
- Price status: planning, derived or confirmed prices can be bought. Demo prices are shown as illustrative and cannot.
- Products that are not approved are hidden from the store.
- Money is integer paise, GST inclusive. Reporting uses India time.
- Live and demo data are separate Postgres schemas. The storefront only reads live.
- Untracked stock sells as "available to order". Missing prices, costs, origins and certificates stay visibly missing.
- Cost defaults, thresholds and text are in Admin → Settings and Finance.

## Online payments
Implement PaymentProvider in src/lib/payments.ts, add a signature-verified webhook, set credentials in the environment, then enable it. Nothing simulates a payment today.

## Before production
Managed Postgres (DATABASE_URL, EMBEDDED_POSTGRES=0), HTTPS NEXT_PUBLIC_SITE_URL, durable storage for uploads/, trusted proxy setting X-Forwarded-For, backups, email and WhatsApp providers, legal review, and the business details marked on the site.
