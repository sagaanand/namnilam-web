import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page bg-[#0b0f19] text-white min-h-screen pt-36 pb-24 flex items-center justify-center">
      <SeoHead 
        title="Page Not Found (404) | Nam Nilam"
        description="The requested page could not be found on the Nam Nilam real estate intelligence platform."
        noindex={true}
      />
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-10 h-10" />
        </div>
        <div className="text-emerald-400 font-mono text-sm uppercase tracking-wider font-bold">404 Error</div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Page Not Found</h1>
        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
          The link you followed may be broken, or the page may have been moved or updated.
          Explore our verified real estate listings or return to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/30"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 font-semibold text-sm hover:bg-gray-700 transition"
          >
            Browse Verified Plots
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 font-semibold text-sm hover:bg-gray-700 transition"
          >
            Layout Projects
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500">
          Nam Nilam • Real Estate Intelligence, Trichy, Tamil Nadu • Helpline: +91 97876 00006
        </div>
      </div>
    </div>
  );
};
