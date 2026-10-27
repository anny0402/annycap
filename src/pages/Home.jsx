import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ShieldCheck, ArrowRight, 
  Volume2, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/languagesData';
import { TEMPLATES } from '../data/templatesData';

export default function Home() {
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[1]); // Hinglish default

  // Animated hero words loop
  const heroDemoWords = [
    { word: 'Basically', start: 0, end: 1 },
    { word: 'yeh', start: 1, end: 2 },
    { word: 'feature', start: 2, end: 3 },
    { word: 'try', start: 3, end: 4 },
    { word: 'karo,', start: 4, end: 5 },
    { word: 'it', start: 5, end: 6 },
    { word: 'actually', start: 6, end: 7 },
    { word: 'works!', start: 7, end: 8 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % heroDemoWords.length);
    }, 450);
    return () => clearInterval(timer);
  }, [heroDemoWords.length]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-[500px] h-72 sm:h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs sm:text-sm font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>AnnyCap — Captions in 12 Indian Languages</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Auto-captions drift. <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Ours carry start and end for every single word.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Most caption tools mangle code-mixed speech. AnnyCap transcribes 12 Indian languages — 
            Hindi, Hinglish, Tamil, Bengali and more — then lets you edit every word before you export.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/editor"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Try it Free (₹0)
            </Link>
            <Link
              to="/templates"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-sm flex items-center justify-center gap-2 transition"
            >
              See the Styles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Value Points */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Unlimited ₹0 exports</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Every word editable</span>
            </div>
          </div>
        </div>

        {/* HERO LIVE ANIMATED PREVIEW REEL */}
        <div className="mt-14 max-w-sm sm:max-w-md mx-auto">
          <div className="bg-[#121218] border border-zinc-800 p-3 rounded-3xl shadow-2xl shadow-black/80">
            <div className="aspect-[9/16] max-h-[460px] w-full rounded-2xl bg-gradient-to-b from-zinc-900 via-black to-[#0e0e15] border border-zinc-800 relative overflow-hidden flex flex-col justify-between p-6">
              
              {/* Header inside reel */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/60 font-mono">
                  Live Word Sync
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ₹0 Free
                </span>
              </div>

              {/* Sound Graphic */}
              <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  Listening: Hinglish Audio
                </span>
              </div>

              {/* Real-time word highlight display */}
              <div className="text-center pb-6">
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-2xl font-black uppercase tracking-wide">
                  {heroDemoWords.map((item, idx) => {
                    const isActive = idx === activeWordIdx;
                    return (
                      <span
                        key={idx}
                        className={`transition-all duration-150 px-1 rounded ${
                          isActive
                            ? 'text-yellow-400 bg-yellow-500/20 scale-110 shadow-lg'
                            : 'text-zinc-500'
                        }`}
                        style={{
                          textShadow: isActive
                            ? '2px 2px 0 #000, -2px -2px 0 #000'
                            : 'none',
                        }}
                      >
                        {item.word}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-4 text-[11px] text-zinc-500 font-mono">
                  Word {activeWordIdx + 1} of {heroDemoWords.length} · Auto Highlight
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (5 CHRONOLOGICAL STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
            How it works
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            No timeline to learn. No project headache.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            This is everything that happens from video drop to final export — under 3 minutes, start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                01
              </span>
              <span className="text-xs font-mono text-zinc-500">00:00</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Drop the clip. Only audio leaves.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              MP4 or MOV from your phone or camera. Pick the spoken language or auto-detect — only the audio is processed for speech recognition. Your video never leaves your device.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                02
              </span>
              <span className="text-xs font-mono text-zinc-500">00:02</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Every word gets its own start & end.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Not a block of text: each word comes back with its own precise timestamp, allowing highlights to land on the beat instead of drifting into an unread paragraph.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                03
              </span>
              <span className="text-xs font-mono text-zinc-500">00:04</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Your language. Your script.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Built specifically for Hinglish & code-mixed speech. Keep it in Roman letters, set it in its native Indic script, or translate directly into English subtitles.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                04
              </span>
              <span className="text-xs font-mono text-zinc-500">00:06</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Pick a look. Animated presets.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Every template reveals word by word. Recolour words, change font sizes, or nudge timings with instantaneous real-time preview before rendering.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-zinc-700 transition md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                05
              </span>
              <span className="text-xs font-mono text-zinc-500">00:08</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              Export on your device. As often as you like.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Captions burn into your video directly inside the browser using client-side rendering—or download clean, standard SRT and VTT subtitle files for Premiere, FCPX, or DaVinci Resolve.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE HINGLISH DIFFERENCE COMPARISON */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121218] border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
              The Code-Mixed Speech Problem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why American English-first caption tools fail in India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Typical English Tool Failure */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Typical English-First Tool
              </span>
              <p className="font-mono text-xs sm:text-sm text-zinc-300 italic bg-black/40 p-3 rounded-xl border border-rose-950">
                "basically ye picture try kado it act really works"
              </p>
              <p className="text-xs text-rose-300/80">
                ❌ Mangles phonetic Indian English & Hindi words. Creators spend 20+ minutes correcting broken sentences.
              </p>
            </div>

            {/* AutoCap Approach */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                AnnyCap Hinglish Engine
              </span>
              <p className="font-mono text-xs sm:text-sm text-emerald-300 font-bold bg-black/40 p-3 rounded-xl border border-emerald-950">
                "Basically yeh feature try karo, it actually works"
              </p>
              <p className="text-xs text-emerald-300/80">
                ✓ Preserves code-mixed intent, correct spelling, and provides 1-click word nudging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 12 INDIAN LANGUAGES INTERACTIVE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
            Multilingual Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            12 Indian Languages. In their own script or Romanised.
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Click on any language to see an authentic sample caption representation.
          </p>
        </div>

        {/* Language selector chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {INDIAN_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedLanguage.code === lang.code
                  ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-[#121218] border border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span>{lang.name}</span>
              <span className="text-[10px] ml-1.5 opacity-70">({lang.native})</span>
            </button>
          ))}
        </div>

        {/* Language Preview Card */}
        <div className="max-w-xl mx-auto bg-[#121218] border border-zinc-800 p-8 rounded-2xl text-center space-y-4">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            {selectedLanguage.name} Sample Caption
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            "{selectedLanguage.sample}"
          </p>
          <div className="pt-2">
            <Link
              to="/editor"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white underline"
            >
              Test {selectedLanguage.name} in Editor Demo <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Popular Animated Styles</h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Used by top creators for viral Instagram Reels and YouTube Shorts.
            </p>
          </div>
          <Link
            to="/templates"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Browse all templates <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.slice(0, 4).map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-[#121218] border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tmpl.style.badgeBg}`}>
                  {tmpl.badge}
                </span>
                <h3 className="font-bold text-white text-base mt-2">{tmpl.name}</h3>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{tmpl.description}</p>
              </div>
              <Link
                to="/editor"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                Try in editor <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FREE GUARANTEE CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-600/20 via-orange-600/10 to-transparent border border-amber-500/30 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              ₹0 Free For Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to generate word-by-word captions?
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Open the interactive editor demo, customize word styles, synchronize timings, and download standard SRT/VTT files with zero friction.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              to="/editor"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              Use Caption Editor (₹0)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
