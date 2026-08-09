import React from 'react';
import Link from 'next/link';
import { Target, Users, ShieldCheck, ArrowRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      title: 'Precision Web Performance',
      desc: 'We optimize every client web app for sub-100ms API response times, zero visual layout shifts, and top Google Lighthouse SEO scores.',
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      title: 'Senior Engineering Team',
      desc: 'Our agency consists of experienced full-stack architects, Go backend engineers, and AI integration specialists.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: 'Enterprise Reliability',
      desc: 'Stateless Go microservices and managed serverless database infrastructure ensuring 99.99% uptime for client systems.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> About OpnixLabs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Empowering Businesses with <span className="gradient-text">Next-Gen Software</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          OpnixLabs is a software engineering agency specializing in custom web applications, Go microservice backends, and AI solutions.
        </p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-md space-y-4 max-w-3xl mx-auto border border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" /> Our Agency Mission
        </h2>
        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
          At OpnixLabs, we help startups, growing SaaS platforms, and enterprise businesses build fast, scalable, and intelligent software products. We bridge the gap between ultra-fast Go backend concurrency and dynamic Next.js user interfaces, integrating custom Gemini AI engines to transform passive applications into automated revenue drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {values.map((v, i) => (
          <div key={i} className="glass-panel p-6 rounded-md space-y-4 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {v.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{v.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-md border border-slate-800 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-white">Looking for a Trusted Web Engineering Partner?</h3>
        <p className="text-slate-400 text-xs sm:text-sm">
          Let&apos;s discuss your project goals, technical requirements, and custom web development needs.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Contact Engineering Team <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
