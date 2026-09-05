import React from 'react';
import { Car, Phone, Mail, MapPin, MessageCircle, Heart, Shield, Sparkles } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import useSettingsStore from '../store/settingsStore';
import logoImg from '../assets/citycabs24-logo.png';

export default function Footer({ onOpenPrivacyModal, onSelectTour }) {
  const { phone, email } = useSettingsStore();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-indigo-500/30 bg-white flex items-center justify-center p-0.5 shadow-md">
                <img src={logoImg} alt="CityCabs24 Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                CityCabs<span className="text-indigo-400">24</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Mumbai's trusted private cab & sightseeing partner. Experience reliable doorstep pickups, sanitized AC fleet, transparent billing, and friendly chauffeurs who act as expert tour guides.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-indigo-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Personal Connection Over App Confusion</span>
            </div>
          </div>

          {/* Popular Tours Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Popular Tour Packages
            </h4>
            <ul className="space-y-2 text-xs">
              {TOURS_DATA.slice(0, 6).map((tour) => (
                <li key={tour.id}>
                  <button
                    onClick={() => onSelectTour(tour)}
                    className="text-slate-400 hover:text-indigo-400 transition text-left"
                  >
                    • {tour.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
              <li><a href="/mumbai-darshan" className="hover:text-indigo-400 transition">Mumbai Darshan Cabs</a></li>
              <li><a href="/#tours" className="hover:text-indigo-400 transition">Tour Packages</a></li>
              <li><a href="/#fleet" className="hover:text-indigo-400 transition">Our Cab Fleet</a></li>
              <li><a href="/#why-us" className="hover:text-indigo-400 transition">Why Choose Us</a></li>
              <li><a href="/#gallery" className="hover:text-indigo-400 transition">Tour Gallery</a></li>
              <li><a href="/#about" className="hover:text-indigo-400 transition">About Us</a></li>
              <li>
                <button onClick={onOpenPrivacyModal} className="hover:text-indigo-400 transition">
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              24/7 Booking Desk
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`tel:+91${phone}`} className="text-white hover:text-indigo-400 font-bold">
                  +91 {phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/91${phone}?text=Hi%20CityCabs24`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline font-medium"
                >
                  WhatsApp: +91 {phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CityCabs24. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacyModal} className="hover:text-slate-300 transition">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenPrivacyModal} className="hover:text-slate-300 transition">
              Terms of Service
            </button>
            <span>•</span>
            <span className="text-slate-400">Safe • Reliable • Always</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
