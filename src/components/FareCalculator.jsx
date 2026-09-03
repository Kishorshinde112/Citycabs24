import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Info, MessageCircle, MapPin, Navigation, Car, Clock, Sparkles } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/routesData';
import { MUMBAI_DARSHAN_RATES } from '../data/mumbaiDarshanRates';
import useSettingsStore from '../store/settingsStore';

export default function FareCalculator() {
  const { phone } = useSettingsStore();
  const [calcMode, setCalcMode] = useState('sightseeing'); // 'sightseeing', 'highway'

  // Highway Routes state
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [carClass, setCarClass] = useState('sedan'); // 'sedan', 'ertiga', 'crysta'
  const [tripType, setTripType] = useState('one-way');

  // Mumbai Sightseeing state
  const [selectedSightseeingCarId, setSelectedSightseeingCarId] = useState('sedan');
  const [sightseeingDuration, setSightseeingDuration] = useState('8h_80km'); // '8h_80km', '10h_100km', '12h_120km'

  const currentRoute = POPULAR_ROUTES[selectedRouteIndex];
  const currentSightseeingCar = MUMBAI_DARSHAN_RATES.find(c => c.id === selectedSightseeingCarId) || MUMBAI_DARSHAN_RATES[1];

  const getEstimatedPrice = () => {
    let base = 0;
    if (carClass === 'sedan') {
      base = parseInt(currentRoute.sedanRate.replace(/[^0-9]/g, ''));
    } else if (carClass === 'ertiga') {
      base = parseInt(currentRoute.ertigaRate.replace(/[^0-9]/g, ''));
    } else {
      base = parseInt(currentRoute.crystaRate.replace(/[^0-9]/g, ''));
    }

    if (tripType === 'round') {
      return `₹${Math.round(base * 1.8).toLocaleString('en-IN')}`;
    }
    return `₹${base.toLocaleString('en-IN')}`;
  };

  const getSightseeingPrice = () => {
    if (currentSightseeingCar.isTempo) {
      return `₹${currentSightseeingCar.rates['12h_100km'].toLocaleString('en-IN')}`;
    }
    const val = currentSightseeingCar.rates[sightseeingDuration];
    return val ? `₹${val.toLocaleString('en-IN')}` : 'Contact for Quote';
  };

  const handleBookRouteWhatsApp = () => {
    if (calcMode === 'highway') {
      const text = `*🚖 CityCabs24 - Route Booking*\n\n` +
        `*Route:* ${currentRoute.from} ➔ ${currentRoute.to}\n` +
        `*Trip Type:* ${tripType === 'one-way' ? 'One Way Drop' : 'Round Trip'}\n` +
        `*Car Class:* ${carClass.toUpperCase()}\n` +
        `*Estimated Fare:* ${getEstimatedPrice()}\n\n` +
        `Please confirm driver availability and final all-inclusive fare.`;
      window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      const durText = currentSightseeingCar.isTempo ? 'Full Day 12h/100km' : sightseeingDuration === '8h_80km' ? '8 hrs / 80 km' : sightseeingDuration === '10h_100km' ? '10 hrs / 100 km' : '12 hrs / 120 km';
      const text = `*🚖 CityCabs24 - Mumbai Sightseeing Rate Inquiry*\n\n` +
        `*Car Type:* ${currentSightseeingCar.carType}\n` +
        `*Tour Package:* ${durText}\n` +
        `*Fixed Fare:* ${getSightseeingPrice()}/-\n` +
        `*Extra / Km:* ₹${currentSightseeingCar.extraKm}/km\n` +
        `*Extra / Hr:* ₹${currentSightseeingCar.extraHr}/hr\n\n` +
        `Hello, please confirm cab booking for Mumbai Darshan.`;
      window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <section id="fares" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Transparent Billing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
            Transparent <span className="text-indigo-400">Fare Chart & Estimator</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3">
            No midnight surge, no hidden luggage fees, no sudden driver cancellations. Check fixed rates for Mumbai Sightseeing and popular Maharashtra highway routes.
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-800 border border-slate-700 mt-6 shadow-lg">
            <button
              onClick={() => setCalcMode('sightseeing')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                calcMode === 'sightseeing'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Mumbai Sightseeing Fares</span>
            </button>

            <button
              onClick={() => setCalcMode('highway')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                calcMode === 'highway'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Inter-City Highway Routes</span>
            </button>
          </div>
        </div>

        {/* MODE 1: SIGHTSEEING FARE ESTIMATOR */}
        {calcMode === 'sightseeing' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left: Sightseeing Vehicles List */}
            <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700 gap-2 mb-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-indigo-400" />
                  <span>Mumbai Sightseeing Fleet Rates</span>
                </h3>
                
                {/* Duration Pills */}
                <div className="flex items-center gap-1.5 text-xs bg-slate-900/60 p-1 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 pl-1.5 text-[11px]">Duration:</span>
                  {[
                    { key: '8h_80km', label: '8h / 80km' },
                    { key: '10h_100km', label: '10h / 100km' },
                    { key: '12h_120km', label: '12h / 120km' }
                  ].map((dur) => (
                    <button
                      key={dur.key}
                      onClick={() => setSightseeingDuration(dur.key)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition text-xs ${
                        sightseeingDuration === dur.key
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 font-bold">
                      <th className="pb-3">Vehicle</th>
                      <th className="pb-3 text-center">Package Rate</th>
                      <th className="pb-3 text-center">Extra / Km</th>
                      <th className="pb-3 text-center">Extra / Hr</th>
                      <th className="pb-3 text-right">Select</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {MUMBAI_DARSHAN_RATES.map((c) => {
                      const isSelected = selectedSightseeingCarId === c.id;
                      let rateFormatted = '';
                      if (c.isTempo) {
                        rateFormatted = `₹${c.rates['12h_100km'].toLocaleString('en-IN')}/- (12h/100km)`;
                      } else {
                        rateFormatted = `₹${c.rates[sightseeingDuration].toLocaleString('en-IN')}/-`;
                      }

                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedSightseeingCarId(c.id)}
                          className={`hover:bg-slate-700/50 cursor-pointer transition ${
                            isSelected ? 'bg-indigo-600/20 font-bold' : ''
                          }`}
                        >
                          <td className="py-3.5 pr-2 text-white">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{c.carType}</span>
                              {c.recommended && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                                  ★ Popular
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{c.category}</div>
                          </td>

                          <td className="py-3.5 text-center text-indigo-300 font-bold">
                            {rateFormatted}
                          </td>

                          <td className="py-3.5 text-center text-slate-300">
                            ₹{c.extraKm}/km
                          </td>

                          <td className="py-3.5 text-center text-slate-300">
                            ₹{c.extraHr}/hr
                          </td>

                          <td className="py-3.5 text-right">
                            <button
                              type="button"
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              }`}
                            >
                              {isSelected ? 'Active' : 'Choose'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Selected Vehicle Summary & Booking */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                  Sightseeing Fare Calculation
                </span>
                <h3 className="text-2xl font-black font-display text-white mt-1">
                  {currentSightseeingCar.carType}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentSightseeingCar.category} • {currentSightseeingCar.seating}
                </p>
              </div>

              {/* Price Display */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700 text-center space-y-1">
                <span className="text-xs text-slate-400">Fixed Transparent Fare</span>
                <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-display">
                  {getSightseeingPrice()}
                  <span className="text-xs font-normal text-slate-400"> / package</span>
                </div>
                <div className="text-xs text-slate-400 pt-1">
                  {currentSightseeingCar.isTempo ? 'Full Day 12h / 100km' : sightseeingDuration === '8h_80km' ? '8 Hours / 80 Kms' : sightseeingDuration === '10h_100km' ? '10 Hours / 100 Kms' : '12 Hours / 120 Kms'}
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Experienced local Driver-cum-Guide included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep pickup & drop anywhere in Mumbai / MMR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clean, sanitized air-conditioned vehicle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Extra Km: ₹{currentSightseeingCar.extraKm}/km • Extra Hr: ₹{currentSightseeingCar.extraHr}/hr</span>
                </div>
              </div>

              {/* WhatsApp Action */}
              <button
                onClick={handleBookRouteWhatsApp}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This Fare on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

        {/* MODE 2: HIGHWAY ROUTES FARE ESTIMATOR */}
        {calcMode === 'highway' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left: Popular Routes Table */}
            <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl p-5 sm:p-6 border border-slate-700/80 shadow-xl overflow-hidden">
              <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center justify-between">
                <span>Popular Highway Routes</span>
                <span className="text-xs text-indigo-400 font-normal">Fixed One-Way Estimates</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 font-bold">
                      <th className="pb-3">Route</th>
                      <th className="pb-3">Distance</th>
                      <th className="pb-3 text-center">Sedan (4+1)</th>
                      <th className="pb-3 text-center">Ertiga (6+1)</th>
                      <th className="pb-3 text-center">Innova Crysta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {POPULAR_ROUTES.map((r, idx) => (
                      <tr 
                        key={idx}
                        onClick={() => setSelectedRouteIndex(idx)}
                        className={`hover:bg-slate-700/50 cursor-pointer transition ${
                          selectedRouteIndex === idx ? 'bg-indigo-500/15 font-bold' : ''
                        }`}
                      >
                        <td className="py-3 pr-2 text-white">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>{r.from} ➔ {r.to}</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-400">{r.distance}</td>
                        <td className="py-3 text-center text-indigo-300 font-semibold">{r.sedanRate}</td>
                        <td className="py-3 text-center text-emerald-400 font-semibold">{r.ertigaRate}</td>
                        <td className="py-3 text-center text-rose-300 font-semibold">{r.crystaRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Highway Route Calculator Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                  Outstation Route Estimator
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1 flex items-center gap-2">
                  <span>{currentRoute.from}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <span>{currentRoute.to}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Approx. {currentRoute.distance} • Average Travel Time: {currentRoute.duration}
                </p>
              </div>

              {/* Trip Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Trip Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTripType('one-way')}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      tripType === 'one-way'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    One-Way Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('round')}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      tripType === 'round'
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Round Trip (Same Day)
                  </button>
                </div>
              </div>

              {/* Car Class Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Vehicle Class</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sedan', name: 'Sedan', cap: '4+1 Seats' },
                    { id: 'ertiga', name: 'Ertiga', cap: '6+1 Seats' },
                    { id: 'crysta', name: 'Crysta', cap: '7+1 Seats' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCarClass(c.id)}
                      className={`p-2.5 rounded-xl text-center transition border ${
                        carClass === c.id
                          ? 'bg-slate-900 border-indigo-500 text-white ring-2 ring-indigo-500/50'
                          : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{c.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.cap}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Price */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-center space-y-1">
                <span className="text-xs text-slate-400">Estimated Fixed Base Tariff</span>
                <div className="text-3xl font-black text-indigo-400 font-display">
                  {getEstimatedPrice()}
                </div>
                <div className="text-[11px] text-slate-400">
                  Includes driver allowance, fuel & AC. Tolls as per actuals.
                </div>
              </div>

              {/* WhatsApp Action */}
              <button
                onClick={handleBookRouteWhatsApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This Route on WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
