import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, Scale, Clock, Home, ChevronRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | OpnixLabs',
  description:
    'Read the official Terms of Service for OpnixLabs IT Agency, outlining project deliverables, intellectual property rights, SLAs, and service agreements.',
};

export default function TermsOfServicePage() {
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
          <li className="font-semibold text-slate-900 dark:text-white">Terms of Service</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <Scale className="w-3.5 h-3.5" /> Legal Agreement
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-500" />
          <span>Last Updated: {lastUpdated}</span>
        </p>
      </div>

      {/* Main Legal Content */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Section 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">1</span>
            Acceptance of Terms
          </h2>
          <p>
            By accessing our website (<Link href="/" className="text-cyan-600 dark:text-cyan-400 underline">opnixlabs.com</Link>), engaging OpnixLabs Inc. (“OpnixLabs”, “Company”, “We”, “Us”) for custom software development, cloud infrastructure design, backend microservices, or system maintenance, you (“Client”, “User”) agree to be bound by these Terms of Service.
          </p>
          <p>
            If you are executing an Master Services Agreement (MSA) or Statement of Work (SOW) on behalf of an enterprise entity, you represent that you possess legal authority to bind that entity.
          </p>
        </section>

        {/* Section 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">2</span>
            Services & Project Scope
          </h2>
          <p>
            OpnixLabs provides IT software development, cloud DevOps orchestration, UI/UX systems design, microservices architecture, and managed maintenance services.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Specific project deliverables, timelines, milestones, and acceptance criteria are governed by executed Statements of Work (SOWs).</li>
            <li>Any request for out-of-scope work requires an executed Change Order detailing cost and timeline adjustments.</li>
            <li>OpnixLabs guarantees senior developer pod allocation and adherence to agreed-upon architectural standards.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">3</span>
            Intellectual Property & Code Ownership
          </h2>
          <p>
            Upon full payment of all applicable project milestone invoices:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Client Ownership:</strong> Client retains 100% full ownership of custom application source code, proprietary algorithms, database schemas, and business graphics developed specifically for Client.</li>
            <li><strong>Company Tools & Pre-existing IP:</strong> OpnixLabs retains ownership of pre-existing core boilerplate code, reusable developer utilities, and internal frameworks. Client receives a perpetual, non-exclusive, worldwide, royalty-free license to use pre-existing components embedded in their deliverables.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">4</span>
            Payment Terms & Invoicing
          </h2>
          <p>
            Invoices are issued based on agreed milestone schedules or monthly pod retainer terms.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Standard payment terms are Net-15 or Net-30 from date of invoice issuance, as specified in the SOW.</li>
            <li>Late payments may incur interest charges of 1.5% per month or the maximum rate permitted by law.</li>
            <li>All amounts are exclusive of applicable taxes (GST, VAT, or local withholding taxes).</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">5</span>
            Confidentiality & Non-Disclosure
          </h2>
          <p>
            Both parties agree to protect all proprietary, financial, and technical information disclosed during the engagement under strict non-disclosure obligations for a period of no less than five (5) years.
          </p>
        </section>

        {/* Section 6 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm font-black">6</span>
            Limitation of Liability & Governing Law
          </h2>
          <p>
            To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, or consequential damages. OpnixLabs' aggregate liability under any Statement of Work shall not exceed the total fees paid by Client to OpnixLabs for that specific project during the 6 months preceding the claim.
          </p>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Uttar Pradesh, India, without regard to conflict of law principles.
          </p>
        </section>

        {/* Contact Legal Banner */}
        <div className="p-8 rounded-xl border border-cyan-500/40 text-center space-y-4 bg-slate-900 text-white shadow-2xl">
          <h3 className="text-xl font-bold text-white">Questions Regarding Legal Terms?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Reach out to our legal and compliance department for clarifications on enterprise agreements or custom MSAs.
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
