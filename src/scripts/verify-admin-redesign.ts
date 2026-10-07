import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function runVerification() {
  console.log('=== STARTING PLAYWRIGHT VERIFICATION FOR ADMIN REDESIGN ===')

  const screenshotDir = path.resolve(process.cwd(), 'admin-screenshots')
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })

  const page = await context.newPage()

  try {
    // 1. Login
    console.log('1. Navigating to /admin/login...')
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' })

    const emailInput = page.locator('input[type="email"], input[name="email"]')
    const passwordInput = page.locator('input[type="password"], input[name="password"]')

    if (await emailInput.isVisible()) {
      console.log('Logging in with mumbaicitycabs24@gmail.com...')
      await emailInput.fill('mumbaicitycabs24@gmail.com')
      await passwordInput.fill('Shahrukh@123')
      await page.locator('button[type="submit"]').click()
      await page.waitForURL('**/admin', { timeout: 15000 })
      console.log('Login successful! Current URL:', page.url())
    } else {
      console.log('Already logged in or login form not visible, URL:', page.url())
    }

    await page.waitForTimeout(2000)

    // 2. Screenshot 1: Tour Packages List
    console.log('2. Navigating to /admin/collections/tours...')
    await page.goto('http://localhost:3000/admin/collections/tours', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: path.join(screenshotDir, '1-tour-packages-list.png'),
      fullPage: false,
    })
    console.log('✓ Captured 1-tour-packages-list.png')

    // 3. Screenshot 2: Tour Package Edit Drawer
    console.log('3. Opening Tour Package record drawer...')
    const tourRow = page.locator('.table tbody tr').first()
    if (await tourRow.isVisible()) {
      await tourRow.click()
      await page.waitForTimeout(2500)
    } else {
      // Fallback direct URL param
      await page.goto('http://localhost:3000/admin/collections/tours?id=1', { waitUntil: 'networkidle' })
      await page.waitForTimeout(2500)
    }
    await page.screenshot({
      path: path.join(screenshotDir, '2-tour-package-edit-drawer.png'),
      fullPage: false,
    })
    console.log('✓ Captured 2-tour-package-edit-drawer.png')

    // 4. Screenshot 3: Form Submissions List
    console.log('4. Navigating to /admin/collections/bookings...')
    await page.goto('http://localhost:3000/admin/collections/bookings', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: path.join(screenshotDir, '3-form-submissions-list.png'),
      fullPage: false,
    })
    console.log('✓ Captured 3-form-submissions-list.png')

    // 5. Screenshot 4: Form Submission Edit Drawer
    console.log('5. Opening Form Submission record drawer...')
    const bookingRow = page.locator('.table tbody tr').first()
    if (await bookingRow.isVisible()) {
      await bookingRow.click()
      await page.waitForTimeout(2500)
    } else {
      await page.goto('http://localhost:3000/admin/collections/bookings?id=1', { waitUntil: 'networkidle' })
      await page.waitForTimeout(2500)
    }
    await page.screenshot({
      path: path.join(screenshotDir, '4-form-submission-edit-drawer.png'),
      fullPage: false,
    })
    console.log('✓ Captured 4-form-submission-edit-drawer.png')

    // 6. Screenshot 5: Page Editor / Drawer
    console.log('6. Navigating to /admin/collections/pages...')
    await page.goto('http://localhost:3000/admin/collections/pages', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    const pageRow = page.locator('.table tbody tr').first()
    if (await pageRow.isVisible()) {
      await pageRow.click()
      await page.waitForTimeout(2500)
    }
    await page.screenshot({
      path: path.join(screenshotDir, '5-page-editor.png'),
      fullPage: false,
    })
    console.log('✓ Captured 5-page-editor.png')

    // 7. Screenshot 6: Mobile Viewport (375x812)
    console.log('7. Testing Mobile Admin Viewport (375px)...')
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await page.screenshot({
      path: path.join(screenshotDir, '6-mobile-admin-view.png'),
      fullPage: false,
    })
    console.log('✓ Captured 6-mobile-admin-view.png')

    console.log('=== ALL 6 SCREENSHOTS SUCCESSFULLY CAPTURED! ===')
  } catch (error) {
    console.error('Error during Playwright verification:', error)
  } finally {
    await browser.close()
  }
}

runVerification()
