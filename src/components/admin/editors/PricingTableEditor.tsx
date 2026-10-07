'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Copy, ArrowUp, ArrowDown, Settings, Sparkles, Bus } from 'lucide-react'

export interface PricingRateRow {
  id?: string
  vehicle: string
  h8?: string
  h10?: string
  h12?: string
  extra?: string
  col1?: string
  col2?: string
  col3?: string
  col4?: string
  [key: string]: any
}

export interface PricingColumn {
  id?: string
  colName: string
  key?: string
}

export interface PricingTableEditorProps {
  rateColumns: PricingColumn[]
  rates: PricingRateRow[]
  tempoTraveller13Rate?: string
  tempoTraveller17Rate?: string
  coverageDetails?: string
  onChange: (updated: {
    rateColumns: PricingColumn[]
    rates: PricingRateRow[]
    tempoTraveller13Rate?: string
    tempoTraveller17Rate?: string
    coverageDetails?: string
  }) => void
}

export const PricingTableEditor: React.FC<PricingTableEditorProps> = ({
  rateColumns = [],
  rates = [],
  tempoTraveller13Rate = '',
  tempoTraveller17Rate = '',
  coverageDetails = '',
  onChange,
}) => {
  // Determine if this tour uses standard hours (e.g. Mumbai Darshan) or custom packages (e.g. Konkan)
  const hasStandardHours = rates.some((r) => Boolean(r.h8 || r.h10 || r.h12))
  const isCustomColumns = !hasStandardHours && rateColumns && rateColumns.length > 0

  // Display columns definition
  const columns = hasStandardHours
    ? [
        { key: 'h8', label: rateColumns?.[0]?.colName || '8 Hrs / 80 Km' },
        { key: 'h10', label: rateColumns?.[1]?.colName || '10 Hrs / 100 Km' },
        { key: 'h12', label: rateColumns?.[2]?.colName || '12 Hrs / 120 Km' },
        { key: 'extra', label: rateColumns?.[3]?.colName || 'Extra Rate' },
      ]
    : isCustomColumns
    ? rateColumns.map((c, i) => ({
        key: `col${i + 1}`,
        label: c.colName || `Package ${i + 1}`,
        origIndex: i,
      }))
    : [
        { key: 'h8', label: '8 Hrs / 80 Km' },
        { key: 'h10', label: '10 Hrs / 100 Km' },
        { key: 'h12', label: '12 Hrs / 120 Km' },
        { key: 'extra', label: 'Extra Rate' },
      ]

  // Cell change handler
  const handleCellChange = (rowIndex: number, field: string, value: string) => {
    const newRates = [...rates]
    newRates[rowIndex] = {
      ...newRates[rowIndex],
      [field]: value,
    }
    onChange({ rateColumns, rates: newRates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Add Vehicle
  const handleAddVehicle = () => {
    const newRates = [
      ...rates,
      {
        id: `rate-${Date.now()}`,
        vehicle: 'New Vehicle (e.g. Innova Crysta)',
        h8: '₹0',
        h10: '₹0',
        h12: '₹0',
        extra: '₹0/km',
        col1: '₹0',
        col2: '₹0',
      },
    ]
    onChange({ rateColumns, rates: newRates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Duplicate Vehicle
  const handleDuplicateVehicle = (rowIndex: number) => {
    const rowToCopy = rates[rowIndex]
    const newRates = [...rates]
    newRates.splice(rowIndex + 1, 0, {
      ...rowToCopy,
      id: `rate-${Date.now()}`,
      vehicle: `${rowToCopy.vehicle} (Copy)`,
    })
    onChange({ rateColumns, rates: newRates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Delete Vehicle
  const handleDeleteVehicle = (rowIndex: number) => {
    const newRates = rates.filter((_, i) => i !== rowIndex)
    onChange({ rateColumns, rates: newRates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Move Vehicle
  const handleMoveVehicle = (rowIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1
    if (targetIndex < 0 || targetIndex >= rates.length) return
    const newRates = [...rates]
    const temp = newRates[rowIndex]
    newRates[rowIndex] = newRates[targetIndex]
    newRates[targetIndex] = temp
    onChange({ rateColumns, rates: newRates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Column Header Rename
  const handleColumnNameChange = (colIndex: number, newName: string) => {
    const newCols = [...rateColumns]
    newCols[colIndex] = { ...newCols[colIndex], colName: newName }
    onChange({ rateColumns: newCols, rates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Add Column
  const handleAddColumn = () => {
    const newCols = [...(rateColumns || [])]
    const nextIndex = newCols.length + 1
    newCols.push({ colName: `Package ${nextIndex} (Duration / Kms)` })
    onChange({ rateColumns: newCols, rates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  // Delete Column
  const handleDeleteColumn = (colIndex: number) => {
    const newCols = rateColumns.filter((_, i) => i !== colIndex)
    onChange({ rateColumns: newCols, rates, tempoTraveller13Rate, tempoTraveller17Rate, coverageDetails })
  }

  return (
    <div className="space-y-6">
      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Vehicle Pricing Matrix</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {rates.length} Vehicles
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit rates and vehicle names directly in the grid. Changes update in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddColumn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Add Package Column</span>
            </button>
            <button
              type="button"
              onClick={handleAddVehicle}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xs font-bold shadow-2xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* The Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3 w-48 min-w-[180px]">Vehicle</th>
                {columns.map((col, idx) => (
                  <th key={col.key} className="py-2.5 px-3 min-w-[140px]">
                    <div className="flex items-center justify-between gap-1">
                      {isCustomColumns ? (
                        <input
                          type="text"
                          value={col.label}
                          onChange={(e) => handleColumnNameChange(idx, e.target.value)}
                          className="w-full font-bold uppercase text-[11px] bg-transparent border-b border-dashed border-slate-400 focus:border-slate-800 focus:bg-white px-1 py-0.5 outline-none rounded-xs"
                          title="Click to rename package column"
                        />
                      ) : (
                        <span>{col.label}</span>
                      )}
                      {isCustomColumns && (
                        <button
                          type="button"
                          onClick={() => handleDeleteColumn(idx)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 transition cursor-pointer"
                          title="Remove column"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="py-2.5 px-3 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rates.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="py-8 text-center text-slate-400">
                    No vehicles in pricing grid. Click &ldquo;Add Vehicle&rdquo; above.
                  </td>
                </tr>
              ) : (
                rates.map((row, rIdx) => (
                  <tr key={row.id || rIdx} className="hover:bg-slate-50/70 transition">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={row.vehicle || ''}
                        onChange={(e) => handleCellChange(rIdx, 'vehicle', e.target.value)}
                        placeholder="Vehicle Name"
                        className="w-full px-2.5 py-1.5 font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="py-2 px-3">
                        <input
                          type="text"
                          value={row[col.key] || ''}
                          onChange={(e) => handleCellChange(rIdx, col.key, e.target.value)}
                          placeholder="₹0"
                          className="w-full px-2.5 py-1.5 font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                        />
                      </td>
                    ))}
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveVehicle(rIdx, 'up')}
                          disabled={rIdx === 0}
                          title="Move Up"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveVehicle(rIdx, 'down')}
                          disabled={rIdx === rates.length - 1}
                          title="Move Down"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateVehicle(rIdx)}
                          title="Duplicate"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteVehicle(rIdx)}
                          title="Delete"
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special Vehicles & Tempo Traveller Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-100">
          <Bus className="w-4 h-4 text-yellow-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Special Vehicles & Tempo Traveller Rates
          </h4>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tempo Traveller (13 Seater) Rate
            </label>
            <input
              type="text"
              value={tempoTraveller13Rate}
              onChange={(e) =>
                onChange({
                  rateColumns,
                  rates,
                  tempoTraveller13Rate: e.target.value,
                  tempoTraveller17Rate,
                  coverageDetails,
                })
              }
              placeholder="e.g. ₹6,500 / Day or On Request"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tempo Traveller (17 Seater) Rate
            </label>
            <input
              type="text"
              value={tempoTraveller17Rate}
              onChange={(e) =>
                onChange({
                  rateColumns,
                  rates,
                  tempoTraveller13Rate,
                  tempoTraveller17Rate: e.target.value,
                  coverageDetails,
                })
              }
              placeholder="e.g. ₹7,500 / Day or On Request"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Coverage & Inclusions Information
            </label>
            <textarea
              rows={2}
              value={coverageDetails}
              onChange={(e) =>
                onChange({
                  rateColumns,
                  rates,
                  tempoTraveller13Rate,
                  tempoTraveller17Rate,
                  coverageDetails: e.target.value,
                })
              }
              placeholder="e.g. Tolls & Parking Extra. AC remains on except in ghat/steep sections."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingTableEditor
