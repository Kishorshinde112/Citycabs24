import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import useSettingsStore from '../../store/settingsStore';

export default function RefundPolicyPage() {
  const { phone, helpPhone, email } = useSettingsStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <SEOHead
        title="Refund Policy | CityCabs24"
        description="Official Refund Policy for CityCabs24. Understand refund eligibility, duplicate payment resolutions, and our 5-7 business days initiation timeline."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-500/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
            Refund Policy – Citycabs24
          </h1>
          <p className="text-zinc-400 text-sm">
            Effective Date: 01 October 2026 • This Refund Policy explains the circumstances in which customers may be eligible for a refund for services booked through Citycabs24.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              1. Eligible Refunds
            </h2>
            <p>
              A customer may be eligible for a refund in circumstances such as:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
              <li>Citycabs24 cancels a confirmed booking and cannot provide an alternative service.</li>
              <li>The customer is charged for a booking that was not successfully confirmed.</li>
              <li>A duplicate payment is received for the same booking.</li>
              <li>A payment is successfully deducted but the booking cannot be provided due to an issue attributable to Citycabs24.</li>
              <li>Any other situation where a refund is required under applicable law.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              2. Cancellation by Customer
            </h2>
            <p>
              Refund eligibility for a customer-cancelled booking will depend on the applicable cancellation terms communicated at the time of booking.
            </p>
            <p className="text-zinc-400 text-sm">
              Please refer to our <Link to="/cancellation-policy" className="text-yellow-400 hover:underline">Cancellation Policy</Link>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              3. Non-Refundable/Actual Charges
            </h2>
            <p>
              Where applicable, charges already incurred for tolls, parking, permits, completed travel, waiting time or other services may not be refundable.
            </p>
            <p className="text-zinc-400 text-sm">
              Any applicable cancellation charge will be deducted before processing the eligible refund.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              4. Duplicate Payment
            </h2>
            <p>
              If you believe you have been charged twice for the same booking, contact us with the transaction details.
            </p>
            <p className="text-zinc-400 text-sm">
              After verification, an eligible duplicate payment will be refunded.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              5. Refund Process
            </h2>
            <p>
              Approved refunds will normally be initiated within <strong>5–7 business days</strong> after approval.
            </p>
            <p className="text-zinc-400 text-sm">
              The actual time for the money to appear in your bank account/card/UPI account may vary depending on your bank or payment service provider.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              6. Refund to Original Payment Method
            </h2>
            <p>
              Where technically possible, refunds will be made to the original payment method used for the transaction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              7. Refund Request
            </h2>
            <p>To request a refund, contact:</p>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="font-bold text-white text-base">Citycabs24 Accounts Desk</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Phone: <a href={`tel:+91${phone}`} className="text-white hover:text-blue-400 font-bold">+91 {phone}</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Email: <a href={`mailto:${email}`} className="text-white hover:text-blue-400">{email}</a></span>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-1">
                <p className="font-medium text-zinc-300">Please provide:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Customer name</li>
                  <li>Booking ID</li>
                  <li>Registered mobile number</li>
                  <li>Payment/transaction reference</li>
                  <li>Reason for refund request</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              8. Incorrect Bank/Payment Details
            </h2>
            <p className="text-zinc-400 text-sm">
              Citycabs24 will not be responsible for delays caused by incorrect customer-provided payment or bank information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              9. Policy Changes
            </h2>
            <p className="text-zinc-400 text-sm">
              Citycabs24 may update this Refund Policy when necessary. The latest version will be published on this page.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
