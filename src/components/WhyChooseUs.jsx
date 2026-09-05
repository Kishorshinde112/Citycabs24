import React from 'react';
import { 
  Sparkles, Clock, ShieldCheck, HeartHandshake, 
  Car, ThumbsUp, MapPin, Award, CheckCircle2, PhoneCall 
} from 'lucide-react';
import { STATS_DATA } from '../data/testimonialsData';

export default function WhyChooseUs({ onOpenBookModal }) {
  const features = [
    {
      icon: Sparkles,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      title: "Drivers Who Act As Tour Guides",
      description: "Our chauffeurs don't just steer the wheel — they share rich local history, recommend the best regional foods, and guide you to hidden photo spots.",
      badge: "Signature Feature"
    },
    {
      icon: Clock,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      title: "99.4% On-Time Doorstep Pickup",
      description: "Driver details are dispatched 2 hours prior, and cab arrives 15 minutes before your scheduled departure. Never miss a flight or sunrise!",
      badge: "Zero Delay Guarantee"
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      title: "Verified & Background Checked",
      description: "Every driver undergoes strict background verification, route driving tests, and customer etiquette training for family & female solo safety.",
      badge: "100% Safe"
    },
    {
      icon: HeartHandshake,
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      title: "Transparent & Fair Pricing",
      description: "No surge pricing, no hidden luggage fees, no surprise toll inflation. What we quote is what you pay, with official Fastag toll receipts.",
      badge: "No Hidden Costs"
    },
    {
      icon: Car,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      title: "Spotless Clean & Sanitized Fleet",
      description: "High-spec AC vehicles washed and vacuumed before every trip. Fresh fragrance, clean upholstery, and working phone chargers in every seat.",
      badge: "Hygiene First"
    },
    {
      icon: PhoneCall,
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      title: "24/7 Human Helpline & Support",
      description: "No automated bots or endless ticket loops. Speak directly with our dedicated travel coordinators via phone or WhatsApp at any hour.",
      badge: "Live Assistance"
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>The CityCabs24 Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Why Thousands of Travellers <span className="text-amber-600">Trust Us</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            We believe in authentic personal connection and hospitality over cold algorithm apps. Experience worry-free travel across Mumbai and Maharashtra.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feat.color} shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Performance Stats Banner */}
        <div className="mt-14 bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {STATS_DATA.map((st, idx) => (
              <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
                <div className="text-3xl sm:text-4xl font-display font-black text-indigo-400">
                  {st.value}
                </div>
                <div className="text-sm font-bold text-white mt-1">{st.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{st.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
