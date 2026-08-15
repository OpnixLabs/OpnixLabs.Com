import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Building2,
  Globe,
  FileText,
  Database,
  Scale,
  Clock,
  Share2,
  UserCheck,
  AlertTriangle,
  Cookie,
  UserX,
  Globe2,
  RefreshCw,
  Mail,
  Home,
  ChevronRight,
  MapPin,
  ExternalLink,
  Shield,
  CreditCard,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | OpnixLabs',
  description:
    'Privacy Policy of OpnixLabs prepared in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and DPDP Rules, 2025.',
};

export default function PrivacyPolicyPage() {
  const effectiveDate = '1 August 2026';

  return (
    <main className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> DPDP Act, 2023 Compliant
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Effective Date: <strong>{effectiveDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span>Data Fiduciary: <strong>OpnixLabs</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Website: <strong>www.opnixlabs.com</strong></span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          This Privacy Policy is prepared in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and <strong>DPDP Rules, 2025</strong>. By using our services, you (the Data Principal) consent to the practices described herein.
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">

        {/* Section 1 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-blue-500" />
            1. About Us
          </h2>
          <p>
            OpnixLabs is a B2B software development / technology services business — OpnixLabs helps businesses turn ideas into reliable websites, web applications, APIs, and scalable SaaS products., operating as the Data Fiduciary under Section 2(i) of the DPDP Act, 2023. We operate our website (<a href="https://www.opnixlabs.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.opnixlabs.com</a>).
          </p>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-500" /> Registered Address
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Ankur Vihar, Loni Ghaziabad, Uttar Pradesh
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-500" />
            2. Scope & Applicability
          </h2>
          <p>
            This Policy applies to all digital personal data processed by OpnixLabs in connection with our website (<a href="https://www.opnixlabs.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.opnixlabs.com</a>) and associated services — including all Data Principals in India whose data we process.
          </p>
          <p className="font-medium text-slate-900 dark:text-slate-200">
            Exclusions: <span className="font-normal text-slate-600 dark:text-slate-300">(a) non-digital data; (b) purely personal or domestic use; (c) publicly available data, as exempted under the DPDP Act.</span>
          </p>
        </section>

        {/* Section 3 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Database className="w-6 h-6 text-blue-500" />
            3. Personal Data We Collect
          </h2>
          <p>
            We collect only the data necessary for the stated purposes below. We do not collect data we do not need.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                3.1 Personal Data
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>Full name</li>
                <li>Email address</li>
                <li>Mobile number</li>
                <li>IP address</li>
                <li>Device ID & browser info</li>
                <li>Purchase & transaction history</li>
                <li>Support & chat messages</li>
                <li>Browsing & click behaviour</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                3.2 Sensitive Personal Data
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Collected subject to explicit consent only:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>Payment card / UPI / banking details</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                3.3 How We Collect Data
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li>Checkout & payment forms</li>
                <li>Cookies & analytics tools</li>
                <li>Contact & support forms</li>
                <li>WhatsApp / email communication</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-blue-500" />
            4. Lawful Purpose & Basis of Processing
          </h2>
          <p>
            We process personal data only for lawful purposes for which you have given free, specific, informed, and unambiguous consent or where processing is necessary for a legitimate use of the DPDP Act.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
            <li>Order processing & payments</li>
            <li>Product / service delivery</li>
            <li>Customer support & grievance handling</li>
            <li>Invoices, receipts & legal records</li>
            <li>Legal & regulatory compliance (GST, RBI)</li>
            <li>Fraud detection & platform security</li>
            <li>Website & app performance analytics</li>
            <li>Marketing & promotional communications (with consent)</li>
          </ul>
          <p className="pt-2 text-slate-600 dark:text-slate-300 italic">
            We will not process your data for purposes beyond those stated above without obtaining fresh consent or as otherwise permitted by law. You may withdraw consent at any time.
          </p>
        </section>

        {/* Section 5 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-blue-500" />
            5. Data Retention & Deletion
          </h2>
          <p>
            Under DPDP Act, OpnixLabs erases personal data once the collection purpose is no longer served, unless retention is required by applicable law.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">Data Category</th>
                  <th className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">Retention Period</th>
                  <th className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 sm:p-4 font-medium text-slate-900 dark:text-white">Account & profile data</td>
                  <td className="p-3 sm:p-4">While account is active; deleted within 90 days after account deletion</td>
                  <td className="p-3 sm:p-4">Service delivery / specified purpose</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 sm:p-4 font-medium text-slate-900 dark:text-white">Transaction & payment records</td>
                  <td className="p-3 sm:p-4">72 months from the relevant annual-return due date, where GST record-retention requirements apply</td>
                  <td className="p-3 sm:p-4">CGST Act, 2017 – Section 36</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 sm:p-4 font-medium text-slate-900 dark:text-white">Customer support records</td>
                  <td className="p-3 sm:p-4">3 years from resolution</td>
                  <td className="p-3 sm:p-4">Dispute resolution / legitimate business records</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 sm:p-4 font-medium text-slate-900 dark:text-white">Marketing preferences</td>
                  <td className="p-3 sm:p-4">Until consent is withdrawn, then deleted/anonymized</td>
                  <td className="p-3 sm:p-4">Consent / specified marketing purpose</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs sm:text-sm space-y-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">Deletion Requests</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Users can request deletion by emailing <a href="mailto:privacy@opnixlabs.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">privacy@opnixlabs.com</a> or by submitting a data deletion request through the website. We will delete eligible personal data unless retention is necessary for the specified purpose or required by applicable law.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Share2 className="w-6 h-6 text-blue-500" />
            6. Data Sharing & Third-Party Processors
          </h2>
          <p>
            We share personal data with trusted third-party Data Processors acting on our behalf, under written contracts that mandate DPDP-compliant data protection standards.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Payment</span>
              <span className="text-slate-600 dark:text-slate-400">Razorpay / PayU / Cashfree</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Payment</span>
              <span className="text-slate-600 dark:text-slate-400">Stripe / PayPal</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Cloud Infrastructure</span>
              <span className="text-slate-600 dark:text-slate-400">AWS / Google Cloud / Azure</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Analytics</span>
              <span className="text-slate-600 dark:text-slate-400">Google Analytics / Mixpanel</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Advertising</span>
              <span className="text-slate-600 dark:text-slate-400">Google Ads / Facebook / Meta</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Compliance</span>
              <span className="text-slate-600 dark:text-slate-400">Government authorities (as required by law)</span>
            </div>
          </div>
          <p className="pt-2 text-slate-600 dark:text-slate-300">
            We do not sell, rent, or trade your personal data to third parties for their own commercial purposes.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            We may disclose data to government authorities, law enforcement, or regulatory bodies where required by applicable Indian law or court order.
          </p>
        </section>

        {/* Section 7 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-blue-500" />
            7. Your Rights as a Data Principal
          </h2>
          <p>
            Contact our Grievance Officer (Section 13) to exercise any of these rights:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Access Information</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Obtain a summary of the personal data we process about you, the purposes for processing, and details of all Data Fiduciaries and Processors involved.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Correction & Updating</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Request correction of inaccurate, incomplete, or misleading personal data, or request that it be updated or supplemented.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Erasure</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Request erasure of your personal data where: (a) the collection purpose is no longer served; (b) consent has been withdrawn; or (c) as required by law.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Withdraw Consent</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Where processing is consent-based, you may withdraw consent at any time. Prior lawful processing is unaffected. We will cease processing as soon as reasonably practicable.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Nominate</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You may nominate another individual to exercise your data rights in the event of your death or incapacity, of the DPDP Act.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Right to Grievance Redressal</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You may raise grievances with our Grievance Officer. If unsatisfied, you may escalate to the Data Protection Board of India (DPBI) of the DPDP Act.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Lock className="w-6 h-6 text-blue-500" />
            8. Data Security & Breach Notification
          </h2>
          <p>
            OpnixLabs implements appropriate technical and organisational safeguards to protect your personal data against unauthorised access, loss, or disclosure.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
            <li>SSL/TLS encryption (HTTPS)</li>
            <li>AES-256 encryption at rest</li>
            <li>PCI-DSS compliant payment processing</li>
            <li>Employee NDAs & security training</li>
          </ul>
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm space-y-1 mt-2">
            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Breach Notification
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              In the event of a personal data breach likely to cause harm, OpnixLabs will notify the Data Protection Board of India within 72 hours of becoming aware, and will notify affected Data Principals as required.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Cookie className="w-6 h-6 text-blue-500" />
            9. Cookies & Tracking Technologies
          </h2>
          <p>
            Our website (<a href="https://www.opnixlabs.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.opnixlabs.com</a>) uses cookies and similar tracking technologies to enhance your experience and support analytics and marketing.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
            <li><strong>Essential:</strong> login sessions, cart</li>
            <li><strong>Analytics:</strong> Google Analytics, Mixpanel</li>
            <li><strong>Marketing:</strong> Facebook Pixel, Google Ads</li>
            <li><strong>Preference:</strong> language, display settings</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 pt-1">
            You may control cookies via your browser settings. Where required under the DPDP Act, we obtain your consent before placing non-essential cookies.
          </p>
        </section>

        {/* Section 10 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <UserX className="w-6 h-6 text-blue-500" />
            10. Children's Personal Data
          </h2>
          <p>
            Our services are not directed at individuals under 18. We do not knowingly collect personal data from children without verifiable parental consent as required by the DPDP Act. If we become aware of such collection, we will delete it immediately. Contact our Grievance Officer if you believe this has occurred.
          </p>
        </section>

        {/* Section 11 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Globe2 className="w-6 h-6 text-blue-500" />
            11. Cross-Border Data Transfers
          </h2>
          <p>
            OpnixLabs may transfer or store your personal data outside India via international service providers. Such transfers are made only to countries notified by the Government of India as having adequate data protection, or subject to appropriate contractual safeguards.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Countries / Regions</span>
              <span className="text-slate-600 dark:text-slate-300">Singapore</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 dark:text-white block">Safeguards in place</span>
              <span className="text-slate-600 dark:text-slate-300">Standard Contractual Clauses (SCCs)</span>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <RefreshCw className="w-6 h-6 text-blue-500" />
            12. Consent Management & Policy Updates
          </h2>
          <p>
            We collect consent through a clear, affirmative action (e.g., ticking a checkbox) before processing personal data. We may update this Policy to reflect changes in practices, services, or legal obligations. Material changes will be notified on our website (<a href="https://www.opnixlabs.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.opnixlabs.com</a>). The Effective Date above indicates when this Policy was last updated.
          </p>
        </section>

        {/* Section 13 Banner */}
        <div className="p-6 sm:p-8 rounded-xl border border-blue-500/40 space-y-4 bg-slate-900 text-white shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Mail className="w-6 h-6 text-blue-400" />
            13. Grievance Officer & Contact
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            OpnixLabs has designated a Grievance Officer to address privacy-related complaints, questions, and data rights requests:
          </p>
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700 space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-blue-400 text-base">Shivam Gupta</p>
            <p className="text-slate-300">Grievance Officer</p>
            <p className="text-slate-300 flex items-center gap-2 pt-1">
              <Mail className="w-4 h-4 text-blue-400" />
              Email: <a href="mailto:contact@opnixlabs.com" className="text-blue-400 hover:underline">contact@opnixlabs.com</a>
            </p>
            <p className="text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              Address: Ankur Vihar, Loni Ghaziabad, Uttar Pradesh
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            We acknowledge all grievances within 48 hours and resolve within 30 days. If you are not satisfied with our resolution, you may lodge a complaint with the Data Protection Board of India (DPBI) established under the DPDP Act at <a href="https://digitindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">digitindia.gov.in <ExternalLink className="w-3 h-3" /></a>.
          </p>
        </div>

        {/* Footer Note / Guardata attribution */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
          Generated with the DPDP Privacy Policy Generator by Guardata · 1 August 2026
        </div>

      </div>
    </main>
  );
}

