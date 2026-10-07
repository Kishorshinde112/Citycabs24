import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const ARTIFACT_DIR = '/home/kishor/.gemini/antigravity-cli/brain/0f28e5c7-7d32-4d29-9e4d-da9a302f3b48'
const BASE_URL = 'http://localhost:3000'

async function runAudit() {
  console.log('=== CITYCABS24 FINAL VERIFICATION & AUDIT SUITE ===\n')

  const browser = await chromium.launch({ headless: true })
  const auditResults: any = {
    performance: {},
    networkRequests: {},
    seoAndRedirects: {},
    functionality: {},
    screenshots: [],
  }

  // 1. Audit Network Requests on Homepage
  console.log('1. Auditing Network Requests on Homepage...')
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const apiCalls: string[] = []
  page.on('request', (req) => {
    if (req.url().includes('/api/')) {
      apiCalls.push(req.url())
    }
  })

  const t0 = Date.now()
  const res = await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })
  const ttfb = Date.now() - t0

  auditResults.networkRequests.homepageStatus = res?.status()
  auditResults.networkRequests.ttfbMs = ttfb
  auditResults.networkRequests.clientApiCalls = apiCalls
  console.log(`   Status: ${res?.status()} | Load Time: ${ttfb}ms`)
  console.log(`   Client API requests: ${apiCalls.length} (Expected: 0)`)

  // 2. Performance Metrics (LCP & CLS)
  console.log('\n2. Measuring Performance Metrics (CLS & LCP)...')
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0
      let lcp = 0

      // Observe CLS
      try {
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value
            }
          }
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {}

      // Observe LCP
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            lcp = lastEntry.startTime
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      } catch (e) {}

      setTimeout(() => {
        resolve({ cls, lcp })
      }, 1000)
    })
  })

  auditResults.performance = metrics
  console.log(`   CLS: ${(metrics as any).cls} (Target < 0.1)`)
  console.log(`   LCP: ${Math.round((metrics as any).lcp)}ms`)

  // 3. Check GTM & Google Ads Tag Presence
  console.log('\n3. Verifying GTM & Google Ads Integrity...')
  const gtmPresent = await page.evaluate(() => {
    return (
      document.querySelector('script[src*="GTM-TDJCRQRM"]') !== null ||
      document.documentElement.innerHTML.includes('GTM-TDJCRQRM')
    )
  })
  const gtagPresent = await page.evaluate(() => {
    return (
      document.querySelector('script[src*="AW-18424689411"]') !== null ||
      document.documentElement.innerHTML.includes('AW-18424689411')
    )
  })
  auditResults.functionality.gtm = gtmPresent
  auditResults.functionality.googleAds = gtagPresent
  console.log(`   GTM (GTM-TDJCRQRM) Present: ${gtmPresent}`)
  console.log(`   Google Ads (AW-18424689411) Present: ${gtagPresent}`)

  // 4. Verifying Phone & WhatsApp Links
  console.log('\n4. Verifying Phone & WhatsApp Call-to-Actions...')
  const telLinks = await page.$$eval('a[href^="tel:"]', (els) => els.map((e) => e.getAttribute('href')))
  const waLinks = await page.$$eval('a[href*="wa.me"]', (els) => els.map((e) => e.getAttribute('href')))
  auditResults.functionality.telLinksCount = telLinks.length
  auditResults.functionality.telSample = telLinks[0]
  auditResults.functionality.waLinksCount = waLinks.length
  auditResults.functionality.waSample = waLinks[0]
  console.log(`   Found ${telLinks.length} 'tel:' links (sample: ${telLinks[0]})`)
  console.log(`   Found ${waLinks.length} 'wa.me' links (sample: ${waLinks[0]})`)

  // 5. Verifying Booking Lead Recipient Configuration
  console.log('\n5. Verifying Lead Dispatch Email Guardrail...')
  const bookingsCode = fs.readFileSync('/home/kishor/Desktop/citycabs24/src/collections/Bookings.ts', 'utf-8')
  const emailMatch = bookingsCode.includes('mumbaicitycabs24@gmail.com')
  auditResults.functionality.leadEmailCorrect = emailMatch
  console.log(`   Lead Email configured strictly to mumbaicitycabs24@gmail.com: ${emailMatch}`)

  // 6. Test Canonical 301 Redirects & genuine 404
  console.log('\n6. Verifying SEO Routing & Redirects...')
  const redirectRes = await page.request.get(`${BASE_URL}/mumbai-darshan-cab-service`, { maxRedirects: 0 })
  console.log(`   /mumbai-darshan-cab-service status: ${redirectRes.status()} -> Location: ${redirectRes.headers()['location']}`)
  auditResults.seoAndRedirects.redirectStatus = redirectRes.status()
  auditResults.seoAndRedirects.redirectLocation = redirectRes.headers()['location']

  const notFoundRes = await page.request.get(`${BASE_URL}/some-non-existent-route-404-check`)
  console.log(`   Unknown route status: ${notFoundRes.status()} (Expected: 404)`)
  auditResults.seoAndRedirects.notFoundStatus = notFoundRes.status()

  // 7. Multi-Viewport Screenshots for Visual Parity
  console.log('\n7. Capturing Multi-Viewport Screenshots...')
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 812 },
  ]

  const routes = [
    { path: '/', name: 'homepage' },
    { path: '/tours', name: 'tours-list' },
    { path: '/mumbai-darshan', name: 'mumbai-darshan' },
    { path: '/lonavala-trip', name: 'lonavala-trip' },
  ]

  for (const vp of viewports) {
    const vpPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    for (const r of routes) {
      await vpPage.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' })
      const screenshotName = `audit-${r.name}-${vp.name}.png`
      const screenshotPath = path.join(ARTIFACT_DIR, screenshotName)
      await vpPage.screenshot({ path: screenshotPath, fullPage: false })
      auditResults.screenshots.push({ route: r.path, viewport: vp.name, file: screenshotName })
      console.log(`   Captured: ${screenshotName}`)
    }
    await vpPage.close()
  }

  // 8. Test Admin Panel Status
  console.log('\n8. Checking Payload Admin Panel...')
  const adminPage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const adminRes = await adminPage.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' })
  console.log(`   Admin status: ${adminRes?.status()}`)
  auditResults.functionality.adminStatus = adminRes?.status()
  const adminScreenshotPath = path.join(ARTIFACT_DIR, 'audit-admin-panel.png')
  await adminPage.screenshot({ path: adminScreenshotPath, fullPage: false })
  await adminPage.close()

  await page.close()
  await browser.close()

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'audit-results.json'),
    JSON.stringify(auditResults, null, 2)
  )

  console.log('\n=== AUDIT COMPLETE ===')
}

runAudit().catch((err) => {
  console.error('Audit failed:', err)
  process.exit(1)
})
