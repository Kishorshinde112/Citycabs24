import type { CollectionConfig } from 'payload'
import { triggerRevalidation } from '../utils/revalidate'
import {
  HeroBlock,
  RichTextBlock,
  RateTableBlock,
  CTABlock,
  TourGridBlock,
  FleetBlock,
  GalleryBlock,
  TestimonialBlock,
  FAQBlock,
  BookingFormBlock,
  WhyChooseUsBlock,
  AboutBlock,
  BookingContactFormBlock,
  TourDetailsBlock,
} from '../blocks'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: 'Tour Package',
    plural: 'Tour Packages',
  },
  defaultSort: 'displayOrder',
  admin: {
    group: 'CONTENT',
    useAsTitle: 'title',
    defaultColumns: ['id', 'displayOrder', 'title', 'slug', 'updatedAt'],
    components: {
      views: {
        edit: {
          root: {
            Component: '@/components/admin/editors/TourEditor#TourEditor',
          },
        },
      },
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        triggerRevalidation(doc?.slug)
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        triggerRevalidation(doc?.slug)
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content & Sections',
          fields: [
            {
              name: 'title',
              label: 'Tour Package Title',
              type: 'text',
              required: true,
            },
            {
              name: 'layout',
              label: 'Tour Sections & Rate Details',
              type: 'blocks',
              admin: {
                initCollapsed: true,
              },
              blocks: [
                HeroBlock,
                RichTextBlock,
                RateTableBlock,
                CTABlock,
                TourGridBlock,
                FleetBlock,
                GalleryBlock,
                TestimonialBlock,
                FAQBlock,
                BookingFormBlock,
                WhyChooseUsBlock,
                AboutBlock,
                BookingContactFormBlock,
                TourDetailsBlock,
              ],
            },
          ],
        },
        {
          label: 'SEO Metadata',
          fields: [
            {
              name: 'seo',
              label: 'Search Engine Optimization',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', label: 'Meta Title' },
                { name: 'description', type: 'textarea', label: 'Meta Description' },
                { name: 'canonical', type: 'text', label: 'Canonical URL' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startingPrice',
      label: 'Starting Price',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    group: 'CONTENT',
    useAsTitle: 'title',
    defaultColumns: ['id', 'title', 'slug', 'updatedAt'],
    components: {
      views: {
        edit: {
          root: {
            Component: '@/components/admin/editors/PageEditor#PageEditor',
          },
        },
      },
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        triggerRevalidation(doc?.slug === 'home' ? '' : doc?.slug)
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        triggerRevalidation(doc?.slug === 'home' ? '' : doc?.slug)
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'title',
              label: 'Page Title',
              type: 'text',
              required: true,
            },
            {
              name: 'layout',
              label: 'Page Blocks',
              type: 'blocks',
              admin: {
                initCollapsed: true,
              },
              blocks: [
                HeroBlock,
                RichTextBlock,
                RateTableBlock,
                CTABlock,
                TourGridBlock,
                FleetBlock,
                GalleryBlock,
                TestimonialBlock,
                FAQBlock,
                BookingFormBlock,
                WhyChooseUsBlock,
                AboutBlock,
                BookingContactFormBlock,
                TourDetailsBlock,
              ],
            },
          ],
        },
        {
          label: 'SEO Metadata',
          fields: [
            {
              name: 'seo',
              label: 'Search Engine Optimization',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', label: 'Meta Title' },
                { name: 'description', type: 'textarea', label: 'Meta Description' },
                { name: 'canonical', type: 'text', label: 'Canonical URL' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}