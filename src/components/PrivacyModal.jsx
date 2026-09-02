import React from 'react';
import useSettingsStore from '../store/settingsStore';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  const { phone, email } = useSettingsStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust & Transparency</span>
        </div>

        <h3 className="text-2xl font-black font-display text-slate-900 mb-4">
          Privacy Policy & Booking Terms
        </h3>

        <div className="max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 pr-2">
          <div>
            <h4 className="font-bold text-slate-900">1. Information Collection</h4>
            <p>We collect your name, contact phone number, and pickup location strictly for vehicle allotment, dispatch coordination, and GST tax invoice generation. We never share your data with third-party telemarketers.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900">2. Driver & Passenger Safety</h4>
            <p>All vehicles are commercially licensed with valid commercial passenger insurance. All chauffeurs undergo mandatory background checks, commercial license verification, and safety training.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900">3. Tolls, Parking & Inter-State Taxes</h4>
            <p>Base fares include vehicle rental, fuel, and driver daily allowance. Fastag toll plaza charges, state border entry taxes (if applicable), and hotel/monument parking charges are payable on actual receipts.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900">4. Cancellation & Refund Policy</h4>
            <p>Local & city tour bookings can be cancelled or rescheduled up to 6 hours prior without fee. Outstation bookings cancelled less than 12 hours prior to departure attract a nominal ₹500 token charge.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900">5. Contact Information</h4>
            <p>For any inquiries or grievances, contact our grievance officer at <strong>{email}</strong> or call <strong>+91 {phone}</strong>.</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
