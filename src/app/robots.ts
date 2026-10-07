import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/booking-confirmed', '/enquiry-received', '/enquiry-confirmed'],
    },
    sitemap: 'https://citycabs24.com/sitemap.xml',
  }
}