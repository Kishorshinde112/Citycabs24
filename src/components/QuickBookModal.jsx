import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSettingsStore from '../store/settingsStore';
import useBookingsStore from '../store/bookingsStore';
import {
  X, Phone, Sparkles, Car, Calendar, MapPin, Users,
  ShieldCheck, ArrowRight, ArrowLeft, ChevronDown, CheckCircle2
} from 'lucide-react';

const TOURS = [
  { group: '🏙️ City Tours',       items: ['Mumbai Darshan'] },
  { group: '⛰️ Hill Stations',    items: ['Lonavala Trip', 'Mahabaleshwar Sightseeing', 'Matheran Sightseeing', 'Igatpuri Tour'] },
  { group: '🙏 Pilgrimage Tours', items: ['Shirdi Tour', 'Ashtavinayak', '3 Jyotirlinga in Maharashtra'] },
  { group: '🏖️ Coastal Tours',    items: ['Alibaug Sightseeing', 'Konkan Darshan'] },
  { group: '🚗 Other',            items: ['One Way / Outstation', 'Airport Transfer', 'Custom Destination'] },
];

const VEHICLES = [
  { id: 'Swift Dzire (Sedan 4+1)',    label: 'Sedan',           sub: 'Swift Dzire / Etios • 4 Seats • AC' },
  { id: 'Maruti Ertiga (MUV 6+1)',    label: 'SUV – Ertiga',    sub: 'Maruti Ertiga • 6 Seats • AC' },
  { id: 'Kia Carens (MUV 6+1)',       label: 'SUV – Kia Carens',sub: 'Kia Carens • 6 Seats • AC' },
  { id: 'Innova Crysta (Luxury 7+1)', label: 'Luxury – Crysta', sub: 'Innova Crysta • 7 Seats • Premium' },
  { id: 'Tempo Traveller (13/17)',     label: 'Tempo Traveller', sub: '13–17 Seats • Group Travel' },
];

const TODAY = new Date().toISOString().split('T')[0];

function initForm(initialData = {}) {
  return {
    name:       '',
    contact:    '',
    pickup:     initialData.pickupCity  || '',
    drop:       initialData.dropCity    || '',
    date:       initialData.pickupDate  || '',
    carType:    initialData.carType     || 'Swift Dzire (Sedan 4+1)',
    tripType:   initialData.tripType    || 'Tour Package',
    passengers: '4',
  };
}

export default function QuickBookModal({ isOpen, onClose, initialData = {} }) {
  const { phone }       = useSettingsStore();
  const { addBooking }  = useBookingsStore();
  const navigate        = useNavigate();

  const [step,     setStep]     = useState(1);
  const [formData, setFormData] = useState(() => initForm(initialData));
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  /* ── reset every time modal opens ── */
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError('');
      setLoading(false);
      setFormData(initForm(initialData));
    }
  }, [isOpen]);

  /* ── guard AFTER all hooks ── */
  if (!isOpen) return null;

  /* ── helpers ── */
  const update = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const validateStep1 = () => {
    if (!formData.pickup.trim()) return 'Pickup location is required.';
    if (!formData.drop)          return 'Please select a destination / tour.';
    if (!formData.date)          return 'Please select a travel date.';
    if (formData.date < TODAY)   return 'Travel date cannot be in the past.';
    return '';
  };

  const validateStep3 = () => {
    if (!formData.name.trim())                   return 'Your name is required.';
    if (!/^\d{10}$/.test(formData.contact.trim())) return 'Enter a valid 10-digit mobile number.';
    return '';
  };

  const handleNext = () => {
    const err = step === 1 ? validateStep1() : '';
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    const err = validateStep3();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);

    const bookingPayload = {
      name:            formData.name.trim(),
      phone:           formData.contact.trim(),
      contact:         formData.contact.trim(),
      tripType:        formData.tripType,
      route:           formData.drop,
      tourName:        formData.drop,
      date:            formData.date,
      travelDate:      formData.date,
      vehicle:         formData.carType,
      carType:         formData.carType,
      pickupLocation:  formData.pickup.trim(),
      passengers:      formData.passengers,
    };

    await addBooking(bookingPayload);

    // Close modal & redirect to Thank You page with booking data
    onClose();
    navigate('/booking-confirmed', { state: bookingPayload });
  };

  /* ── shared input class ── */
  const inputCls = 'w-full px-4 py-3 text-sm text-slate-900 bg-white rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all shadow-sm';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">

        {/* ─── Header ─── */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-slate-100 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Fast Booking Desk
          </div>
          <h2 className="text-2xl font-black text-slate-900">Book Your Guided Cab</h2>

          {/* Step indicator */}
          <div className="mt-4">
            <div className="flex items-center gap-0">
              {['Trip Details', 'Vehicle', 'Contact'].map((label, i) => {
                const num = i + 1;
                const active = step === num;
                const done   = step > num;
                return (
                  <React.Fragment key={num}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all
                        ${done   ? 'bg-yellow-400 border-yellow-400 text-black'  : ''}
                        ${active ? 'bg-yellow-400 border-yellow-400 text-black scale-110 shadow-md shadow-yellow-400/30' : ''}
                        ${!done && !active ? 'bg-white border-slate-200 text-slate-400' : ''}`}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : num}
                      </div>
                      <span className={`text-[9px] font-bold mt-1 uppercase tracking-wide ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                        {label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div className={`flex-1 h-0.5 mb-5 mx-1 rounded transition-all ${step > num ? 'bg-yellow-400' : 'bg-slate-100'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Body ─── */}
        <div className="px-6 py-5 space-y-5">

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Pickup */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Pickup Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dadar, Andheri, Thane, Navi Mumbai..."
                  value={formData.pickup}
                  onChange={e => update('pickup', e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Destination dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-700" /> Destination / Tour Package *
                </label>
                <div className="relative">
                  <select
                    value={formData.drop}
                    onChange={e => update('drop', e.target.value)}
                    className={inputCls + ' pr-10 cursor-pointer'}
                  >
                    <option value="" disabled>-- Select Tour / Destination --</option>
                    {TOURS.map(g => (
                      <optgroup key={g.group} label={g.group}>
                        {g.items.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Travel Date *
                </label>
                <input
                  type="date"
                  min={TODAY}
                  value={formData.date}
                  onChange={e => update('date', e.target.value)}
                  className={inputCls}
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 transition"
              >
                Continue to Vehicle Selection <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">Select your preferred cab type for <span className="text-slate-900 font-bold">{formData.drop}</span></p>
              <div className="space-y-2">
                {VEHICLES.map(v => {
                  const selected = formData.carType === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => update('carType', v.id)}
                      className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                        ${selected ? 'border-yellow-400 bg-amber-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                        ${selected ? 'bg-yellow-400' : 'bg-slate-100'}`}>
                        <Car className={`w-5 h-5 ${selected ? 'text-black' : 'text-slate-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-sm ${selected ? 'text-slate-900' : 'text-slate-700'}`}>{v.label}</div>
                        <div className="text-xs text-slate-500 truncate">{v.sub}</div>
                      </div>
                      {selected && <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setError(''); setStep(1); }}
                  className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 transition">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="button" onClick={handleNext}
                  className="flex-1 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 transition">
                  Final Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Booking summary */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs space-y-1.5">
                <div className="font-bold text-slate-600 text-[11px] uppercase tracking-wide mb-2">Booking Summary</div>
                <div className="flex justify-between"><span className="text-slate-500">Pickup</span><span className="font-bold text-slate-800 text-right max-w-[60%] truncate">{formData.pickup}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Tour / Destination</span><span className="font-bold text-slate-800">{formData.drop}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-bold text-slate-800">{formData.date}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Vehicle</span><span className="font-bold text-slate-800">{VEHICLES.find(v => v.id === formData.carType)?.label}</span></div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-500" /> Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => update('name', e.target.value)}
                  className={inputCls}
                  autoFocus
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.contact}
                    onChange={e => update('contact', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={inputCls + ' pl-12'}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">We'll call this number to confirm your booking</p>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setError(''); setStep(2); }}
                  className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 transition">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 transition"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Processing...</span>
                  ) : (
                    <><ShieldCheck className="w-4 h-4" /> Confirm Booking</>
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400">By submitting, you agree to our terms of service.</p>
            </div>
          )}

        </div>

        {/* ─── Footer ─── */}
        <div className="px-6 pb-5 pt-2 border-t border-slate-100 text-center">
          <a href={`tel:+91${phone}`} className="text-xs font-bold text-slate-500 hover:text-amber-600 transition">
            📞 Or call directly: +91 {phone}
          </a>
        </div>

      </div>
    </div>
  );
}
