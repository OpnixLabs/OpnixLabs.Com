'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Sparkles, Zap, CheckCircle, Lock } from 'lucide-react';

interface EngineeringStandard {
  title: string;
  category: string;
  metric: string;
  pillar: string;
  description: string;
  icon: React.ReactNode;
}

const standards: EngineeringStandard[] = [
  {
    title: '99.99% High-Availability SLA',
    category: 'Cloud Reliability',
    metric: '99.99%',
    pillar: 'Stateless Architecture',
    description: 'Multi-region AWS/GCP Kubernetes deployment with automated failover routing and zero single points of failure.',
    icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: 'Sub-100ms API Latency Target',
    category: 'System Performance',
    metric: '< 100ms',
    pillar: 'API Optimization',
    description: 'PostgreSQL connection pooling, Redis caching layer, and optimized database indexing for rapid API queries.',
    icon: <Zap className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  },
  {
    title: 'Zero Regression Deployment Standard',
    category: 'Quality Assurance',
    metric: '100% Test Coverage',
    pillar: 'Playwright & Selenium',
    description: 'Automated CI/CD testing suites validating UI, API endpoints, and database migrations before production release.',
    icon: <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  },
  {
    title: 'Senior Developer Pod Guarantee',
    category: 'Talent Excellence',
    metric: 'Senior-Only',
    pillar: 'Specialized Expertise',
    description: 'Every client project is executed by veteran full-stack technical architects, DevOps leads, and UI product designers.',
    icon: <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
  },
];

export default function AboutAwards() {
  return (
    <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Engineering Commitments
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Service & <span className="gradient-text">Quality Standards</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Strict architectural benchmarks and operational commitments that guide every custom software engineering build at OpnixLabs.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {item.icon}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 text-[11px] font-extrabold border border-slate-200 dark:border-slate-700">
                    {item.metric}
                  </span>
                </div>

                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {item.pillar}
                </p>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                Pillar: {item.category}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
