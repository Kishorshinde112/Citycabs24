import React, { useState, useEffect } from 'react';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';
import { X, MessageCircle, Phone, Sparkles, CheckCircle2, Send, Car, Calendar, MapPin, Clock, Users, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function QuickBookModal({ isOpen, onClose, initialData = {} }) {
  const { phone } = useSettingsStore();
  const { addBooking } = useBookingsStore();

  if (!isOpen) return null;

  const [step, setStep] = useState(1);
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
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDone(false);
      setError('');
    }
  }, [isOpen]);

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    if (step === 1 && (!formData.pickup || !formData.drop || !formData.date)) {
      setError('Please fill in pickup, destination, and date.');
      return;
    }
    if (step === 2 && !formData.carType) {
      setError('Please select a car type.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    addBooking({
      name: formData.name,
      contact: formData.phone,
      tripType: formData.tripType,
      tourName: formData.drop, // Usually drop is used as tour name in original flow
      travelDate: formData.date || new Date().toISOString(),
      carType: formData.carType,
      pickupLocation: formData.pickup
    });

    setDone(true);

    // Optional: Keep whatsapp redirect, but we make it look less AI generated and more integrated
    setTimeout(() => {
      onClose();
    }, 4000);
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

        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Fast Booking Desk</span>
        </div>

        <h3 className="text-2xl font-black font-display text-slate-900">
          Book Your Guided Cab
        </h3>

        {!done && (
          <div className="mb-6 mt-4">
            <div className="flex justify-between items-center relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-slate-100 before:-z-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-white transition-colors duration-300 ${step >= i ? 'border-indigo-600 text-indigo-600' : 'border-slate-200 text-slate-400'}`}>
                  {i}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-slate-400">
              <span className={step >= 1 ? 'text-indigo-600' : ''}>Trip Details</span>
              <span className={step >= 2 ? 'text-indigo-600' : ''}>Vehicle</span>
              <span className={step >= 3 ? 'text-indigo-600' : ''}>Contact</span>
            </div>
          </div>
        )}

        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 animate-fadeIn my-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-emerald-900 font-display">Thank you for booking!</h4>
              <p className="text-sm text-emerald-700 mt-2">
                Your request has been successfully submitted to our system. We will contact you shortly to confirm your driver details and fare.
              </p>
            </div>
            <button onClick={onClose} className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition">
              Close Window
            </button>
          </div>
        ) : (
          <form className="space-y-5 animate-fadeIn">
            {error && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100">{error}</div>}

            {step === 1 && (
              <div className="space-y-4 animate-slideInRight">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Pickup Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Where should we pick you up? (e.g. Mumbai Airport / Dadar)"
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" /> Destination / Tour Package *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Where are you going? (e.g. Pune, Lonavala, Mumbai Darshan)"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-500" /> Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Continue to Vehicle Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-slideInRight">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-indigo-500" /> Select Vehicle Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'Swift Dzire (Sedan 4+1)', name: 'Sedan (Dzire/Etios)', desc: '4 Seats • AC', icon: Car },
                      { id: 'Maruti Ertiga (MUV 6+1)', name: 'SUV (Ertiga)', desc: '6 Seats • AC', icon: Users },
                      { id: 'Innova Crysta (Luxury 7+1)', name: 'Luxury (Innova)', desc: '7 Seats • Premium', icon: Sparkles },
                      { id: 'Tempo Traveller (13/17)', name: 'Tempo Traveller', desc: '13-17 Seats • Group', icon: Users }
                    ].map(car => (
                      <div
                        key={car.id}
                        onClick={() => setFormData({...formData, carType: car.id})}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.carType === car.id ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                      >
                        <car.icon className={`w-5 h-5 mb-2 ${formData.carType === car.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <div className={`font-bold text-sm ${formData.carType === car.id ? 'text-indigo-900' : 'text-slate-700'}`}>{car.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{car.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-[2] py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <span>Final Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-slideInRight">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-500" /> Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" /> Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Secure Booking</span>
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-2">By submitting, you agree to our terms of service.</p>
              </div>
            )}

          </form>
        )}

        {!done && (
          <div className="text-center pt-6 border-t border-slate-100 mt-6">
            <a href={`tel:+91${phone}`} className="text-xs font-bold text-slate-600 hover:text-indigo-600">
              Or call directly: +91 {phone}
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
