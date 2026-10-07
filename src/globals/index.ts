import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Settings',
  admin: {
    group: 'SETTINGS',
  },
  access: { read: () => true },
  fields: [
    { name: 'businessName', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'helpPhone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'whatsapp', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'SETTINGS',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'SETTINGS',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'groups',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'copyright', type: 'text' },
  ],
}