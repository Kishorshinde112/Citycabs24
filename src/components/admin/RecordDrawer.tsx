'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useDocumentDrawer } from '@payloadcms/ui'

import { normalizeIndianPhone } from './cells/LeadActionsCell'

interface DrawerInnerProps {
  collectionSlug: string
  id: string | number
  onClose: () => void
}

const DrawerInner: React.FC<DrawerInnerProps> = ({ collectionSlug, id, onClose }) => {
  const numericId = typeof id === 'number' ? id : Number(id)
  const validId = !isNaN(numericId) ? numericId : id

  const [DocumentDrawer, , { openDrawer, closeDrawer, isDrawerOpen }] = useDocumentDrawer({
    collectionSlug,
    id: validId as any,
  })

  // Open drawer as soon as Inner mounts
  useEffect(() => {
    openDrawer()
  }, [openDrawer])

  // Sync close back to parent
  useEffect(() => {
    if (!isDrawerOpen && isDrawerOpen !== undefined) {
      // Small timeout to allow animation to complete
      const timer = setTimeout(() => {
        onClose()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isDrawerOpen, onClose])

  const fullEditUrl = `/admin/collections/${collectionSlug}/${id}`
  const friendlyName =
    collectionSlug === 'bookings'
      ? 'Form Submission'
      : collectionSlug === 'tours'
      ? 'Tour Package'
      : collectionSlug === 'pages'
      ? 'Page'
      : collectionSlug
  const [bookingMeta, setBookingMeta] = useState<{ phone?: string; name?: string; leadType?: string; route?: string } | null>(null)
  const [copiedState, setCopiedState] = useState(false)

  useEffect(() => {
    if (collectionSlug === 'bookings' && id) {
      const token = localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
      const headers: Record<string, string> = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      fetch(`/api/bookings/${id}`, { headers, credentials: 'include' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) {
            setBookingMeta({
              phone: data.phone,
              name: data.name,
              leadType: data.leadType,
              route: data.route,
            })
          }
        })
        .catch(() => {})
    }
  }, [collectionSlug, id])

  const normalized = normalizeIndianPhone(bookingMeta?.phone || '')
  const prefilledMsg = encodeURIComponent(
    `Hello ${bookingMeta?.name || 'Customer'},\nThis is CityCabs24 regarding your enquiry for ${bookingMeta?.route || 'our cab service'}:`
  )

  const handleCopyPhone = () => {
    const text = normalized.telNumber || bookingMeta?.phone || ''
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopiedState(true)
    setTimeout(() => setCopiedState(false), 2000)
  }

  // Inject "Open Full Page" and quick lead actions into drawer header
  useEffect(() => {
    if (!isDrawerOpen) return
    const timer = setTimeout(() => {
      const header = document.querySelector('.doc-drawer__header')
      if (header) {
        if (collectionSlug === 'bookings' && bookingMeta?.phone) {
          let actionGroup = header.querySelector('.admin-drawer-lead-actions')
          if (!actionGroup) {
            actionGroup = document.createElement('div')
            actionGroup.className = 'admin-drawer-lead-actions'
            actionGroup.innerHTML = `
              <a href="tel:${normalized.telNumber}" class="admin-lead-btn admin-lead-btn--call" title="Call Customer">Call</a>
              <a href="https://wa.me/${normalized.whatsappNumber}?text=${prefilledMsg}" target="_blank" rel="noopener noreferrer" class="admin-lead-btn admin-lead-btn--wa" title="WhatsApp Customer">WhatsApp</a>
              <button type="button" class="admin-lead-btn admin-lead-btn--copy" id="admin-lead-copy-btn">Copy</button>
            `
            const copyBtn = actionGroup.querySelector('#admin-lead-copy-btn')
            if (copyBtn) {
              copyBtn.addEventListener('click', (e) => {
                e.stopPropagation()
                const phoneText = normalized.telNumber || bookingMeta.phone || ''
                if (navigator?.clipboard?.writeText) {
                  navigator.clipboard.writeText(phoneText)
                }
                copyBtn.textContent = '✓ Copied!'
                setTimeout(() => {
                  copyBtn.textContent = 'Copy'
                }, 2000)
              })
            }
            header.insertBefore(actionGroup, header.lastChild)
          }
        }

        if (!header.querySelector('.admin-drawer-full-edit-link')) {
          const link = document.createElement('a')
          link.className = 'admin-drawer-full-edit-link'
          link.href = fullEditUrl
          link.innerText = 'Open Full Page ↗'
          link.target = '_self'
          header.insertBefore(link, header.lastChild)
        }
      }
    }, 250)
    return () => clearTimeout(timer)
  }, [isDrawerOpen, fullEditUrl, collectionSlug, bookingMeta, normalized, prefilledMsg])

  return (
    <div className={`admin-record-drawer-wrapper admin-record-drawer--${collectionSlug}`}>
      {collectionSlug === 'bookings' && bookingMeta?.phone && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{bookingMeta.name || 'Customer'}:</span>
            <span className="font-mono text-slate-600">{normalized.telNumber}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                bookingMeta.leadType === 'quick_enquiry'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              {bookingMeta.leadType === 'quick_enquiry' ? 'Quick Enquiry' : 'Full Booking'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${normalized.telNumber}`}
              className="px-2.5 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold transition text-[11px]"
              title={`Call ${bookingMeta.name || 'Customer'}`}
            >
              Call
            </a>
            <a
              href={`https://wa.me/${normalized.whatsappNumber}?text=${prefilledMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition text-[11px]"
              title={`WhatsApp ${bookingMeta.name || 'Customer'}`}
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="px-2 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition"
              title="Copy normalized phone"
            >
              {copiedState ? (
                <>
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span className="text-emerald-600 font-bold">Copied!</span>
                </>
              ) : (
                'Copy'
              )}
            </button>
          </div>
        </div>
      )}
      <DocumentDrawer
        onSave={() => {
          // On save, close or keep open with notification
        }}
      />
      {/* Custom sticky header action enhancement */}
      <style jsx global>{`
        .doc-drawer__header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between;
          padding: 12px 18px;
          border-bottom: 1px solid #E2E8F0;
          background: #FFFFFF;
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .admin-drawer-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
          margin-right: 12px;
        }
        .admin-drawer-full-edit-link {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          transition: all 0.15s ease;
        }
        .admin-drawer-full-edit-link:hover {
          background: #F1F5F9;
          color: #0F172A;
          border-color: #94A3B8;
        }
        .admin-drawer-lead-actions {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
          margin-right: 12px;
        }
        .admin-lead-btn {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.15s ease;
        }
        .admin-lead-btn--call {
          background: #EAB308;
          color: #0F172A;
        }
        .admin-lead-btn--call:hover {
          background: #CA8A04;
        }
        .admin-lead-btn--wa {
          background: #059669;
          color: #FFFFFF;
        }
        .admin-lead-btn--wa:hover {
          background: #047857;
        }
        .admin-lead-btn--copy {
          background: #FFFFFF;
          color: #334155;
          border: 1px solid #CBD5E1;
        }
        .admin-lead-btn--copy:hover {
          background: #F1F5F9;
        }
      `}</style>
    </div>
  )
}

export const RecordDrawer: React.FC<any> = (props) => {
  const params = useParams()
  const searchParams = useSearchParams()

  // Determine collectionSlug from params or pathname
  const [collectionSlug, setCollectionSlug] = useState<string>('')
  const [activeId, setActiveId] = useState<string | number | null>(null)

  useEffect(() => {
    if (props?.collectionSlug) {
      setCollectionSlug(props.collectionSlug)
      return
    }
    const segments = (params?.segments as string[]) || []
    if (segments[0] === 'collections' && segments[1]) {
      setCollectionSlug(segments[1])
    } else {
      const match = window.location.pathname.match(/\/collections\/([^/?#]+)/)
      if (match && match[1]) {
        setCollectionSlug(match[1])
      }
    }
  }, [params, props?.collectionSlug])

  // Check URL query param ?id=... on mount or searchParams change
  useEffect(() => {
    const idParam = searchParams?.get('id')
    if (idParam) {
      setActiveId(idParam)
    }
  }, [searchParams])

  // Intercept table row clicks to open drawer without full navigation
  useEffect(() => {
    if (!collectionSlug) return

    // Never intercept clicks for complex collections (Tours and Pages open full workspace)
    if (collectionSlug === 'tours' || collectionSlug === 'pages') return

    const handleTableClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // If clicking inside an action button (like Call, WA, Copy), let it do its job
      if (
        target.closest('.table-action-btn') ||
        target.closest('button') ||
        target.closest('input[type="checkbox"]')
      ) {
        return
      }

      const row = target.closest('tr')
      if (!row || !row.closest('tbody')) return

      // Find edit link inside the row
      const link = row.querySelector(
        `a[href*="/admin/collections/${collectionSlug}/"]`
      ) as HTMLAnchorElement | null

      if (link && link.href) {
        e.preventDefault()
        e.stopPropagation()

        // Extract ID from URL
        const match = link.href.match(new RegExp(`/collections/${collectionSlug}/([^/?#]+)`))
        if (match && match[1]) {
          const docId = match[1]
          setActiveId(docId)

          // Update URL without page reload
          const currentUrl = new URL(window.location.href)
          currentUrl.searchParams.set('id', docId)
          window.history.pushState({ id: docId }, '', currentUrl.toString())
        }
      }
    }

    // Attach click listener to table or document
    const tableEl = document.querySelector('.table') || document.querySelector('.collection-list')
    if (tableEl) {
      tableEl.addEventListener('click', handleTableClick as any, true)
    } else {
      document.addEventListener('click', handleTableClick as any, true)
    }

    return () => {
      if (tableEl) {
        tableEl.removeEventListener('click', handleTableClick as any, true)
      } else {
        document.removeEventListener('click', handleTableClick as any, true)
      }
    }
  }, [collectionSlug])

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = new URL(window.location.href)
      const idParam = currentUrl.searchParams.get('id')
      setActiveId(idParam || null)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleClose = useCallback(() => {
    setActiveId(null)
    // Clean up ?id from URL without resetting search or pagination
    const currentUrl = new URL(window.location.href)
    if (currentUrl.searchParams.has('id')) {
      currentUrl.searchParams.delete('id')
      window.history.pushState({}, '', currentUrl.toString())
    }
  }, [])

  if (!collectionSlug || !activeId) {
    return null
  }

  return <DrawerInner collectionSlug={collectionSlug} id={activeId} onClose={handleClose} />
}

export default RecordDrawer
