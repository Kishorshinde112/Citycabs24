import React from 'react';
import { Tag, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

export default function PromotionalOfferBanner({ onOpenBookModal }) {
  const { phone } = useSettingsStore();

  return (
    <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 py-4 px-4 shadow-inner relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="w-9 h-9 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
            <Tag className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
              <span>First Ride Special Offer!</span>
              <span className="px-2 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[10px]">Limited Period</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
              Get <strong>5% to 10% Discount</strong> & Free Tour ITINERARY on Your First Booking!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20claim%20my%20first%20ride%20discount%20and%20free%20itinerary.`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Claim Discount on WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenBookModal()}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer border border-amber-600/30"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
