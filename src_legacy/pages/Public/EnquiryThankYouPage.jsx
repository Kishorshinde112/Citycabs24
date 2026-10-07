import React, { useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageCircle, Home, CalendarCheck, Car, MapPin, User, Sparkles, Clock } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';
import SEOHead from '../../components/SEOHead';

export default function EnquiryThankYouPage() {
  const location = useLocation();
  const { phone } = useSettingsStore();
  const inquiry = location.state || {};

  // Generate unique Enquiry ID once using useRef
  const inquiryIdRef = useRef(
    inquiry.id || ('ENQ-' + Math.floor(100000 + Math.random() * 900000))
  );
  const inquiryId = inquiryIdRef.current;

  // Track Quick Enquiry in dataLayer and Google Tag (without triggering primary booking conversion)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'quick_enquiry_submitted', {
          event_category: 'Lead',
          event_label: inquiry.tourName || inquiry.route || 'Quick Enquiry',
          transaction_id: inquiryId,
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'quick_enquiry_submitted',
          inquiry_id: inquiryId,
          destination: inquiry.tourName || inquiry.route || 'Mumbai Darshan'
        });
      }
    }
  }, [inquiryId]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <SEOHead
        title="Enquiry Received | CityCabs24"
        noindex={true}
      />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/25 mb-5">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2 border border-yellow-400/20">
            <Sparkles className="w-3.5 h-3.5" /> Quick Enquiry Received
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Thank You, {inquiry.name || 'Valued Guest'}! 🎉
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm">
            We’ve received your travel enquiry. Our tour expert will contact you via WhatsApp / Call within{' '}
            <span className="text-yellow-400 font-bold">15 minutes</span> with the lowest discounted quote.
          </p>
        </div>

        {/* Enquiry Summary Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl mb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Enquiry Reference</span>
            <span className="text-yellow-400 font-mono font-bold text-base">{inquiryId}</span>
          </div>

          <div className="space-y-3">
            {inquiry.name && (
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Name:</span>
                <span className="text-white font-semibold ml-auto">{inquiry.name}</span>
              </div>
            )}
            {inquiry.contact && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Phone:</span>
                <span className="text-white font-semibold ml-auto">+91 {inquiry.contact}</span>
              </div>
            )}
            {inquiry.tourName && (
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-zinc-400 shrink-0">Selected Tour:</span>
                <span className="text-white font-semibold ml-auto text-right">{inquiry.tourName}</span>
              </div>
            )}
            {inquiry.travelDate && (
              <div className="flex items-center gap-3 text-sm">
                <CalendarCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Travel Date:</span>
                <span className="text-white font-semibold ml-auto">{inquiry.travelDate}</span>
              </div>
            )}
            {inquiry.carType && inquiry.carType !== 'Standard Cab / Tour Vehicle' && (
              <div className="flex items-center gap-3 text-sm">
                <Car className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-zinc-400">Preferred Cab:</span>
                <span className="text-white font-semibold ml-auto">{inquiry.carType}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm pt-1 border-t border-zinc-800/80">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-zinc-400">Status:</span>
              <span className="text-amber-400 font-bold ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Quote Calculation in Progress
              </span>
            </div>
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
            href={`https://wa.me/91${phone}?text=Hi%20CityCabs24%2C%20I%20just%20submitted%20a%20Quick%20Enquiry%20(Ref%3A%20${inquiryId}).%20Please%20share%20the%20discounted%20quote%20for%20${encodeURIComponent(inquiry.tourName || 'Mumbai Darshan')}.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-sm transition shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Back to Home button */}
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
