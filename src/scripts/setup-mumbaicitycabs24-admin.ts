import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { chromium } from 'playwright'

async function setupMumbaicitycabs24Admin() {
  console.log('=== SETTING UP MUMBAICITYCABS24 ADMIN USER ===\n')
  const payload = await getPayload({ config: configPromise })

  const email = 'mumbaicitycabs24@gmail.com'
  const password = 'Shahrukh@123'
  const name = 'Shahrukh'

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  let userId: any = null
  if (existing.docs.length > 0) {
    userId = existing.docs[0].id
    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        password,
        role: 'admin',
        name,
      },
    })
    console.log(`✓ Updated existing user "${email}" (ID: ${userId}) with new password and admin role.`)
  } else {
    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'admin',
      },
    })
    userId = created.id
    console.log(`✓ Created admin user "${email}" (ID: ${userId}).`)
  }

  // Verify in Playwright
  console.log('\n=== VERIFYING LIVE ADMIN LOGIN VIA PLAYWRIGHT ===')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  await page.goto('http://localhost:3000/admin/login')
  await page.waitForLoadState('networkidle')

  await page.locator('input[name="email"], input[type="email"]').fill(email)
  await page.locator('input[name="password"], input[type="password"]').fill(password)
  await page.locator('button[type="submit"]').click()

  await page.waitForURL('**/admin', { timeout: 10000 })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1500)

  const currentUrl = page.url()
  const pageTitle = await page.title()
  const dashboardText = await page.evaluate(() => document.body.innerText)

  console.log(`  Login Successful URL: ${currentUrl}`)
  console.log(`  Page Title: "${pageTitle}"`)

  const isDashboard = currentUrl.endsWith('/admin') && !currentUrl.includes('/login')
  const collections = ['Tours', 'Pages', 'Bookings', 'Fleets', 'Galleries', 'Testimonials', 'Site Settings']
  const visibleCols = collections.filter((c) => dashboardText.includes(c))
  console.log(`  Visible Collections/Globals: ${visibleCols.join(', ')}`)

  await page.close()
  await browser.close()

  if (isDashboard && visibleCols.length >= 5) {
    console.log('\n✅ MUMBAICITYCABS24 ADMIN ACCOUNT VERIFIED & ACTIVE 100%!')
  } else {
    throw new Error('Login verification failed!')
  }
}

setupMumbaicitycabs24Admin().catch((err) => {
  console.error(err)
  process.exit(1)
})
