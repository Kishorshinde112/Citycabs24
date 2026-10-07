import React from 'react';
import { Clock, ShieldCheck, PhoneCall, Star, MapPin, Users } from 'lucide-react';

export default function WhyChooseUs({ onOpenBookModal }) {
  const features = [
    {
      icon: Clock,
      title: "On-Time Pickup",
      desc: "Punctual service guaranteed every time",
      stat: "99% On-Time Rate"
    },
    {
      icon: PhoneCall,
      title: "24/7 Service",
      desc: "Available round the clock for your needs",
      stat: "24/7 Always Ready"
    },
    {
      icon: Users,
      title: "Experienced Drivers",
      desc: "Professional drivers with local expertise",
      stat: "10+ Years Experience"
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      desc: "Verified drivers and well-maintained vehicles",
      stat: "100% Safety First"
    },
    {
      icon: MapPin,
      title: "Local Knowledge",
      desc: "Drivers who know every corner and hidden gem",
      stat: "500+ Destinations"
    },
    {
      icon: Star,
      title: "Highly Rated",
      desc: "Trusted by thousands of satisfied customers",
      stat: "4.8 Average Rating"
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-black text-white relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Why Choose CityCabs24?
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-2.5">
            Experience the difference with our commitment to excellence, reliability, and customer satisfaction.
          </p>
        </div>

        {/* Feature Cards Grid (2 rows of 3) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-yellow-400/40 shadow-lg flex items-start gap-4 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold font-display text-white">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>

                  <div className="mt-3 text-xs font-black text-yellow-400">
                    {feat.stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
