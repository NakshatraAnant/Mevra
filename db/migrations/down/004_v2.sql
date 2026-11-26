-- Removes MEVRA 2.0 structures. Refuses while custom lines or reward data would be lost.
DO $$ BEGIN IF EXISTS (SELECT 1 FROM cart_items WHERE custom_id IS NOT NULL) OR EXISTS (SELECT 1 FROM order_items WHERE custom_id IS NOT NULL) OR EXISTS (SELECT 1 FROM loyalty_ledger) THEN RAISE EXCEPTION 'Custom items or loyalty data exist. Export or remove them first.'; END IF; END $$;
DROP VIEW variant_state, loyalty_balances;
DROP TABLE quality_records, integration_log, experiments, campaigns, banners, quiz_results, submissions, saved_recipes, recipes, articles, b2b_quote_items, b2b_quotes, b2b_account_prices, b2b_accounts, notices, saved_items, saved_collections, subscription_events, subscription_items, subscriptions, challenge_progress, challenges, referrals CASCADE;
ALTER TABLE carts DROP CONSTRAINT carts_reward_fk, DROP COLUMN use_points, DROP COLUMN reward_id, DROP COLUMN delivery_date;
DROP TABLE reward_claims, rewards, loyalty_ledger, loyalty_accounts, loyalty_tiers, mix_bases, gift_sleeves, media_assets, product_relations CASCADE;
ALTER TABLE coupons DROP COLUMN customer_id; ALTER TABLE customers DROP COLUMN birthday, DROP COLUMN taste, DROP COLUMN prefs;
ALTER TABLE gift_tiers DROP COLUMN compartments, DROP COLUMN portion_g; ALTER TABLE orders DROP COLUMN points_used, DROP COLUMN points_discount_paise, DROP COLUMN requested_date, DROP COLUMN reward;
DROP INDEX cart_items_std, cart_items_custom; ALTER TABLE cart_items DROP CONSTRAINT cart_items_pkey, DROP COLUMN id, DROP COLUMN custom_id, ADD PRIMARY KEY (cart_id, variant_id);
ALTER TABLE order_items DROP COLUMN custom_id, DROP COLUMN custom; DROP TABLE custom_items;
ALTER TABLE b2b_prices DROP COLUMN product_id, DROP COLUMN pack_kg, DROP COLUMN moq_packs, DROP COLUMN spec, DROP COLUMN segment, DROP COLUMN status, DROP COLUMN price_basis;
ALTER TABLE reviews DROP COLUMN photo; ALTER TABLE enquiries DROP COLUMN quote;
ALTER TABLE product_variants DROP COLUMN price_basis, DROP COLUMN ship_alloc_paise, DROP COLUMN discount_ceiling_bp;
ALTER TABLE products DROP COLUMN status, DROP COLUMN vertical, DROP COLUMN variety, DROP COLUMN hindi, DROP COLUMN processing, DROP COLUMN allergens, DROP COLUMN shelf_life, DROP COLUMN nutrition, DROP COLUMN nutrition_verified, DROP COLUMN certifications, DROP COLUMN legal, DROP COLUMN sweetened, DROP COLUMN season_months, DROP COLUMN model_key, DROP COLUMN pack_type, DROP COLUMN video_url, DROP COLUMN seo_title, DROP COLUMN seo_desc, DROP COLUMN story, DROP COLUMN taste_tags, DROP COLUMN occasions, DROP COLUMN subscription_ok, DROP COLUMN loyalty_ok, DROP COLUMN promo_ok, DROP COLUMN mix_ok, DROP COLUMN gift_ok, DROP COLUMN gift_surcharge_paise, DROP COLUMN approval, DROP COLUMN data_note;
ALTER TABLE categories DROP COLUMN vertical, DROP COLUMN parent_id, DROP COLUMN description, DROP COLUMN seo_title, DROP COLUMN seo_desc;
