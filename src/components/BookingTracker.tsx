'use client'

import { useEffect } from 'react'

export default function BookingTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      win.dataLayer = win.dataLayer || []

      // Deduplication guard: ensure primary conversion fires exactly once per booking
      if (sessionStorage.getItem('cc24_booking_conversion_fired')) {
        return
      }
      sessionStorage.setItem('cc24_booking_conversion_fired', 'true')

      // Trigger generate_lead event in dataLayer
      win.dataLayer.push({
        event: 'generate_lead',
        conversion_type: 'full_booking',
      })

      // Trigger primary Google Ads conversion (AW-18424689411)
      if (typeof win.gtag === 'function') {
        win.gtag('event', 'conversion', {
          send_to: 'AW-18424689411',
          event_category: 'Booking',
          event_label: 'Full Booking Confirmed',
        })
      } else {
        win.dataLayer.push({
          event: 'conversion',
          send_to: 'AW-18424689411',
          conversion_type: 'full_booking',
        })
      }
    }
  }, [])

  return null
}
