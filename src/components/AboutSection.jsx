import React from 'react';
import { Sparkles, Check, Car, PhoneCall, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';

export default function AboutSection({ onOpenBookModal }) {
  const { phone } = useSettingsStore();
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Our Story & Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
              Personal Connection Over <span className="text-indigo-600">App Confusion</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              At <strong>CityTourCabs</strong>, we believe travel should be joyful, dependable, and personalized. In a world full of impersonal ride-hailing apps with sudden surge prices and canceling drivers, we stand for classic hospitality, guaranteed vehicle quality, and driver-guides who treat you like family.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Drivers Who Love Storytelling & Guiding</h4>
                  <p className="text-xs text-slate-600">
                    Our chauffeurs are certified local guides who know every historic spot, temple tradition, and local market secret.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">No App Downloads or Surge Traps</h4>
                  <p className="text-xs text-slate-600">
                    Book instantly on WhatsApp or phone call in under 60 seconds. Fixed, transparent rates with zero surge pricing during peak hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">100% Guaranteed Punctuality</h4>
                  <p className="text-xs text-slate-600">
                    Doorstep pickup with real-time driver coordination. We arrive 15 minutes before scheduled time so you start your journey relaxed.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Chat with Tour Advisor</span>
              </a>

              <a
                href={`tel:+91${phone}`}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-indigo-400" />
                <span>+91 {phone}</span>
              </a>
            </div>

          </div>

          {/* Right: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 rounded-3xl text-white shadow-2xl border border-slate-700 relative overflow-hidden space-y-6">
              
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-slate-950 flex items-center justify-center font-bold text-xl">
                  🚖
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display">CityTourCabs Promise</h3>
                  <p className="text-xs text-indigo-300">Fast. Safe. Affordable. Always at your doorstep.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep pickup across entire MMR, Pune & Nashik</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Well-maintained Hatchbacks, Sedans, MUVs & Luxury Cabs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Polite, non-smoking, certified tourist chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Customized itineraries for senior citizens & kids</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official GST invoice & Fastag receipts</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                <div className="text-indigo-400 font-display font-black text-2xl">
                  12,500+ Trips
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Completed across Maharashtra & Goa with 99.4% satisfaction
                </div>
              </div>

              <button
                onClick={() => onOpenBookModal()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-slate-950 font-black text-sm shadow-lg transition"
              >
                Plan Your Journey Now
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
