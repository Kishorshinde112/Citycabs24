'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Car,
  Image,
  MessageSquare,
  HelpCircle,
  Inbox,
  HardDrive,
  Settings,
  Users,
  Compass,
  Layers,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>
}

interface NavGroup {
  id: string
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    id: 'leads',
    title: 'LEADS & BOOKINGS',
    items: [
      {
        label: 'Form Submissions',
        href: '/admin/collections/bookings',
        icon: Inbox,
      },
    ],
  },
  {
    id: 'content',
    title: 'CONTENT MANAGEMENT',
    items: [
      {
        label: 'Tour Packages',
        href: '/admin/collections/tours',
        icon: MapPin,
      },
      {
        label: 'Pages',
        href: '/admin/collections/pages',
        icon: FileText,
      },
      {
        label: 'Fleet / Cabs',
        href: '/admin/collections/fleet',
        icon: Car,
      },
      {
        label: 'Gallery',
        href: '/admin/collections/gallery',
        icon: Image,
      },
      {
        label: 'Testimonials',
        href: '/admin/collections/testimonials',
        icon: MessageSquare,
      },
      {
        label: 'FAQs',
        href: '/admin/collections/faqs',
        icon: HelpCircle,
      },
    ],
  },
  {
    id: 'media_settings',
    title: 'MEDIA & SETTINGS',
    items: [
      {
        label: 'Media Library',
        href: '/admin/collections/media',
        icon: HardDrive,
      },
      {
        label: 'Site Settings',
        href: '/admin/globals/site-settings',
        icon: Settings,
      },
      {
        label: 'Navigation',
        href: '/admin/globals/navigation',
        icon: Compass,
      },
      {
        label: 'Footer',
        href: '/admin/globals/footer',
        icon: Layers,
      },
    ],
  },
  {
    id: 'system',
    title: 'SYSTEM & ACCESS',
    items: [
      {
        label: 'Users & Admins',
        href: '/admin/collections/users',
        icon: Users,
      },
      {
        label: 'Redirects',
        href: '/admin/collections/redirects',
        icon: Compass,
      },
    ],
  },
]

export const AdminNav: React.FC<any> = () => {
  const pathname = usePathname() || ''
  const [mobileOpen, setMobileOpen] = useState(false)
  const [leadCount, setLeadCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/bookings?limit=1')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.totalDocs !== undefined) setLeadCount(data.totalDocs)
      })
      .catch(() => {})
  }, [pathname])

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        className="admin-mobile-nav-toggle md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '12px',
          zIndex: 110,
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
        }}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={20} color="#0F172A" /> : <Menu size={20} color="#0F172A" />}
      </button>

      {/* Unified Full Sidebar Navigation */}
      <aside
        className={`admin-two-tier-nav ${mobileOpen ? 'admin-two-tier-nav--mobile-open' : ''}`}
        aria-label="Admin Navigation"
        style={{
          width: '240px',
          minWidth: '240px',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderBottom: '1px solid #E2E8F0',
            background: '#0F172A',
            flexShrink: 0,
          }}
        >
          <Link
            href="/admin"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#FACC15',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '13px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            title="CityCabs24 Admin Dashboard"
          >
            CC
          </Link>
          <div style={{ overflow: 'hidden' }}>
            <Link
              href="/admin"
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#F8FAFC',
                textDecoration: 'none',
                display: 'block',
                lineHeight: 1.2,
              }}
            >
              CityCabs24
            </Link>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.02em' }}>
              Admin & CMS Portal
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Main Dashboard Link */}
          <div>
            <Link
              href="/admin"
              className={`admin-nav-panel__link ${pathname === '/admin' ? 'admin-nav-panel__link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={16} color={pathname === '/admin' ? '#854D0E' : '#64748B'} />
                <span style={{ fontWeight: 600 }}>Dashboard Overview</span>
              </div>
            </Link>
          </div>

          {/* Grouped Links */}
          {navGroups.map((group) => (
            <div key={group.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  padding: '2px 10px 4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#94A3B8',
                }}
              >
                {group.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {group.items.map((item) => {
                  const ItemIcon = item.icon
                  const isItemActive =
                    pathname === item.href ||
                    (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`admin-nav-panel__link ${
                        isItemActive ? 'admin-nav-panel__link--active' : ''
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ItemIcon size={15} color={isItemActive ? '#854D0E' : '#64748B'} />
                        <span>{item.label}</span>
                      </div>
                      {item.label === 'Form Submissions' && leadCount !== null && leadCount > 0 && (
                        <span className="admin-nav-panel__badge">{leadCount}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pinned Bottom Actions */}
        <div
          style={{
            padding: '10px 8px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            background: '#F8FAFC',
            flexShrink: 0,
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-panel__link"
            style={{ fontSize: '12px', color: '#475569' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={14} color="#64748B" />
              <span>View Live Website</span>
            </div>
            <ExternalLink size={12} color="#94A3B8" />
          </a>
          <a
            href="/admin/logout"
            className="admin-nav-panel__link"
            style={{ fontSize: '12px', color: '#DC2626' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={14} color="#DC2626" />
              <span>Log Out</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  )
}

export default AdminNav
