import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Main Headline',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle / Tagline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Background / Hero Image',
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text / Content Section',
    plural: 'Rich Text Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Article / Legal Content',
    },
  ],
}

export const RateTableBlock: Block = {
  slug: 'rateTable',
  labels: {
    singular: 'Rate Table',
    plural: 'Rate Tables',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Table Heading',
    },
    {
      name: 'rates',
      type: 'array',
      label: 'Vehicle Rates',
      admin: {
        initCollapsed: true,
      },
      fields: [
        { name: 'carType', type: 'text', required: true, label: 'Car Type' },
        { name: 'seating', type: 'text', label: 'Seating' },
        { name: 'ac', type: 'checkbox', defaultValue: true, label: 'Air Conditioned' },
        { name: 'rate', type: 'text', required: true, label: 'Fare / Rate' },
        { name: 'perKm', type: 'text', label: 'Extra Per Km' },
        { name: 'tollParking', type: 'text', label: 'Toll & Parking Policy' },
      ],
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action Banner',
    plural: 'Call to Action Banners',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Banner Headline',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Label',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Primary (Amber/Yellow)', value: 'primary' },
        { label: 'Secondary (Dark Zinc)', value: 'secondary' },
      ],
      defaultValue: 'primary',
      label: 'Visual Theme',
    },
  ],
}

export const TourGridBlock: Block = {
  slug: 'tourGrid',
  labels: {
    singular: 'Tour Packages Grid',
    plural: 'Tour Packages Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'tours',
      type: 'relationship',
      relationTo: 'tours',
      hasMany: true,
      label: 'Featured Tours (Leave empty to show all tours)',
    },
  ],
}

export const FleetBlock: Block = {
  slug: 'fleet',
  labels: {
    singular: 'Fleet / Cabs Section',
    plural: 'Fleet Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: Our Cabs Gallery)',
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Photo Gallery Section',
    plural: 'Photo Gallery Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: Memories from Our Tours)',
    },
  ],
}

export const TestimonialBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Customer Testimonials Section',
    plural: 'Customer Testimonial Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: What Our Customers Say)',
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Accordion Section',
    plural: 'FAQ Accordion Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: Frequently Asked Questions)',
    },
  ],
}

export const BookingFormBlock: Block = {
  slug: 'bookingForm',
  labels: {
    singular: 'Quick Booking Form',
    plural: 'Quick Booking Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Form Heading',
    },
  ],
}

export const WhyChooseUsBlock: Block = {
  slug: 'whyChooseUs',
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: Why Choose CityCabs24?)',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
  ],
}

export const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'About Us Section',
    plural: 'About Us Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: About CityCabs24)',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
  ],
}

export const BookingContactFormBlock: Block = {
  slug: 'bookingContactForm',
  labels: {
    singular: 'Contact & Booking Strip',
    plural: 'Contact & Booking Strips',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading (Default: Book Your Cab or Contact Us)',
    },
  ],
}

export const TourDetailsBlock: Block = {
  slug: 'tourDetails',
  labels: {
    singular: 'Tour Package Details & Rates',
    plural: 'Tour Package Details & Rates',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'tourName', type: 'text', label: 'Tour Display Name' },
            { name: 'subtitle', type: 'text', label: 'Subtitle / Tagline' },
            { name: 'heroImage', type: 'text', label: 'Hero Image URL / Path' },
            { name: 'description', type: 'textarea', label: 'Tour Overview Description' },
            { name: 'tripType', type: 'text', label: 'Trip Type (for booking modal)' },
          ],
        },
        {
          label: 'Attractions',
          fields: [
            { name: 'attractionTitle', type: 'text', label: 'Attractions Section Title' },
            {
              name: 'attractions',
              label: 'Sightseeing Spots / Attractions',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                { name: 'emoji', type: 'text', label: 'Icon / Emoji' },
                { name: 'name', type: 'text', required: true, label: 'Spot Name' },
                { name: 'desc', type: 'text', label: 'Short Description' },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Rates',
          fields: [
            {
              name: 'rateColumns',
              label: 'Custom Column Headers',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [{ name: 'colName', type: 'text', required: true, label: 'Column Header' }],
            },
            {
              name: 'rates',
              label: 'Vehicle Pricing Grid',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                { name: 'vehicle', type: 'text', required: true, label: 'Vehicle Type' },
                { name: 'h8', type: 'text', label: '8 Hr / 80 Km' },
                { name: 'h10', type: 'text', label: '10 Hr / 100 Km' },
                { name: 'h12', type: 'text', label: '12 Hr / 120 Km' },
                { name: 'extra', type: 'text', label: 'Extra Rate' },
                { name: 'col1', type: 'text', label: 'Custom Col 1' },
                { name: 'col2', type: 'text', label: 'Custom Col 2' },
              ],
            },
            { name: 'tempoTraveller13Rate', type: 'text', label: 'Tempo Traveller 13-Seater Rate' },
            { name: 'tempoTraveller17Rate', type: 'text', label: 'Tempo Traveller 17-Seater Rate' },
            { name: 'coverageDetails', type: 'textarea', label: 'Coverage Details (Hours vs Spots)' },
          ],
        },
        {
          label: 'Rules & Guidelines',
          fields: [
            {
              name: 'rules',
              label: 'Important Tour Rules & Inclusions',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [{ name: 'text', type: 'text', required: true, label: 'Rule Item' }],
            },
          ],
        },
      ],
    },
  ],
}