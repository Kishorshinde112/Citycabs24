import React, { useState } from 'react';
import { Camera, Image as ImageIcon, X, MapPin } from 'lucide-react';
import { GALLERY_DATA } from '../data/routesData';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Mumbai', 'Hill Stations', 'Beaches', 'Spiritual', 'Fleet'];

  const filtered = activeFilter === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(g => g.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Tour Moments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Tour Memories & <span className="text-amber-600">Scenic Photo Spots</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Snapshots from memorable journeys, scenic highway viewpoints, and heritage landmarks explored by our travellers.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-56 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-[10px] text-amber-400 font-bold uppercase">{item.category}</span>
                <span className="text-xs font-bold text-white leading-tight">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] flex items-center justify-center bg-black">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 bg-slate-900 flex items-center justify-between text-white border-t border-slate-800">
                <div>
                  <span className="text-xs text-amber-400 font-bold block">{selectedImage.category}</span>
                  <h4 className="text-base font-bold">{selectedImage.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
