import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Globe, Database, Layers, Lock, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IT Services & Custom Software Engineering',
  description:
    'Explore OpnixLabs enterprise services: custom web application development, cloud infrastructure, enterprise APIs, cybersecurity, and digital transformation.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: 'Custom Web Applications',
      description: 'Engineering responsive SaaS platforms, web applications, and customer portals with modern frontend frameworks and sub-second page rendering speeds.',
      features: ['Modern React & Next.js UI Architecture', 'Sub-100ms Page Load Speeds', 'Type-Safe Codebases & Zero Layout Shift', 'SEO & Core Web Vitals Optimization'],
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: 'Enterprise Backend Infrastructure',
      description: 'Designing resilient microservices, high-throughput RESTful & GraphQL APIs, and concurrent background processing systems for scale.',
      features: ['Sub-Millisecond Query Latency', 'Automated Failover & Replication', 'Microservices Architecture', 'Concurrent Background Worker Queues'],
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'Cloud Systems & DevOps',
      description: 'Configuring multi-region cloud deployments, serverless container orchestration, infrastructure as code, and CI/CD pipelines.',
      features: ['Automated CI/CD Workflows', 'Containerization & Cloud Native Services', 'Infrastructure-as-Code Setup', '24/7 Server Health Telemetry'],
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: 'Cybersecurity & Compliance',
      description: 'Strengthening enterprise security postures with identity authentication, rate limiting, encryption at rest/transit, and vulnerability audits.',
      features: ['OAuth2 & JWT Authentication', 'Enterprise Encryption Standards', 'Security Vulnerability Audits', 'Strict Rate Limiting & Protection'],
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Digital Transformation',
      description: 'Legacy software modernization, converting slow monolithic enterprise tools into agile, cloud-hosted micro-frontends.',
      features: ['Legacy Codebase Refactoring', 'Monolith to Microservices', 'Zero-Downtime Data Migration', 'Agile Product Architecture'],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'System Integration & APIs',
      description: 'Connecting third-party platforms, ERPs, CRM systems, and custom internal tools for automated business operations.',
      features: ['Third-Party API Connectors', 'Custom Enterprise Webhooks', 'Automated Data Pipeline Sync', 'Reliable Error Recovery Handling'],
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Enterprise Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Our Software & <span className="gradient-text">IT Offerings</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          From zero-to-one startups to enterprise software overhauls, we deliver robust digital products designed for growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="glass-panel p-8 rounded-md glass-panel-hover border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{service.description}</p>

              <div className="pt-2 space-y-2 border-t border-slate-200 dark:border-slate-800/80">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
              >
                Request Service Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
