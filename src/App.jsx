import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';

// Lazy loaded components
import Home from './pages/Home';
const ToursPage = lazy(() => import('./pages/Public/ToursPage'));
const MumbaiDarshanPage = lazy(() => import('./pages/Public/MumbaiDarshanPage'));
const ShirdiTourPage = lazy(() => import('./pages/Public/ShirdiTourPage'));
const AshtavinayakPage = lazy(() => import('./pages/Public/AshtavinayakPage'));
const IgatpuriTourPage = lazy(() => import('./pages/Public/IgatpuriTourPage'));
const MahabaleshwarPage = lazy(() => import('./pages/Public/MahabaleshwarPage'));
const MatheranPage = lazy(() => import('./pages/Public/MatheranPage'));
const JyotirlingaPage = lazy(() => import('./pages/Public/JyotirlingaPage'));
const KonkanDarshanPage = lazy(() => import('./pages/Public/KonkanDarshanPage'));
const LonavalaTripPage = lazy(() => import('./pages/Public/LonavalaTripPage'));
const AlibaugPage = lazy(() => import('./pages/Public/AlibaugPage'));
const ThankYouPage = lazy(() => import('./pages/Public/ThankYouPage'));
const EnquiryThankYouPage = lazy(() => import('./pages/Public/EnquiryThankYouPage'));
const NotFoundPage = lazy(() => import('./pages/Public/NotFoundPage'));
const ToursManager = lazy(() => import('./pages/Admin/ToursManager'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const Login = lazy(() => import('./pages/Admin/Login'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const Settings = lazy(() => import('./pages/Admin/Settings'));

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

// Global fallback loader for Suspense (can be empty if we want to rely on the SSR shell for the initial load, 
// but we need something for route transitions)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const isDev = import.meta.env.DEV || (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');

  return (
    <>
      <BrowserRouter>
        <GoogleAdsTracker />
        <Suspense fallback={null}>
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

            {/* Catch-all fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {isDev && <Agentation />}
    </>
  );
}
