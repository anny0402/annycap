import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TEMPLATE_CATEGORIES, 
  TEMPLATES_191, 
  DYNAMIC_65 
} from '../data/templatesData';
import { Search, ArrowRight, Play } from 'lucide-react';

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter templates based on category and search query
  const filteredTemplates = useMemo(() => {
    let sourceList = TEMPLATES_191;

    if (selectedCategory === 'Dynamic') {
      sourceList = DYNAMIC_65;
    } else if (selectedCategory === 'All') {
      sourceList = TEMPLATES_191;
    } else {
      sourceList = TEMPLATES_191.filter(
        (t) => t.language.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (!searchQuery.trim()) return sourceList;

    const query = searchQuery.toLowerCase();
    return sourceList.filter(
      (tmpl) =>
        tmpl.name.toLowerCase().includes(query) ||
        tmpl.tags.some((tg) => tg.toLowerCase().includes(query)) ||
        tmpl.language.toLowerCase().includes(query) ||
        (tmpl.badge && tmpl.badge.toLowerCase().includes(query))
    );
  }, [selectedCategory, searchQuery]);

  const handleUseTemplate = (templateId) => {
    navigate(`/editor?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header - 100% 1:1 AutoCap Match */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-semibold">
            TEMPLATES
          </p>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Every style, and when to use it
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Pick one in the editor and every word inherits it instantly. Styles are data presets, so any of these can be forked and tuned per project.
          </p>
        </div>

        {/* Filter Pills Navigation Row - 100% Match with AutoCap counts */}
        <div className="space-y-4">
          <nav aria-label="Filter templates by language" className="flex flex-wrap gap-2 items-center">
            {TEMPLATE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition cursor-pointer ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-semibold shadow-sm shadow-emerald-500/20'
                      : 'border-zinc-800 bg-[#121217] text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] tabular-nums ${
                      isActive ? 'text-emerald-400/80 font-bold' : 'text-zinc-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search across ${
                  selectedCategory === 'All' ? '191' : filteredTemplates.length
                } templates (e.g. Hormozi, Scribble, Neon, Hindi)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121217] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>₹0 Free for all 256 Presets</span>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <section className="space-y-6 pt-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono font-semibold">
              TEMPLATES
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {selectedCategory === 'All' ? 'Every template' : selectedCategory} · {filteredTemplates.length}
            </h2>
          </div>

          {/* Templates Cards Grid - 3 columns, exact AutoCap layout */}
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((tmpl) => {
                const words = (tmpl.sampleText || 'This is how').split(' ');
                return (
                  <article
                    key={tmpl.id}
                    onClick={() => handleUseTemplate(tmpl.id)}
                    className="flex flex-col rounded-2xl border border-zinc-800 bg-[#121217] p-4 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Visual Preview Box (140px) */}
                    <div className="relative mb-3">
                      <div
                        className="relative overflow-hidden rounded-xl border border-zinc-800/80 flex items-center justify-center p-4"
                        style={{
                          height: '140px',
                          background:
                            'linear-gradient(155deg, #191921 0%, #0c0c12 55%, #08080c 100%)',
                        }}
                      >
                        {/* Vignette Shadow */}
                        <span
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(to bottom, rgba(0,0,0,.26) 0%, transparent 34%, transparent 66%, rgba(0,0,0,.18) 100%)',
                          }}
                        ></span>

                        {/* Centered Caption Text Preview */}
                        <div
                          className="relative z-10 text-center select-none flex flex-wrap items-center justify-center gap-1.5 px-2"
                          style={{ fontFamily: tmpl.style.fontFamily }}
                        >
                          {words.map((word, wIdx) => {
                            const isHighlighted =
                              wIdx === 1 || (words.length === 1 && wIdx === 0);
                            return (
                              <span
                                key={wIdx}
                                className={`inline-block transition-all duration-200 ${
                                  tmpl.style.isCaps ? 'uppercase' : ''
                                } ${
                                  isHighlighted
                                    ? 'text-lg sm:text-xl font-black px-1.5 py-0.5 rounded'
                                    : 'text-sm sm:text-base font-bold text-zinc-300'
                                }`}
                                style={{
                                  color: isHighlighted
                                    ? tmpl.style.highlightColor
                                    : tmpl.style.textColor,
                                  backgroundColor: isHighlighted
                                    ? tmpl.style.highlightBg
                                    : 'transparent',
                                  textShadow: isHighlighted
                                    ? tmpl.style.textShadow
                                    : '0 2px 4px rgba(0,0,0,0.8)',
                                  transform: isHighlighted
                                    ? tmpl.style.activeTransform
                                    : 'none',
                                  border: isHighlighted ? tmpl.style.border : 'none',
                                }}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>

                        {/* Tag Pills (Build, Bold, Caps, Karaoke, etc.) */}
                        <span className="pointer-events-none absolute bottom-1.5 left-1.5 flex flex-wrap gap-1">
                          {tmpl.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white/90 backdrop-blur-sm border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>

                        {/* Hover Overlay Hint */}
                        <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold shadow-lg">
                            <Play className="w-3 h-3 fill-current" />
                            Open in Editor
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meta & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                          {tmpl.name}
                        </h3>
                        {tmpl.badge && (
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                              tmpl.badge === 'Trending'
                                ? 'bg-amber-500'
                                : tmpl.badge === 'New'
                                ? 'bg-sky-500'
                                : 'bg-slate-500'
                            }`}
                          >
                            {tmpl.badge}
                          </span>
                        )}
                        {tmpl.languageBadge && (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-px text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                            {tmpl.languageBadge}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-zinc-500 group-hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono">
                        Use <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#121217] border border-zinc-800 rounded-2xl p-8 space-y-3">
              <p className="text-zinc-400 text-sm">
                No templates found matching "{searchQuery}" in {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition"
              >
                Reset to All Templates (191)
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
