import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { chromium } from 'playwright'

async function verifyAdminDashboard() {
  console.log('=== VERIFYING ADMIN USER & COLLECTIONS DASHBOARD ===\n')
  const payload = await getPayload({ config: configPromise })

  const users = await payload.find({ collection: 'users' })
  console.log(`Existing admin users in database: ${users.totalDocs}`)

  if (users.totalDocs === 0) {
    console.log('Creating initial admin user for dashboard verification...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@citycabs24.com',
        password: 'AdminPassword123!',
        name: 'CityCabs Admin',
        role: 'admin',
      },
    })
    console.log('✓ Initial admin user created successfully.')
  }

  // Now verify dashboard in headless browser
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  console.log('Navigating to http://localhost:3000/admin...')
  await page.goto('http://localhost:3000/admin/login')
  await page.waitForLoadState('networkidle')

  // Fill login credentials
  const emailInput = page.locator('input[name="email"], input[type="email"]')
  await emailInput.waitFor({ state: 'visible' })
  await emailInput.fill('admin@citycabs24.com')

  const passwordInput = page.locator('input[name="password"], input[type="password"]')
  await passwordInput.fill('AdminPassword123!')

  const loginBtn = page.locator('button[type="submit"]')
  await loginBtn.click()

  // Wait for redirect to dashboard
  await page.waitForURL('**/admin', { timeout: 10000 })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1000)

  const dashboardText = await page.evaluate(() => document.body.innerText)

  const expectedCollections = [
    'Tours',
    'Pages',
    'Media',
    'Bookings',
    'Fleets',
    'Galleries',
    'Testimonials',
    'Faqs',
    'Redirects',
    'Site Settings',
    'Navigation',
    'Footer',
  ]

  console.log('\nVerifying visible collections & globals on Payload Dashboard:')
  const foundCollections: { [col: string]: boolean } = {}
  for (const col of expectedCollections) {
    const isPresent = dashboardText.includes(col)
    foundCollections[col] = isPresent
    console.log(`  - ${col}: ${isPresent ? '✓ VISIBLE' : '✗ MISSING'}`)
  }

  await page.close()
  await browser.close()

  const allVisible = Object.values(foundCollections).every(Boolean)
  if (allVisible) {
    console.log('\n✅ ALL PAYLOAD CMS COLLECTIONS & GLOBALS ARE ACCESSIBLE & VERIFIED!')
  } else {
    console.error('\n❌ SOME COLLECTIONS WERE NOT FOUND ON DASHBOARD')
    process.exit(1)
  }
}

verifyAdminDashboard().catch((err) => {
  console.error(err)
  process.exit(1)
})
