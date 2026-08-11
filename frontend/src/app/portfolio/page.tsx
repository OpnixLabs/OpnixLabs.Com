import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Case Studies & Software Engineering Portfolio',
  description:
    'Explore featured OpnixLabs client case studies in FinTech, multi-cloud data gateways, enterprise SaaS platforms, and digital transformation projects.',
};

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Enterprise Wealth Analytics Portal',
      category: 'FinTech & Banking',
      description: 'High-performance web dashboard engineered for institutional investors managing $2B+ in assets, handling real-time data streaming and multi-region failovers.',
      image: '/images/project1.png',
      tags: ['Next.js 14', 'TypeScript', 'FinTech', 'Real-Time Analytics'],
    },
    {
      title: 'Global Multi-Cloud Data Gateway',
      category: 'Cloud Systems',
      description: 'Resilient cloud infrastructure and microservices routing 50M+ daily API transactions across multi-cloud environments for global supply chains.',
      image: '/images/project2.png',
      tags: ['Cloud Infrastructure', 'Microservices', 'High-Availability', 'API Gateway'],
    },
    {
      title: 'Omnichannel Enterprise SaaS',
      category: 'Software Architecture',
      description: 'Custom SaaS platform providing automated inventory sync, customer analytics, and sub-100ms checkout workflows.',
      image: '/images/hero.png',
      tags: ['SaaS Platform', 'TypeScript', 'PostgreSQL', 'High Concurrency'],
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Client Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Our Featured <span className="gradient-text">Case Studies</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Explore how OpnixLabs delivers high-impact software products and cloud architectures for industry leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="glass-panel rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-cyan-400 text-xs font-bold border border-cyan-500/30">
                  {project.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
              >
                Inquire Similar Solution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
