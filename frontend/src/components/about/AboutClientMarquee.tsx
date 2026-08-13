'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, TrendingUp, Cpu, Server, Database, ShieldCheck, Code, Globe } from 'lucide-react';

const industrySectors = [
  { name: 'EdTech & LMS', category: 'Learning Platforms', icon: <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
  { name: 'FinTech Core', category: 'Banking & ACH APIs', icon: <Server className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
  { name: 'MarTech Platforms', category: 'E-Commerce & Reviews', icon: <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
  { name: 'Enterprise SaaS', category: 'Multi-Tenant Systems', icon: <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
  { name: 'Data Engineering', category: 'PostgreSQL & Realtime', icon: <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
  { name: 'Cloud DevOps', category: 'AWS, GCP & Kubernetes', icon: <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> },
];

const techStackBadges = [
  'TypeScript', 'Next.js', 'React', 'Node.js', 'Python', 'Go', 
  'PostgreSQL', 'AWS Cloud', 'Docker', 'Kubernetes', 'Playwright', 'TailwindCSS'
];

export default function AboutClientMarquee() {
  return (
    <section className="py-16 md:py-24 border-y border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/70 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
              <Code className="w-3.5 h-3.5" /> Domain & Tech Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Solutions Across <span className="gradient-text">Core Sectors</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We build long-term technology partnerships grounded in architectural rigor, sub-100ms backend performance, and predictable software delivery.
            </p>
          </div>

          {/* Stat Callouts */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 rounded-xl border border-cyan-500/30 relative overflow-hidden group shadow-lg bg-white dark:bg-slate-900/80"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Satisfaction Score</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white gradient-text">
                96%
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Client retention and project satisfaction rating.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 rounded-xl border border-cyan-500/30 relative overflow-hidden group shadow-lg bg-white dark:bg-slate-900/80"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Architecture</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white gradient-text">
                99.99%
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                High-availability cloud uptime target.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Industry Sector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {industrySectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-panel p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 flex flex-col items-center justify-center text-center space-y-2 hover:border-cyan-500/40 transition-all shadow-md group"
            >
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {sector.icon}
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {sector.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                {sector.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Core Tech Stack Badges */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Core Modern Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {techStackBadges.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
