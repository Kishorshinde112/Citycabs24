import React from 'react';
import BookingForm from './BookingForm';

export default function MumbaiDarshan() {
  return (
    <div className="bg-white py-20 px-12 max-w-7xl mx-auto">
      <h1 className="text-6xl font-black text-blue-900 mb-20 text-center uppercase tracking-wider">Mumbai Darshan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="border border-slate-100 rounded-2xl p-6 hover:shadow-2xl transition duration-500">
            <div className="bg-slate-100 h-48 rounded-xl mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Spot {i}</h2>
            <p className="text-slate-500">Discover Mumbai's heart.</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center"><BookingForm /></div>
    </div>
  );
}
