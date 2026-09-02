import React from 'react';
import { Users, Car, CalendarCheck, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Inquiries (Mock)', value: '1,284', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Fleet', value: '24', icon: Car, color: 'bg-indigo-500' },
    { label: 'Bookings Today', value: '12', icon: CalendarCheck, color: 'bg-emerald-500' },
    { label: 'Revenue Growth', value: '+14%', icon: TrendingUp, color: 'bg-rose-500' },
  ];

  const recentBookings = [
    { id: 'B-1001', name: 'Rahul Sharma', route: 'Mumbai to Pune', date: 'Oct 24, 2023', status: 'Confirmed' },
    { id: 'B-1002', name: 'Priya Patel', route: 'Airport Transfer', date: 'Oct 24, 2023', status: 'Pending' },
    { id: 'B-1003', name: 'Amit Kumar', route: 'Lonavala Tour', date: 'Oct 23, 2023', status: 'Completed' },
    { id: 'B-1004', name: 'Neha Singh', route: 'Mumbai Darshan', date: 'Oct 22, 2023', status: 'Completed' },
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

      {/* Recent Activity Table Mock */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Recent Bookings (Mock Data)</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-medium">Booking ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Route/Tour</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{booking.id}</td>
                  <td className="p-4 text-slate-700">{booking.name}</td>
                  <td className="p-4 text-slate-700">{booking.route}</td>
                  <td className="p-4 text-slate-500 text-sm">{booking.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${booking.status === 'Confirmed' ? 'bg-indigo-100 text-indigo-800' : ''}
                      ${booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' : ''}
                      ${booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : ''}
                    `}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
