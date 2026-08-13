import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Globe,
  Database,
  Layers,
  Lock,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Cloud,
  Smartphone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'End-to-End Enterprise Services & Software Development | OpnixLabs',
  description:
    'Explore OpnixLabs end-to-end software solutions: Custom Web & Mobile Apps, QA Testing, Cloud & AI Engineering, and Enterprise Systems.',
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: 'Software Development & Design',
      description: 'End-to-end web, mobile, and custom application development designed for performance and scale.',
      items: [
        { name: 'Custom Web Development', desc: 'Sub-second SaaS portals, e-commerce, and enterprise web apps.', href: '/services/web-development' },
        { name: 'Mobile App Development', desc: 'Native iOS, Android, and cross-platform React Native apps.', href: '/services/mobile-app-development' },
        { name: 'Front-end Development', desc: 'Modern Next.js, React, Vue, and accessible component design systems.', href: '/services/frontend-development' },
        { name: 'Back-end Development', desc: 'High-throughput Go, Node.js, Python, and .NET microservices.', href: '/services/backend-development' },
        { name: 'UX/UI Design', desc: 'Conversion-focused user research, wireframing, and interactive UI prototypes.', href: '/services/ui-ux-design' },
        { name: 'SaaS Development', desc: 'Multi-tenant cloud SaaS products built with subscription billing.', href: '/services/saas-development' },
      ],
    },
    {
      title: 'QA, Testing, Maintenance & Modernization',
      description: 'Continuous testing pipelines, legacy software refactoring, and 24/7 maintenance.',
      items: [
        { name: 'Automated QA Testing', desc: 'End-to-end regression testing suites using Cypress and Playwright.', href: '/services/qa-testing' },
        { name: 'Manual Testing & Security', desc: 'Rigorous UX QA, accessibility checking, and security penetration testing.', href: '/services/qa-testing' },
        { name: 'Software Maintenance', desc: '24/7 telemetry monitoring, bug fixes, and continuous performance tuning.', href: '/services/software-maintenance' },
        { name: 'Digital Transformation', desc: 'Converting slow monolithic applications into agile cloud microservices.', href: '/services/digital-transformation' },
      ],
    },
    {
      title: 'Cloud, AI & Advanced Technologies',
      description: 'Accelerate innovation with cloud infrastructure, DevOps pipelines, and AI ML models.',
      items: [
        { name: 'Cloud Applications & DevOps', desc: 'AWS, Azure, and GCP multi-region serverless deployment pipelines.', href: '/services/cloud-applications' },
        { name: 'AI & Machine Learning', desc: 'Custom LLM fine-tuning, predictive modeling, and automated workflows.', href: '/services/ai-development' },
        { name: 'Data Engineering & Big Data', desc: 'ETL data pipelines, real-time analytics, and Snowflake/BigQuery integration.', href: '/services/data-engineering' },
        { name: 'Cybersecurity & Compliance', desc: 'OAuth2 identity management, zero-trust network access, and HIPAA compliance.', href: '/services/cybersecurity' },
      ],
    },
    {
      title: 'Enterprise Applications',
      description: 'Custom ERP systems, CRM integrations, and mission-critical business software.',
      items: [
        { name: 'CRM & ERP Customization', desc: 'Custom business logic, automated invoice processing, and workflows.', href: '/services/crm-systems' },
        { name: 'Salesforce Integration', desc: 'Connecting Salesforce REST APIs with internal support & tracker systems.', href: '/services/salesforce' },
        { name: 'Backup & Disaster Recovery', desc: 'Automated database backups, failover clusters, and high-availability SLAs.', href: '/services/backup-solutions' },
      ],
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header matching BairesDev Screenshot 3 */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5" /> END-TO-END TECH SOLUTIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tap into our end-to-end <span className="gradient-text">tech solutions.</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
          From rapid software staff augmentation to complete enterprise digital transformation, OpnixLabs engineers build software around your exact goals.
        </p>
      </div>

      {/* Categorized Services Sections Grid matching BairesDev Screenshot 3 */}
      <div className="space-y-16">
        {serviceCategories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-cyan-500">0{idx + 1}.</span> {cat.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-cyan-500/50 hover:shadow-md transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 inline-flex items-center gap-1 group-hover:underline">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box matching BairesDev Screenshot 3 */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold">You define the scope; we deliver the team.</h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          Scale your software development capabilities in under 48 hours with top 1% nearshore engineers.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-md"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
