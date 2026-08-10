import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Target, Users, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our IT Agency & Company Mission',
  description:
    'Learn about OpnixLabs: senior technical architects and software engineers delivering high-performance web applications, cloud systems, and 99.99% uptime guarantees.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      title: 'Precision Software Engineering',
      desc: 'We optimize every client digital application for sub-100ms API response times, zero visual layout shifts, and top Lighthouse performance scores.',
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: 'Senior Technical Architects',
      desc: 'Our team consists of veteran full-stack architects, cloud systems engineers, and UI/UX product specialists with enterprise expertise.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: '99.99% Reliability Guarantee',
      desc: 'Stateless backend microservice architectures and managed cloud database infrastructure ensuring high uptime SLAs for client applications.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> About OpnixLabs
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Empowering Enterprises with <span className="gradient-text">Next-Gen Software</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          OpnixLabs is a premier software engineering and IT solutions agency dedicated to designing, building, and scaling modern digital products.
        </p>
      </div>

      {/* Hero Grid */}
      <div className="glass-panel p-8 sm:p-12 rounded-md border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <Image
                src="/images/about.png"
                alt="OpnixLabs Engineering Team"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Our Company Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              At OpnixLabs, we partner with startups, growth SaaS companies, and enterprise organizations to build ultra-fast, secure, and intuitive web applications. We eliminate technical debt and deliver modern cloud architectures designed to scale effortlessly as your business grows.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                <span>End-to-End Product Architecture & UI Design</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                <span>High-Availability Microservices & Enterprise APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                <span>24/7 Managed System Support & SLA Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <div key={i} className="glass-panel p-8 rounded-md space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Callout */}
      <div className="glass-panel p-10 rounded-md border border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto space-y-5">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Partner with OpnixLabs Engineers</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Discuss your custom software project requirements, system architecture, or digital transformation goals with our technical team.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Contact Engineering Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
