import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

export default function Hero({ onSelectTour, onOpenBookModal }) {
  const { phone } = useSettingsStore();

  return (
    <div id="home" className="relative bg-slate-900 text-white min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden py-20 border-b border-slate-800">
      
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/50" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Italic Script Top Heading */}
        <div className="text-amber-400 font-serif italic text-lg sm:text-2xl tracking-wide font-normal">
          Discover the City of Dreams
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
          Mumbai Sightseeing Tours
        </h1>

        {/* Subtitle */}
        <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Explore Mumbai's iconic landmarks with our expert drivers who know every corner, every story, and every hidden gem of the city.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <a
            href="/mumbai-darshan"
            className="px-7 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm shadow-xl shadow-yellow-400/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Explore Mumbai Tours</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>

          <a
            href={`tel:+91${phone}`}
            className="px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm border border-yellow-400/40 backdrop-blur-md transition flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Slider dots indicators */}
        <div className="flex justify-center items-center gap-2 pt-8">
          <span className="w-8 h-2 rounded-full bg-yellow-400 shadow-glow" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
        </div>

      </div>
    </div>
  );
}
