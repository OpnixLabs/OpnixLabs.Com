import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

import { getCaseStudies } from '@/lib/api';

export const revalidate = 60; // ISR Revalidation every 60 seconds

export const metadata: Metadata = {
  title: 'Our Work | Client Case Studies & Software Engineering Portfolio',
  description:
    'Explore featured OpnixLabs client case studies in FinTech, EdTech, cloud microservices, and digital transformation. Read detailed case studies for Blackboard, ConsumerAffairs, Azlo, and more.',
  keywords: [
    'OpnixLabs Work',
    'OpnixLabs Portfolio',
    'Blackboard Case Study',
    'ConsumerAffairs Case Study',
    'Software Engineering Portfolio',
  ],
  alternates: {
    canonical: 'https://opnixlabs.com/portfolio',
  },
};

export default async function WorkPortfolioPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Work Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Portfolio & Case Studies</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Featured Engineering <span className="gradient-text">Work & Case Studies</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Discover how OpnixLabs engineers enterprise web platforms, cloud microservices, and high-performance software for industry leaders worldwide.
        </p>
      </div>

      {/* Grid of Work Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((work) => (
          <div
            key={work.slug}
            className="glass-panel rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Cover Image & Category Pill */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src={work.heroImage || '/images/hero.jpg'}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-blue-400 text-[11px] font-bold border border-blue-500/30 backdrop-blur-sm">
                  {work.category}
                </div>
              </div>

              {/* Work Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {work.clientName}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 shrink-0">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {work.engagementLengthValue} {work.engagementLengthUnit}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {work.summaryText}
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {work.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Check Case Study Action Button */}
            <div className="px-6 pb-6 pt-2">
              <Link
                href={`/case-studies/${work.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-blue-500/20 transition-all"
              >
                <span>Check Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation CTA */}
      <div className="glass-panel p-8 sm:p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Looking for a custom software solution for your enterprise?
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Contact OpnixLabs cloud architects to discuss your technical requirements and team augmentation goals.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            Get Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
