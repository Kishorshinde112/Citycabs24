'use client'

import React, { createContext, useState, useCallback, useMemo } from 'react'
import QuickBookModal from '../QuickBookModal'

export interface BookingModalData {
  dropCity?: string
  tourName?: string
  tripType?: string
  pickupCity?: string
  carType?: string
  passengers?: string
  [key: string]: any
}

export interface BookingModalContextValue {
  isOpen: boolean
  initialData: BookingModalData
  openBookingModal: (data?: BookingModalData) => void
  closeBookingModal: () => void
}

export const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState<BookingModalData>({})

  const openBookingModal = useCallback((data?: BookingModalData) => {
    setInitialData({
      dropCity: 'Mumbai Darshan',
      tourName: 'Mumbai Darshan',
      tripType: 'Tour Package',
      ...data,
    })
    setIsOpen(true)
  }, [])

  const closeBookingModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      initialData,
      openBookingModal,
      closeBookingModal,
    }),
    [isOpen, initialData, openBookingModal, closeBookingModal]
  )

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <QuickBookModal
        isOpen={isOpen}
        onClose={closeBookingModal}
        initialData={initialData}
      />
    </BookingModalContext.Provider>
  )
}

export default BookingModalProvider
