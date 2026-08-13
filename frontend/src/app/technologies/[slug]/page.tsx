import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Quote,
  ShieldCheck,
  Zap,
  Users,
  Code2,
  HelpCircle,
} from 'lucide-react';

import { getTechnologyDataBySlug, popularTechnologies } from '@/data/technologies';
import CaseStudyPdfForm from '@/components/CaseStudyPdfForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return popularTechnologies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnologyDataBySlug(slug);

  if (!tech) {
    return {
      title: 'Technology Not Found | OpnixLabs',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/technologies/${tech.slug}`;

  return {
    title: `${tech.heroTitle} | OpnixLabs`,
    description: tech.metaDescription,
    keywords: tech.keywords,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${tech.heroTitle} | OpnixLabs`,
      description: tech.metaDescription,
      url: pageUrl,
      siteName: 'OpnixLabs',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/hero.jpg`,
          width: 1200,
          height: 630,
          alt: tech.heroTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tech.heroTitle} | OpnixLabs`,
      description: tech.metaDescription,
      images: [`${siteUrl}/images/hero.jpg`],
    },
  };
}

export default async function TechnologyPage({ params }: PageProps) {
  const { slug } = await params;
  const tech = getTechnologyDataBySlug(slug);

  if (!tech) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/technologies/${tech.slug}`;

  // JSON-LD Structured Data (Article + FAQPage + Breadcrumb)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}/#article`,
        headline: tech.heroTitle,
        description: tech.metaDescription,
        publisher: {
          '@type': 'Organization',
          name: 'OpnixLabs',
          url: siteUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: tech.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Technologies',
            item: `${siteUrl}/technologies`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tech.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-cyan-500 selection:text-slate-950">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO BANNER SECTION (FORCED DARK BACKGROUND & HIGH CONTRAST) */}
      <header className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden border-b border-slate-800 bg-[#070b19] !text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt={`${tech.name} Developers`}
            fill
            priority
            className="object-cover object-center brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/80 to-[#070b19]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-extrabold uppercase tracking-wider border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" /> HIRE SENIOR DEVELOPERS
              </span>

              <h1
                style={{ color: '#ffffff' }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white leading-[1.15] drop-shadow-md"
              >
                {tech.heroTitle}
              </h1>

              <p
                style={{ color: '#ffffff' }}
                className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed opacity-95"
              >
                {tech.heroSubtitle}
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 pt-2">
                {tech.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Lead Capture Form */}
            <div className="lg:col-span-5">
              <CaseStudyPdfForm
                title={`Schedule a Call to Hire ${tech.name} Engineers`}
                subtitle="Discuss your tech stack requirements with our senior software architects."
                caseStudyTitle={tech.name}
                variant="dark"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. STATS & VETTING HIGHLIGHTS */}
      <section className="py-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {tech.statBoxes.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW & TESTIMONIAL QUOTE */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {tech.overviewTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {tech.overviewText}
            </p>
          </div>

          {/* Testimonial Quote Banner */}
          <div className="glass-panel p-8 sm:p-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Quote className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-sm sm:text-base italic text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                &ldquo;{tech.testimonialQuote.quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                — {tech.testimonialQuote.author}, <span className="text-slate-500">{tech.testimonialQuote.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAPABILITIES GRID */}
      <section className="py-10 sm:py-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              EXPERT CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {tech.name} Engineering Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tech.capabilities.map((cap, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 space-y-3 shadow-md hover:border-cyan-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR FRAMEWORKS & TOOLS ECOSYSTEM */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Associated {tech.name} Stack & Ecosystem
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tech.popularFrameworks.map((fw, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED CASE STUDY LINK BANNER */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                PROVEN ENTERPRISE TRACK RECORD
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                See how we engineered solutions using {tech.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                Explore real case studies showing how OpnixLabs senior software developers scale enterprise platforms and user retention.
              </p>
            </div>

            <Link
              href={`/case-studies/${tech.featuredCaseStudySlug || 'blackboard'}`}
              className="px-6 py-3.5 rounded-lg bg-slate-900 dark:bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md shrink-0 flex items-center gap-2 transition-all"
            >
              Read Detailed Case Study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {tech.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-500 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SCHEDULE A CALL CTA BANNER */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Ready to hire senior {tech.name} developers?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Schedule a technical consultation with OpnixLabs software architects to assemble your dedicated developer team today.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-cyan-500/25 antialiased"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
