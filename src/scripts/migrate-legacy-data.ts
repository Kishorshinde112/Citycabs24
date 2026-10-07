import { getPayload } from 'payload'
import configPromise from '../payload.config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Dynamic imports to bypass TS checks for legacy JS files
const loadLegacyData = async () => {
  const { TOURS_DATA } = await import('../../src_legacy/data/toursData.js')
  return { TOURS_DATA }
}

async function runMigration() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  const { TOURS_DATA } = await loadLegacyData()

  console.log('Migrating Tours...')
  for (const tour of TOURS_DATA) {
    const existing = await payload.find({
      collection: 'tours',
      where: { slug: { equals: tour.slug } },
    })

    if (existing.totalDocs > 0) {
      console.log(`Tour ${tour.slug} already exists. Skipping.`)
      continue
    }

    console.log(`Creating Tour: ${tour.slug}`)

    // Mapping legacy tour structure to Payload layout blocks
    const layout = [
      {
        blockType: 'hero',
        title: tour.title,
        subtitle: tour.tagline,
        // Assuming we will manually re-upload media, or we can use placeholder IDs for now
        // For a full automated script, we would need to upload local files via payload API.
        // As a simplification for the first run, we'll skip image relation for now or use a placeholder.
      },
      // Using RichText blocks to hold the static HTML-like content
      {
        blockType: 'richText',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: tour.shortDescription || '',
                    version: 1,
                  },
                ],
              },
            ],
          },
        },
      },
    ]

    await payload.create({
      collection: 'tours',
      data: {
        title: tour.title,
        slug: tour.slug,
        displayOrder: 100,
        layout: layout as any,
        seo: {
          title: tour.title + ' | CityCabs24',
          description: tour.shortDescription,
        },
      },
    })
  }

  console.log('Migration complete.')
  process.exit(0)
}

runMigration().catch(console.error)