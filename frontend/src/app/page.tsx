import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Lock,
  Layers,
  CheckCircle2,
  ChevronRight,
  Quote,
  Headphones,
  Monitor,
  Layout,
} from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Custom Web & Software Development',
      desc: 'High-converting web applications, SaaS platforms, and enterprise software built for performance, security, and scalability.',
    },
    {
      icon: <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Cloud Architecture & DevOps',
      desc: 'Resilient cloud infrastructure, multi-region deployments, database optimization, and 24/7 automated monitoring.',
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'IT Strategy & Technical Consulting',
      desc: 'Expert guidance on enterprise technology roadmaps, system modernizations, software audits, and architecture design.',
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Cybersecurity & Compliance',
      desc: 'Comprehensive security assessments, data protection, identity management, and compliance auditing for enterprise systems.',
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Digital Transformation',
      desc: 'Modernizing legacy software into agile cloud-native platforms to accelerate operational efficiency and speed to market.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'API Engineering & Integrations',
      desc: 'Seamless integration of third-party platforms, custom RESTful and GraphQL APIs, and automated enterprise workflows.',
    },
  ];

  const caseStudies = [
    {
      image: '/images/project1.jpg',
      category: 'FinTech & Banking',
      title: 'Enterprise Wealth Analytics Platform',
      desc: 'Built a sub-second financial portal for institutional investors handling high-volume real-time transactions.',
    },
    {
      image: '/images/project2.jpg',
      category: 'Cloud Infrastructure',
      title: 'Global Multi-Cloud Data Gateway',
      desc: 'Architected zero-downtime cloud infrastructure for global enterprise logistics serving 50M+ daily requests.',
    },
  ];

  const stats = [
    { number: '15+', label: 'Global Clients Served' },
    { number: '100+', label: 'Projects Delivered' },
    { number: '99.99%', label: 'Uptime SLA' },
    { number: '5+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      quote:
        'OpnixLabs transformed our legacy software infrastructure into a high-performance web platform. Their technical execution and speed to market were exceptional.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer, Vertex Global',
      avatar: 'https://res.cloudinary.com/dlwkbgg0d/image/upload/v1786357449/photo-1507003211169-0a1dd7228f2d_dq5e75.jpg',
    },
    {
      quote:
        'The team delivered a flawless custom enterprise application ahead of schedule. Their focus on speed, security, and scalability is unmatched.',
      author: 'Elena Rostova',
      role: 'Head of Product, NovaSphere Inc.',
      avatar: 'https://res.cloudinary.com/dlwkbgg0d/image/upload/v1786357449/photo-1534528741775-53994a69daeb_dipyvq.jpg',
    },
  ];

  return (
    <div className="relative space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-6 md:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              We Build Digital{' '}
              <span className="gradient-text font-extrabold">Solutions</span><br />
              That Build Your Business
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-lg">
              Custom Web Applications | SaaS Platforms<br />
              Modern Websites | Seamless Experiences
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>Let&apos;s Build Together</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>

            {/* Our Expertise Row */}
            <div className="pt-6 space-y-3">
              <span className="block text-xs uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                Our Expertise
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-md glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col items-center text-center space-y-2 group">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Web Development</span>
                </div>

                <div className="p-3.5 rounded-md glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col items-center text-center space-y-2 group">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">SaaS Development</span>
                </div>

                <div className="p-3.5 rounded-md glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col items-center text-center space-y-2 group">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Layout className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">UI/UX Design</span>
                </div>

                <div className="p-3.5 rounded-md glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col items-center text-center space-y-2 group">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Performance & Security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900/40">
              <Image
                src="/images/hero.jpg"
                alt="OpnixLabs Digital Solutions & Software Engineering"
                width={750}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGO TICKER / PARTNERS */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold mb-6">
            Trusted By Leading Enterprises & Fast-Growing Tech Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-700 dark:text-slate-400 font-black text-lg sm:text-xl tracking-wider">
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">CANVA TECH</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">TRESORIT CLOUD</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">COUNT.IT</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">SMART SYS</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">CREATIVA IT</span>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            Our Enterprise Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Core Engineering & IT Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From modern web applications to complex cloud microservices, we build scalable software solutions designed for high-availability enterprise environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-7 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-900 border-y border-blue-500/30 py-16 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              Proven Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Empowering Enterprise Tech Systems
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Accelerating Business Growth Through Strategic Software Architecture
              </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-2"
              >
                <div className="text-3xl sm:text-5xl font-black text-blue-400">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Featured Engineering Case Studies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world software challenges solved through innovative architecture, clean code, and cloud automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, index) => (
            <div
              key={index}
              className="rounded-xl glass-panel overflow-hidden border border-slate-200 dark:border-slate-800 group hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/90 text-blue-400 text-xs font-bold uppercase border border-slate-700">
                    {cs.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {cs.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Trusted Partner Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-8 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between"
            >
              <blockquote className="text-slate-700 dark:text-slate-200 text-sm sm:text-base italic leading-relaxed">
                “{t.quote}”
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  width={44}
                  height={44}
                  className="rounded-full object-cover border border-blue-500/40"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.author}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white border border-blue-500/40 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Scale Your Enterprise Software?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a free technical consultation with our software architects to discuss your custom project requirements and cloud goals.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
