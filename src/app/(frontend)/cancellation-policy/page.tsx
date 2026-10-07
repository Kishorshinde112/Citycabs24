import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import React from 'react'
import type { Metadata } from 'next'
import BlockRenderer from '../../../components/blocks/BlockRenderer'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'cancellation-policy' } },
    })
    const doc = result.docs[0]
    if (doc) {
      return {
        title: doc.seo?.title || `${doc.title} | CityCabs24`,
        description: doc.seo?.description || 'Read the official cancellation and rescheduling policy for CityCabs24 cab bookings.',
        alternates: {
          canonical: doc.seo?.canonical || 'https://citycabs24.com/cancellation-policy',
        },
      }
    }
  } catch (e) {}
  return {
    title: 'Cancellation Policy | CityCabs24',
    description: 'Read the official cancellation and rescheduling policy for CityCabs24 cab bookings.',
    alternates: {
      canonical: 'https://citycabs24.com/cancellation-policy',
    },
  }
}

export default async function CancellationPolicyPage() {
  let doc: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'cancellation-policy' } },
      depth: 2,
    })
    doc = result.docs[0]
  } catch (e) {}

  if (doc && Array.isArray(doc.layout) && doc.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">
          {doc.title || 'Cancellation Policy'}
        </h1>
        <BlockRenderer blocks={doc.layout} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">Cancellation Policy</h1>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
        <p>We offer stress-free cancellation policies designed around customer flexibility.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Local & City Sightseeing Trips</h2>
        <p>For Mumbai Darshan and local city rentals, you can cancel or reschedule up to 6 hours prior to your scheduled pickup time with zero penalty or cancellation fees.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Outstation & Multi-Day Tours</h2>
        <p>For outstation packages (Shirdi, Lonavala, Mahabaleshwar, etc.), cancellations made at least 12 hours before pickup carry no penalty. Cancellations made within 12 hours carry a nominal ₹500 token charge.</p>
        <h2 className="text-xl font-bold text-white mt-6">3. Driver On-Site Cancellations</h2>
        <p>If a booking is cancelled after the chauffeur has arrived at your pickup address, a standard cancellation fee of ₹500 is applicable to compensate for driver travel and fuel.</p>
      </div>
    </div>
  )
}
