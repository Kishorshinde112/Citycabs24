import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Info, MessageCircle, MapPin, Navigation } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/routesData';
import useSettingsStore from '../store/settingsStore';

export default function FareCalculator() {
  const { phone } = useSettingsStore();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [carClass, setCarClass] = useState('sedan'); // 'sedan', 'ertiga', 'crysta'
  const [tripType, setTripType] = useState('one-way');

  const currentRoute = POPULAR_ROUTES[selectedRouteIndex];

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

  const handleBookRouteWhatsApp = () => {
    const text = `*🚖 CityTourCabs - Route Booking*\n\n` +
      `*Route:* ${currentRoute.from} ➔ ${currentRoute.to}\n` +
      `*Trip Type:* ${tripType === 'one-way' ? 'One Way Drop' : 'Round Trip'}\n` +
      `*Car Class:* ${carClass.toUpperCase()}\n` +
      `*Estimated Fare:* ${getEstimatedPrice()}\n\n` +
      `Please confirm driver availability and final all-inclusive fare.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="fares" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Transparent Billing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
            Transparent <span className="text-indigo-400">Fare Chart & Estimator</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3">
            No midnight surge, no hidden luggage fees, no sudden driver cancellations. Check fixed rates for popular Maharashtra inter-city routes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

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

            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                Toll & Parking at actual receipts
              </span>
              <span>Driver Allowance Included</span>
            </div>
          </div>

          {/* Right: Interactive Route Fare Calculator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-850 rounded-3xl p-6 sm:p-7 border border-indigo-500/30 shadow-2xl space-y-5">
            <div>
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider block mb-1">
                Instant Fare Calculator
              </span>
              <h3 className="text-2xl font-bold font-display text-white">
                {currentRoute.from} ➔ {currentRoute.to}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Estimated Driving Time: ~{currentRoute.duration} ({currentRoute.distance})
              </p>
            </div>

            {/* Trip Type Selector */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  tripType === 'one-way'
                    ? 'bg-indigo-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                One Way Drop
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  tripType === 'round'
                    ? 'bg-indigo-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Round Trip
              </button>
            </div>

            {/* Car Class Choice */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Select Vehicle Class:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCarClass('sedan')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition ${
                    carClass === 'sedan'
                      ? 'bg-indigo-500/20 border-indigo-400 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] text-indigo-400">Sedan</div>
                  <div className="font-extrabold text-white text-xs mt-0.5">Dzire (4+1)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCarClass('ertiga')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition ${
                    carClass === 'ertiga'
                      ? 'bg-indigo-500/20 border-indigo-400 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] text-emerald-400">MUV</div>
                  <div className="font-extrabold text-white text-xs mt-0.5">Ertiga (6+1)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCarClass('crysta')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition ${
                    carClass === 'crysta'
                      ? 'bg-indigo-500/20 border-indigo-400 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] text-rose-400">Luxury</div>
                  <div className="font-extrabold text-white text-xs mt-0.5">Crysta (7+1)</div>
                </button>
              </div>
            </div>

            {/* Estimated Fare Display */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-700/80 text-center">
              <span className="text-xs text-slate-400">Estimated Total Fare</span>
              <div className="text-3xl font-black text-indigo-400 font-display mt-0.5">
                {getEstimatedPrice()}
              </div>
              <div className="flex justify-center gap-3 text-[11px] text-slate-400 mt-2">
                <span>✓ Fuel Included</span>
                <span>✓ Driver Allowance</span>
                <span>✓ Clean AC Cab</span>
              </div>
            </div>

            {/* Booking CTAs */}
            <div className="space-y-2">
              <button
                onClick={handleBookRouteWhatsApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This Route on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
