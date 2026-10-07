import { getPayload } from 'payload'
import configPromise from '../payload.config'
import http from 'http'

function fetchHtml(urlPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
      res.on('error', reject)
    })
  })
}

async function testCmsEditability() {
  console.log('=== CMS EDITABILITY VERIFICATION TEST ===\n')
  const payload = await getPayload({ config: configPromise })

  // -------------------------------------------------------------
  // TEST 1: HOMEPAGE HERO EDITABILITY
  // -------------------------------------------------------------
  console.log('[1/2] Testing Homepage Hero Editability in CMS...')
  const homeRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })
  if (homeRes.docs.length === 0) {
    throw new Error('Home page doc not found')
  }
  const homeDoc = homeRes.docs[0]
  const originalLayout = JSON.parse(JSON.stringify(homeDoc.layout))
  const originalHeroSubtitle = (originalLayout[0] as any)?.subtitle

  console.log(`  Original Homepage Hero Subtitle: "${originalHeroSubtitle}"`)

  // Mutate subtitle with unique test string (no & to avoid HTML entity escaping difference)
  const testSubtitle = `CMS-VERIFIED-EDIT: Doorstep pickup and verified guides [${Date.now()}]`
  const modifiedLayout = JSON.parse(JSON.stringify(originalLayout))
  modifiedLayout[0].subtitle = testSubtitle

  await payload.update({
    collection: 'pages',
    id: homeDoc.id,
    data: {
      layout: modifiedLayout,
    },
  })
  console.log(`  ✓ Updated Homepage document in Payload CMS with test subtitle.`)

  // Fetch live page from Next.js server
  const homeHtml = await fetchHtml('/')
  const heroUpdated = homeHtml.includes(testSubtitle)
  console.log(`  Live Homepage Verification: ${heroUpdated ? '✓ CHANGE REFLECTED IN HTML' : '✗ FAILED TO REFLECT'}`)
  console.log('  Debug snippet from live HTML:', homeHtml.substring(homeHtml.indexOf('Affordable'), homeHtml.indexOf('Affordable') + 200))

  // Revert back to original
  await payload.update({
    collection: 'pages',
    id: homeDoc.id,
    data: {
      layout: originalLayout,
    },
  })
  console.log(`  ✓ Restored Homepage document to original content.`)

  const homeRestoredHtml = await fetchHtml('/')
  const heroRestored = homeRestoredHtml.includes(originalHeroSubtitle)
  console.log(`  Live Homepage Restoration: ${heroRestored ? '✓ ORIGINAL RESTORED' : '✗ RESTORATION FAILED'}`)

  if (!heroUpdated || !heroRestored) {
    throw new Error('Homepage CMS Editability Test Failed!')
  }

  // -------------------------------------------------------------
  // TEST 2: MUMBAI DARSHAN TOUR DETAILS EDITABILITY
  // -------------------------------------------------------------
  console.log('\n[2/2] Testing Mumbai Darshan Tour Details Editability in CMS...')
  const tourRes = await payload.find({
    collection: 'tours',
    where: { slug: { equals: 'mumbai-darshan' } },
  })
  if (tourRes.docs.length === 0) {
    throw new Error('Mumbai Darshan tour doc not found')
  }
  const tourDoc = tourRes.docs[0]
  const origTourLayout = JSON.parse(JSON.stringify(tourDoc.layout))
  const origTourDetails = origTourLayout[0] as any
  const origWagonRRate = origTourDetails.rates[0]?.h8 || origTourDetails.rates[0]?.col1

  console.log(`  Original Mumbai Darshan Sedan/WagonR Rate: "${origWagonRRate}"`)

  // Mutate rate
  const testRate = `9999-CMS-TEST`
  const modTourLayout = JSON.parse(JSON.stringify(origTourLayout))
  if (modTourLayout[0].rates[0].h8) {
    modTourLayout[0].rates[0].h8 = testRate
  } else {
    modTourLayout[0].rates[0].col1 = testRate
  }

  await payload.update({
    collection: 'tours',
    id: tourDoc.id,
    data: {
      layout: modTourLayout,
    },
  })
  console.log(`  ✓ Updated Mumbai Darshan document in Payload CMS with test rate "${testRate}".`)

  // Fetch live tour page
  const tourHtml = await fetchHtml('/mumbai-darshan')
  const tourUpdated = tourHtml.includes(testRate)
  console.log(`  Live Tour Page Verification: ${tourUpdated ? '✓ CHANGE REFLECTED IN HTML' : '✗ FAILED TO REFLECT'}`)

  // Revert back to original
  await payload.update({
    collection: 'tours',
    id: tourDoc.id,
    data: {
      layout: origTourLayout,
    },
  })
  console.log(`  ✓ Restored Mumbai Darshan document to original rate.`)

  const tourRestoredHtml = await fetchHtml('/mumbai-darshan')
  const tourRestored = tourRestoredHtml.includes(origWagonRRate)
  console.log(`  Live Tour Page Restoration: ${tourRestored ? '✓ ORIGINAL RESTORED' : '✗ RESTORATION FAILED'}`)

  if (!tourUpdated || !tourRestored) {
    throw new Error('Mumbai Darshan CMS Editability Test Failed!')
  }

  console.log('\n✅ ALL CMS EDITABILITY TESTS PASSED WITH 100% SUCCESS!')
}

testCmsEditability().catch((err) => {
  console.error(err)
  process.exit(1)
})
