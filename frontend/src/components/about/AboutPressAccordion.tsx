'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ChevronDown, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface BlueprintItem {
  id: string;
  category: string;
  headline: string;
  summary: string;
  tag: string;
  linkText: string;
  linkUrl: string;
}

const blueprints: BlueprintItem[] = [
  {
    id: 'architecture',
    category: 'Backend Architecture',
    headline: 'Sub-100ms API Standards & Microservice Decoupling',
    summary:
      'How OpnixLabs refactors monolithic backends into stateless microservices using PostgreSQL connection pooling, Redis caching layers, and high-performance Node.js/Go APIs.',
    tag: 'System Performance',
    linkText: 'Explore System Services',
    linkUrl: '/services',
  },
  {
    id: 'cloud-sla',
    category: 'Cloud Infrastructure',
    headline: 'Multi-Region Kubernetes & Zero-Downtime CI/CD Pipelines',
    summary:
      'Our operational framework for achieving 99.99% availability SLAs through automated multi-AZ failover, Terraform infrastructure-as-code, and rolling zero-downtime deployments.',
    tag: 'DevOps & Reliability',
    linkText: 'View Security SLA',
    linkUrl: '/security-sla',
  },
  {
    id: 'ai-refactoring',
    category: 'Code Quality & Security',
    headline: 'AI-Assisted Development with Senior Architect Oversight',
    summary:
      'Why AI code generators require senior developer verification to prevent memory leaks, security vulnerabilities, and unoptimized database queries in production.',
    tag: 'Engineering Practice',
    linkText: 'Read Technical Blog',
    linkUrl: '/blog',
  },
  {
    id: 'qa-automation',
    category: 'Quality Assurance',
    headline: 'Automated Playwright & Selenium Regression Testing',
    summary:
      'Building robust automated E2E and unit test suites that run on every git commit to ensure zero visual layout shifts and zero deployment regressions.',
    tag: 'QA Engineering',
    linkText: 'View Case Studies',
    linkUrl: '/case-studies',
  },
];

export default function AboutPressAccordion() {
  const [openId, setOpenId] = useState<string | null>('architecture');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
              <Newspaper className="w-3.5 h-3.5" /> Technical Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Blueprints & <span className="gradient-text">Best Practices</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore the technical methodologies, architectural patterns, and testing frameworks applied across all OpnixLabs engineering projects.
            </p>

            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-cyan-400 font-bold text-xs hover:bg-slate-800 transition-colors border border-slate-700/80 shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Technical Insights Blog</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {blueprints.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-panel rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md transition-colors bg-white dark:bg-slate-900/80"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-full p-6 text-left flex items-center justify-between gap-4 transition-colors ${
                      isOpen ? 'bg-cyan-500/5 dark:bg-cyan-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                        {item.category} • <span className="text-slate-500 dark:text-slate-400 font-medium">{item.tag}</span>
                      </span>
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                        {item.headline}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-lg border text-cyan-600 dark:text-cyan-400 transition-all duration-300 ${
                      isOpen 
                        ? 'rotate-180 bg-cyan-500/20 border-cyan-500/30' 
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/90">
                          <p className="leading-relaxed">{item.summary}</p>
                          <div>
                            <Link
                              href={item.linkUrl}
                              className="inline-flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              <span>{item.linkText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
