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
  Users,
  Award,
  Clock,
  ChevronRight,
  Quote,
  Headphones,
} from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: 'Custom Web & Software Development',
      desc: 'High-converting web applications, SaaS platforms, and enterprise software built for performance, security, and scalability.',
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: 'Cloud Architecture & DevOps',
      desc: 'Resilient cloud infrastructure, multi-region deployments, database optimization, and 24/7 automated monitoring.',
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'IT Strategy & Technical Consulting',
      desc: 'Expert guidance on enterprise technology roadmaps, system modernizations, software audits, and architecture design.',
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: 'Cybersecurity & Compliance',
      desc: 'Comprehensive security assessments, data protection, identity management, and compliance auditing for enterprise systems.',
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Digital Transformation',
      desc: 'Modernizing legacy software into agile cloud-native platforms to accelerate operational efficiency and speed to market.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'API Engineering & Integrations',
      desc: 'Seamless integration of third-party platforms, custom RESTful and GraphQL APIs, and automated enterprise workflows.',
    },
  ];

  const caseStudies = [
    {
      image: '/images/project1.png',
      category: 'FinTech & Banking',
      title: 'Enterprise Wealth Analytics Platform',
      desc: 'Built a sub-second financial portal for institutional investors handling high-volume real-time transactions.',
    },
    {
      image: '/images/project2.png',
      category: 'Cloud Infrastructure',
      title: 'Global Multi-Cloud Data Gateway',
      desc: 'Architected zero-downtime cloud infrastructure for global enterprise logistics serving 50M+ daily requests.',
    },
  ];

  const stats = [
    { number: '150+', label: 'Global Clients Served' },
    { number: '2,500+', label: 'Projects Delivered' },
    { number: '99.99%', label: 'Uptime SLA' },
    { number: '10+', label: 'Years Experience' },
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
      <section className="relative pt-8 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span>Premier IT Solutions & Digital Software Agency</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Innovating <span className="gradient-text">Digital Experience</span> & Enterprise Software
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Empowering global enterprises, fintech platforms, and scaling startups with custom software development, resilient cloud architecture, and high-conversion web applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                Schedule Technical Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Explore All Services
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">99.99%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Uptime Guarantee</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">150+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Clients</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">24/7</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Managed Support</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="OpnixLabs IT Agency Engineering Team"
                width={700}
                height={600}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-md glass-panel border border-slate-700/80 text-white space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Trusted Software Engineers
                </div>
                <p className="text-xs text-slate-200">
                  Delivering high-availability cloud architecture and custom enterprise web portals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGO TICKER / PARTNERS */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Trusted By Leading Enterprises & Fast-Growing Tech Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 dark:text-slate-500 font-black text-lg sm:text-xl tracking-wider">
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">CANVA TECH</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">TRESORIT CLOUD</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">COUNT.IT</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">SMART SYS</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">CREATIVA IT</span>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID (Techmos Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Our Enterprise Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            High-Impact Software & IT Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            We provide end-to-end IT solutions designed to optimize operational efficiency and maximize digital growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="glass-panel p-7 rounded-md glass-panel-hover border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                >
                  Explore Solution <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US SPOTLIGHT & OVERLAPPING IMAGE (Techmos Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-md border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Overlapping Image Container */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <Image
                  src="/images/about.png"
                  alt="OpnixLabs IT Enterprise Team"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Experience Badge - Circular */}
              <div className="absolute -bottom-6 -right-4 w-28 h-28 rounded-full bg-slate-900 border-4 border-cyan-500 shadow-2xl flex flex-col items-center justify-center text-center text-white p-2">
                <span className="text-xl font-black text-cyan-400">10+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 leading-tight">Years Of Excellence</span>
              </div>
            </div>

            {/* About Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Why Work With Us
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Accelerating Business Growth Through Strategic Software Architecture
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                OpnixLabs is a full-service IT solutions agency. We partner with growth-minded leaders to engineer resilient software systems, high-converting digital platforms, and enterprise cloud solutions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Enterprise Scalability</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Engineered to handle high traffic and critical business workloads seamlessly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">24/7 Managed Operations</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Continuous system health monitoring and dedicated technical support.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Security & Compliance</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Strict adherence to data privacy standards and industry security posture.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rapid Time-to-Market</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Agile sprint cycles ensuring fast deployment without compromising code quality.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Learn More About Our Company
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT COUNTERS BAR */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-black text-cyan-400">{st.number}</div>
                <div className="text-xs sm:text-sm text-slate-400 font-semibold">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES / PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              Selected Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Enterprise Case Studies
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((c, i) => (
            <div
              key={i}
              className="glass-panel rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 space-y-4 group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 text-cyan-400 text-xs font-bold border border-cyan-500/30">
                  {c.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {c.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{c.desc}</p>
                <div className="pt-2">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    View Project Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-panel p-8 rounded-md border border-slate-200 dark:border-slate-800 space-y-6 relative"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6" />
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.author}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRE-FOOTER HIGH-IMPACT CALLOUT (Techmos Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-md border border-slate-200 dark:border-slate-800 text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Headphones className="w-4 h-4 text-cyan-400" />
            <span>Schedule A Free Project Estimate</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black max-w-3xl mx-auto leading-tight">
            Ready to Accelerate Your <span className="gradient-text">Digital Transformation</span>?
          </h2>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Let’s discuss your software engineering, web development, or enterprise cloud requirements with our technical team.
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Contact Engineering Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
