'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Code2,
  Cpu,
  Cloud,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';
import { allAZTechnologies } from '@/data/technologies';

export default function TechnologiesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  // Filtered technologies based on search query and letter selection
  const filteredTechs = useMemo(() => {
    return allAZTechnologies.filter((tech) => {
      const matchesSearch =
        searchQuery === '' ||
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase());

      const firstChar = tech.name.charAt(0).toUpperCase();
      const matchesLetter =
        activeLetter === 'ALL' ||
        (activeLetter === '#' && !/[A-Z]/.test(firstChar)) ||
        firstChar === activeLetter;

      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, activeLetter]);

  // Group filtered technologies by initial letter (A-Z)
  const groupedTechs = useMemo(() => {
    const map: Record<string, typeof allAZTechnologies> = {};
    filteredTechs.forEach((tech) => {
      let letter = tech.name.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(letter)) {
        letter = '#';
      }
      if (!map[letter]) {
        map[letter] = [];
      }
      map[letter].push(tech);
    });
    // Return sorted keys
    return Object.keys(map)
      .sort()
      .map((letter) => ({ letter, items: map[letter] }));
  }, [filteredTechs]);

  // Extract all available letters from full dataset for A-Z bar
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    allAZTechnologies.forEach((t) => {
      const char = t.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(char)) set.add(char);
      else set.add('#');
    });
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return <Code2 className="w-4 h-4 text-cyan-500" />;
      case 'Backend':
        return <Cpu className="w-4 h-4 text-cyan-500" />;
      case 'Cloud & DevOps':
        return <Cloud className="w-4 h-4 text-cyan-500" />;
      case 'AI & Data':
        return <Database className="w-4 h-4 text-cyan-500" />;
      case 'Mobile':
        return <Smartphone className="w-4 h-4 text-cyan-500" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. HERO SEARCH SECTION matching BairesDev Screenshot 1 */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" /> EXPERTS IN 100+ TECHNOLOGIES
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            What&apos;s your stack? <br className="hidden sm:inline" />
            <span className="gradient-text">We cover them all.</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Search any language, framework, database, or cloud platform. OpnixLabs provides top 1% vetted developers for any tech stack.
          </p>

          {/* Real-Time Live Search Input Bar */}
          <div className="max-w-xl mx-auto relative pt-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any technology (e.g., React, Python, AWS, C#)..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium text-sm sm:text-base shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALPHABETICAL A-Z FILTER BAR */}
      <section className="sticky top-16 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
            {availableLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`px-3 py-1.5 rounded-md transition-all shrink-0 uppercase ${
                  activeLetter === letter
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GROUPED A-Z TECHNOLOGIES CARDS GRID matching BairesDev Screenshot 1 */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {groupedTechs.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              No technologies found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-slate-500 text-sm">
              Try searching another technology keyword or clear filters to view all stacks.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveLetter('ALL');
              }}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          groupedTechs.map(({ letter, items }) => (
            <div key={letter} className="space-y-6">
              {/* Letter Divider */}
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                  {letter}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  ({items.length} {items.length === 1 ? 'Technology' : 'Technologies'})
                </span>
              </div>

              {/* Cards Grid matching BairesDev Screenshot 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((tech, idx) => (
                  <Link
                    key={`${tech.slug}-${idx}`}
                    href={`/technologies/${tech.slug}`}
                    className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-cyan-500/50 hover:shadow-lg transition-all group flex flex-col justify-between h-28 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        {getCategoryIcon(tech.category)}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        {tech.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1">
                        {tech.name}
                      </h3>
                      <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:underline pt-0.5">
                        Hire Experts <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* 4. CLIENT TESTIMONIAL & ENTERPRISE SLA CTA */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                ENTERPRISE TALENT ON DEMAND
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                We&apos;ve assembled senior squads for 100+ tech stacks.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you need dedicated React front-end engineers, Go microservices developers, or certified AWS Cloud architects, OpnixLabs delivers vetted engineers in under 48 hours.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all"
                >
                  <span>Request Custom Tech Stack Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>BLACKBOARD & CONSUMERAFFAIRS CASE STUDY</span>
              </div>
              <p className="text-sm italic text-slate-200 leading-relaxed">
                &ldquo;OpnixLabs engineers integrated into our technology stack within 24 hours. Their technical depth across .NET, React, and Python accelerated our roadmap significantly.&rdquo;
              </p>
              <div className="text-xs font-bold text-slate-400">
                — VP of Software Engineering
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
