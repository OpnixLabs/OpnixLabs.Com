'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb" 
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <li>
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="font-semibold text-slate-900 dark:text-white">
              About Us
            </li>
          </ol>
        </motion.nav>

        {/* Hero Content Header */}
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-4 h-4" /> About OpnixLabs
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
          >
            For over a decade, we’ve partnered with technology leaders to rapidly scale systems and meet business challenges.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="text-2xl sm:text-4xl font-extrabold gradient-text tracking-tight">
              We think we’re pretty good at it.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2 max-w-3xl"
          >
            From high-throughput SaaS backends to mission-critical cloud deployments, OpnixLabs unites top-tier software architects, cloud engineers, and product designers to deliver sub-100ms API speeds and 99.99% uptime guarantees.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
