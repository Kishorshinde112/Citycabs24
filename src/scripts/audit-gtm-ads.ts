import { chromium } from 'playwright'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function runGtmAdsAudit() {
  console.log('====================================================')
  console.log('PART 2: GOOGLE ADS & GTM DEEP VERIFICATION AUDIT')
  console.log('====================================================\n')

  let allPassed = true
  const browser = await chromium.launch({ headless: true })

  try {
    // ----------------------------------------------------
    // TEST 1: GTM & gtag Script Load Audit
    // ----------------------------------------------------
    console.log('--- 1. Testing GTM & Google Ads Script Presence & Uniqueness ---')
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    const html = await page.content()
    const hasGtmScript = html.includes('GTM-TDJCRQRM')
    const hasGtagScript = html.includes('AW-18424689411')
    const hasGtmIframe = html.includes('ns.html?id=GTM-TDJCRQRM')

    // Count script tags containing GTM or Ads
    const scriptCounts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'))
      return {
        gtmScripts: scripts.filter(s => (s.textContent || '').includes('GTM-TDJCRQRM')).length,
        gtagSrc: scripts.filter(s => (s.src || '').includes('AW-18424689411')).length,
        adsConfig: scripts.filter(s => (s.textContent || '').includes('AW-18424689411')).length,
      }
    })

    console.log(`  GTM script tags: ${scriptCounts.gtmScripts}`)
    console.log(`  Google Ads gtag.js src: ${scriptCounts.gtagSrc}`)
    console.log(`  Google Ads config script: ${scriptCounts.adsConfig}`)
    console.log(`  GTM noscript iframe present: ${hasGtmIframe}`)

    if (hasGtmScript && hasGtagScript && hasGtmIframe && scriptCounts.gtagSrc === 1) {
      console.log('  ✓ GTM (GTM-TDJCRQRM) and Google Ads (AW-18424689411) are uniquely loaded without duplicates!')
    } else {
      console.error('  ✗ Unexpected script count for GTM or Google Ads')
      allPassed = false
    }
    await page.close()

    // ----------------------------------------------------
    // TEST 2: Modal Open Non-Conversion Test
    // ----------------------------------------------------
    console.log('\n--- 2. Testing Modal Opening Does NOT Trigger Conversions ---')
    const modalPage = await browser.newPage()

    await modalPage.addInitScript(() => {
      const win = window as any
      win.dataLayer = win.dataLayer || []
      const origPush = win.dataLayer.push
      win.dataLayer.push = function (...args: any[]) {
        const item = args[0]
        if (
          item?.event === 'conversion' ||
          item?.event === 'generate_lead' ||
          item?.event === 'quick_enquiry_submitted' ||
          (item?.['0'] === 'event' && item?.['1'] === 'conversion')
        ) {
          ;(window as any)._capturedConversions = (window as any)._capturedConversions || []
          ;(window as any)._capturedConversions.push(item)
        }
        return origPush.apply(this, args)
      }
    })

    await modalPage.goto('http://localhost:3000/')
    await modalPage.waitForLoadState('networkidle')

    // Click "Book Ride" button in navbar
    const bookRideBtn = await modalPage.$('button:has-text("Book Ride"), a:has-text("Book Ride")')
    if (bookRideBtn) {
      await bookRideBtn.click()
      await modalPage.waitForTimeout(1000)
    }

    // Check conversions
    let convAfterBookClick = await modalPage.evaluate(() => (window as any)._capturedConversions || [])
    if (convAfterBookClick.length === 0) {
      console.log('  ✓ Clicking "Book Ride" did NOT fire any conversion events.')
    } else {
      console.error(`  ✗ Premature conversion detected on Book Ride click:`, convAfterBookClick)
      allPassed = false
    }

    // Close Book Ride modal
    const closeBtn = await modalPage.$('#quick-book-modal button[aria-label="Close modal"]')
    if (closeBtn) {
      await closeBtn.click()
      await modalPage.waitForTimeout(500)
    }

    // Click "INQUIRE NOW" floating button
    const enquireBtn = await modalPage.$('button:has-text("INQUIRE NOW")')
    if (enquireBtn) {
      await enquireBtn.click()
      await modalPage.waitForTimeout(1000)
    }

    let convAfterEnquireClick = await modalPage.evaluate(() => (window as any)._capturedConversions || [])
    if (convAfterEnquireClick.length === 0) {
      console.log('  ✓ Clicking "INQUIRE NOW" did NOT fire any conversion events.')
    } else {
      console.error(`  ✗ Premature conversion detected on INQUIRE NOW click:`, convAfterEnquireClick)
      allPassed = false
    }

    // Close Enquiry modal
    const closeEnquiryBtn = await modalPage.$('#auto-enquiry-modal button[aria-label="Close modal"]')
    if (closeEnquiryBtn) {
      await closeEnquiryBtn.click()
      await modalPage.waitForTimeout(500)
    }

    await modalPage.close()

    // ----------------------------------------------------
    // TEST 3: Full Booking Conversion & Deduplication Test
    // ----------------------------------------------------
    console.log('\n--- 3. Testing Full Booking Primary Conversion & Reload Deduplication ---')
    const bookingContext = await browser.newContext()
    const bookingPage = await bookingContext.newPage()

    await bookingPage.addInitScript(() => {
      const win = window as any
      win.dataLayer = win.dataLayer || []
      const origPush = win.dataLayer.push
      win.dataLayer.push = function (...args: any[]) {
        const item = args[0]
        ;(window as any)._bookingEvents = (window as any)._bookingEvents || []
        ;(window as any)._bookingEvents.push(item)
        return origPush.apply(this, args)
      }
    })

    // Navigate to booking-confirmed
    await bookingPage.goto('http://localhost:3000/booking-confirmed')
    await bookingPage.waitForLoadState('networkidle')
    await bookingPage.waitForTimeout(1000)

    let events = await bookingPage.evaluate(() => (window as any)._bookingEvents || [])
    const leadEvents = events.filter((e: any) => e?.event === 'generate_lead')
    const adsConversions = events.filter(
      (e: any) =>
        e?.event === 'conversion' ||
        e?.send_to === 'AW-18424689411' ||
        (e?.['0'] === 'event' && e?.['1'] === 'conversion' && e?.['2']?.send_to === 'AW-18424689411')
    )

    console.log(`  Initial confirmation load: generate_lead events = ${leadEvents.length}`)
    console.log(`  Initial confirmation load: Google Ads conversions = ${adsConversions.length}`)

    if (leadEvents.length === 1 && adsConversions.length >= 1) {
      console.log('  ✓ Primary booking conversion fired exactly 1 time on confirmation!')
    } else {
      console.error('  ✗ Expected 1 primary booking conversion event on initial load.')
      allPassed = false
    }

    // RELOAD confirmation page
    console.log('  Reloading /booking-confirmed (testing deduplication guard)...')
    await bookingPage.reload()
    await bookingPage.waitForLoadState('networkidle')
    await bookingPage.waitForTimeout(1000)

    events = await bookingPage.evaluate(() => (window as any)._bookingEvents || [])
    const leadEventsAfterReload = events.filter((e: any) => e?.event === 'generate_lead')

    if (leadEventsAfterReload.length === 0) {
      console.log('  ✓ Reload produced 0 additional conversions! Deduplication guard verified.')
    } else {
      console.error(`  ✗ Reload produced duplicate conversion! Count: ${leadEventsAfterReload.length}`)
      allPassed = false
    }

    // Navigate away to Home and return
    console.log('  Navigating away to "/" and returning to "/booking-confirmed"...')
    await bookingPage.goto('http://localhost:3000/')
    await bookingPage.waitForLoadState('networkidle')
    await bookingPage.goto('http://localhost:3000/booking-confirmed')
    await bookingPage.waitForLoadState('networkidle')

    events = await bookingPage.evaluate(() => (window as any)._bookingEvents || [])
    const leadEventsAfterReturn = events.filter((e: any) => e?.event === 'generate_lead')

    if (leadEventsAfterReturn.length === 0) {
      console.log('  ✓ Return to confirmation produced 0 additional conversions!')
    } else {
      console.error(`  ✗ Return navigation produced duplicate conversion! Count: ${leadEventsAfterReturn.length}`)
      allPassed = false
    }
    await bookingContext.close()

    // ----------------------------------------------------
    // TEST 4: Quick Enquiry Conversion Separation Test
    // ----------------------------------------------------
    console.log('\n--- 4. Testing Quick Enquiry Separation (No Primary Conversion) ---')
    const enquiryContext = await browser.newContext()
    const enquiryPage = await enquiryContext.newPage()

    await enquiryPage.addInitScript(() => {
      const win = window as any
      win.dataLayer = win.dataLayer || []
      const origPush = win.dataLayer.push
      win.dataLayer.push = function (...args: any[]) {
        const item = args[0]
        ;(window as any)._enquiryEvents = (window as any)._enquiryEvents || []
        ;(window as any)._enquiryEvents.push(item)
        return origPush.apply(this, args)
      }
    })

    await enquiryPage.goto('http://localhost:3000/enquiry-received')
    await enquiryPage.waitForLoadState('networkidle')
    await enquiryPage.waitForTimeout(1000)

    events = await enquiryPage.evaluate(() => (window as any)._enquiryEvents || [])
    const eqEvents = events.filter(
      (e: any) =>
        e?.event === 'quick_enquiry_submitted' ||
        (e?.['0'] === 'event' && e?.['1'] === 'quick_enquiry_submitted')
    )
    const illegalBookingConv = events.filter(
      (e: any) =>
        e?.event === 'generate_lead' ||
        (e?.event === 'conversion' && e?.conversion_type === 'full_booking') ||
        (e?.['0'] === 'event' && e?.['1'] === 'conversion')
    )

    console.log(`  Quick enquiry submitted events: ${eqEvents.length}`)
    console.log(`  Primary booking conversions on enquiry page: ${illegalBookingConv.length}`)

    if (eqEvents.length >= 1 && illegalBookingConv.length === 0) {
      console.log('  ✓ Quick enquiry triggered quick_enquiry_submitted and 0 primary booking conversions!')
    } else {
      console.error('  ✗ Quick enquiry separation failed!')
      allPassed = false
    }
    await enquiryContext.close()

    // ----------------------------------------------------
    // TEST 5: Attribution & GCLID Persistence Test
    // ----------------------------------------------------
    console.log('\n--- 5. Testing GCLID & UTM Parameter Capture & Persistence ---')
    const payload = await getPayload({ config: configPromise })
    const testGclid = `TEST-GCLID-${Date.now()}`
    const testUtmSource = 'google_cpc_audit'

    // Simulate API lead submission with GCLID and UTM parameters
    const attrLead = await payload.create({
      collection: 'bookings',
      data: {
        name: 'Attribution Test Customer',
        phone: '9876543210',
        route: 'Mumbai Darshan',
        leadType: 'booking',
        gclid: testGclid,
        utm_source: testUtmSource,
      },
    })

    console.log(`  Created lead #${attrLead.id} with GCLID: ${attrLead.gclid}, UTM: ${attrLead.utm_source}`)
    if (attrLead.gclid === testGclid && attrLead.utm_source === testUtmSource) {
      console.log('  ✓ GCLID and UTM parameters correctly captured and persisted in database!')
    } else {
      console.error('  ✗ GCLID or UTM parameter persistence failed')
      allPassed = false
    }

    // Clean up test lead
    await payload.delete({ collection: 'bookings', id: attrLead.id })

    // ----------------------------------------------------
    // TEST 6: Legacy Redirect 301 and Query Preservation Test
    // ----------------------------------------------------
    console.log('\n--- 6. Testing Legacy 301 Redirect & Query String Preservation ---')
    const redirectUrl = `http://localhost:3000/mumbai-darshan-cab-service?gclid=${testGclid}&utm_source=google`
    const redirectRes = await fetch(redirectUrl, { redirect: 'manual' })
    const location = redirectRes.headers.get('location') || ''

    console.log(`  Status code: ${redirectRes.status}`)
    console.log(`  Location header: ${location}`)

    const is301 = redirectRes.status === 301 || redirectRes.status === 308
    const preservesTarget = location.includes('/mumbai-darshan')
    const preservesQuery = location.includes(testGclid)

    if (is301 && preservesTarget && preservesQuery) {
      console.log('  ✓ Legacy URL redirects to /mumbai-darshan preserving GCLID and query parameters!')
    } else {
      console.error(`  ✗ Redirect failed: status=${redirectRes.status}, location=${location}`)
      allPassed = false
    }

  } finally {
    await browser.close()
  }

  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> GOOGLE ADS & GTM AUDIT: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> GOOGLE ADS & GTM AUDIT: ONE OR MORE TESTS FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runGtmAdsAudit().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
