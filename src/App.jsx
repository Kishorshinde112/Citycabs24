import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import Home from './pages/Home';
import ToursPage from './pages/Public/ToursPage';
import MumbaiDarshanPage from './pages/Public/MumbaiDarshanPage';
import ShirdiTourPage from './pages/Public/ShirdiTourPage';
import AshtavinayakPage from './pages/Public/AshtavinayakPage';
import IgatpuriTourPage from './pages/Public/IgatpuriTourPage';
import MahabaleshwarPage from './pages/Public/MahabaleshwarPage';
import MatheranPage from './pages/Public/MatheranPage';
import JyotirlingaPage from './pages/Public/JyotirlingaPage';
import KonkanDarshanPage from './pages/Public/KonkanDarshanPage';
import LonavalaTripPage from './pages/Public/LonavalaTripPage';
import AlibaugPage from './pages/Public/AlibaugPage';
import ThankYouPage from './pages/Public/ThankYouPage';
import EnquiryThankYouPage from './pages/Public/EnquiryThankYouPage';
import ToursManager from './pages/Admin/ToursManager';
import AdminLayout from './pages/Admin/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Settings from './pages/Admin/Settings';

function GoogleAdsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'AW-18424689411', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  const isDev = import.meta.env.DEV || (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');

  return (
    <>
      <BrowserRouter>
        <GoogleAdsTracker />
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<ToursPage />} />

        {/* Tour Pages */}
        <Route path="/mumbai-darshan" element={<MumbaiDarshanPage />} />
        <Route path="/mumbai-darshan-cab-service" element={<MumbaiDarshanPage />} />
        <Route path="/lonavala-trip" element={<LonavalaTripPage />} />
        <Route path="/alibaug-sightseeing" element={<AlibaugPage />} />
        <Route path="/matheran-sightseeing" element={<MatheranPage />} />
        <Route path="/shirdi-tour" element={<ShirdiTourPage />} />
        <Route path="/mahabaleshwar-sightseeing" element={<MahabaleshwarPage />} />
        <Route path="/igatpuri-tour" element={<IgatpuriTourPage />} />
        <Route path="/ashtavinayak" element={<AshtavinayakPage />} />
        <Route path="/3-jyotirlinga-in-maharashtra" element={<JyotirlingaPage />} />
        <Route path="/konkan-darshan" element={<KonkanDarshanPage />} />
        <Route path="/booking-confirmed" element={<ThankYouPage />} />
        <Route path="/enquiry-received" element={<EnquiryThankYouPage />} />
        <Route path="/enquiry-confirmed" element={<EnquiryThankYouPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tours" element={<ToursManager />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    {isDev && <Agentation />}
  </>
  );
}
