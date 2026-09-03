import React, { useState } from 'react';
import { 
  MapPin, Calendar, Clock, Car, Users, ArrowRight, 
  Sparkles, ShieldCheck, Star, Phone, MessageCircle, CheckCircle2,
  Navigation, Award
} from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import { FLEET_DATA } from '../data/fleetData';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';

export default function Hero({ onSelectTour, onOpenBookModal }) {
  const { phone } = useSettingsStore();
  const { addBooking } = useBookingsStore();
  const [bookingType, setBookingType] = useState('outstation'); // 'outstation', 'local', 'tour'
  const [tripType, setTripType] = useState('one-way'); // 'one-way', 'round-trip'
  const [pickupCity, setPickupCity] = useState('Mumbai (Anywhere / Airport)');
  const [dropCity, setDropCity] = useState('Pune');
  const [localPackage, setLocalPackage] = useState('8 hrs / 80 Km (Full Day)');
  const [selectedTourId, setSelectedTourId] = useState('mumbai-darshan');
  const [carType, setCarType] = useState('Swift Dzire (Sedan)');
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('07:00 AM');
  const [passengerCount, setPassengerCount] = useState('4 Passengers');
  const [customerPhone, setCustomerPhone] = useState('');

  const quickCities = ['Mumbai Airport T2', 'Dadar', 'Thane', 'Navi Mumbai', 'Borivali', 'Pune', 'Lonavala', 'Shirdi'];

  const handleQuickBookWhatsApp = (e) => {
    e.preventDefault();
    let msg = `*🚖 CityTourCabs Booking Inquiry*\n\n`;
    if (bookingType === 'outstation') {
      msg += `📍 *Trip Type:* Outstation (${tripType === 'one-way' ? 'One Way' : 'Round Trip'})\n`;
      msg += `🚗 *Pickup:* ${pickupCity}\n`;
      msg += `🏁 *Drop:* ${dropCity}\n`;
    } else if (bookingType === 'local') {
      msg += `📍 *Trip Type:* Local Hourly Rental\n`;
      msg += `🚗 *Pickup Area:* ${pickupCity}\n`;
      msg += `⏱️ *Package:* ${localPackage}\n`;
    } else {
      const tour = TOURS_DATA.find(t => t.id === selectedTourId);
      msg += `📍 *Trip Type:* Tour Package\n`;
      msg += `🎯 *Package Name:* ${tour ? tour.title : selectedTourId}\n`;
      msg += `🚗 *Pickup Location:* ${pickupCity}\n`;
    }
    msg += `📅 *Date:* ${pickupDate}\n`;
    msg += `⏰ *Time:* ${pickupTime}\n`;
    msg += `🚘 *Car Preference:* ${carType}\n`;
    msg += `👥 *Passengers:* ${passengerCount}\n`;
    if (customerPhone) {
      msg += `📱 *Contact Number:* ${customerPhone}\n`;
    }
    msg += `\n*Please share best rate & confirm availability.*`;

    // Record inquiry to Admin Dashboard
    addBooking({
      name: customerPhone ? `Inquiry (${customerPhone})` : 'WhatsApp Direct Lead',
      phone: customerPhone || phone,
      route: bookingType === 'tour' ? selectedPackageTitle : `${pickupCity} → ${dropCity} (${bookingType})`,
      vehicle: FLEET_DATA.find(c => c.id === carType)?.name || carType,
      date: pickupDate || new Date().toISOString().slice(0, 10),
    });

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/91${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div id="home" className="relative bg-slate-900 text-white overflow-hidden pt-6 pb-16 lg:py-20">
      
      {/* Background Glows & Patterns */}
      <div className="absolute inset-0 dark-hero-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Selling Points */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Drivers Who Act As Your Personal Tour Guides</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] text-white">
              Explore Mumbai & Beyond With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-200">Premium Guided Cabs</span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Clean sanitized cabs, punctual doorstep pickup, and experienced chauffeurs who know every scenic viewpoint, historical secret & culinary delight in Maharashtra.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-left bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">All-Inclusive</div>
                  <div className="text-[10px] text-slate-400">Zero hidden surprises</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Verified Drivers</div>
                  <div className="text-[10px] text-slate-400">10+ yrs experience</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">100% On-Time</div>
                  <div className="text-[10px] text-slate-400">Doorstep pickup</div>
                </div>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <div className="flex text-indigo-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5 Rating</span>
                <span className="text-slate-400">(12,500+ Trips)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Fast 15-Min Confirmation</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Converting Interactive Booking Widget */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-900 border border-slate-100 relative">
              
              {/* Top Accent Ribbon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Fare Quote & Booking</span>
              </div>

              {/* Booking Category Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-5 mt-2">
                <button
                  type="button"
                  onClick={() => setBookingType('outstation')}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                    bookingType === 'outstation'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🚗 Outstation
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('local')}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                    bookingType === 'local'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⏱️ Local Rental
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('tour')}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                    bookingType === 'tour'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🏔️ Tour Packages
                </button>
              </div>

              {/* Sub-Tabs for Outstation: One-Way vs Round Trip */}
              {bookingType === 'outstation' && (
                <div className="flex gap-4 mb-4 text-xs font-semibold text-slate-700 border-b border-slate-100 pb-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'one-way'}
                      onChange={() => setTripType('one-way')}
                      className="text-indigo-500 focus:ring-indigo-400"
                    />
                    <span>One Way Drop</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'round-trip'}
                      onChange={() => setTripType('round-trip')}
                      className="text-indigo-500 focus:ring-indigo-400"
                    />
                    <span>Round Trip (Multi-Day)</span>
                  </label>
                </div>
              )}

              {/* Booking Form Fields */}
              <form onSubmit={handleQuickBookWhatsApp} className="space-y-3.5 text-left">
                
                {/* Outstation Inputs */}
                {bookingType === 'outstation' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        placeholder="e.g. Mumbai Airport, Dadar, Thane"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-rose-500" />
                        Destination City
                      </label>
                      <input
                        type="text"
                        value={dropCity}
                        onChange={(e) => setDropCity(e.target.value)}
                        placeholder="e.g. Pune, Lonavala, Shirdi, Goa"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Local Rental Inputs */}
                {bookingType === 'local' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        Pickup Area (MMR / Mumbai)
                      </label>
                      <input
                        type="text"
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        placeholder="e.g. Andheri, Dadar, Bandra, Thane"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        Rental Duration / Package
                      </label>
                      <select
                        value={localPackage}
                        onChange={(e) => setLocalPackage(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white"
                      >
                        <option value="8 hrs / 80 Km (Full Day)">8 hrs / 80 Km (Full Day)</option>
                        <option value="10 hrs / 100 Km (Extended)">10 hrs / 100 Km (Extended)</option>
                        <option value="12 hrs / 120 Km (Grand Day)">12 hrs / 120 Km (Grand Day)</option>
                        <option value="4 hrs / 40 Km (Half Day)">4 hrs / 40 Km (Half Day)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Tour Package Inputs */}
                {bookingType === 'tour' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-indigo-500" />
                        Select Tour Package
                      </label>
                      <select
                        value={selectedTourId}
                        onChange={(e) => setSelectedTourId(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white font-medium"
                      >
                        {TOURS_DATA.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} ({t.duration.split('(')[0]})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        Pickup City
                      </label>
                      <input
                        type="text"
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        placeholder="Mumbai / Thane / Navi Mumbai / Pune"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Pickup Time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white"
                    >
                      <option value="05:00 AM">05:00 AM (Early Morning)</option>
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="07:00 AM">07:00 AM (Recommended)</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="02:00 PM">02:00 PM (Afternoon)</option>
                      <option value="06:00 PM">06:00 PM (Evening)</option>
                      <option value="10:00 PM">10:00 PM (Night Pickup)</option>
                    </select>
                  </div>
                </div>

                {/* Car Type & Passenger Count Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-indigo-500" />
                      Vehicle Preference
                    </label>
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white font-medium"
                    >
                      <option value="WagonR (Hatchback 4+1)">WagonR (Hatchback 4+1)</option>
                      <option value="Swift Dzire (Sedan 4+1)">Swift Dzire (Sedan 4+1)</option>
                      <option value="Maruti Ertiga (MUV 6+1)">Maruti Ertiga (MUV 6+1)</option>
                      <option value="Kia Carens (MPV 7 Seater)">Kia Carens (MPV 7 Seater)</option>
                      <option value="Innova Crysta (Luxury 7+1)">Innova Crysta (Luxury 7+1)</option>
                      <option value="Tempo Traveller (13/17 Seater)">Tempo Traveller (13/17 Seater)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      Your WhatsApp No.
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/30 transition transform active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Instant Booking on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:+91${phone}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <Phone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Call +91 {phone}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onOpenBookModal({ bookingType, tripType, pickupCity, dropCity, carType, pickupDate })}
                      className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold text-xs flex items-center justify-center gap-1 transition text-center"
                    >
                      <span>Custom Inquiry Form</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Trust Guarantee */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    No Booking Fee
                  </span>
                  <span>•</span>
                  <span>Instant Driver Allotment</span>
                  <span>•</span>
                  <span>Free Cancellation</span>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
