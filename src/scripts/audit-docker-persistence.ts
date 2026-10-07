import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { execSync } from 'child_process'

async function runDockerPersistenceAudit() {
  console.log('====================================================')
  console.log('PART 7: DOCKER SQLITE & VOLUME PERSISTENCE AUDIT')
  console.log('====================================================\n')

  let allPassed = true
  const payload = await getPayload({ config: configPromise })

  // 1. Create harmless test record before container restart
  console.log('--- 1. Creating Pre-Restart Persistence Test Record ---')
  const testId = `PERSIST-${Date.now()}`
  const createdRecord = await payload.create({
    collection: 'bookings',
    data: {
      name: testId,
      phone: '9876543210',
      route: 'Persistence Audit Test',
      leadType: 'booking',
      status: 'pending',
    },
  })
  console.log(`  ✓ Created test lead #${createdRecord.id} with name="${testId}"`)

  // 2. Restart Docker Container
  console.log('\n--- 2. Restarting Docker Container (citycabs24) ---')
  try {
    execSync('docker restart citycabs24', { stdio: 'inherit' })
    console.log('  ✓ Container restarted successfully. Waiting 5s for warmup...')
    execSync('sleep 5')
  } catch (err) {
    console.error('  ✗ Failed to restart container:', err)
    allPassed = false
  }

  // 3. Verify HTTP 200 on key endpoints after container restart
  console.log('\n--- 3. Verifying HTTP 200 on Routes Post-Restart ---')
  const routesToTest = ['/', '/admin', '/mumbai-darshan']
  for (const r of routesToTest) {
    const res = await fetch(`http://localhost:3000${r}`)
    console.log(`  ${r.padEnd(20)}: HTTP ${res.status}`)
    if (res.status !== 200) {
      console.error(`  ✗ Route ${r} failed post-restart check!`)
      allPassed = false
    }
  }

  // 4. Verify Database Record Survived Container Restart
  console.log('\n--- 4. Verifying SQLite Data Persistence Post-Restart ---')
  const reloadedRecord = await payload.findByID({
    collection: 'bookings',
    id: createdRecord.id,
  })

  if (reloadedRecord && reloadedRecord.name === testId) {
    console.log(`  ✓ Test record #${createdRecord.id} SURVIVED container restart! Database persistence intact.`)
  } else {
    console.error(`  ✗ Test record did not survive container restart!`)
    allPassed = false
  }

  // Clean up test record
  await payload.delete({
    collection: 'bookings',
    id: createdRecord.id,
  })
  console.log(`  ✓ Cleaned up test record #${createdRecord.id}`)

  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> DOCKER PERSISTENCE AUDIT: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> DOCKER PERSISTENCE AUDIT: FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runDockerPersistenceAudit().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
