import { chromium } from 'playwright'

async function testInPlaceAuth() {
  console.log('=== VERIFYING IN-PLACE RE-AUTHENTICATION & SAVE RECOVERY ===\n')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // Start with completely CLEAN context (no cookies, no storage)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  try {
    // 1. Visit Tour 1 directly without logging in
    console.log('1. Navigating to /admin/collections/tours/1 WITHOUT prior login...')
    await page.goto('http://localhost:3000/admin/collections/tours/1', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    // Check header auth indicator
    const loginIndicator = page.locator('text=Log In to Save').first()
    const isLoginIndicatorVisible = await loginIndicator.isVisible()
    console.log(`Is 'Log In to Save' indicator visible in header? ${isLoginIndicatorVisible}`)

    // 2. Edit Display Order from 1 to 11
    console.log('2. Editing Display Order: 1 -> 11...')
    const orderInput = page.locator('input[type="number"]').first()
    await orderInput.fill('11')
    await page.waitForTimeout(500)

    // 3. Click Save Changes (while unauthenticated)
    console.log('3. Clicking Save Changes...')
    const saveBtn = page.locator('button:has-text("Save Changes")').first()
    await saveBtn.click()
    await page.waitForTimeout(1500)

    // 4. Verify in-place re-auth modal popped up
    const modal = page.locator('text=Admin Authentication').first()
    const isModalVisible = await modal.isVisible()
    console.log(`Did the In-Place Auth Modal pop up? ${isModalVisible}`)

    if (!isModalVisible) {
      throw new Error('Expected In-Place Auth Modal to open on 401/403!')
    }

    // Verify unsaved data is STILL preserved in the input behind modal
    const preservedVal = await orderInput.inputValue()
    console.log(`Preserved Display Order input value in form: "${preservedVal}"`)
    if (preservedVal !== '11') {
      throw new Error(`Data loss detected! Expected 11, found ${preservedVal}`)
    }

    // 5. Fill credentials in modal and submit
    console.log('5. Entering credentials in modal (mumbaicitycabs24@gmail.com / Shahrukh@123)...')
    const emailField = page.locator('input[type="email"]').last()
    const passwordField = page.locator('input[type="password"]').last()

    await emailField.fill('mumbaicitycabs24@gmail.com')
    await passwordField.fill('Shahrukh@123')
    await page.waitForTimeout(300)

    console.log('Clicking "Log In & Save Changes" in modal...')
    await page.locator('button:has-text("Log In & Save Changes")').click()
    await page.waitForTimeout(3500)

    // Verify modal closed and save completed
    const modalClosed = !(await modal.isVisible())
    console.log(`Modal closed after login? ${modalClosed}`)

    // Check if error is gone
    const errorAlert = await page.locator('.bg-rose-50').isVisible()
    console.log(`Is error alert visible? ${errorAlert}`)

    // 6. Reload page fresh to verify Display Order 11 is persisted
    console.log('6. Reloading page fresh to verify database persistence...')
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const reloadedVal = await page.locator('input[type="number"]').first().inputValue()
    console.log(`Reloaded Display Order value: "${reloadedVal}"`)

    if (reloadedVal !== '11') {
      throw new Error(`Expected Display Order 11 after reload, got ${reloadedVal}`)
    }

    // 7. Cleanly restore Display Order back to 1
    console.log('7. Restoring Display Order back to 1...')
    await page.locator('input[type="number"]').first().fill('1')
    await page.waitForTimeout(300)
    await page.locator('button:has-text("Save Changes")').first().click()
    await page.waitForTimeout(2500)

    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    const finalVal = await page.locator('input[type="number"]').first().inputValue()
    console.log(`Final restored Display Order value: "${finalVal}"`)

    if (finalVal !== '1') {
      throw new Error(`Expected restored Display Order 1, got ${finalVal}`)
    }

    console.log('\n🎉 IN-PLACE AUTH & RECOVERY VERIFICATION 100% SUCCESSFUL!')
  } catch (err) {
    console.error('❌ Test failed:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

testInPlaceAuth()
