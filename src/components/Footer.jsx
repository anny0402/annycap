import React from 'react';
import { Link } from 'react-router-dom';
import { INDIAN_LANGUAGES } from '../data/languagesData';
import { Heart, CheckCircle2, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#060608] text-zinc-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-black font-black text-sm">
                AC
              </div>
              <span className="font-extrabold text-lg text-white">AnnyCap</span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Upload a video, get accurate Hinglish & regional Indian captions, and export. 
              12 Indian languages · Animated caption styles · In-browser privacy · Burn-in & SRT/VTT.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>₹0 For Every Included Feature · No Credit Card Required</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/editor" className="hover:text-amber-400 transition-colors">Caption Editor Demo</Link></li>
              <li><Link to="/templates" className="hover:text-amber-400 transition-colors">Caption Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-amber-400 transition-colors">Pricing (₹0 Free)</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Project</Link></li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">Use Cases</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to="/editor" className="hover:text-zinc-200">Hinglish Code-Mixed</Link></li>
              <li><Link to="/templates" className="hover:text-zinc-200">Instagram Reels</Link></li>
              <li><Link to="/templates" className="hover:text-zinc-200">YouTube Shorts</Link></li>
              <li><Link to="/editor" className="hover:text-zinc-200">Word-Level SRT & VTT</Link></li>
              <li><Link to="/faq" className="hover:text-zinc-200">Browser Video Privacy</Link></li>
            </ul>
          </div>

          {/* Languages Supported */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs tracking-wider uppercase">12 Indian Languages</h4>
            <div className="flex flex-wrap gap-1.5">
              {INDIAN_LANGUAGES.map((lang) => (
                <span
                  key={lang.code}
                  className="px-2 py-0.5 rounded text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300"
                  title={`${lang.name} - ${lang.native}`}
                >
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Educational Reconstruction Notice:</strong> This project is an independent study reconstruction created for reverse engineering and learning purposes. It has no official affiliation with AutoCap or external commercial providers.
            </span>
          </div>
          <span className="text-zinc-500 shrink-0">₹0 Free Edition</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 AnnyCap. All included features ₹0 Free.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>for Indian creators & learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
