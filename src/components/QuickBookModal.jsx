import React, { useState, useEffect } from 'react';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';
import { 
  X, MessageCircle, Phone, Sparkles, CheckCircle2, Car, Calendar, 
  MapPin, Clock, Users, ShieldCheck, ArrowRight, ArrowLeft, Info, Check
} from 'lucide-react';
import { MUMBAI_DARSHAN_RATES, TOUR_TERMS } from '../data/mumbaiDarshanRates';

export default function QuickBookModal({ isOpen, onClose, initialData = {} }) {
  const { phone: ownerPhone } = useSettingsStore();
  const { addBooking } = useBookingsStore();

  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: initialData.pickupCity || '',
    drop: initialData.dropCity || 'Mumbai Darshan',
    date: initialData.pickupDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    carId: 'sedan',
    packageDuration: '8h_80km', // '8h_80km', '10h_100km', '12h_120km'
    notes: '',
  });

  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // Update form if initialData changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDone(false);
      setError('');
      if (initialData.dropCity) {
        setFormData(prev => ({
          ...prev,
          drop: initialData.dropCity,
          carId: initialData.carType ? getCarIdFromName(initialData.carType) : prev.carId,
          date: initialData.pickupDate || prev.date
        }));
      }
    }
  }, [isOpen, initialData]);

  const getCarIdFromName = (name) => {
    if (!name) return 'sedan';
    const lower = name.toLowerCase();
    if (lower.includes('wagon')) return 'wagonr';
    if (lower.includes('ertiga')) return 'ertiga';
    if (lower.includes('carens')) return 'carens';
    if (lower.includes('crysta') || lower.includes('innova')) return 'crysta';
    if (lower.includes('13')) return 'tempo13';
    if (lower.includes('17')) return 'tempo17';
    return 'sedan';
  };

  const selectedCar = MUMBAI_DARSHAN_RATES.find(c => c.id === formData.carId) || MUMBAI_DARSHAN_RATES[1];

  // Calculate fare dynamically
  const calculateFare = () => {
    if (selectedCar.isTempo) {
      return `₹${selectedCar.rates['12h_100km'].toLocaleString('en-IN')}`;
    }
    const rate = selectedCar.rates[formData.packageDuration];
    return rate ? `₹${rate.toLocaleString('en-IN')}` : 'Contact for Quote';
  };

  const getDurationLabel = () => {
    if (selectedCar.isTempo) return 'Full Day (12 Hrs / 100 Kms)';
    if (formData.packageDuration === '8h_80km') return '8 Hours / 80 Kms';
    if (formData.packageDuration === '10h_100km') return '10 Hours / 100 Kms';
    return '12 Hours / 120 Kms';
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    if (step === 1 && (!formData.pickup || !formData.drop || !formData.date)) {
      setError('Please fill in pickup location, tour/destination, and travel date.');
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
      setError('Please provide your name and 10-digit mobile number.');
      return;
    }

    const calculatedPrice = calculateFare();
    const durationText = getDurationLabel();

    // 1. Add to SQLite backend database + local state
    addBooking({
      name: formData.name,
      contact: formData.phone,
      phone: formData.phone,
      tripType: 'Mumbai Sightseeing Tour',
      tourName: formData.drop,
      route: `${formData.drop} (${durationText})`,
      vehicle: `${selectedCar.carType} • Fare: ${calculatedPrice}`,
      carType: selectedCar.carType,
      date: formData.date,
      pickupLocation: formData.pickup,
      fare: calculatedPrice,
      notes: formData.notes
    });

    setDone(true);
  };

  const handleOpenWhatsAppConfirmation = () => {
    const calculatedPrice = calculateFare();
    const durationText = getDurationLabel();

    const text = `*🚖 CityCabs24 - Sightseeing Cab Booking Confirmation*\n\n` +
      `👤 *Customer Name:* ${formData.name}\n` +
      `📱 *Mobile Number:* ${formData.phone}\n` +
      `📍 *Pickup Location:* ${formData.pickup}\n` +
      `🎯 *Tour/Route:* ${formData.drop}\n` +
      `⏱️ *Selected Duration:* ${durationText}\n` +
      `🚘 *Vehicle Type:* ${selectedCar.carType}\n` +
      `💰 *Estimated Fare:* ${calculatedPrice}/-\n` +
      `⚡ *Extra Rate:* ₹${selectedCar.extraKm}/km | ₹${selectedCar.extraHr}/hr\n` +
      `📅 *Date:* ${formData.date}\n` +
      (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '') +
      `\nHello, please confirm my driver assignment and cab booking.`;

    window.open(`https://wa.me/91${ownerPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Badge */}
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Transparent Rates Booking Desk</span>
        </div>

        <h3 className="text-2xl font-black font-display text-slate-900">
          Book Mumbai Sightseeing & Cabs
        </h3>

        {/* 3-Step Wizard Indicator */}
        {!done && (
          <div className="mb-6 mt-4">
            <div className="flex justify-between items-center relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-slate-100 before:-z-10">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-white transition-colors duration-300 ${
                    step >= i ? 'border-indigo-600 text-indigo-600 font-black' : 'border-slate-200 text-slate-400'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-slate-400">
              <span className={step >= 1 ? 'text-indigo-600' : ''}>1. Trip & Package</span>
              <span className={step >= 2 ? 'text-indigo-600' : ''}>2. Vehicle & Rate</span>
              <span className={step >= 3 ? 'text-indigo-600' : ''}>3. Customer Details</span>
            </div>
          </div>
        )}

        {/* SUCCESS CONFIRMATION SCREEN */}
        {done ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fadeIn my-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-emerald-950 font-display">Booking Received Successfully!</h4>
              <p className="text-xs sm:text-sm text-emerald-800 mt-2">
                Your request for <strong>{formData.drop}</strong> ({selectedCar.carType}) has been logged directly into our system.
              </p>
              <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-900">
                Estimated Fixed Fare: <span className="text-base font-black text-emerald-600">{calculateFare()}/-</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={handleOpenWhatsAppConfirmation}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly on WhatsApp</span>
              </button>

              <button 
                onClick={onClose} 
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-4 animate-fadeIn">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: TRIP & DURATION PACKAGE */}
            {step === 1 && (
              <div className="space-y-4">
                {/* Pickup */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Pickup Location in Mumbai / MMR *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai Airport T2, Dadar, Thane, Borivali, Hotel..."
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Tour / Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-indigo-600" /> Sightseeing Tour / Destination *
                  </label>
                  <select
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm bg-white"
                  >
                    <option value="Full Day Mumbai Darshan (South + North)">Full Day Mumbai Darshan (South + North)</option>
                    <option value="South Mumbai Sightseeing (12 Spots)">South Mumbai Sightseeing (12 Spots)</option>
                    <option value="North Mumbai Sightseeing (9 Spots)">North Mumbai Sightseeing (9 Spots)</option>
                    <option value="Lonavala & Khandala Getaway">Lonavala & Khandala Getaway</option>
                    <option value="Alibaug Beach & Coastal Tour">Alibaug Beach & Coastal Tour</option>
                    <option value="Shirdi Spiritual Tour">Shirdi Spiritual Tour</option>
                    <option value="Outstation Custom Route">Other Outstation / Custom Route</option>
                  </select>
                </div>

                {/* Duration Package Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" /> Package Duration Option *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: '8h_80km', label: '8 Hrs / 80 Km', sub: 'Standard Half Day' },
                      { key: '10h_100km', label: '10 Hrs / 100 Km', sub: 'Full Day Choice' },
                      { key: '12h_120km', label: '12 Hrs / 120 Km', sub: 'Extended Tour' }
                    ].map((dur) => (
                      <button
                        type="button"
                        key={dur.key}
                        onClick={() => setFormData({ ...formData, packageDuration: dur.key })}
                        className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                          formData.packageDuration === dur.key
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-1 ring-indigo-600'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{dur.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{dur.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-500" /> Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <span>Continue to Vehicle Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: VEHICLE SELECTION WITH DYNAMIC RATES */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-indigo-500" /> Select Vehicle & View Tariff *
                  </label>
                  <span className="text-[11px] font-bold text-indigo-600">
                    Duration: {getDurationLabel()}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {MUMBAI_DARSHAN_RATES.map((car) => {
                    const isSelected = formData.carId === car.id;
                    let fareDisplay = '';
                    if (car.isTempo) {
                      fareDisplay = `Rs. ${car.rates['12h_100km'].toLocaleString('en-IN')}/- (12h/100km)`;
                    } else {
                      fareDisplay = `Rs. ${car.rates[formData.packageDuration].toLocaleString('en-IN')}/-`;
                    }

                    return (
                      <div
                        key={car.id}
                        onClick={() => setFormData({ ...formData, carId: car.id })}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Car className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                              <span>{car.carType}</span>
                              {car.tag && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700">
                                  {car.tag}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {car.seating} • Extra: ₹{car.extraKm}/km, ₹{car.extraHr}/hr
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-black text-indigo-700">
                            {fareDisplay}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            Guide Included
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/3 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <span>Proceed with {selectedCar.carType}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CUSTOMER CONTACT & BOOKING SUMMARY */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Summary Card */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 text-xs text-indigo-950 space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span>{formData.drop}</span>
                    <span className="text-sm font-black text-indigo-700">{calculateFare()}/-</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 text-[11px]">
                    <span>{selectedCar.carType} • {getDurationLabel()}</span>
                    <span>Date: {formData.date}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-indigo-100">
                    Extra rates: ₹{selectedCar.extraKm}/km • ₹{selectedCar.extraHr}/hr • Sanitized AC Cab
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full pl-12 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm font-mono"
                    />
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Requests / Pickup Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flight arrival at 9 AM, baby seat needed..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/3 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Book Cab</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
}
