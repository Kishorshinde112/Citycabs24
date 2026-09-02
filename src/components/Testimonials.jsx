import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-current" />
            <span>Verified Customer Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Loved by Over <span className="text-amber-600">12,500+ Travellers</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Read real feedback from families, corporate travellers, and pilgrims who explored Maharashtra with CityTourCabs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Rating & Verified Trip Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Trip
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {/* Tour Taken Tag */}
                <div className="mt-4 inline-block bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  📍 {rev.trip}
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500">{rev.location} • {rev.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Reviews Trust Strip */}
        <div className="mt-12 bg-white rounded-2xl p-4 border border-slate-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center font-display text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 text-sm">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-slate-500">Based on Google verified taxi & tour reviews</p>
            </div>
          </div>

          <a
            href="https://wa.me/917021001921?text=Hi%20CityTourCabs,%20I%20want%20to%20book%20a%20cab%20tour."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition whitespace-nowrap"
          >
            Join Happy Travellers
          </a>
        </div>

      </div>
    </section>
  );
}
