import React, { useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageCircle, Home, CalendarCheck, Car, MapPin, User, Sparkles } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

export default function ThankYouPage() {
  const location = useLocation();
  const { phone } = useSettingsStore();
  const booking = location.state || {};

  // Generate booking ID ONCE using useRef — never changes on re-render
  const bookingIdRef = useRef(
    booking.id || ('BK-' + Math.floor(100000 + Math.random() * 900000))
  );
  const bookingId = bookingIdRef.current;

  // Track Google Ads Conversion Event
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18424689411',
      });
      window.gtag('event', 'generate_lead', {
        event_category: 'Booking',
        event_label: booking.route || 'Tour Booking',
        transaction_id: bookingId,
      });
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/30 mb-5">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" /> Booking Confirmed
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Thank You, {booking.name || 'Valued Customer'}! 🎉
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm">
            Your booking has been received. Our team will call you within{' '}
            <span className="text-yellow-400 font-bold">30 minutes</span> to confirm your driver and cab details.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl mb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Booking Reference</span>
            <span className="text-yellow-400 font-black text-base">{bookingId}</span>
          </div>

          <div className="space-y-3">
            {booking.name && (
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Name:</span>
                <span className="text-white font-semibold ml-auto">{booking.name}</span>
              </div>
            )}
            {booking.contact && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Phone:</span>
                <span className="text-white font-semibold ml-auto">+91 {booking.contact}</span>
              </div>
            )}
            {booking.pickupLocation && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Pickup:</span>
                <span className="text-white font-semibold ml-auto text-right max-w-[55%]">{booking.pickupLocation}</span>
              </div>
            )}
            {booking.tourName && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-zinc-400 shrink-0">Tour / Destination:</span>
                <span className="text-white font-semibold ml-auto text-right">{booking.tourName}</span>
              </div>
            )}
            {booking.travelDate && (
              <div className="flex items-center gap-3 text-sm">
                <CalendarCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Travel Date:</span>
                <span className="text-white font-semibold ml-auto">{booking.travelDate}</span>
              </div>
            )}
            {booking.carType && (
              <div className="flex items-center gap-3 text-sm">
                <Car className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Vehicle:</span>
                <span className="text-white font-semibold ml-auto">{booking.carType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href={`tel:+91${phone}`}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm transition shadow-lg shadow-yellow-400/20"
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </a>
          <a
            href={`https://wa.me/91${phone}?text=Hi%20CityCabs24%2C%20I%20just%20submitted%20a%20booking%20(Ref%3A%20${bookingId}).%20Please%20confirm%20my%20cab%20for%20${encodeURIComponent(booking.tourName || 'my trip')}.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-sm transition shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Back to Home — user closes manually */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-sm transition"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

      </div>
    </div>
  );
}
