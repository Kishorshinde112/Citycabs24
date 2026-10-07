import React from 'react'
import Link from 'next/link'
import { CheckCircle2, Phone, Home, Sparkles } from 'lucide-react'
import EnquiryTracker from '@/components/EnquiryTracker'

export const metadata = {
  title: 'Enquiry Received | CityCabs24',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EnquiryReceived() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <EnquiryTracker />
      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-400/30">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5" /> Quick Enquiry Received
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3">Enquiry Received!</h1>
        <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto">
          We have received your enquiry and our team will get in touch with you shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+919833309061"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-black text-sm transition"
          >
            <Phone className="w-4 h-4" /> Call Us Now
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-sm transition"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}