-- One person can have a guest record and a registered record with the same phone; analytics counts them as one.
CREATE VIEW customer_identity AS
SELECT id AS customer_id, first_value(id) OVER (PARTITION BY phone ORDER BY created_at, id) AS key, phone FROM customers;
