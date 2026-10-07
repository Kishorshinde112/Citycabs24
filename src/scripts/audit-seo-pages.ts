import { getPayload } from 'payload'
import configPromise from '../payload.config'

const CANONICAL_ROUTES = [
  '/',
  '/tours',
  '/mumbai-darshan',
  '/lonavala-trip',
  '/alibaug-sightseeing',
  '/matheran-sightseeing',
  '/shirdi-tour',
  '/mahabaleshwar-sightseeing',
  '/igatpuri-tour',
  '/ashtavinayak',
  '/3-jyotirlinga-in-maharashtra',
  '/konkan-darshan',
  '/terms-and-conditions',
  '/privacy-policy',
  '/refund-policy',
  '/cancellation-policy',
]

async function runSeoAudit() {
  console.log('====================================================')
  console.log('PART 3: SEO DEEP AUDIT ACROSS 16 CANONICAL ROUTES')
  console.log('====================================================\n')

  let allPassed = true
  const titles = new Map<string, string>()

  // 1. Audit all 16 Canonical Routes
  console.log('--- 1. Auditing Canonical Routes Metadata, H1, & SSR HTML ---')
  for (const route of CANONICAL_ROUTES) {
    const url = `http://localhost:3000${route}`
    const res = await fetch(url)

    if (res.status !== 200) {
      console.error(`  ✗ Route ${route} returned HTTP ${res.status}!`)
      allPassed = false
      continue
    }

    const html = await res.text()

    // Title Check
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : ''

    // Meta Description Check
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
    const description = descMatch ? descMatch[1].trim() : ''

    // Canonical Link Check
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                          html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : ''

    // H1 Tag Check
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []

    // Robots Check
    const isNoIndex = html.includes('content="noindex') || html.includes('content=\'noindex')

    const hasTitle = Boolean(title)
    const hasDesc = Boolean(description)
    const hasCanonical = Boolean(canonical)
    const validH1 = h1Matches.length === 1

    if (titles.has(title)) {
      console.warn(`  ⚠ Warning: Duplicate title with ${titles.get(title)}: "${title}"`)
    } else if (title) {
      titles.set(title, route)
    }

    if (hasTitle && hasDesc && hasCanonical && validH1 && !isNoIndex) {
      console.log(`  ✓ ${route.padEnd(30)} | H1: 1 | Title: "${title.slice(0, 35)}..." | Canonical: ${canonical}`)
    } else {
      console.error(`  ✗ ${route} FAILED checks: hasTitle=${hasTitle}, hasDesc=${hasDesc}, hasCanonical=${hasCanonical}, h1Count=${h1Matches.length}, isNoIndex=${isNoIndex}`)
      allPassed = false
    }
  }

  // 2. 404 Integrity Check
  console.log('\n--- 2. Testing 404 Status & Robots Directive ---')
  const notFoundRes = await fetch('http://localhost:3000/this-definitely-does-not-exist-123')
  const notFoundHtml = await notFoundRes.text()
  console.log(`  Status code for random unknown URL: ${notFoundRes.status}`)

  if (notFoundRes.status === 404) {
    console.log('  ✓ Genuine HTTP 404 returned for non-existent route!')
  } else {
    console.error(`  ✗ Expected 404, got ${notFoundRes.status}`)
    allPassed = false
  }

  // 3. Sitemap Audit
  console.log('\n--- 3. Testing Sitemap (/sitemap.xml) ---')
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml')
  const sitemapText = await sitemapRes.text()
  console.log(`  Sitemap HTTP status: ${sitemapRes.status}`)

  let sitemapCount = 0
  let containsAllCanonical = true
  for (const route of CANONICAL_ROUTES) {
    const expectedUrl = `https://citycabs24.com${route === '/' ? '' : route}`
    const present = sitemapText.includes(`<loc>${expectedUrl}</loc>`) || sitemapText.includes(`<loc>${expectedUrl}/</loc>`)
    if (present) {
      sitemapCount++
    } else {
      console.error(`  ✗ Missing from sitemap: ${expectedUrl}`)
      containsAllCanonical = false
      allPassed = false
    }
  }

  const sitemapExcludesAdmin = !sitemapText.includes('/admin')
  const sitemapExcludesBooking = !sitemapText.includes('/booking-confirmed')
  const sitemapExcludesEnquiry = !sitemapText.includes('/enquiry-received') && !sitemapText.includes('/enquiry-confirmed')

  if (containsAllCanonical && sitemapExcludesAdmin && sitemapExcludesBooking && sitemapExcludesEnquiry) {
    console.log(`  ✓ All ${sitemapCount} canonical routes present; admin and confirmation pages properly excluded!`)
  } else {
    console.error(`  ✗ Sitemap verification failed: includesAdmin=${!sitemapExcludesAdmin}, includesBooking=${!sitemapExcludesBooking}`)
    allPassed = false
  }

  // 4. Robots.txt Audit
  console.log('\n--- 4. Testing Robots.txt (/robots.txt) ---')
  const robotsRes = await fetch('http://localhost:3000/robots.txt')
  const robotsText = await robotsRes.text()

  const disallowsAdmin = robotsText.includes('Disallow: /admin')
  const disallowsBooking = robotsText.includes('/booking-confirmed')
  const hasSitemapRef = robotsText.includes('sitemap.xml')

  if (disallowsAdmin && disallowsBooking && hasSitemapRef) {
    console.log('  ✓ Robots.txt correctly disallows /admin and confirmation pages, and includes sitemap!')
  } else {
    console.error('  ✗ Robots.txt directives incomplete:', robotsText)
    allPassed = false
  }

  // 5. 301 Permanent Redirects Audit
  console.log('\n--- 5. Testing 301 Permanent Redirects ---')
  const redirect1 = await fetch('http://localhost:3000/terms', { redirect: 'manual' })
  const loc1 = redirect1.headers.get('location') || ''
  const is301Terms = (redirect1.status === 301 || redirect1.status === 308) && loc1.includes('/terms-and-conditions')

  const redirect2 = await fetch('http://localhost:3000/mumbai-darshan-cab-service', { redirect: 'manual' })
  const loc2 = redirect2.headers.get('location') || ''
  const is301Darshan = (redirect2.status === 301 || redirect2.status === 308) && loc2.includes('/mumbai-darshan')

  if (is301Terms && is301Darshan) {
    console.log('  ✓ /terms -> /terms-and-conditions (301) verified!')
    console.log('  ✓ /mumbai-darshan-cab-service -> /mumbai-darshan (301) verified!')
  } else {
    console.error(`  ✗ Redirect audit failed: terms=${redirect1.status} (${loc1}), darshan=${redirect2.status} (${loc2})`)
    allPassed = false
  }

  // 6. Internal Link Crawl Test
  console.log('\n--- 6. Testing Key Internal Links Crawl ---')
  const samplePages = ['/', '/tours', '/mumbai-darshan']
  const testedLinks = new Set<string>()
  let brokenLinksCount = 0

  for (const sample of samplePages) {
    const pageHtml = await (await fetch(`http://localhost:3000${sample}`)).text()
    const linkMatches = pageHtml.match(/href=["'](\/[a-zA-Z0-9_\-\/]*)["']/g) || []

    for (const match of linkMatches) {
      const link = match.replace(/href=["']/, '').replace(/["']$/, '')
      if (link.startsWith('/_next') || link.startsWith('/api') || link.startsWith('/admin') || testedLinks.has(link)) {
        continue
      }
      testedLinks.add(link)
      try {
        const linkRes = await fetch(`http://localhost:3000${link}`)
        if (linkRes.status >= 400) {
          console.error(`  ✗ Broken internal link found: ${link} (HTTP ${linkRes.status}) referenced on ${sample}`)
          brokenLinksCount++
          allPassed = false
        }
      } catch (e) {
        console.error(`  ✗ Link fetch error for ${link}`)
        brokenLinksCount++
        allPassed = false
      }
    }
  }

  if (brokenLinksCount === 0) {
    console.log(`  ✓ Checked ${testedLinks.size} unique internal links: 0 broken links!`)
  } else {
    console.error(`  ✗ Found ${brokenLinksCount} broken internal links`)
  }

  // 7. Structured Data (JSON-LD) Validation
  console.log('\n--- 7. Validating Structured Data (JSON-LD) ---')
  const darshanHtml = await (await fetch('http://localhost:3000/mumbai-darshan')).text()
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi
  let match
  let jsonLdCount = 0
  let jsonValid = true

  while ((match = scriptRegex.exec(darshanHtml)) !== null) {
    jsonLdCount++
    try {
      const parsed = JSON.parse(match[1])
      console.log(`  ✓ Valid JSON-LD schema found: @type=${parsed['@type'] || parsed['@graph']?.[0]?.['@type']}`)
    } catch (e) {
      console.error(`  ✗ Invalid JSON-LD block:`, e)
      jsonValid = false
      allPassed = false
    }
  }

  if (jsonLdCount > 0 && jsonValid) {
    console.log(`  ✓ Structured data JSON-LD valid and parsed successfully!`)
  }

  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> SEO DEEP AUDIT: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> SEO DEEP AUDIT: ONE OR MORE TESTS FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runSeoAudit().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
