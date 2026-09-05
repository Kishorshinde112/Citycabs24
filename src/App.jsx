import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ToursPage from './pages/Public/ToursPage';
import MumbaiDarshanPage from './pages/Public/MumbaiDarshanPage';
import ToursManager from './pages/Admin/ToursManager';
import AdminLayout from './pages/Admin/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Settings from './pages/Admin/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/mumbai-darshan" element={<MumbaiDarshanPage />} />
        <Route path="/mumbai-darshan-cab-service" element={<MumbaiDarshanPage />} />

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
  );
}
