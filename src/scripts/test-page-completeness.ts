import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const ROUTES = [
  { path: '/', name: 'Homepage', minSections: 9, minHeight: 3500 },
  { path: '/mumbai-darshan', name: 'Mumbai Darshan', minSections: 6, minHeight: 2500 },
  { path: '/lonavala-trip', name: 'Lonavala Trip', minSections: 6, minHeight: 1800 },
  { path: '/alibaug-sightseeing', name: 'Alibaug Sightseeing', minSections: 6, minHeight: 1800 },
  { path: '/matheran-sightseeing', name: 'Matheran Sightseeing', minSections: 6, minHeight: 1800 },
  { path: '/shirdi-tour', name: 'Shirdi Tour', minSections: 6, minHeight: 1500 },
  { path: '/mahabaleshwar-sightseeing', name: 'Mahabaleshwar Sightseeing', minSections: 6, minHeight: 1800 },
  { path: '/igatpuri-tour', name: 'Igatpuri Tour', minSections: 6, minHeight: 1800 },
  { path: '/ashtavinayak', name: 'Ashtavinayak', minSections: 6, minHeight: 1800 },
  { path: '/3-jyotirlinga-in-maharashtra', name: '3 Jyotirlinga in Maharashtra', minSections: 6, minHeight: 1500 },
  { path: '/konkan-darshan', name: 'Konkan Darshan', minSections: 6, minHeight: 1800 },
]

const VIEWPORTS = [
  { width: 375, height: 812, name: '375px-Mobile' },
  { width: 768, height: 1024, name: '768px-Tablet' },
  { width: 1024, height: 768, name: '1024px-Desktop' },
  { width: 1440, height: 900, name: '1440px-Large' },
]

async function verifyCompleteness() {
  console.log('=== PAGE COMPLETENESS & RESPONSIVE AUDIT ===')
  const browser = await chromium.launch({ headless: true })
  const screenshotDir = path.resolve(process.cwd(), 'public/media/audit-screenshots')
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }

  const results: any[] = []

  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(`http://localhost:3000${route.path}`)
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)

    const title = await page.title()
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
    const contentText = await page.evaluate(() => document.body.innerText)

    // Check key section markers based on route
    let sectionChecks: { [key: string]: boolean } = {}
    if (route.path === '/') {
      sectionChecks = {
        'Hero Section': contentText.includes('Affordable & Reliable Cabs in Mumbai') || contentText.includes('Book Your Ride'),
        'Tour Packages Grid': contentText.includes('Explore Mumbai & Beyond') || contentText.includes('Mumbai Darshan'),
        'Why Choose Us': contentText.includes('Why Choose CityCabs24?'),
        'Fleet Section': contentText.includes('Our Cabs Gallery') || contentText.includes('Innova Crysta'),
        'Testimonials': contentText.includes('What Our Customers Say'),
        'Gallery Section': contentText.includes('Memories from Our Tours'),
        'About Section': contentText.includes('Our Story & Mission') || contentText.includes('About CityCabs24') || contentText.includes('Personal Connection'),
        'FAQ Section': contentText.includes('Frequently Asked Questions'),
        'Booking Contact Form': contentText.includes('Book Your Cab or Contact Us') || contentText.includes('Get In Touch'),
      }
    } else {
      sectionChecks = {
        'Hero / Header': contentText.includes(route.name) && contentText.includes('View Rate Card'),
        'Driver Guide': contentText.includes('Get drivers who act as a guide'),
        'Rules / Important Info': contentText.includes('Rules To be Noted') || contentText.includes('Important Information'),
        'Attractions / Highlights': /(Highlights|Attractions|Places|Temples|Stops)/i.test(contentText),
        'Rate Card Table': contentText.includes('Rate Card') && (contentText.includes('Sedan') || contentText.includes('WagonR')),
        'Quick Booking Box': contentText.includes('Quick Booking') && contentText.includes('Book Now'),
      }
    }

    const passedChecks = Object.entries(sectionChecks).filter(([_, v]) => v).length
    const totalChecks = Object.keys(sectionChecks).length
    const isPassing = passedChecks === totalChecks && bodyHeight >= route.minHeight

    results.push({
      route: route.path,
      name: route.name,
      bodyHeight,
      passedChecks,
      totalChecks,
      sectionChecks,
      isPassing,
    })

    console.log(`\nRoute: ${route.path} (${route.name})`)
    console.log(`  Page Height: ${bodyHeight}px (Minimum required: ${route.minHeight}px)`)
    console.log(`  Sections verified: ${passedChecks}/${totalChecks}`)
    Object.entries(sectionChecks).forEach(([sec, ok]) => {
      console.log(`    - ${sec}: ${ok ? '✓ PRESENT' : '✗ MISSING'}`)
    })

    await page.close()
  }

  // --- RESPONSIVE VIEWPORT TEST ON MUMBAI DARSHAN & HOMEPAGE ---
  console.log('\n=== TESTING RESPONSIVE VIEWPORTS ===')
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })

    // Homepage at viewport
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('domcontentloaded')
    const homeH = await page.evaluate(() => document.body.scrollHeight)

    // Mumbai Darshan at viewport
    await page.goto('http://localhost:3000/mumbai-darshan')
    await page.waitForLoadState('domcontentloaded')
    const mdH = await page.evaluate(() => document.body.scrollHeight)

    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): Homepage Height: ${homeH}px | Mumbai Darshan Height: ${mdH}px`)
    await page.close()
  }

  await browser.close()

  const allPass = results.every((r) => r.isPassing)
  if (allPass) {
    console.log('\n✅ ALL 11 ROUTES PASSED WITH 100% SECTION COMPLETENESS!')
  } else {
    console.error('\n❌ SOME ROUTES FAILED COMPLETENESS CHECKS')
    process.exit(1)
  }
}

verifyCompleteness().catch((err) => {
  console.error(err)
  process.exit(1)
})
