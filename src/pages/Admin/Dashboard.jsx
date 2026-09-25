import React, { useEffect, useState, useRef } from 'react';
import { 
  Users, Car, CalendarCheck, TrendingUp, RefreshCw, MessageCircle, 
  Phone, Trash2, Calendar, MapPin, CheckCircle2, Bell, BellOff, 
  Volume2, Download, Smartphone, X, Sparkles 
} from 'lucide-react';
import useBookingsStore from '../../store/bookingsStore';
import { 
  isNotificationEnabled, 
  setNotificationEnabled, 
  playChimeSound, 
  triggerLeadNotification, 
  requestNotificationPermission 
} from '../../utils/notificationAudio';

export default function Dashboard() {
  const { bookings, loading, fetchBookings, updateBookingStatus, deleteBooking } = useBookingsStore();

  const [notifEnabled, setNotifEnabled] = useState(() => isNotificationEnabled());
  const [newLeadBanner, setNewLeadBanner] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [testSoundPlaying, setTestSoundPlaying] = useState(false);
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

  const stats = [
    { label: 'Total Bookings', value: bookings.length.toString(), icon: Users, color: 'bg-indigo-600' },
    { label: 'Pending Action', value: bookings.filter(b => (b.status || 'Pending') === 'Pending').length.toString(), icon: CalendarCheck, color: 'bg-amber-500' },
    { label: 'Active Fleet', value: '24 Cabs', icon: Car, color: 'bg-emerald-600' },
    { label: 'System Health', value: '100% Live', icon: TrendingUp, color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-12">
      
      {/* 🔔 New Lead Floating Alert Toast */}
      {newLeadBanner && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex items-center justify-between gap-4 animate-bounce">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900">Dashboard & Customer Leads</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Real-time incoming cab inquiries and booking requests from website.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Leads */}
          <button
            onClick={() => fetchBookings()}
            disabled={loading}
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* 🚀 Notification Sound & App Install Control Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left: Sound Alert Toggle Switch */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleToggleNotifications}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm ${
              notifEnabled
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            {notifEnabled ? (
              <>
                <Bell className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Notification Sound: <strong className="text-emerald-800">ON</strong></span>
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4 text-slate-500" />
                <span>Notification Sound: <strong className="text-slate-700">OFF</strong></span>
              </>
            )}
          </button>

          {/* Test Sound Button */}
          <button
            onClick={handleTestSound}
            className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Click to test alert sound"
          >
            <Volume2 className={`w-3.5 h-3.5 ${testSoundPlaying ? 'animate-bounce text-indigo-600' : ''}`} />
            <span>{testSoundPlaying ? 'Playing Chime...' : 'Test Sound'}</span>
          </button>

          {/* Polling Heartbeat */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium pl-2 border-l border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Sync Active (10s)</span>
          </div>
        </div>

        {/* Right: Install App Button */}
        <div>
          {!isInstalled ? (
            <button
              onClick={handleInstallApp}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-slate-950" />
              <span>Install App on Phone</span>
            </button>
          ) : (
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>App Installed (PWA Active)</span>
            </div>
          )}
        </div>

      </div>

      {/* Stats Grid (2-column on mobile, 4-column on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 font-display">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-600" />
            <span>Live Customer Booking Requests ({bookings.length})</span>
          </h2>
          
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
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
