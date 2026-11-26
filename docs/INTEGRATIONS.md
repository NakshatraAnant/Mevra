# Integrations

Admin → Growth shows the status of every adapter. Without credentials an adapter records the action and never reports it as sent. Put credentials in the server environment only.

| Adapter | Variables | Before switching on |
|---|---|---|
| Payment gateway | RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET | Implement PaymentProvider in src/lib/payments.ts and a signature-verified webhook. COD is the only working method today |
| Email | EMAIL_API_URL, EMAIL_API_KEY, EMAIL_FROM | Verified sending domain |
| WhatsApp | WHATSAPP_PHONE_ID, WHATSAPP_TOKEN | Meta-approved templates. Only opted-in numbers are queued |
| Shipping | SHIPPING_API_URL, SHIPPING_API_KEY | Until then, zones in Settings give estimates and tracking is typed by hand |
| Meta | META_PIXEL_ID, META_CAPI_TOKEN | Consent banner and privacy wording |
| Google Analytics | GA_MEASUREMENT_ID, GA_API_SECRET | Consent banner and privacy wording |

Refill stays in simulation until a payment mandate provider exists. Product feed: /feeds/products.xml (products on sale only).
