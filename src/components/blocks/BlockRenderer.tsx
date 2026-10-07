import React from 'react'
import Hero from '../Hero'
import TourPackages from '../TourPackages'
import WhyChooseUs from '../WhyChooseUs'
import FleetSection from '../FleetSection'
import Testimonials from '../Testimonials'
import GallerySection from '../GallerySection'
import AboutSection from '../AboutSection'
import FaqSection from '../FaqSection'
import BookingContactForm from '../BookingContactForm'
import MumbaiDarshanRateTable from '../MumbaiDarshanRateTable'
import TourDetailSection from '../TourDetailSection'

export interface BlockRendererProps {
  blocks?: any[]
  phone?: string
  tours?: any[]
  fleet?: any[]
  gallery?: any[]
  testimonials?: any[]
  faqs?: any[]
}

export default function BlockRenderer({
  blocks,
  phone = '9833309061',
  tours,
  fleet,
  gallery,
  testimonials,
  faqs,
}: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        if (!block || !block.blockType) return null

        switch (block.blockType) {
          case 'hero':
            return (
              <Hero
                key={index}
                title={block.title}
                subtitle={block.subtitle}
                banner={block.image?.url || block.banner}
                phone={phone}
              />
            )

          case 'tourGrid':
            return <TourPackages key={index} tours={tours} showMumbaiOnly={false} />

          case 'whyChooseUs':
            return <WhyChooseUs key={index} />

          case 'fleet':
            return <FleetSection key={index} fleet={fleet} />

          case 'testimonials':
            return <Testimonials key={index} testimonials={testimonials} phone={phone} />

          case 'gallery':
            return <GallerySection key={index} gallery={gallery} />

          case 'about':
            return <AboutSection key={index} phone={phone} />

          case 'faq':
            return <FaqSection key={index} faqs={faqs} phone={phone} />

          case 'bookingContactForm':
          case 'bookingForm':
            return <BookingContactForm key={index} />

          case 'rateTable':
            return <MumbaiDarshanRateTable key={index} rates={block.rates} />

          case 'tourDetails':
            return (
              <TourDetailSection
                key={index}
                tourName={block.tourName}
                subtitle={block.subtitle}
                heroImage={block.heroImage}
                description={block.description}
                rules={block.rules}
                attractionTitle={block.attractionTitle}
                attractions={block.attractions}
                rateColumns={block.rateColumns}
                rates={block.rates}
                tempoTraveller13Rate={block.tempoTraveller13Rate}
                tempoTraveller17Rate={block.tempoTraveller17Rate}
                coverageDetails={block.coverageDetails}
                tripType={block.tripType}
                phone={phone}
              />
            )

          case 'richText':
            return (
              <section key={index} className="py-12 bg-zinc-950 text-white px-4 border-b border-zinc-800">
                <div className="max-w-4xl mx-auto prose prose-invert">
                  {block.content?.root?.children?.map((node: any, i: number) => {
                    const text = node.children?.map((c: any) => c.text).join('') || ''
                    return <p key={i} className="text-zinc-300 leading-relaxed text-base">{text}</p>
                  })}
                </div>
              </section>
            )

          default:
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`[BlockRenderer] Encountered unhandled blockType: "${block.blockType}" at index ${index}`)
            }
            return null
        }
      })}
    </>
  )
}