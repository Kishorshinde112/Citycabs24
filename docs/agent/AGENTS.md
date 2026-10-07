# CityCabs24 Architecture & Production Guardrails

> Read this file FIRST before changing code. These are production safety rules, not suggestions.
> The target migration is React/Vite/Express -> Next.js App Router + Payload CMS while preserving the existing frontend UI and live business behavior.

## 1. Mission

Migrate CityCabs24 to a production-grade Next.js + Payload CMS application with SQLite while preserving:

- the current public UI as closely as possible (migration, not redesign)
- all working public URLs
- live Google Ads / GTM conversion behavior
- booking and quick-enquiry behavior
- lead email + n8n alerts
- persistent SQLite data
- public asset URLs where practical
- genuine 404s and canonical redirects
- current Docker/Traefik deployment intent

Payload must become the authoritative content source. Do not leave the client editing half the site in Payload while the frontend still reads hardcoded JavaScript constants.

---

## 2. Google Ads & Live Traffic Safety (CRITICAL)

- Active Google Ads account/tag: `AW-18424689411`.
- GTM container: `GTM-TDJCRQRM`.
- NEVER move core GTM/gtag loading behind `requestIdleCallback`, arbitrary `setTimeout`, or a late lazy-loading strategy that changes attribution.
- Preserve Conversion Linker behavior and GCLID/UTM query parameters through redirects and navigation.
- Keep conversion types separate:
  - Full booking confirmation = primary booking conversion + intended `generate_lead` behavior.
  - Quick enquiry = `quick_enquiry_submitted` only, unless the existing production implementation explicitly proves otherwise.
- Prevent duplicate conversions on refresh, hydration, rerender, or admin updates.
- Before changing tracking, inventory every existing `gtag`, `dataLayer.push`, GTM snippet, and confirmation-page trigger.

### Lead email invariant

Booking leads must continue sending email notifications to:

`mumbaicitycabs24@gmail.com`

Do not silently change this recipient.

---

## 3. Database Safety

Existing runtime database path is effectively:

`data/citycabs.db`

The current Express server creates SQLite tables at runtime. The uploaded source archive may not include the deployed `.db` file.

Before any migration write against a real deployed DB:

1. Make a timestamped backup in `backups/`.
2. Never test destructive migrations on the only production copy.
3. Validate row counts before and after migration.
4. Preserve historical booking IDs and timestamps.
5. Make data migration scripts idempotent wherever possible.
6. Keep SQLite as the target database. Do not switch to PostgreSQL, MongoDB, Supabase, Firebase, etc. unless the owner explicitly changes this requirement.

### Known legacy DB shape

Current server creates:

- `settings(key TEXT PRIMARY KEY, value TEXT NOT NULL)`
- `bookings(id TEXT PRIMARY KEY, name, phone, route, vehicle, date, status, createdAt)`
- `tours(id TEXT PRIMARY KEY, data TEXT NOT NULL)`

The new Payload schema may create its own tables. Treat the old tables as migration sources, not as a permanent parallel content system.

### Timestamp cleanup

The old code has legacy `createdAt` / `created_at` handling concerns. Normalize the new model cleanly while preserving historical timestamps.

---

## 4. Payload CMS Is the Content Source of Truth

After migration, runtime frontend content must NOT depend primarily on old static data files such as:

- `src/data/toursData.js`
- `src/data/fleetData.js`
- `src/data/faqData.js`
- `src/data/routesData.js`
- `src/data/testimonialsData.js`
- `src/data/mumbaiDarshanRates.js`
- `src/utils/seoData.js`

These files may be used by migration/seed scripts until parity is proven, then archived or removed.

Known duplication that must be eliminated:

- Navbar tour menu is hardcoded.
- Footer tour links read static tour data.
- Individual tour pages contain hardcoded copy, rules, attractions and rates.
- Mumbai Darshan contains its own rules/highlights/rates/SEO.
- FAQ content is static.
- SEO exists in frontend utilities and server config.
- `TourDetailPage` prioritizes a local hardcoded banner before CMS/server data.

Payload data must win after migration.

---

## 5. UI Parity Is Non-Negotiable

This is NOT a redesign.

Preserve:

- existing layout
- visual hierarchy
- current Tailwind look
- current dark/zinc + amber/yellow visual language
- spacing and responsive behavior
- typography
- buttons/cards
- form UX
- mobile menu behavior
- tour detail layouts
- confirmation pages
- visible animations/interactions unless technically incompatible

Do not “modernize” the UI unless asked.

Current fonts include:

- Outfit
- Plus Jakarta Sans

### Required visual regression widths

Capture baseline and migrated screenshots at minimum:

- 375px
- 768px
- 1024px
- 1440px

Important pages must be compared before acceptance.

---

## 6. Routing & SEO Integrity

Known public routes that must survive:

- `/`
- `/tours`
- `/mumbai-darshan`
- `/lonavala-trip`
- `/alibaug-sightseeing`
- `/matheran-sightseeing`
- `/shirdi-tour`
- `/mahabaleshwar-sightseeing`
- `/igatpuri-tour`
- `/ashtavinayak`
- `/3-jyotirlinga-in-maharashtra`
- `/konkan-darshan`
- `/booking-confirmed`
- `/enquiry-received`
- `/enquiry-confirmed`
- `/terms-and-conditions`
- `/terms`
- `/privacy-policy`
- `/refund-policy`
- `/cancellation-policy`

### Mandatory redirects

- `www.citycabs24.com` -> 301 to `https://citycabs24.com`, preserving path/query.
- `/mumbai-darshan-cab-service` -> 301 to `/mumbai-darshan`, preserving query parameters such as `gclid`.

### 404

Unknown routes must return a genuine HTTP 404. Do not return a pretty page with HTTP 200.

### Noindex

At minimum:

- Payload/admin routes
- booking/enquiry confirmation pages

must not be indexed.

### Sitemap

Do not invent a fresh `lastmod` date on every deployment. Use a real modification time or omit it.

---

## 7. Next.js Architecture Rules

Target stack:

- Next.js App Router
- TypeScript
- Payload CMS integrated with Next.js
- Payload SQLite adapter
- Payload Lexical editor

Use Server Components by default.

Use Client Components only when browser-side interaction requires them, for example:

- menus
- modals
- booking forms
- interactive rate selectors
- tracking hooks
- live-preview bridge

Do not turn the entire site into `"use client"`.

Critical public content should be present in server-rendered HTML, including H1, descriptions, rates, FAQs and primary links.

---

## 8. Media & Asset Rules

Existing source already contains responsive WebP assets. Preserve that performance discipline.

For uploaded media:

- keep alt text
- store dimensions
- generate practical responsive sizes around 480w, 768w and 1280w when appropriate
- do not use Base64 blobs as the normal image workflow
- lazy-load below-fold images
- prioritize the actual LCP hero
- avoid CLS with dimensions/aspect ratios

### Cache rules from current production guardrails

- Long immutable caching belongs only on fingerprinted assets.
- Permanent filenames such as `/assets/tours/*.webp`, `/assets/fleet/*.webp`, logo/favicon files must not be cached as immutable forever.
- HTML must remain revalidatable, not year-long immutable.

### Local fonts

Keep local WOFF2 assets working. If fetching Google Fonts again, use a modern browser user-agent and verify downloaded files are real WOFF2 files, not HTML error responses.

---

## 9. Booking / Enquiry Behavior

Preserve existing customer-facing behavior unless explicitly approved otherwise:

- Quick Booking modal
- booking/contact form
- auto-enquiry modal timing/logic
- call actions
- WhatsApp actions
- booking/enquiry references
- booking confirmation route
- enquiry confirmation route

A refresh of a confirmation page must not create a second lead or conversion.

Public users may create a booking/enquiry but must never be able to list all leads.

---

## 10. Email + n8n Alerts

Preserve existing notification intent:

- email dispatch after a new booking/lead
- n8n webhook dispatch
- webhook secret header
- customer details
- route/tour
- vehicle
- travel date
- lead/booking ID
- timestamp

Do not resend “new lead” notifications when an editor merely changes status later.

Secrets stay in environment variables.

---

## 11. Authentication & Security

Replace the old custom localStorage JWT admin model with Payload auth/session capabilities where practical.

Keep equivalent or better protection for:

- login attempts
- booking submissions
- test notification endpoints
- lead records
- admin actions

Validate public form data server-side.

Never expose:

- SMTP passwords
- Payload secret
- session/auth secrets
- n8n webhook secret

in browser bundles or editable CMS fields.

---

## 12. Payload Admin UX

Payload admin should be client-friendly and CityCabs24-branded, not an untouched developer demo.

Use clear groups such as:

- Content
- Tours & Rates
- Fleet & Gallery
- Leads / Bookings
- Site Settings

Use human labels and helper text.

Do not make raw JSON the normal editing experience for rate tables, tours or page sections.

Use safe structured fields/blocks instead.

---

## 13. Docker & Deployment

Current deployment uses Node 22, Docker Compose and Traefik labels/networks.

Preserve deployment compatibility.

Required persistent storage:

- SQLite database
- uploaded media when using local filesystem storage

Test the production image, not only `npm run dev`.

If using Next standalone output, verify Payload, public assets, migrations and media serving are all included.

Existing network intent includes `dokploy-network` and `coolify`; do not casually delete production routing labels/networks.

---

## 14. Working Method for AI Agents

Before coding:

1. Read all six framework MD files.
2. Inspect the repository; do not trust only this document.
3. Update `PROJECT_AUDIT.md` if code differs from the audit.
4. Follow `TARGET_ARCHITECTURE.md` unless evidence requires a documented change.
5. Keep `MIGRATION_TASKS.md` current as work progresses.
6. Run `QA_ACCEPTANCE.md` before declaring completion.

Do not mark an item complete merely because code was written. It is complete after the relevant build/test/HTTP/UI check passes.
