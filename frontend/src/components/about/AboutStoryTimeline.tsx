'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Layers,
  CheckCircle2,
  Globe2,
  Users
} from 'lucide-react';

interface Milestone {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  stats?: { label: string; value: string }[];
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

const milestones: Milestone[] = [
  {
    id: 'beginnings',
    badge: 'Our Foundations',
    title: 'Engineered for High Performance & Zero Technical Debt',
    subtitle: 'Remote-first senior engineering pods built for scale.',
    description: 
      'OpnixLabs was established with a clear mission: to help companies build, modernize, and scale complex web applications and cloud infrastructure with senior engineering precision.',
    highlights: [
      'Stateless microservice design & multi-region cloud infrastructure',
      'Senior technical architects & specialized full-stack engineers',
      'Continuous automated integration and instant deployment pipelines',
      'Proactive system monitoring and SLA reliability protection',
    ],
    imageSrc: '/images/about.jpg',
    imageAlt: 'OpnixLabs Engineering Pod',
  },
  {
    id: 'scaling',
    badge: 'Operational Track Record',
    title: 'Proven Delivery Across High-Concurrency Systems',
    subtitle: 'Partnering with startups, SaaS scale-ups, and enterprise organizations.',
    description: 
      'Our teams eliminate technical debt and refactor legacy monoliths into high-frequency microservice ecosystems. Whether scaling web application performance or optimizing cloud infrastructure, we deliver predictable engineering outcomes.',
    stats: [
      { label: 'Projects Completed', value: '100+' },
      { label: 'Uptime SLA Target', value: '99.99%' },
      { label: 'API Latency Goal', value: '<100ms' },
      { label: 'Client Satisfaction', value: '96%' },
    ],
  },
];

const teamDisciplines = [
  {
    title: 'Full-Stack Technical Architects',
    icon: <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    desc: 'Designing scalable TypeScript, React, Next.js, Node.js, and Python backend systems built for rapid scaling.',
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    icon: <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    desc: 'Kubernetes orchestration, Terraform IAC, Multi-region AWS/GCP pipelines, and zero-downtime CI/CD.',
  },
  {
    title: 'QA Automation & Reliability Engineers',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    desc: 'Automated Playwright/Cypress testing, load simulation, and failover validation ensuring zero deployment regressions.',
  },
  {
    title: 'UI/UX & Systems Designers',
    icon: <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    desc: 'Intuitive design systems, glassmorphic interfaces, pixel-perfect responsiveness, and sub-second visual load times.',
  },
];

export default function AboutStoryTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll timeline progress strictly scoped to the milestones container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            <Globe2 className="w-3.5 h-3.5" /> Our Journey & Core Focus
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Precision <span className="gradient-text">At Scale</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Discover how OpnixLabs delivers reliable software solutions through strict architectural standards and dedicated engineering pods.
          </p>
        </div>

        {/* Timeline Milestones Section */}
        <div ref={timelineRef} className="relative mb-20 md:mb-28">
          {/* Timeline Track Line (Background) */}
          <div className="absolute left-4 lg:left-1/2 top-4 -bottom-[120px] w-1 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* Animated Scroll Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 lg:left-1/2 top-4 -bottom-[120px] w-1 bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 -translate-x-1/2 hidden sm:block shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />

          {/* Timeline Milestone Cards */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            
            {/* Milestone 1 */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pl-8 sm:pl-10 lg:pl-0">
              {/* Timeline Glowing Node 1 */}
              <div className="absolute left-4 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 mt-20 lg:mt-0 translate-x-0.5 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] bg-white dark:bg-slate-900">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute" />
                </div>
              </div>

              {/* Left Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6 sm:p-8 lg:p-10 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
                  {milestones[0].badge}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {milestones[0].title}
                </h3>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  {milestones[0].subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {milestones[0].description}
                </p>

                <div className="space-y-2.5 pt-2">
                  {milestones[0].highlights?.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Image/Visual Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-3 sm:p-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group"
              >
                <div className="relative h-56 sm:h-72 lg:h-80 w-full rounded-lg overflow-hidden">
                  <Image
                    src={milestones[0].imageSrc || '/images/about.jpg'}
                    alt={milestones[0].imageAlt || 'OpnixLabs Story'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={85}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xl transition-colors">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Engineering Standard</p>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-0.5 sm:mt-1">Zero Tech Debt & Sub-100ms API Architecture</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Milestone 2: Stats Grid & Narrative */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pl-8 sm:pl-10 lg:pl-0">
              {/* Timeline Glowing Node 2 */}
              <div className="absolute left-4 lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 mt-20 lg:mt-0 translate-x-0.5 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] bg-white dark:bg-slate-900">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
                </div>
              </div>

              {/* Left Stats Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1"
              >
                {milestones[1].stats?.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="glass-panel p-4 sm:p-5 lg:p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center hover:border-cyan-500/50 transition-colors shadow-md flex flex-col justify-center items-center overflow-hidden"
                  >
                    <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white gradient-text tracking-tight w-full truncate">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6 sm:p-8 lg:p-10 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl order-1 lg:order-2"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase">
                  {milestones[1].badge}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {milestones[1].title}
                </h3>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  {milestones[1].subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {milestones[1].description}
                </p>
              </motion.div>
            </div>

          </div>

          {/* Bottom Timeline End Node */}
          <div className="absolute left-4 lg:left-1/2 -bottom-10 -translate-x-1/2 translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 mt-10 translate-x-0.5 border-cyan-400 flex items-center justify-center shadow-[0_0_18px_rgba(6,182,212,0.8)] bg-white dark:bg-slate-900">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Specialized Engineering Pods Section */}
        <div className="pt-6 sm:pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
              <Users className="w-3.5 h-3.5" /> Specialized Talent
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              Every Project Backed by Senior Engineering Pods
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamDisciplines.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-panel p-6 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  {d.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {d.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
