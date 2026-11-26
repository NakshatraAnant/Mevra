-- MEVRA core schema. Money is integer paise (GST-inclusive). Timestamps are timestamptz; reporting buckets in Asia/Kolkata.
-- The same migration is applied to schema "public" (live) and schema "demo" (isolated demonstration dataset).

CREATE TABLE site_settings (
  key text PRIMARY KEY, value jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, name text NOT NULL,
  password_hash text NOT NULL, role text NOT NULL CHECK (role IN ('owner','manager','support','analyst')),
  active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), last_login_at timestamptz
);
CREATE TABLE sessions (
  token_hash text PRIMARY KEY, kind text NOT NULL CHECK (kind IN ('customer','admin')), subject_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL
);
CREATE INDEX ON sessions (subject_id);
CREATE TABLE rate_limits (bucket text NOT NULL, window_start timestamptz NOT NULL, hits int NOT NULL DEFAULT 1, PRIMARY KEY (bucket, window_start));
CREATE TABLE audit_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, admin_id uuid, actor text NOT NULL, action text NOT NULL,
  entity text NOT NULL, entity_id text, detail jsonb NOT NULL DEFAULT '{}', at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON audit_logs (at DESC);

-- Catalogue -----------------------------------------------------------------
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL, blurb text NOT NULL DEFAULT '',
  hero_asset text, thumb_asset text, sort int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true
);
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL, kind text NOT NULL DEFAULT 'single' CHECK (kind IN ('single','bundle')),
  category_id uuid NOT NULL REFERENCES categories(id), family text NOT NULL DEFAULT '',
  grade text, origin text, origin_verified boolean NOT NULL DEFAULT false,
  short_desc text NOT NULL DEFAULT '', overview text NOT NULL DEFAULT '', taste text NOT NULL DEFAULT '', grade_note text NOT NULL DEFAULT '',
  best_uses text NOT NULL DEFAULT '', ingredients text NOT NULL DEFAULT '', storage text NOT NULL DEFAULT '', packaging text NOT NULL DEFAULT '',
  faqs jsonb NOT NULL DEFAULT '[]', uses text[] NOT NULL DEFAULT '{}', search_terms text NOT NULL DEFAULT '', pairs_with text[] NOT NULL DEFAULT '{}',
  merch_rank int NOT NULL DEFAULT 100, featured boolean NOT NULL DEFAULT false, active boolean NOT NULL DEFAULT true,
  availability_note text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON products (category_id); CREATE INDEX ON products (active, merch_rank);
CREATE TABLE product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku text NOT NULL UNIQUE, label text NOT NULL, weight_g int NOT NULL CHECK (weight_g > 0),
  price_paise int CHECK (price_paise > 0), -- NULL = price not configured yet, variant cannot be bought
  mrp_paise int CHECK (mrp_paise > 0), gst_rate_bp int CHECK (gst_rate_bp BETWEEN 0 AND 4000), hsn text,
  target_margin_bp int, active boolean NOT NULL DEFAULT true, sort int NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (mrp_paise IS NULL OR price_paise IS NULL OR mrp_paise >= price_paise)
);
CREATE INDEX ON product_variants (product_id);
CREATE TABLE bundle_components (
  bundle_variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE, component_variant_id uuid NOT NULL REFERENCES product_variants(id),
  qty int NOT NULL DEFAULT 1 CHECK (qty > 0), PRIMARY KEY (bundle_variant_id, component_variant_id)
);
CREATE TABLE product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  purpose text NOT NULL, src text NOT NULL, alt text NOT NULL, sort int NOT NULL DEFAULT 0
);
CREATE INDEX ON product_images (product_id, sort);
CREATE TABLE variant_costs (
  variant_id uuid PRIMARY KEY REFERENCES product_variants(id) ON DELETE CASCADE,
  product_cost_paise int CHECK (product_cost_paise >= 0), packaging_cost_paise int CHECK (packaging_cost_paise >= 0), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE price_history (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  old_paise int, new_paise int, at timestamptz NOT NULL DEFAULT now(), actor text
);

-- Inventory & lots ------------------------------------------------------------
CREATE TABLE inventory (
  variant_id uuid PRIMARY KEY REFERENCES product_variants(id) ON DELETE CASCADE,
  tracked boolean NOT NULL DEFAULT false, -- false = stock not recorded yet; sells as "available to order"
  on_hand int NOT NULL DEFAULT 0 CHECK (on_hand >= 0), reserved int NOT NULL DEFAULT 0 CHECK (reserved >= 0),
  low_threshold int NOT NULL DEFAULT 10, reorder_point int, lead_time_days int, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, contact text, phone text, city text, notes text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE lots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lot_number text NOT NULL UNIQUE, variant_id uuid NOT NULL REFERENCES product_variants(id),
  supplier_id uuid REFERENCES suppliers(id), origin text, grade text, purchase_date date, received_date date, packing_date date, best_before date,
  qty_received int NOT NULL DEFAULT 0 CHECK (qty_received >= 0), qty_remaining int NOT NULL DEFAULT 0 CHECK (qty_remaining >= 0),
  unit_cost_paise int, testing_status text NOT NULL DEFAULT 'not_tested' CHECK (testing_status IN ('not_tested','awaiting_result','passed','failed')),
  verified boolean NOT NULL DEFAULT false, verified_by text, verified_at timestamptz, published boolean NOT NULL DEFAULT false,
  notes text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON lots (variant_id, best_before);
CREATE TABLE lot_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), lot_id uuid NOT NULL REFERENCES lots(id) ON DELETE CASCADE, lab_name text, report_number text,
  issued_on date, file_path text, url text, mime text, uploaded_by text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE stock_movements (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE, lot_id uuid REFERENCES lots(id),
  kind text NOT NULL CHECK (kind IN ('receive','adjust','reserve','release','ship','return')), qty int NOT NULL,
  order_id uuid, note text, actor text, at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON stock_movements (variant_id, at DESC);

-- Customers, carts, orders ------------------------------------------------------
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, phone text NOT NULL, email text, password_hash text,
  registered boolean NOT NULL DEFAULT false, wa_opt_in boolean NOT NULL DEFAULT false, email_opt_in boolean NOT NULL DEFAULT false, consent_at timestamptz,
  acq_source text, acq_medium text, acq_campaign text, notes text, created_at timestamptz NOT NULL DEFAULT now()
);
-- Guests are matched by phone for analytics; a registered login is a separate, email-unique record and never auto-claims guest orders.
CREATE UNIQUE INDEX customers_reg_email ON customers (lower(email)) WHERE registered;
CREATE UNIQUE INDEX customers_guest_phone ON customers (phone) WHERE NOT registered;
CREATE INDEX ON customers (phone);
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE, label text NOT NULL DEFAULT 'Home',
  name text NOT NULL, phone text NOT NULL, line text NOT NULL, landmark text, pin text NOT NULL, city text NOT NULL, state text NOT NULL, is_default boolean NOT NULL DEFAULT false
);
CREATE INDEX ON addresses (customer_id);
CREATE TABLE carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), token_hash text NOT NULL UNIQUE, customer_id uuid REFERENCES customers(id), visitor_id text, coupon_code text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','converted')), checkout_started_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON carts (status, updated_at);
CREATE TABLE cart_items (
  cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE, variant_id uuid NOT NULL REFERENCES product_variants(id), qty int NOT NULL CHECK (qty BETWEEN 1 AND 50),
  added_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (cart_id, variant_id)
);
CREATE TABLE coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE, description text NOT NULL DEFAULT '', kind text NOT NULL CHECK (kind IN ('percent','flat')),
  value int NOT NULL CHECK (value > 0), scope text NOT NULL DEFAULT 'site' CHECK (scope IN ('site','festival_bundle')), min_subtotal_paise int NOT NULL DEFAULT 0,
  starts_at timestamptz, ends_at timestamptz, usage_limit int, per_customer_limit int, used_count int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_no text NOT NULL UNIQUE, public_token text NOT NULL UNIQUE, idempotency_key text UNIQUE,
  customer_id uuid NOT NULL REFERENCES customers(id), cart_id uuid REFERENCES carts(id), channel text NOT NULL DEFAULT 'website' CHECK (channel IN ('website','whatsapp','b2b','gifting')),
  status text NOT NULL DEFAULT 'placed' CHECK (status IN ('placed','confirmed','packed','shipped','out_for_delivery','delivered','cancelled','failed','rto','returned')),
  payment_method text NOT NULL, payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','collected','refunded','void')),
  list_paise int NOT NULL, subtotal_paise int NOT NULL, discount_paise int NOT NULL DEFAULT 0, shipping_paise int NOT NULL DEFAULT 0, cod_fee_paise int NOT NULL DEFAULT 0,
  tax_included_paise int, total_paise int NOT NULL CHECK (total_paise > 0), coupon_code text,
  name text NOT NULL, phone text NOT NULL, email text, line text NOT NULL, landmark text, pin text NOT NULL, city text NOT NULL, state text NOT NULL,
  gst_invoice boolean NOT NULL DEFAULT false, gstin text, gst_business_name text, wa_updates boolean NOT NULL DEFAULT false, customer_note text,
  courier text, tracking_no text, shipping_cost_paise int, return_cost_paise int, cancel_reason text, refunded_paise int NOT NULL DEFAULT 0,
  visitor_id text, source text, medium text, campaign text, device text,
  placed_at timestamptz NOT NULL DEFAULT now(), confirmed_at timestamptz, packed_at timestamptz, shipped_at timestamptz, delivered_at timestamptz, closed_at timestamptz
);
CREATE INDEX ON orders (placed_at); CREATE INDEX ON orders (customer_id, placed_at); CREATE INDEX ON orders (status); CREATE INDEX ON orders (phone);
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE, variant_id uuid NOT NULL REFERENCES product_variants(id),
  product_id uuid NOT NULL REFERENCES products(id), name text NOT NULL, sku text NOT NULL, pack text NOT NULL, grade text, qty int NOT NULL CHECK (qty > 0),
  list_paise int NOT NULL, unit_paise int NOT NULL, discount_paise int NOT NULL DEFAULT 0, gst_rate_bp int,
  product_cost_paise int, packaging_cost_paise int, components jsonb -- snapshot of bundle components [{variant_id,sku,qty}]
);
CREATE INDEX ON order_items (order_id); CREATE INDEX ON order_items (product_id);
CREATE TABLE order_lots (
  order_item_id uuid NOT NULL REFERENCES order_items(id) ON DELETE CASCADE, lot_id uuid NOT NULL REFERENCES lots(id), qty int NOT NULL CHECK (qty > 0), PRIMARY KEY (order_item_id, lot_id)
);
CREATE INDEX ON order_lots (lot_id);
CREATE TABLE order_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE, kind text NOT NULL, from_status text, to_status text, note text, actor text NOT NULL, at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON order_events (order_id);
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE, provider text NOT NULL, method text NOT NULL,
  amount_paise int NOT NULL, status text NOT NULL CHECK (status IN ('pending','collected','refunded','void')), provider_ref text, fee_paise int, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON payments (order_id);

-- Engagement --------------------------------------------------------------------
CREATE TABLE wishlists (customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE, product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE, added_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (customer_id, product_id));
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE, customer_id uuid REFERENCES customers(id), order_id uuid REFERENCES orders(id),
  name text NOT NULL, rating int NOT NULL CHECK (rating BETWEEN 1 AND 5), title text NOT NULL DEFAULT '', body text NOT NULL, verified_purchase boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON reviews (product_id, status);
CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), ref text NOT NULL UNIQUE, kind text NOT NULL CHECK (kind IN ('gifting_corporate','gifting_wedding','gifting_festival','b2b','contact')),
  name text NOT NULL, organisation text, phone text NOT NULL, email text, details jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','sample_sent','quoted','won','lost')), notes text, follow_up date, value_paise int,
  source text, medium text, campaign text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON enquiries (status, created_at DESC);
CREATE VIEW gifting_enquiries AS SELECT * FROM enquiries WHERE kind LIKE 'gifting%';
CREATE VIEW b2b_enquiries AS SELECT * FROM enquiries WHERE kind = 'b2b';
CREATE VIEW contact_enquiries AS SELECT * FROM enquiries WHERE kind = 'contact';
CREATE TABLE subscribers (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), channel text NOT NULL CHECK (channel IN ('email','whatsapp')), address text NOT NULL, purpose text NOT NULL DEFAULT 'news', consent_text text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), unsubscribed_at timestamptz, UNIQUE (channel, address, purpose));
CREATE TABLE notifications (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), channel text NOT NULL, recipient text NOT NULL, template text NOT NULL, subject text, body text NOT NULL, order_id uuid REFERENCES orders(id) ON DELETE CASCADE, status text NOT NULL DEFAULT 'logged_dev' CHECK (status IN ('logged_dev','sent','failed')), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE b2b_prices (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), item text NOT NULL, grade text, pack text NOT NULL, price_paise_per_kg int, week_of date, sort int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true);
CREATE TABLE gift_tiers (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, name text NOT NULL, weight_g int NOT NULL, price_paise int, contents text NOT NULL, blurb text NOT NULL, sort int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true);

-- Analytics -----------------------------------------------------------------------
CREATE TABLE events (
  id uuid PRIMARY KEY, -- client-generated: retries of the same event cannot double count
  name text NOT NULL, at timestamptz NOT NULL DEFAULT now(), visitor_id text NOT NULL, session_id text NOT NULL, customer_id uuid,
  product_id uuid, order_id uuid, path text, source text, medium text, campaign text, device text, props jsonb NOT NULL DEFAULT '{}'
);
CREATE UNIQUE INDEX events_order_once ON events (name, order_id) WHERE order_id IS NOT NULL AND name IN ('order_placed','order_delivered');
CREATE INDEX ON events (name, at); CREATE INDEX ON events (session_id, at); CREATE INDEX ON events (visitor_id, at); CREATE INDEX ON events (product_id, name, at) WHERE product_id IS NOT NULL;
CREATE TABLE marketing_spend (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), day date NOT NULL, source text NOT NULL, medium text NOT NULL DEFAULT '', campaign text NOT NULL DEFAULT '', spend_paise int NOT NULL CHECK (spend_paise >= 0),
  impressions int, clicks int, entry text NOT NULL DEFAULT 'manual', UNIQUE (day, source, medium, campaign)
);
CREATE TABLE operating_expenses (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), month date NOT NULL, label text NOT NULL, amount_paise int NOT NULL CHECK (amount_paise >= 0));
CREATE TABLE insight_states (key text PRIMARY KEY, state text NOT NULL CHECK (state IN ('acknowledged','dismissed')), actor text, at timestamptz NOT NULL DEFAULT now());
