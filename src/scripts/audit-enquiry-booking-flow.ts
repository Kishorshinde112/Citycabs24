import { chromium } from 'playwright'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function runEnquiryBookingAudit() {
  console.log('====================================================')
  console.log('PART 5: BOOKING & ENQUIRY FUNCTIONAL FLOWS AUDIT')
  console.log('====================================================\n')

  let allPassed = true
  const browser = await chromium.launch({ headless: true })

  try {
    // ----------------------------------------------------
    // TEST 1: Auto Enquiry 5-Second Popup Test
    // ----------------------------------------------------
    console.log('--- 1. Testing 5-Second Automatic Enquiry Popup ---')
    const autoContext = await browser.newContext()
    const autoPage = await autoContext.newPage()

    await autoPage.goto('http://localhost:3000/')
    console.log('  Loaded homepage in fresh session. Waiting 6 seconds...')
    await autoPage.waitForTimeout(6000)

    const popupVisible = await autoPage.isVisible('#auto-enquiry-modal')
    if (popupVisible) {
      console.log('  ✓ 5-second auto enquiry popup appeared automatically!')
    } else {
      console.error('  ✗ Auto enquiry popup did not appear after 6 seconds')
      allPassed = false
    }

    // Test reload in same session: must not reopen
    console.log('  Reloading page in same session (testing suppress on repeat load)...')
    await autoPage.reload()
    await autoPage.waitForTimeout(6000)
    const popupVisibleOnReload = await autoPage.isVisible('#auto-enquiry-modal')
    if (!popupVisibleOnReload) {
      console.log('  ✓ Auto popup correctly suppressed on reload within same session!')
    } else {
      console.error('  ✗ Auto popup reopened on reload in same session')
      allPassed = false
    }
    await autoContext.close()

    // ----------------------------------------------------
    // TEST 2: Side "INQUIRE NOW" Button Opens Enquiry Modal
    // ----------------------------------------------------
    console.log('\n--- 2. Testing Side "INQUIRE NOW" Button Target ---')
    const sidePage = await browser.newPage()
    await sidePage.goto('http://localhost:3000/')
    await sidePage.waitForLoadState('networkidle')

    const inquireNowBtn = await sidePage.$('button:has-text("INQUIRE NOW")')
    if (inquireNowBtn) {
      await inquireNowBtn.click()
      await sidePage.waitForTimeout(1000)

      const isEnquiryModalOpen = await sidePage.isVisible('#auto-enquiry-modal')
      const isBookingModalOpen = await sidePage.isVisible('#quick-book-modal')

      console.log(`  Enquiry modal visible: ${isEnquiryModalOpen}, Booking modal visible: ${isBookingModalOpen}`)
      if (isEnquiryModalOpen && !isBookingModalOpen) {
        console.log('  ✓ "INQUIRE NOW" opens Enquiry modal, NOT Booking modal!')
      } else {
        console.error('  ✗ "INQUIRE NOW" opened wrong modal!')
        allPassed = false
      }
    } else {
      console.error('  ✗ INQUIRE NOW button not found on page')
      allPassed = false
    }
    await sidePage.close()

    // ----------------------------------------------------
    // TEST 3: Submit Live Quick Enquiry End-to-End
    // ----------------------------------------------------
    console.log('\n--- 3. Testing Live Quick Enquiry Submission ---')
    const eqPage = await browser.newPage()
    await eqPage.goto('http://localhost:3000/')
    await eqPage.waitForLoadState('networkidle')

    // Open enquiry modal
    await eqPage.click('button:has-text("INQUIRE NOW")')
    await eqPage.waitForSelector('#auto-enquiry-modal', { state: 'visible' })

    const testEqName = 'Audit Quick Enquiry User'
    const testEqPhone = '9833309061'

    await eqPage.fill('#ae-name', testEqName)
    await eqPage.fill('#ae-phone', testEqPhone)
    await eqPage.click('#auto-enquiry-modal button[type="submit"]')

    // Should redirect to /enquiry-received
    await eqPage.waitForURL('**/enquiry-received**', { timeout: 10000 })
    console.log(`  ✓ Successfully navigated to: ${eqPage.url()}`)

    // Verify in database
    const payload = await getPayload({ config: configPromise })
    const createdEq = await payload.find({
      collection: 'bookings',
      where: {
        name: { equals: testEqName },
      },
      sort: '-createdAt',
      limit: 1,
    })

    if (createdEq.docs.length > 0 && createdEq.docs[0].leadType === 'quick_enquiry') {
      console.log(`  ✓ Lead record verified in database with leadType="quick_enquiry" (ID: #${createdEq.docs[0].id})`)
      // Clean up test lead
      await payload.delete({ collection: 'bookings', id: createdEq.docs[0].id })
    } else {
      console.error('  ✗ Quick enquiry record not found or wrong leadType')
      allPassed = false
    }
    await eqPage.close()

  } finally {
    await browser.close()
  }

  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> ENQUIRY & BOOKING FLOW AUDIT: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> ENQUIRY & BOOKING FLOW AUDIT: ONE OR MORE TESTS FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runEnquiryBookingAudit().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
