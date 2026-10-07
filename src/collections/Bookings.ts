import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    group: 'LEADS',
    useAsTitle: 'name',
    defaultColumns: ['id', 'leadType', 'name', 'phone', 'actions', 'route', 'vehicle', 'date', 'status', 'createdAt'],
    listSearchableFields: ['name', 'phone', 'route', 'email'],
    components: {
      afterListTable: ['@/components/admin/RecordDrawer#RecordDrawer'],
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // Admins and Editors can read
    create: () => true, // Public can create
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'leadType',
      label: 'Submission Type',
      type: 'select',
      options: [
        { label: 'Booking', value: 'booking' },
        { label: 'Quick Enquiry', value: 'quick_enquiry' },
      ],
      defaultValue: 'booking',
      admin: {
        components: {
          Cell: '@/components/admin/cells/LeadTypeCell#LeadTypeCell',
        },
      },
    },
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      admin: {
        components: {
          Cell: '@/components/admin/cells/PhoneCell#PhoneCell',
        },
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/admin/cells/LeadActionsCell#LeadActionsCell',
        },
      },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'text',
      admin: {
        condition: (data) => data?.leadType !== 'quick_enquiry',
      },
    },
    {
      name: 'route',
      label: 'Destination / Tour',
      type: 'text',
    },
    {
      name: 'vehicle',
      label: 'Car Type / Vehicle',
      type: 'text',
      admin: {
        condition: (data) => data?.leadType !== 'quick_enquiry',
      },
    },
    {
      name: 'date',
      label: 'Travel Date',
      type: 'text',
    },
    {
      name: 'status',
      label: 'Lead Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
        components: {
          Cell: '@/components/admin/cells/StatusCell#StatusCell',
        },
      },
    },
    {
      name: 'gclid',
      label: 'Google Click ID (GCLID)',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'utm_source',
      label: 'UTM Source',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // STRICT SAFETY: Lead notifications dispatch ONLY on public submission creation, NEVER on admin edits
        if (operation === 'create') {
          // 1. Dispatch email notification ONLY to mumbaicitycabs24@gmail.com
          try {
            if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
              const nodemailer = await import('nodemailer')
              const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                },
              })

              await transporter.sendMail({
                from: `"CityCabs24 Leads" <${process.env.SMTP_USER}>`,
                to: 'mumbaicitycabs24@gmail.com',
                subject: `New Lead: ${doc.leadType === 'quick_enquiry' ? 'Quick Enquiry' : 'Booking'} - ${doc.name} (${doc.phone})`,
                text: [
                  `Name: ${doc.name}`,
                  `Phone: ${doc.phone}`,
                  `Email: ${doc.email || 'N/A'}`,
                  `Route: ${doc.route || 'N/A'}`,
                  `Vehicle: ${doc.vehicle || 'N/A'}`,
                  `Date: ${doc.date || 'N/A'}`,
                  `Lead Type: ${doc.leadType || 'Booking'}`,
                  `GCLID: ${doc.gclid || 'N/A'}`,
                  `UTM Source: ${doc.utm_source || 'N/A'}`,
                ].join('\n'),
              })
            }
          } catch (mailError) {
            console.error('Nodemailer lead dispatch error:', mailError)
          }

          // 2. Trigger n8n webhook
          try {
            await fetch('http://n8n:5678/webhook/citycabs24-lead', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(doc),
            }).catch(() => {
              // Ignore n8n local errors
            })
          } catch (e) {
            // Silently ignore webhook unreachable
          }
        }
      },
    ],
  },
}