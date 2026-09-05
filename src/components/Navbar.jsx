import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Car, Shield, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import logoImg from '../assets/citycabs24-logo.png';

export default function Navbar({ onOpenBookModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { phone } = useSettingsStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Mumbai Darshan', href: '/mumbai-darshan' },
    { name: 'Tour Packages', href: '#tours' },
    { name: 'Our Fleet', href: '#fleet' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-indigo-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Drivers Who Act As Your Personal Tour Guides
            </span>
            <span className="flex items-center text-slate-300">
              <Clock className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              24x7 Doorstep Pickup Across Mumbai & Maharashtra
            </span>
            <span className="flex items-center text-slate-300">
              <Shield className="w-3.5 h-3.5 mr-1 text-blue-400" />
              100% Verified Chauffeurs
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20would%20like%20to%20inquire%20about%20a%20cab%20booking.`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center transition"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" />
              WhatsApp: +91 {phone}
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`tel:+91${phone}`}
              className="text-indigo-400 font-bold hover:text-indigo-300 flex items-center transition"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              +91 {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg py-3' 
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Brand Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-indigo-400/50 shadow-md group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-0.5">
                <img src={logoImg} alt="CityCabs24 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-2xl tracking-tight text-slate-900">
                    CityCabs<span className="text-indigo-500">24</span>
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 -mt-1 flex items-center gap-1">
                  <span>Premium Cabs</span>
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                  <span>Tour Guides</span>
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20check%20cab%20rates%20and%20availability.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-sm font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:+91${phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition"
              >
                <Phone className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span>+91 {phone}</span>
              </a>

              <button
                onClick={() => onOpenBookModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
              >
                <span>Book Ride</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:+91${phone}`}
                className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200"
                aria-label="Call Now"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={`tel:+91${phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                Call Desk
              </a>
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20book%20a%20cab.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookModal();
              }}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-sm shadow-md"
            >
              Instant Quick Booking
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
