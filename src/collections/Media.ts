import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'MEDIA',
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/media'),
    imageSizes: [
      {
        name: 'mobile',
        width: 480,
      },
      {
        name: 'tablet',
        width: 768,
      },
      {
        name: 'desktop',
        width: 1280,
      },
    ],
    adminThumbnail: 'mobile',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}