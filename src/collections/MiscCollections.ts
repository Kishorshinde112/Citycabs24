import type { CollectionConfig } from 'payload'
import { triggerRevalidation } from '../utils/revalidate'

export const Fleet: CollectionConfig = {
  slug: 'fleet',
  labels: {
    singular: 'Fleet Vehicle',
    plural: 'Fleet',
  },
  admin: {
    group: 'CONTENT',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'seats', 'ratePerKm', 'updatedAt'],
    components: {
      afterListTable: ['@/components/admin/RecordDrawer#RecordDrawer'],
    },
  },
  access: { read: () => true },
  hooks: {
    afterChange: [({ doc }) => { triggerRevalidation(); return doc }],
    afterDelete: [({ doc }) => { triggerRevalidation(); return doc }],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Vehicle Name' },
            { name: 'category', type: 'text', label: 'Category (e.g. Hatchback, Prime Sedan)' },
            { name: 'tag', type: 'text', label: 'Badge Tag (e.g. Budget Friendly, Most Popular)' },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            { name: 'seats', type: 'text', label: 'Seating (e.g. 4 + 1 Passengers)' },
            { name: 'configuration', type: 'text', label: 'Seat Layout' },
            { name: 'bootSpace', type: 'text', label: 'Boot Space' },
            { name: 'luggage', type: 'text', label: 'Luggage Capacity' },
            { name: 'acType', type: 'text', label: 'AC Type' },
            { name: 'fuelType', type: 'text', label: 'Fuel Type' },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            { name: 'ratePerKm', type: 'text', label: 'Rate Per Km' },
            { name: 'localFullDay', type: 'text', label: 'Local Full Day Rate' },
          ],
        },
        {
          label: 'Image',
          fields: [
            { name: 'imageUrl', type: 'text', label: 'Image URL / Path' },
            { name: 'image', type: 'upload', relationTo: 'media', required: false },
          ],
        },
        {
          label: 'Content',
          fields: [
            { name: 'bestFor', type: 'textarea', label: 'Best Suited For' },
            {
              name: 'features',
              type: 'textarea',
              label: 'Key Vehicle Features',
              admin: {
                description: 'Vehicle features (e.g. Dual Air Conditioning, Pushback Seats - one per line)',
              },
            },
          ],
        },
      ],
    },
    // Retain legacy columns for database compatibility
    { name: 'seating', type: 'text', admin: { hidden: true } },
    { name: 'ac', type: 'checkbox', defaultValue: true, admin: { hidden: true } },
    { name: 'baseRate', type: 'text', admin: { hidden: true } },
  ],
}

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Photo',
    plural: 'Gallery',
  },
  admin: {
    group: 'CONTENT',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
    components: {
      afterListTable: ['@/components/admin/RecordDrawer#RecordDrawer'],
    },
  },
  access: { read: () => true },
  hooks: {
    afterChange: [({ doc }) => { triggerRevalidation(); return doc }],
    afterDelete: [({ doc }) => { triggerRevalidation(); return doc }],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Photo Title' },
    { name: 'category', type: 'text', label: 'Category (e.g. Mumbai, Hill Stations, Beaches, Spiritual)' },
    { name: 'imageUrl', type: 'text', label: 'Image URL / Path' },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    group: 'CONTENT',
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'trip', 'date', 'updatedAt'],
    components: {
      afterListTable: ['@/components/admin/RecordDrawer#RecordDrawer'],
    },
  },
  access: { read: () => true },
  hooks: {
    afterChange: [({ doc }) => { triggerRevalidation(); return doc }],
    afterDelete: [({ doc }) => { triggerRevalidation(); return doc }],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Customer Name' },
    {
      name: 'rating',
      type: 'select',
      defaultValue: '5',
      label: 'Rating (1-5 Stars)',
      options: [
        { label: '★★★★★ (5 Stars - Excellent)', value: '5' },
        { label: '★★★★☆ (4 Stars - Very Good)', value: '4' },
        { label: '★★★☆☆ (3 Stars - Good)', value: '3' },
        { label: '★★☆☆☆ (2 Stars - Fair)', value: '2' },
        { label: '★☆☆☆☆ (1 Star - Poor)', value: '1' },
      ],
    },
    { name: 'trip', type: 'text', label: 'Trip Name (e.g. Mumbai Darshan (Full Day))' },
    { name: 'location', type: 'text', label: 'Customer Location (e.g. Bandra, Mumbai)' },
    { name: 'date', type: 'text', label: 'Date (e.g. August 2026)' },
    { name: 'avatar', type: 'text', label: 'Avatar URL' },
    { name: 'text', type: 'textarea', required: true, label: 'Review Text' },
  ],
}

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    group: 'CONTENT',
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    components: {
      afterListTable: ['@/components/admin/RecordDrawer#RecordDrawer'],
    },
  },
  access: { read: () => true },
  hooks: {
    afterChange: [({ doc }) => { triggerRevalidation(); return doc }],
    afterDelete: [({ doc }) => { triggerRevalidation(); return doc }],
  },
  fields: [
    { name: 'question', type: 'text', required: true, label: 'Question' },
    { name: 'answer', type: 'richText', required: true, label: 'Answer' },
  ],
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'SYSTEM',
    useAsTitle: 'source',
  },
  access: { read: () => true },
  fields: [
    { name: 'source', type: 'text', required: true, admin: { description: 'e.g. /mumbai-darshan-cab-service' } },
    { name: 'destination', type: 'text', required: true, admin: { description: 'e.g. /mumbai-darshan' } },
    { name: 'permanent', type: 'checkbox', defaultValue: true },
  ],
}