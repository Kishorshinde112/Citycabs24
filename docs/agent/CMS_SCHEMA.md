# CityCabs24 Payload CMS Schema

This schema is a target specification. Adapt exact field APIs to the installed Payload version, but preserve the intent and editor experience.

## 1. Users Collection

Slug: `users`

Auth-enabled.

Fields:

- `name` - text, required
- `email` - Payload auth email
- `role` - select
  - `admin`
  - `editor`
- `active` - checkbox/default true if useful

Access:

- Admin can manage users/roles.
- Editor cannot create or promote users unless explicitly allowed.

---

## 2. Media Collection

Slug: `media`

Upload-enabled.

Fields:

- `alt` - text, required for normal editorial images
- `caption` - text or rich text, optional
- `attribution` - text, optional

Image sizes should cover practical current uses, approximately:

- 480w
- 768w
- 1280w

Preserve original where needed.

Do not use Base64 in SQLite for normal media management.

---

## 3. Tours Collection

Slug: `tours`

Enable:

- drafts
- versions
- timestamps
- preview/live preview if stable

### Identity

- `title` - text, required
- `slug` - text, required, unique, indexed
- `published` / Payload status
- `displayOrder` - number
- `category` - text/select
- `duration` - text
- `tagline` - text

### Card / summary content

- `shortDescription` - textarea
- `cardTitle` - text, optional override
- `badge` - text, optional
- `startingPrice` - text or structured price field
- `rating` - number
- `reviewsCount` - number
- `cardImage` - relationship to Media

### Hero

Group `hero`:

- `titleOverride`
- `subtitle`
- `image`
- `overlayStrength`
- `primaryCTA`
- `secondaryCTA`

### Booking options

Array `bookingPackages`:

- `name`
- `duration`
- `price`
- `description` optional
- `active`

Array `carTypes` or relationship to Fleet:

- preferably relationship to Fleet where practical
- allow tour-specific override if business rules require it

### Highlights

Array `highlights`:

- `title`
- `description` optional
- `icon` optional safe key
- `image` optional

### Inclusions / exclusions

Arrays of structured items or rich-text/list blocks.

### Rules

Array `rules`:

- `text`
- `priority/order`

### Attractions

Array `attractions`:

- `name`
- `description`
- `image`
- optional icon/key

### Rates

Use a structured Rate Table field/block, not raw JSON.

Possible model:

Group/blocks `rateSections`:

- `heading`
- `subheading`
- `columnLabels[]`
- `rows[]`
  - `vehicle`
  - `vehicleRef` optional Fleet relationship
  - `recommended` boolean
  - `cells[]`
    - `label` or column key
    - `price`
  - `extraKm`
  - `extraHour`
  - `notes`

Support special rows such as Tempo Traveller without forcing developers to edit code.

### Flexible page content

`layout` - Blocks field containing approved blocks from the block library.

### SEO group

- `metaTitle`
- `metaDescription`
- `canonicalOverride`
- `ogTitle`
- `ogDescription`
- `ogImage`
- `index` checkbox/default true
- `follow` checkbox/default true
- optional schema controls only where needed

### Redirect history

Prefer a central Redirects collection/hook rather than an unbounded hidden array in each tour.

### Hooks

On published slug change:

- create/update permanent redirect from old slug to new slug
- avoid loops/chains

On publish/update:

- revalidate tour path
- revalidate `/tours`
- revalidate homepage if tour cards appear there
- revalidate sitemap

---

## 4. Pages Collection

Slug: `pages`

Use for editable non-tour pages and future landing pages.

Fields:

- `title`
- `slug`
- `status/draft`
- `layout` Blocks
- SEO group
- `template` select if necessary

Potential documents:

- tours listing supporting content
- privacy policy
- terms and conditions
- refund policy
- cancellation policy
- future SEO landing pages

Do not store confirmation pages as normal indexable CMS pages unless there is a compelling reason.

---

## 5. Bookings Collection

Slug: `bookings`

This is private operational data.

Fields should cover current and future form data:

- `referenceId` - unique human-readable booking/enquiry ID
- `leadType` - select: booking / quick-enquiry / other approved types
- `name`
- `phone`
- `route`
- `tour` - optional relationship to Tours
- `vehicle`
- `travelDate`
- `pickup`
- `drop`
- `passengers`
- `tripType`
- `status`
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- `source`
- `gclid`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmTerm`
- `utmContent`
- `notes`
- Payload timestamps
- optional `legacyCreatedAt` during migration if needed
- optional notification-delivery flags/log metadata

Access:

- public: no list/read/update/delete
- public create only through controlled validated endpoint/action, not unrestricted collection API
- staff read/update according to role
- delete restricted to admin if preferred

Hooks:

On new record only:

- send lead email
- dispatch n8n webhook

Do not repeat “new lead” notifications on status update.

---

## 6. Fleet Collection

Slug: `fleet`

Fields:

- `name`
- `slug`/internal key
- `category`
- `seating`
- `luggage`
- `image`
- `baseRate` / display rate as currently needed
- `description`
- `badges[]`
- `specifications[]`
- `displayOrder`
- `active`

Use relationship from tour rates/packages where it improves consistency.

---

## 7. Gallery Collection

Slug: `gallery`

Fields:

- `title`
- `image`
- `alt`
- `caption`
- `displayOrder`
- `active`
- optional `relatedTour`

---

## 8. Testimonials Collection

Slug: `testimonials`

Fields:

- `customerName`
- `location` optional
- `rating`
- `quote`
- `image` optional
- `relatedTour` optional
- `displayOrder`
- `active`

---

## 9. FAQs Collection

Slug: `faqs`

Fields:

- `question`
- `answer` - rich text or textarea
- `displayOrder`
- `active`
- `scope` - global / selected pages / selected tours
- optional relationships to Pages/Tours

Important:

FAQ structured data must be generated from the same visible FAQs used on that page.

---

## 10. Redirects Collection

Slug: `redirects`

Fields:

- `fromPath` - required, unique/indexed
- `toPath` - required
- `type` - 301 by default
- `active`
- `source` - manual / slug-change / legacy

Validation:

- reject self-redirect
- detect loops
- normalize leading slashes

Seed required redirect:

`/mumbai-darshan-cab-service` -> `/mumbai-darshan`

Query strings must be preserved by redirect execution logic.

---

# Globals

## 11. Site Settings Global

Suggested slug: `site-settings`

Fields:

### Business

- businessName
- publicPhone
- helpPhone
- whatsAppPhone
- publicEmail
- address
- serviceAreas[]
- businessHours

### Brand

- logo
- favicon
- defaultOgImage

### Social

- socialLinks[]

### Default SEO

- defaultTitle
- defaultMetaDescription
- siteUrl
- defaultOgImage
- organization/business schema fields

### Booking UI

- bookingCTA labels
- success/support copy where safe

Do NOT put secrets here.

SMTP password, Payload secret and webhook secret belong in environment variables.

---

## 12. Navigation Global

Fields:

- logo override if needed
- primary links[]
- tours menu configuration
- CTA label/action

Prefer relationships to Tours/Pages rather than hand-entered URLs for internal links.

The client should be able to reorder/hide navigation items safely.

---

## 13. Footer Global

Fields:

- short business description
- link groups
- contact display controls
- copyright text
- legal links

Internal links should use Page/Tour relationships where feasible.

---

## 14. Homepage Global (Recommended)

A dedicated Homepage Global is preferable if the homepage is unique and should never be accidentally deleted or change slug.

Fields/blocks should cover the existing homepage:

- announcement/promo area
- Hero block
- tour packages/grid
- Why Choose Us
- Fleet
- Testimonials
- Gallery
- About
- FAQ
- Booking/contact section

Alternative: protected `home` Page document. Pick one architecture and document it in `TARGET_ARCHITECTURE.md`.

---

# Block Library

## 15. Hero Block

Fields:

- eyebrow optional
- heading
- highlightedHeadingPart optional
- subtitle
- backgroundImage
- overlayStrength
- primaryCTA
- secondaryCTA

Keep frontend styling fixed to approved variants.

---

## 16. Rich Text Block

Use Payload Lexical.

Allow:

- headings
- paragraphs
- lists
- links
- basic emphasis

Avoid unrestricted raw HTML for normal editors.

---

## 17. Information / Rules Block

Fields:

- heading
- intro optional
- items[]
  - title optional
  - text
  - icon key optional

Useful for tour rules/important notes.

---

## 18. Attractions Block

Fields:

- heading
- items[]
  - name
  - description
  - image optional
  - icon optional

---

## 19. Rate Table Block

Critical structured editor.

Fields:

- heading
- intro/note
- columns[]
  - key
  - label
- rows[]
  - vehicle label or Fleet relationship
  - highlighted/recommended
  - prices[] keyed to columns
  - extraKm
  - extraHour
  - notes
- footerNotes[]

The admin should render this understandably. Do not force JSON editing.

---

## 20. CTA Block

Fields:

- heading
- text
- primary action
- secondary action
- style variant from a small safe select

---

## 21. Tour Grid Block

Fields:

- heading
- intro
- selection mode: automatic / selected
- selectedTours relationship[]
- limit

---

## 22. Fleet Block

Fields:

- heading
- intro
- fleet selection/limit

Vehicle content comes from Fleet collection.

---

## 23. Why Choose Us Block

Fields:

- heading
- intro
- items[]
  - title
  - text
  - icon key

---

## 24. Testimonials Block

Fields:

- heading
- selected testimonials or automatic selection
- limit

---

## 25. Gallery Block

Fields:

- heading
- selected gallery items / automatic
- limit

---

## 26. FAQ Block

Fields:

- heading
- selected FAQs / scope
- schemaEnabled boolean where valid

Visible FAQ and JSON-LD must match.

---

## 27. About Block

Fields should map to current About section without enabling arbitrary layout destruction.

---

## 28. Booking Form Block

Fields should only expose safe presentation/config controls such as:

- heading
- helper text
- default trip type
- CTA label

The underlying security/submission logic remains code-controlled.

---

# Existing Source -> CMS Mapping

| Existing source | New source of truth |
|---|---|
| `src/data/toursData.js` | Tours collection |
| tour page constants | Tours fields/blocks |
| `src/data/mumbaiDarshanRates.js` | Mumbai Darshan Rate Table block/fields |
| `src/data/fleetData.js` | Fleet collection |
| `src/data/faqData.js` | FAQs collection |
| `src/data/testimonialsData.js` | Testimonials collection |
| `src/data/routesData.js` gallery content | Gallery collection |
| `src/utils/seoData.js` | Tour/Page SEO fields + Site Settings defaults |
| `server/seoConfig.js` | Next Metadata/JSON-LD helpers using Payload data |
| `settings` SQLite rows | Site Settings / other appropriate Globals |
| `tours` SQLite JSON rows | Tours collection |
| `bookings` SQLite rows | Bookings collection |
| hardcoded Navbar tour list | Navigation Global + Tours relationships |
| Footer static tour list | Footer Global/Tours relationships |

---

# Editor UX Rules

1. Prefer relationships and structured arrays over raw URL strings for internal content.
2. Prefer safe select variants over editable Tailwind/CSS classes.
3. Add field descriptions where a non-developer could misunderstand the effect.
4. Protect system fields and secrets.
5. Use conditional fields to keep forms uncluttered.
6. Make Mumbai Darshan rates genuinely editable without code changes.
7. Ensure a CMS-edited hero/banner actually wins over old defaults.
