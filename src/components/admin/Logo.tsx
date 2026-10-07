import React from 'react'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
      <img
        src="/logo.webp"
        alt="CityCabs24"
        style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
      />
      <span
        style={{
          background: '#EAB308',
          color: '#0F172A',
          fontSize: '10px',
          fontWeight: 800,
          padding: '2px 6px',
          borderRadius: '4px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        ADMIN
      </span>
    </div>
  )
}

export default Logo
