'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inbox, Clock, CheckCircle2, Check, Plus, ExternalLink, Edit } from 'lucide-react'

interface Lead {
  id: string | number
  name: string
  phone: string
  route?: string
  date?: string
  status?: string
  leadType?: string
  createdAt?: string
}

export const DashboardView: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [totalLeads, setTotalLeads] = useState<number>(0)
  const [pendingCount, setPendingCount] = useState<number>(0)
  const [confirmedCount, setConfirmedCount] = useState<number>(0)
  const [completedCount, setCompletedCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/bookings?limit=100&sort=-createdAt')
        if (res.ok) {
          const data = await res.json()
          const docs: Lead[] = data.docs || []
          setLeads(docs.slice(0, 10))
          setTotalLeads(data.totalDocs || docs.length)

          let pending = 0
          let confirmed = 0
          let completed = 0

          docs.forEach((d) => {
            const st = (d.status || 'pending').toLowerCase()
            if (st === 'pending') pending++
            else if (st === 'confirmed') confirmed++
            else if (st === 'completed') completed++
          })

          setPendingCount(pending)
          setConfirmedCount(confirmed)
          setCompletedCount(completed)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard leads:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Bar with Quick Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: '#0F172A' }}>
            Operational Overview
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            CityCabs24 CMS & Lead Management Portal
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href="/admin/collections/tours/create"
            className="table-action-btn"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#FEF08A',
              borderColor: '#EAB308',
              color: '#854D0E',
            }}
          >
            <Plus size={14} /> New Tour Package
          </Link>
          <Link
            href="/admin/collections/pages"
            className="table-action-btn"
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600 }}
          >
            <Edit size={14} /> Edit Pages
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="table-action-btn"
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600 }}
          >
            <ExternalLink size={14} /> Live Site
          </a>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {/* Total Leads */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748B',
                textTransform: 'uppercase',
              }}
            >
              Total Leads
            </span>
            <Inbox size={16} color="#3B82F6" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
            {loading ? '—' : totalLeads}
          </div>
        </div>

        {/* Pending */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#B45309',
                textTransform: 'uppercase',
              }}
            >
              Pending
            </span>
            <Clock size={16} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#B45309' }}>
            {loading ? '—' : pendingCount}
          </div>
        </div>

        {/* Confirmed */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#047857',
                textTransform: 'uppercase',
              }}
            >
              Confirmed
            </span>
            <CheckCircle2 size={16} color="#10B981" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#047857' }}>
            {loading ? '—' : confirmedCount}
          </div>
        </div>

        {/* Completed */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#475569',
                textTransform: 'uppercase',
              }}
            >
              Completed
            </span>
            <Check size={16} color="#64748B" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#334155' }}>
            {loading ? '—' : completedCount}
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid #E2E8F0',
            background: '#F8FAFC',
          }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
            Recent Form Submissions
          </h2>
          <Link
            href="/admin/collections/bookings"
            style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
          >
            View All Submissions →
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Destination / Tour</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#94A3B8' }}>
                    Loading submissions...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#94A3B8' }}>
                    No form submissions found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const status = (lead.status || 'pending').toLowerCase()
                  const statusClass =
                    status === 'in_progress' || status === 'in-progress'
                      ? 'status-pill status-pill--in_progress'
                      : status === 'confirmed'
                      ? 'status-pill status-pill--confirmed'
                      : status === 'completed'
                      ? 'status-pill status-pill--completed'
                      : status === 'cancelled'
                      ? 'status-pill status-pill--cancelled'
                      : 'status-pill status-pill--pending'

                  return (
                    <tr key={lead.id}>
                      <td style={{ fontWeight: 600, color: '#64748B' }}>#{lead.id}</td>
                      <td>
                        <span
                          className={
                            lead.leadType === 'quick_enquiry'
                              ? 'lead-type-badge lead-type-badge--quick_enquiry'
                              : 'lead-type-badge lead-type-badge--booking'
                          }
                        >
                          {lead.leadType === 'quick_enquiry' ? 'Enquiry' : 'Booking'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{lead.name}</td>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span>{lead.phone}</span>
                          <a
                            href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                            className="table-action-btn"
                          >
                            Call
                          </a>
                        </div>
                      </td>
                      <td>{lead.route || '—'}</td>
                      <td>{lead.date || '—'}</td>
                      <td>
                        <span className={statusClass}>{lead.status || 'pending'}</span>
                      </td>
                      <td>
                        <Link
                          href={`/admin/collections/bookings?id=${lead.id}`}
                          className="table-action-btn"
                          style={{
                            fontWeight: 600,
                            color: '#1E40AF',
                            backgroundColor: '#EFF6FF',
                            borderColor: '#BFDBFE',
                          }}
                        >
                          Edit in Drawer
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardView
