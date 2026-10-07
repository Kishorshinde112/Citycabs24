import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { chromium } from 'playwright'

async function setupOfficialAdmin() {
  console.log('=== SETTING UP OFFICIAL ADMIN USER IN PAYLOAD CMS ===\n')
  const payload = await getPayload({ config: configPromise })

  const targetEmail = 'citytourcabs8@gmail.com'
  const targetPass = 'Shahrukh@123'
  const targetName = 'Shahrukh'

  // Check if target user exists
  const existingRes = await payload.find({
    collection: 'users',
    where: { email: { equals: targetEmail } },
  })

  let adminUserId: any = null

  if (existingRes.docs.length > 0) {
    adminUserId = existingRes.docs[0].id
    await payload.update({
      collection: 'users',
      id: adminUserId,
      data: {
        password: targetPass,
        role: 'admin',
        name: targetName,
      },
    })
    console.log(`✓ Updated existing admin user "${targetEmail}" (ID: ${adminUserId}) with new password and admin role.`)
  } else {
    const created = await payload.create({
      collection: 'users',
      data: {
        email: targetEmail,
        password: targetPass,
        name: targetName,
        role: 'admin',
      },
    })
    adminUserId = created.id
    console.log(`✓ Created official admin user "${targetEmail}" (ID: ${adminUserId}) with role admin.`)
  }

  // Remove temporary test user if present
  const tempRes = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@citycabs24.com' } },
  })
  if (tempRes.docs.length > 0) {
    for (const doc of tempRes.docs) {
      await payload.delete({
        collection: 'users',
        id: doc.id,
      })
      console.log(`✓ Cleaned up temporary test user (ID: ${doc.id}).`)
    }
  }

  // Verify login with Playwright
  console.log('\n=== VERIFYING LIVE ADMIN LOGIN VIA PLAYWRIGHT ===')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  console.log('Navigating to http://localhost:3000/admin/login...')
  await page.goto('http://localhost:3000/admin/login')
  await page.waitForLoadState('networkidle')

  const emailInput = page.locator('input[name="email"], input[type="email"]')
  await emailInput.waitFor({ state: 'visible' })
  await emailInput.fill(targetEmail)

  const passwordInput = page.locator('input[name="password"], input[type="password"]')
  await passwordInput.fill(targetPass)

  const submitBtn = page.locator('button[type="submit"]')
  await submitBtn.click()

  // Wait for redirect to dashboard
  await page.waitForURL('**/admin', { timeout: 10000 })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1500)

  const currentUrl = page.url()
  const dashboardText = await page.evaluate(() => document.body.innerText)

  console.log(`  Login Successful URL: ${currentUrl}`)
  const isDashboard = currentUrl.endsWith('/admin') && !currentUrl.includes('/login')

  const collections = ['Tours', 'Pages', 'Bookings', 'Fleets', 'Galleries', 'Testimonials', 'Site Settings']
  const verifiedCols = collections.filter((c) => dashboardText.includes(c))

  console.log(`  Dashboard Loaded: ${isDashboard ? '✓ YES' : '✗ NO'}`)
  console.log(`  Visible Collections/Globals: ${verifiedCols.join(', ')}`)

  await page.close()
  await browser.close()

  if (isDashboard && verifiedCols.length >= 5) {
    console.log('\n✅ OFFICIAL ADMIN CREDENTIALS CONFIGURED & VERIFIED WITH 100% SUCCESS!')
  } else {
    throw new Error('Admin login verification failed!')
  }
}

setupOfficialAdmin().catch((err) => {
  console.error(err)
  process.exit(1)
})
