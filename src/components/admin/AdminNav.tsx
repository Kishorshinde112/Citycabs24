'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
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
  Menu,
  X,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>
  badge?: number
}

interface NavGroup {
  id: string
  title: string
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>
  items: NavItem[]
  adminOnly?: boolean
}

const navGroups: NavGroup[] = [
  {
    id: 'leads',
    title: 'LEADS',
    icon: Inbox,
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
    title: 'CONTENT',
    icon: Layers,
    items: [
      {
        label: 'Pages',
        href: '/admin/collections/pages',
        icon: FileText,
      },
      {
        label: 'Tour Packages',
        href: '/admin/collections/tours',
        icon: MapPin,
      },
      {
        label: 'Fleet',
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
    id: 'media',
    title: 'MEDIA',
    icon: HardDrive,
    items: [
      {
        label: 'Media Library',
        href: '/admin/collections/media',
        icon: HardDrive,
      },
    ],
  },
  {
    id: 'settings',
    title: 'SETTINGS',
    icon: Settings,
    items: [
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
    title: 'SYSTEM',
    icon: Users,
    adminOnly: true,
    items: [
      {
        label: 'Users',
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
  const [activeGroupId, setActiveGroupId] = useState<string>('leads')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Automatically determine active group based on current URL
  useEffect(() => {
    for (const group of navGroups) {
      if (group.items.some((item) => pathname.startsWith(item.href))) {
        setActiveGroupId(group.id)
        break
      }
    }
  }, [pathname])

  const activeGroup = navGroups.find((g) => g.id === activeGroupId) || navGroups[0]

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
        }}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={20} color="#0F172A" /> : <Menu size={20} color="#0F172A" />}
      </button>

      {/* Two-tier navigation */}
      <aside
        className={`admin-two-tier-nav ${mobileOpen ? 'admin-two-tier-nav--mobile-open' : ''}`}
        aria-label="Admin Navigation"
      >
        {/* Tier 1: 48px Narrow Icon Rail */}
        <div className="admin-nav-rail">
          {/* Brand Monogram */}
          <Link href="/admin" className="admin-nav-rail__logo" title="CityCabs24 Dashboard">
            CC
          </Link>

          {/* Group Icons */}
          {navGroups.map((group) => {
            const GroupIcon = group.icon
            const isGroupActive = group.id === activeGroupId
            return (
              <button
                key={group.id}
                type="button"
                className={`admin-nav-rail__item ${
                  isGroupActive ? 'admin-nav-rail__item--active' : ''
                }`}
                onClick={() => setActiveGroupId(group.id)}
                title={group.title}
                aria-label={group.title}
              >
                <GroupIcon size={18} />
              </button>
            )
          })}

          {/* Bottom Icons: View Website & Logout */}
          <div className="admin-nav-rail__bottom">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-nav-rail__item"
              title="View Live Website"
            >
              <Compass size={18} />
            </a>
            <a href="/admin/logout" className="admin-nav-rail__item" title="Log Out">
              <LogOut size={18} />
            </a>
          </div>
        </div>

        {/* Tier 2: 192px Secondary Nav Panel */}
        <div className="admin-nav-panel">
          <div className="admin-nav-panel__header">{activeGroup.title}</div>
          <nav className="admin-nav-panel__links">
            {activeGroup.items.map((item) => {
              const ItemIcon = item.icon
              const isItemActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
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
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="admin-nav-panel__badge">{item.badge}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default AdminNav
