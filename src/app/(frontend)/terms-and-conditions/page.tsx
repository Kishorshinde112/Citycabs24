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
      where: { slug: { equals: 'terms-and-conditions' } },
    })
    const doc = result.docs[0]
    if (doc) {
      return {
        title: doc.seo?.title || `${doc.title} | CityCabs24`,
        description: doc.seo?.description || 'Read the official terms and conditions for booking private cabs and tours with CityCabs24.',
        alternates: {
          canonical: doc.seo?.canonical || 'https://citycabs24.com/terms-and-conditions',
        },
      }
    }
  } catch (e) {}
  return {
    title: 'Terms & Conditions | CityCabs24',
    description: 'Read the official terms and conditions for booking private cabs and tours with CityCabs24.',
    alternates: {
      canonical: 'https://citycabs24.com/terms-and-conditions',
    },
  }
}

export default async function TermsPage() {
  let doc: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'terms-and-conditions' } },
      depth: 2,
    })
    doc = result.docs[0]
  } catch (e) {}

  if (doc && Array.isArray(doc.layout) && doc.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">
          {doc.title || 'Terms & Conditions'}
        </h1>
        <BlockRenderer blocks={doc.layout} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">Terms & Conditions</h1>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
        <p>Welcome to CityCabs24. By using our website and booking our cab services, you agree to comply with and be bound by the following terms and conditions.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Booking & Confirmations</h2>
        <p>All bookings made via CityCabs24 are subject to vehicle and chauffeur availability. Pick-up times and package durations commence from the scheduled pick-up point.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Fares, Tolls & Parking</h2>
        <p>Package fares cover the base vehicle hire, driver allowance, and fuel. Fastag toll charges and monument/hotel parking fees are payable as per actual receipts.</p>
        <h2 className="text-xl font-bold text-white mt-6">3. Passenger Conduct & Safety</h2>
        <p>Smoking, consumption of alcohol, and carriage of prohibited items are strictly forbidden inside our vehicles.</p>
      </div>
    </div>
  )
}
