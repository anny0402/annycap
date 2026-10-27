import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, Zap, Info, Clock } from 'lucide-react';

export default function Pricing() {
  const [reelsCount, setReelsCount] = useState(240);
  const speechMinutes = Math.round(reelsCount * 0.5);

  const freeFeatures = [
    'Unlimited SRT & VTT subtitle file exports',
    'Word-by-word precise timestamp editing',
    'All 159 animated caption templates & styles',
    'Live in-browser video preview (9:16 & 16:9)',
    '12 Indian languages & Hinglish code-mixed support',
    'No watermark on generated subtitle files',
    'In-browser processing (video never uploaded)',
    'Full source code access for educational study',
    'Zero credit card or payment gateway requirement',
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Free Pricing Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            AnnyCap Pricing: <span className="text-amber-400">Everything is ₹0</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            100% FREE for every single feature included in this independent educational project.
            No subscriptions, no credit card required, and no hidden charges.
          </p>
        </div>

        {/* Interactive "Your Month on the Clock" Slider (Matching AutoCap Feature) */}
        <div className="bg-[#121218] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Your month, on the clock</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ₹0 Cost at Any Volume
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-400">
                ≈ {reelsCount} reels
              </span>
              <span className="text-sm font-mono text-zinc-400">
                {speechMinutes} min of speech
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={reelsCount}
              onChange={(e) => setReelsCount(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-xs text-zinc-400 pt-1">
              Commercial tools charge <strong className="text-white">₹699 – ₹1,499/mo</strong> for this volume. <br />
              <strong className="text-emerald-400">AnnyCap covers it all 100% Free for ₹0.</strong> Drag to the month you actually post.
            </p>
          </div>
        </div>

        {/* Highlight Plan Card */}
        <div className="relative max-w-xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-amber-500 via-orange-500 to-transparent shadow-2xl shadow-amber-500/10">
          <div className="bg-[#0f0f15] rounded-[22px] p-8 sm:p-10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
                  Community & Creator Tier
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">Full AnnyCap Access</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                100% FREE
              </span>
            </div>

            {/* Price display */}
            <div className="border-y border-zinc-800 py-6">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-white">₹0</span>
                <span className="text-zinc-400 text-sm font-medium">/ forever</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium mt-1">
                ₹0 — No Hidden Charges · Zero Checkout · No Renewal Mandate
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3.5">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Included with AnnyCap:
              </p>
              <ul className="space-y-3">
                {freeFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to="/editor"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Start for Free Now
              </Link>
              <p className="text-center text-[11px] text-zinc-500 mt-2.5">
                No login or account creation necessary to use the editor demo.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Comparison: Commercial Services vs. AnnyCap
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="border-b border-zinc-800 text-xs uppercase text-zinc-400">
                <tr>
                  <th className="py-3 px-4">Capability</th>
                  <th className="py-3 px-4">Commercial SaaS</th>
                  <th className="py-3 px-4 text-amber-400 font-bold">AnnyCap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Project Cost</td>
                  <td className="py-3.5 px-4 text-zinc-400">₹399 to ₹1,499 / month</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">₹0 (100% Free)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">SRT & VTT Export</td>
                  <td className="py-3.5 px-4 text-zinc-400">Requires paid subscription</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Unlimited Free Download</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Payment Gateway / Mandate</td>
                  <td className="py-3.5 px-4 text-zinc-400">Razorpay recurring mandate</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">None (Zero payment gates)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Watermark Removal</td>
                  <td className="py-3.5 px-4 text-zinc-400">₹99 per video or paid plan</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Clean Subtitles (No fee)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Source Code Transparency</td>
                  <td className="py-3.5 px-4 text-zinc-400">Proprietary closed source</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Open React + Vite Code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational Architecture & Optional Services Disclosure */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Info className="w-4 h-4" />
            <span>Optional Third-Party Infrastructure Cost Disclosure</span>
          </div>
          <p className="leading-relaxed">
            The code and user interface provided in AnnyCap are 100% free and open. If you deploy your own production backend in the future:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-300">
            <li><strong>Automated Speech Recognition APIs:</strong> Using third-party hosted models (e.g. OpenAI Whisper or Bhashini/Sarvam Indic models) costs ~₹0.50 per audio minute.</li>
            <li><strong>Self-Hosted GPU Servers:</strong> Running your own Whisper inference server on RunPod, Modal, or AWS EC2 costs ~₹15 - ₹35 per active GPU hour.</li>
            <li><strong>Web Hosting:</strong> Platforms like Vercel, Netlify, or GitHub Pages offer free tier hosting for static frontend deployments.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
