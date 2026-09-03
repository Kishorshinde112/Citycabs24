import React from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

export default function FloatingActions({ onOpenBookModal }) {
  const { phone } = useSettingsStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Action Buttons (Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        
        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-lg flex items-center justify-center backdrop-blur-md transition transform hover:scale-110 border border-slate-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Call Now Button */}
        <a
          href={`tel:+91${phone}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl transition transform hover:scale-105 border border-slate-700 text-xs font-bold"
          aria-label="Call Helpline"
        >
          <div className="w-6 h-6 rounded-full bg-indigo-500 text-slate-950 flex items-center justify-center animate-pulse">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call +91 {phone}</span>
        </a>

        {/* WhatsApp Pulse Floating Button */}
        <a
          href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20would%20like%20to%20book%20a%20cab%20tour.`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl transition transform hover:scale-105 border border-emerald-400/40 glow-green"
          aria-label="WhatsApp Chat"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping"></span>
          </div>
          <div className="text-left leading-tight pr-1">
            <div className="text-[10px] uppercase font-bold text-emerald-200">Online Now</div>
            <div className="text-xs font-black">WhatsApp Desk</div>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Floating Bar (High conversion) */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:+91${phone}`}
          className="flex-1 py-3 px-2 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <Phone className="w-4 h-4 text-indigo-400" />
          <span>Call Driver Desk</span>
        </a>

        <a
          href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20book%20a%20cab.`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Chat</span>
        </a>

        <button
          onClick={() => onOpenBookModal()}
          className="py-3 px-3 rounded-xl bg-indigo-500 text-slate-950 font-black text-xs shadow flex items-center justify-center"
        >
          Book
        </button>
      </div>
    </>
  );
}
