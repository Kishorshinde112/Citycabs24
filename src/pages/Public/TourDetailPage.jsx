import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import QuickBookModal from '../../components/QuickBookModal';
import PrivacyModal from '../../components/PrivacyModal';
import AutoEnquiryModal from '../../components/AutoEnquiryModal';
import TourModal from '../../components/TourModal';
import SEOHead from '../../components/SEOHead';
import { Phone, Check, Sparkles, ArrowRight } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';
import useContentStore from '../../store/contentStore';
import { TOURS_DATA } from '../../data/toursData';
import { TOURS_SEO, getBreadcrumbSchema, getTouristTripSchema } from '../../utils/seoData';

export default function TourDetailPage({
  tourId,
  slug,
  tourName,
  subtitle,
  heroImage,
  description,
  rules,
  attractionTitle = 'Top Attractions',
  attractions = [],
  rateColumns = [],
  rates = [],
  tripType,
}) {
  const { phone } = useSettingsStore();
  const { tours } = useContentStore();

  const localTour = TOURS_DATA.find(t =>
    (slug && t.slug === slug) ||
    (tourId && (t.id === tourId || t.slug === tourId)) ||
    (t.title && tourName && (
      t.title.toLowerCase().includes(tourName.toLowerCase()) ||
      tourName.toLowerCase().includes(t.title.toLowerCase())
    ))
  );

  const effectiveSlug = slug || localTour?.slug || localTour?.id || tourId || (tourName ? tourName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');

  const matchedTour = tours?.find(t =>
    (tourId && (t.id === tourId || t.slug === tourId)) ||
    (effectiveSlug && (t.id === effectiveSlug || t.slug === effectiveSlug)) ||
    (t.title && tourName && (
      t.title.toLowerCase().includes(tourName.toLowerCase()) ||
      tourName.toLowerCase().includes(t.title.toLowerCase())
    ))
  );

  // Use real local banner image as primary source, keeping Unsplash only as last-resort fallback
  const displayHeroImage = localTour?.banner || matchedTour?.banner || heroImage;

  const seo = TOURS_SEO[effectiveSlug] || {
    title: `${tourName} Cab Service from Mumbai | CityCabs24`,
    description: description ? `${description.slice(0, 140)}... Call +91 ${phone} for doorstep pickup.` : `Book ${tourName} cab with expert guide drivers from Mumbai. Doorstep pickup, transparent fares & 24/7 service. Call +91 ${phone}!`,
    canonical: `https://citycabs24.com/${effectiveSlug}`,
  };

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tour Packages', url: '/tours' },
    { name: tourName, url: `/${effectiveSlug}` }
  ]);

  const tripSchema = getTouristTripSchema({
    tourName,
    description: description || seo.description,
    slug: effectiveSlug,
    banner: displayHeroImage,
    rates,
    startingPrice: localTour?.startingPrice
  });

  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [autoEnquiryOpen, setAutoEnquiryOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAutoEnquiryOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenBookModal = (extra = {}) => {
    setBookModalInitialData({ dropCity: tourName, tripType: tripType || 'Tour Package', ...extra });
    setBookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col pb-14 sm:pb-0">
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogImage={displayHeroImage}
        schema={[breadcrumbs, tripSchema]}
      />
      <Navbar
        onOpenBookModal={() => handleOpenBookModal()}
        onSelectTour={(tour) => setSelectedTour(tour)}
      />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img src={displayHeroImage} alt={`${tourName} - CityCabs24 tour package`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4 space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">{tourName}</h1>
            {subtitle && <p className="text-lg sm:text-2xl text-zinc-200 font-medium max-w-2xl">{subtitle}</p>}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              <a href="#rate-card" className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-yellow-400/20 transition flex items-center gap-1.5">
                <span>View Rate Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button type="button" onClick={() => setAutoEnquiryOpen(true)} className="px-6 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-yellow-400 border border-yellow-400/50 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Submit Enquiry (Get Discount)</span>
              </button>
              <a href={`tel:+91${phone}`} className="px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow">
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2-column content */}
        <section className="py-12 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

              {/* LEFT */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400">🚗 Get drivers who act as a guide</h3>
                  {description && <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{description}</p>}
                  <div className="border-b border-dashed border-zinc-800 my-6" />
                </div>

                {rules && rules.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Important Information</h2>
                    <div className="space-y-3">
                      {rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-b border-dashed border-zinc-800 my-6" />
                  </div>
                )}

                {attractions && attractions.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">{attractionTitle}</h2>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
                      {attractions.map((place, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-xl shrink-0 mt-0.5">{place.emoji}</span>
                          <div>
                            <span className="font-bold text-yellow-400 text-sm">{place.name}</span>
                            {place.desc && <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{place.desc}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <div id="rate-card" className="scroll-mt-24 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="bg-yellow-400 text-black p-4 font-black text-base">Rate Card</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-yellow-500/20 text-yellow-400 text-[11px] font-extrabold border-b border-zinc-800">
                          <th className="p-3 text-left border-r border-zinc-800">Vehicle</th>
                          {rateColumns.map((col, i) => (
                            <th key={i} className="p-3 text-center border-r border-zinc-800 last:border-r-0">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 text-zinc-200 font-medium">
                        {rates.map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/80 transition">
                            <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">{row.vehicle}</td>
                            {row.cols.map((val, i) => (
                              <td key={i} className="p-3 text-center border-r border-zinc-800 last:border-r-0">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-2xl border-2 border-yellow-400 p-6 space-y-4 shadow-2xl shadow-yellow-400/10">
                  <h3 className="text-lg font-black text-white flex items-center justify-between">
                    <span>Quick Booking</span>
                    <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-extrabold">Instant</span>
                  </h3>
                  <p className="text-xs text-zinc-400">Get instant driver &amp; cab confirmation for your {tourName}</p>
                  <button onClick={() => handleOpenBookModal()} className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-base shadow-lg shadow-yellow-400/20 transition cursor-pointer">
                    Book Now
                  </button>
                  <button type="button" onClick={() => setAutoEnquiryOpen(true)} className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-yellow-400/30 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Submit Enquiry Now</span>
                  </button>
                  <div className="pt-2 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-800">
                    <span>Or call us directly:</span>
                    <a href={`tel:+91${phone}`} className="font-bold text-yellow-400 hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-yellow-400" />
                      <span>+91 {phone}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer onOpenPrivacyModal={() => setPrivacyModalOpen(true)} onSelectTour={(tour) => setSelectedTour(tour)} />
      <FloatingActions onOpenBookModal={() => handleOpenBookModal()} />

      {selectedTour && (
        <TourModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onBookClick={() => {
            const t = selectedTour;
            setSelectedTour(null);
            handleOpenBookModal({ dropCity: t.title, tripType: 'Tour Package' });
          }}
        />
      )}

      <QuickBookModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} initialData={bookModalInitialData} />
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <AutoEnquiryModal isOpen={autoEnquiryOpen} onClose={() => setAutoEnquiryOpen(false)} />
    </div>
  );
}
