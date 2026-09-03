import React, { useState } from 'react';
import { 
  MapPin, Clock, Star, Car, ArrowRight, Sparkles, 
  MessageCircle, Phone, Compass, Check
} from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import useContentStore from '../store/contentStore';

export default function TourPackages({ onSelectTour, showMumbaiOnly = false }) {
  const { phone } = useSettingsStore();
  const { tours } = useContentStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'City Sightseeing', 'Hill Station', 'Spiritual & Pilgrimage', 'Coastal & Beach'];

  const displayTours = showMumbaiOnly
    ? tours.filter(t => t.id.includes('mumbai'))
    : tours;

  const filteredTours = activeCategory === 'All'
    ? displayTours
    : displayTours.filter(t => t.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleWhatsAppDirect = (tour, e) => {
    e.stopPropagation();
    const text = `*🚖 CityTourCabs Booking Inquiry*\n\n` +
      `*Tour Name:* ${tour.title}\n` +
      `*Duration:* ${tour.duration}\n` +
      `*Starting Price:* ${tour.startingPrice}\n\n` +
      `Hello, I would like to book the *${tour.title}* package with a driver-guide. Please share details and best discount.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="tours" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Curated Maharashtra Tour Packages</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Popular Sightseeing & <span className="text-indigo-600">Holiday Tours</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            From the bustling landmarks of Mumbai to the divine tranquility of Shirdi and scenic Sahyadri peaks — travel in luxury with knowledgeable driver-guides.
          </p>

          {/* Filter Pills */}
          {!showMumbaiOnly && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'All' ? `🌟 All Tours (${tours.length})` : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
            >
              
              {/* Tour Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={tour.banner}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-indigo-400 font-bold text-[11px] border border-indigo-400/30">
                    {tour.category}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 font-bold text-[11px] flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-indigo-600" />
                    {tour.duration.split('(')[0]}
                  </span>
                </div>

                {/* Rating & Review overlay */}
                <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <div className="flex text-indigo-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>{tour.rating}</span>
                  <span className="text-slate-300 text-[11px]">({tour.reviewsCount} reviews)</span>
                </div>

                {/* Driver Guide Tag */}
                <div className="absolute bottom-3 right-3.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Guide Included
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-indigo-600 transition">
                    {tour.title}
                  </h3>
                  
                  <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                    ✨ {tour.tagline}
                  </p>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {tour.shortDescription}
                  </p>

                  {/* Highlights Bullet Preview */}
                  <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-100">
                    {tour.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Price & Booking Action */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Starting at</span>
                    <div className="text-xl font-black text-slate-900 font-display">
                      {tour.startingPrice}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleWhatsAppDirect(tour, e)}
                      className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition"
                      title="Quick WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectTour(tour)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* View All Tours CTA */}
        {showMumbaiOnly && (
          <div className="mt-10 text-center">
            <a
              href="/tours"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              View All Maharashtra Tour Packages
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Bottom Banner Callout */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Want a Customized Tour Plan for Your Family?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              We design tailor-made packages for senior citizens, large family groups, and weekend explorers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:+91${phone}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-600"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              +91 {phone}
            </a>
            <a
              href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20customize%20a%20tour%20package.`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Customize on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
