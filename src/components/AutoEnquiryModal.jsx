import React, { useState, useEffect } from 'react';
import useBookingsStore from '../store/bookingsStore';
import { X, CheckCircle2 } from 'lucide-react';

export default function AutoEnquiryModal({ isOpen, onClose }) {
  const { addBooking } = useBookingsStore();

  const [formData, setFormData] = useState({
    destination: 'Mumbai Darshan',
    fullName: '',
    phone: '',
    travelDate: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
      if (!formData.travelDate) {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, travelDate: today }));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setError('Please enter your full name and phone number.');
      return;
    }

    addBooking({
      name: formData.fullName,
      contact: formData.phone,
      tripType: 'Auto Discount Enquiry',
      tourName: formData.destination,
      travelDate: formData.travelDate || new Date().toISOString().split('T')[0],
      carType: 'Standard Cab / Tour Vehicle',
      pickupLocation: 'Customer Address'
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-7 transition-all">
        
        {/* Close (X) Icon */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Headline */}
        <div className="text-center mb-6 pt-1">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            Submit Your Enquiry Now!
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Book your Mumbai Darshan & Guided Sightseeing Tour
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 my-2 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-emerald-900">Enquiry Submitted!</h4>
            <p className="text-xs sm:text-sm text-emerald-700">
              Thank you! Our team will contact you shortly with discount details for <strong>{formData.destination}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg border border-rose-100">
                {error}
              </div>
            )}

            {/* Destination Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Destination <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none cursor-pointer font-medium text-slate-800"
                >
                  <option value="Mumbai Darshan">Mumbai Darshan</option>
                  <option value="Lonavala Trip">Lonavala Trip</option>
                  <option value="Alibaug Sightseeing">Alibaug Sightseeing</option>
                  <option value="Matheran Sightseeing">Matheran Sightseeing</option>
                  <option value="Shirdi Tour">Shirdi Tour</option>
                  <option value="Mahabaleshwar Sightseeing">Mahabaleshwar Sightseeing</option>
                  <option value="Igatpuri Tour">Igatpuri Tour</option>
                  <option value="Ashtavinayak">Ashtavinayak</option>
                  <option value="3 Jyotirlinga in Maharashtra">3 Jyotirlinga in Maharashtra</option>
                  <option value="Konkan Darshan">Konkan Darshan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Travel Date Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Travel Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-slate-800"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 px-4 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition text-center"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
