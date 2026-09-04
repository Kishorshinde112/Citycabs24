import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TourPackages from '../components/TourPackages';
import MumbaiDarshanRateTable from '../components/MumbaiDarshanRateTable';
import TourModal from '../components/TourModal';
import FleetSection from '../components/FleetSection';
import FareCalculator from '../components/FareCalculator';
import WhyChooseUs from '../components/WhyChooseUs';
import GallerySection from '../components/GallerySection';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import FaqSection from '../components/FaqSection';
import BookingContactForm from '../components/BookingContactForm';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import QuickBookModal from '../components/QuickBookModal';
import PrivacyModal from '../components/PrivacyModal';

export default function Home() {
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

      {/* Top Navigation */}
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Interactive Booking Widget */}
        <Hero
          onSelectTour={(tour) => setSelectedTour(tour)}
          onOpenBookModal={(data) => handleOpenBookModal(data)}
        />

        {/* Official Mumbai Sightseeing Rate Chart & Itineraries */}
        <MumbaiDarshanRateTable onOpenBookModal={(data) => handleOpenBookModal(data)} />

        {/* Highlight Mumbai Darshan */}
        <TourPackages onSelectTour={(tour) => setSelectedTour(tour)} showMumbaiOnly={true} />

        {/* Full Cab Fleet Showcase (Hatchback, Sedan, MUV, MPV, Luxury Crysta, TT) */}
        <FleetSection onOpenBookModal={(data) => handleOpenBookModal(data)} />

        {/* Transparent Fare Chart & Interactive Route Estimator */}
        <FareCalculator />

        {/* Why Choose Us / Driver-Cum-Guide Advantage */}
        <WhyChooseUs onOpenBookModal={() => handleOpenBookModal()} />

        {/* Tour Moments & Photo Gallery */}
        <GallerySection />

        {/* Customer Reviews & Google Rating */}
        <Testimonials />

        {/* About Us & Our Mission */}
        <AboutSection onOpenBookModal={() => handleOpenBookModal()} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Direct Booking & Inquiry Contact Form */}
        <BookingContactForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onSelectTour={(tour) => setSelectedTour(tour)}
      />

      {/* Floating Call & WhatsApp Desk + Mobile Sticky Bar */}
      <FloatingActions onOpenBookModal={() => handleOpenBookModal()} />

      {/* Full Tour Details Modal */}
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

      {/* Quick Booking Popup Modal */}
      <QuickBookModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        initialData={bookModalInitialData}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

    </div>
  );
}
