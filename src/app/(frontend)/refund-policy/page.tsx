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
      where: { slug: { equals: 'refund-policy' } },
    })
    const doc = result.docs[0]
    if (doc) {
      return {
        title: doc.seo?.title || `${doc.title} | CityCabs24`,
        description: doc.seo?.description || 'Read the official refund policy of CityCabs24 regarding transparent trip refunds and payment security.',
        alternates: {
          canonical: doc.seo?.canonical || 'https://citycabs24.com/refund-policy',
        },
      }
    }
  } catch (e) {}
  return {
    title: 'Refund Policy | CityCabs24',
    description: 'Read the official refund policy of CityCabs24 regarding transparent trip refunds and payment security.',
    alternates: {
      canonical: 'https://citycabs24.com/refund-policy',
    },
  }
}

export default async function RefundPolicyPage() {
  let doc: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'refund-policy' } },
      depth: 2,
    })
    doc = result.docs[0]
  } catch (e) {}

  if (doc && Array.isArray(doc.layout) && doc.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">
          {doc.title || 'Refund Policy'}
        </h1>
        <BlockRenderer blocks={doc.layout} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">Refund Policy</h1>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
        <p>CityCabs24 aims for complete customer satisfaction. If you are eligible for a refund, our process is transparent and prompt.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Eligibility for Refunds</h2>
        <p>Refunds apply to advance payments made for trips that are cancelled in accordance with our cancellation guidelines or in rare instances of service non-fulfillment.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Refund Timeline</h2>
        <p>Approved refunds are processed back to the original payment method (UPI, bank transfer, or card) within 3 to 5 business days.</p>
        <h2 className="text-xl font-bold text-white mt-6">3. Disputes</h2>
        <p>For any queries or assistance, contact our 24/7 support line at +91 9833309061 or mumbaicitycabs24@gmail.com.</p>
      </div>
    </div>
  )
}
