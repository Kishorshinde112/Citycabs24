'use client'

import { useContext } from 'react'
import { EnquiryModalContext, EnquiryModalContextValue } from './EnquiryModalContext'

export function useEnquiryModal(): EnquiryModalContextValue {
  const context = useContext(EnquiryModalContext)
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider')
  }
  return context
}

export default useEnquiryModal
