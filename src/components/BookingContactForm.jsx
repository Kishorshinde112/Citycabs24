import React, { useState } from 'react';
import useSettingsStore from '../store/settingsStore';
import { 
  Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, 
  Clock, Shield, Sparkles, Calendar, Car 
} from 'lucide-react';

export default function BookingContactForm() {
  const { phone, email } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    destination: '',
    date: '',
    carPreference: 'Swift Dzire (Sedan)',
    passengers: '4',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Also trigger WhatsApp message for instantaneous conversion
    const text = `*🚖 CityCabs24 - Website Booking Inquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Pickup:* ${formData.pickupLocation}\n` +
      `*Destination / Tour:* ${formData.destination}\n` +
      `*Date:* ${formData.date}\n` +
      `*Vehicle:* ${formData.carPreference}\n` +
      `*Passengers:* ${formData.passengers}\n` +
      `*Special Requests:* ${formData.message || 'None'}\n\n` +
      `Please share availability and confirmed quotation.`;

    setTimeout(() => {
      window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900">
            Book Your Cab or <span className="text-indigo-600">Contact Us</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Fill out the quick inquiry form or connect directly with our 24/7 travel desk on WhatsApp or phone.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Support Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-slate-900 rounded-3xl p-7 text-white shadow-xl border border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">
                CityCabs24 Head Desk
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Serving all of Mumbai, Thane, Navi Mumbai, Pune, Nashik, and major Maharashtra tourist circuits.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:+91${phone}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Primary Hotline (24/7)</div>
                    <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition">+91 {phone}</div>
                  </div>
                </a>

                <a
                  href="tel:+919967672660"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Secondary Booking Line</div>
                    <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition">+91 9967672660</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20inquire%20about%20a%20cab%20tour.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/60 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-300">WhatsApp Instant Desk</div>
                    <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition">+91 {phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Email Support</div>
                    <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition">{email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Operating Base</div>
                    <div className="font-bold text-xs text-white">Mumbai, Maharashtra, India</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Guarantee badge */}
            <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-600 shrink-0" />
              <p className="text-xs text-indigo-900 font-medium">
                <strong>Fastest Response:</strong> Over 95% of WhatsApp inquiries receive instant vehicle allocation within 5 minutes.
              </p>
            </div>

          </div>

          {/* Right: Interactive Lead / Booking Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">
              Send a Booking Request
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Our travel manager will call or message you immediately with confirmed driver and pricing details.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900">Inquiry Received Successfully!</h4>
                <p className="text-xs sm:text-sm text-emerald-700">
                  We are opening WhatsApp with your pre-filled inquiry details for instant driver assignment.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pickup City / Landmark *</label>
                    <input
                      type="text"
                      required
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="e.g. Dadar, Andheri, Mumbai Airport T2"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Drop Destination / Tour Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Lonavala, Shirdi, Mumbai Darshan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xs sm:text-sm outline-none bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Preference</label>
                    <select
                      value={formData.carPreference}
                      onChange={(e) => setFormData({ ...formData, carPreference: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xs sm:text-sm outline-none bg-white transition"
                    >
                      <option value="Swift Dzire (Sedan)">Swift Dzire (Sedan)</option>
                      <option value="Maruti WagonR (Hatchback)">Maruti WagonR (Hatchback)</option>
                      <option value="Maruti Ertiga (6+1)">Maruti Ertiga (6+1)</option>
                      <option value="Kia Carens (7 Seater)">Kia Carens (7 Seater)</option>
                      <option value="Innova Crysta (Luxury)">Innova Crysta (Luxury)</option>
                      <option value="Tempo Traveller (13/17)">Tempo Traveller (13/17)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Passengers</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-xs sm:text-sm outline-none bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements / Notes (Optional)</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need baby seat, senior citizen easy step-in, early 5 AM airport pickup..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none bg-white transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Connect on WhatsApp</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
