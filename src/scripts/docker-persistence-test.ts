import fs from 'fs'
import path from 'path'

async function dockerLifecycleTest() {
  console.log('=== DOCKER PERSISTENCE TEST: STEP 1 - CREATE TEST RECORDS ===')

  // 1. Create a Booking via API
  console.log('1. Submitting test booking via http://localhost:3000/api/bookings...')
  const bookingRes = await fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Docker Persistence Audit Tester',
      phone: '9876543210',
      email: 'docker-audit@citycabs24.com',
      route: 'Mumbai Airport → Lonavala Test',
      vehicle: 'Innova Crysta',
      date: '2026-10-15',
      gclid: 'gclid_docker_persist_123',
      utm_source: 'docker_verify',
    }),
  })
  const bookingJson = await bookingRes.json()
  console.log('Booking API Response:', bookingJson)
  const bookingId = bookingJson.bookingId
  console.log(`=> Created Booking ID: ${bookingId}`)

  // Save the recorded IDs to a temp file for verification after container restart
  fs.writeFileSync(
    path.resolve(process.cwd(), 'scratch/docker-test-ids.json'),
    JSON.stringify({ bookingId, timestamp: Date.now() }, null, 2)
  )

  console.log('Booking creation finished.')
}

dockerLifecycleTest().catch((err) => {
  console.error(err)
  process.exit(1)
})
