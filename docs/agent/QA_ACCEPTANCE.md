# CityCabs24 QA & Acceptance Checklist

The migration is not complete until the following checks pass against a production build.

## 1. Build & Runtime

- [ ] Fresh dependency install succeeds.
- [ ] TypeScript compiles with no blocking errors.
- [ ] Production build succeeds.
- [ ] Production server starts without migration/config errors.
- [ ] No browser console errors on core public pages.
- [ ] No server errors during normal browsing.

Record commands/results:

```text
Install:
Build:
Start:
Test date:
Commit:
```

---

## 2. HTTP Status Tests

Use `curl -I` / `curl -s -o /dev/null -w` or equivalent.

Expected:

| URL | Expected |
|---|---|
| `/` | 200 |
| `/tours` | 200 |
| `/mumbai-darshan` | 200 |
| `/lonavala-trip` | 200 |
| `/alibaug-sightseeing` | 200 |
| `/matheran-sightseeing` | 200 |
| `/shirdi-tour` | 200 |
| `/mahabaleshwar-sightseeing` | 200 |
| `/igatpuri-tour` | 200 |
| `/ashtavinayak` | 200 |
| `/3-jyotirlinga-in-maharashtra` | 200 |
| `/konkan-darshan` | 200 |
| `/privacy-policy` | 200 |
| `/terms-and-conditions` | 200 |
| `/refund-policy` | 200 |
| `/cancellation-policy` | 200 |
| `/definitely-not-a-real-page` | 404 |

- [ ] Invalid route returns real 404 status.
- [ ] 404 page contains noindex/no-follow policy if required by implementation.

---

## 3. Redirect Tests

### Legacy tour URL

Request:

`/mumbai-darshan-cab-service?gclid=test123&utm_source=qa`

Expected:

- permanent redirect
- final path `/mumbai-darshan`
- `gclid=test123` preserved
- `utm_source=qa` preserved

### Host canonical

Request same path on `www.citycabs24.com`.

Expected:

- permanent redirect to `https://citycabs24.com/...`
- path/query preserved

- [ ] No redirect loop.
- [ ] No unnecessary chain if direct redirect is feasible.

---

## 4. Internal Link Crawl

Automate a same-origin crawl of the production build.

Check:

- [ ] Navbar links.
- [ ] Tour dropdown links.
- [ ] Tour cards.
- [ ] Footer links.
- [ ] Legal links.
- [ ] CTA links.
- [ ] Breadcrumb links.
- [ ] Hash anchors.
- [ ] Image URLs.
- [ ] Sitemap URLs.

Known home anchors that must resolve correctly where used:

- `about`
- `fleet`
- `gallery`
- `contact`
- `why-us`

Known tour page anchor:

- `rate-card`

No unintended internal 404s.

---

## 5. CMS Edit Acceptance

Test using a non-developer editor account where applicable.

### Mumbai Darshan

Change one item at a time and publish:

- [ ] page/hero title
- [ ] subtitle
- [ ] hero image
- [ ] short/body copy
- [ ] one highlight
- [ ] one rule
- [ ] one attraction
- [ ] one rate cell
- [ ] SEO title
- [ ] meta description
- [ ] OG image

Verify the frontend reflects each published change.

Important:

- [ ] CMS hero image must not be overridden by an old static `TOURS_DATA` banner.
- [ ] rate chart must not still come from `mumbaiDarshanRates.js` or JSX constants.

Restore test values after verification.

---

## 6. Slug Change Acceptance

On a test/staging Tour/Page:

1. publish with `/old-test-slug`
2. change slug to `/new-test-slug`
3. publish

Expected:

- [ ] new URL returns 200
- [ ] old URL permanently redirects to new URL
- [ ] query string is preserved
- [ ] no redirect loop
- [ ] sitemap includes canonical new URL only

---

## 7. Draft / Preview

- [ ] Draft can be saved without changing public page.
- [ ] Preview displays draft content for authorized editor.
- [ ] Published content updates public page.
- [ ] Version history is usable.
- [ ] Unpublished draft is not in sitemap.
- [ ] Unpublished draft is not publicly readable via normal page URL.

---

## 8. SEO Acceptance

For homepage + at least 3 representative tour pages:

- [ ] exactly one effective title
- [ ] meta description present
- [ ] canonical correct
- [ ] OG title/description/image correct
- [ ] indexable pages are index/follow as intended
- [ ] confirmation/admin pages are noindex
- [ ] H1 is server-rendered in returned HTML
- [ ] main tour text is server-rendered
- [ ] rate content is discoverable in HTML where intended
- [ ] visible FAQ matches FAQ JSON-LD
- [ ] breadcrumbs match visible/navigation structure
- [ ] structured data parses as valid JSON

Sitemap:

- [ ] only published canonical URLs
- [ ] no admin URLs
- [ ] no confirmation/thank-you URLs
- [ ] no draft URLs
- [ ] no fake deployment-time `lastmod`

Robots:

- [ ] expected admin/private paths blocked where appropriate
- [ ] sitemap URL correct

AI/public discovery files:

- [ ] `/llms.txt` returns 200 if retained
- [ ] `/.well-known/ard.json` returns 200 if retained
- [ ] `/.well-known/ai-catalog.json` returns 200 if retained

---

## 9. Booking Flow Acceptance

Submit a real staging/test booking.

Expected:

- [ ] server-side validation runs
- [ ] one Booking record created
- [ ] reference ID returned/displayed
- [ ] status defaults correctly
- [ ] date/route/vehicle stored correctly
- [ ] GCLID/UTM captured where provided
- [ ] confirmation page opens successfully
- [ ] refresh does not create second booking
- [ ] unauthenticated user cannot list bookings
- [ ] unauthenticated user cannot change booking status

---

## 10. Quick Enquiry Acceptance

- [ ] quick enquiry creates correct lead type/data
- [ ] quick enquiry UX matches baseline closely
- [ ] auto-enquiry behavior matches intended existing timing
- [ ] it reaches correct confirmation behavior
- [ ] it does not fire the full booking conversion accidentally

---

## 11. Email / n8n Acceptance

For a NEW test lead:

- [ ] email notification attempts exactly once
- [ ] configured recipient remains `mumbaicitycabs24@gmail.com`
- [ ] message includes useful customer/route/vehicle/date/reference details
- [ ] n8n webhook sends secret header server-side
- [ ] failures are logged without exposing secrets to browser

Then update only the lead status:

- [ ] no duplicate “new booking” email
- [ ] no duplicate n8n new-lead dispatch

---

## 12. Tracking Acceptance

Use browser/network/tag debugging in a staging environment safe for testing.

- [ ] GTM `GTM-TDJCRQRM` loads as intended.
- [ ] Google Ads `AW-18424689411` remains configured.
- [ ] GCLID survives canonical/legacy redirects.
- [ ] route/navigation tracking behaves correctly in Next.
- [ ] full booking triggers intended primary conversion exactly once.
- [ ] full booking triggers intended lead event behavior exactly once.
- [ ] quick enquiry triggers intended `quick_enquiry_submitted` behavior.
- [ ] quick enquiry does not duplicate primary booking conversion.
- [ ] hydration/rerender does not duplicate events.

Do not guess missing conversion labels. Compare with baseline/source/config.

---

## 13. Auth / Access Control Acceptance

Admin:

- [ ] can log in.
- [ ] can manage intended users/roles.
- [ ] can manage all content.
- [ ] can manage bookings.

Editor:

- [ ] can edit approved content.
- [ ] can use media.
- [ ] cannot see/change secrets.
- [ ] cannot promote own role to admin.
- [ ] cannot change protected system settings if not allowed.

Public:

- [ ] cannot access private drafts.
- [ ] cannot enumerate bookings.
- [ ] cannot update/delete bookings.
- [ ] cannot access admin without auth.

---

## 14. UI Visual Regression

Compare baseline vs migrated screenshots.

Required widths:

- 375px
- 768px
- 1024px
- 1440px

Required representative pages:

- homepage
- tours listing
- Mumbai Darshan
- one generic tour detail page
- one legal page
- booking/enquiry modal states
- confirmation page

Check:

- [ ] header height/spacing
- [ ] typography
- [ ] hero crop/overlay
- [ ] cards
- [ ] buttons
- [ ] rate tables
- [ ] section spacing
- [ ] footer
- [ ] mobile menu
- [ ] floating actions
- [ ] no horizontal overflow
- [ ] no major CLS

Unapproved redesign = failure even if code is technically cleaner.

---

## 15. Media Acceptance

- [ ] existing important asset URLs still work or have deliberate mapping.
- [ ] logo/favicons work.
- [ ] local fonts load successfully.
- [ ] tour/fleet images display.
- [ ] Payload-uploaded image displays after publish.
- [ ] generated responsive variants work.
- [ ] alt text is rendered where applicable.
- [ ] below-fold images lazy-load.
- [ ] hero is prioritized appropriately.
- [ ] no normal workflow stores image Base64 blobs in SQLite.

---

## 16. SQLite Persistence Acceptance

In production-like Docker:

1. Create/edit a CMS record.
2. Create a test booking.
3. Upload a test image if using local storage.
4. Restart container.
5. Verify all persist.
6. Rebuild/recreate application container while keeping volume.
7. Verify all persist again.

- [ ] DB survives restart.
- [ ] DB survives redeploy/recreate.
- [ ] uploads survive if local.

---

## 17. Performance Sanity

- [ ] no obvious JS explosion from making every component client-side.
- [ ] primary content server-renders.
- [ ] LCP hero is not accidentally lazy-loaded.
- [ ] below-fold images are not all eager-loaded.
- [ ] image dimensions prevent obvious CLS.
- [ ] no repeated CMS fetch waterfall for common global content.
- [ ] Payload admin code is not shipped unnecessarily into public frontend bundles.

---

## 18. Final Hardcoded-Content Search

Before completion, search runtime code for old sources:

- [ ] `TOURS_DATA`
- [ ] `FLEET_DATA`
- [ ] `FAQ_DATA`
- [ ] `mumbaiDarshanRates`
- [ ] `TOURS_SEO`
- [ ] old `server/seoConfig.js` usage
- [ ] old settings/tours API runtime dependencies

Migration/seed scripts may still reference legacy data intentionally. Public runtime should not.

---

## 19. Final Sign-Off

Fill this out:

```text
Production build: PASS / FAIL
Docker boot: PASS / FAIL
SQLite persistence: PASS / FAIL
CMS edit -> frontend: PASS / FAIL
Visual parity: PASS / FAIL
Internal links: PASS / FAIL
404/redirects: PASS / FAIL
SEO: PASS / FAIL
Booking flow: PASS / FAIL
Email/n8n: PASS / FAIL
Tracking: PASS / FAIL
Access control: PASS / FAIL

Known intentional deviations:
- 

Known follow-up work:
- 
```

Do not call the migration complete with unresolved FAIL items in a critical category.
