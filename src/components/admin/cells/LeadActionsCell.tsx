'use client'

import React, { useState } from 'react'
import type { DefaultCellComponentProps } from 'payload'

export interface PhoneNormalizationResult {
  raw: string
  digits: string
  telNumber: string
  whatsappNumber: string
}

export function normalizeIndianPhone(rawPhone: string): PhoneNormalizationResult {
  const raw = rawPhone || ''
  const cleaned = raw.replace(/[^0-9+]/g, '')
  const digits = cleaned.replace(/\D/g, '')

  let telNumber = cleaned
  let whatsappNumber = digits

  if (digits.length === 10) {
    telNumber = `+91${digits}`
    whatsappNumber = `91${digits}`
  } else if (digits.length === 11 && digits.startsWith('0')) {
    const trimmed = digits.slice(1)
    telNumber = `+91${trimmed}`
    whatsappNumber = `91${trimmed}`
  } else if (digits.length === 12 && digits.startsWith('91')) {
    telNumber = `+${digits}`
    whatsappNumber = digits
  } else if (cleaned.startsWith('+')) {
    telNumber = cleaned
    whatsappNumber = digits
  } else if (digits.length > 0) {
    telNumber = `+${digits}`
    whatsappNumber = digits
  }

  return { raw, digits, telNumber, whatsappNumber }
}

export const LeadActionsCell: React.FC<DefaultCellComponentProps> = (props) => {
  const rowData = (props as any)?.rowData || {}
  const rawPhone = rowData.phone || (typeof props.cellData === 'string' ? props.cellData : '')
  const customerName = rowData.name || 'Customer'
  const route = rowData.route || 'our cab service'

  const [copied, setCopied] = useState(false)

  if (!rawPhone) {
    return <span style={{ color: '#94A3B8', fontSize: '11px' }}>—</span>
  }

  const { telNumber, whatsappNumber } = normalizeIndianPhone(rawPhone)

  const prefilledMessage = encodeURIComponent(
    `Hello ${customerName},\nThis is CityCabs24 regarding your enquiry for ${route}. How can we assist you with your travel?`
  )

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const textToCopy = telNumber || rawPhone
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {
        fallbackCopyText(textToCopy)
      })
    } else {
      fallbackCopyText(textToCopy)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    } catch (err) {
      console.warn('Fallback copy failed', err)
    }
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Call Button */}
      <a
        href={`tel:${telNumber}`}
        className="table-action-btn table-action-btn--call"
        title={`Call ${customerName} (${telNumber})`}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          padding: '2px 7px',
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '4px',
          textDecoration: 'none',
          backgroundColor: '#FEF3C7',
          color: '#B45309',
          border: '1px solid #FCD34D',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <span>📞</span>
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="table-action-btn table-action-btn--wa"
        title={`WhatsApp ${customerName}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          padding: '2px 7px',
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '4px',
          textDecoration: 'none',
          backgroundColor: '#D1FAE5',
          color: '#047857',
          border: '1px solid #6EE7B7',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <span>💬</span>
        <span>WA</span>
      </a>

      {/* Copy Phone Button */}
      <button
        type="button"
        className="table-action-btn table-action-btn--copy"
        onClick={handleCopy}
        title={copied ? 'Copied to clipboard!' : `Copy phone number (${telNumber})`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          padding: '2px 7px',
          fontSize: '11px',
          fontWeight: 600,
          borderRadius: '4px',
          backgroundColor: copied ? '#ECFDF5' : '#F1F5F9',
          color: copied ? '#059669' : '#334155',
          border: copied ? '1px solid #10B981' : '1px solid #CBD5E1',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <span>{copied ? '✓' : '📋'}</span>
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}

export default LeadActionsCell
