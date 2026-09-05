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
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col pb-14 sm:pb-0">
      
      {/* Navigation */}
      <Navbar onOpenBookModal={() => handleOpenBookModal()} />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative bg-black text-white py-16 sm:py-20 overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80')` }}
          />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Mumbai <span className="text-yellow-400">Darshan</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 mt-2 font-medium">
              Discover Mumbai's iconic landmarks with expert local driver-guides
            </p>
          </div>
        </section>

        {/* 2-Column Split Content Section */}
        <section className="py-12 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: Rules & Tour Highlights */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Intro Driver Guide Header */}
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                    Get drivers who act as a guide
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Mumbai sightseeing packages and explore the best of the city.
                  </p>
                  <div className="border-b border-dashed border-zinc-800 my-6" />
                </div>

                {/* Rules To Be Noted */}
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-4">
                    Rules To be Noted
                  </h2>

                  <div className="space-y-3">
                    {rulesList.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-dashed border-zinc-800 my-6" />
                </div>

                {/* Tour Highlights Points to Visit */}
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-4">
                    Tour Highlights points to visit
                  </h2>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                    <div className="grid sm:grid-cols-1 gap-2.5">
                      {highlightsList.map((spot, idx) => (
                        <div key={idx} className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center gap-2">
                          <span className="text-yellow-400 font-bold w-6">{idx + 1}.</span>
                          <span>{spot}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Rate Card & Booking Card */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Rate Card Table */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                  
                  {/* Table Header */}
                  <div className="bg-yellow-400 text-black p-4 font-black text-base flex items-center justify-between">
                    <span>Rate Card</span>
                  </div>

                  {/* Rates Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-yellow-500 text-black text-[11px] font-extrabold border-t border-yellow-400">
                          <th className="p-3 border-r border-yellow-400">Vehicle</th>
                          <th className="p-3 text-center border-r border-yellow-400">8 Hrs / 80 Kms</th>
                          <th className="p-3 text-center border-r border-yellow-400">10 Hrs / 100 Kms</th>
                          <th className="p-3 text-center border-r border-yellow-400">12 Hrs / 120 Kms</th>
                          <th className="p-3 text-center">Extra Kms / Extra Hrs</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-zinc-800 text-zinc-200 font-medium">
                        {ratesTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-800/80 transition">
                            <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">{row.vehicle}</td>
                            <td className="p-3 text-center border-r border-zinc-800">{row.h8}</td>
                            <td className="p-3 text-center border-r border-zinc-800">{row.h10}</td>
                            <td className="p-3 text-center border-r border-zinc-800">{row.h12}</td>
                            <td className="p-3 text-center text-[11px] whitespace-pre-line text-zinc-400">{row.extra}</td>
                          </tr>
                        ))}

                        {/* Tempo Traveller 13 Seater */}
                        <tr className="bg-zinc-950">
                          <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">13 Seater A/C Traveller</td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-zinc-300">
                            Full Day Mumbai Darshan ( 12 hrs 100 kms ) = <span className="text-yellow-400 font-bold">Rs.8500/-</span>
                          </td>
                        </tr>

                        {/* Tempo Traveller 17 Seater */}
                        <tr className="bg-zinc-950">
                          <td className="p-3 font-bold border-r border-zinc-800 text-yellow-400">17 Seater A/C Traveller</td>
                          <td colSpan={4} className="p-3 text-center font-semibold text-zinc-300">
                            Full Day Mumbai Darshan ( 12 hrs 100 kms ) = <span className="text-yellow-400 font-bold">Rs.9500/-</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Package Coverage Details Box */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 text-xs text-zinc-300 space-y-2 leading-relaxed">
                  <div className="font-bold text-yellow-400 text-sm mb-1">Package Coverage Details</div>
                  <p>In the 8 Hrs / 80 Kms package, around 8–10 places can be covered.</p>
                  <p>In the 10 Hrs / 100 Kms package, around 10–12 places can be covered.</p>
                  <p>In the 12 Hrs / 120 Kms package, around 14 or more places can be covered.</p>
                  <p>For Tempo Traveller only ( 12 hrs 100 kms ) packages are available.</p>
                  <p className="text-zinc-500 italic pt-1">
                    (The mentioned numbers may vary depending on traffic conditions and the time spent at each location.)
                  </p>
                </div>

                {/* Quick Booking Box */}
                <div className="bg-zinc-900 rounded-2xl border-2 border-yellow-400 p-6 space-y-4 shadow-2xl shadow-yellow-400/10">
                  <h3 className="text-lg font-black text-white flex items-center justify-between">
                    <span>Quick Booking</span>
                    <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-extrabold">Instant</span>
                  </h3>

                  <p className="text-xs text-zinc-400">
                    Get instant driver & cab confirmation for your Mumbai Darshan
                  </p>

                  <button
                    onClick={() => handleOpenBookModal({ dropCity: 'Mumbai Darshan' })}
                    className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-base shadow-lg shadow-yellow-400/20 transition cursor-pointer"
                  >
                    Book Now
                  </button>

                  <div className="pt-2 text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-800">
                    <span>Or call us directly:</span>
                    <a href={`tel:+91${phone}`} className="font-bold text-yellow-400 hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-yellow-400" />
                      <span>+91 {phone}</span>
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
