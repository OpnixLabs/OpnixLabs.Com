import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileSpreadsheet, Home, ChevronRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | OpnixLabs',
  description:
    'Learn how OpnixLabs collects, uses, and safeguards your personal information, technical data, and project telemetry in compliance with privacy regulations.',
};

export default function PrivacyPolicyPage() {
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
          <li className="font-semibold text-slate-900 dark:text-white">Privacy Policy</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <Lock className="w-3.5 h-3.5" /> Data Protection & Privacy
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Section 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-500" />
            1. Information We Collect
          </h2>
          <p>
            At OpnixLabs, we prioritize data privacy and transparency. We collect information necessary to provide software engineering services, respond to technical consultations, and manage client infrastructure.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Personal Contact Information:</strong> Name, professional email address, phone number, company name, and job title when submitted via consultation forms.</li>
            <li><strong>Technical Infrastructure Data:</strong> Non-sensitive system specs, architecture requirements, API specifications, and cloud provider preference provided during technical discovery.</li>
            <li><strong>Website Usage & Telemetry:</strong> Anonymized IP address, browser type, page views, and performance logs collected automatically via secure analytics cookies.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-cyan-500" />
            2. How We Use Your Information
          </h2>
          <p>
            We process personal and technical data strictly for legitimate operational purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>To design, build, test, and maintain custom web applications and cloud backend pipelines.</li>
            <li>To communicate project status updates, deployment reports, and technical consultation details.</li>
            <li>To ensure website performance, guard against cyber threats, and maintain sub-100ms API response SLAs.</li>
            <li>To comply with statutory legal requirements and enforce contractual agreements.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-500" />
            3. Data Security & Storage Standards
          </h2>
          <p>
            We enforce strict end-to-end security protocols to protect client data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Encryption:</strong> AES-256 bit encryption at rest for all database assets and TLS 1.3 encryption in transit for web communications.</li>
            <li><strong>Access Control:</strong> Zero-trust role-based access controls (RBAC) and multi-factor authentication (MFA) across developer pods.</li>
            <li><strong>No Sale of Data:</strong> OpnixLabs never sells, rents, or monetizes client personal data or source code under any circumstances.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-500" />
            4. Your Rights & Data Control
          </h2>
          <p>
            You possess full authority over your personal data under applicable data protection frameworks (including DPDP Act, GDPR, and CCPA):
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Right to access, rectify, or request deletion of personal information stored in our systems.</li>
            <li>Right to opt-out of non-essential marketing communications or analytics cookies.</li>
            <li>Right to request data portability for project information.</li>
          </ul>
        </section>

        {/* Contact DPO Banner */}
        <div className="p-8 rounded-xl border border-cyan-500/40 text-center space-y-4 bg-slate-900 text-white shadow-2xl">
          <h3 className="text-xl font-bold text-white">Data Protection Office</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            For privacy inquiries, data deletion requests, or compliance audits, contact our Privacy Team:
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
