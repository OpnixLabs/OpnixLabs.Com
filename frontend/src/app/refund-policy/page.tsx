import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, AlertCircle, Clock, Home, ChevronRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | OpnixLabs',
  description:
    'Review OpnixLabs Refund Policy, milestone billing acceptance criteria, project cancellation terms, and SLA performance guarantees.',
};

export default function RefundPolicyPage() {
  const lastUpdated = 'August 13, 2026';

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
          <li className="font-semibold text-slate-900 dark:text-white">Refund Policy</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <RefreshCw className="w-3.5 h-3.5" /> Financial Transparency
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Refund & Cancellation <span className="gradient-text">Policy</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Intro Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-xl border border-cyan-500/30 space-y-3 bg-cyan-500/5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-500" />
            Milestone-Based Accountability & Quality Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            OpnixLabs operates under transparent, milestone-driven Statements of Work (SOWs). We structure billing around verified acceptance criteria, ensuring you only pay for code, architecture, and deployments that meet agreed specifications.
          </p>
        </div>

        {/* Section 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            1. Pre-Project Kickoff & Deposit Refunds
          </h2>
          <p>
            If a Client cancels an engagement prior to the official project kickoff date or initial sprint setup:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>100% Full Deposit Refund:</strong> Granted if cancellation is requested in writing within 5 business days of deposit payment and before developer pod allocation.</li>
            <li><strong>Partial Refund:</strong> If architectural discovery, environment provisioning, or initial design specs have commenced, the initial deposit is refunded minus incurred engineering hours billed at agreed rates.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2. Milestone & Sprint Payments
          </h2>
          <p>
            For custom software development delivered in phases or monthly retainer pods:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Completed & Approved Milestones:</strong> Once a milestone deliverable is reviewed, accepted, and approved by Client, the payment for that completed phase is non-refundable.</li>
            <li><strong>In-Progress Milestones:</strong> If Client elects to terminate a project mid-milestone, Client is billed only for hours worked up to the date of written termination notice. Unearned advance funds for unstarted milestones will be refunded within 14 business days.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            3. SLA & Performance Guarantee Refunds
          </h2>
          <p>
            OpnixLabs guarantees engineering benchmarks including 99.99% uptime for managed cloud infrastructure and sub-100ms API response targets:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>If OpnixLabs fails to meet contractually agreed-upon SLA performance standards due to code defect or system architecture failure within our control, Client is eligible for SLA service credits or partial billing remediation as outlined in the <Link href="/security-sla" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Security SLA</Link>.</li>
            <li>Defects identified during the standard 30-day post-launch warranty period will be rectified at zero additional cost to Client.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            4. Refund Request Process & Timeline
          </h2>
          <p>
            To initiate a refund request or dispute a milestone invoice:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Submit a written request to <a href="mailto:contact@opnixlabs.com" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">contact@opnixlabs.com</a> detailing the SOW number, milestone description, and rationale.</li>
            <li>Our engineering and finance management will review the request within 3 business days and arrange a resolution call.</li>
            <li>Approved refunds will be issued to the original payment method within 10 to 14 business days.</li>
          </ol>
        </section>

        {/* Contact Banner */}
        <div className="glass-panel p-8 rounded-xl border border-cyan-500/30 text-center space-y-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 dark:text-white text-slate-800">
          <h3 className="text-xl font-bold">Need Help with Billing or Cancellation?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Contact our dedicated billing support team for prompt assistance:
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
