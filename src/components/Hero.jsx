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
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Text & Selling Points */}
          <div className="space-y-8 text-center flex flex-col items-center">
            
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 w-full max-w-3xl">
              <div className="flex items-center gap-3 text-left bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">All-Inclusive</div>
                  <div className="text-xs text-slate-400">Zero hidden surprises</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Verified Drivers</div>
                  <div className="text-xs text-slate-400">10+ yrs experience</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                <Clock className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">100% On-Time</div>
                  <div className="text-xs text-slate-400">Doorstep pickup</div>
                </div>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 w-full">
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700 shadow-xl">
                <div className="flex text-indigo-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5 Rating</span>
                <span className="text-slate-400">(12,500+ Trips)</span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 px-4 py-2 rounded-full shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold">Fast 15-Min Confirmation</span>
              </div>
              
              <button
                type="button"
                onClick={() => onOpenBookModal({ bookingType: 'outstation' })}
                className="ml-4 py-2.5 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
