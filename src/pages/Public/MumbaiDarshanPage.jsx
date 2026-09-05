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

        {/* Key Attractions Covered - Clean Text List */}
        <section className="py-14 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Complete Circuit</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">
                Major Sightseeing Spots Covered
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Our experienced driver-guides give you dedicated time at each landmark to explore, take photos, and enjoy local food.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { name: 'Gateway of India & Taj Palace', cat: 'South Mumbai' },
                { name: 'Marine Drive & Queen\'s Necklace', cat: 'South Mumbai' },
                { name: 'Siddhivinayak Temple', cat: 'South Mumbai' },
                { name: 'Haji Ali Dargah & Mahalaxmi Temple', cat: 'South Mumbai' },
                { name: 'Hanging Gardens & Kamla Nehru Park', cat: 'South Mumbai' },
                { name: 'Mani Bhavan (Mahatma Gandhi Museum)', cat: 'South Mumbai' },
                { name: 'CST Station & Crawford Market', cat: 'South Mumbai' },
                { name: 'Girgaon Chowpatty Beach', cat: 'South Mumbai' },
                { name: 'Bandra Bandstand & Promenade', cat: 'North Mumbai' },
                { name: 'Celebrity Homes (SRK\'s Mannat & Salman\'s Galaxy)', cat: 'North Mumbai' },
                { name: 'Juhu Beach & Street Food Market', cat: 'North Mumbai' },
                { name: 'Bandra Fort (Castella de Aguada)', cat: 'North Mumbai' },
                { name: 'Mount Mary Church Bandra', cat: 'North Mumbai' },
                { name: 'ISKCON Temple Juhu', cat: 'North Mumbai' },
                { name: 'Bandra-Worli Sea Link Drive', cat: 'Connecting Route' }
              ].map((spot, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">{spot.name}</h3>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">{spot.cat}</span>
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
