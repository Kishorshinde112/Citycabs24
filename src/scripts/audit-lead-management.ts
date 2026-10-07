import { normalizeIndianPhone } from '../components/admin/cells/LeadActionsCell'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function runLeadManagementAudit() {
  console.log('====================================================')
  console.log('PART 1: LEAD MANAGEMENT & IN PROGRESS STATUS AUDIT')
  console.log('====================================================\n')

  let allPassed = true

  // 1. Phone Normalization Tests
  console.log('--- 1. Testing Indian Phone Normalization ---')
  const testCases = [
    { input: '9876543210', expectedTel: '+919876543210', expectedWA: '919876543210' },
    { input: '+919876543210', expectedTel: '+919876543210', expectedWA: '919876543210' },
    { input: '+91 98765-43210', expectedTel: '+919876543210', expectedWA: '919876543210' },
    { input: '919876543210', expectedTel: '+919876543210', expectedWA: '919876543210' },
    { input: '09876543210', expectedTel: '+919876543210', expectedWA: '919876543210' },
  ]

  for (const tc of testCases) {
    const res = normalizeIndianPhone(tc.input)
    const passedTel = res.telNumber === tc.expectedTel
    const passedWA = res.whatsappNumber === tc.expectedWA
    if (passedTel && passedWA) {
      console.log(`  ✓ Normalization for "${tc.input}": tel=${res.telNumber}, wa=${res.whatsappNumber}`)
    } else {
      console.error(`  ✗ FAIL for "${tc.input}": got tel=${res.telNumber}, wa=${res.whatsappNumber}`)
      allPassed = false
    }
  }

  // 2. Database Schema & Lead Status Options
  console.log('\n--- 2. Testing Payload Bookings Schema & Status Options ---')
  const payload = await getPayload({ config: configPromise })
  const bookingsCollection = payload.config.collections.find((c) => c.slug === 'bookings')

  if (!bookingsCollection) {
    console.error('  ✗ Bookings collection not found in config!')
    process.exit(1)
  }

  const statusField = bookingsCollection.fields.find((f: any) => f.name === 'status') as any
  const statusOptions = statusField?.options?.map((o: any) => (typeof o === 'string' ? o : o.value)) || []
  console.log(`  Configured status options: ${JSON.stringify(statusOptions)}`)

  const requiredStatuses = ['pending', 'in_progress', 'confirmed', 'completed', 'cancelled']
  const hasAllStatuses = requiredStatuses.every((s) => statusOptions.includes(s))

  if (hasAllStatuses) {
    console.log('  ✓ All required statuses present including "in_progress"!')
  } else {
    console.error(`  ✗ Missing required status options: ${requiredStatuses.filter((s) => !statusOptions.includes(s))}`)
    allPassed = false
  }

  // 3. Create a Test Lead and Transition Statuses
  console.log('\n--- 3. Testing Lead Creation & Status Transitions ---')
  const testLead = await payload.create({
    collection: 'bookings',
    data: {
      name: 'Audit Lead Tester',
      phone: '9876543210',
      route: 'Mumbai Darshan Audit Test',
      leadType: 'booking',
      status: 'pending',
    },
  })
  console.log(`  ✓ Created test lead #${testLead.id} with status: ${testLead.status}`)

  // Transition to in_progress
  console.log('  Updating status: pending -> in_progress...')
  const updated1 = await payload.update({
    collection: 'bookings',
    id: testLead.id,
    data: {
      status: 'in_progress',
    },
  })
  if ((updated1 as any).status === 'in_progress') {
    console.log(`  ✓ Status updated to in_progress successfully!`)
  } else {
    console.error(`  ✗ Failed to update status: got ${(updated1 as any).status}`)
    allPassed = false
  }

  // Filter query test for in_progress
  console.log('  Querying leads filtered by status="in_progress"...')
  const inProgressQuery = await payload.find({
    collection: 'bookings',
    where: {
      status: { equals: 'in_progress' },
    },
  })
  const foundInFilter = inProgressQuery.docs.some((d) => d.id === testLead.id)
  if (foundInFilter) {
    console.log(`  ✓ Server-side filter successfully found lead #${testLead.id} with status=in_progress!`)
  } else {
    console.error(`  ✗ Filter failed to find lead #${testLead.id}`)
    allPassed = false
  }

  // Transition to confirmed
  console.log('  Updating status: in_progress -> confirmed...')
  const updated2 = await payload.update({
    collection: 'bookings',
    id: testLead.id,
    data: {
      status: 'confirmed',
    },
  })
  if ((updated2 as any).status === 'confirmed') {
    console.log(`  ✓ Status updated to confirmed successfully!`)
  } else {
    console.error(`  ✗ Failed to update status: got ${(updated2 as any).status}`)
    allPassed = false
  }

  // Clean up test lead
  console.log('  Cleaning up test lead...')
  await payload.delete({
    collection: 'bookings',
    id: testLead.id,
  })
  console.log(`  ✓ Deleted test lead #${testLead.id}`)

  // 4. Verification Summary
  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> LEAD MANAGEMENT AUDIT: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> LEAD MANAGEMENT AUDIT: ONE OR MORE TESTS FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runLeadManagementAudit().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
