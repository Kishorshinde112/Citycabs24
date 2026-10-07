import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://citycabs24.com'

  let tourDocs: any[] = []
  let pageDocs: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    const tours = await payload.find({
      collection: 'tours',
      limit: 100,
    })
    tourDocs = tours.docs

    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
    })
    pageDocs = pages.docs
  } catch (e) {
    console.warn('Sitemap payload query failed, continuing with static routes', e)
  }

  const tourUrls = tourDocs.map((tour) => ({
    url: `${baseUrl}/${tour.slug}`,
    lastModified: tour.updatedAt ? new Date(tour.updatedAt) : undefined,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const pageUrls = pageDocs
    .filter((page) => page.slug && page.slug !== 'home')
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  // Core indexable public routes
  const corePages = [
    {
      url: `${baseUrl}`,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Deduplicate and filter
  const seen = new Set<string>()
  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const entry of [...corePages, ...tourUrls, ...pageUrls]) {
    if (!seen.has(entry.url)) {
      seen.add(entry.url)
      sitemapEntries.push(entry)
    }
  }

  return sitemapEntries
}