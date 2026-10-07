import { getPayload } from 'payload'
import configPromise from '../payload.config'

const CANONICAL_ORDER: { slug: string; title: string; order: number }[] = [
  { slug: 'mumbai-darshan', title: 'Mumbai Darshan', order: 1 },
  { slug: 'lonavala-trip', title: 'Lonavala Trip', order: 2 },
  { slug: 'alibaug-sightseeing', title: 'Alibaug Sightseeing', order: 3 },
  { slug: 'matheran-sightseeing', title: 'Matheran Sightseeing', order: 4 },
  { slug: 'shirdi-tour', title: 'Shirdi Tour', order: 5 },
  { slug: 'mahabaleshwar-sightseeing', title: 'Mahabaleshwar Sightseeing', order: 6 },
  { slug: 'igatpuri-tour', title: 'Igatpuri Tour', order: 7 },
  { slug: 'ashtavinayak', title: 'Ashtavinayak', order: 8 },
  { slug: '3-jyotirlinga-in-maharashtra', title: '3 Jyotirlinga in Maharashtra', order: 9 },
  { slug: 'konkan-darshan', title: 'Konkan Darshan', order: 10 },
]

async function normalizeTourDisplayOrder() {
  console.log('=== Normalizing Tour Package Display Order ===\n')
  const payload = await getPayload({ config: configPromise })

  const currentTours = await payload.find({
    collection: 'tours',
    limit: 100,
    sort: 'id',
  })

  console.log('--- Current Tour Records Before Normalization ---')
  console.table(
    currentTours.docs.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      displayOrder: t.displayOrder,
    }))
  )

  for (const item of CANONICAL_ORDER) {
    const matched = currentTours.docs.find((t) => t.slug === item.slug)
    if (matched) {
      if (matched.displayOrder !== item.order) {
        await payload.update({
          collection: 'tours',
          id: matched.id,
          data: {
            displayOrder: item.order,
          },
        })
        console.log(`✓ Updated "${matched.title}" (ID: #${matched.id}) displayOrder: ${matched.displayOrder} -> ${item.order}`)
      } else {
        console.log(`  "${matched.title}" (ID: #${matched.id}) already displayOrder: ${item.order}`)
      }
    } else {
      console.warn(`! Warning: Tour with slug "${item.slug}" not found in database!`)
    }
  }

  const normalizedTours = await payload.find({
    collection: 'tours',
    limit: 100,
    sort: 'displayOrder',
  })

  console.log('\n--- Tour Records After Normalization (Sorted by displayOrder ASC) ---')
  console.table(
    normalizedTours.docs.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      displayOrder: t.displayOrder,
    }))
  )

  console.log('\n=== Normalization Complete ===')
}

normalizeTourDisplayOrder()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Normalization error:', err)
    process.exit(1)
  })
