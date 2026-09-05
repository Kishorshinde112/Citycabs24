import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import MumbaiDarshanRateTable from '../../components/MumbaiDarshanRateTable';
import FleetSection from '../../components/FleetSection';
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../components/Testimonials';
import FaqSection from '../../components/FaqSection';
import BookingContactForm from '../../components/BookingContactForm';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import QuickBookModal from '../../components/QuickBookModal';
import PrivacyModal from '../../components/PrivacyModal';
import AutoEnquiryModal from '../../components/AutoEnquiryModal';
import { Camera, MapPin, Phone, MessageCircle, Star, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

export default function MumbaiDarshanPage() {
  const { phone } = useSettingsStore();
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [autoEnquiryOpen, setAutoEnquiryOpen] = useState(false);

  const handleOpenBookModal = (initialData = {}) => {
    setBookModalInitialData({ dropCity: 'Mumbai Darshan', tripType: 'Mumbai Darshan', ...initialData });
    setBookModalOpen(true);
  };

  const mumbaiPlaces = [
    { title: 'Gateway of India', category: 'Historical Landmark', desc: 'Iconic 20th-century monument facing the Arabian Sea & Taj Mahal Palace Hotel.', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
    { title: 'Marine Drive & Queen\'s Necklace', category: 'Coastal Promenade', desc: '3.6 km long arc-shaped boulevard along the coastline, stunning during sunset & night.', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80' },
    { title: 'Siddhivinayak Temple', category: 'Spiritual Shrine', desc: 'One of India\'s most revered Ganesha temples located in Prabhadevi.', img: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80' },
    { title: 'Haji Ali Dargah', category: 'Heritage & Pilgrimage', desc: 'Famous mosque & tomb located on an islet off the coast of Worli in South Mumbai.', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80' },
    { title: 'Bandra Bandstand & Celebrity Homes', category: 'Sightseeing Highlight', desc: 'Walk along Bandra promenade, visit Bandra Fort, and see Shah Rukh Khan\'s Mannat & Salman Khan\'s Galaxy.', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80' },
    { title: 'Juhu Beach & Street Food', category: 'Beach & Culinary', desc: 'Famous beach known for Mumbai street food like Pav Bhaji, Bhel Puri, and sea breeze.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-amber-500 selection:text-white pb-14 sm:pb-0">
      
      {/* Navigation */}
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />

      <main className="flex-1">

        {/* Hero Section for Mumbai Darshan */}
        <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-35" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')` }}
          />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Official Guided Sightseeing Service</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Mumbai Darshan <span className="text-amber-400">Cab Service</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
                Explore the City of Dreams with expert driver-cum-guides. Private AC Cabs for South Mumbai, North Mumbai & Full-Day Sightseeing Tours. Doorstep pickup across Mumbai, Thane & Navi Mumbai.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 text-xs sm:text-sm font-semibold text-slate-200">
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Doorstep Pickup</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Verified Drivers</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 col-span-2 sm:col-span-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9★ Top Rated</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => handleOpenBookModal({ dropCity: 'Mumbai Darshan Full Day' })}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5"
                >
                  Book Mumbai Darshan Cab
                </button>

                <a
                  href={`tel:+91${phone}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call +91 {phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Chart & Itineraries */}
        <MumbaiDarshanRateTable onOpenBookModal={(data) => handleOpenBookModal(data)} />

        {/* Key Attractions Covered */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Iconic Landmarks</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
                Top Places Covered in Mumbai Darshan
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Our drivers ensure you get ample time at every spot to click photos, shop, and absorb the history.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mumbaiPlaces.map((place, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="h-44 overflow-hidden relative">
                    <img src={place.img} alt={place.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-md uppercase">
                      {place.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold font-display text-lg text-slate-900">{place.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">{place.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Showcase */}
        <FleetSection onOpenBookModal={(data) => handleOpenBookModal(data)} />

        {/* Why Choose CityCabs24 */}
        <WhyChooseUs onOpenBookModal={() => handleOpenBookModal()} />

        {/* Reviews */}
        <Testimonials />

        {/* FAQs */}
        <FaqSection />

        {/* Contact Booking Form */}
        <BookingContactForm />

      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onSelectTour={() => {}}
      />

      {/* Floating Actions */}
      <FloatingActions onOpenBookModal={() => handleOpenBookModal()} />

      {/* Quick Booking Modal */}
      <QuickBookModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        initialData={bookModalInitialData}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Timed Enquiry Modal */}
      <AutoEnquiryModal
        isOpen={autoEnquiryOpen}
        onClose={() => setAutoEnquiryOpen(false)}
      />

    </div>
  );
}
