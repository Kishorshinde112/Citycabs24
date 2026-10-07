'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

export const StatusCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const status = typeof cellData === 'string' ? cellData.toLowerCase() : 'pending'

  let pillClass = 'status-pill status-pill--pending'
  let label = 'Pending'

  if (status === 'in_progress' || status === 'in-progress' || status === 'in progress') {
    pillClass = 'status-pill status-pill--in_progress'
    label = 'In Progress'
  } else if (status === 'confirmed') {
    pillClass = 'status-pill status-pill--confirmed'
    label = 'Confirmed'
  } else if (status === 'completed') {
    pillClass = 'status-pill status-pill--completed'
    label = 'Completed'
  } else if (status === 'cancelled') {
    pillClass = 'status-pill status-pill--cancelled'
    label = 'Cancelled'
  }

  return (
    <span className={pillClass}>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  )
}

export default StatusCell
