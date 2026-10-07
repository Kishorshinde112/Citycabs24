import { chromium } from 'playwright'

async function testSessionExpiredRecovery() {
  console.log('=== TESTING REALISTIC SESSION EXPIRATION & RECOVERY ===\n')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  try {
    // 1. Initial Login
    console.log('1. Logging in as admin initially...')
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' })

    const emailInput = page.locator('input[type="email"], input[name="email"]')
    const passwordInput = page.locator('input[type="password"], input[name="password"]')

    if (await emailInput.isVisible()) {
      await emailInput.fill('mumbaicitycabs24@gmail.com')
      await passwordInput.fill('Shahrukh@123')
      await page.locator('button[type="submit"]').click()
      await page.waitForURL('**/admin', { timeout: 15000 })
      console.log('✓ Admin login successful.')
    }
    await page.waitForTimeout(1500)

    // 2. Open Tour 1
    console.log('2. Opening /admin/collections/tours/1...')
    await page.goto('http://localhost:3000/admin/collections/tours/1', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    // Verify user badge in header
    const userBadge = page.locator('text=Shahrukh').first()
    console.log('Is user badge visible?', await userBadge.isVisible())

    // 3. SIMULATE SESSION EXPIRATION WHILE ON THE PAGE
    console.log('3. Simulating session expiration (clearing cookies and localStorage token)...')
    await context.clearCookies()
    await page.evaluate(() => {
      localStorage.removeItem('payload-token')
      localStorage.removeItem('adminToken')
    })

    // 4. Edit Display Order to 11
    console.log('4. Making edit: changing Display Order 1 -> 11...')
    const orderInput = page.locator('input[type="number"]').first()
    await orderInput.fill('11')
    await page.waitForTimeout(500)

    // Verify unsaved changes badge is active
    const isDirty = await page.locator('text=Unsaved Changes').first().isVisible()
    console.log('Is "Unsaved Changes" badge active?', isDirty)

    // 5. Click Save Changes (session is now expired!)
    console.log('5. Clicking Save Changes with expired session...')
    const saveBtn = page.locator('button:has-text("Save Changes")').first()
    await saveBtn.click()
    await page.waitForTimeout(2000)

    // 6. Verify In-Place Auth Modal popped up!
    const modal = page.locator('text=Admin Authentication').first()
    const isModalVisible = await modal.isVisible()
    console.log(`Did the In-Place Auth Modal appear? ${isModalVisible}`)

    if (!isModalVisible) {
      throw new Error('In-place auth modal did NOT pop up on 401/403!')
    }

    // Verify form input STILL has 11 (ZERO DATA LOSS!)
    const preservedVal = await orderInput.inputValue()
    console.log(`Verified preserved form value: "${preservedVal}"`)
    if (preservedVal !== '11') {
      throw new Error(`Data loss! Expected 11, found ${preservedVal}`)
    }

    // 7. Enter password in modal and click "Log In & Save Changes"
    console.log('7. Re-authenticating in modal with Shahrukh@123...')
    const passwordField = page.locator('input[type="password"]').last()
    await passwordField.fill('Shahrukh@123')
    await page.waitForTimeout(300)

    console.log('Submitting in-place authentication...')
    await page.locator('button:has-text("Log In & Save Changes")').click()
    await page.waitForTimeout(3500)

    // 8. Confirm modal closed and save succeeded
    const isModalOpen = await modal.isVisible()
    console.log(`Is modal closed? ${!isModalOpen}`)

    // 9. Reload page to verify Display Order 11 was persisted into SQLite!
    console.log('9. Reloading page fresh to verify database persistence...')
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const reloadedVal = await page.locator('input[type="number"]').first().inputValue()
    console.log(`Reloaded Display Order value: "${reloadedVal}"`)

    if (reloadedVal !== '11') {
      throw new Error(`Expected Display Order 11 in database, got ${reloadedVal}`)
    }

    // 10. Restore back to 1
    console.log('10. Cleanly restoring Display Order back to 1...')
    await page.locator('input[type="number"]').first().fill('1')
    await page.waitForTimeout(300)
    await page.locator('button:has-text("Save Changes")').first().click()
    await page.waitForTimeout(2500)

    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    const finalVal = await page.locator('input[type="number"]').first().inputValue()
    console.log(`Final restored Display Order value: "${finalVal}"`)

    if (finalVal !== '1') {
      throw new Error(`Expected restored value 1, got ${finalVal}`)
    }

    console.log('\n🎉 SESSION EXPIRATION RECOVERY VERIFIED WITH 100% SUCCESS!')
  } catch (err) {
    console.error('❌ Test failed:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

testSessionExpiredRecovery()
