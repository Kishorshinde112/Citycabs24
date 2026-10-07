import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function createAdmins() {
  const payload = await getPayload({ config: configPromise })
  const users = [
    { email: 'mumbaicitycabs24@gmail.com', password: 'Shahrukh@123', name: 'Shahrukh' },
    { email: 'citytourcabs8@gmail.com', password: 'Shahrukh@123', name: 'Shahrukh' },
  ]

  for (const u of users) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: u.email } },
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: { password: u.password, role: 'admin', name: u.name },
      })
      console.log('✓ Updated admin:', u.email)
    } else {
      await payload.create({
        collection: 'users',
        data: { email: u.email, password: u.password, name: u.name, role: 'admin' },
      })
      console.log('✓ Created admin:', u.email)
    }
  }
  process.exit(0)
}

createAdmins().catch((err) => {
  console.error(err)
  process.exit(1)
})
