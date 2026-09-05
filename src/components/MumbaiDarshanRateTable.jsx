import React, { useState } from 'react';
import { 
  Car, Clock, MapPin, CheckCircle2, ShieldCheck, AlertCircle, 
  MessageCircle, Phone, Sparkles, ArrowRight, Check, Compass, Info
} from 'lucide-react';
import { MUMBAI_DARSHAN_RATES, SIGHTSEEING_ITINERARIES, TOUR_TERMS } from '../data/mumbaiDarshanRates';
import useSettingsStore from '../store/settingsStore';

export default function MumbaiDarshanRateTable({ onOpenBookModal }) {
  const { phone } = useSettingsStore();
  const [activeTab, setActiveTab] = useState('rates'); // 'rates', 'south', 'north', 'full'
  const [selectedDuration, setSelectedDuration] = useState('8h_80km'); // '8h_80km', '10h_100km', '12h_120km'

  const southTour = SIGHTSEEING_ITINERARIES.find(i => i.id === 'south-mumbai');
  const northTour = SIGHTSEEING_ITINERARIES.find(i => i.id === 'north-mumbai');
  const fullTour = SIGHTSEEING_ITINERARIES.find(i => i.id === 'full-day-darshan');

  const handleBookVehicle = (car, durationKey) => {
    let priceText = '';
    let durationText = '';

    if (car.isTempo) {
      priceText = car.rates['12h_100km'] ? `₹${car.rates['12h_100km'].toLocaleString('en-IN')}` : '';
      durationText = '12 Hrs / 100 Kms';
    } else {
      const price = car.rates[durationKey];
      priceText = price ? `₹${price.toLocaleString('en-IN')}` : '';
      durationText = durationKey === '8h_80km' ? '8 hrs / 80 kms' : durationKey === '10h_100km' ? '10 hrs / 100 kms' : '12 hrs / 120 kms';
    }

    if (onOpenBookModal) {
      onOpenBookModal({
        dropCity: `Mumbai Darshan (${durationText})`,
        carType: car.carType,
        tripType: 'Mumbai Sightseeing Tour',
        pickupDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        estimatedFare: priceText,
      });
    }
  };

  const handleWhatsAppBooking = (car, durationKey) => {
    let dur = durationKey === '8h_80km' ? '8 hrs / 80 Kms' : durationKey === '10h_100km' ? '10 hrs / 100 Kms' : '12 hrs / 120 Kms';
    let fare = car.isTempo ? `₹${car.rates['12h_100km']}/- (12h/100km)` : `₹${car.rates[durationKey]}/-`;

    const text = `*🚖 CityCabs24 - Mumbai Sightseeing Inquiry*\n\n` +
      `*Car Type:* ${car.carType}\n` +
      `*Package Selected:* ${car.isTempo ? 'Full Day 12h/100km' : dur}\n` +
      `*Fixed Fare:* ${fare}\n` +
      `*Extra Km Rate:* ₹${car.extraKm}/km\n` +
      `*Extra Hour Rate:* ₹${car.extraHr}/hr\n\n` +
      `Hello, I want to book this Mumbai Darshan tour. Please confirm driver availability.`;

    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="mumbai-rates" className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-400/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Official Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
            Mumbai Sightseeing <span className="text-yellow-400">Rates & Packages</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Choose from Half Day (8 hrs / 80 kms), Full Day (10 hrs / 100 kms), Extended Day (12 hrs / 120 kms), or Tempo Travellers with complete transparency.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('rates')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'rates'
                  ? 'bg-yellow-400 text-black font-black shadow-md scale-105'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Full Sightseeing Rate Chart</span>
            </button>

            <button
              onClick={() => setActiveTab('south')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'south'
                  ? 'bg-yellow-400 text-black font-black shadow-md scale-105'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>South Mumbai (12 Spots)</span>
            </button>

            <button
              onClick={() => setActiveTab('north')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'north'
                  ? 'bg-yellow-400 text-black font-black shadow-md scale-105'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>North Mumbai (9 Spots)</span>
            </button>

            <button
              onClick={() => setActiveTab('full')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'full'
                  ? 'bg-yellow-400 text-black font-black shadow-md scale-105'
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Full Day Complete Circuit</span>
            </button>
          </div>
        </div>

        {/* TAB 1: THE COMPLETE RATE CHART */}
        {activeTab === 'rates' && (
          <div className="space-y-6">
            {/* Rates Table Container */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden">
              
              {/* Header inside card */}
              <div className="bg-black text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold font-display flex items-center gap-2.5">
                    <Car className="w-5 h-5 text-yellow-400" />
                    <span>Mumbai Sightseeing Rates</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Fixed tariffs for local Mumbai tours. Driver-cum-guide included in all vehicles.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 text-xs">
                  <span className="text-zinc-400 pl-2">Quick Duration Filter:</span>
                  {['8h_80km', '10h_100km', '12h_120km'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition ${
                        selectedDuration === d
                          ? 'bg-yellow-400 text-black shadow-sm'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      {d === '8h_80km' ? '8h / 80km' : d === '10h_100km' ? '10h / 100km' : '12h / 120km'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 text-xs uppercase font-extrabold tracking-wider border-b border-slate-200">
                      <th className="py-4 px-4 sm:px-6">Car Types / Rates</th>
                      <th className={`py-4 px-4 text-center transition ${selectedDuration === '8h_80km' ? 'bg-indigo-50/80 text-indigo-900 font-black' : ''}`}>
                        8 hrs / 80 kms
                      </th>
                      <th className={`py-4 px-4 text-center transition ${selectedDuration === '10h_100km' ? 'bg-indigo-50/80 text-indigo-900 font-black' : ''}`}>
                        10 hrs / 100 kms
                      </th>
                      <th className={`py-4 px-4 text-center transition ${selectedDuration === '12h_120km' ? 'bg-indigo-50/80 text-indigo-900 font-black' : ''}`}>
                        12 hrs / 120 kms
                      </th>
                      <th className="py-4 px-4 text-center">Extra / Km</th>
                      <th className="py-4 px-4 text-center">Extra Hrs</th>
                      <th className="py-4 px-4 sm:px-6 text-right">Instant Booking</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {MUMBAI_DARSHAN_RATES.map((car) => {
                      return (
                        <tr
                          key={car.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          {/* Car Name & Tag */}
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0 border border-slate-200">
                                <Car className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-2">
                                  <span>{car.carType}</span>
                                  {car.recommended && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                      ★ Popular
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {car.category} • {car.seating}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* If Tempo Traveller, show 12h/100km colspan */}
                          {car.isTempo ? (
                            <td colSpan={3} className="py-4 px-4 text-center bg-indigo-50/30">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-100/70 text-indigo-950 font-bold">
                                <span>Full day Mumbai Darshan 12 Hrs 100 Kms:</span>
                                <span className="text-base text-indigo-700 font-black">
                                  Rs. {car.rates['12h_100km'].toLocaleString('en-IN')}/-
                                </span>
                              </div>
                            </td>
                          ) : (
                            <>
                              {/* 8h / 80km */}
                              <td className={`py-4 px-4 text-center font-bold ${selectedDuration === '8h_80km' ? 'bg-indigo-50/60 text-indigo-700 font-black text-base' : 'text-slate-900'}`}>
                                Rs. {car.rates['8h_80km'].toLocaleString('en-IN')}/-
                              </td>

                              {/* 10h / 100km */}
                              <td className={`py-4 px-4 text-center font-bold ${selectedDuration === '10h_100km' ? 'bg-indigo-50/60 text-indigo-700 font-black text-base' : 'text-slate-900'}`}>
                                Rs. {car.rates['10h_100km'].toLocaleString('en-IN')}/-
                              </td>

                              {/* 12h / 120km */}
                              <td className={`py-4 px-4 text-center font-bold ${selectedDuration === '12h_120km' ? 'bg-indigo-50/60 text-indigo-700 font-black text-base' : 'text-slate-900'}`}>
                                Rs. {car.rates['12h_120km'].toLocaleString('en-IN')}/-
                              </td>
                            </>
                          )}

                          {/* Extra Km */}
                          <td className="py-4 px-4 text-center font-semibold text-slate-700">
                            Rs. {car.extraKm}/-
                          </td>

                          {/* Extra Hrs */}
                          <td className="py-4 px-4 text-center font-semibold text-slate-700">
                            Rs. {car.extraHr}/-
                          </td>

                          {/* Booking Action */}
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleWhatsAppBooking(car, selectedDuration)}
                                title="Book via WhatsApp"
                                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition border border-emerald-200 cursor-pointer"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleBookVehicle(car, selectedDuration)}
                                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <span>Book</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Policy & Important Terms Box */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>Important Terms & Travel Conditions</span>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Night Allowance:</strong> Rs. 500/- will be applicable after 11 PM <span className="text-indigo-300 font-semibold">(Only for Tempo Traveller)</span>.
                    </span>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Toll & Parking:</strong> Toll charges, parking fees, and entry tickets to monuments are not included in car hire charges.
                    </span>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cancellation:</strong> If booking is canceled after arrival of driver, cancellation charges of ₹500/- will be applicable.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SOUTH MUMBAI SIGHTSEEING (12 SPOTS) */}
        {activeTab === 'south' && southTour && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{southTour.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                  {southTour.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {southTour.subtitle} — {southTour.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBookModal && onOpenBookModal({ dropCity: 'South Mumbai Sightseeing', tripType: 'South Mumbai Tour' })}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition cursor-pointer"
                >
                  <span>Book South Mumbai Cab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>12 Iconic Landmarks Covered in This Itinerary:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {southTour.landmarks.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 transition group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-sm text-slate-800 group-hover:text-indigo-900 transition">
                      {spot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NORTH MUMBAI SIGHTSEEING (9 SPOTS) */}
        {activeTab === 'north' && northTour && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{northTour.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                  {northTour.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {northTour.subtitle} — {northTour.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBookModal && onOpenBookModal({ dropCity: 'North Mumbai Sightseeing', tripType: 'North Mumbai Tour' })}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition cursor-pointer"
                >
                  <span>Book North Mumbai Cab</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>9 Popular Attractions Covered in This Itinerary:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {northTour.landmarks.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-sm text-slate-800 group-hover:text-emerald-900 transition">
                      {spot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FULL DAY COMPLETE CIRCUIT */}
        {activeTab === 'full' && fullTour && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{fullTour.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                  {fullTour.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {fullTour.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBookModal && onOpenBookModal({ dropCity: 'Full Day Mumbai Darshan', tripType: 'Full Day Tour' })}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                >
                  <span>Book Full Day Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Combined South + North Highlights:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {fullTour.landmarks.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 transition group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-sm text-slate-800 group-hover:text-indigo-900 transition">
                      {spot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
