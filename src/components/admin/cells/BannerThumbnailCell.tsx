'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

export const BannerThumbnailCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  let imageUrl = ''

  if (typeof cellData === 'string') {
    imageUrl = cellData
  } else if (cellData && typeof cellData === 'object') {
    imageUrl = (cellData as any).url || (cellData as any).sizes?.mobile?.url || ''
  }

  if (!imageUrl) {
    return (
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '4px',
          backgroundColor: '#EEF1F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#94A3B8',
          border: '1px solid #E2E8F0',
        }}
      >
        IMG
      </div>
    )
  }

  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        flexShrink: 0,
      }}
    >
      <img
        src={imageUrl}
        alt="Thumbnail"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

export default BannerThumbnailCell
