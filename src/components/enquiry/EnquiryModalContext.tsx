'use client'

import React, { createContext, useState, useCallback, useMemo } from 'react'
import AutoEnquiryModal from '../AutoEnquiryModal'

export interface EnquiryModalData {
  destination?: string
  tourName?: string
  source?: string
  [key: string]: any
}

export interface EnquiryModalContextValue {
  isEnquiryModalOpen: boolean
  enquiryData: EnquiryModalData
  openEnquiryModal: (data?: EnquiryModalData) => void
  closeEnquiryModal: () => void
}

export const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null)

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [enquiryData, setEnquiryData] = useState<EnquiryModalData>({})

  const openEnquiryModal = useCallback((data?: EnquiryModalData) => {
    setEnquiryData({
      destination: data?.destination || data?.tourName || 'Mumbai Darshan',
      ...data,
    })
    setIsEnquiryModalOpen(true)
  }, [])

  const closeEnquiryModal = useCallback(() => {
    setIsEnquiryModalOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isEnquiryModalOpen,
      enquiryData,
      openEnquiryModal,
      closeEnquiryModal,
    }),
    [isEnquiryModalOpen, enquiryData, openEnquiryModal, closeEnquiryModal]
  )

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      <AutoEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={closeEnquiryModal}
        initialData={enquiryData}
      />
    </EnquiryModalContext.Provider>
  )
}

export default EnquiryModalProvider
