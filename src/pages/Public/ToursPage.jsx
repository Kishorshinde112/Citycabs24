import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import TourPackages from '../../components/TourPackages';
import TourModal from '../../components/TourModal';
import QuickBookModal from '../../components/QuickBookModal';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import PrivacyModal from '../../components/PrivacyModal';

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleOpenBookModal = (initialData = {}) => {
    setBookModalInitialData(initialData);
    setBookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white pb-14 sm:pb-0">
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />
      <main className="flex-1 pt-12">
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
