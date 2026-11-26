-- Reusable analytics views. A sale counts as "valid" unless cancelled, returned to origin or returned.
CREATE VIEW valid_orders AS SELECT * FROM orders WHERE status NOT IN ('cancelled','rto','returned');
CREATE VIEW item_facts AS
SELECT i.*, o.placed_at, o.status, o.source, o.customer_id, o.status NOT IN ('cancelled','rto','returned') AS valid,
  i.unit_paise * i.qty - i.discount_paise AS net_paise,
  COALESCE(i.product_cost_paise, CASE WHEN i.components IS NULL THEN vc.product_cost_paise ELSE (SELECT CASE WHEN bool_and(x.product_cost_paise IS NOT NULL) THEN sum(x.product_cost_paise * (c->>'qty')::int)::int END FROM jsonb_array_elements(i.components) c LEFT JOIN variant_costs x ON x.variant_id = (c->>'variant_id')::uuid) END) AS pc,
  COALESCE(i.packaging_cost_paise, CASE WHEN i.components IS NULL THEN vc.packaging_cost_paise ELSE (SELECT CASE WHEN bool_and(x.packaging_cost_paise IS NOT NULL) THEN sum(x.packaging_cost_paise * (c->>'qty')::int)::int END FROM jsonb_array_elements(i.components) c LEFT JOIN variant_costs x ON x.variant_id = (c->>'variant_id')::uuid) END) AS pk,
  i.product_cost_paise IS NULL AS cost_is_current
FROM order_items i JOIN orders o ON o.id = i.order_id LEFT JOIN variant_costs vc ON vc.variant_id = i.variant_id;
-- Physical unit demand: bundles exploded into the packs that actually leave the shelf.
CREATE VIEW demand_facts AS
SELECT o.placed_at, o.status, o.id AS order_id, CASE WHEN c.value IS NULL THEN i.variant_id ELSE (c.value->>'variant_id')::uuid END AS variant_id, i.qty * COALESCE((c.value->>'qty')::int, 1) AS units
FROM order_items i JOIN orders o ON o.id = i.order_id LEFT JOIN LATERAL jsonb_array_elements(i.components) c(value) ON true;
CREATE VIEW customer_facts AS
WITH cfg AS (SELECT COALESCE((value->>'churn_days')::int, 120) AS churn, COALESCE((value->>'dormant_days')::int, 75) AS dormant FROM site_settings WHERE key = 'analytics'),
o AS (SELECT ci.key, v.*, lag(v.placed_at) OVER (PARTITION BY ci.key ORDER BY v.placed_at) AS prev FROM valid_orders v JOIN customer_identity ci ON ci.customer_id = v.customer_id),
a AS (SELECT key, min(placed_at) AS first_at, max(placed_at) AS last_at, count(*)::int AS orders, sum(total_paise - refunded_paise)::bigint AS spend, avg(extract(epoch FROM placed_at - prev) / 86400) AS gap, stddev_samp(extract(epoch FROM placed_at - prev) / 86400) AS gap_sd, count(prev)::int AS gaps FROM o GROUP BY key)
SELECT a.*, c.name, c.phone, c.email, c.registered, c.wa_opt_in, c.acq_source, extract(day FROM now() - a.last_at)::int AS recency, (a.spend / a.orders)::int AS aov,
  CASE WHEN now() - a.last_at > cfg.churn * interval '1 day' THEN 'lost' WHEN now() - a.last_at > cfg.dormant * interval '1 day' THEN 'dormant' WHEN a.orders >= 2 THEN 'repeat' WHEN now() - a.first_at <= interval '30 days' THEN 'new' ELSE 'active' END AS segment,
  CASE WHEN a.gaps >= 2 THEN a.last_at + a.gap * interval '1 day' END AS expected_next
FROM a JOIN customers c ON c.id = a.key CROSS JOIN cfg;
