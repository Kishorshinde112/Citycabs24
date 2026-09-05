import React from 'react';
import BookingForm from './BookingForm';

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <nav className="flex justify-between items-center py-6 px-12 border-b border-slate-100">
        <h1 className="text-3xl font-black text-blue-900 tracking-tighter uppercase">CityCabs24</h1>
        <div className="space-x-8 font-medium text-slate-500">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/mumbai-darshan" className="hover:text-blue-600 transition">Mumbai Darshan</a>
        </div>
      </nav>
      <header className="bg-slate-900 py-32 px-12 text-center text-white">
        <h1 className="text-7xl font-black mb-6 uppercase tracking-wider">Luxury Mumbai Tours</h1>
        <p className="text-2xl text-slate-400 mb-12">Elite cab service for elite experiences.</p>
        <div className="flex justify-center"><BookingForm /></div>
      </header>
    </div>
  );
}
