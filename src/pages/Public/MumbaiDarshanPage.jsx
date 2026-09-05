import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import QuickBookModal from '../../components/QuickBookModal';
import PrivacyModal from '../../components/PrivacyModal';
import AutoEnquiryModal from '../../components/AutoEnquiryModal';
import { Phone, Check } from 'lucide-react';
import useSettingsStore from '../../store/settingsStore';

export default function MumbaiDarshanPage() {
  const { phone } = useSettingsStore();
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookModalInitialData, setBookModalInitialData] = useState({});
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [autoEnquiryOpen, setAutoEnquiryOpen] = useState(false);

  const handleOpenBookModal = (initialData = {}) => {
    setBookModalInitialData({ dropCity: 'Mumbai Darshan', tripType: 'Mumbai Darshan', ...initialData });
    setBookModalOpen(true);
  };

  const rulesList = [
    "Toll parking and entry tickets are not included in the car hire charges",
    "(Flexible pick-up timing and doorstep pick up)",
    "You can add or skip places of your choice.",
    "You can take your own time at each spot.",
    "Cancellation charge of Rs 500/- will be applicable if the booking is Cancelled after arrival of driver",
    "Night Allowance of Rs.500/- will be applicable after 11pm (Only for Tempo Traveller)",
    "All bookings are charged for the full package duration. For eg, if you book 8 hours and 80 km, even if you return the car in 6 hrs, you still must pay for the full 8 you booked (Applicable on all packages)",
    "Time and kilometres are calculated from your pickup point to pickup point (if the drop location is different then extra charges might applicable)"
  ];

  const highlightsList = [
    "Gateway of India",
    "Taj Mahal Palace Hotel",
    "Marine Drive",
    "Girgaon Chowpatty Viewing Deck",
    "Kamla Nehru Park",
    "Hanging Gardens",
    "Taraporewala Aquarium",
    "Chhatrapati Shivaji Maharaj Museum",
    "Flora Fountain",
    "Elephanta Caves (4-5 hrs to cover)",
    "Haji Ali Dargah",
    "Mahalaxmi Temple",
    "Mahalaxmi Racecourse",
    "Chhatrapati Shivaji Maharaj Terminus",
    "Colaba Causeway ( street shopping )",
    "Worli Sea Face",
    "Nehru Planetarium Science Centre",
    "Siddhivinayak Temple",
    "Bandra-Worli Sea Link",
    "Bandra Bandstand",
    "Mount Mary Basilica ( Church )",
    "Juhu Beach",
    "ISKCON Temple, Juhu"
  ];

  const ratesTable = [
    { vehicle: "WagonR", h8: "₹2300", h10: "₹2800", h12: "₹3400", extra: "₹12/km\n₹120/hr" },
    { vehicle: "Sedan", h8: "₹2500", h10: "₹3200", h12: "₹3800", extra: "₹14/km\n₹140/hr" },
    { vehicle: "Ertiga", h8: "₹3200", h10: "₹3800", h12: "₹4400", extra: "₹16/km\n₹160/hr" },
    { vehicle: "Kia Carens", h8: "₹3500", h10: "₹4200", h12: "₹4800", extra: "₹18/km\n₹180/hr" },
    { vehicle: "Crysta", h8: "₹3800", h10: "₹4500", h12: "₹5200", extra: "₹20/km\n₹200/hr" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col pb-14 sm:pb-0">
      
      {/* Navigation */}
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')` }}
          />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Mumbai Darshan
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 mt-2 font-medium">
              Discover Mumbai's iconic landmarks
            </p>
          </div>
        </section>

        {/* 2-Column Split Content Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: Rules & Tour Highlights */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Intro Driver Guide Header */}
                <div>
                  <h3 className="text-lg font-bold text-emerald-600">
                    Get drivers who act as a guide
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Mumbai sightseeing packages and explore the best of the city.
                  </p>
                  <div className="border-b border-dashed border-slate-300 my-6" />
                </div>

                {/* Rules To Be Noted */}
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                    Rules To be Noted
                  </h2>

                  <div className="space-y-3">
                    {rulesList.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-dashed border-slate-300 my-6" />
                </div>

                {/* Tour Highlights Points to Visit */}
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                    Tour Highlights points to visit
                  </h2>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
                    <div className="grid sm:grid-cols-1 gap-2.5">
                      {highlightsList.map((spot, idx) => (
                        <div key={idx} className="text-xs sm:text-sm font-semibold text-slate-800">
                          {idx + 1}. {spot}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Rate Card & Booking Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Rate Card Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  
                  {/* Table Header */}
                  <div className="bg-[#0284C7] text-white p-4 font-bold text-base flex items-center justify-between">
                    <span>Rate Card</span>
                  </div>

                  {/* Rates Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0284C7] text-white text-[11px] font-bold border-t border-sky-400">
                          <th className="p-3 border-r border-sky-400">Vehicle</th>
                          <th className="p-3 text-center border-r border-sky-400">8 Hrs / 80 Kms</th>
                          <th className="p-3 text-center border-r border-sky-400">10 Hrs / 100 Kms</th>
                          <th className="p-3 text-center border-r border-sky-400">12 Hrs / 120 Kms</th>
                          <th className="p-3 text-center">Extra Kms / Extra Hrs</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                        {ratesTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 font-bold border-r border-slate-200">{row.vehicle}</td>
                            <td className="p-3 text-center border-r border-slate-200">{row.h8}</td>
                            <td className="p-3 text-center border-r border-slate-200">{row.h10}</td>
                            <td className="p-3 text-center border-r border-slate-200">{row.h12}</td>
                            <td className="p-3 text-center text-[11px] whitespace-pre-line">{row.extra}</td>
                          </tr>
                        ))}

                        {/* Tempo Traveller 13 Seater */}
                        <tr className="bg-slate-50/50">
                          <td className="p-3 font-bold border-r border-slate-200">13 Seater A/C Traveller</td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-slate-700">
                            Full Day Mumbai Darshan ( 12 hrs 100 kms ) = Rs.8500/-
                          </td>
                        </tr>

                        {/* Tempo Traveller 17 Seater */}
                        <tr className="bg-slate-50/50">
                          <td className="p-3 font-bold border-r border-slate-200">17 Seater A/C Traveller</td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-slate-700">
                            Full Day Mumbai Darshan ( 12 hrs 100 kms ) = Rs.9500/-
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Package Coverage Details Box */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <div className="font-bold text-slate-900 text-sm mb-1">Package Coverage Details</div>
                  <p>In the 8 Hrs / 80 Kms package, around 8–10 places can be covered.</p>
                  <p>In the 10 Hrs / 100 Kms package, around 10–12 places can be covered.</p>
                  <p>In the 12 Hrs / 120 Kms package, around 14 or more places can be covered.</p>
                  <p>For Tempo Traveller only ( 12 hrs 100 kms ) packages are available.</p>
                  <p className="text-slate-500 italic pt-1">
                    (The mentioned numbers may vary depending on traffic conditions and the time spent at each location.)
                  </p>
                </div>

                {/* Quick Booking Box */}
                <div className="bg-orange-50/60 rounded-2xl border border-orange-200 p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Quick Booking
                  </h3>

                  <p className="text-xs text-slate-600">
                    Get instant confirmation for your Mumbai Darshan
                  </p>

                  <button
                    onClick={() => handleOpenBookModal({ dropCity: 'Mumbai Darshan' })}
                    className="w-full py-3.5 rounded-xl bg-[#FF5722] hover:bg-orange-600 text-white font-extrabold text-sm shadow-md transition cursor-pointer"
                  >
                    Book Now
                  </button>

                  <div className="pt-2 text-xs text-slate-600 flex items-center justify-between border-t border-orange-200/60">
                    <span>Or call us directly:</span>
                    <a href={`tel:+91${phone}`} className="font-bold text-slate-900 hover:text-[#0284C7] flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>+91 {phone} | City Cabs 24</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onSelectTour={() => {}}
      />

      {/* Floating Actions */}
      <FloatingActions onOpenBookModal={() => handleOpenBookModal()} />

      {/* Quick Booking Modal */}
      <QuickBookModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        initialData={bookModalInitialData}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Timed Enquiry Modal */}
      <AutoEnquiryModal
        isOpen={autoEnquiryOpen}
        onClose={() => setAutoEnquiryOpen(false)}
      />

    </div>
  );
}
