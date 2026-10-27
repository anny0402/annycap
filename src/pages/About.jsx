import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code2, Cpu, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Independent Educational Reconstruction</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About AnnyCap
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            This web application is an open educational study clone built from scratch to examine
            how modern Indian language caption engines, word-level timestamp alignment, and browser-based subtitle export work.
          </p>
        </div>

        {/* Disclaimer Card */}
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Non-Affiliation & Educational Notice</span>
          </div>
          <p className="leading-relaxed">
            This project is an independent educational reconstruction created for educational, analytical, and reverse-engineering training purposes. It has no formal connection, sponsorship, or affiliation with AutoCap or its creators. All registered trademarks, logos, and service names belong to their respective owners.
          </p>
          <p className="font-semibold text-emerald-400">
            All code in this project is 100% Free (₹0) and contains zero commercial paywalls or billing systems.
          </p>
        </div>

        {/* Architecture & Engineering Highlights */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            Reverse Engineering & Architectural Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121218] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">Word-Level Data Model</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Rather than treating subtitles as multi-second sentence blocks, each spoken word contains its own millisecond-accurate start and end timing. This allows dynamic karaoke highlights that land on the exact beat.
              </p>
            </div>

            <div className="bg-[#121218] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">In-Browser Privacy</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Modern web architectures allow video canvas drawing, caption overlay burning, and audio extraction to happen on the client machine. This saves expensive cloud GPU bandwidth and protects user video privacy.
              </p>
            </div>

            <div className="bg-[#121218] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">Standards-Compliant Exporters</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clean algorithmic conversion of word-level data structures into SubRip (.srt) and WebVTT (.vtt) file formats with proper time padding (HH:MM:SS,mmm), ready for immediate import into professional NLEs.
              </p>
            </div>

            <div className="bg-[#121218] border border-zinc-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-sm">REA Tool Integration</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Analyzed and verified through the REA (Reverse Engineering Anything) toolkit and Claude Desktop Model Context Protocol (MCP) server, distinguishing observable client evidence from cloud inferences.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Summary */}
        <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Frontend Stack Used</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router v7', 'Lucide React', 'Node.js 24', 'REA Toolkit'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="text-center pt-4">
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Launch AnnyCap Studio (₹0)
          </Link>
        </div>
      </div>
    </div>
  );
}
