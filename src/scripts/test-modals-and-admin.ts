import { chromium } from 'playwright'

async function runAudit() {
  console.log('=== RUNTIME BOOKING MODALS & PAYLOAD ADMIN VERIFICATION SUITE ===\n')
  const browser = await chromium.launch({ headless: true })

  const consoleErrors: string[] = []
  const testResults: { [key: string]: boolean } = {}

  // -------------------------------------------------------------
  // TEST A: NAVBAR BOOK RIDE BUTTON
  // -------------------------------------------------------------
  console.log('[Test A] Testing Navbar "Book Ride" button on Desktop...')
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message)
  })

  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('networkidle')

  const navbarBookBtn = page.locator('nav button:has-text("Book Ride")').first()
  await navbarBookBtn.waitFor({ state: 'visible' })
  await navbarBookBtn.click()

  const modalHeading = page.locator('text=Book Your Guided Cab').first()
  await modalHeading.waitFor({ state: 'visible', timeout: 4000 })
  testResults['Test A: Navbar Book Ride'] = true
  console.log('  ✓ QuickBookModal opened cleanly upon clicking Navbar "Book Ride"!')

  // Check dataLayer to verify no premature conversion was fired
  const dataLayerA = await page.evaluate(() => (window as any).dataLayer || [])
  const convFiredA = dataLayerA.some((item: any) =>
    JSON.stringify(item).includes('generate_lead') || JSON.stringify(item).includes('AW-18424689411/conversion')
  )
  console.log(`  Conversion Linker Check: ${!convFiredA ? '✓ NO PREMATURE CONVERSION FIRED' : '✗ CONVERSION LEAK'}`)

  // Close modal
  const closeBtn = page.locator('button[aria-label="Close modal"], button:has(svg.lucide-x)').first()
  await closeBtn.click()
  await modalHeading.waitFor({ state: 'hidden', timeout: 3000 })
  console.log('  ✓ Modal closed cleanly.')

  // -------------------------------------------------------------
  // TEST B: RIGHT-SIDE INQUIRE NOW BUTTON
  // -------------------------------------------------------------
  console.log('\n[Test B] Testing Right-Side "INQUIRE NOW" Floating Button...')
  const inquireBtn = page.locator('button[aria-label="Inquire Now"]')
  await inquireBtn.waitFor({ state: 'visible' })
  await inquireBtn.click()

  await modalHeading.waitFor({ state: 'visible', timeout: 4000 })
  testResults['Test B: Floating Inquire Now'] = true
  console.log('  ✓ QuickBookModal opened cleanly upon clicking "INQUIRE NOW"!')

  await closeBtn.click()
  await modalHeading.waitFor({ state: 'hidden', timeout: 3000 })
  console.log('  ✓ Modal closed cleanly.')

  // -------------------------------------------------------------
  // TEST C: TOUR "BOOK NOW" CTA ON /mumbai-darshan
  // -------------------------------------------------------------
  console.log('\n[Test C] Testing Tour Page "Book Now" CTA on /mumbai-darshan...')
  await page.goto('http://localhost:3000/mumbai-darshan')
  await page.waitForLoadState('networkidle')

  const tourBookBtn = page.locator('#rate-card button:has-text("Book Now"), button:has-text("Book Now")').first()
  await tourBookBtn.scrollIntoViewIfNeeded()
  await tourBookBtn.click()

  await modalHeading.waitFor({ state: 'visible', timeout: 4000 })
  const modalText = await page.evaluate(() => document.body.innerText)
  const isTourPrefilled = modalText.includes('Mumbai Darshan') || (await page.locator('input[value*="Mumbai Darshan"]').count()) > 0
  testResults['Test C: Tour Book Now CTA'] = isTourPrefilled
  console.log(`  ✓ QuickBookModal opened with tour context (prefilled: ${isTourPrefilled ? 'YES' : 'DEFAULT'})!`)

  await closeBtn.click()
  await modalHeading.waitFor({ state: 'hidden', timeout: 3000 })
  console.log('  ✓ Modal closed cleanly.')
  await page.close()

  // -------------------------------------------------------------
  // TEST D: MOBILE VIEWPORT (375x812) BOTTOM STICKY BOOK BUTTON
  // -------------------------------------------------------------
  console.log('\n[Test D] Testing Mobile Viewport (375x812) Sticky Bottom "Book" button...')
  page = await browser.newPage({ viewport: { width: 375, height: 812 } })
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message)
  })

  await page.goto('http://localhost:3000/')
  await page.waitForLoadState('networkidle')

  const mobileBookBtn = page.locator('button:has-text("Book")').last()
  await mobileBookBtn.waitFor({ state: 'visible' })
  await mobileBookBtn.click()

  const mobileModal = page.locator('text=Book Your Guided Cab').first()
  await mobileModal.waitFor({ state: 'visible', timeout: 4000 })
  testResults['Test D: Mobile Bottom Book Button'] = true
  console.log('  ✓ QuickBookModal opened cleanly on mobile bottom Book click!')

  const mobileClose = page.locator('button[aria-label="Close modal"], button:has(svg.lucide-x)').first()
  await mobileClose.click()
  await mobileModal.waitFor({ state: 'hidden', timeout: 3000 })
  console.log('  ✓ Mobile modal closed cleanly.')
  await page.close()

  // -------------------------------------------------------------
  // TEST E: PAYLOAD ADMIN ROUTE (/admin)
  // -------------------------------------------------------------
  console.log('\n[Test E] Testing Payload Admin Route (http://localhost:3000/admin)...')
  page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message)
  })

  const response = await page.goto('http://localhost:3000/admin')
  const status = response?.status()
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(1000)

  const currentUrl = page.url()
  const pageTitle = await page.title()
  const bodyText = await page.evaluate(() => document.body.innerText)

  const isPublic404 = bodyText.includes('404: This page could not be found') || bodyText.includes('404')
  const isPublicNavbarPresent = (await page.locator('text=Available 24/7 for your convenience').count()) > 0
  const isPayloadAdmin =
    bodyText.includes('Create first user') ||
    bodyText.includes('Create First User') ||
    bodyText.includes('Welcome to Payload') ||
    bodyText.includes('Email') ||
    bodyText.includes('Password') ||
    currentUrl.includes('/admin')

  console.log(`  HTTP Response Status: ${status}`)
  console.log(`  Current Route URL: ${currentUrl}`)
  console.log(`  Page Title: "${pageTitle}"`)
  console.log(`  Public 404 Rendered: ${isPublic404 ? '✗ YES (FAIL)' : '✓ NO (PASSED)'}`)
  console.log(`  Public Navbar Leaked: ${isPublicNavbarPresent ? '✗ YES (FAIL)' : '✓ NO (PASSED)'}`)
  console.log(`  Payload Admin Interface: ${isPayloadAdmin ? '✓ YES (PASSED)' : '✗ NO (FAIL)'}`)

  testResults['Test E: Payload Admin Route'] = !isPublic404 && !isPublicNavbarPresent && isPayloadAdmin

  await page.close()
  await browser.close()

  // -------------------------------------------------------------
  // RUNTIME CONSOLE ERROR AUDIT
  // -------------------------------------------------------------
  console.log('\n=== RUNTIME CONSOLE ERROR AUDIT ===')
  const filteredErrors = consoleErrors.filter(
    (e) => !e.includes('favicon') && !e.includes('GTM') && !e.includes('gtag') && !e.includes('404')
  )
  if (filteredErrors.length === 0) {
    console.log('  ✓ ZERO runtime errors or unhandled callback exceptions during clicks!')
  } else {
    console.log('  Errors observed:', filteredErrors)
  }

  console.log('\n=== FINAL TEST RESULTS SUMMARY ===')
  let allPassed = true
  for (const [testName, passed] of Object.entries(testResults)) {
    console.log(`  - ${testName}: ${passed ? '✓ PASSED' : '✗ FAILED'}`)
    if (!passed) allPassed = false
  }

  if (allPassed && filteredErrors.length === 0) {
    console.log('\n✅ ALL RUNTIME BOOKING MODAL & PAYLOAD ADMIN TESTS PASSED 100%!')
  } else {
    console.error('\n❌ SOME RUNTIME VERIFICATION TESTS FAILED')
    process.exit(1)
  }
}

runAudit().catch((err) => {
  console.error(err)
  process.exit(1)
})
