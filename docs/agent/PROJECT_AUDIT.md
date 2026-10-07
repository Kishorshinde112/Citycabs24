# CityCabs24 Current Project Audit

Status: baseline audit from the provided source ZIP. Update this document if deeper inspection finds additional behavior.

## 1. Current Stack

| Area | Current implementation |
|---|---|
| Frontend | React 18 |
| Build tool | Vite 6 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 3 |
| Client state | Zustand 5 |
| SEO | React Helmet Async + server-side SEO injection |
| Server | Express 5 |
| Database | Node `node:sqlite` / SQLite |
| Auth | Custom JWT + bcrypt |
| Email | Nodemailer |
| Rate limiting | express-rate-limit |
| Testing dependency | Playwright |
| Deployment | Docker + Traefik |
| Runtime | Node 22 |

Target migration: Next.js App Router + Payload CMS + SQLite + TypeScript.

---

## 2. Current Public Route Inventory

Routes found in `src/App.jsx`:

### Core

- `/`
- `/tours`

### Tours

- `/mumbai-darshan`
- `/mumbai-darshan-cab-service` (legacy frontend route; server also performs 301)
- `/lonavala-trip`
- `/alibaug-sightseeing`
- `/matheran-sightseeing`
- `/shirdi-tour`
- `/mahabaleshwar-sightseeing`
- `/igatpuri-tour`
- `/ashtavinayak`
- `/3-jyotirlinga-in-maharashtra`
- `/konkan-darshan`

### Conversion / confirmation

- `/booking-confirmed`
- `/enquiry-received`
- `/enquiry-confirmed`

### Legal

- `/terms-and-conditions`
- `/terms`
- `/privacy-policy`
- `/refund-policy`
- `/cancellation-policy`

### Admin

- `/admin/login`
- `/admin`
- `/admin/settings`
- `/admin/tours`

### Fallback

- catch-all NotFound page

Target action: preserve all public URL behavior and replace old admin with Payload admin/native customizations.

---

## 3. Current API Inventory

Endpoints found in `server/index.js`:

| Method | Route | Purpose | Target action |
|---|---|---|---|
| GET | `/mumbai-darshan-cab-service` | 301 legacy redirect | Preserve as true 301 |
| GET | `/api/settings` | Public shared settings | Replace with server-side Payload/local API where possible |
| PUT | `/api/settings` | Admin settings update | Replace with Payload Globals/Collections |
| GET | `/api/bookings` | Admin booking list | Replace with Payload Bookings collection/admin |
| POST | `/api/bookings` | Public booking create | Replace with validated Next/Payload endpoint/action |
| POST | `/api/test-email` | Admin notification test | Keep only if operationally needed, protected + rate limited |
| PATCH | `/api/bookings/:id/status` | Booking status update | Replace with Payload admin/update |
| DELETE | `/api/bookings/:id` | Delete lead | Replace with Payload access-controlled delete |
| GET | `/api/tours` | Public tour content | Prefer direct server-side Payload Local API |
| PUT | `/api/tours` | Bulk replace tours | Remove/replace with structured Payload edits |
| PUT | `/api/tours/:id` | Update tour | Replace with Payload collection |
| DELETE | `/api/tours/:id` | Delete tour | Replace with Payload collection/access controls |
| POST | `/api/auth/login` | Custom JWT login | Replace with Payload auth |
| GET | `/sitemap.xml` | Sitemap | Replace with dynamic Next/Payload sitemap |
| GET | `/robots.txt` | Robots | Replace with Next route/metadata route while preserving rules |

Important: do not preserve redundant HTTP APIs merely for familiarity if the frontend and CMS can use Payload Local API server-side. Preserve behavior, not unnecessary plumbing.

---

## 4. Current SQLite Schema

Created at runtime by `server/index.js`:

```sql
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  route TEXT,
  vehicle TEXT,
  date TEXT,
  status TEXT DEFAULT 'Pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tours (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL
);
```

Known default settings include:

- phone: `9833309061`
- helpPhone: `8380803217`
- email: `mumbaicitycabs24@gmail.com`

The repo itself may not contain the deployed `.db`; the server creates it in the data directory.

Target action:

- keep SQLite
- back up real production DB before write
- migrate content to Payload schema
- preserve bookings/history
- stop using JSON-in-a-single-column as the main content model

---

## 5. Current Static Content Sources

Files discovered:

- `src/data/toursData.js`
- `src/data/fleetData.js`
- `src/data/faqData.js`
- `src/data/routesData.js`
- `src/data/testimonialsData.js`
- `src/data/mumbaiDarshanRates.js`
- `src/utils/seoData.js`
- `server/seoConfig.js`
- individual files under `src/pages/Public/*Tour*.jsx`

These create multiple sources of truth.

### Known hardcoding/duplication issues

1. `Navbar.jsx`
   - Tour dropdown URLs/items are hardcoded.

2. `Footer.jsx`
   - Tour links are derived from static `TOURS_DATA`.

3. `TourDetailPage.jsx`
   - Imports static `TOURS_DATA`.
   - Local static banner is selected before server/CMS-like data.
   - This can hide an admin-edited banner.

4. `MumbaiDarshanPage.jsx`
   - Has local `rulesList`.
   - Has local `highlightsList`.
   - Has local `ratesTable`.
   - Uses static SEO object.
   - Uses local tour/banner fallback logic.

5. FAQ
   - Static `faqData.js` and schema generation reference the same static source.

6. SEO
   - Static `src/utils/seoData.js` plus `server/seoConfig.js` means duplicated metadata logic.

Target action: migrate into structured Payload collections/globals/blocks and make CMS authoritative.

---

## 6. Tour Inventory

Current tour slugs found in source:

1. `mumbai-darshan`
2. `lonavala-trip`
3. `alibaug-sightseeing`
4. `matheran-sightseeing`
5. `shirdi-tour`
6. `mahabaleshwar-sightseeing`
7. `igatpuri-tour`
8. `ashtavinayak`
9. `3-jyotirlinga-in-maharashtra`
10. `konkan-darshan`

Target: seed all into Payload without changing initial copy, prices, images or slugs.

---

## 7. Component Inventory

Key frontend components:

- `AboutSection.jsx`
- `AutoEnquiryModal.jsx`
- `BookingContactForm.jsx`
- `BookingForm.jsx`
- `FaqSection.jsx`
- `FareCalculator.jsx`
- `FleetSection.jsx`
- `FloatingActions.jsx`
- `Footer.jsx`
- `GallerySection.jsx`
- `Hero.jsx`
- `MumbaiDarshanRateTable.jsx`
- `Navbar.jsx`
- `PrivacyModal.jsx`
- `PromotionalOfferBanner.jsx`
- `QuickBookModal.jsx`
- `SEOHead.jsx`
- `Testimonials.jsx`
- `TourModal.jsx`
- `TourPackages.jsx`
- `WhyChooseUs.jsx`

Target: reuse/rebuild their presentation in Next components while keeping design parity. Convert content-heavy sections into CMS-driven renderers.

---

## 8. Existing Admin Inventory

Files:

- `src/pages/Admin/AdminLayout.jsx`
- `src/pages/Admin/Dashboard.jsx`
- `src/pages/Admin/Login.jsx`
- `src/pages/Admin/Settings.jsx`
- `src/pages/Admin/ToursManager.jsx`

Current backend/admin functionality includes:

- custom login
- bookings list/access
- booking status update
- booking deletion
- settings editing
- tour management
- content stored through `/api/tours` and `/api/settings`

`contentStore.js` also manages concepts for:

- tours
- fleet
- gallery
- site images

Target: replace with Payload collections/globals and custom admin UI only where native Payload admin is insufficient.

---

## 9. Current Internal Link Audit

Source-level checks show valid current targets for the known tour links and home anchors.

Known anchors used by navigation/footer include:

- `/#about`
- `/#fleet`
- `/#gallery`
- `/#contact`
- `/#why-us`
- `#rate-card`

All 10 known tour slugs are represented by public routes in the current app.

Important: this is only a static source audit. The migrated app must perform runtime crawling/link checks after Next.js implementation.

---

## 10. SEO / Structured Data Audit

Current SEO utilities include:

- site URL constant
- default title/description/canonical
- per-tour metadata
- LocalBusiness / TaxiService-like schema
- FAQPage schema
- BreadcrumbList schema
- TouristTrip schema with offers

Current production guardrail states visible FAQ content must exist whenever FAQPage JSON-LD is emitted.

Target:

- use Next Metadata API / `generateMetadata`
- use CMS SEO fields
- produce JSON-LD from the same published CMS content
- preserve canonicals
- preserve breadcrumbs
- preserve relevant structured data semantics
- no duplicate conflicting tags

---

## 11. Tracking / Conversion Audit

Known production identifiers:

- Google Ads: `AW-18424689411`
- GTM: `GTM-TDJCRQRM`

`src/App.jsx` currently calls `gtag('config', 'AW-18424689411', { page_path })` on React Router navigation.

Existing architecture distinguishes:

- full booking conversion
- quick enquiry event

Target: reimplement safely for Next navigation and confirmation flow without duplicate firing.

---

## 12. Email / Webhook Audit

Current backend uses Nodemailer and n8n.

n8n logic tries internal and external webhook URLs and sends:

`X-CityCabs-Webhook-Secret`

Target:

- preserve notification behavior
- keep secrets server-only
- trigger only for new leads
- do not retrigger merely on status updates

---

## 13. Public Asset Audit

Important public assets include:

- logo and favicons
- local fonts under `/assets/fonts/`
- fleet responsive WebP images
- hero responsive WebP images
- tour responsive WebP images
- `manifest.json`
- `sw.js`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `.well-known/ard.json`
- `.well-known/ai-catalog.json`
- admin alert audio files

Target: preserve URLs/behavior where useful and verify HTTP status/content type after migration.

---

## 14. Deployment Audit

Current `docker-compose.yml`:

- builds local image
- mounts `./data:/app/data`
- joins external `dokploy-network` and `coolify`
- routes through Traefik
- accepts both `citycabs24.com` and `www.citycabs24.com`

Current Dockerfile:

- Node 22 Alpine build stage
- Vite build + SSR bundle
- production Express server
- port 80
- `DATA_DIR=/app/data`

Target: Next/Payload production image while retaining persistent data and Traefik compatibility.

---

## 15. Migration Classification

### Preserve

- frontend visual design
- public URLs
- canonical redirect behavior
- booking UX
- enquiry UX
- contact/WhatsApp actions
- GTM/Ads tracking intent
- email recipient
- n8n alerts
- SQLite persistence
- current useful images/fonts

### Replace

- Vite app shell
- React Router routing
- React Helmet SEO
- Express page rendering
- custom JWT admin authentication
- custom content APIs where Payload replaces them cleanly
- static sitemap generator

### Migrate

- tours
- rates
- rules/highlights
- fleet
- gallery
- FAQs
- testimonials
- legal copy
- site settings
- SEO metadata
- bookings/history

### Remove after parity

- duplicate static content sources
- obsolete Express SEO injection
- obsolete custom admin screens/APIs
- redundant runtime Zustand content-fetch layer where server rendering replaces it
