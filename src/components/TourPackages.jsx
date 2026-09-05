import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import useContentStore from '../store/contentStore';

export default function TourPackages({ onSelectTour, showMumbaiOnly = false }) {
  const { tours } = useContentStore();

  const tourBadges = {
    'mumbai-darshan': "Discover Mumbai's iconic landmarks",
    'lonavala-trip': "A Perfect Weekend Gateway!",
    'alibaug-sightseeing': "Coastal Paradise Near Mumbai",
    'matheran-sightseeing': "India's Smallest Hill Station",
    'shirdi-tour': "Spiritual Journey to Sai Baba's Abode",
    'mahabaleshwar-sightseeing': "The Queen of Hill Stations",
    'igatpuri-tour': "Hills, Waterfall & Dams",
    'ashtavinayak': "Spiritual Trail of Lord Ganesha",
    'jyotirlinga-maharashtra': "WHERE HILLS MEET DEVOTION",
    'konkan-darshan': "Beach, Forts & Hills"
  };

  const displayTours = showMumbaiOnly
    ? tours.filter(t => t.id === 'mumbai-darshan')
    : tours;

  return (
    <section id="tours" className="py-16 sm:py-24 bg-zinc-950 text-white relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Explore Mumbai & Beyond
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-2.5">
            Discover our range of convenient and comfortable cab services tailored to your needs.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayTours.map((tour) => {
            const badgeTag = tourBadges[tour.id] || tour.category;
            const targetUrl = tour.id === 'mumbai-darshan' ? '/mumbai-darshan' : `/#contact`;

            return (
              <div
                key={tour.id}
                onClick={() => {
                  if (tour.id === 'mumbai-darshan') {
                    window.location.href = '/mumbai-darshan';
                  } else {
                    onSelectTour(tour);
                  }
                }}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400/50 shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                
                {/* Tour Image Container with Badge */}
                <div className="relative h-56 w-full overflow-hidden bg-black">
                  <img
                    src={tour.banner}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Top Left Badge Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-black/90 backdrop-blur-md text-yellow-400 font-bold text-[11px] flex items-center gap-1 border border-yellow-400/40">
                      <MapPin className="w-3 h-3 text-yellow-400" />
                      <span>{badgeTag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-yellow-400 transition">
                      {tour.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {tour.shortDescription}
                    </p>
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-2">
                    <a
                      href={targetUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-yellow-400 hover:text-yellow-300 group-hover:translate-x-1 transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
