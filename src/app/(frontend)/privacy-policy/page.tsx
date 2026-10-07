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
      where: { slug: { equals: 'privacy-policy' } },
    })
    const doc = result.docs[0]
    if (doc) {
      return {
        title: doc.seo?.title || `${doc.title} | CityCabs24`,
        description: doc.seo?.description || 'Read the official privacy policy of CityCabs24 regarding customer data protection and ride safety.',
        alternates: {
          canonical: doc.seo?.canonical || 'https://citycabs24.com/privacy-policy',
        },
      }
    }
  } catch (e) {}
  return {
    title: 'Privacy Policy | CityCabs24',
    description: 'Read the official privacy policy of CityCabs24 regarding customer data protection and ride safety.',
    alternates: {
      canonical: 'https://citycabs24.com/privacy-policy',
    },
  }
}

export default async function PrivacyPolicyPage() {
  let doc: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'privacy-policy' } },
      depth: 2,
    })
    doc = result.docs[0]
  } catch (e) {}

  if (doc && Array.isArray(doc.layout) && doc.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">
          {doc.title || 'Privacy Policy'}
        </h1>
        <BlockRenderer blocks={doc.layout} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400 font-display">Privacy Policy</h1>
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
        <p>At CityCabs24, we respect your privacy and are committed to protecting the personal information you share with us.</p>
        <h2 className="text-xl font-bold text-white mt-6">1. Information We Collect</h2>
        <p>When you request a cab booking or submit an enquiry, we collect your name, phone number, email address, pick-up location, and travel dates to fulfill your service.</p>
        <h2 className="text-xl font-bold text-white mt-6">2. Use of Information</h2>
        <p>Your details are used solely to communicate booking confirmations, assign chauffeurs, and provide emergency ride support. We never sell your personal data to third parties.</p>
        <h2 className="text-xl font-bold text-white mt-6">3. Data Security</h2>
        <p>All sensitive information is encrypted and transmitted securely via industry-standard protocols.</p>
      </div>
    </div>
  )
}
