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
  Code2,
  ShieldCheck,
  Zap,
  Users,
  Layers,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';

import { getServiceDataBySlug } from '@/data/servicesData';
import { servicesData } from '@/data/services';
import CaseStudyPdfForm from '@/components/CaseStudyPdfForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allSlugs = [
    ...servicesData.topServices.map((s) => s.href.replace('/services/', '')),
    ...servicesData.enterpriseFocused.map((s) => s.href.replace('/services/', '')),
  ];
  const unique = Array.from(new Set(allSlugs));
  return unique.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDataBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found | OpnixLabs' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: `${service.heroTitle} | OpnixLabs`,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: pageUrl },
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
      title: `${service.heroTitle} | OpnixLabs`,
      description: service.metaDescription,
      url: pageUrl,
      siteName: 'OpnixLabs',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/hero.jpg`,
          width: 1200,
          height: 630,
          alt: service.heroTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.heroTitle} | OpnixLabs`,
      description: service.metaDescription,
      images: [`${siteUrl}/images/hero.jpg`],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceDataBySlug(slug);

  if (!service) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';
  const pageUrl = `${siteUrl}/services/${service.slug}`;

  // JSON-LD Structured Data for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}/#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'OpnixLabs',
          url: siteUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
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
            name: 'Services',
            item: `${siteUrl}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-blue-500 selection:text-slate-950">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO BANNER SECTION (FORCED DARK BACKGROUND & PERMANENT PURE WHITE TEXT) */}
      <header className="relative min-h-[520px] md:min-h-[620px] flex items-center overflow-hidden border-b border-slate-800 bg-[#070b19] !text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt={service.title}
            fill
            priority
            className="object-cover object-center brightness-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/80 to-[#070b19]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 pb-4">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-400 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-blue-400">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-wider border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5" /> ENTERPRISE SOFTWARE SERVICES
              </span>

              <h1
                style={{ color: '#ffffff' }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-white leading-[1.15] drop-shadow-md"
              >
                {service.heroTitle}
              </h1>

              <p
                style={{ color: '#ffffff' }}
                className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed opacity-95"
              >
                {service.heroSubtitle}
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 pt-2">
                {service.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>Clutch 4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Sub-24h Team Assembly</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>SOC2 & ISO Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Lead Capture Form */}
            <div className="lg:col-span-5">
              <CaseStudyPdfForm
                title={`Schedule a Call for ${service.title}`}
                subtitle="Discuss your custom project requirements with senior software architects."
                caseStudyTitle={service.title}
                variant="dark"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 2. STICKY SUB-HEADER ANCHOR NAV */}
      <nav className="sticky top-16 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-6">
            <a href="#overview" className="hover:text-blue-500 transition-colors">
              Overview
            </a>
            <a href="#capabilities" className="hover:text-blue-500 transition-colors">
              Capabilities
            </a>
            <a href="#case-studies" className="hover:text-blue-500 transition-colors">
              Case Studies
            </a>
            <a href="#tech-stack" className="hover:text-blue-500 transition-colors">
              Tech Stack
            </a>
            <a href="#engagement-models" className="hover:text-blue-500 transition-colors">
              Engagement Models
            </a>
            <a href="#faqs" className="hover:text-blue-500 transition-colors">
              FAQs
            </a>
          </div>
          <a
            href="#schedule"
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold transition-all shadow-sm"
          >
            Schedule a Call
          </a>
        </div>
      </nav>

      {/* 3. OVERVIEW & VALUE PROPOSITION */}
      <section id="overview" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                WHY HIRE OPNIXLABS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {service.overviewTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.overviewSubtitle}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {service.keyBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Banner */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Quote className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-sm sm:text-base italic text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                &ldquo;{service.testimonial.quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                — {service.testimonial.author}, <span className="text-slate-500">{service.testimonial.role} ({service.testimonial.company})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CASE STUDIES (3 CARDS GRID) */}
      <section id="case-studies" className="py-10 sm:py-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured {service.title} Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.featuredCaseStudies.map((cs, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-lg flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    quality={85}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-500 text-slate-950 text-[10px] font-extrabold shadow-md">
                    {cs.metrics}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {cs.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cs.summary}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCOPE & SERVICE CAPABILITIES GRID */}
      <section id="capabilities" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              SERVICE SCOPE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Comprehensive {service.title} Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 space-y-3 shadow-md hover:border-cyan-500/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STAT HIGHLIGHTS BAR */}
      <section className="py-12 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {service.statBoxes.map((stat, idx) => (
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

      {/* 7. TECH STACK ECOSYSTEM */}
      <section id="tech-stack" className="py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Associated {service.title} Tech Stack
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ENGAGEMENT MODELS SECTION */}
      <section id="engagement-models" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              FLEXIBLE ENGAGEMENT MODELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              How You Can Hire OpnixLabs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Staff Augmentation</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Integrate pre-vetted senior developers directly into your existing agile engineering team in under 48 hours.
                </p>
                <div className="pt-2 space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Sub-48h candidate matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Timezone-aligned daily standups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Zero risk 14-day trial period</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Hire Developers
                </Link>
              </div>
            </div>

            {/* Model 2 */}
            <div className="glass-panel p-8 rounded-2xl border border-cyan-500/50 bg-white dark:bg-slate-950 space-y-4 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase">
                MOST POPULAR
              </div>
              <div className="space-y-3 pt-2">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dedicated Agile Squads</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  An autonomous end-to-end software squad (Engineers, Tech Lead, QA, PM) managing product deliverables.
                </p>
                <div className="pt-2 space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Dedicated Tech Lead & PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>End-to-end sprint ownership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Full architectural accountability</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Assemble Squad
                </Link>
              </div>
            </div>

            {/* Model 3 */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Software Outsourcing</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Turnkey custom software development from initial specifications and architecture to final cloud deployment.
                </p>
                <div className="pt-2 space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Fixed-price or time-and-materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Strict milestones & SLA guarantees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>Comprehensive documentation & handoff</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Request Project Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faqs" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Questions About Our {service.title}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-2 shadow-sm"
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

      {/* 10. SCHEDULE A CALL CTA BANNER */}
      <section id="schedule" className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Ready to scale your product with {service.title}?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Schedule a technical consultation with OpnixLabs software architects to assemble your custom developer team today.
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
