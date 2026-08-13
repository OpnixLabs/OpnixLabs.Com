'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  Wifi, 
  Users2, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

const cultureValues = [
  {
    title: 'Customer-Centered',
    subtitle: 'Allying directly with client business goals',
    icon: <HeartHandshake className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderColor: 'hover:border-amber-500/50',
  },
  {
    title: 'Remote-First Freedom',
    subtitle: 'Top 1% global talent working without borders',
    icon: <Wifi className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    gradient: 'from-cyan-500/10 via-sky-500/5 to-transparent',
    borderColor: 'hover:border-cyan-500/50',
  },
  {
    title: 'Teamwork & Ownership',
    subtitle: 'Transparent communication & direct SLAs',
    icon: <Users2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'hover:border-emerald-500/50',
  },
  {
    title: 'Engineering Precision',
    subtitle: 'Sub-100ms API performance & 99.99% uptime',
    icon: <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderColor: 'hover:border-purple-500/50',
  },
];

export default function AboutCultureBadges() {
  return (
    <section className="py-16 md:py-28 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> The OpnixLabs Way
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Remote-First Freedom, Real Connection, and <span className="gradient-text">Uncompromising Standards</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Our culture empowers senior engineers to take full responsibility for quality, performance, and long-term client success.
          </p>
        </div>

        {/* Culture Floating Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureValues.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`glass-panel bg-white dark:bg-slate-900/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 ${v.borderColor} transition-all shadow-xl relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md">
                  {v.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {v.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action (CTA) Banner - Explicit Dark Container with High Contrast */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 p-8 sm:p-14 rounded-3xl border border-cyan-500/40 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Ready to Build?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Partner with OpnixLabs Senior Technical Architects
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Discuss your custom software engineering requirements, cloud infrastructure, or API optimization goals with our core team.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] group"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
