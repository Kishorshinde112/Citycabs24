import React, { useEffect } from 'react';
import { Users, Car, CalendarCheck, TrendingUp, RefreshCw, MessageCircle, Phone, Trash2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import useBookingsStore from '../../store/bookingsStore';

export default function Dashboard() {
  const { bookings, loading, fetchBookings, updateBookingStatus, deleteBooking } = useBookingsStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  const stats = [
    { label: 'Total Bookings', value: bookings.length.toString(), icon: Users, color: 'bg-indigo-600' },
    { label: 'Pending Action', value: bookings.filter(b => (b.status || 'Pending') === 'Pending').length.toString(), icon: CalendarCheck, color: 'bg-amber-500' },
    { label: 'Active Fleet', value: '24 Cabs', icon: Car, color: 'bg-emerald-600' },
    { label: 'System Health', value: '100% Live', icon: TrendingUp, color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900">Dashboard & Customer Leads</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time incoming cab inquiries and booking requests from website.</p>
        </div>

        <button
          onClick={() => fetchBookings()}
          disabled={loading}
          className="px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Refreshing...' : 'Refresh Leads'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 font-display">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-600" />
            <span>Live Customer Booking Requests ({bookings.length})</span>
          </h2>
          
          <span className="text-xs text-slate-500 font-medium">
            Auto-synced with SQLite Database
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-700">No bookings received yet</div>
            <p className="text-xs text-slate-400">New customer bookings placed on the site will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 text-xs uppercase font-extrabold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6">Booking ID & Date</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Trip Route & Vehicle</th>
                  <th className="py-3.5 px-4">Travel Date</th>
                  <th className="py-3.5 px-4 text-center">Status / Update</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {bookings.map((booking) => {
                  const phoneNum = booking.phone || booking.contact || '';
                  const statusVal = booking.status || 'Pending';

                  return (
                    <tr key={booking.id} className="hover:bg-slate-50/80 transition">
                      
                      {/* Booking ID */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-mono font-bold text-slate-900">{booking.id}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {booking.created_at || booking.createdAt || 'Just now'}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{booking.name || 'Guest User'}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:+91${phoneNum}`}
                            className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-indigo-500" />
                            +91 {phoneNum}
                          </a>

                          {phoneNum && (
                            <a
                              href={`https://wa.me/91${phoneNum}?text=Hello%20${encodeURIComponent(booking.name || 'Customer')},%20regarding%20your%20CityCabs24%20booking%20${booking.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-[10px] font-bold flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Trip & Vehicle */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{booking.route || booking.tourName || 'Mumbai Tour'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          🚘 {booking.vehicle || booking.carType || 'Standard Vehicle'}
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td className="py-4 px-4 font-medium text-slate-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{booking.date || booking.travelDate || 'Not specified'}</span>
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={statusVal}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className={`text-xs font-extrabold rounded-xl px-3 py-1.5 outline-none border cursor-pointer transition ${
                            statusVal === 'Confirmed'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : statusVal === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : statusVal === 'Cancelled'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="Pending">🟡 Pending</option>
                          <option value="Confirmed">🔵 Confirmed</option>
                          <option value="Completed">🟢 Completed</option>
                          <option value="Cancelled">🔴 Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete booking ${booking.id}?`)) {
                              deleteBooking(booking.id);
                            }
                          }}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-100 transition cursor-pointer"
                          title="Delete booking record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
