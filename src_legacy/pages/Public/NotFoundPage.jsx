import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Compass, ArrowRight, Home as HomeIcon } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import useSettingsStore from '../../store/settingsStore';

export default function NotFoundPage() {
  const { phone } = useSettingsStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      <SEOHead
        title="404 - Page Not Found | CityCabs24"
        description="The page you are looking for does not exist on CityCabs24. Explore our Mumbai sightseeing tours and outstation cab packages."
        noindex={true}
      />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto text-yellow-400">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <div className="space-y-2">
            <span className="text-yellow-400 font-extrabold text-sm tracking-wider uppercase">Error 404</span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              Page Not Found
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved or the address might be incorrect.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              to="/tours"
              className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm shadow-lg shadow-yellow-400/20 transition flex items-center gap-2"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-sm font-bold transition flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-zinc-400" />
              <span>Back to Home</span>
            </Link>

            <a
              href={`tel:+91${phone}`}
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-sm font-bold transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
