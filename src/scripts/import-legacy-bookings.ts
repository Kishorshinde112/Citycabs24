import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

async function importLegacyBookings() {
  console.log('=== IMPORTING LEGACY BOOKINGS INTO PAYLOAD CMS ===\n')
  const payload = await getPayload({ config: configPromise })

  const exportPath = path.resolve(process.cwd(), 'data', 'bookings_export.json')
  if (!fs.existsSync(exportPath)) {
    console.error('File not found:', exportPath)
    process.exit(1)
  }

  const lines = fs.readFileSync(exportPath, 'utf-8').trim().split('\n').filter(Boolean)
  console.log(`Found ${lines.length} legacy bookings to import.`)

  let imported = 0
  let skipped = 0

  for (const line of lines) {
    const parts = line.split('|')
    if (parts.length < 8) continue

    const [id, name, phone, route, vehicle, date, rawStatus, createdAt] = parts

    let status = 'pending'
    const sLower = rawStatus.toLowerCase()
    if (sLower === 'cancelled') status = 'cancelled'
    else if (sLower === 'confirmed') status = 'confirmed'
    else if (sLower === 'completed') status = 'completed'
    else if (sLower === 'in_progress' || sLower === 'in progress') status = 'in_progress'

    // Check if booking already exists with same phone and date
    const existing = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { phone: { equals: phone } },
          { date: { equals: date } },
        ],
      },
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    // Insert legacy booking without triggering side effects
    await payload.create({
      collection: 'bookings',
      data: {
        leadType: 'booking',
        name,
        phone,
        email: '',
        route: route || 'Mumbai Darshan',
        vehicle: vehicle || 'Standard Cab',
        date,
        status: status as any,
        gclid: '',
        utm_source: 'legacy_import',
      },
    })
    imported++
  }

  console.log(`\nImport complete! Newly imported: ${imported}, Already existing/skipped: ${skipped}`)
  process.exit(0)
}

importLegacyBookings().catch((err) => {
  console.error('Import error:', err)
  process.exit(1)
})
