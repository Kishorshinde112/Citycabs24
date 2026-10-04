import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import useSettingsStore from '../../store/settingsStore';

export default function CancellationPolicyPage() {
  const { phone, helpPhone, email } = useSettingsStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <SEOHead
        title="Cancellation Policy | CityCabs24"
        description="Official Cancellation Policy for CityCabs24. Understand customer cancellations, charges, rescheduling terms, and refund eligibility."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <XCircle className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
            Cancellation Policy – Citycabs24
          </h1>
          <p className="text-zinc-400 text-sm">
            Effective Date: 01 October 2026 • This Cancellation Policy applies to cab bookings made through Citycabs24.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              1. Customer Cancellation
            </h2>
            <p>
              Customers may request cancellation of their booking by contacting Citycabs24 through the available contact channels.
            </p>
            <p className="text-zinc-400 text-sm">
              Cancellation should be requested as early as possible.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              2. Cancellation Charges
            </h2>
            <p>
              The applicable cancellation charge, if any, will depend on the booking type, scheduled pickup time and time remaining before the scheduled pickup.
            </p>
            <p className="text-zinc-400 text-sm">
              Where a specific cancellation charge is applicable, it will be communicated to the customer before or during booking.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              3. Cancellation by Citycabs24
            </h2>
            <p>
              Citycabs24 may cancel a booking where necessary due to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
              <li>Vehicle unavailability</li>
              <li>Driver unavailability</li>
              <li>Vehicle breakdown</li>
              <li>Safety concerns</li>
              <li>Weather or road conditions</li>
              <li>Government restrictions</li>
              <li>Other circumstances beyond reasonable control</li>
            </ul>
            <p className="text-zinc-400 text-sm">
              Where Citycabs24 cancels a prepaid booking and is unable to provide an alternative service, the customer may be eligible for a refund according to the Refund Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              4. No-Show
            </h2>
            <p>
              If the customer does not arrive at the agreed pickup location within the applicable waiting period and cannot be contacted, the booking may be treated as a no-show.
            </p>
            <p className="text-zinc-400 text-sm">
              A no-show may be subject to applicable charges as communicated during booking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              5. Wrong Pickup Information
            </h2>
            <p>
              If incorrect pickup information is provided by the customer and the driver is unable to locate the customer, the booking may be treated as a customer cancellation/no-show, subject to applicable charges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              6. Rescheduling
            </h2>
            <p>
              Customers may request a change to the date or time of a booking.
            </p>
            <p className="text-zinc-400 text-sm">
              Rescheduling is subject to vehicle and driver availability and may be subject to additional charges where applicable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              7. Refund After Cancellation
            </h2>
            <p>
              Where a cancellation qualifies for a refund, Citycabs24 will process the eligible refund according to its <Link to="/refund-policy" className="text-yellow-400 hover:underline">Refund Policy</Link>.
            </p>
            <p className="text-zinc-400 text-sm">
              Approved refunds will normally be initiated within <strong>5–7 business days</strong>.
            </p>
            <p className="text-zinc-400 text-sm">
              The customer’s bank/payment provider may take additional time to credit the amount.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              8. Contact for Cancellation
            </h2>
            <p>To cancel or modify a booking, please contact us with your booking ID and registered mobile number:</p>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-bold text-white text-base">Citycabs24 Booking Desk</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Phone: <a href={`tel:+91${phone}`} className="text-white hover:text-amber-400 font-bold">+91 {phone}</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Email: <a href={`mailto:${email}`} className="text-white hover:text-amber-400">{email}</a></span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 pt-1">
                Please provide your <strong>Booking ID</strong> and <strong>registered mobile number</strong> for quick cancellation processing.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              9. Policy Updates
            </h2>
            <p className="text-zinc-400 text-sm">
              Citycabs24 may update this Cancellation Policy from time to time. The latest version will be available on this page.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
