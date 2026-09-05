import React, { useState } from 'react';
import { 
  MapPin, Calendar, Clock, Car, Users, ArrowRight, 
  Sparkles, ShieldCheck, Star, Phone, MessageCircle, CheckCircle2,
  Navigation, Award, Check
} from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import { MUMBAI_DARSHAN_RATES } from '../data/mumbaiDarshanRates';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';

export default function Hero({ onSelectTour, onOpenBookModal }) {
  const { phone } = useSettingsStore();
  const { addBooking } = useBookingsStore();

  const [bookingType, setBookingType] = useState('mumbai-darshan'); // 'mumbai-darshan', 'outstation', 'local'
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('Full Day Mumbai Darshan (South + North)');
  const [packageDuration, setPackageDuration] = useState('8h_80km'); // '8h_80km', '10h_100km', '12h_120km'
  const [selectedCarId, setSelectedCarId] = useState('sedan');
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const selectedCar = MUMBAI_DARSHAN_RATES.find(c => c.id === selectedCarId) || MUMBAI_DARSHAN_RATES[1];

  const calculateHeroFare = () => {
    if (selectedCar.isTempo) {
      return `₹${selectedCar.rates['12h_100km'].toLocaleString('en-IN')}`;
    }
    const rate = selectedCar.rates[packageDuration];
    return rate ? `₹${rate.toLocaleString('en-IN')}` : 'Best Quote';
  };

  const handleHeroBookingSubmit = (e) => {
    e.preventDefault();
    if (!pickupCity) {
      alert('Please enter your pickup location in Mumbai/MMR.');
      return;
    }
    if (!customerPhone) {
      alert('Please enter your 10-digit mobile number.');
      return;
    }

    const fare = calculateHeroFare();
    const durationLabel = packageDuration === '8h_80km' ? '8h/80km' : packageDuration === '10h_100km' ? '10h/100km' : '12h/120km';

    // Add to SQLite database via backend API + state
    addBooking({
      name: customerName || 'Website Lead',
      phone: customerPhone,
      route: `${dropCity} (${durationLabel})`,
      vehicle: `${selectedCar.carType} • Fare: ${fare}`,
      date: pickupDate,
      notes: notes
    });

    setSubmitted(true);

    // Open WhatsApp
    const msg = `*🚖 CityCabs24 - Instant Booking Request*\n\n` +
      `👤 *Name:* ${customerName || 'Customer'}\n` +
      `📱 *Mobile:* ${customerPhone}\n` +
      `📍 *Pickup:* ${pickupCity}\n` +
      `🎯 *Tour/Route:* ${dropCity}\n` +
      `⏱️ *Package:* ${selectedCar.isTempo ? 'Full Day 12h/100km' : durationLabel}\n` +
      `🚘 *Vehicle:* ${selectedCar.carType}\n` +
      `💰 *Estimated Fare:* ${fare}/-\n` +
      `📅 *Travel Date:* ${pickupDate}\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : '') +
      `\nHello, please confirm driver assignment and cab booking.`;

    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div id="home" className="relative bg-slate-950 text-white overflow-hidden pt-6 pb-16 lg:py-20 border-b border-slate-800">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Main Headlines & Selling Points */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Drivers Who Act As Your Personal Local Guides</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] text-white">
              Your Trusted Companion for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-300">Mumbai Darshan & Maharashtra Tours</span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Clean sanitized AC cabs, punctual doorstep pickup, 100% transparent rates, and experienced chauffeurs who guide you through every historic monument, sea-facing promenade & local food joint.
            </p>

            {/* 3 Key Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">100% Fixed Rates</div>
                  <div className="text-[11px] text-slate-400">Zero surge or hidden fees</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <ShieldCheck className="w-7 h-7 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Verified Drivers</div>
                  <div className="text-[11px] text-slate-400">Chauffeur-cum-guide</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <Clock className="w-7 h-7 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Doorstep Pickup</div>
                  <div className="text-[11px] text-slate-400">Anywhere in Mumbai/MMR</div>
                </div>
              </div>
            </div>

            {/* Social Trust Ratings & Direct Call/WhatsApp CTA */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-md">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9 / 5 Rating</span>
                <span className="text-slate-400">(12,500+ Happy Guests)</span>
              </div>

              <a
                href={`tel:+91${phone}`}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-2 border border-slate-700 transition"
              >
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>Call +91 {phone}</span>
              </a>

              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20inquire%20about%20a%20cab%20booking.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Quick Booking Widget Card */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Fare Calculator</span>
                </span>
                <h3 className="text-xl font-black font-display text-slate-900">
                  Book Your Cab & Tour
                </h3>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                100% Fixed Rates
              </div>
            </div>

            {/* Booking Type Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setBookingType('mumbai-darshan');
                  setDropCity('Full Day Mumbai Darshan (South + North)');
                }}
                className={`py-2 px-1 rounded-xl transition text-center ${
                  bookingType === 'mumbai-darshan'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mumbai Tour
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingType('outstation');
                  setDropCity('Pune');
                }}
                className={`py-2 px-1 rounded-xl transition text-center ${
                  bookingType === 'outstation'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Outstation Drop
              </button>

              <button
                type="button"
                onClick={() => {
                  setBookingType('local');
                  setDropCity('Local Hourly Rental');
                }}
                className={`py-2 px-1 rounded-xl transition text-center ${
                  bookingType === 'local'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Local Package
              </button>
            </div>

            {/* Interactive Booking Form */}
            <form onSubmit={handleHeroBookingSubmit} className="space-y-3.5">
              
              {/* Pickup Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Pickup Location in Mumbai / MMR *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Airport T2, Dadar, Thane, Hotel..."
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none font-medium"
                />
              </div>

              {/* Destination / Tour Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-indigo-600" />
                  {bookingType === 'mumbai-darshan' ? 'Select Sightseeing Circuit *' : 'Destination / Route *'}
                </label>
                {bookingType === 'mumbai-darshan' ? (
                  <select
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white font-medium"
                  >
                    <option value="Full Day Mumbai Darshan (South + North)">Full Day Mumbai Darshan (South + North)</option>
                    <option value="South Mumbai Sightseeing (12 Spots)">South Mumbai Sightseeing (12 Spots)</option>
                    <option value="North Mumbai Sightseeing (9 Spots)">North Mumbai Sightseeing (9 Spots)</option>
                    <option value="Lonavala & Khandala Weekend Tour">Lonavala & Khandala Weekend Tour</option>
                    <option value="Alibaug Coastal Sightseeing">Alibaug Coastal Sightseeing</option>
                    <option value="Shirdi Spiritual Pilgrimage">Shirdi Spiritual Pilgrimage</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Lonavala, Shirdi, Nashik..."
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-medium"
                  />
                )}
              </div>

              {/* Package Duration Selector */}
              {bookingType === 'mumbai-darshan' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Package Duration *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {[
                      { key: '8h_80km', label: '8h / 80km' },
                      { key: '10h_100km', label: '10h / 100km' },
                      { key: '12h_120km', label: '12h / 120km' }
                    ].map((dur) => (
                      <button
                        type="button"
                        key={dur.key}
                        onClick={() => setPackageDuration(dur.key)}
                        className={`py-1.5 px-2 rounded-xl border text-center transition font-bold ${
                          packageDuration === dur.key
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-600'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {dur.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicle Selection & Live Tariff */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-indigo-600" />
                    Select Vehicle Class *
                  </span>
                  <span className="text-indigo-600 font-extrabold text-xs">
                    Fare: {calculateHeroFare()}/-
                  </span>
                </label>

                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-none bg-white font-bold text-slate-900"
                >
                  {MUMBAI_DARSHAN_RATES.map((c) => {
                    let fareText = '';
                    if (c.isTempo) {
                      fareText = `₹${c.rates['12h_100km'].toLocaleString('en-IN')}/- (12h/100km)`;
                    } else {
                      fareText = `₹${c.rates[packageDuration].toLocaleString('en-IN')}/-`;
                    }
                    return (
                      <option key={c.id} value={c.id}>
                        {c.carType} ({c.seating}) — {fareText}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Date & Mobile */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Mobile No *</label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 outline-none font-mono font-bold"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Get Quote & Book Instantly</span>
              </button>

              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-2 pt-1">
                <span>✓ Driver Allowance Included</span>
                <span>•</span>
                <span>✓ No Advance Needed</span>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
