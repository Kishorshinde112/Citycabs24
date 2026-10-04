import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import useSettingsStore from '../../store/settingsStore';

export default function PrivacyPolicyPage() {
  const { phone, helpPhone, email } = useSettingsStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <SEOHead
        title="Privacy Policy | CityCabs24"
        description="Learn how CityCabs24 collects, protects, and handles your personal information when booking cab tours and outstation taxi rides."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-sm">
            Last Updated: October 2026 • CityCabs24 is committed to safeguarding your personal data
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              1. Information We Collect
            </h2>
            <p>
              When you book a cab or submit a tour inquiry with <strong>CityCabs24</strong> (<a href="https://citycabs24.com" className="text-yellow-400 hover:underline">citycabs24.com</a>), we collect only the information essential for coordinating your transportation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
              <li><strong>Personal Identifiers:</strong> Name, contact phone number, and email address.</li>
              <li><strong>Travel Details:</strong> Pickup address/landmark, destination route, scheduled date and time, number of passengers, and preferred vehicle model.</li>
              <li><strong>Payment Information:</strong> For online transactions, payment details are securely processed directly by our RBI-licensed payment gateway partners (such as <strong>Razorpay</strong>). CityCabs24 does not store or process sensitive card numbers, CVVs, or bank net banking credentials on its servers.</li>
              <li><strong>Technical Logs:</strong> Basic IP addresses, browser type, and anonymous analytics to improve website load speeds and prevent fraudulent activity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              2. How We Use Your Information
            </h2>
            <p>
              Your data is collected strictly for operational and communication purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
              <li>To confirm your reservation and dispatch vehicle and driver details via SMS / WhatsApp.</li>
              <li>To coordinate pickup timing with your designated chauffeur.</li>
              <li>To generate GST compliant tax invoices and booking receipts.</li>
              <li>To process refunds or resolve customer service inquiries promptly.</li>
              <li>To inform you about updates regarding your active journey or safety alerts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              3. Data Sharing & Non-Disclosure
            </h2>
            <p>
              <strong>We strictly respect your privacy.</strong> CityCabs24 does not sell, rent, trade, or distribute your personal contact details to external marketing agencies, advertising networks, or third-party telemarketers under any circumstances.
            </p>
            <p className="text-zinc-400 text-sm">
              Information is shared only with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
              <li><strong>Assigned Chauffeur:</strong> Name, pickup location, and contact number shared strictly for completing the ride.</li>
              <li><strong>Payment Processors:</strong> Razorpay for secure processing of online payments and refunds in compliance with PCI-DSS standards.</li>
              <li><strong>Legal Authorities:</strong> When required by statutory law enforcement agencies under applicable Indian jurisdiction.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              4. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard 256-bit SSL encryption across our entire website (<a href="https://citycabs24.com" className="text-yellow-400 hover:underline">https://citycabs24.com</a>). All booking records are stored in secured database environments protected by automated firewalls and administrative authentication safeguards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              5. Cookies & Analytical Tools
            </h2>
            <p>
              We use standard session cookies and anonymous analytics (such as Google Analytics / Tag Manager) solely to understand website navigation flow and enhance the booking interface. Users can disable cookies in their browser settings without affecting the ability to book via our phone or WhatsApp desk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              6. Your Rights & Contact Details
            </h2>
            <p>
              You have the right to request access to your booking records, request correction of inaccurate contact information, or request deletion of historical records by contacting our Data Grievance Officer.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3 mt-8">
            <h3 className="text-base font-bold text-white">Privacy Officer Contact</h3>
            <p className="text-xs text-zinc-400">
              For any privacy inquiries, data deletion requests, or grievances:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:+91${phone}`} className="text-white hover:text-emerald-400 font-bold">
                  +91 {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${email}`} className="text-white hover:text-emerald-400 truncate">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
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
