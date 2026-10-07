import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import React from 'react'
import type { Metadata } from 'next'
import BlockRenderer from '../../../components/blocks/BlockRenderer'
import TourPackages from '../../../components/TourPackages'
import WhyChooseUs from '../../../components/WhyChooseUs'
import FaqSection from '../../../components/FaqSection'
import BookingContactForm from '../../../components/BookingContactForm'
import { TOURS_DATA } from '../../../data/toursData'
import { FAQ_DATA } from '../../../data/faqData'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'tours' } },
    })
    const doc = result.docs[0]
    if (doc) {
      return {
        title: doc.seo?.title || `${doc.title} | CityCabs24`,
        description: doc.seo?.description || 'Explore private sightseeing cab tours across Mumbai, Lonavala, Shirdi, Mahabaleshwar, and Maharashtra with expert local driver-guides.',
        alternates: {
          canonical: doc.seo?.canonical || 'https://citycabs24.com/tours',
        },
      }
    }
  } catch (e) {}
  return {
    title: 'All Tour Packages | CityCabs24 Mumbai',
    description: 'Explore private sightseeing cab tours across Mumbai, Lonavala, Shirdi, Mahabaleshwar, and Maharashtra with expert local driver-guides.',
    alternates: {
      canonical: 'https://citycabs24.com/tours',
    },
  }
}

export default async function ToursPage() {
  let doc: any = null
  let tours: any[] = TOURS_DATA
  let faqs: any[] = FAQ_DATA
  const phone = '9833309061'

  try {
    const payload = await getPayload({ config: configPromise })
    const [pageRes, toursRes, faqsRes] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'tours' } },
        depth: 2,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'tours',
        limit: 20,
        depth: 1,
        sort: 'displayOrder',
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'faqs',
        limit: 20,
        depth: 1,
      }).catch(() => ({ docs: [] })),
    ])

    if (pageRes?.docs?.[0]) {
      doc = pageRes.docs[0]
    }

    if (Array.isArray(toursRes.docs) && toursRes.docs.length > 0) {
      tours = toursRes.docs.map((t: any) => {
        const staticTour: any = TOURS_DATA.find((item) => item.slug === t.slug || item.id === t.slug || item.id === t.id) || {}
        const tourDetailsBlock = t.layout?.find((b: any) => b.blockType === 'tourDetails')
        return {
          ...staticTour,
          ...t,
          banner: t.banner || staticTour.banner || tourDetailsBlock?.heroImage || '/assets/tours/mumbai-darshan-banner.webp',
          startingPrice: t.startingPrice || staticTour.startingPrice || '₹2,499',
          category: t.category || staticTour.category || 'City Tour',
          duration: t.duration || staticTour.duration || '1 Day Tour',
          shortDescription: t.shortDescription || tourDetailsBlock?.description || staticTour.shortDescription || '',
        }
      })
    }

    if (Array.isArray(faqsRes.docs) && faqsRes.docs.length > 0) {
      faqs = faqsRes.docs.map((f: any) => {
        let answerText = typeof f.answer === 'string' ? f.answer : ''
        if (!answerText && f.answer?.root?.children) {
          answerText = f.answer.root.children
            .map((n: any) => n.children?.map((c: any) => c.text).join(''))
            .join('\n')
        }
        return {
          question: f.question,
          answer: answerText,
        }
      })
    }
  } catch (e) {}

  if (doc && Array.isArray(doc.layout) && doc.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
        <div className="py-16 text-center bg-black border-b border-zinc-800">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
            Our Tour <span className="text-yellow-400">Packages</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            Handpicked sightseeing packages and outstation getaways from Mumbai with transparent pricing and professional guide-drivers.
          </p>
        </div>
        <BlockRenderer blocks={doc.layout} tours={tours} faqs={faqs} phone={phone} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <div className="py-16 text-center bg-black border-b border-zinc-800">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
          Our Tour <span className="text-yellow-400">Packages</span>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
          Handpicked sightseeing packages and outstation getaways from Mumbai with transparent pricing and professional guide-drivers.
        </p>
      </div>
      <TourPackages tours={tours} showMumbaiOnly={false} />
      <WhyChooseUs />
      <FaqSection faqs={faqs} phone={phone} />
      <BookingContactForm />
    </div>
  )
}
