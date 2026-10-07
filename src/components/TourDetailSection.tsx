'use client'

import React from 'react'
import { Phone, Check, Sparkles, ArrowRight } from 'lucide-react'
import useBookingModal from './booking/useBookingModal'
import useEnquiryModal from './enquiry/useEnquiryModal'

export interface TourDetailProps {
  tourName?: string
  subtitle?: string
  heroImage?: string
  description?: string
  rules?: Array<{ text?: string } | string>
  attractionTitle?: string
  attractions?: Array<{
    emoji?: string
    name: string
    desc?: string
  }>
  rateColumns?: Array<{ colName?: string } | string>
  rates?: Array<{
    vehicle: string
    h8?: string
    h10?: string
    h12?: string
    extra?: string
    col1?: string
    col2?: string
    cols?: string[]
  }>
  tempoTraveller13Rate?: string
  tempoTraveller17Rate?: string
  coverageDetails?: string
  tripType?: string
  phone?: string
}

export default function TourDetailSection({
  tourName = 'Tour Package',
  subtitle,
  heroImage,
  description,
  rules = [],
  attractionTitle = 'Tour Highlights points to visit',
  attractions = [],
  rateColumns = [],
  rates = [],
  tempoTraveller13Rate,
  tempoTraveller17Rate,
  coverageDetails,
  tripType,
  phone = '9833309061',
}: TourDetailProps) {
  const { openBookingModal } = useBookingModal()
  const { openEnquiryModal } = useEnquiryModal()

  // Normalize rules
  const normalizedRules: string[] = rules.map((r: any) =>
    typeof r === 'string' ? r : r?.text || ''
  ).filter(Boolean)

  // Normalize rate columns
  const normalizedColumns: string[] = rateColumns.map((c: any) =>
    typeof c === 'string' ? c : c?.colName || ''
  ).filter(Boolean)

  const isMumbaiDarshan = tourName?.toLowerCase().includes('mumbai')

  return (
    <div className="bg-zinc-950 text-white font-sans">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 sm:py-20 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            {tourName}
          </h1>

          {subtitle && (
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}

          {/* Quick Action Buttons in Hero */}
          <div className="pt-3 flex flex-wrap justify-center items-center gap-3">
            <a
              href="#rate-card"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-yellow-400/20 transition flex items-center gap-1.5"
            >
              <span>View Rate Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => openEnquiryModal({ tourName, destination: tourName, source: 'tour_enquiry' })}
              className="px-6 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-yellow-400 border border-yellow-400/50 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Submit Enquiry (Get Discount)</span>
            </button>

            <a
              href={`tel:+91${phone}`}
              className="px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2-Column Split Content Section */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Rules & Tour Highlights */}
            <div className="lg:col-span-7 space-y-8">
              {/* Driver Guide Header & Description */}
              <div>
                <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                  🚗 Get drivers who act as a guide
                </h3>
                {description && (
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {description}
                  </p>
                )}
                <div className="border-b border-dashed border-zinc-800 my-6" />
              </div>

              {/* Rules To Be Noted / Important Information */}
              {normalizedRules.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-4">
                    {isMumbaiDarshan ? 'Rules To be Noted' : 'Important Information'}
                  </h2>

                  <div className="space-y-3">
                    {normalizedRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-dashed border-zinc-800 my-6" />
                </div>
              )}

              {/* Tour Highlights / Attractions */}
              {attractions && attractions.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-4">
                    {attractionTitle}
                  </h2>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-3">
                    {attractions.map((spot, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-xl shrink-0 mt-0.5">
                          {spot.emoji || `${idx + 1}.`}
                        </span>
                        <div>
                          <span className="font-bold text-yellow-400 text-sm">
                            {spot.name}
                          </span>
                          {spot.desc && (
                            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                              {spot.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Rate Card & Booking Card */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Rate Card Table */}
              <div
                id="rate-card"
                className="scroll-mt-24 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl"
              >
                <div className="bg-yellow-400 text-black p-4 font-black text-base flex items-center justify-between">
                  <span>Rate Card</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-yellow-500 text-black text-[11px] font-extrabold border-t border-yellow-400">
                        <th className="p-3 border-r border-yellow-400">Vehicle</th>
                        {normalizedColumns.length > 0 ? (
                          normalizedColumns.map((col, i) => (
                            <th
                              key={i}
                              className="p-3 text-center border-r border-yellow-400 last:border-r-0"
                            >
                              {col}
                            </th>
                          ))
                        ) : (
                          <>
                            <th className="p-3 text-center border-r border-yellow-400">8 Hrs / 80 Kms</th>
                            <th className="p-3 text-center border-r border-yellow-400">10 Hrs / 100 Kms</th>
                            <th className="p-3 text-center border-r border-yellow-400">12 Hrs / 120 Kms</th>
                            <th className="p-3 text-center">Extra Kms / Hrs</th>
                          </>
                        )}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800 text-zinc-200 font-medium">
                      {rates.map((row, idx) => {
                        const cols = row.cols || [row.col1, row.col2].filter(Boolean)
                        return (
                          <tr key={idx} className="hover:bg-zinc-800/80 transition">
                            <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">
                              {row.vehicle}
                            </td>
                            {cols.length > 0 ? (
                              cols.map((val, cIdx) => (
                                <td
                                  key={cIdx}
                                  className="p-3 text-center border-r border-zinc-800 last:border-r-0"
                                >
                                  {val}
                                </td>
                              ))
                            ) : (
                              <>
                                <td className="p-3 text-center border-r border-zinc-800">{row.h8 || '-'}</td>
                                <td className="p-3 text-center border-r border-zinc-800">{row.h10 || '-'}</td>
                                <td className="p-3 text-center border-r border-zinc-800">{row.h12 || '-'}</td>
                                <td className="p-3 text-center text-[11px] whitespace-pre-line text-zinc-400">
                                  {row.extra || '-'}
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      })}

                      {/* Tempo Traveller rows if applicable */}
                      {tempoTraveller13Rate && (
                        <tr className="bg-zinc-950">
                          <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">
                            13 Seater A/C Traveller
                          </td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-zinc-300">
                            Full Day {tourName} ( 12 hrs 100 kms ) ={' '}
                            <span className="text-yellow-400 font-bold">{tempoTraveller13Rate}</span>
                          </td>
                        </tr>
                      )}
                      {tempoTraveller17Rate && (
                        <tr className="bg-zinc-950">
                          <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">
                            17 Seater A/C Traveller
                          </td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-zinc-300">
                            Full Day {tourName} ( 12 hrs 100 kms ) ={' '}
                            <span className="text-yellow-400 font-bold">{tempoTraveller17Rate}</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Package Coverage Details Box */}
              {coverageDetails && (
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 text-xs text-zinc-300 space-y-2 leading-relaxed">
                  <div className="font-bold text-yellow-400 text-sm mb-1">
                    Package Coverage Details
                  </div>
                  <div className="whitespace-pre-line">{coverageDetails}</div>
                </div>
              )}

              {/* Quick Booking Box */}
              <div className="bg-zinc-900 rounded-2xl border-2 border-yellow-400 p-6 space-y-4 shadow-2xl shadow-yellow-400/10">
                <h3 className="text-lg font-black text-white flex items-center justify-between">
                  <span>Quick Booking</span>
                  <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-extrabold">
                    Instant
                  </span>
                </h3>

                <p className="text-xs text-zinc-400">
                  Get instant driver &amp; cab confirmation for your {tourName}
                </p>

                <button
                  type="button"
                  onClick={() => openBookingModal({ dropCity: tourName, tourName, tripType: tripType || tourName })}
                  className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-base shadow-lg shadow-yellow-400/20 transition cursor-pointer"
                >
                  Book Now
                </button>

                <button
                  type="button"
                  onClick={() => openEnquiryModal({ tourName, destination: tourName, source: 'tour_enquiry' })}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-yellow-400/30 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Submit Enquiry Now</span>
                </button>

                <div className="pt-2 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-800">
                  <span>Or call us directly:</span>
                  <a
                    href={`tel:+91${phone}`}
                    className="font-bold text-yellow-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-yellow-400" />
                    <span>+91 {phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
