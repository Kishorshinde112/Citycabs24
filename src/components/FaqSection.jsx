import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import useSettingsStore from '../store/settingsStore';

export default function FaqSection() {
  const { phone } = useSettingsStore();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-zinc-950 text-white relative border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base mt-2">
            Everything you need to know about our cab booking process, tour packages, tolls, and safety standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-yellow-400 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-zinc-800 bg-zinc-950/40 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 bg-zinc-900 rounded-2xl p-5 border border-zinc-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">Still have questions or special requirements?</h3>
            <p className="text-xs text-zinc-400">Our customer team is available 24/7 on call and WhatsApp.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/91${phone}?text=Hi%20CityCabs24,%20I%20have%20a%20question%20regarding%20cab%20booking.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={`tel:+91${phone}`}
              className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs flex items-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
