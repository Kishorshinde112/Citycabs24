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
      <div className="bg-black text-yellow-400 text-xs py-2 px-4 border-b border-yellow-500/20 hidden md:block font-bold">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div>
            <span className="text-zinc-300">Available 24/7 for your convenience</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:+91${phone}`} className="hover:text-yellow-300 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span>+91 {phone}</span>
            </a>
            <span className="text-zinc-700">|</span>
            <a href={`mailto:${email}`} className="hover:text-yellow-300 flex items-center gap-1">
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 bg-zinc-950 border-b border-zinc-800 text-white ${
          isScrolled ? 'shadow-xl py-2.5 bg-black/95 backdrop-blur-md' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Brand Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-yellow-400/40 shadow-sm bg-white flex items-center justify-center p-0.5">
                <img src={logoImg} alt="CityCabs24 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                  City Cabs <span className="text-yellow-400">24</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="/" className="text-sm font-semibold text-zinc-200 hover:text-yellow-400 transition">
                Home
              </a>

              <a href="/#about" className="text-sm font-semibold text-zinc-200 hover:text-yellow-400 transition">
                About
              </a>

              {/* Tour Options Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button 
                  className="text-sm font-semibold text-zinc-200 hover:text-yellow-400 transition flex items-center gap-1 py-2"
                >
                  <span>Tour Options</span>
                  <ChevronDown className="w-4 h-4 text-yellow-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 py-2 z-50 animate-fadeIn">
                    {tourOptions.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-yellow-400 hover:text-black transition"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/#fleet" className="text-sm font-semibold text-zinc-200 hover:text-yellow-400 transition">
                Our Cab Gallery
              </a>

              <a href="/#contact" className="text-sm font-semibold text-zinc-200 hover:text-yellow-400 transition">
                Contact Us
              </a>
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20check%20cab%20rates%20and%20availability.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-yellow-400 hover:bg-yellow-400 hover:text-black border border-yellow-400/40 text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:+91${phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-zinc-700 shadow transition"
              >
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>+91 {phone}</span>
              </a>

              <button
                onClick={() => onOpenBookModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-extrabold shadow-lg shadow-yellow-400/20 transition cursor-pointer"
              >
                <span>Book Ride</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:+91${phone}`}
                className="p-2 rounded-lg bg-zinc-900 text-yellow-400 border border-yellow-400/30"
                aria-label="Call Now"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-200 hover:bg-zinc-800"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-2 animate-fadeIn text-white">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={`tel:+91${phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-yellow-400 text-black font-black text-xs shadow"
              >
                <Phone className="w-3.5 h-3.5 text-black" />
                Call Desk
              </a>
              <a
                href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20book%20a%20cab.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 text-yellow-400 border border-yellow-400/40 font-bold text-xs shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>

            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Home
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400"
            >
              About
            </a>

            <div className="px-3 py-2">
              <div className="text-xs font-bold uppercase tracking-wider text-yellow-400/80 mb-1">Tour Options</div>
              <div className="pl-2 space-y-1">
                {tourOptions.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-xs font-semibold text-zinc-300 hover:text-yellow-400"
                  >
                    • {item.name}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Our Cab Gallery
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400"
            >
              Contact Us
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookModal();
              }}
              className="w-full mt-3 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm shadow-lg cursor-pointer"
            >
              Instant Quick Booking
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
