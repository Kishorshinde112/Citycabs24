import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function runEditorVerification() {
  console.log('=== STARTING PLAYWRIGHT VERIFICATION FOR REDESIGNED ADMIN EDITORS ===')

  const artifactsDir = '/home/kishor/.gemini/antigravity-cli/brain/0f28e5c7-7d32-4d29-9e4d-da9a302f3b48'
  const localScreenshotDir = path.resolve(process.cwd(), 'admin-screenshots')
  
  if (!fs.existsSync(localScreenshotDir)) {
    fs.mkdirSync(localScreenshotDir, { recursive: true })
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })

  const page = await context.newPage()

  async function saveScreenshot(filename: string) {
    const localPath = path.join(localScreenshotDir, filename)
    const artifactPath = path.join(artifactsDir, filename)
    await page.screenshot({ path: localPath, fullPage: false })
    fs.copyFileSync(localPath, artifactPath)
    console.log(`✓ Saved screenshot: ${filename}`)
  }

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
    }

    await page.waitForTimeout(2000)

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 1: Tour Editor - Overview Tab (Konkan Darshan ID: 10)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('2. Navigating to Konkan Darshan Tour Editor (/admin/collections/tours/10)...')
    await page.goto('http://localhost:3000/admin/collections/tours/10', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    console.log('Capturing Screenshot 1: admin-tour-editor-overview.png...')
    await saveScreenshot('admin-tour-editor-overview.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 2: Tour Editor - Pricing & Rates Tab
    // ─────────────────────────────────────────────────────────────────────────
    console.log('3. Clicking Pricing & Rates tab...')
    const pricingTab = page.locator('button:has-text("Pricing & Rates")').first()
    if (await pricingTab.isVisible()) {
      await pricingTab.click()
      await page.waitForTimeout(1500)
    }
    console.log('Capturing Screenshot 2: admin-tour-editor-pricing.png...')
    await saveScreenshot('admin-tour-editor-pricing.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 3: Tour Editor - Attractions Tab
    // ─────────────────────────────────────────────────────────────────────────
    console.log('4. Clicking Attractions tab...')
    const attractionsTab = page.locator('button:has-text("Attractions")').first()
    if (await attractionsTab.isVisible()) {
      await attractionsTab.click()
      await page.waitForTimeout(1500)
    }
    console.log('Capturing Screenshot 3: admin-tour-editor-attractions.png...')
    await saveScreenshot('admin-tour-editor-attractions.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 4: Tour Editor - SEO & Meta Tab
    // ─────────────────────────────────────────────────────────────────────────
    console.log('5. Clicking SEO & Meta tab...')
    const seoTab = page.locator('button:has-text("SEO & Meta")').first()
    if (await seoTab.isVisible()) {
      await seoTab.click()
      await page.waitForTimeout(1500)
    }
    console.log('Capturing Screenshot 4: admin-tour-editor-seo.png...')
    await saveScreenshot('admin-tour-editor-seo.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 5: Page Editor - Content Blocks (Home Page ID: 1)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('6. Navigating to Home Page Editor (/admin/collections/pages/1)...')
    await page.goto('http://localhost:3000/admin/collections/pages/1', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    console.log('Capturing Screenshot 5: admin-page-editor-blocks.png...')
    await saveScreenshot('admin-page-editor-blocks.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 6: Fleet Vehicle Drawer Editor (Maruti Ertiga ID: 3)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('7. Opening Fleet Drawer for Maruti Ertiga (?id=3)...')
    await page.goto('http://localhost:3000/admin/collections/fleet?id=3', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    console.log('Capturing Screenshot 6: admin-fleet-editor.png...')
    await saveScreenshot('admin-fleet-editor.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 7: Bookings Drawer - Full Booking (Record ID: 3)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('8. Opening Bookings Drawer for Full Booking (?id=3)...')
    await page.goto('http://localhost:3000/admin/collections/bookings?id=3', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    console.log('Capturing Screenshot 7: admin-booking-drawer.png...')
    await saveScreenshot('admin-booking-drawer.png')

    // ─────────────────────────────────────────────────────────────────────────
    // SCREENSHOT 8: Bookings Drawer - Quick Enquiry (Record ID: 4)
    // ─────────────────────────────────────────────────────────────────────────
    console.log('9. Opening Bookings Drawer for Quick Enquiry (?id=4)...')
    await page.goto('http://localhost:3000/admin/collections/bookings?id=4', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    console.log('Capturing Screenshot 8: admin-enquiry-drawer.png...')
    await saveScreenshot('admin-enquiry-drawer.png')

    console.log('=== ALL 8 SCREENSHOTS CAPTURED AND SYNCED TO ARTIFACTS ===')
  } catch (err) {
    console.error('Error during verification:', err)
  } finally {
    await browser.close()
  }
}

runEditorVerification()
