import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, PlayCircle, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Caption Editor', path: '/editor', isFeatured: true },
    { name: 'Templates', path: '/templates' },
    { name: 'Premiere Plugin', path: '/premiere-pro-plugin' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090b]/85 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              AC
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                AnnyCap
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ₹0 Free
                </span>
              </span>
              <span className="text-[11px] text-zinc-400 -mt-1 hidden sm:block">
                Auto Captions for Hinglish & 12 Indian Languages
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                } ${link.isFeatured ? 'flex items-center gap-1.5' : ''}`}
              >
                {link.isFeatured && <PlayCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free · No Card</span>
            </div>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start for Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/editor"
              className="bg-amber-500 text-black font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              Editor
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#0c0c10] px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg justify-center">
              <ShieldCheck className="w-4 h-4" />
              <span>AnnyCap Free Edition · ₹0 Forever</span>
            </div>
            <Link
              to="/editor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-sm"
            >
              Use Caption Editor Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
