'use client'

import { useEffect } from 'react'

export default function EnquiryTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any
      win.dataLayer = win.dataLayer || []

      // Track Quick Enquiry in dataLayer WITHOUT triggering primary booking conversion
      if (typeof win.gtag === 'function') {
        win.gtag('event', 'quick_enquiry_submitted', {
          event_category: 'Lead',
          event_label: 'Quick Enquiry',
        })
      }
      win.dataLayer.push({
        event: 'quick_enquiry_submitted',
        enquiry_type: 'quick_enquiry',
      })
    }
  }, [])

  return null
}
