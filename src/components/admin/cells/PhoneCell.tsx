'use client'

import React, { useState } from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { normalizeIndianPhone } from './LeadActionsCell'

export const PhoneCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const phone = typeof cellData === 'string' ? cellData : ''
  const [copied, setCopied] = useState(false)

  if (!phone) {
    return <span style={{ color: '#94A3B8' }}>—</span>
  }

  const { telNumber } = normalizeIndianPhone(phone)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(telNumber || phone)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span style={{ fontWeight: 600, color: '#1E293B' }}>{telNumber || phone}</span>
      <button
        type="button"
        className="table-action-btn"
        onClick={handleCopy}
        title="Copy Phone Number"
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: '2px 4px',
          fontSize: '11px',
          color: copied ? '#059669' : '#64748B',
        }}
      >
        {copied ? '✓' : '📋'}
      </button>
    </div>
  )
}

export default PhoneCell
