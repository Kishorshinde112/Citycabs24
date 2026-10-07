'use client'

import React, { useState } from 'react'
import { Globe, Smartphone, Monitor } from 'lucide-react'

interface GoogleSearchPreviewProps {
  title?: string
  description?: string
  slug?: string
  baseUrl?: string
}

export const GoogleSearchPreview: React.FC<GoogleSearchPreviewProps> = ({
  title = '',
  description = '',
  slug = '',
  baseUrl = 'https://citycabs24.com',
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug
  const displayUrl = `${baseUrl}/${cleanSlug}`
  const displayTitle = title || 'Page Title | CityCabs24'
  const displayDesc = description || 'Please provide a meta description for this page to see how it appears in search engine results.'

  const titleLength = (title || '').length
  const descLength = (description || '').length

  // SEO Score hints
  const titleStatus =
    titleLength === 0 ? 'empty' : titleLength < 40 ? 'short' : titleLength <= 60 ? 'optimal' : 'long'
  const descStatus =
    descLength === 0 ? 'empty' : descLength < 120 ? 'short' : descLength <= 160 ? 'optimal' : 'long'

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Google Search Preview</span>
        </div>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              device === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              device === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Snippet Card */}
      <div
        className={`bg-white rounded-lg p-3 transition-all ${
          device === 'mobile' ? 'max-w-sm mx-auto border border-slate-200 shadow-xs' : 'w-full'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px] font-bold">
            C24
          </div>
          <div className="leading-tight overflow-hidden">
            <span className="text-xs text-slate-800 font-medium block truncate">CityCabs24</span>
            <span className="text-[11px] text-slate-500 block truncate">{displayUrl}</span>
          </div>
        </div>

        <h4 className="text-[#1a0dab] hover:underline cursor-pointer text-base sm:text-lg font-medium leading-snug tracking-normal line-clamp-2 mt-1">
          {displayTitle}
        </h4>

        <p className="text-[#4d5156] text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Progress & Hints */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span className="text-slate-600">Title Length</span>
            <span
              className={
                titleStatus === 'optimal'
                  ? 'text-emerald-600'
                  : titleStatus === 'long'
                  ? 'text-rose-600'
                  : 'text-amber-600'
              }
            >
              {titleLength} / 60 chars
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                titleStatus === 'optimal'
                  ? 'bg-emerald-500'
                  : titleStatus === 'long'
                  ? 'bg-rose-500'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1 font-semibold">
            <span className="text-slate-600">Description Length</span>
            <span
              className={
                descStatus === 'optimal'
                  ? 'text-emerald-600'
                  : descStatus === 'long'
                  ? 'text-rose-600'
                  : 'text-amber-600'
              }
            >
              {descLength} / 160 chars
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                descStatus === 'optimal'
                  ? 'bg-emerald-500'
                  : descStatus === 'long'
                  ? 'bg-rose-500'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleSearchPreview
