# CityCabs24 Architecture & Production Guardrails

## 1. Google Ads & Live Traffic Safety (CRITICAL)
- **Active Campaigns**: Google Ads campaigns (`AW-18424689411`) are LIVE and driving real paid traffic.
- **No Idle/Delay on GTM/gtag**: NEVER move core GTM (`GTM-TDJCRQRM`) or `gtag.js` behind `requestIdleCallback` or artificial setTimeout delays.
- **Conversion Linker**: Preserve Conversion Linker and GCLID capture across all pages and redirects.
- **Conversion Separation**:
  - Full booking confirmation page triggers primary Google Ads conversion (`AW-18424689411`) and `generate_lead`.
  - Quick enquiry form triggers `quick_enquiry_submitted` in dataLayer without duplicate primary conversion firing.
- **Email Lead Dispatch**: Booking leads must send email notifications ONLY to Shahrukh (`mumbaicitycabs24@gmail.com`).

## 2. Database, Asset & Font Optimization Protocol
- **Base64 DB Migration Safety**:
  1. Take full SQLite DB backup to `backups/` before any write.
  2. Convert image to responsive WebP variants (`480w`, `768w`, `1280w`).
  3. Verify HTTP 200 and `image/webp` Content-Type on the live image URL before updating the DB.
  4. Update the DB row to the image URL path.
  5. Verify `/api/tours` response payload size.
- **Responsive Images**: Do NOT resize images blindly to a single resolution.
  - Tour cards & fleet: `480w` (mobile), `768w` (tablet/cards), `1280w` (desktop/hero).
  - Below-the-fold images: `loading="lazy"` and `decoding="async"`.
  - Hero (LCP) images: `loading="eager"`, `fetchpriority="high"`, with early `<link rel="preload">` in `index.html`.
- **Logo Optimization**: Keep logo below 50KB (WebP) with explicit `width` and `height` to prevent CLS.

- **Google Fonts Local Hosting**: When locally hosting Google Fonts, fetch the `fonts.googleapis.com/css2` CSS using a Chrome `User-Agent`, parse the `url(...)` targets, and download those exact WOFF2 files. Blind `wget` commands without headers often result in invalid 0-byte or 404 HTML fallback files.

## 3. Caching Invariants (Strict)
- **Content-Hashed Assets ONLY**: `public, max-age=31536000, immutable` applies EXCLUSIVELY to fingerprinted files matching `-[A-Za-z0-9_-]{8}\.(js|css|png|jpg|webp|svg|woff2?)`.
- **Permanent Filenames**: Assets with permanent filenames (`/assets/tours/*.webp`, `/assets/fleet/*.webp`, `logo.png`, `favicon.png`) must use `public, max-age=86400, must-revalidate`.
- **HTML Responses**: Must always be served with `Cache-Control: no-cache, must-revalidate`.

## 4. SEO & Routing Integrity
- **HTTP 404 vs 200**: Unknown routes must return genuine **HTTP 404** status with `<meta name="robots" content="noindex, nofollow" />` and `NotFoundPage` (prevents Google Soft 404 indexation issues).
- **True React SSR Hydration**: Do not use hand-coded HTML shells inside `#root` overwritten by `createRoot()`, as this destroys initial paints and causes severe LCP Element Render Delay.
  - Use `react-dom/server` (`renderToString`) for public routes and `ReactDOM.hydrateRoot()` on the client.
  - **Deterministic Initial State**: Store API fetches (like `fetchSharedSettings`) must be strictly fenced behind `if (typeof window !== 'undefined')`. Both the Node SSR process and initial client hydration must evaluate against the exact same fallback default data to guarantee a 1:1 DOM match.
  - Note: React Router v7 exports `StaticRouter` directly from `react-router-dom`, not `react-router-dom/server`.
- **Visible FAQs**: Any page containing `FAQPage` JSON-LD schema must render a visible `<FaqSection />` component.
- **Canonical Redirects**:
  - `www.citycabs24.com` -> 301 permanent redirect to `https://citycabs24.com`.
  - `/mumbai-darshan-cab-service` -> 301 permanent redirect to `/mumbai-darshan`.
- **Sitemap `lastmod`**: Do not regenerate fake daily `lastmod` dates on deployment; omit `<lastmod>` unless real modification dates exist.

## 5. Docker & Server Conventions
- **Docker Copy**: When copying directories into Docker containers, use `docker cp dir/. container:/path/` (trailing `/.`) to avoid nested folders.
- **Dotfiles**: Ensure `express.static` uses `dotfiles: 'allow'` so `/.well-known/ard.json` and agent discovery files are accessible.
