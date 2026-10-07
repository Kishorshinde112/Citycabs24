import { getPayload } from 'payload'
import configPromise from '../payload.config'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

async function runSecurityAuditAndRotation() {
  console.log('====================================================')
  console.log('PART 6: SECURITY AUDIT & ADMIN PASSWORD ROTATION')
  console.log('====================================================\n')

  let allPassed = true

  // 1. Password Rotation
  console.log('--- 1. Rotating Admin Password via Payload API ---')
  const payload = await getPayload({ config: configPromise })
  const usersRes = await payload.find({
    collection: 'users',
    where: {
      email: { in: ['mumbaicitycabs24@gmail.com', 'citytourcabs8@gmail.com'] },
    },
  })

  // Generate strong 24-character random password
  const newSecurePassword = crypto.randomBytes(18).toString('base64').replace(/[^a-zA-Z0-9]/g, 'X') + '!9'

  for (const user of usersRes.docs) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newSecurePassword,
      },
    })
    console.log(`  ✓ Successfully rotated password for admin user: ${user.email} (ID: #${user.id})`)
  }

  // Store securely in a gitignored local file
  const credsPath = path.resolve(process.cwd(), 'data', 'ADMIN_CREDENTIALS_SECURE.txt')
  fs.writeFileSync(
    credsPath,
    `CityCabs24 Admin Production Credentials (ROTATED)\n` +
    `Generated At: ${new Date().toISOString()}\n` +
    `Emails: mumbaicitycabs24@gmail.com, citytourcabs8@gmail.com\n` +
    `Password: ${newSecurePassword}\n\n` +
    `NOTE: This file is in /data/ which is strictly ignored by git.\n`
  )
  console.log(`  ✓ Credentials saved to gitignored local file: data/ADMIN_CREDENTIALS_SECURE.txt`)
  console.log(`  ✓ PASSWORD ROTATION COMPLETE (value excluded from reports per directive).`)

  // 2. Secret Scan
  console.log('\n--- 2. Auditing Repository for Exposed Secrets ---')
  const sensitivePatterns = [
    /Shahrukh@123/g,
    /ghp_[a-zA-Z0-9]{36}/g,
    /AIza[0-9A-Za-z-_]{35}/g,
  ]

  const filesToCheck = [
    'src/payload.config.ts',
    'src/collections/Bookings.ts',
    'src/collections/Users.ts',
    'package.json',
    'docker-compose.yml',
    'Dockerfile',
    '.env.example',
  ]

  let leakedSecretsCount = 0
  for (const file of filesToCheck) {
    const fullPath = path.resolve(process.cwd(), file)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      for (const pattern of sensitivePatterns) {
        if (pattern.test(content)) {
          console.error(`  ✗ Sensitive pattern found in ${file}!`)
          leakedSecretsCount++
          allPassed = false
        }
      }
    }
  }

  if (leakedSecretsCount === 0) {
    console.log('  ✓ Secret scan clean: No hardcoded production passwords or API tokens found in tracked core files!')
  }

  console.log('\n====================================================')
  if (allPassed) {
    console.log('>>> SECURITY AUDIT & ROTATION: ALL TESTS PASSED (PASS) <<<')
  } else {
    console.log('>>> SECURITY AUDIT & ROTATION: FAILED (FAIL) <<<')
  }
  console.log('====================================================')
  process.exit(allPassed ? 0 : 1)
}

runSecurityAuditAndRotation().catch((err) => {
  console.error('Audit fatal error:', err)
  process.exit(1)
})
