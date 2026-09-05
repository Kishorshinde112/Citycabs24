import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import logoImg from '../assets/citycabs24-logo.png';

export default function Navbar({ onOpenBookModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { phone, email } = useSettingsStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tourOptions = [
    { name: 'Mumbai Darshan', href: '/mumbai-darshan' },
    { name: 'Lonavala Trip', href: '/#tours' },
    { name: 'Alibaug Sightseeing', href: '/#tours' },
    { name: 'Matheran Sightseeing', href: '/#tours' },
    { name: 'Shirdi Tour', href: '/#tours' },
    { name: 'Mahabaleshwar Sightseeing', href: '/#tours' },
    { name: 'Igatpuri Tour', href: '/#tours' },
    { name: 'Ashtavinayak', href: '/#tours' },
    { name: '3 Jyotirlinga in Maharashtra', href: '/#tours' },
    { name: 'Konkan Darshan', href: '/#tours' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0284C7] text-white text-xs py-2 px-4 border-b border-blue-600 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div>
            <span>Available 24/7 for your convenience</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:+91${phone}`} className="hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 {phone}</span>
            </a>
            <span>|</span>
            <a href={`mailto:${email}`} className="hover:underline flex items-center gap-1">
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-slate-200 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Brand Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-white flex items-center justify-center p-0.5">
                <img src={logoImg} alt="CityCabs24 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">
                  City Cabs <span className="text-[#0284C7]">24</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="/" className="text-sm font-semibold text-slate-700 hover:text-[#0284C7] transition">
                Home
              </a>

              <a href="/#about" className="text-sm font-semibold text-slate-700 hover:text-[#0284C7] transition">
                About
              </a>

              {/* Tour Options Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button 
                  className="text-sm font-semibold text-slate-700 hover:text-[#0284C7] transition flex items-center gap-1 py-2"
                >
                  <span>Tour Options</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    {tourOptions.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0284C7] transition"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/#fleet" className="text-sm font-semibold text-slate-700 hover:text-[#0284C7] transition">
                Our Cab Gallery
              </a>

              <a href="/#contact" className="text-sm font-semibold text-slate-700 hover:text-[#0284C7] transition">
                Contact Us
              </a>
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20check%20cab%20rates%20and%20availability.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:+91${phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-bold shadow transition"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+91 {phone}</span>
              </a>

              <button
                onClick={() => onOpenBookModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-sky-700 text-white text-xs font-bold shadow transition cursor-pointer"
              >
                <span>Book Ride</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:+91${phone}`}
                className="p-2 rounded-lg bg-sky-50 text-[#0284C7] border border-sky-200"
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
                <Phone className="w-3.5 h-3.5 text-sky-400" />
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

            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-[#0284C7]"
            >
              Home
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-[#0284C7]"
            >
              About
            </a>

            <div className="px-3 py-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Tour Options</div>
              <div className="pl-2 space-y-1">
                {tourOptions.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7]"
                  >
                    • {item.name}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-[#0284C7]"
            >
              Our Cab Gallery
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-[#0284C7]"
            >
              Contact Us
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookModal();
              }}
              className="w-full mt-3 py-3 rounded-xl bg-[#0284C7] text-white font-bold text-sm shadow-md cursor-pointer"
            >
              Instant Quick Booking
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
