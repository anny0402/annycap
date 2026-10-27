import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does this caption engine handle Hinglish and code-mixed speech?',
      a: 'Most global tools are trained primarily on standard English and mangle Indian code-mixed sentences (e.g. converting "yeh picture try karo" to "ye picture try kado"). This engine explicitly tracks word boundaries for code-mixed speech in Roman script as well as native scripts, and provides full word-level editing so you can correct names, brands, or colloquialisms before export.'
    },
    {
      q: 'Does my video get uploaded to a cloud server?',
      a: 'No. The video remains entirely on your device. Video rendering and caption burn-in run locally inside your browser (using WebCodecs or canvas recording). In a production cloud backend, only the extracted audio track is sent for transcription and is not retained.'
    },
    {
      q: 'Which 12 Indian regional languages are supported?',
      a: 'All 12 major Indian languages: Hindi (हिन्दी), Hinglish, Bengali (বাংলা), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Marathi (मराठी), Odia (ଓଡ଼ିଆ), Punjabi (ਪੰਜਾਬੀ), Tamil (தமிழ்), Telugu (తెలుగు), Urdu (اردو), and Indian English.'
    },
    {
      q: 'Are the SRT and VTT exports really 100% Free (₹0) in this project?',
      a: 'Yes. In this independent educational reconstruction, 100% of the included features—including unlimited standard SubRip (.srt) and WebVTT (.vtt) file exports, full styling controls, and template presets—cost exactly ₹0. There are no paywalls, subscriptions, or credit card requirements.'
    },
    {
      q: 'What is word-level timestamp alignment and why does it matter?',
      a: 'Traditional subtitles group entire sentences into single blocks lasting several seconds. In modern short-form video (Reels & Shorts), viral styles like "Hormozi" or "Dynamic Pop" require highlighting the exact word at the split-second it is spoken. Word-level timestamps provide exact start and end seconds (e.g. 0.15s to 0.52s) for every single word.'
    },
    {
      q: 'Can I edit the words and nudge timestamps if the audio has a slight drift?',
      a: 'Yes! In the Caption Editor Demo, click on any word card to edit the spelling, or use the ▲ and ▼ nudge buttons to adjust the start or end time by ±0.05 seconds. The live video preview updates instantly.'
    },
    {
      q: 'Can I use the exported SRT / VTT files in my video editor?',
      a: 'Absolutely. The exported .srt and .vtt files adhere to international subtitle standards and can be directly imported into Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, CapCut, or uploaded to YouTube.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about Hinglish transcription, in-browser privacy, ₹0 pricing, and word-level alignment.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121218] border border-zinc-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-zinc-800/40 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-zinc-200">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-[#14141c] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-white text-base">Want to test it yourself?</h3>
            <p className="text-zinc-400 text-xs">
              Try the live interactive caption editor with sample Hinglish audio now.
            </p>
          </div>
          <Link
            to="/editor"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
          >
            Open Caption Editor
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
