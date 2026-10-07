# CityCabs24 Target Architecture

## 1. Goal

Create one production Next.js application containing:

- public CityCabs24 website
- Payload CMS admin
- Payload REST/local APIs as needed
- SQLite database
- lead submission logic
- email/n8n notifications
- SEO metadata + structured data
- persistent local media (unless a later storage provider is explicitly selected)

Frontend design must remain visually equivalent to the existing site.

---

## 2. High-Level Architecture

```text
                         +-----------------------+
                         |     Visitor / Bot     |
                         +-----------+-----------+
                                     |
                                     v
                         +-----------------------+
                         |  Traefik / HTTPS      |
                         +-----------+-----------+
                                     |
                                     v
+------------------------------------------------------------------+
|                  Next.js + Payload Application                   |
|                                                                  |
|  +----------------------+      +-------------------------------+ |
|  | Next App Router      |      | Payload CMS                   | |
|  | Public Website       |<---->| Local API / REST when needed  | |
|  | Server Components    |      | Admin UI                      | |
|  | Metadata / Sitemap   |      | Auth / Access Control         | |
|  +----------+-----------+      +---------------+---------------+ |
|             |                                  |                 |
|             +----------------+-----------------+                 |
|                              |                                   |
|                              v                                   |
|                    +-------------------+                         |
|                    | Payload SQLite DB |                         |
|                    | /app/data/...     |                         |
|                    +-------------------+                         |
|                                                                  |
|      New lead hook/action --> Nodemailer + n8n webhook           |
+------------------------------------------------------------------+
                 |                         |
                 v                         v
         Persistent /app/data       Persistent uploads/media
```

---

## 3. Proposed App Structure

Use a structure close to:

```text
src/
  app/
    (frontend)/
      layout.tsx
      page.tsx
      tours/
        page.tsx
      [slug]/
        page.tsx
      booking-confirmed/
        page.tsx
      enquiry-received/
        page.tsx
      enquiry-confirmed/
        page.tsx
      privacy-policy/
        page.tsx
      terms-and-conditions/
        page.tsx
      refund-policy/
        page.tsx
      cancellation-policy/
        page.tsx
    (payload)/
      admin/
      api/
  blocks/
  collections/
  globals/
  components/
    frontend/
    admin/
  lib/
    payload.ts
    seo.ts
    tracking.ts
    redirects.ts
    leadNotifications.ts
  migrations/
  scripts/
payload.config.ts
```

The exact route-group paths should follow the installed Payload + Next integration requirements. Do not invent a structure that fights the framework.

---

## 4. Rendering Strategy

### Server-render by default

Use Server Components for:

- home page content
- tour listing
- tour detail page body
- rates
- FAQs
- legal pages
- navigation/footer content when possible
- structured data
- SEO metadata

### Client Components only where needed

Use client components for:

- mobile navigation state
- booking modal state
- quick enquiry modal
- form interaction
- interactive fare/rate controls
- WhatsApp/call UI if browser APIs are needed
- tracking events tied to user actions
- Payload Live Preview integration

Do not fetch primary SEO content only after hydration.

---

## 5. Route Model

### Reserved fixed routes

Keep explicit routes for:

- `/`
- `/tours`
- confirmation pages
- legal aliases where required
- Payload admin/API

### Tour / CMS pages

Prefer one dynamic resolver instead of 10 hardcoded route components.

Possible strategy:

1. Check published Tour by slug.
2. If none, check published Page by slug.
3. If none, `notFound()`.

Avoid collisions with reserved paths.

A separate `/tours/[slug]` route is not acceptable if it changes existing SEO URLs unless redirects and owner approval explicitly allow it. Existing top-level tour URLs must remain.

---

## 6. Content Model Strategy

Payload becomes the sole runtime source of truth for editable content.

Recommended major entities:

- Users
- Media
- Tours
- Pages
- Bookings
- Fleet
- Gallery
- Testimonials
- FAQs
- Redirects (or equivalent redirect management)

Recommended Globals:

- Site Settings
- Navigation
- Footer
- Home Page (or protected `home` Page document)

See `CMS_SCHEMA.md` for fields.

---

## 7. Block Rendering Strategy

Use structured blocks mapped to existing UI sections.

Examples:

- Hero
- RichText
- TourHighlights
- Information/Rules
- RateTable
- CTA
- TourGrid
- Fleet
- WhyChooseUs
- Testimonials
- Gallery
- FAQ
- About
- BookingForm

Each block renderer should implement the CURRENT frontend visual design.

Do not expose Tailwind class strings to normal editors.

---

## 8. SQLite Strategy

Use the official Payload SQLite adapter compatible with the selected Payload version.

Production requirements:

- database file stored on persistent mounted volume
- uploads persistent if local storage is used
- backup process documented
- migrations committed to repository
- migration from legacy tables tested against a copy

Do not delete the legacy DB until migration verification is complete.

---

## 9. Legacy Data Migration

Migration sources:

### Source DB

- settings
- bookings
- tours JSON rows

### Source code data

- static tour data
- fleet data
- gallery/routes data
- testimonials
- FAQs
- Mumbai Darshan rates
- tour-page-specific rules/highlights/rates
- SEO maps
- legal page JSX copy

### Migration approach

1. Export legacy DB data safely.
2. Parse static source defaults.
3. Upsert CMS documents by stable key/slug.
4. Preserve current text/prices/assets on first import.
5. Verify record counts and critical field samples.
6. Make script idempotent.
7. Switch frontend reads to Payload.
8. Only then retire static runtime sources.

---

## 10. SEO Strategy

Use Next.js Metadata API / `generateMetadata`.

Per page/tour:

- SEO title
- meta description
- canonical
- OG title
- OG description
- OG image
- robots index/noindex
- optional follow/nofollow

Global defaults live in Site Settings.

Structured data should be generated from the same published CMS data as the visible page.

Supported schema where relevant:

- Organization / TaxiService or LocalBusiness-type business schema
- BreadcrumbList
- FAQPage only when matching FAQ content is visibly rendered
- TouristTrip / Service / Offer where valid

Avoid duplicate/conflicting metadata from old Helmet/server injection.

---

## 11. Slug & Redirect Strategy

Editors can change slugs, but SEO safety is required.

On published slug change:

- preserve the old path as a permanent redirect
- prevent redirect loops
- collapse avoidable redirect chains
- preserve query parameters

Hard requirement:

`/mumbai-darshan-cab-service?gclid=x`

must permanently redirect to:

`/mumbai-darshan?gclid=x`

The non-www host must permanently redirect to the canonical host while preserving path/query.

---

## 12. Caching & Revalidation

Use explicit cache behavior.

Public content may use Next caching/revalidation, but CMS publishing must invalidate affected paths quickly.

Use a clean mechanism such as:

- `revalidatePath`
- `revalidateTag`
- Payload hooks

Examples:

- Tour publish/update: revalidate its slug, `/tours`, homepage if it appears there, sitemap.
- Site Settings update: revalidate header/footer/global pages as necessary.
- FAQ update: revalidate pages that surface global FAQs.

Do not cache draft/private admin data publicly.

---

## 13. Lead Submission Architecture

Recommended flow:

```text
Public booking/enquiry form
        |
        v
server-side validated action/endpoint
        |
        +--> create Payload Booking record
        |
        +--> send lead email once
        |
        +--> dispatch n8n webhook once
        |
        +--> return reference ID / redirect safely
```

Use idempotency/guard logic where appropriate to prevent accidental duplicate submission.

Do not let confirmation-page refresh create another lead.

---

## 14. Auth / Access Control

Payload Users collection handles staff authentication.

Minimum roles:

- `admin`
- `editor`

### Admin

- full content control
- settings
- users/roles
- leads
- redirects

### Editor

- edit/publish allowed content
- edit tours/pages/media/fleet/gallery/FAQ/testimonials
- view/update bookings if explicitly desired
- no access to secrets/system-critical config
- cannot change auth/security internals

Public users:

- can read published public content
- can create booking/enquiry records only through controlled server path
- cannot list/read/update/delete lead records

---

## 15. Payload Admin UX

Brand admin for CityCabs24.

Desired qualities:

- recognizable logo/favicon
- clear labels
- grouped navigation
- structured rate editor
- preview button
- drafts/version history
- useful descriptions
- minimal dangerous raw fields

Optional custom dashboard cards:

- Total Leads
- Pending
- Confirmed
- Completed
- Cancelled
- recent leads

Operational convenience worth preserving:

- quick call
- WhatsApp
- copy lead details

---

## 16. Media Strategy

Payload Media fields include alt text and caption.

Generate multiple sizes suitable for existing design.

If local storage is used:

- mount media persistently in Docker
- ensure public media paths survive container rebuilds
- include backup instructions

For old public assets, preserve existing paths or perform controlled migration with verification.

---

## 17. Tracking Strategy

Tracking must work in Next navigation without duplicate events.

Preserve:

- GTM container loading early enough for paid traffic attribution
- Google Ads ID
- query IDs
- primary booking conversion distinction
- quick enquiry event distinction

Audit confirmation triggers before implementation. Never invent conversion labels/IDs.

---

## 18. Docker Strategy

Use a multi-stage Node 22 image.

Production container must contain:

- Next runtime output
- Payload server dependencies
- migrations
- public assets
- persistent DB path configuration
- media path configuration

Compose must persist at least:

```yaml
volumes:
  - ./data:/app/data
  - ./media:/app/media   # if local upload storage uses this path
```

Exact paths should match implementation.

Retain Traefik routing/network intent.

---

## 19. Definition of Done

Architecture is considered implemented only after:

- production build passes
- production container boots
- SQLite persists across restart/rebuild test
- Payload admin login works
- CMS edit changes frontend output
- slug change redirect works
- no hardcoded-data precedence remains
- core routes return correct status codes
- internal link audit passes
- visual parity check passes
- tracking is verified without duplicates
- booking/email/n8n flow is verified
- sitemap/robots/canonical/noindex checks pass
