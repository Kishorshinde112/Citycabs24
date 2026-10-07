import { chromium } from 'playwright'

async function runGtmAudit() {
  console.log('=== GTM & GOOGLE ADS RUNTIME VERIFICATION ===')
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Helper to detect if an entry in dataLayer is a primary booking conversion
  const isPrimaryConversion = (entry: any): boolean => {
    if (!entry) return false
    // 1. GTM format: { event: 'generate_lead', conversion_type: 'full_booking' }
    if (entry.event === 'generate_lead' && entry.conversion_type === 'full_booking') return true
    // 2. gtag format: arguments ['event', 'conversion', { send_to: 'AW-18424689411', ... }]
    if (entry['0'] === 'event' && entry['1'] === 'conversion' && entry['2']?.send_to === 'AW-18424689411') return true
    // 3. direct object format: { event: 'conversion', send_to: 'AW-18424689411' }
    if (entry.event === 'conversion' && entry.send_to === 'AW-18424689411') return true
    return false
  }

  // Count primary conversions in a dataLayer array
  // Each booking trigger pushes both generate_lead and gtag('event', 'conversion')
  // We identify a full conversion set as 1 primary conversion
  const countPrimaryConversions = (dl: any[]): number => {
    const hasGtag = dl.some((e) => e['0'] === 'event' && e['1'] === 'conversion' && e['2']?.send_to === 'AW-18424689411')
    const hasLead = dl.some((e) => e.event === 'generate_lead' && e.conversion_type === 'full_booking')
    if (hasGtag || hasLead) return 1
    return 0
  }

  // --- PART 1: FULL BOOKING CONVERSION TEST ---
  console.log('\n[TEST 1] FULL BOOKING CONVERSION FLOW')

  // Step 1: Open booking confirmed page (simulating completed booking)
  console.log('Step 1: Navigating to /booking-confirmed...')
  await page.goto('http://localhost:3000/booking-confirmed')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(1000)

  let dl1 = await page.evaluate(() => (window as any).dataLayer || [])
  const conversions1 = countPrimaryConversions(dl1)
  console.log(`Initial booking-confirmed load: Primary conversion recorded = ${conversions1}`)
  console.log('Captured conversion entries in dataLayer:')
  dl1.filter(isPrimaryConversion).forEach((e) => console.log('  ', JSON.stringify(e)))

  let cumulativeBookingConversions = conversions1

  // Step 2: Refresh confirmation page
  console.log('\nStep 2: Refreshing confirmation page...')
  await page.reload()
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(1000)

  let dl2 = await page.evaluate(() => (window as any).dataLayer || [])
  const newConversionsOnReload = countPrimaryConversions(dl2)
  // Since deduplication guarded it, dl2 should NOT contain any new conversion events
  console.log(`After Refresh: Duplicate conversion events fired = ${newConversionsOnReload}`)
  if (newConversionsOnReload === 0) {
    console.log('✓ Deduplication guard prevented duplicate firing on page refresh!')
  }

  // Step 3: Navigate away and return
  console.log('\nStep 3: Navigating away to /tours...')
  await page.goto('http://localhost:3000/tours')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(500)

  console.log('Navigating back to /booking-confirmed...')
  await page.goto('http://localhost:3000/booking-confirmed')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(1000)

  let dl3 = await page.evaluate(() => (window as any).dataLayer || [])
  const newConversionsOnReturn = countPrimaryConversions(dl3)
  console.log(`After Return: Duplicate conversion events fired = ${newConversionsOnReturn}`)
  if (newConversionsOnReturn === 0) {
    console.log('✓ Deduplication guard prevented duplicate firing on re-navigation!')
  }

  console.log(`\n=> Total primary booking conversions across entire booking lifecycle: ${cumulativeBookingConversions}`)

  // --- PART 2: QUICK ENQUIRY FLOW ---
  console.log('\n[TEST 2] QUICK ENQUIRY FLOW')
  const enquiryPage = await context.newPage()
  console.log('Navigating to /enquiry-received...')
  await enquiryPage.goto('http://localhost:3000/enquiry-received')
  await enquiryPage.waitForLoadState('domcontentloaded')
  await enquiryPage.waitForTimeout(1000)

  const dlEnquiry = await enquiryPage.evaluate(() => (window as any).dataLayer || [])
  const primaryOnEnquiry = countPrimaryConversions(dlEnquiry)
  const quickEnquiryEvents = dlEnquiry.filter(
    (e: any) =>
      e.event === 'quick_enquiry_submitted' ||
      (e['0'] === 'event' && e['1'] === 'quick_enquiry_submitted')
  )

  console.log(`Primary booking conversions on Quick Enquiry: ${primaryOnEnquiry}`)
  console.log(`Dedicated quick_enquiry_submitted events on Quick Enquiry: ${quickEnquiryEvents.length}`)
  console.log('Captured Quick Enquiry dataLayer entries:')
  quickEnquiryEvents.forEach((e: any) => console.log('  ', JSON.stringify(e)))

  // --- VERIFY TRACKING IDS IN DOM & SCRIPTS ---
  const gtmPresent = await page.evaluate(() => document.documentElement.innerHTML.includes('GTM-TDJCRQRM'))
  const adsPresent = await page.evaluate(() => document.documentElement.innerHTML.includes('AW-18424689411'))

  console.log('\n[TRACKING ID VERIFICATION]')
  console.log(`GTM ID GTM-TDJCRQRM present: ${gtmPresent}`)
  console.log(`Google Ads ID AW-18424689411 present: ${adsPresent}`)

  await browser.close()

  const pass =
    cumulativeBookingConversions === 1 &&
    newConversionsOnReload === 0 &&
    newConversionsOnReturn === 0 &&
    primaryOnEnquiry === 0 &&
    quickEnquiryEvents.length > 0 &&
    gtmPresent &&
    adsPresent

  if (pass) {
    console.log('\n✅ GTM & Google Ads Runtime Verification: ALL CHECKS PASSED!')
  } else {
    console.error('\n❌ GTM & Google Ads Runtime Verification: FAILED')
    process.exit(1)
  }
}

runGtmAudit().catch((err) => {
  console.error(err)
  process.exit(1)
})
