'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useBookingModal } from './booking/useBookingModal'
import { useEnquiryModal } from './enquiry/useEnquiryModal'

export default function HomeAutoEnquiry() {
  const pathname = usePathname()
  const { isOpen: isBookingModalOpen } = useBookingModal()
  const { openEnquiryModal, isEnquiryModalOpen } = useEnquiryModal()
  const timerFiredRef = useRef(false)
  const isBookingModalOpenRef = useRef(isBookingModalOpen)
  const isEnquiryModalOpenRef = useRef(isEnquiryModalOpen)

  useEffect(() => {
    isBookingModalOpenRef.current = isBookingModalOpen
  }, [isBookingModalOpen])

  useEffect(() => {
    isEnquiryModalOpenRef.current = isEnquiryModalOpen
  }, [isEnquiryModalOpen])

  useEffect(() => {
    // Trigger ONLY on homepage
    if (pathname !== '/') return

    // Avoid reopening repeatedly in same session
    if (typeof window !== 'undefined') {
      const alreadyShown = sessionStorage.getItem('citycabs_auto_enquiry_shown')
      if (alreadyShown) return
    }

    const timer = setTimeout(() => {
      timerFiredRef.current = true

      if (typeof window !== 'undefined') {
        const alreadyShown = sessionStorage.getItem('citycabs_auto_enquiry_shown')
        if (alreadyShown) return
      }

      // If booking modal is currently open, do not open over it.
      // We will wait for booking modal to close in the conflict resolution effect below.
      if (!isBookingModalOpenRef.current && !isEnquiryModalOpenRef.current) {
        openEnquiryModal({
          destination: 'Mumbai Darshan',
          source: 'auto_popup',
        })
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('citycabs_auto_enquiry_shown', 'true')
        }
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [pathname, openEnquiryModal])

  // Conflict resolution: If timer fired while Booking Modal was open,
  // open Enquiry Modal smoothly after Booking Modal closes.
  useEffect(() => {
    if (pathname !== '/') return
    if (!timerFiredRef.current) return

    if (typeof window !== 'undefined') {
      const alreadyShown = sessionStorage.getItem('citycabs_auto_enquiry_shown')
      if (alreadyShown) return
    }

    if (!isBookingModalOpen && !isEnquiryModalOpen) {
      const fallbackTimer = setTimeout(() => {
        openEnquiryModal({
          destination: 'Mumbai Darshan',
          source: 'auto_popup_delayed',
        })
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('citycabs_auto_enquiry_shown', 'true')
        }
      }, 500)
      return () => clearTimeout(fallbackTimer)
    }
  }, [pathname, isBookingModalOpen, isEnquiryModalOpen, openEnquiryModal])

  // If user opens Enquiry modal manually before 5s, mark session as shown so auto popup doesn't fire later
  useEffect(() => {
    if (isEnquiryModalOpen && typeof window !== 'undefined') {
      sessionStorage.setItem('citycabs_auto_enquiry_shown', 'true')
    }
  }, [isEnquiryModalOpen])

  return null
}
