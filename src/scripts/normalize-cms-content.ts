// @ts-nocheck
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { createClient } from '@libsql/client'
import { FLEET_DATA } from '../data/fleetData'
import { TESTIMONIALS_DATA } from '../data/testimonialsData'
import { FAQ_DATA } from '../data/faqData'
import { GALLERY_DATA } from '../data/routesData'

// Helper: convert plain text paragraphs to Lexical RichText JSON format
function textToLexical(paragraphs: string[]): any {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((para) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            mode: 'normal',
            text: para,
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
      })),
    },
  }
}

async function ensureSqliteColumns() {
  console.log('[Migration] Ensuring SQLite columns exist in payload.db...')
  const dbUrl = process.env.DATABASE_URI || 'file:./data/payload.db'
  const client = createClient({ url: dbUrl })

  // Check columns helper
  const addColumnIfNotExists = async (table: string, column: string, type: string) => {
    try {
      const info = await client.execute(`PRAGMA table_info(${table})`)
      const exists = info.rows.some((row: any) => row.name === column)
      if (!exists) {
        console.log(`[Migration] Adding column ${column} to table ${table}...`)
        await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`)
      }
    } catch (err: any) {
      console.warn(`[Migration] Notice on ${table}.${column}:`, err.message)
    }
  }

  // Fleet columns
  const fleetCols = [
    ['category', 'TEXT'],
    ['tag', 'TEXT'],
    ['seats', 'TEXT'],
    ['configuration', 'TEXT'],
    ['boot_space', 'TEXT'],
    ['ac_type', 'TEXT'],
    ['fuel_type', 'TEXT'],
    ['rate_per_km', 'TEXT'],
    ['local_full_day', 'TEXT'],
    ['image_url', 'TEXT'],
    ['best_for', 'TEXT'],
    ['features', 'TEXT'],
  ]
  for (const [col, type] of fleetCols) {
    await addColumnIfNotExists('fleet', col, type)
  }

  // Gallery columns
  const galleryCols = [
    ['category', 'TEXT'],
    ['image_url', 'TEXT'],
  ]
  for (const [col, type] of galleryCols) {
    await addColumnIfNotExists('gallery', col, type)
  }

  // Testimonials columns
  const testimonialCols = [
    ['trip', 'TEXT'],
    ['location', 'TEXT'],
    ['date', 'TEXT'],
    ['avatar', 'TEXT'],
  ]
  for (const [col, type] of testimonialCols) {
    await addColumnIfNotExists('testimonials', col, type)
  }

  // Drop indexes that Drizzle pushDevSchema might attempt to recreate
  try {
    await client.execute('DROP INDEX IF EXISTS fleet_image_idx')
  } catch (err: any) {}
  try {
    await client.execute('DROP INDEX IF EXISTS gallery_image_idx')
  } catch (err: any) {}

  client.close()
  console.log('[Migration] SQLite columns verified successfully.')
}

async function normalizeCmsContent() {
  console.log('====================================================')
  console.log('   CITYCABS24 CMS CONTENT NORMALIZATION SCRIPT      ')
  console.log('====================================================')

  // Step 1: Backup DB
  const backupDir = path.resolve(process.cwd(), 'backups')
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true })
  const backupFile = path.join(backupDir, `payload-migration-${Date.now()}.db`)
  if (fs.existsSync('./data/payload.db')) {
    fs.copyFileSync('./data/payload.db', backupFile)
    console.log(`[Backup] Safe SQLite snapshot created at: ${backupFile}`)
  }

  // Step 2: Ensure SQLite columns exist
  await ensureSqliteColumns()

  // Step 3: Initialize Payload Local API
  console.log('[Payload] Initializing local API instance...')
  const payload = await getPayload({ config: configPromise })

  // --------------------------------------------------------------------------
  // 1. POPULATE FLEET (6 Vehicles)
  // --------------------------------------------------------------------------
  console.log('\n--- 1. Migrating Fleet Collection ---')
  for (const car of FLEET_DATA) {
    const existing = await payload.find({
      collection: 'fleet',
      where: { name: { equals: car.name } },
      limit: 1,
    })

    const payloadData: any = {
      name: car.name,
      category: car.category,
      tag: car.tag,
      seats: car.seats,
      configuration: car.configuration,
      bootSpace: car.bootSpace,
      luggage: car.luggage,
      acType: car.acType,
      fuelType: car.fuelType,
      ratePerKm: car.ratePerKm,
      localFullDay: car.localFullDay,
      imageUrl: car.image || car.image480 || '',
      bestFor: car.bestFor,
      features: Array.isArray(car.features) ? car.features.join('\n') : '',
      ac: true,
      seating: car.seats,
      baseRate: car.ratePerKm,
    }

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'fleet',
        data: payloadData,
      })
      console.log(`[Fleet] + Created: ${car.name}`)
    } else {
      await payload.update({
        collection: 'fleet',
        id: existing.docs[0].id,
        data: payloadData,
      })
      console.log(`[Fleet] = Updated: ${car.name}`)
    }
  }

  // --------------------------------------------------------------------------
  // 2. POPULATE TESTIMONIALS (5 Reviews)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Migrating Testimonials Collection ---')
  for (const rev of TESTIMONIALS_DATA) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { name: { equals: rev.name } },
      limit: 1,
    })

    const payloadData: any = {
      name: rev.name,
      rating: rev.rating || 5,
      trip: rev.trip,
      location: rev.location,
      date: rev.date,
      avatar: rev.avatar,
      text: rev.text,
    }

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'testimonials',
        data: payloadData,
      })
      console.log(`[Testimonials] + Created: ${rev.name} (${rev.trip})`)
    } else {
      await payload.update({
        collection: 'testimonials',
        id: existing.docs[0].id,
        data: payloadData,
      })
      console.log(`[Testimonials] = Updated: ${rev.name}`)
    }
  }

  // --------------------------------------------------------------------------
  // 3. POPULATE FAQS (7 Items)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Migrating FAQs Collection ---')
  for (const faq of FAQ_DATA) {
    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: faq.question } },
      limit: 1,
    })

    const lexicalAnswer = textToLexical([faq.answer])

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'faqs',
        data: {
          question: faq.question,
          answer: lexicalAnswer,
        },
      })
      console.log(`[FAQs] + Created: "${faq.question.substring(0, 40)}..."`)
    } else {
      await payload.update({
        collection: 'faqs',
        id: existing.docs[0].id,
        data: {
          question: faq.question,
          answer: lexicalAnswer,
        },
      })
      console.log(`[FAQs] = Updated: "${faq.question.substring(0, 40)}..."`)
    }
  }

  // --------------------------------------------------------------------------
  // 4. POPULATE GALLERY (8 Photos)
  // --------------------------------------------------------------------------
  console.log('\n--- 4. Migrating Gallery Collection ---')
  for (const item of GALLERY_DATA) {
    const existing = await payload.find({
      collection: 'gallery',
      where: { title: { equals: item.title } },
      limit: 1,
    })

    const payloadData: any = {
      title: item.title,
      category: item.category,
      imageUrl: item.image,
    }

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'gallery',
        data: payloadData,
      })
      console.log(`[Gallery] + Created: ${item.title} (${item.category})`)
    } else {
      await payload.update({
        collection: 'gallery',
        id: existing.docs[0].id,
        data: payloadData,
      })
      console.log(`[Gallery] = Updated: ${item.title}`)
    }
  }

  // --------------------------------------------------------------------------
  // 5. POPULATE STATIC PAGES (Tours + Policies)
  // --------------------------------------------------------------------------
  console.log('\n--- 5. Migrating Canonical Pages ---')

  const pagesToSeed = [
    {
      title: 'Tour Packages',
      slug: 'tours',
      seo: {
        title: 'Tour Packages from Mumbai | CityCabs24',
        description: 'Explore full-day Mumbai Darshan and outstation tour packages with sanitized cabs and expert chauffeur guides.',
        canonical: 'https://citycabs24.com/tours',
      },
      layout: [
        {
          blockType: 'tourGrid',
          title: 'Handpicked Tour Packages from Mumbai',
        },
        {
          blockType: 'whyChooseUs',
          title: 'Why Choose CityCabs24?',
          subtitle: 'Transparent Pricing, Chauffeurs who act as Guides, 24/7 Support',
        },
        {
          blockType: 'faq',
          title: 'Tour Package FAQs',
        },
        {
          blockType: 'bookingContactForm',
          title: 'Enquire or Book Your Tour Package',
        },
      ],
    },
    {
      title: 'Terms & Conditions',
      slug: 'terms-and-conditions',
      seo: {
        title: 'Terms & Conditions | CityCabs24',
        description: 'Terms and conditions governing taxi hire, package tours, toll/parking policies, and customer guidelines.',
        canonical: 'https://citycabs24.com/terms-and-conditions',
      },
      layout: [
        {
          blockType: 'richText',
          content: textToLexical([
            'Welcome to CityCabs24. By using our website and booking our cab services, you agree to comply with and be bound by the following terms and conditions.',
            '1. Booking & Confirmations: All bookings made via CityCabs24 are subject to vehicle and chauffeur availability. Pick-up times and package durations commence from the scheduled pick-up point.',
            '2. Fares, Tolls & Parking: Package fares cover the base vehicle hire, driver allowance, and fuel. Fastag toll charges and monument/hotel parking fees are payable as per actual government receipts.',
            '3. Passenger Conduct & Safety: Smoking, consumption of alcohol, and carriage of prohibited items are strictly forbidden inside our vehicles.',
            '4. Vehicle Breakdown: In the rare event of a mechanical failure, CityCabs24 will arrange a replacement vehicle within the shortest possible turnaround time.',
          ]),
        },
      ],
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      seo: {
        title: 'Privacy Policy | CityCabs24',
        description: 'Privacy policy and data protection practices for passenger bookings and online enquiries.',
        canonical: 'https://citycabs24.com/privacy-policy',
      },
      layout: [
        {
          blockType: 'richText',
          content: textToLexical([
            'At CityCabs24, we respect your privacy and are committed to protecting the personal information you share with us.',
            '1. Information We Collect: When you request a cab booking or submit an enquiry, we collect your name, phone number, email address, pick-up location, and travel dates to fulfill your service.',
            '2. Use of Information: Your details are used solely to communicate booking confirmations, assign chauffeurs, and provide emergency ride support. We never sell your personal data to third parties.',
            '3. Data Security: All sensitive information is transmitted securely and stored in protected databases.',
            '4. Third-Party Services: We may employ Google Ads and Analytics to understand visitor interactions and optimize paid advertising campaigns.',
          ]),
        },
      ],
    },
    {
      title: 'Refund Policy',
      slug: 'refund-policy',
      seo: {
        title: 'Refund Policy | CityCabs24',
        description: 'Refund terms and processing timeline for eligible ride cancellations.',
        canonical: 'https://citycabs24.com/refund-policy',
      },
      layout: [
        {
          blockType: 'richText',
          content: textToLexical([
            'CityCabs24 aims for complete customer satisfaction. If you are eligible for a refund, our process is transparent and prompt.',
            '1. Eligibility for Refunds: Refunds apply to advance payments made for trips that are cancelled in accordance with our cancellation guidelines or in rare instances of service non-fulfillment.',
            '2. Refund Timeline: Approved refunds are processed back to the original payment method (UPI, bank transfer, or card) within 3 to 5 business days.',
            '3. Disputes: For any queries or assistance, contact our 24/7 support line at +91 9833309061 or mumbaicitycabs24@gmail.com.',
          ]),
        },
      ],
    },
    {
      title: 'Cancellation Policy',
      slug: 'cancellation-policy',
      seo: {
        title: 'Cancellation Policy | CityCabs24',
        description: 'Cancellation policy for Mumbai Darshan, local rentals, and outstation multi-day tours.',
        canonical: 'https://citycabs24.com/cancellation-policy',
      },
      layout: [
        {
          blockType: 'richText',
          content: textToLexical([
            'We offer stress-free cancellation policies designed around customer flexibility.',
            '1. Local & City Sightseeing Trips: For Mumbai Darshan and local city rentals, you can cancel or reschedule up to 6 hours prior to your scheduled pickup time with zero penalty or cancellation fees.',
            '2. Outstation & Multi-Day Tours: For outstation packages (Shirdi, Lonavala, Mahabaleshwar, etc.), cancellations made at least 12 hours before pickup carry no penalty. Cancellations made within 12 hours carry a nominal ₹500 token charge.',
            '3. Driver On-Site Cancellations: If a booking is cancelled after the chauffeur has arrived at your pickup address, a standard cancellation fee of ₹500 is applicable to compensate for driver travel and fuel.',
          ]),
        },
      ],
    },
  ]

  for (const pageItem of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageItem.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'pages',
        data: pageItem,
      })
      console.log(`[Pages] + Created: ${pageItem.title} (/${pageItem.slug})`)
    } else {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: pageItem,
      })
      console.log(`[Pages] = Updated: ${pageItem.title} (/${pageItem.slug})`)
    }
  }

  // --------------------------------------------------------------------------
  // 6. POPULATE GLOBALS (Site Settings, Navigation, Footer)
  // --------------------------------------------------------------------------
  console.log('\n--- 6. Migrating Globals ---')

  // Site Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: 'CityCabs24',
      phone: '9833309061',
      helpPhone: '9833309061',
      email: 'mumbaicitycabs24@gmail.com',
      whatsapp: '919833309061',
    },
  })
  console.log('[Globals] + Site Settings updated.')

  // Navigation
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      links: [
        { label: 'Home', url: '/' },
        { label: 'Mumbai Darshan', url: '/mumbai-darshan' },
        { label: 'Tours', url: '/tours' },
        { label: 'Our Fleet', url: '/#fleet' },
        { label: 'Reviews', url: '/#testimonials' },
        { label: 'Contact', url: '/#booking' },
      ],
    },
  })
  console.log('[Globals] + Navigation links updated.')

  // Footer
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: '© 2026 CityCabs24. All rights reserved. Mumbai, Maharashtra.',
      groups: [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'All Tours', url: '/tours' },
            { label: 'Our Fleet', url: '/#fleet' },
            { label: 'Customer Reviews', url: '/#testimonials' },
            { label: 'Book Cab', url: '/#booking' },
          ],
        },
        {
          title: 'Popular Tours',
          links: [
            { label: 'Mumbai Darshan', url: '/mumbai-darshan' },
            { label: 'Lonavala & Khandala', url: '/lonavala-trip' },
            { label: 'Shirdi Darshan', url: '/shirdi-tour' },
            { label: 'Mahabaleshwar Tour', url: '/mahabaleshwar-sightseeing' },
            { label: 'Alibaug Sightseeing', url: '/alibaug-sightseeing' },
          ],
        },
        {
          title: 'Legal & Policies',
          links: [
            { label: 'Terms & Conditions', url: '/terms-and-conditions' },
            { label: 'Privacy Policy', url: '/privacy-policy' },
            { label: 'Refund Policy', url: '/refund-policy' },
            { label: 'Cancellation Policy', url: '/cancellation-policy' },
          ],
        },
      ],
    },
  })
  console.log('[Globals] + Footer groups updated.')

  // --------------------------------------------------------------------------
  // Summary Audit
  // --------------------------------------------------------------------------
  console.log('\n====================================================')
  console.log('             POST-MIGRATION AUDIT                   ')
  console.log('====================================================')
  const collections = ['fleet', 'gallery', 'testimonials', 'faqs', 'pages', 'tours', 'media', 'bookings']
  for (const col of collections) {
    try {
      const res = await payload.find({ collection: col as any, limit: 0 })
      console.log(`- ${col.padEnd(14)}: ${res.totalDocs} records`)
    } catch (e: any) {
      console.log(`- ${col.padEnd(14)}: Error (${e.message})`)
    }
  }
  console.log('====================================================\n')
}

normalizeCmsContent()
  .then(() => {
    console.log('[Success] CMS Content Normalization completed successfully.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('[Error] CMS Normalization failed:', err)
    process.exit(1)
  })
