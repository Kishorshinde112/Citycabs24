// @ts-nocheck
"use client";


import React, { useMemo } from 'react';
import Link from 'next/link';
import { Car, Phone, Mail, MapPin, MessageCircle, Heart, Shield, Sparkles } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import useSettingsStore from '../store/settingsStore';
import useContentStore from '../store/contentStore';

export default function Footer({ onOpenPrivacyModal = () => {}, onSelectTour = () => {} }) {
  const { phone, email } = useSettingsStore();
  const { tours } = useContentStore();

  const footerTours = useMemo(() => {
    const list = (Array.isArray(tours) && tours.length > 0) ? tours : TOURS_DATA;
    return [...list].sort((a, b) => {
      const orderA = typeof a.displayOrder === 'number' ? a.displayOrder : (Number(a.displayOrder) || 100);
      const orderB = typeof b.displayOrder === 'number' ? b.displayOrder : (Number(b.displayOrder) || 100);
      if (orderA !== orderB) return orderA - orderB;
      return (Number(a.id) || 0) - (Number(b.id) || 0);
    });
  }, [tours]);

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-yellow-400/40 bg-white flex items-center justify-center p-0.5 shadow-md">
                <img src="/assets/citycabs24-logo-80w.webp" srcSet="/assets/citycabs24-logo-80w.webp 80w, /assets/citycabs24-logo.webp 512w" sizes="48px" alt="CityCabs24 Logo" width="48" height="48" loading="lazy" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                CityCabs<span className="text-yellow-400">24</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Mumbai's trusted private cab & sightseeing partner. Experience reliable doorstep pickups, sanitized AC fleet, transparent billing, and friendly chauffeurs who act as expert tour guides.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-yellow-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Personal Connection Over App Confusion</span>
            </div>
          </div>

          {/* Popular Tours Col */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Popular Tour Packages
            </h3>
            <ul className="space-y-2 text-xs">
              {footerTours.map((tour) => (
                <li key={tour.id}>
                  <Link
                    href={`/${tour.slug || tour.id}`}
                    className="text-zinc-400 hover:text-yellow-400 transition text-left block"
                  >
                    • {tour.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/mumbai-darshan" className="hover:text-yellow-400 transition">Mumbai Darshan Cabs</Link></li>
              <li><Link href="/tours" className="hover:text-yellow-400 transition">All Tour Packages</Link></li>
              <li><a href="/#fleet" className="hover:text-yellow-400 transition">Our Cab Fleet</a></li>
              <li><a href="/#why-us" className="hover:text-yellow-400 transition">Why Choose Us</a></li>
              <li><a href="/#gallery" className="hover:text-yellow-400 transition">Tour Gallery</a></li>
              <li><a href="/#about" className="hover:text-yellow-400 transition">About Us</a></li>
              <li><Link href="/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-yellow-400 transition">Refund Policy</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-yellow-400 transition">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400">
              24/7 Booking Desk
            </h3>
            
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`tel:+91${phone}`} className="text-white hover:text-yellow-400 font-bold">
                  +91 {phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <a 
                  href={`https://wa.me/91${phone}?text=Hi%20CityCabs24`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-400 hover:underline font-medium"
                >
                  WhatsApp: +91 {phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} CityCabs24. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/privacy-policy" className="hover:text-zinc-300 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-zinc-300 transition">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-zinc-300 transition">
              Refund Policy
            </Link>
            <span>•</span>
            <Link href="/cancellation-policy" className="hover:text-zinc-300 transition">
              Cancellation Policy
            </Link>
            <span>•</span>
            <span className="text-yellow-400/80 font-bold">Safe • Reliable • Always</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
