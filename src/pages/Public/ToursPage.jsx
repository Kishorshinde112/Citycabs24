import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import TourPackages from '../../components/TourPackages';
import TourModal from '../../components/TourModal';
import QuickBookModal from '../../components/QuickBookModal';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import PrivacyModal from '../../components/PrivacyModal';
import SEOHead from '../../components/SEOHead';
import { TOURS_SEO, getBreadcrumbSchema } from '../../utils/seoData';

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleOpenBookModal = (initialData = {}) => {
    setBookModalInitialData(initialData);
    setBookModalOpen(true);
  };

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tour Packages', url: '/tours' }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white pb-14 sm:pb-0">
      <SEOHead
        title={TOURS_SEO['tours'].title}
        description={TOURS_SEO['tours'].description}
        canonical={TOURS_SEO['tours'].canonical}
        schema={[breadcrumbs]}
      />
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />
      <main className="flex-1">
        {/* Visible Page Header with H1 */}
        <section className="bg-zinc-950 border-b border-zinc-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-yellow-400 font-semibold text-xs tracking-wider uppercase">
              Custom Sightseeing & Outstation Cabs
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Maharashtra Cab & Sightseeing Tour Packages
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Explore Mumbai, hill stations, and spiritual pilgrimage circuits with our sanitized AC fleet and experienced local driver-guides.
            </p>
          </div>
        </section>
        <TourPackages onSelectTour={(tour) => setSelectedTour(tour)} />
      </main>
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onSelectTour={(tour) => setSelectedTour(tour)}
      />
      <FloatingActions onOpenBookModal={() => handleOpenBookModal()} />
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onBookClick={() => {
            const current = selectedTour;
            setSelectedTour(null);
            handleOpenBookModal({ dropCity: current.title, tripType: 'Tour Package' });
          }}
        />
      )}
      <QuickBookModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        initialData={bookModalInitialData}
      />
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
