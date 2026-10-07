import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Bookings } from './collections/Bookings'
import { Tours, Pages } from './collections/PagesAndTours'
import { Fleet, Gallery, Testimonials, FAQs, Redirects } from './collections/MiscCollections'
import { SiteSettings, Navigation, Footer } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import sharp from 'sharp'

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - CityCabs24 Admin',
      icons: '/favicon.png',
      openGraph: {
        images: '/logo.webp',
      },
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
      Nav: '@/components/admin/AdminNav#AdminNav',
      views: {
        dashboard: {
          Component: '@/components/admin/DashboardView#DashboardView',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Tours, Pages, Bookings, Fleet, Gallery, Testimonials, FAQs, Redirects],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CITYCABS24_SECURE_PAYLOAD_SECRET_TOKEN',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/payload.db',
    },
  }),
})