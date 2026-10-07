// @ts-nocheck
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

async function runCmsVerification() {
  console.log('=== STARTING PLAYWRIGHT VERIFICATION FOR CMS STRUCTURE & EDITOR UX ===')

  const artifactDir = '/home/kishor/.gemini/antigravity-cli/brain/0f28e5c7-7d32-4d29-9e4d-da9a302f3b48'
  const localDir = path.resolve(process.cwd(), 'admin-screenshots')
  if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true })

  const saveScreenshot = async (page: any, filename: string) => {
    const localPath = path.join(localDir, filename)
    const artifactPath = path.join(artifactDir, filename)
    await page.screenshot({ path: localPath, fullPage: false })
    fs.copyFileSync(localPath, artifactPath)
    console.log(`✓ Captured: ${filename}`)
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
    // 1. Admin Login
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
      console.log('Login successful!')
    }

    await page.waitForTimeout(2000)

    // 2. Fleet Collection List
    console.log('2. Verifying Fleet collection list...')
    await page.goto('http://localhost:3000/admin/collections/fleet', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-1-fleet-list.png')

    // 3. Fleet Edit Drawer
    console.log('3. Opening Fleet record drawer...')
    const fleetRow = page.locator('.table tbody tr').first()
    if (await fleetRow.isVisible()) {
      await fleetRow.click()
      await page.waitForTimeout(2500)
      await saveScreenshot(page, 'cms-2-fleet-drawer.png')
      // Close drawer by pressing Escape
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
    }

    // 4. Gallery Collection List
    console.log('4. Verifying Gallery collection list...')
    await page.goto('http://localhost:3000/admin/collections/gallery', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-3-gallery-list.png')

    // 5. Testimonials Collection List
    console.log('5. Verifying Testimonials collection list...')
    await page.goto('http://localhost:3000/admin/collections/testimonials', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-4-testimonials-list.png')

    // 6. FAQs Collection List
    console.log('6. Verifying FAQs collection list...')
    await page.goto('http://localhost:3000/admin/collections/faqs', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-5-faqs-list.png')

    // 7. Pages Collection List (showing 6 canonical pages)
    console.log('7. Verifying Pages collection list...')
    await page.goto('http://localhost:3000/admin/collections/pages', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-6-pages-list.png')

    // 8. Tour Package Full Editor / Tabs (navigate directly to edit page)
    console.log('8. Verifying Tour Package tabs in editor...')
    await page.goto('http://localhost:3000/admin/collections/tours/1', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2500)
    await saveScreenshot(page, 'cms-7-tour-editor-tabs.png')

    // 9. Public Frontend: /tours
    console.log('9. Verifying public /tours page...')
    await page.goto('http://localhost:3000/tours', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-8-public-tours.png')

    // 10. Public Frontend: /terms-and-conditions
    console.log('10. Verifying public /terms-and-conditions page...')
    await page.goto('http://localhost:3000/terms-and-conditions', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-9-public-terms.png')

    // 11. Public Frontend: Homepage /
    console.log('11. Verifying public homepage /...')
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    await saveScreenshot(page, 'cms-10-public-homepage.png')

    console.log('=== ALL 10 SCREENSHOTS CAPTURED AND COPIED TO ARTIFACT DIR! ===')
  } catch (err) {
    console.error('Error during verification:', err)
  } finally {
    await browser.close()
  }
}

runCmsVerification()
