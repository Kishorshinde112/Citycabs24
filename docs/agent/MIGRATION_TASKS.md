# CityCabs24 Migration Task Board

Rule: check an item only after implementation AND verification. Keep notes under items when behavior changes.

## Phase 0 - Safety / Baseline

- [ ] Read `AGENTS.md`.
- [ ] Read all five other framework files.
- [ ] Confirm working branch / create migration branch.
- [ ] Record current Node/npm versions.
- [ ] Record current package versions.
- [ ] Run current install/build before editing.
- [ ] Start current app in production-like mode.
- [ ] Capture baseline screenshots at 375, 768, 1024, 1440 widths.
- [ ] Capture baseline HTML/head for homepage and representative tour pages.
- [ ] Record current Lighthouse/Core Web Vitals baseline if practical.
- [ ] Record all active public routes and status codes.
- [ ] Record all redirects and query preservation behavior.
- [ ] Record GTM/Google Ads tags/events/conversion triggers.
- [ ] Record booking + quick-enquiry network requests.
- [ ] Record email/n8n notification behavior.
- [ ] If real `citycabs.db` exists, create timestamped backup before migration writes.

## Phase 1 - Repository Audit

- [ ] Confirm all files/routes listed in `PROJECT_AUDIT.md`.
- [ ] Search for all `TOURS_DATA` usages.
- [ ] Search for all `FLEET_DATA` usages.
- [ ] Search for all FAQ/testimonial/gallery static usages.
- [ ] Search for all hardcoded rate tables.
- [ ] Search for all hardcoded SEO titles/descriptions/canonicals.
- [ ] Search for all `gtag` calls.
- [ ] Search for all `dataLayer` calls.
- [ ] Search for all WhatsApp/tel/mailto links.
- [ ] Search for all `/api/*` calls.
- [ ] Search for localStorage admin token usage.
- [ ] Search for image paths that must remain valid.
- [ ] Crawl all internal links and anchors in baseline app.
- [ ] Update `PROJECT_AUDIT.md` with anything missing.

## Phase 2 - Next.js + Payload Foundation

- [ ] Choose latest stable mutually-compatible Next.js + Payload releases.
- [ ] Convert project to TypeScript.
- [ ] Create Next.js App Router foundation.
- [ ] Integrate Payload in the same app.
- [ ] Configure official Payload SQLite adapter.
- [ ] Configure persistent database location.
- [ ] Configure Payload secret/env validation.
- [ ] Configure admin route.
- [ ] Create `.env.example` without secrets.
- [ ] Preserve local fonts.
- [ ] Recreate global CSS/Tailwind behavior without visual drift.
- [ ] Confirm blank/base app production build succeeds.

## Phase 3 - Payload Collections / Globals

- [ ] Users collection with admin/editor roles.
- [ ] Media collection with responsive image sizes.
- [ ] Tours collection.
- [ ] Pages collection.
- [ ] Bookings collection.
- [ ] Fleet collection.
- [ ] Gallery collection.
- [ ] Testimonials collection.
- [ ] FAQs collection.
- [ ] Redirects collection/equivalent.
- [ ] Site Settings Global.
- [ ] Navigation Global.
- [ ] Footer Global.
- [ ] Homepage Global or protected Homepage Page document.
- [ ] Enable drafts/versions for editorial content where useful.
- [ ] Add preview/live preview where stable.
- [ ] Add access controls.
- [ ] Add human-friendly labels/help text.

## Phase 4 - CMS Blocks

- [ ] Hero Block.
- [ ] Rich Text Block using Lexical.
- [ ] Information/Rules Block.
- [ ] Attractions Block.
- [ ] Rate Table Block.
- [ ] CTA Block.
- [ ] Tour Grid Block.
- [ ] Fleet Block.
- [ ] Why Choose Us Block.
- [ ] Testimonials Block.
- [ ] Gallery Block.
- [ ] FAQ Block.
- [ ] About Block.
- [ ] Booking Form Block/config.
- [ ] Ensure blocks render current frontend styling, not new designs.

## Phase 5 - Seed / Legacy Migration

- [ ] Create idempotent content seed script.
- [ ] Import current 10 tours.
- [ ] Import tour images/references.
- [ ] Import Mumbai Darshan rates.
- [ ] Import hardcoded rules/highlights/attractions from individual tour pages.
- [ ] Import Fleet data.
- [ ] Import Gallery data.
- [ ] Import Testimonials.
- [ ] Import FAQs.
- [ ] Import legal page copy.
- [ ] Import current SEO metadata.
- [ ] Import Site Settings defaults.
- [ ] Seed Navigation/Footer.
- [ ] Seed required legacy redirect.
- [ ] If legacy production DB exists, migrate bookings preserving IDs/timestamps.
- [ ] If legacy production DB exists, migrate settings/tour rows with conflict rules.
- [ ] Re-run seed and prove no duplicate documents are created.

## Phase 6 - Frontend Migration / UI Parity

- [ ] Rebuild Navbar in Next with current appearance.
- [ ] Drive tour dropdown from CMS/navigation.
- [ ] Rebuild Hero with current appearance.
- [ ] Rebuild Tour Packages/Grid.
- [ ] Rebuild Why Choose Us.
- [ ] Rebuild Fleet.
- [ ] Rebuild Testimonials.
- [ ] Rebuild Gallery.
- [ ] Rebuild About.
- [ ] Rebuild FAQ.
- [ ] Rebuild Booking/Contact section.
- [ ] Rebuild Footer.
- [ ] Rebuild Tours listing page.
- [ ] Create reusable Tour detail renderer.
- [ ] Reproduce Mumbai Darshan special layout via CMS fields/blocks, not hardcoded content.
- [ ] Rebuild legal pages.
- [ ] Rebuild confirmation pages.
- [ ] Preserve floating Call/WhatsApp actions.
- [ ] Preserve mobile behavior.
- [ ] Preserve auto enquiry behavior.
- [ ] Remove hardcoded banner precedence bug.

## Phase 7 - Booking / Lead System

- [ ] Implement server-side validated booking create flow.
- [ ] Implement quick-enquiry create flow.
- [ ] Generate stable human-readable reference IDs.
- [ ] Capture relevant GCLID/UTM fields.
- [ ] Apply rate limiting/abuse protection.
- [ ] Ensure public cannot read/list bookings.
- [ ] Preserve staff status workflow: Pending/Confirmed/Completed/Cancelled.
- [ ] Add useful admin list columns/filters.
- [ ] Preserve quick call/WhatsApp convenience where useful.
- [ ] Verify confirmation refresh does not create another record.

## Phase 8 - Email / n8n

- [ ] Move lead notification logic to server-only module/hook.
- [ ] Preserve email recipient `mumbaicitycabs24@gmail.com`.
- [ ] Preserve useful lead details in email.
- [ ] Preserve n8n secret header.
- [ ] Preserve internal/external webhook fallback intent where still required.
- [ ] Add timeouts/error handling.
- [ ] Prove a NEW lead sends notification once.
- [ ] Prove status edit does not resend new-lead alert.
- [ ] Protect/remove test-email endpoint appropriately.

## Phase 9 - SEO

- [ ] Implement global Next metadata defaults.
- [ ] Implement `generateMetadata` for tours/pages.
- [ ] Implement canonical URL logic.
- [ ] Implement OG metadata.
- [ ] Implement robots directives.
- [ ] Implement business structured data.
- [ ] Implement breadcrumbs schema.
- [ ] Implement tour/service/offers schema as appropriate.
- [ ] Implement FAQ schema only from visible FAQ data.
- [ ] Remove React Helmet dependency/runtime use.
- [ ] Remove duplicate Express SEO injection.
- [ ] Implement dynamic sitemap from published CMS docs.
- [ ] Exclude admin, drafts and confirmation pages from sitemap.
- [ ] Avoid fake daily `lastmod`.
- [ ] Implement robots output.
- [ ] Preserve `/llms.txt`.
- [ ] Preserve `/.well-known/ard.json`.
- [ ] Preserve `/.well-known/ai-catalog.json`.

## Phase 10 - Slugs / Redirects

- [ ] Preserve all current tour URLs.
- [ ] Implement legacy `/mumbai-darshan-cab-service` 301.
- [ ] Preserve query params on that redirect.
- [ ] Implement www -> non-www canonical redirect.
- [ ] Preserve query params on host redirect.
- [ ] Implement old-slug redirect creation on published slug change.
- [ ] Prevent redirect loops.
- [ ] Minimize redirect chains.

## Phase 11 - Tracking

- [ ] Preserve GTM `GTM-TDJCRQRM`.
- [ ] Preserve Google Ads `AW-18424689411`.
- [ ] Verify page navigation tracking in Next.
- [ ] Preserve GCLID through applicable flows.
- [ ] Verify primary booking conversion exactly once.
- [ ] Verify quick enquiry fires only intended event.
- [ ] Verify no conversion event fires from normal admin/status edits.
- [ ] Verify no duplicate events on hydration/rerender.

## Phase 12 - Media / Performance

- [ ] Preserve existing important image URLs or map deliberately.
- [ ] Preserve local WOFF2 fonts.
- [ ] Configure Payload responsive image sizes.
- [ ] Add dimensions/aspect ratio to prevent CLS.
- [ ] Prioritize true LCP hero.
- [ ] Lazy-load below-fold media.
- [ ] Verify all migrated media returns expected HTTP status/content type.
- [ ] Avoid Base64 media storage.
- [ ] Compare major bundle/performance regressions.

## Phase 13 - Payload Admin UX

- [ ] Add CityCabs24 logo/favicon/admin metadata.
- [ ] Organize collections into sensible groups.
- [ ] Use clear field labels/descriptions.
- [ ] Ensure Mumbai Darshan rate chart is easy to edit.
- [ ] Ensure page title/meta/slug/hero/rates can be edited without code.
- [ ] Add dashboard summary cards if useful.
- [ ] Add Recent Leads section if useful.
- [ ] Verify editor role cannot access dangerous settings/secrets/users.
- [ ] Verify admin can manage everything intended.

## Phase 14 - Docker / Production

- [ ] Create production multi-stage Dockerfile.
- [ ] Use deterministic install (`npm ci` when lockfile is valid).
- [ ] Configure production Next/Payload runtime.
- [ ] Persist SQLite path.
- [ ] Persist uploaded media path if local.
- [ ] Preserve Traefik labels/network intent.
- [ ] Build image successfully.
- [ ] Boot image successfully.
- [ ] Restart container and verify DB/content persists.
- [ ] Rebuild container and verify DB/media persists.

## Phase 15 - Final Verification

- [ ] Run all checks in `QA_ACCEPTANCE.md`.
- [ ] Run production build from clean install.
- [ ] Run TypeScript/type checks.
- [ ] Run lint if configured.
- [ ] Run automated tests.
- [ ] Run Playwright smoke tests.
- [ ] Run internal link crawl.
- [ ] Compare screenshots against baseline.
- [ ] Verify critical mobile widths.
- [ ] Verify HTTP status codes with curl.
- [ ] Verify admin editing actually changes frontend output.
- [ ] Verify no runtime dependency remains on obsolete hardcoded content.
- [ ] Document any intentional deviations.
- [ ] Only then mark migration complete.
