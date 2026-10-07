import React from 'react';
import { Phone, MessageCircle, ArrowUp, HelpCircle } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

export default function FloatingActions({ onOpenBookModal }) {
  const { phone } = useSettingsStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Right Edge Side Floating Vertical Inquire Now Button */}
      <button
        onClick={() => onOpenBookModal()}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs py-3 px-2.5 rounded-l-xl shadow-2xl flex items-center gap-1.5 cursor-pointer [writing-mode:vertical-rl] rotate-180 transition hover:px-3"
        aria-label="Inquire Now"
      >
        <Phone className="w-3.5 h-3.5 rotate-90 text-black" />
        <span className="tracking-wider uppercase">Inquire Now</span>
      </button>

      {/* Desktop Floating Action Buttons (Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        
        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white shadow-lg flex items-center justify-center backdrop-blur-md transition transform hover:scale-110 border border-zinc-700 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-yellow-400" />
        </button>

        {/* WhatsApp Pulse Floating Button */}
        <a
          href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20would%20like%20to%20book%20a%20cab%20tour.`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-2xl flex items-center justify-center transition transform hover:scale-110 border border-yellow-300"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Floating Bar (High conversion) */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-2.5 px-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:+91${phone}`}
          className="flex-1 py-3 px-2 rounded-xl bg-zinc-900 text-white border border-zinc-800 font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <Phone className="w-4 h-4 text-yellow-400" />
          <span>Call Desk</span>
        </a>

        <a
          href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20book%20a%20cab.`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 px-2 rounded-xl bg-zinc-900 text-yellow-400 border border-yellow-400/40 font-black text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenBookModal()}
          className="py-3 px-4 rounded-xl bg-yellow-400 text-black font-black text-xs shadow flex items-center justify-center cursor-pointer"
        >
          Book
        </button>
      </div>
    </>
  );
}
