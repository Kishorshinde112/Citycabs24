import React from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, Phone } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found (404) | CityCabs24',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-zinc-950 text-white flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="w-20 h-20 bg-yellow-400/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-400/20">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 font-display">404 - Page Not Found</h1>
      <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8">
        The destination or cab page you are looking for has been moved, renamed, or does not exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm transition"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/tours"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition"
        >
          View All Tour Packages
        </Link>
        <a
          href="tel:+919833309061"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-yellow-400 text-yellow-400 font-bold text-sm transition"
        >
          <Phone className="w-4 h-4" /> Call Desk
        </a>
      </div>
    </div>
  )
}
