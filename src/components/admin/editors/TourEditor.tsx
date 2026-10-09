'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  Save,
  ExternalLink,
  Eye,
  ArrowLeft,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Image as ImageIcon,
  Clock,
  DollarSign,
  Tag,
  ShieldAlert,
  Info,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  MoreVertical,
} from 'lucide-react'
import PricingTableEditor from './PricingTableEditor'
import GoogleSearchPreview from './GoogleSearchPreview'

export const TourEditor: React.FC<any> = (props) => {
  const router = useRouter()
  const params = useParams()

  // Extract ID from params or URL pathname
  const tourId = useMemo(() => {
    if (props?.id) return props.id
    if (props?.doc?.id) return props.doc.id
    const segments = (params?.segments as string[]) || []
    if (segments.length >= 3 && segments[1] === 'tours') {
      return segments[2]
    }
    const match = typeof window !== 'undefined' ? window.location.pathname.match(/\/collections\/tours\/([^/?#]+)/) : null
    return match ? match[1] : '1'
  }, [params, props?.id, props?.doc?.id])

  const [activeTab, setActiveTab] = useState<
    'overview' | 'pricing' | 'attractions' | 'rules' | 'content' | 'seo' | 'advanced'
  >('overview')

  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [showDiscardModal, setShowDiscardModal] = useState<boolean>(false)

  // Auth State & In-Place Re-Authentication
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [authEmail, setAuthEmail] = useState<string>('mumbaicitycabs24@gmail.com')
  const [authPassword, setAuthPassword] = useState<string>('')
  const [authLoading, setAuthLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Document State
  const [doc, setDoc] = useState<any>({
    title: '',
    slug: '',
    subtitle: '',
    heroImage: '',
    description: '',
    shortSummary: '',
    tripType: '',
    bookingPackages: 'Full Day, Half Day, Custom Trip',
    carTypes: 'Sedan, SUV, Ertiga, Crysta, Tempo Traveller',
    duration: 'Full Day (8-12 Hours)',
    startingPrice: '₹2,300',
    status: 'published',
    displayOrder: 1,
    attractionTitle: 'Tour Highlights points to visit',
    attractions: [],
    rateColumns: [],
    rates: [],
    tempoTraveller13Rate: '',
    tempoTraveller17Rate: '',
    coverageDetails: '',
    rules: [],
    guideChauffeurMessage: 'Professional verified drivers with local Mumbai knowledge',
    longDescription: '',
    primaryCtaLabel: 'Book Now',
    primaryCtaAction: 'open_booking_modal',
    secondaryCtaLabel: 'Submit Enquiry (Get Discount)',
    secondaryCtaAction: 'open_enquiry_modal',
    seo: {
      title: '',
      description: '',
      canonical: '',
      index: true,
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
    },
    rawDoc: null,
  })

  // Fetch document data
  useEffect(() => {
    let isMounted = true
    async function loadTour() {
      if (!tourId) return
      setLoading(true)
      try {
        const token = localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`/api/tours/${tourId}`, { credentials: 'include', headers })
        if (res.ok) {
          const data = await res.json()
          if (!isMounted) return

          // Extract fields from top-level or from first layout block
          const detailsBlock =
            Array.isArray(data.layout) && data.layout.find((b: any) => b.blockType === 'tourDetails')
              ? data.layout.find((b: any) => b.blockType === 'tourDetails')
              : data.layout?.[0] || {}

          const normalizedRules = (detailsBlock.rules || data.rules || []).map((r: any, idx: number) => {
            if (typeof r === 'string') {
              return { id: `r-${idx}`, text: r, style: 'normal', active: true }
            }
            return {
              id: r.id || `r-${idx}`,
              text: r.text || '',
              style: r.style || 'normal',
              active: r.active !== false,
            }
          })

          const normalizedAttractions = (detailsBlock.attractions || data.attractions || []).map(
            (a: any, idx: number) => ({
              id: a.id || `att-${idx}`,
              emoji: a.emoji || '📍',
              name: a.name || '',
              desc: a.desc || '',
              image: a.image || '',
              isCollapsed: true,
            })
          )

          setDoc({
            id: data.id,
            title: data.title || detailsBlock.tourName || '',
            slug: data.slug || '',
            subtitle: detailsBlock.subtitle || data.subtitle || '',
            heroImage: detailsBlock.heroImage || data.heroImage || '',
            description: detailsBlock.description || data.description || '',
            shortSummary: data.shortSummary || detailsBlock.shortSummary || '',
            tripType: detailsBlock.tripType || data.tripType || data.title || '',
            bookingPackages: data.bookingPackages || 'Full Day, Half Day, Custom Trip',
            carTypes: data.carTypes || 'Sedan, SUV, Ertiga, Crysta, Tempo Traveller',
            duration: data.duration || 'Full Day (8-12 Hours)',
            startingPrice: data.startingPrice || '₹2,499',
            status: data.status || 'published',
            displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : (Number(data.displayOrder) || 1),
            attractionTitle: detailsBlock.attractionTitle || 'Tour Highlights points to visit',
            attractions: normalizedAttractions,
            rateColumns: detailsBlock.rateColumns || data.rateColumns || [],
            rates: detailsBlock.rates || data.rates || [],
            tempoTraveller13Rate: detailsBlock.tempoTraveller13Rate || '',
            tempoTraveller17Rate: detailsBlock.tempoTraveller17Rate || '',
            coverageDetails: detailsBlock.coverageDetails || '',
            rules: normalizedRules,
            guideChauffeurMessage:
              detailsBlock.guideChauffeurMessage || 'Professional verified drivers with local Mumbai knowledge',
            longDescription: detailsBlock.longDescription || '',
            primaryCtaLabel: data.primaryCtaLabel || 'Book Now',
            primaryCtaAction: data.primaryCtaAction || 'open_booking_modal',
            secondaryCtaLabel: data.secondaryCtaLabel || 'Submit Enquiry (Get Discount)',
            secondaryCtaAction: data.secondaryCtaAction || 'open_enquiry_modal',
            seo: {
              title: data.seo?.title || '',
              description: data.seo?.description || '',
              canonical: data.seo?.canonical || '',
              index: data.seo?.index !== false,
              ogTitle: data.seo?.ogTitle || '',
              ogDescription: data.seo?.ogDescription || '',
              ogImage: data.seo?.ogImage || '',
            },
            rawDoc: data,
          })
          setIsDirty(false)
        }
      } catch (err) {
        console.error('Failed to load tour document:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadTour()
    return () => {
      isMounted = false
    }
  }, [tourId])

  // Check auth session
  const checkAuth = useCallback(async () => {
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
          : null
      const headers: Record<string, string> = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch('/api/users/me', { credentials: 'include', headers })
      if (res.ok) {
        const data = await res.json()
        if (data?.user) {
          setCurrentUser(data.user)
          if (data.token && typeof window !== 'undefined') {
            localStorage.setItem('payload-token', data.token)
            localStorage.setItem('adminToken', data.token)
          }
          return true
        }
      }
      setCurrentUser(null)
      return false
    } catch {
      setCurrentUser(null)
      return false
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Field updater
  const updateDoc = useCallback((updater: (prev: any) => any) => {
    setDoc((prev: any) => {
      const next = updater(prev)
      return next
    })
    setIsDirty(true)
    setSaveSuccess(false)
  }, [])

  // Save changes
  const handleSave = async (overrideToken?: string | any) => {
    if (saving) return
    setSaving(true)
    setSaveError(null)

    try {
      const activeToken =
        (typeof overrideToken === 'string' && overrideToken) ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
          : null)
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (activeToken) headers['Authorization'] = `Bearer ${activeToken}`

      // Build payload synchronized with existing layout structure
      const updatedLayoutBlock: any = {
        blockType: 'tourDetails',
        tourName: doc.title,
        subtitle: doc.subtitle || '',
        heroImage: doc.heroImage || '',
        description: doc.description || '',
        tripType: doc.tripType || doc.title,
        attractionTitle: doc.attractionTitle || 'Tour Highlights points to visit',
        attractions: (doc.attractions || []).map((a: any) => ({
          ...(a.id && !String(a.id).startsWith('att-') ? { id: a.id } : {}),
          emoji: a.emoji || '📍',
          name: a.name || '',
          desc: a.desc || '',
        })),
        rateColumns: (doc.rateColumns || []).map((c: any) => ({
          ...(c.id && !String(c.id).startsWith('col-') ? { id: c.id } : {}),
          colName: c.colName || '',
        })),
        rates: (doc.rates || []).map((r: any) => ({
          ...(r.id && !String(r.id).startsWith('rate-') ? { id: r.id } : {}),
          vehicle: r.vehicle || '',
          h8: r.h8 || '',
          h10: r.h10 || '',
          h12: r.h12 || '',
          extra: r.extra || '',
          col1: r.col1 || '',
          col2: r.col2 || '',
        })),
        tempoTraveller13Rate: doc.tempoTraveller13Rate || '',
        tempoTraveller17Rate: doc.tempoTraveller17Rate || '',
        coverageDetails: doc.coverageDetails || '',
        rules: (doc.rules || []).map((r: any) => ({
          ...(r.id && !String(r.id).startsWith('r-') ? { id: r.id } : {}),
          text: r.text || '',
        })),
      }

      // Preserve any existing non-tourDetails layout blocks
      let finalLayout: any[] = [updatedLayoutBlock]
      if (Array.isArray(doc.rawDoc?.layout) && doc.rawDoc.layout.length > 0) {
        const detailsIdx = doc.rawDoc.layout.findIndex((b: any) => b.blockType === 'tourDetails')
        if (detailsIdx >= 0) {
          finalLayout = [...doc.rawDoc.layout]
          finalLayout[detailsIdx] = updatedLayoutBlock
        }
      }

      const payloadBody = {
        title: doc.title,
        slug: doc.slug,
        displayOrder: Number(doc.displayOrder) >= 0 ? Number(doc.displayOrder) : 0,
        startingPrice: doc.startingPrice || '',
        layout: finalLayout,
        seo: {
          title: doc.seo?.title || '',
          description: doc.seo?.description || '',
          canonical: doc.seo?.canonical || '',
        },
      }

      const res = await fetch(`/api/tours/${tourId}`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(payloadBody),
      })

      if (res.ok) {
        const savedData = await res.json()
        setSaveSuccess(true)
        setIsDirty(false)
        setSaveError(null)
        if (savedData?.doc) {
          setDoc((prev: any) => ({
            ...prev,
            rawDoc: savedData.doc,
            displayOrder:
              typeof savedData.doc.displayOrder === 'number'
                ? savedData.doc.displayOrder
                : prev.displayOrder,
            startingPrice: savedData.doc.startingPrice || prev.startingPrice,
          }))
        }
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        const errData = await res.json().catch(() => ({}))
        let errorMsg = 'Failed to save changes. Please try again.'
        if (res.status === 401 || res.status === 403) {
          errorMsg = 'Session expired or unauthorized. Please log in below to save.'
          setShowAuthModal(true)
        } else if (Array.isArray(errData?.errors) && errData.errors.length > 0) {
          errorMsg = errData.errors
            .map((e: any) => (typeof e === 'string' ? e : e.message || e.name || JSON.stringify(e)))
            .join(', ')
        } else if (errData?.message) {
          errorMsg = errData.message
        }
        setSaveError(errorMsg)
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error saving tour.')
    } finally {
      setSaving(false)
    }
  }

  // In-place admin authentication handler
  const handleInPlaceLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      })
      const data = await res.json()
      if (res.ok && data?.user) {
        setCurrentUser(data.user)
        if (data.token && typeof window !== 'undefined') {
          localStorage.setItem('payload-token', data.token)
          localStorage.setItem('adminToken', data.token)
        }
        setShowAuthModal(false)
        setAuthPassword('')
        setSaveError(null)
        // Automatically save with fresh token!
        setTimeout(() => {
          handleSave(data.token)
        }, 100)
      } else {
        const msg = data?.errors?.[0]?.message || data?.message || 'Invalid email or password.'
        setAuthError(msg)
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.')
    } finally {
      setAuthLoading(false)
    }
  }

  // Attraction handlers
  const handleAddAttraction = () => {
    updateDoc((prev) => ({
      ...prev,
      attractions: [
        ...prev.attractions,
        {
          id: `att-${Date.now()}`,
          emoji: '📍',
          name: 'New Sightseeing Spot',
          desc: 'Brief description of what visitors see here.',
          isCollapsed: false,
        },
      ],
    }))
  }

  const handleToggleAttraction = (idx: number) => {
    updateDoc((prev) => {
      const nextAtt = [...prev.attractions]
      nextAtt[idx] = { ...nextAtt[idx], isCollapsed: !nextAtt[idx].isCollapsed }
      return { ...prev, attractions: nextAtt }
    })
  }

  const handleCollapseAllAttractions = (collapse: boolean) => {
    updateDoc((prev) => ({
      ...prev,
      attractions: prev.attractions.map((a: any) => ({ ...a, isCollapsed: collapse })),
    }))
  }

  const handleDeleteAttraction = (idx: number) => {
    updateDoc((prev) => ({
      ...prev,
      attractions: prev.attractions.filter((_: any, i: number) => i !== idx),
    }))
  }

  const handleMoveAttraction = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= doc.attractions.length) return
    updateDoc((prev) => {
      const nextAtt = [...prev.attractions]
      const temp = nextAtt[idx]
      nextAtt[idx] = nextAtt[targetIdx]
      nextAtt[targetIdx] = temp
      return { ...prev, attractions: nextAtt }
    })
  }

  // Rule handlers
  const handleAddRule = () => {
    updateDoc((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          id: `r-${Date.now()}`,
          text: 'Toll, parking and entry tickets are not included in the car hire charges.',
          style: 'normal',
          active: true,
        },
      ],
    }))
  }

  const handleDeleteRule = (idx: number) => {
    updateDoc((prev) => ({
      ...prev,
      rules: prev.rules.filter((_: any, i: number) => i !== idx),
    }))
  }

  const handleMoveRule = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= doc.rules.length) return
    updateDoc((prev) => {
      const nextRules = [...prev.rules]
      const temp = nextRules[idx]
      nextRules[idx] = nextRules[targetIdx]
      nextRules[targetIdx] = temp
      return { ...prev, rules: nextRules }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F5F7] p-8 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold text-slate-500">Loading Tour Package...</span>
      </div>
    )
  }

  const cleanSlug = doc.slug.startsWith('/') ? doc.slug.slice(1) : doc.slug
  const publicUrl = `/${cleanSlug}`

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-slate-900 font-sans pb-24">
      {/* ───────────────────────────────────────────────────────────
          1. STICKY TOP HEADER
      ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Back Link & Tour Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/collections/tours"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Back to Tour Packages"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {doc.title || 'Untitled Tour'}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Published
                </span>
                {isDirty && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                    Unsaved Changes
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-mono text-slate-400">/{cleanSlug}</span>
                <span>•</span>
                <span>ID: {tourId}</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentUser.name || currentUser.email}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold transition cursor-pointer"
                title="Click to authenticate admin session"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Log In to Save</span>
              </button>
            )}

            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Page</span>
            </a>

            <a
              href={`${publicUrl}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Preview</span>
            </a>

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setShowAuthModal(true)
                  return
                }
                handleSave()
              }}
              disabled={saving}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : isDirty
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 ring-2 ring-yellow-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Saved</span>
                </>
              ) : saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{isDirty ? 'Save Changes' : 'Save'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            2. TOP-LEVEL TABS (No horizontal scrollbar on desktop)
        ─────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto mt-3 border-t border-slate-100 pt-2 flex flex-wrap gap-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'pricing', label: 'Pricing & Rates' },
            { id: 'attractions', label: `Attractions (${doc.attractions?.length || 0})` },
            { id: 'rules', label: `Rules & Info (${doc.rules?.length || 0})` },
            { id: 'content', label: 'Content & CTA' },
            { id: 'seo', label: 'SEO & Meta' },
            { id: 'advanced', label: 'Advanced' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {saveError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-medium">{saveError}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
              >
                Log In & Save Now
              </button>
              <button onClick={() => setSaveError(null)} className="text-rose-600 hover:underline font-bold">
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 1: OVERVIEW (Clean 2-Column Grid)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols): Core Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
                  Primary Information
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tour Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={doc.title}
                    onChange={(e) => updateDoc((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Mumbai Darshan"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={doc.subtitle}
                    onChange={(e) => updateDoc((p) => ({ ...p, subtitle: e.target.value }))}
                    placeholder="e.g. Iconic Sightseeing in Private AC Cab with Doorstep Pickup"
                    className="w-full px-3.5 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tour Overview Description
                  </label>
                  <textarea
                    rows={4}
                    value={doc.description}
                    onChange={(e) => updateDoc((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Detailed explanation of the tour experience..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition leading-relaxed"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Trip Type Tag</label>
                    <input
                      type="text"
                      value={doc.tripType}
                      onChange={(e) => updateDoc((p) => ({ ...p, tripType: e.target.value }))}
                      placeholder="e.g. Mumbai Darshan"
                      className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration Tag</label>
                    <input
                      type="text"
                      value={doc.duration}
                      onChange={(e) => updateDoc((p) => ({ ...p, duration: e.target.value }))}
                      placeholder="e.g. Full Day (8-12 Hours)"
                      className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Media & Settings */}
            <div className="lg:col-span-5 space-y-5">
              {/* Hero Image Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Hero Banner Image</span>
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                </h3>

                {/* Image Preview Box */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mb-3 group">
                  {doc.heroImage ? (
                    <img
                      src={doc.heroImage}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                      <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                      <span>No image configured</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Image URL / Path
                    </label>
                    <input
                      type="text"
                      value={doc.heroImage}
                      onChange={(e) => updateDoc((p) => ({ ...p, heroImage: e.target.value }))}
                      placeholder="/assets/tours/mumbai-darshan-1280w.webp"
                      className="w-full px-3 py-1.5 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt('Enter image URL or select from Media:', doc.heroImage)
                        if (url !== null) updateDoc((p) => ({ ...p, heroImage: url }))
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Change Image</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Publication Meta Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
                  Publishing & Slug
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    URL Slug <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="px-2.5 py-2 text-xs font-mono text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg">
                      /
                    </span>
                    <input
                      type="text"
                      value={cleanSlug}
                      onChange={(e) => updateDoc((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                      className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-r-lg focus:bg-white focus:border-yellow-400 outline-none font-mono font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price</label>
                    <input
                      type="text"
                      value={doc.startingPrice}
                      onChange={(e) => updateDoc((p) => ({ ...p, startingPrice: e.target.value }))}
                      placeholder="₹2,300"
                      className="w-full px-3 py-1.5 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={doc.displayOrder}
                      onChange={(e) =>
                        updateDoc((p) => ({
                          ...p,
                          displayOrder: e.target.value === '' ? '' : Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-1.5 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 2: PRICING & RATES (Table Grid)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'pricing' && (
          <PricingTableEditor
            rateColumns={doc.rateColumns}
            rates={doc.rates}
            tempoTraveller13Rate={doc.tempoTraveller13Rate}
            tempoTraveller17Rate={doc.tempoTraveller17Rate}
            coverageDetails={doc.coverageDetails}
            onChange={(updated) => updateDoc((p) => ({ ...p, ...updated }))}
          />
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 3: ATTRACTIONS (Compact Collapsed Cards)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'attractions' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Sightseeing Highlights & Spots ({doc.attractions.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compact cards collapsed by default. Expand individual spots to edit descriptions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCollapseAllAttractions(true)}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Collapse All
                </button>
                <button
                  type="button"
                  onClick={() => handleCollapseAllAttractions(false)}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={handleAddAttraction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-slate-950 text-xs font-bold transition cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Attraction</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {doc.attractions.map((att: any, idx: number) => (
                <div
                  key={att.id || idx}
                  className="rounded-lg border border-slate-200 bg-slate-50/60 overflow-hidden transition"
                >
                  {/* Collapsed Header Bar */}
                  <div className="p-3 bg-white flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50">
                    <div
                      className="flex items-center gap-3 flex-1 overflow-hidden"
                      onClick={() => handleToggleAttraction(idx)}
                    >
                      <span className="text-xs font-mono font-bold text-slate-400 w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base">{att.emoji || '📍'}</span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {att.name || 'Untitled Spot'}
                      </span>
                      {att.desc && (
                        <span className="text-xs text-slate-400 truncate hidden md:inline max-w-md">
                          — {att.desc}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleMoveAttraction(idx, 'up')}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveAttraction(idx, 'down')}
                        disabled={idx === doc.attractions.length - 1}
                        title="Move Down"
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAttraction(idx)}
                        title="Delete Spot"
                        className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleAttraction(idx)}
                        className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        {att.isCollapsed ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Edit Form */}
                  {!att.isCollapsed && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 grid sm:grid-cols-12 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Icon / Emoji
                        </label>
                        <input
                          type="text"
                          value={att.emoji || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateDoc((prev) => {
                              const next = [...prev.attractions]
                              next[idx] = { ...next[idx], emoji: val }
                              return { ...prev, attractions: next }
                            })
                          }}
                          className="w-full px-2.5 py-1.5 text-center text-sm bg-white border border-slate-300 rounded-md outline-none"
                        />
                      </div>

                      <div className="sm:col-span-10">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Spot Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={att.name || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateDoc((prev) => {
                              const next = [...prev.attractions]
                              next[idx] = { ...next[idx], name: val }
                              return { ...prev, attractions: next }
                            })
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md font-semibold text-slate-900 outline-none"
                        />
                      </div>

                      <div className="sm:col-span-12">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Spot Description
                        </label>
                        <textarea
                          rows={2}
                          value={att.desc || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            updateDoc((prev) => {
                              const next = [...prev.attractions]
                              next[idx] = { ...next[idx], desc: val }
                              return { ...prev, attractions: next }
                            })
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md outline-none leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 4: RULES & INFORMATION (Compact Rows)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'rules' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Tour Rules & Guidelines ({doc.rules.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Operational guidelines, parking/toll exclusions, and cancellation rules.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddRule}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-slate-950 text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rule</span>
              </button>
            </div>

            <div className="space-y-2">
              {doc.rules.map((rule: any, idx: number) => (
                <div
                  key={rule.id || idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition"
                >
                  <span className="mt-1.5 text-xs font-mono font-bold text-slate-400 w-5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <textarea
                    rows={1}
                    value={rule.text}
                    onChange={(e) => {
                      const val = e.target.value
                      updateDoc((prev) => {
                        const next = [...prev.rules]
                        next[idx] = { ...next[idx], text: val }
                        return { ...prev, rules: next }
                      })
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md outline-none focus:border-yellow-400 transition"
                  />

                  <div className="flex items-center gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => handleMoveRule(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveRule(idx, 'down')}
                      disabled={idx === doc.rules.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRule(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 5: CONTENT & CTA
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Chauffeur Guide & Call-To-Action Settings
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={doc.primaryCtaLabel}
                  onChange={(e) => updateDoc((p) => ({ ...p, primaryCtaLabel: e.target.value }))}
                  placeholder="Book Now"
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={doc.secondaryCtaLabel}
                  onChange={(e) => updateDoc((p) => ({ ...p, secondaryCtaLabel: e.target.value }))}
                  placeholder="Submit Enquiry (Get Discount)"
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Guide / Chauffeur Assurance Message
                </label>
                <input
                  type="text"
                  value={doc.guideChauffeurMessage}
                  onChange={(e) => updateDoc((p) => ({ ...p, guideChauffeurMessage: e.target.value }))}
                  placeholder="Professional verified drivers with local Mumbai knowledge"
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 6: SEO & METADATA (With Google Preview)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'seo' && (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
                Search Engine Optimization
              </h3>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Meta Title</label>
                  <span className="text-[11px] text-slate-400">
                    {(doc.seo?.title || '').length} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={doc.seo?.title || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    updateDoc((p) => ({ ...p, seo: { ...p.seo, title: val } }))
                  }}
                  placeholder="Mumbai Darshan Cab Package | CityCabs24"
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Meta Description</label>
                  <span className="text-[11px] text-slate-400">
                    {(doc.seo?.description || '').length} / 160
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={doc.seo?.description || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    updateDoc((p) => ({ ...p, seo: { ...p.seo, description: val } }))
                  }}
                  placeholder="Book private AC Mumbai Darshan cabs with verified chauffeurs..."
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={doc.seo?.canonical || ''}
                  onChange={(e) => {
                    const val = e.target.value
                    updateDoc((p) => ({ ...p, seo: { ...p.seo, canonical: val } }))
                  }}
                  placeholder={`https://citycabs24.com/${cleanSlug}`}
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <GoogleSearchPreview
                title={doc.seo?.title || doc.title}
                description={doc.seo?.description}
                slug={doc.slug}
              />
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 7: ADVANCED
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'advanced' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Technical Properties & Schema
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-500 mb-1">Internal Database ID</label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-slate-800">{tourId}</div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Collection Slug</label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-slate-800">tours</div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Display Order</label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-slate-800 font-bold">
                  {doc.displayOrder}
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Starting Price</label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-slate-800 font-bold">
                  {doc.startingPrice}
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              Legacy fields and raw block definitions are preserved automatically in the background.
            </div>
          </div>
        )}
      </main>

      {/* ───────────────────────────────────────────────────────────
          STICKY BOTTOM ACTIONS FOOTER
      ─────────────────────────────────────────────────────────── */}
      <footer className="fixed bottom-0 right-0 left-0 md:left-[240px] z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {saveSuccess ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Changes saved successfully!
              </span>
            ) : isDirty ? (
              <span className="text-amber-600 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                You have unsaved changes in this Tour
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                All changes saved
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (isDirty) {
                  if (confirm('Discard unsaved changes?')) router.push('/admin/collections/tours')
                } else {
                  router.push('/admin/collections/tours')
                }
              }}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setShowAuthModal(true)
                  return
                }
                handleSave()
              }}
              disabled={saving}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition cursor-pointer shadow-sm ${
                saveSuccess
                  ? 'bg-emerald-600 text-white font-black'
                  : isDirty
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black ring-2 ring-yellow-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-white font-semibold'
              }`}
            >
              {saveSuccess ? 'Saved' : saving ? 'Saving...' : isDirty ? 'Save Changes' : 'Save'}
            </button>
          </div>
        </div>
      </footer>

      {/* ───────────────────────────────────────────────────────────
          IN-PLACE ADMIN RE-AUTHENTICATION MODAL
      ─────────────────────────────────────────────────────────── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                  CC
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Admin Authentication</h3>
                  <p className="text-[11px] text-slate-500">Log in to save changes without losing any data</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleInPlaceLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-yellow-400 outline-none font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-slate-950 text-xs font-bold transition shadow-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {authLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating & Saving...</span>
                    </>
                  ) : (
                    <span>Log In & Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TourEditor
