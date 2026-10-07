'use client'

import { useContext } from 'react'
import { BookingModalContext, BookingModalContextValue } from './BookingModalContext'

export function useBookingModal(): BookingModalContextValue {
  const context = useContext(BookingModalContext)
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider')
  }
  return context
}

export default useBookingModal
