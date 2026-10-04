import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import useSettingsStore from '../../store/settingsStore';

export default function TermsPage() {
  const { phone, helpPhone, email } = useSettingsStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <SEOHead
        title="Terms & Conditions | CityCabs24"
        description="Review the terms and conditions for booking cab rentals, Mumbai Darshan sightseeing, and outstation taxi services with CityCabs24."
      />
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-400/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
            Terms & Conditions
          </h1>
          <p className="text-zinc-400 text-sm">
            Last Updated: October 2026 • Effective for all bookings with CityCabs24
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              1. Introduction & Acceptance
            </h2>
            <p>
              Welcome to <strong>CityCabs24</strong> (referred to as "we", "our", or "us"). By booking any transportation, local sightseeing tour, or outstation cab service through our website (<a href="https://citycabs24.com" className="text-yellow-400 hover:underline">citycabs24.com</a>), phone helpline, or WhatsApp desk, you agree to comply with and be bound by the following terms and conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              2. Nature of Services
            </h2>
            <p>
              CityCabs24 operates as a premier passenger cab aggregator and sightseeing tour operator based in Mumbai, Maharashtra. Our services include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
              <li>Full-day Mumbai Darshan and guided city sightseeing packages.</li>
              <li>Outstation one-way and round-trip rentals (Lonavala, Alibaug, Shirdi, Mahabaleshwar, Matheran, Konkan, etc.).</li>
              <li>Point-to-point transfers including Mumbai Chhatrapati Shivaji Maharaj International Airport (BOM) pickups and drops.</li>
              <li>Corporate and customized travel itineraries across Maharashtra.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              3. Booking, Pricing & Payment Terms
            </h2>
            <p>
              Fares quoted during booking include the vehicle rental, chauffeur allowance, and fuel for the specified package or route.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
              <li><strong>Exclusions:</strong> Fastag toll plaza charges, state border entry permits (wherever applicable), and hotel/monument parking tickets are payable on actual receipts during the journey.</li>
              <li><strong>Payment Modes:</strong> We accept payments via secure online payment gateways (Credit Cards, Debit Cards, Net Banking, UPI) through Razorpay, as well as direct driver cash or UPI settlement.</li>
              <li><strong>Night Allowances:</strong> Journeys extending between 10:00 PM and 6:00 AM may attract standard driver night allowance (₹300 - ₹500 depending on vehicle class).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              4. Chauffeur Standards & Passenger Safety
            </h2>
            <p>
              All vehicles dispatched by CityCabs24 are commercially registered (yellow plate) with valid all-India or Maharashtra passenger tourist permits and commercial motor insurance. Chauffeurs undergo strict background verification, carry commercial driving licenses, and follow route guidelines.
            </p>
            <p className="text-zinc-400 text-sm">
              Passengers are requested to maintain decorum and adhere to traffic regulations. Consumption of alcohol, narcotics, or smoking inside vehicles is strictly prohibited under local transport authority rules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              5. Cancellation & Refund Policy
            </h2>
            <p>
              Cancellation and refund requests are governed by our dedicated policies:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
              <li>City tour bookings can be cancelled free of charge up to 6 hours prior to the scheduled pickup time.</li>
              <li>Outstation rentals can be cancelled free of charge up to 12 hours prior to scheduled departure.</li>
              <li>For complete details on timelines, charges, and process, please review our <Link to="/cancellation-policy" className="text-yellow-400 hover:underline">Cancellation Policy</Link> and <Link to="/refund-policy" className="text-yellow-400 hover:underline">Refund Policy</Link>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              6. Limitation of Liability & Force Majeure
            </h2>
            <p>
              While CityCabs24 makes every effort to ensure punctuality and seamless travel, we shall not be held liable for unavoidable delays caused by severe traffic congestion, road diversions, monsoon waterlogging, mechanical failure beyond immediate repair, or natural emergencies. In the rare event of a vehicle breakdown, a replacement cab will be arranged as expeditiously as possible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Mumbai, Maharashtra, India</strong>.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3 mt-8">
            <h3 className="text-base font-bold text-white">Grievance & Customer Support Desk</h3>
            <p className="text-xs text-zinc-400">
              For booking assistance, billing queries, or formal legal notices, reach out to our team:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`tel:+91${phone}`} className="text-white hover:text-yellow-400 font-bold">
                  +91 {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`mailto:${email}`} className="text-white hover:text-yellow-400 truncate">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
