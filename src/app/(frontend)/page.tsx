import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import React from 'react'
import BlockRenderer from '../../components/blocks/BlockRenderer'
import Hero from '../../components/Hero'
import TourPackages from '../../components/TourPackages'
import WhyChooseUs from '../../components/WhyChooseUs'
import FleetSection from '../../components/FleetSection'
import Testimonials from '../../components/Testimonials'
import GallerySection from '../../components/GallerySection'
import AboutSection from '../../components/AboutSection'
import FaqSection from '../../components/FaqSection'
import BookingContactForm from '../../components/BookingContactForm'
import { TOURS_DATA } from '../../data/toursData'
import { FLEET_DATA } from '../../data/fleetData'
import { GALLERY_DATA } from '../../data/routesData'
import { TESTIMONIALS_DATA } from '../../data/testimonialsData'
import { FAQ_DATA } from '../../data/faqData'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'CityCabs24 - Best Taxi Service in Mumbai | Outstation & Sightseeing Cabs',
  description: 'Book reliable outstation and local cabs in Mumbai with CityCabs24. Affordable fares, clean air-conditioned vehicles, professional drivers, and 24/7 service.',
  alternates: {
    canonical: 'https://citycabs24.com',
  },
  openGraph: {
    title: 'CityCabs24 - Best Taxi Service in Mumbai',
    description: 'Book reliable outstation and local cabs in Mumbai with CityCabs24.',
    url: 'https://citycabs24.com',
    type: 'website',
  },
}

export default async function HomePage() {
  let page: any = null
  let tours: any[] = TOURS_DATA
  let fleet: any[] = FLEET_DATA
  let gallery: any[] = GALLERY_DATA
  let testimonials: any[] = TESTIMONIALS_DATA
  let faqs: any[] = FAQ_DATA
  const phone = '9833309061'

  try {
    const payload = await getPayload({ config: configPromise })
    const [pageRes, toursRes, fleetRes, galleryRes, testimonialsRes, faqsRes] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        depth: 2,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'tours',
        limit: 20,
        depth: 1,
        sort: 'displayOrder',
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'fleet',
        limit: 20,
        depth: 1,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'gallery',
        limit: 20,
        depth: 1,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'testimonials',
        limit: 20,
        depth: 1,
      }).catch(() => ({ docs: [] })),
      payload.find({
        collection: 'faqs',
        limit: 20,
        depth: 1,
      }).catch(() => ({ docs: [] })),
    ])

    if (pageRes.docs[0]) {
      page = pageRes.docs[0]
    }

    if (Array.isArray(toursRes.docs) && toursRes.docs.length > 0) {
      tours = toursRes.docs.map((doc: any) => {
        const staticTour: any = TOURS_DATA.find((t) => t.slug === doc.slug || t.id === doc.slug || t.id === doc.id) || {}
        const tourDetailsBlock = doc.layout?.find((b: any) => b.blockType === 'tourDetails')
        return {
          ...staticTour,
          ...doc,
          banner: doc.banner || staticTour.banner || tourDetailsBlock?.heroImage || '/assets/tours/mumbai-darshan-banner.webp',
          startingPrice: doc.startingPrice || staticTour.startingPrice || '₹2,499',
          category: doc.category || staticTour.category || 'City Tour',
          duration: doc.duration || staticTour.duration || '1 Day Tour',
          shortDescription: doc.shortDescription || tourDetailsBlock?.description || staticTour.shortDescription || '',
        }
      })
    }

    if (Array.isArray(fleetRes.docs) && fleetRes.docs.length > 0) {
      fleet = fleetRes.docs.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        category: doc.category || 'Standard',
        tag: doc.tag || 'Popular',
        seats: doc.seats || '4 + 1 Passengers',
        configuration: doc.configuration || '',
        bootSpace: doc.bootSpace || '',
        luggage: doc.luggage || '2-3 Bags',
        acType: doc.acType || 'Air Conditioned',
        fuelType: doc.fuelType || 'CNG / Petrol',
        ratePerKm: doc.ratePerKm || '₹12 / km',
        localFullDay: doc.localFullDay || '₹2,499 / 8hr 80km',
        image: doc.imageUrl || (typeof doc.image === 'object' ? doc.image?.url : doc.image) || '',
        image480: doc.image480 || (doc.imageUrl ? doc.imageUrl.replace('.webp', '-480w.webp') : ''),
        bestFor: doc.bestFor || '',
      }))
    }

    if (Array.isArray(galleryRes.docs) && galleryRes.docs.length > 0) {
      gallery = galleryRes.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        category: doc.category || 'Mumbai',
        image: doc.imageUrl || (typeof doc.image === 'object' ? doc.image?.url : doc.image) || '',
      }))
    }

    if (Array.isArray(testimonialsRes.docs) && testimonialsRes.docs.length > 0) {
      testimonials = testimonialsRes.docs
    }

    if (Array.isArray(faqsRes.docs) && faqsRes.docs.length > 0) {
      faqs = faqsRes.docs.map((doc: any) => {
        let answerText = typeof doc.answer === 'string' ? doc.answer : ''
        if (!answerText && doc.answer?.root?.children) {
          answerText = doc.answer.root.children
            .map((n: any) => n.children?.map((c: any) => c.text).join(''))
            .join('\n')
        }
        return {
          question: doc.question,
          answer: answerText,
        }
      })
    }
  } catch (err) {
    console.error('Error fetching homepage CMS content:', err)
  }

  // If CMS page document with blocks exists, render dynamically through BlockRenderer
  if (page && Array.isArray(page.layout) && page.layout.length > 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
        <BlockRenderer
          blocks={page.layout}
          phone={phone}
          tours={tours}
          fleet={fleet}
          gallery={gallery}
          testimonials={testimonials}
          faqs={faqs}
        />
      </div>
    )
  }

  // Resilient production fallback preserving 100% original homepage section order
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <Hero phone={phone} />
      <TourPackages tours={tours} showMumbaiOnly={false} />
      <WhyChooseUs />
      <FleetSection fleet={fleet} />
      <Testimonials testimonials={testimonials} phone={phone} />
      <GallerySection gallery={gallery} />
      <AboutSection phone={phone} />
      <FaqSection faqs={faqs} phone={phone} />
      <BookingContactForm />
    </div>
  )
}