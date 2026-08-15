import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import { getCaseStudyBySlug } from '@/lib/api';
import { getAllCaseStudySlugs } from '@/data/caseStudies';
import CaseStudyPdfForm from '@/components/CaseStudyPdfForm';

export const revalidate = 60; // ISR Revalidation every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | OpnixLabs',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/case-studies/${caseStudy.slug}`;

  return {
    title: `${caseStudy.clientName} Case Study - OpnixLabs`,
    description: caseStudy.metaDescription,
    keywords: caseStudy.keywords,
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
      title: `${caseStudy.clientName} Case Study | OpnixLabs`,
      description: caseStudy.metaDescription,
      url: pageUrl,
      siteName: 'OpnixLabs',
      type: 'article',
      images: [
        {
          url: caseStudy.heroImage ? `${siteUrl}${caseStudy.heroImage}` : `${siteUrl}/images/hero.jpg`,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.clientName} Case Study | OpnixLabs`,
      description: caseStudy.metaDescription,
      images: [caseStudy.heroImage ? `${siteUrl}${caseStudy.heroImage}` : `${siteUrl}/images/hero.jpg`],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/case-studies/${caseStudy.slug}`;

  // JSON-LD Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}/#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': pageUrl,
          url: pageUrl,
          name: `${caseStudy.clientName} Case Study | OpnixLabs`,
        },
        headline: caseStudy.heroTitle,
        description: caseStudy.metaDescription,
        image: caseStudy.heroImage ? `${siteUrl}${caseStudy.heroImage}` : `${siteUrl}/images/hero.jpg`,
        publisher: {
          '@type': 'Organization',
          name: 'OpnixLabs',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.webp`,
          },
        },
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
            name: 'Work',
            item: `${siteUrl}/portfolio`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: caseStudy.clientName,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-slate-950 font-sans transition-colors">
      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO BANNER SECTION (PERMANENT WHITE TEXT FOR TOP HEADER) */}
      <header className="relative min-h-[500px] md:min-h-[580px] flex items-center overflow-hidden border-b border-slate-800 bg-[#070b19] !text-white">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={caseStudy.heroImage || '/images/hero.jpg'}
            alt={`${caseStudy.clientName} Hero`}
            fill
            priority
            className="object-cover object-center brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/80 to-[#070b19]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 space-y-8">
          {/* Eyebrow Breadcrumb Tag */}
          <div className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
            {caseStudy.heroCategoryText}
          </div>

          {/* Headline (Permanently forced white via inline style & !text-white) */}
          <h1
            style={{ color: '#ffffff' }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white max-w-4xl leading-[1.15] drop-shadow-lg"
          >
            {caseStudy.heroTitle}
          </h1>

          {/* Embedded Floating PDF Lead Magnet Card */}
          <div className="max-w-md pt-2">
            <CaseStudyPdfForm
              title="Get this case study in PDF to your inbox."
              subtitle=""
              caseStudyTitle={caseStudy.clientName}
              variant="dark"
            />
          </div>
        </div>
      </header>

      {/* 2. THE SUMMARY SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Summary Text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {caseStudy.summaryTitle}
                <span className="text-blue-500 dark:text-blue-400">.</span>
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-xl font-normal leading-relaxed">
                {caseStudy.summaryText}
              </p>
            </div>

            {/* Right Brand Name Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md glass-panel p-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-center flex items-center justify-center min-h-[160px] shadow-xl">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
                  {caseStudy.clientBrandName}
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Length Metric Circle */}
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="w-36 h-36 rounded-full border-2 border-dashed border-blue-500 dark:border-blue-400/60 p-2 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-lg">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono leading-none">
                {caseStudy.engagementLengthValue}
              </span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-1">
                {caseStudy.engagementLengthUnit}
              </span>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-3">
              {caseStudy.engagementLengthLabel}
            </span>
          </div>

          {/* Tech & Engagement Type Tags Bar */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-6 text-xs text-slate-700 dark:text-slate-300 shadow-md">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Front-end technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {caseStudy.frontEndTechTags.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Engagement type
              </span>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-500/30">
                {caseStudy.engagementType}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONAL QUOTE BANNER (e.g. ConsumerAffairs) */}
      {(caseStudy.quoteBanner || caseStudy.quoteText) && (
        <section className="py-12 bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <Quote className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <p className="text-sm sm:text-base italic text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  &ldquo;{caseStudy.quoteBanner?.quote || caseStudy.quoteText}&rdquo;
                </p>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  — {caseStudy.quoteBanner?.author || caseStudy.quoteAuthor}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ABOUT CLIENT BANNER CARD */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-md">
            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {caseStudy.aboutClientHeading}
              </h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                {caseStudy.aboutClientText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CHALLENGE SECTION WITH CONNECTING PIPE */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Connecting SVG Pipe Graphic */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-1 bg-blue-500/30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Challenge Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {caseStudy.challengeTitle}
                <span className="text-blue-500 dark:text-blue-400">.</span>
              </h2>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {caseStudy.challengeParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right Callout Quote */}
            <div className="lg:col-span-5 flex items-center h-full">
              <blockquote className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-2 italic">
                &ldquo;{caseStudy.challengeCalloutQuote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE SOLUTION SECTION (PERMANENTLY WHITE TEXT & BADGES FOR ALL THEMES) */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 !text-white relative shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2
              style={{ color: '#ffffff' }}
              className="text-4xl sm:text-6xl font-black tracking-tight !text-white drop-shadow-md"
            >
              {caseStudy.solutionTitle}
            </h2>
            <p
              style={{ color: '#ffffff' }}
              className="text-lg sm:text-2xl font-semibold !text-white leading-relaxed opacity-95"
            >
              {caseStudy.solutionSubtitle}
            </p>
          </div>

          {/* S-Curve Connecting Line Divider */}
          <div className="flex justify-center my-8">
            <div className="w-48 h-1 bg-white/40 rounded-full" />
          </div>

          {/* All Technologies Used Subsection (Permanently forced white) */}
          <div className="text-center space-y-8">
            <h3
              style={{ color: '#ffffff' }}
              className="text-2xl sm:text-4xl font-extrabold !text-white drop-shadow-sm"
            >
              {caseStudy.technologiesTitle}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {caseStudy.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{ color: '#ffffff' }}
                  className="px-6 py-3 rounded-full border-2 border-white bg-white/10 !text-white font-extrabold text-sm sm:text-base hover:bg-white hover:!text-blue-900 transition-all duration-300 shadow-md backdrop-blur-sm cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE OUTCOME SECTION */}
      <section className="py-20 sm:py-28 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Featured Image */}
            <div className="lg:col-span-5 h-[360px] sm:h-[480px] relative rounded-xl overflow-hidden shadow-2xl border border-slate-300 dark:border-slate-800">
              <Image
                src={caseStudy.outcomeImage || '/images/project1.jpg'}
                alt={`${caseStudy.clientName} Outcome`}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Outcome Content & Inset PDF Form */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                  {caseStudy.outcomeTitle}
                  <span className="text-blue-500 dark:text-blue-400">.</span>
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-semibold">
                  {caseStudy.outcomeSubtitle}
                </p>
              </div>

              {/* Bullet Points - Robust Parsing for both string[] and object[] formats */}
              <ul className="space-y-4">
                {caseStudy.outcomeBullets.map((bullet, idx) => {
                  const bulletText = typeof bullet === 'string' ? bullet : (bullet as any)?.text || String(bullet || '');
                  return (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0" />
                      <span>{bulletText}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Inset PDF Lead Magnet Box */}
              <div className="pt-4">
                <CaseStudyPdfForm
                  title="Get this case study in PDF to your inbox."
                  subtitle=""
                  caseStudyTitle={caseStudy.clientName}
                  variant="adaptive"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREVIOUS / NEXT CASE STUDY NAVIGATION BAR */}
      <section className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {caseStudy.previousCaseStudy || caseStudy.previousSlug ? (
            <Link
              href={`/case-studies/${caseStudy.previousCaseStudy?.slug || caseStudy.previousSlug}`}
              className="flex items-center gap-4 group hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 group-hover:border-cyan-400 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-cyan-400 transition-colors shrink-0 shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Previous Case Study
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {caseStudy.previousCaseStudy?.text || caseStudy.previousText || 'Previous Case Study'}
                </span>
              </div>
            </Link>
          ) : <div />}

          {(caseStudy.nextCaseStudy || caseStudy.nextSlug) && (
            <Link
              href={`/case-studies/${caseStudy.nextCaseStudy?.slug || caseStudy.nextSlug}`}
              className="flex items-center gap-4 group hover:opacity-90 transition-opacity md:text-right"
            >
              <div className="order-2 md:order-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Next Case Study
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {caseStudy.nextCaseStudy?.text || caseStudy.nextText || 'Next Case Study'}
                </span>
              </div>
              <div className="order-1 md:order-2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 group-hover:border-cyan-400 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-cyan-400 transition-colors shrink-0 shadow-sm">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* 8. FACING SIMILAR CHALLENGES CTA BANNER */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Arch Image Container */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-full overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-2xl">
                <Image
                  src={caseStudy.outcomeImage || '/images/project2.jpg'}
                  alt="Schedule a Call CTA"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right CTA Text Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {caseStudy.ctaHeading}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
                  {caseStudy.ctaSubheading}
                </p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-cyan-500/25 antialiased"
                >
                  <span>{caseStudy.ctaButtonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
