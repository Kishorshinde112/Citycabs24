import React from 'react';
import { Users, Car, CalendarCheck, TrendingUp } from 'lucide-react';
import useBookingsStore from '../../store/bookingsStore';

export default function Dashboard() {
  const { bookings, updateBookingStatus } = useBookingsStore();

  const stats = [
    { label: 'Total Bookings', value: bookings.length.toString(), icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Action', value: bookings.filter(b => b.status === 'Pending').length.toString(), icon: CalendarCheck, color: 'bg-amber-500' },
    { label: 'Active Fleet', value: '24', icon: Car, color: 'bg-indigo-500' },
    { label: 'Revenue Growth', value: '+14%', icon: TrendingUp, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No bookings received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                  <th className="p-4 font-medium">Booking ID</th>
                  <th className="p-4 font-medium">Customer Details</th>
                  <th className="p-4 font-medium">Trip Request</th>
                  <th className="p-4 font-medium">Date Submitted</th>
                  <th className="p-4 font-medium">Status / Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{booking.id}</td>
                    <td className="p-4">
                      <div className="text-slate-900 font-medium">{booking.name}</div>
                      <div className="text-slate-500 text-xs">{booking.contact}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-700">{booking.tourName || booking.tripType}</div>
                      <div className="text-slate-500 text-xs">{new Date(booking.travelDate).toLocaleDateString()} • {booking.carType}</div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1 outline-none border cursor-pointer
                          ${booking.status === 'Confirmed' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                          ${booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                          ${booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                        `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
