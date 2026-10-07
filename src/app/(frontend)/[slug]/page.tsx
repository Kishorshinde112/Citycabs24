import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import React from 'react'
import type { Metadata } from 'next'
import BlockRenderer from '../../../components/blocks/BlockRenderer'

export const revalidate = 3600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  if (slug === 'admin' || slug === 'api') {
    return {}
  }
  const payload = await getPayload({ config: configPromise })

  // Try to find a Tour first
  const tourResult = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
  })

  let doc: any = tourResult.docs[0]

  // If no Tour, try Page
  if (!doc) {
    const pageResult = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
    })
    doc = pageResult.docs[0]
  }

  if (!doc) {
    return { title: 'Page Not Found' }
  }

  return {
    title: doc.seo?.title || doc.title,
    description: doc.seo?.description || '',
    alternates: {
      canonical: doc.seo?.canonical || `https://citycabs24.com/${slug}`,
    },
  }
}

export default async function SlugPage({ params }: Args) {
  const { slug = '' } = await params
  if (slug === 'admin' || slug === 'api') {
    notFound()
  }
  const payload = await getPayload({ config: configPromise })

  // Try to find a Tour first
  const tourResult = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  let doc: any = tourResult.docs[0]

  // If no Tour, try Page
  if (!doc) {
    const pageResult = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      depth: 2,
    })
    doc = pageResult.docs[0]
  }

  if (!doc) {
    notFound()
  }

  return (
    <div>
      <BlockRenderer blocks={doc.layout || []} phone="9833309061" />
    </div>
  )
}