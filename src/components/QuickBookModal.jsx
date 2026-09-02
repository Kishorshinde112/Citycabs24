import React, { useState } from 'react';
import { X, MessageCircle, Phone, Sparkles, CheckCircle2, Send, Car, Calendar, MapPin } from 'lucide-react';

export default function QuickBookModal({ isOpen, onClose, initialData = {} }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: initialData.pickupCity || '',
    drop: initialData.dropCity || '',
    date: initialData.pickupDate || '',
    carType: initialData.carType || 'Swift Dzire (Sedan 4+1)',
    tripType: initialData.tripType || 'One Way / Local',
    passengers: '4'
  });
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);

    const msg = `*🚖 CityTourCabs - Quick Ride Request*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Pickup:* ${formData.pickup}\n` +
      `*Drop / Tour:* ${formData.drop}\n` +
      `*Date:* ${formData.date || 'Immediate'}\n` +
      `*Vehicle:* ${formData.carType}\n` +
      `*Type:* ${formData.tripType}\n\n` +
      `Please provide instant rate and assign driver.`;

    setTimeout(() => {
      window.open(`https://wa.me/917021001921?text=${encodeURIComponent(msg)}`, '_blank');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Fast Booking Desk</span>
        </div>

        <h3 className="text-2xl font-black font-display text-slate-900">
          Book Your Guided Cab
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Get confirmed driver details and fair, all-inclusive pricing in minutes.
        </p>

        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900">Connecting to WhatsApp...</h4>
            <p className="text-xs text-emerald-700">Opening WhatsApp with your booking details for instant confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp No. *</label>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai Airport / Dadar"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Destination / Tour *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Lonavala"
                  value={formData.drop}
                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle</label>
                <select
                  value={formData.carType}
                  onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-amber-500 outline-none bg-white"
                >
                  <option value="Swift Dzire (Sedan 4+1)">Swift Dzire (Sedan 4+1)</option>
                  <option value="Maruti WagonR (Hatchback 4+1)">Maruti WagonR (Hatchback 4+1)</option>
                  <option value="Maruti Ertiga (MUV 6+1)">Maruti Ertiga (MUV 6+1)</option>
                  <option value="Kia Carens (MPV 7 Seater)">Kia Carens (MPV 7 Seater)</option>
                  <option value="Innova Crysta (Luxury 7+1)">Innova Crysta (Luxury 7+1)</option>
                  <option value="Tempo Traveller (13/17)">Tempo Traveller (13/17)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm & Book on WhatsApp</span>
            </button>

            <div className="text-center pt-2">
              <a href="tel:+917021001921" className="text-xs font-bold text-slate-600 hover:text-amber-600">
                Or call directly: +91 7021001921
              </a>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
