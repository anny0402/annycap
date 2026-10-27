import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Sparkles } from 'lucide-react';

export default function PremierePlugin() {
  const steps = [
    {
      num: '01',
      title: 'Generate or Edit Captions in AnnyCap',
      desc: 'Transcribe your Hinglish or regional Indic clip with word-level precision in the AnnyCap Editor.'
    },
    {
      num: '02',
      title: '1-Click Export SRT or VTT',
      desc: 'Click "Export SRT" or "Export VTT" in the top bar. Subtitles download formatted with standard millisecond timestamps.'
    },
    {
      num: '03',
      title: 'Import Directly into Adobe Premiere Pro',
      desc: 'In Premiere Pro, go to File → Import, select your .srt file, and drag it onto your sequence above your video track.'
    },
    {
      num: '04',
      title: 'Style with Essential Graphics & MOGRTs',
      desc: 'Use Premiere’s Text & Captions panel or convert to graphics to apply custom animations, word fonts, and dynamic keyframes.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Film className="w-4 h-4" />
            <span>NLE & Video Editor Integration · ₹0 Free</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            AnnyCap for <span className="text-amber-400">Premiere Pro</span> & DaVinci
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Move between browser speed and timeline precision without transcription lock-in. 
            Export standard SubRip (.SRT) and WebVTT (.VTT) with word-level accuracy ready for any professional editing suite.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/editor"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              Generate Subtitles for Premiere (₹0)
            </Link>
          </div>
        </div>

        {/* 4-Step Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="bg-[#121218] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-zinc-700 transition">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/20">
                {st.num}
              </span>
              <h3 className="font-bold text-white text-base">{st.title}</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Compatible NLE Software list */}
        <div className="bg-[#121218] border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Supported Video Editing Suites</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Compatible with standard subtitle tracks across all major video editors</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
              100% Free
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { name: 'Adobe Premiere Pro', desc: 'Captions & Graphics track' },
              { name: 'DaVinci Resolve', desc: 'Subtitle Track & Fusion' },
              { name: 'Final Cut Pro X', desc: 'ITT & SRT captions' },
              { name: 'CapCut / VN Editor', desc: 'Auto subtitle import' },
            ].map(soft => (
              <div key={soft.name} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 space-y-1">
                <h4 className="font-bold text-sm text-zinc-100">{soft.name}</h4>
                <p className="text-[11px] text-zinc-400">{soft.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
