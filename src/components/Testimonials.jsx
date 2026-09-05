import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import useSettingsStore from '../store/settingsStore';

export default function Testimonials() {
  const { phone } = useSettingsStore();
  return (
    <section className="py-16 sm:py-24 bg-black text-white relative overflow-hidden border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            What Our Customers Say
          </h2>

          <p className="text-yellow-400/90 font-serif italic text-sm sm:text-base mt-2">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-800 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Rating & Verified Trip Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-yellow-400" />
                    Verified Trip
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {/* Tour Taken Tag */}
                <div className="mt-4 inline-block bg-zinc-950 text-zinc-300 border border-zinc-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  📍 {rev.trip}
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug">{rev.name}</h4>
                  <p className="text-[11px] text-zinc-400">{rev.location} • {rev.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Reviews Trust Strip */}
        <div className="mt-12 bg-zinc-900 rounded-2xl p-4 border border-zinc-800 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center font-display text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-sm">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-zinc-400">Based on Google verified taxi & tour reviews</p>
            </div>
          </div>

          <a
            href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20book%20a%20cab%20tour.`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs shadow transition whitespace-nowrap"
          >
            Join Happy Travellers
          </a>
        </div>

      </div>
    </section>
  );
}
