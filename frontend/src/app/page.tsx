import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Zap,
  Bot,
  Database,
  Shield,
  Layers,
  CheckCircle2,
  Globe,
  Rocket,
  Users,
  MessageSquareQuote,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Status Badge - Pill shaped */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Premier Web Development & Custom AI Engineering Agency</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight mb-6">
          Crafting <span className="gradient-text">High-Performance</span> Web Applications & AI Solutions
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          OpnixLabs delivers end-to-end web engineering, resilient Go microservice backends, and custom Gemini AI integrations to help startups and enterprises launch faster and scale effortlessly.
        </p>

        {/* Action Buttons - Max 6px rounded */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-md glass-panel glass-panel-hover text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            Our Services
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-6 py-3 rounded-md glass-panel glass-panel-hover text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            View Portfolio
          </Link>
        </div>

        {/* Core Capabilities Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">
            Core Web Engineering & AI Solutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" /> Full-Stack Next.js Apps
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Go Microservice Backends
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" /> Generative AI & Automation
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" /> Cloud Databases & DevOps
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - 6px rounded cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What We Build For Our Clients</h2>
          <p className="text-slate-400 text-sm">
            We partner with businesses to design, engineer, and deploy high-converting digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-md glass-panel-hover space-y-4 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Custom Web Applications</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Ultra-fast, responsive web portals and SaaS platforms engineered with Next.js 14, React, and TypeScript for maximum engagement and sub-second page loads.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-md glass-panel-hover space-y-4 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">High-Throughput Go APIs</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Resilient microservices and backend systems in Go handling concurrent workloads, background job queues, and sub-millisecond query responses.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-md glass-panel-hover space-y-4 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Generative AI & Workflows</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Integrating Gemini AI models into business applications for autonomous content generation, intelligent search, and automated customer workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Development Process / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-md p-6 sm:p-10 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Why OpnixLabs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Engineering Excellence That Drives Measurable Growth
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                We don’t just write code — we architect digital products designed for speed, security, and long-term scalability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>100% Type-Safe Architecture</strong> (TypeScript, Drizzle ORM, Go)</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Sub-Second Loading Speeds</strong> for maximum SEO & user retention</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Autonomous AI Capabilities</strong> built directly into your web app</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Agile Delivery</strong> with continuous deployment and client transparency</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Schedule Technical Consultation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Development Methodology Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-md bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Globe className="w-4 h-4" /> 1. Architecture & Discovery
                </div>
                <p className="text-xs text-slate-300">
                  We analyze your business requirements, define technical schemas, and design responsive UI mockups.
                </p>
              </div>

              <div className="p-4 rounded-md bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Rocket className="w-4 h-4" /> 2. Full-Stack Development
                </div>
                <p className="text-xs text-slate-300">
                  Engineering fast Next.js frontends and concurrent Go microservice APIs with continuous testing.
                </p>
              </div>

              <div className="p-4 rounded-md bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Bot className="w-4 h-4" /> 3. AI & Automation Integration
                </div>
                <p className="text-xs text-slate-300">
                  Incorporating Gemini AI features, background cron automation, and intelligent data pipelines.
                </p>
              </div>

              <div className="p-4 rounded-md bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Shield className="w-4 h-4" /> 4. Launch & Continuous Support
                </div>
                <p className="text-xs text-slate-300">
                  Serverless cloud deployment on Neon Postgres, edge CDN setup, and ongoing performance monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-md text-center border border-slate-800 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Build Your Next Web Project with <span className="gradient-text">OpnixLabs</span>?
          </h2>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto">
            Whether you need a brand new SaaS web application, a microservice backend overhaul, or custom AI integration, our engineering team is ready to deliver.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors"
            >
              Get a Free Project Estimate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
