import React, { useState, useEffect } from 'react';
import useSettingsStore from '../../store/settingsStore';
import { Save, CheckCircle2, Phone, Mail, Sparkles, MessageCircle, Info, Headphones } from 'lucide-react';

export default function Settings() {
  const { phone, helpPhone, email, updateSettings } = useSettingsStore();
  const [formData, setFormData] = useState({
    phone: phone || '9833309061',
    helpPhone: helpPhone || '8380803217',
    email: email || 'mumbaicitycabs24@gmail.com',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData({
      phone: phone || '9833309061',
      helpPhone: helpPhone || '8380803217',
      email: email || 'mumbaicitycabs24@gmail.com',
    });
  }, [phone, helpPhone, email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Website Contact Settings</h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure the public owner booking line for website visitors, and your internal admin helpline.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold">Settings Saved Successfully!</span> All phone numbers and email links have been updated in real-time in the database.
          </div>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-base">Direct Customer & Support Contacts</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Public phone is used across the home page and customer booking flow. Admin helpline is used in your staff panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Phone Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Main Owner Phone (Home Page & Bookings)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9833309061"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Customer calls & WhatsApp bookings connect to <code>+91 {formData.phone}</code>.
              </p>
            </div>

            {/* Admin Helpline Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Panel Helpline (Support / Help)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Headphones className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="helpPhone"
                  value={formData.helpPhone}
                  onChange={handleChange}
                  placeholder="8380803217"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Displayed in the Admin console sidebar for support: <code>+91 {formData.helpPhone}</code>.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Support Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mumbaicitycabs24@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Support email displayed on public website footer and forms.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Changes sync instantly across all pages and the server database.</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
