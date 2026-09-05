import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { FLEET_DATA } from '../data/fleetData';

export default function FleetSection({ onOpenBookModal }) {

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-zinc-950 text-white relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Our Cabs Gallery
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-2.5">
            Take a look at our well-maintained fleet of comfortable and reliable vehicles.
          </p>
        </div>

        {/* Unified Clean 6-Cab Fleet Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FLEET_DATA.map((car) => (
            <div
              key={car.id}
              className="bg-zinc-900 rounded-3xl p-5 sm:p-6 border border-zinc-800 hover:border-yellow-400/60 shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Rate Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-yellow-400 text-black shadow-sm">
                    {car.tag}
                  </span>
                  <span className="text-xs font-black text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/30">
                    {car.ratePerKm}
                  </span>
                </div>

                {/* Car Image Display Container (Full Edge-to-Edge Fill) */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-4 relative flex items-center justify-center shadow-inner">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 p-4 text-center border border-dashed border-zinc-800">
                      <Users className="w-12 h-12 text-yellow-400 mb-1.5" />
                      <span className="font-extrabold text-sm text-zinc-200">{car.name}</span>
                      <span className="text-xs text-zinc-400 mt-0.5">13 - 26 Seater AC Group Vehicle</span>
                    </div>
                  )}
                </div>

                {/* Car Name & Specs */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-yellow-400 transition">
                  {car.name}
                </h3>
                <div className="text-xs text-zinc-400 mt-1 font-medium">
                  {car.seats} • {car.luggage} • {car.acType}
                </div>

                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed line-clamp-2">
                  <strong>Best for:</strong> {car.bestFor}
                </p>
              </div>

              {/* Pricing Breakdown & Single Action Button */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Local (8h/80km)</span>
                  <span className="text-sm font-black text-white">{car.localFullDay.split('/')[0]}</span>
                </div>

                <button
                  onClick={() => onOpenBookModal({ carType: car.name })}
                  className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black transition-all shadow-md shadow-yellow-400/20 flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Book Cab</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
