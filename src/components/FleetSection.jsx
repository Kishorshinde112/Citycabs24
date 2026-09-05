import React, { useState } from 'react';
import { 
  Car, Users, Briefcase, Snowflake, Fuel, CheckCircle, 
  ArrowRight, MessageCircle, Phone, Sparkles 
} from 'lucide-react';
import { FLEET_DATA } from '../data/fleetData';
import useSettingsStore from '../store/settingsStore';

export default function FleetSection({ onOpenBookModal }) {
  const { phone } = useSettingsStore();
  const [activeCarId, setActiveCarId] = useState(FLEET_DATA[1].id); // Dzire default

  const activeCar = FLEET_DATA.find(c => c.id === activeCarId) || FLEET_DATA[0];

  const handleBookCarWhatsApp = (car) => {
    const text = `*🚖 CityCabs24 - Car Booking Inquiry*\n\n` +
      `*Vehicle Selected:* ${car.name} (${car.category})\n` +
      `*Seating:* ${car.seats}\n` +
      `*Rate:* ${car.ratePerKm}\n\n` +
      `Hello, I would like to book a *${car.name}* for our upcoming trip. Please share rate and availability.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
            <Car className="w-3.5 h-3.5 text-blue-600" />
            <span>Well-Maintained Sanitized Vehicles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Our Premium <span className="text-indigo-600">Cab Fleet</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Choose from economic hatchbacks, comfortable sedans, spacious 6-7 seater family MUVs, to luxury Innova Crystas and Tempo Travellers.
          </p>
        </div>

        {/* Car Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {FLEET_DATA.map((car) => (
            <button
              key={car.id}
              onClick={() => setActiveCarId(car.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeCarId === car.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              <Car className={`w-4 h-4 ${activeCarId === car.id ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{car.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Car Showcase Card */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            
            {/* Left Image View */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950/70 border border-slate-800 aspect-video flex items-center justify-center p-4">
                {activeCar.image ? (
                  <img
                    src={activeCar.image}
                    alt={activeCar.name}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 py-6 text-center">
                    <Users className="w-14 h-14 text-indigo-400 mb-2" />
                    <span className="font-bold text-sm text-slate-200">{activeCar.name}</span>
                    <span className="text-xs text-slate-400 mt-1">13 / 17 / 26 Seater AC Group Minibus</span>
                  </div>
                )}
                
                {/* Tag Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                  {activeCar.tag}
                </span>

                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-300 font-medium text-xs">
                  {activeCar.category}
                </span>
              </div>

              <div className="mt-4 bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Recommended For:</strong> {activeCar.bestFor}</span>
              </div>
            </div>

            {/* Right Specs & Rates */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  {activeCar.category} Class
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white mt-1">
                  {activeCar.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Seating: {activeCar.configuration}
                </p>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Capacity</span>
                  </div>
                  <div className="font-bold text-sm text-white">{activeCar.seats}</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>Boot Space</span>
                  </div>
                  <div className="font-bold text-sm text-white">{activeCar.bootSpace}</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Snowflake className="w-4 h-4 text-emerald-400" />
                    <span>Air Conditioning</span>
                  </div>
                  <div className="font-bold text-xs text-white truncate">{activeCar.acType}</div>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Comforts</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activeCar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTAs */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Outstation Rate</div>
                  <div className="text-2xl font-black text-indigo-400 font-display">
                    {activeCar.ratePerKm}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">(Local: {activeCar.localFullDay.split('/')[0]})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handleBookCarWhatsApp(activeCar)}
                    className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onOpenBookModal({ carType: activeCar.name })}
                    className="py-3 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-slate-950 text-xs font-black transition shadow"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* All Fleet Grid (Compact View) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_DATA.map((car) => (
            <div
              key={car.id}
              className="bg-slate-50 rounded-3xl p-5 border border-slate-200 hover:border-indigo-400/50 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${car.badgeColor}`}>
                    {car.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{car.ratePerKm}</span>
                </div>

                <div className="h-36 rounded-2xl bg-white p-3 flex items-center justify-center border border-slate-200/70 mb-4">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                      <Users className="w-10 h-10 text-indigo-500 mb-1" />
                      <span className="font-bold text-xs text-slate-700">{car.name}</span>
                      <span className="text-[10px] text-slate-500">13 - 26 Seater Group Vehicle</span>
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-bold text-slate-900">{car.name}</h4>
                <div className="text-xs text-slate-500 mt-0.5">{car.seats} • {car.luggage}</div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {car.bestFor}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Local 8h/80km</span>
                  <span className="text-sm font-bold text-slate-900">{car.localFullDay.split('/')[0]}</span>
                </div>

                <button
                  onClick={() => handleBookCarWhatsApp(car)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
