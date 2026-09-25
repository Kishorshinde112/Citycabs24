import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TourPackages from '../components/TourPackages';
import MumbaiDarshanRateTable from '../components/MumbaiDarshanRateTable';
import TourModal from '../components/TourModal';
import FleetSection from '../components/FleetSection';
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
import AutoEnquiryModal from '../components/AutoEnquiryModal';
import SEOHead from '../components/SEOHead';
import { TOURS_DATA } from '../data/toursData';
import useSettingsStore from '../store/settingsStore';
import { DEFAULT_SEO, getLocalBusinessSchema, getFaqSchema } from '../utils/seoData';

export default function Home() {
  const { phone } = useSettingsStore();
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [autoEnquiryOpen, setAutoEnquiryOpen] = useState(false);

  // Check URL query parameters (e.g. /?tour=lonavala-trip)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tourParam = params.get('tour');
    if (tourParam) {
      const match = TOURS_DATA.find(t => t.id === tourParam);
      if (match) {
        setSelectedTour(match);
        setTimeout(() => {
          const el = document.getElementById(`tour-${tourParam}`) || document.getElementById('tours');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  // Auto trigger enquiry modal after 5 seconds of user spending time on page
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoEnquiryOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenBookModal = (initialData = {}) => {
    setBookModalInitialData({
      dropCity: 'Mumbai Darshan',
      tourName: 'Mumbai Darshan',
      ...initialData
    });
    setBookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black pb-14 sm:pb-0">
      <SEOHead
        title={DEFAULT_SEO.title}
        description={DEFAULT_SEO.description}
        canonical="/"
        ogImage="/logo.png"
        schema={[getLocalBusinessSchema(phone), getFaqSchema()]}
      />

      {/* Top Navigation */}
      <Navbar 
        onOpenBookModal={() => handleOpenBookModal()} 
        onSelectTour={(tour) => setSelectedTour(tour)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectTour={(tour) => setSelectedTour(tour)}
          onOpenBookModal={(data) => handleOpenBookModal(data)}
        />

        {/* Explore Mumbai & Beyond (10 Tour Cards) */}
        <TourPackages onSelectTour={(tour) => setSelectedTour(tour)} showMumbaiOnly={false} />

        {/* Why Choose CityCabs24? (Peach Section with 6 Feature Boxes) */}
        <WhyChooseUs onOpenBookModal={() => handleOpenBookModal()} />

        {/* Our Cabs Gallery (Dark Navy Section) */}
        <FleetSection onOpenBookModal={(data) => handleOpenBookModal(data)} />

        {/* What Our Customers Say */}
        <Testimonials />

        {/* Memories from Our Tours */}
        <GallerySection />

        {/* About Us */}
        <AboutSection onOpenBookModal={() => handleOpenBookModal()} />

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

      {/* Auto Timed Discount Enquiry Modal (5-6s Trigger) */}
      <AutoEnquiryModal
        isOpen={autoEnquiryOpen}
        onClose={() => setAutoEnquiryOpen(false)}
      />

    </div>
  );
}
