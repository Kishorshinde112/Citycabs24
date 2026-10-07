import { chromium } from 'playwright'

async function reproduceSaveBug() {
  console.log('=== PHASE 1: REPRODUCING TOUR EDITOR SAVE FAILURE ===')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })

  const page = await context.newPage()

  const consoleLogs: string[] = []
  page.on('console', (msg) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => {
    consoleLogs.push(`[PAGE ERROR] ${err.message}`)
  })

  let interceptedRequest: any = null
  let interceptedResponse: any = null

  page.on('request', (req) => {
    if (req.url().includes('/api/tours/1')) {
      interceptedRequest = {
        url: req.url(),
        method: req.method(),
        headers: req.headers(),
        postData: req.postData(),
      }
    }
  })

  page.on('response', async (res) => {
    if (res.url().includes('/api/tours/1')) {
      let bodyText = ''
      try {
        bodyText = await res.text()
      } catch (e) {
        bodyText = `Failed to read body: ${e}`
      }
      interceptedResponse = {
        url: res.url(),
        status: res.status(),
        statusText: res.statusText(),
        headers: res.headers(),
        body: bodyText,
      }
    }
  })

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

    // 2. Open Tour 1 (Mumbai Darshan)
    console.log('2. Opening /admin/collections/tours/1...')
    await page.goto('http://localhost:3000/admin/collections/tours/1', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)

    // Find Display Order input
    const displayOrderInput = page.locator('input[type="number"], input[name="displayOrder"]').first()
    const currentOrder = await displayOrderInput.inputValue()
    console.log(`Current Display Order: "${currentOrder}"`)

    // 3. Change Display Order
    const newOrder = currentOrder === '10' ? '11' : '10'
    console.log(`Changing Display Order: ${currentOrder} -> ${newOrder}...`)
    await displayOrderInput.fill(newOrder)
    await page.waitForTimeout(1000)

    // Verify dirty state
    const isDirtyBadge = await page.locator('text=Unsaved Changes').first().isVisible()
    console.log(`Is Unsaved Changes visible? ${isDirtyBadge}`)

    // 4. Click Save Changes
    console.log('4. Clicking Save Changes button...')
    const saveButton = page.locator('button:has-text("Save Changes")').first()
    await saveButton.click()
    await page.waitForTimeout(3000)

    // 5. Check error message in UI
    const errorText = await page.locator('text=Failed to save').allInnerTexts()
    console.log('UI Error Messages:', errorText)

    console.log('\n=== CAPTURED INTERCEPTED REQUEST ===')
    console.log('Method:', interceptedRequest?.method)
    console.log('URL:', interceptedRequest?.url)
    console.log('Headers:', JSON.stringify(interceptedRequest?.headers, null, 2))
    console.log('Request Payload Body:')
    try {
      console.log(JSON.stringify(JSON.parse(interceptedRequest?.postData || '{}'), null, 2))
    } catch {
      console.log(interceptedRequest?.postData)
    }

    console.log('\n=== CAPTURED INTERCEPTED RESPONSE ===')
    console.log('Status:', interceptedResponse?.status, interceptedResponse?.statusText)
    console.log('Response Body:')
    try {
      console.log(JSON.stringify(JSON.parse(interceptedResponse?.body || '{}'), null, 2))
    } catch {
      console.log(interceptedResponse?.body)
    }

    console.log('\n=== BROWSER CONSOLE LOGS ===')
    consoleLogs.forEach((log) => console.log(log))
  } catch (err) {
    console.error('Reproduction script encountered error:', err)
  } finally {
    await browser.close()
  }
}

reproduceSaveBug()
