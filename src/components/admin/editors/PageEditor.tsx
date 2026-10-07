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
  Layers,
  Sparkles,
} from 'lucide-react'
import GoogleSearchPreview from './GoogleSearchPreview'

export const PageEditor: React.FC<any> = (props) => {
  const router = useRouter()
  const params = useParams()

  const pageId = useMemo(() => {
    if (props?.id) return props.id
    if (props?.doc?.id) return props.doc.id
    const segments = (params?.segments as string[]) || []
    if (segments.length >= 3 && segments[1] === 'pages') {
      return segments[2]
    }
    const match = typeof window !== 'undefined' ? window.location.pathname.match(/\/collections\/pages\/([^/?#]+)/) : null
    return match ? match[1] : '1'
  }, [params, props?.id, props?.doc?.id])

  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [doc, setDoc] = useState<any>({
    title: '',
    slug: '',
    layout: [],
    seo: {
      title: '',
      description: '',
      canonical: '',
    },
  })

  // Load Page Data
  useEffect(() => {
    let isMounted = true
    async function loadPage() {
      if (!pageId) return
      setLoading(true)
      try {
        const token = localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`/api/pages/${pageId}`, { credentials: 'include', headers })
        if (res.ok) {
          const data = await res.json()
          if (!isMounted) return

          // Normalize layout blocks, marking all as collapsed by default
          const normalizedBlocks = (data.layout || []).map((b: any, idx: number) => ({
            ...b,
            _tempId: b.id || `blk-${idx}-${Date.now()}`,
            _isCollapsed: true,
          }))

          setDoc({
            id: data.id,
            title: data.title || '',
            slug: data.slug || '',
            layout: normalizedBlocks,
            seo: {
              title: data.seo?.title || '',
              description: data.seo?.description || '',
              canonical: data.seo?.canonical || '',
            },
          })
          setIsDirty(false)
        }
      } catch (err) {
        console.error('Failed to load page:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadPage()
    return () => {
      isMounted = false
    }
  }, [pageId])

  const updateDoc = useCallback((updater: (prev: any) => any) => {
    setDoc((prev: any) => updater(prev))
    setIsDirty(true)
    setSaveSuccess(false)
  }, [])

  // Save changes
  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    setSaveError(null)

    try {
      const token = localStorage.getItem('payload-token') || localStorage.getItem('adminToken')
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      // Clean layout blocks before sending
      const cleanLayout = doc.layout.map((b: any) => {
        const { _tempId, _isCollapsed, ...rest } = b
        return rest
      })

      const payloadBody = {
        title: doc.title,
        slug: doc.slug,
        layout: cleanLayout,
        seo: doc.seo,
      }

      const res = await fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify(payloadBody),
      })

      if (res.ok) {
        setSaveSuccess(true)
        setIsDirty(false)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        const errData = await res.json().catch(() => ({}))
        setSaveError(errData.message || 'Failed to save page.')
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error saving page.')
    } finally {
      setSaving(false)
    }
  }

  // Block handlers
  const handleToggleBlock = (index: number) => {
    updateDoc((prev) => {
      const nextLayout = [...prev.layout]
      nextLayout[index] = { ...nextLayout[index], _isCollapsed: !nextLayout[index]._isCollapsed }
      return { ...prev, layout: nextLayout }
    })
  }

  const handleCollapseAllBlocks = (collapse: boolean) => {
    updateDoc((prev) => ({
      ...prev,
      layout: prev.layout.map((b: any) => ({ ...b, _isCollapsed: collapse })),
    }))
  }

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= doc.layout.length) return
    updateDoc((prev) => {
      const nextLayout = [...prev.layout]
      const temp = nextLayout[index]
      nextLayout[index] = nextLayout[targetIdx]
      nextLayout[targetIdx] = temp
      return { ...prev, layout: nextLayout }
    })
  }

  const handleDeleteBlock = (index: number) => {
    updateDoc((prev) => ({
      ...prev,
      layout: prev.layout.filter((_: any, i: number) => i !== index),
    }))
  }

  const getBlockSummary = (block: any) => {
    switch (block.blockType) {
      case 'hero':
        return { label: 'Hero Section', sub: block.title || 'Affordable & Reliable Cabs in Mumbai' }
      case 'tourGrid':
        return { label: 'Tour Grid', sub: block.title || 'Explore Mumbai & Beyond' }
      case 'whyChooseUs':
        return { label: 'Why Choose Us', sub: '6 Core Customer Features' }
      case 'fleet':
        return { label: 'Fleet / Cabs', sub: block.title || '6 Main Vehicle Categories' }
      case 'testimonials':
        return { label: 'Testimonials', sub: block.title || '5 Real Customer Reviews' }
      case 'gallery':
        return { label: 'Photo Gallery', sub: block.title || '8 Mumbai & Destination Photos' }
      case 'about':
        return { label: 'About Us', sub: 'Personal Connection Over App Confusion' }
      case 'faq':
        return { label: 'FAQ Section', sub: block.title || '7 Frequently Asked Questions' }
      case 'bookingContactForm':
      case 'bookingForm':
        return { label: 'Booking Form', sub: block.title || 'Book Your Cab or Contact Us' }
      case 'richText':
        return { label: 'Rich Text / Content', sub: 'Standard Page Content Block' }
      default:
        return { label: block.blockType || 'Content Block', sub: block.title || 'Configured block' }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F5F7] p-8 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold text-slate-500">Loading Page...</span>
      </div>
    )
  }

  const isHomePage = doc.slug === 'home' || doc.slug === '/' || doc.slug === ''
  const publicUrl = isHomePage ? '/' : `/${doc.slug}`

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-slate-900 font-sans pb-24">
      {/* ───────────────────────────────────────────────────────────
          STICKY HEADER
      ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/collections/pages"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Back to Pages"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {doc.title || 'Untitled Page'}
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
                <span className="font-mono text-slate-400">{isHomePage ? '/' : `/${doc.slug}`}</span>
                <span>•</span>
                <span>ID: {pageId}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Page</span>
            </a>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : isDirty
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Saved</span>
                </>
              ) : saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-3 border-t border-slate-100 pt-2 flex gap-1">
          {[
            { id: 'content', label: `Page Blocks (${doc.layout?.length || 0})` },
            { id: 'seo', label: 'SEO & Metadata' },
            { id: 'settings', label: 'Settings' },
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

      {/* Main Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {saveError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{saveError}</span>
            </div>
            <button onClick={() => setSaveError(null)} className="text-rose-600 hover:underline font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 1: CONTENT (All 9 Blocks Collapsed by Default)
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-yellow-600" />
                  <span>Configured Page Blocks ({doc.layout.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  All blocks are collapsed by default for compact overview. Expand any block to modify its fields.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCollapseAllBlocks(true)}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Collapse All
                </button>
                <button
                  type="button"
                  onClick={() => handleCollapseAllBlocks(false)}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  Expand All
                </button>
              </div>
            </div>

            {/* Block Summaries List */}
            <div className="space-y-2.5">
              {doc.layout.map((block: any, idx: number) => {
                const info = getBlockSummary(block)
                return (
                  <div
                    key={block._tempId || idx}
                    className="rounded-lg border border-slate-200 bg-slate-50/60 overflow-hidden transition"
                  >
                    {/* Collapsed Header */}
                    <div className="p-3 bg-white flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50">
                      <div
                        className="flex items-center gap-3 flex-1 overflow-hidden"
                        onClick={() => handleToggleBlock(idx)}
                      >
                        <span className="text-xs font-mono font-bold text-slate-400 w-6">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-xs font-bold text-slate-900">{info.label}</span>
                          <span className="text-xs text-slate-400 truncate">— {info.sub}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, 'up')}
                          disabled={idx === 0}
                          title="Move Up"
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, 'down')}
                          disabled={idx === doc.layout.length - 1}
                          title="Move Down"
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(idx)}
                          title="Delete Block"
                          className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleBlock(idx)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          {block._isCollapsed ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Fields Form */}
                    {!block._isCollapsed && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 text-xs">
                        {block.blockType === 'hero' && (
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Main Title
                              </label>
                              <input
                                type="text"
                                value={block.title || ''}
                                onChange={(e) => {
                                  const val = e.target.value
                                  updateDoc((prev) => {
                                    const nextLayout = [...prev.layout]
                                    nextLayout[idx] = { ...nextLayout[idx], title: val }
                                    return { ...prev, layout: nextLayout }
                                  })
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Subtitle
                              </label>
                              <input
                                type="text"
                                value={block.subtitle || ''}
                                onChange={(e) => {
                                  const val = e.target.value
                                  updateDoc((prev) => {
                                    const nextLayout = [...prev.layout]
                                    nextLayout[idx] = { ...nextLayout[idx], subtitle: val }
                                    return { ...prev, layout: nextLayout }
                                  })
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {block.blockType !== 'hero' && (
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Section Heading
                            </label>
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => {
                                const val = e.target.value
                                updateDoc((prev) => {
                                  const nextLayout = [...prev.layout]
                                  nextLayout[idx] = { ...nextLayout[idx], title: val }
                                  return { ...prev, layout: nextLayout }
                                })
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md outline-none"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 2: SEO & METADATA
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'seo' && (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
                Page Search Engine Optimization
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Title</label>
                <input
                  type="text"
                  value={doc.seo?.title || ''}
                  onChange={(e) => updateDoc((p) => ({ ...p, seo: { ...p.seo, title: e.target.value } }))}
                  placeholder="CityCabs24 | Best Cab Service in Mumbai"
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={doc.seo?.description || ''}
                  onChange={(e) =>
                    updateDoc((p) => ({ ...p, seo: { ...p.seo, description: e.target.value } }))
                  }
                  placeholder="24/7 verified Mumbai cabs for local & outstation tours..."
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={doc.seo?.canonical || ''}
                  onChange={(e) =>
                    updateDoc((p) => ({ ...p, seo: { ...p.seo, canonical: e.target.value } }))
                  }
                  placeholder={`https://citycabs24.com${publicUrl}`}
                  className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <GoogleSearchPreview
                title={doc.seo?.title || doc.title}
                description={doc.seo?.description}
                slug={doc.slug === 'home' ? '' : doc.slug}
              />
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────
            TAB 3: SETTINGS
        ─────────────────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 max-w-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Page Slug & URL Path
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
              <input
                type="text"
                value={doc.title}
                onChange={(e) => updateDoc((p) => ({ ...p, title: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={doc.slug}
                disabled={doc.slug === 'home'}
                onChange={(e) =>
                  updateDoc((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))
                }
                className="w-full px-3 py-2 text-xs bg-[#EEF1F4] border border-slate-300 rounded-lg outline-none font-mono"
              />
              {doc.slug === 'home' && (
                <p className="text-[11px] text-slate-400 mt-1">Home page slug is permanent.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Footer */}
      <footer className="fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isDirty ? (
              <span className="text-amber-600 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Unsaved changes
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
                  if (confirm('Discard unsaved changes?')) router.push('/admin/collections/pages')
                } else {
                  router.push('/admin/collections/pages')
                }
              }}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition cursor-pointer shadow-sm ${
                isDirty
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PageEditor
