import React, { useEffect, useState, useRef } from 'react';
import { 
  Users, Car, CalendarCheck, TrendingUp, RefreshCw, MessageCircle, 
  Phone, Trash2, Calendar, MapPin, CheckCircle2, Bell, BellOff, 
  Volume2, Download, Smartphone, X, Sparkles, Clock, Search, 
  Copy, Check, FileSpreadsheet, Filter 
} from 'lucide-react';
import useBookingsStore from '../../store/bookingsStore';
import { 
  isNotificationEnabled, 
  setNotificationEnabled, 
  playChimeSound, 
  triggerLeadNotification, 
  requestNotificationPermission 
} from '../../utils/notificationAudio';

// Helper function to calculate relative elapsed time
function getRelativeTime(timestamp) {
  if (!timestamp) return 'Just now';
  const isoStr = timestamp.includes('T') ? timestamp : timestamp.replace(' ', 'T');
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return timestamp;
  
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  
  if (diffSec < 45) return 'Just now';
  if (diffSec < 90) return '1 min ago';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mins ago`;
  if (diffSec < 7200) return '1 hr ago';
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hrs ago`;
  if (diffSec < 172800) return 'Yesterday';
  const days = Math.floor(diffSec / 86400);
  if (days < 30) return `${days} days ago`;
  return date.toLocaleDateString();
}

// Helper to determine if lead arrived within last 45 minutes
function isLeadRecent(timestamp) {
  if (!timestamp) return false;
  const isoStr = timestamp.includes('T') ? timestamp : timestamp.replace(' ', 'T');
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return false;
  const diffMinutes = (Date.now() - date.getTime()) / (1000 * 60);
  return diffMinutes >= 0 && diffMinutes <= 45;
}

export default function Dashboard() {
  const { bookings, loading, fetchBookings, updateBookingStatus, deleteBooking } = useBookingsStore();

  const [notifEnabled, setNotifEnabled] = useState(() => isNotificationEnabled());
  const [newLeadBanner, setNewLeadBanner] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [testSoundPlaying, setTestSoundPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const previousBookingsRef = useRef(null);

  // Catch PWA Install Prompt (Chrome Android / Desktop)
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Fetch on mount & Auto-polling every 10 seconds for new incoming leads
  useEffect(() => {
    fetchBookings();

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/bookings');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.bookings)) {
            const currentList = data.bookings;

            // Check if any new booking ID has arrived compared to our snapshot
            if (previousBookingsRef.current !== null && previousBookingsRef.current.length > 0) {
              const prevIds = new Set(previousBookingsRef.current.map((b) => b.id));
              const newlyAdded = currentList.filter((b) => !prevIds.has(b.id));

              if (newlyAdded.length > 0) {
                // New lead arrived! Trigger alert chime & notification
                const latest = newlyAdded[0];
                triggerLeadNotification(latest);
                setNewLeadBanner(latest);
              }
            }

            previousBookingsRef.current = currentList;
            useBookingsStore.setState({ bookings: currentList });
          }
        }
      } catch (err) {
        console.warn('Auto-polling background check:', err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Sync ref when bookings change
  useEffect(() => {
    if (previousBookingsRef.current === null && bookings.length > 0) {
      previousBookingsRef.current = bookings;
    }
  }, [bookings]);

  const handleToggleNotifications = async () => {
    const nextVal = !notifEnabled;
    setNotifEnabled(nextVal);
    setNotificationEnabled(nextVal);

    if (nextVal) {
      await requestNotificationPermission();
      playChimeSound();
    }
  };

  const handleTestSound = () => {
    setTestSoundPlaying(true);
    playChimeSound();
    setTimeout(() => setTestSoundPlaying(false), 800);
  };

  const handleInstallApp = async () => {
    if (!installPrompt) {
      alert('PWA installation prompt is not ready or app is already installed. You can also tap Chrome menu (⋮) -> "Add to Home screen" / "Install app".');
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
    }
  };

  // Filter bookings based on status and search query
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || (b.status || 'Pending') === statusFilter;
    if (!matchesStatus) return false;

    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const name = (b.name || '').toLowerCase();
    const phone = (b.phone || '').toLowerCase();
    const id = (b.id || '').toLowerCase();
    const route = (b.route || b.tourName || '').toLowerCase();
    const vehicle = (b.vehicle || b.carType || '').toLowerCase();
    const date = (b.date || b.travelDate || '').toLowerCase();

    return name.includes(q) || phone.includes(q) || id.includes(q) || route.includes(q) || vehicle.includes(q) || date.includes(q);
  });

  // Export filtered leads to CSV
  const handleExportCSV = () => {
    if (filteredBookings.length === 0) {
      alert('No bookings available to export.');
      return;
    }
    const headers = ['Booking ID', 'Received At', 'Customer Name', 'Phone', 'Trip Route', 'Vehicle', 'Travel Date', 'Status'];
    const rows = filteredBookings.map((b) => [
      b.id,
      `"${b.created_at || b.createdAt || ''}"`,
      `"${(b.name || '').replace(/"/g, '""')}"`,
      `"${b.phone || ''}"`,
      `"${(b.route || b.tourName || '').replace(/"/g, '""')}"`,
      `"${(b.vehicle || b.carType || '').replace(/"/g, '""')}"`,
      `"${b.date || b.travelDate || ''}"`,
      `"${b.status || 'Pending'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `citycabs24_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy formatted lead for WhatsApp / Driver
  const handleCopyLead = (booking) => {
    const text = `🚖 *CityCabs24 Booking Alert*\n` +
      `• *ID:* ${booking.id}\n` +
      `• *Customer:* ${booking.name || 'Guest'}\n` +
      `• *Phone:* +91 ${booking.phone || ''}\n` +
      `• *Route:* ${booking.route || booking.tourName || 'Tour'}\n` +
      `• *Vehicle:* ${booking.vehicle || booking.carType || 'Standard'}\n` +
      `• *Travel Date:* ${booking.date || booking.travelDate || 'Flexible'}\n` +
      `• *Booked:* ${booking.created_at || booking.createdAt || 'Just now'} (${getRelativeTime(booking.created_at || booking.createdAt)})\n` +
      `• *Status:* ${booking.status || 'Pending'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(booking.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pendingCount = bookings.filter(b => (b.status || 'Pending') === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  const stats = [
    { 
      label: 'Total Bookings', 
      value: bookings.length.toString(), 
      icon: Users, 
      color: 'bg-indigo-600',
      active: statusFilter === 'All',
      onClick: () => setStatusFilter('All')
    },
    { 
      label: 'Pending Leads', 
      value: pendingCount.toString(), 
      icon: CalendarCheck, 
      color: 'bg-amber-500',
      active: statusFilter === 'Pending',
      onClick: () => setStatusFilter('Pending')
    },
    { 
      label: 'Confirmed Rides', 
      value: confirmedCount.toString(), 
      icon: Car, 
      color: 'bg-blue-600',
      active: statusFilter === 'Confirmed',
      onClick: () => setStatusFilter('Confirmed')
    },
    { 
      label: 'Completed Trips', 
      value: completedCount.toString(), 
      icon: TrendingUp, 
      color: 'bg-emerald-600',
      active: statusFilter === 'Completed',
      onClick: () => setStatusFilter('Completed')
    },
  ];

  const filterTabs = [
    { label: 'All', value: 'All', count: bookings.length },
    { label: '🟡 Pending', value: 'Pending', count: pendingCount },
    { label: '🔵 Confirmed', value: 'Confirmed', count: confirmedCount },
    { label: '🟢 Completed', value: 'Completed', count: completedCount },
    { label: '🔴 Cancelled', value: 'Cancelled', count: cancelledCount },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 🔔 New Lead Floating Alert Toast */}
      {newLeadBanner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <span>🎉 Nayi Booking / Lead Aayi Hai!</span>
                <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-black">NEW</span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                <strong>{newLeadBanner.name}</strong> (📞 +91 {newLeadBanner.phone}) • {newLeadBanner.route} • {newLeadBanner.date}
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewLeadBanner(null)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header with Unified Operational Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black font-display text-slate-900 tracking-tight">Dashboard & Customer Leads</h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync (10s)
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Real-time incoming cab inquiries and booking requests from website.</p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Sound Alert Toggle */}
          <button
            onClick={handleToggleNotifications}
            className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border shadow-sm ${
              notifEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            }`}
            title={notifEnabled ? 'Sound alerts active on new lead' : 'Sound alerts muted'}
          >
            {notifEnabled ? (
              <>
                <Bell className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="hidden sm:inline">Alert Sound: <strong>ON</strong></span>
                <span className="sm:hidden">Sound ON</span>
              </>
            ) : (
              <>
                <BellOff className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Alert Sound: <strong>OFF</strong></span>
                <span className="sm:hidden">Sound OFF</span>
              </>
            )}
          </button>

          {/* Test Sound */}
          <button
            onClick={handleTestSound}
            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Click to test alert sound"
          >
            <Volume2 className={`w-3.5 h-3.5 ${testSoundPlaying ? 'animate-bounce text-amber-600' : 'text-slate-500'}`} />
            <span className="hidden md:inline">{testSoundPlaying ? 'Playing...' : 'Test Sound'}</span>
          </button>

          {/* PWA Install Button */}
          {!isInstalled ? (
            <button
              onClick={handleInstallApp}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              title="Install CityCabs24 Admin as a Phone App"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span>Install App</span>
            </button>
          ) : (
            <div className="hidden xl:flex items-center gap-1 text-[11px] font-bold text-emerald-600 px-2.5 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>App Installed</span>
            </div>
          )}

          {/* Export to CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 border border-slate-300 transition cursor-pointer shadow-sm"
            title="Download leads as Excel / CSV file"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Refresh Leads */}
          <button
            onClick={() => fetchBookings()}
            disabled={loading}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            title="Refresh bookings from server"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid (Interactive Quick Filter Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isSelected = stat.active;
          return (
            <button
              key={idx}
              type="button"
              onClick={stat.onClick}
              className={`rounded-2xl shadow-sm border p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left transition cursor-pointer transform hover:-translate-y-0.5 relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${stat.color}`} />

              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-display">{stat.value}</p>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Active</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Unified Bookings Card (Tabs + Search + Live Table in One Container) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Table Top Header: Title & Search */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold">
              <CalendarCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 leading-tight">
                Customer Booking Requests & Inquiries
              </h2>
              <p className="text-[11px] text-slate-500">
                Click customer phone for instant call or WhatsApp for quick dispatch.
              </p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer, phone, route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Table Subheader: Status Filter Tabs & Results Count */}
        <div className="px-4 py-3 sm:px-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map((tab) => {
              const isSelected = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary & Reset */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800 font-bold">{filteredBookings.length}</strong> of {bookings.length}
            </span>

            {(statusFilter !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setSearchTerm('');
                }}
                className="text-xs text-amber-600 hover:text-amber-800 font-bold transition flex items-center gap-1 cursor-pointer underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-700 text-sm">
              {bookings.length === 0 ? 'No bookings received yet' : 'No bookings matching current filters'}
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {bookings.length === 0 
                ? 'New customer bookings placed on the website will appear here in real-time.' 
                : 'Try adjusting your search terms or status filter tab to see more results.'}
            </p>
            {(statusFilter !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setSearchTerm('');
                }}
                className="mt-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 text-xs uppercase font-extrabold tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6">Booking ID & Time Elapsed</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Trip Route & Vehicle</th>
                  <th className="py-3.5 px-4">Travel Date</th>
                  <th className="py-3.5 px-4 text-center">Status / Update</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredBookings.map((booking) => {
                  const phoneNum = booking.phone || booking.contact || '';
                  const statusVal = booking.status || 'Pending';
                  const timestamp = booking.created_at || booking.createdAt || '';
                  const isRecent = isLeadRecent(timestamp);
                  const isCopied = copiedId === booking.id;

                  return (
                    <tr key={booking.id} className="hover:bg-slate-50/80 transition">
                      
                      {/* Booking ID & Time Elapsed */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono font-bold text-slate-900">{booking.id}</span>
                          {isRecent && (
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-emerald-500 text-white animate-pulse shadow-xs">
                              NEW
                            </span>
                          )}
                        </div>

                        {/* Relative Elapsed Time Indicator */}
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/90 shadow-2xs">
                            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>{getRelativeTime(timestamp)}</span>
                          </span>
                        </div>

                        {/* Full Timestamp */}
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5 font-mono">
                          {timestamp || 'Just now'}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{booking.name || 'Guest User'}</div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <a
                            href={`tel:+91${phoneNum}`}
                            className="text-xs font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg transition"
                            title="Direct Call"
                          >
                            <Phone className="w-3 h-3 text-amber-500" />
                            +91 {phoneNum}
                          </a>

                          {phoneNum && (
                            <a
                              href={`https://wa.me/91${phoneNum}?text=Hello%20${encodeURIComponent(booking.name || 'Customer')},%20regarding%20your%20CityCabs24%20booking%20${booking.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-[11px] font-bold flex items-center gap-1 transition"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          )}

                          <button
                            onClick={() => handleCopyLead(booking)}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                            title="Copy formatted lead details for driver dispatch"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>Copy Lead</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Trip & Vehicle */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{booking.route || booking.tourName || 'Mumbai Tour'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium flex items-center gap-1.5">
                          <Car className="w-3 h-3 text-slate-400" />
                          <span>{booking.vehicle || booking.carType || 'Standard Vehicle'}</span>
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td className="py-4 px-4 font-medium text-slate-700">
                        <div className="flex items-center gap-1.5">
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
