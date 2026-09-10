import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, 
  Clock, Shield, Sparkles, Calendar, Car 
} from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';

export default function BookingContactForm() {
  const { phone, email } = useSettingsStore();
  const { addBooking } = useBookingsStore();

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

    // Save inquiry to Admin Dashboard
    addBooking({
      name: formData.name,
      phone: formData.phone,
      route: `${formData.pickupLocation} → ${formData.destination}`,
      vehicle: formData.carPreference,
      date: formData.date || new Date().toISOString().slice(0, 10),
    });

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
    <section id="contact" className="py-16 sm:py-24 bg-zinc-950 text-white relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-400/30">
            <Mail className="w-3.5 h-3.5 text-yellow-400" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
            Book Your Cab or <span className="text-yellow-400">Contact Us</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Fill out the quick inquiry form or connect directly with our 24/7 travel desk on WhatsApp or phone.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Support Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-zinc-900 rounded-3xl p-7 text-white shadow-xl border border-zinc-800 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">
                CityCabs24 Head Desk
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Serving all of Mumbai, Thane, Navi Mumbai, Pune, Nashik, and major Maharashtra tourist circuits.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:+91${phone}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Primary Hotline (24/7)</div>
                    <div className="font-bold text-sm text-white group-hover:text-yellow-400 transition">+91 {phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20want%20to%20inquire%20about%20a%20cab%20tour.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">WhatsApp Instant Desk</div>
                    <div className="font-bold text-sm text-white group-hover:text-yellow-400 transition">+91 {phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Email Support</div>
                    <div className="font-bold text-sm text-white group-hover:text-yellow-400 transition">{email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-400/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400">Operating Base</div>
                    <div className="font-bold text-xs text-white">Mumbai, Maharashtra, India</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Guarantee badge */}
            <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-400 shrink-0" />
              <p className="text-xs text-zinc-300 font-medium">
                <strong className="text-white">Fastest Response:</strong> Over 95% of WhatsApp inquiries receive instant vehicle allocation within 5 minutes.
              </p>
            </div>

          </div>

          {/* Right: Interactive Lead / Booking Form */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl p-6 sm:p-9 border border-zinc-800 shadow-xl">
            <h3 className="text-2xl font-bold font-display text-white mb-1">
              Send a Booking Request
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Our travel manager will call or message you immediately with confirmed driver and pricing details.
            </p>

            {submitted ? (
              <div className="bg-zinc-950 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received Successfully!</h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  We are opening WhatsApp with your pre-filled inquiry details for instant driver assignment.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs cursor-pointer transition"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Pickup City / Landmark *</label>
                    <input
                      type="text"
                      required
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="e.g. Dadar, Andheri, Mumbai Airport T2"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Drop Destination / Tour Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Lonavala, Shirdi, Mumbai Darshan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-xs sm:text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Vehicle Preference</label>
                    <select
                      value={formData.carPreference}
                      onChange={(e) => setFormData({ ...formData, carPreference: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-xs sm:text-sm outline-none bg-zinc-950 text-white transition cursor-pointer"
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
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Passengers</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-xs sm:text-sm outline-none bg-zinc-950 text-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Special Requirements / Notes (Optional)</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need baby seat, senior citizen easy step-in, early 5 AM airport pickup..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-sm outline-none bg-zinc-950 text-white transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 transition cursor-pointer"
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
