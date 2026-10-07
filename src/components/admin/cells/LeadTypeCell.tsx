'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

export const LeadTypeCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const type = typeof cellData === 'string' ? cellData : 'booking'
  const isBooking = type === 'booking'

  return (
    <span
      className={
        isBooking
          ? 'lead-type-badge lead-type-badge--booking'
          : 'lead-type-badge lead-type-badge--quick_enquiry'
      }
    >
      {isBooking ? 'Booking' : 'Enquiry'}
    </span>
  )
}

export default LeadTypeCell
