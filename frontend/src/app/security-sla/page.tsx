import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Server, Lock, Cpu, Home, ChevronRight, CheckCircle2, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security SLA & Uptime Guarantee | OpnixLabs',
  description:
    'Discover OpnixLabs 99.99% Uptime SLA, sub-100ms API latency benchmarks, cybersecurity practices, and multi-region cloud failover infrastructure.',
};

export default function SecuritySLADataPage() {
  const lastUpdated = 'August 13, 2026';

  const slaSpecs = [
    {
      icon: <Server className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: '99.99% High-Availability SLA',
      value: '99.99% Uptime',
      desc: 'Stateless microservices deployed on multi-region AWS/GCP Kubernetes clusters with automated failover routing.',
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: 'Sub-100ms API Latency Target',
      value: '< 100ms',
      desc: 'Edge CDN caching, database connection pooling, and optimized query indexing ensuring sub-100ms API response speeds.',
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: '24/7 Proactive System Monitoring',
      value: '24/7/365 Ops',
      desc: 'Real-time telemetry, automated error alerting, synthetic transaction checks, and instant DevOps incident dispatch.',
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      title: 'Enterprise Security Compliance',
      value: 'AES-256 & TLS 1.3',
      desc: 'Zero-trust network isolation, vulnerability scanning, SOC 2 alignment, and Playwright automated security suites.',
    },
  ];

  return (
    <main className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <li>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </li>
          <li className="font-semibold text-slate-900 dark:text-white">Security SLA</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <Shield className="w-3.5 h-3.5" /> Service Level Agreement
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Security & Performance <span className="gradient-text">SLA</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {slaSpecs.map((spec, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors shadow-md bg-white dark:bg-slate-900/80"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                {spec.icon}
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold">
                {spec.value}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {spec.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {spec.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main SLA Content */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Section 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            1. Uptime SLA Commitment & Calculation
          </h2>
          <p>
            OpnixLabs guarantees a Monthly Uptime Percentage of at least <strong>99.99%</strong> for all client production systems hosted under our managed cloud operations agreements.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Uptime is calculated using the formula: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-cyan-600 dark:text-cyan-400 font-mono">Uptime % = ((Total Minutes - Downtime Minutes) / Total Minutes) * 100</code>.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              <span>Multi-AZ (Availability Zone) redundant load balancing</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              <span>Automated health checks every 30 seconds</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              <span>Zero-downtime rolling deployment pipelines</span>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2. Incident Response Times & Support Matrix
          </h2>
          <p>
            Our DevOps and reliability team monitors systems 24/7/365 with predefined incident severity classifications:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white">
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Severity Level</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Definition</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-800">Response Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-red-500">P1 - Critical</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800">Production system down or core API unaccessible</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold">&lt; 15 Minutes</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-amber-500">P2 - Major</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800">Significant feature degraded or performance SLA spike</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold">&lt; 1 Hour</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-cyan-500">P3 - Minor</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800">Non-critical bug or minor admin tool issue</td>
                  <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold">&lt; 4 Hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            3. Cybersecurity Controls & Data Protection
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Automated Penetration & SAST Testing:</strong> Automated static analysis and security scanning integrated into every CI/CD git push.</li>
            <li><strong>Encrypted Offsite Backups:</strong> Point-in-time automated database backups replicated across multi-region bucket storage with 30-day retention.</li>
            <li><strong>WAF & DDoS Shielding:</strong> Enterprise Web Application Firewall (WAF) protection filtering malicious traffic, rate-limiting, and SQL injection attempts.</li>
          </ul>
        </section>

        {/* Contact Security Banner */}
        <div className="p-8 rounded-xl border border-cyan-500/40 text-center space-y-4 bg-slate-900 text-white shadow-2xl">
          <h3 className="text-xl font-bold text-white">Security Team & Incident Escalation</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            To report a security vulnerability or escalate an urgent SLA incident:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-cyan-400 font-semibold pt-2">
            <a href="mailto:contact@opnixlabs.com" className="flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" /> contact@opnixlabs.com
            </a>
            <a href="tel:+918882659469" className="flex items-center gap-2 hover:underline">
              <Phone className="w-4 h-4" /> +91 88826-59469
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
