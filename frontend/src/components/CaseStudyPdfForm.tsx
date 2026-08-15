'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2, Download } from 'lucide-react';

import { createLead } from '@/lib/api';

interface CaseStudyPdfFormProps {
  title?: string;
  subtitle?: string;
  caseStudyTitle?: string;
  variant?: 'dark' | 'adaptive';
}

export default function CaseStudyPdfForm({
  title = 'Get this case study in PDF to your inbox.',
  subtitle = 'Enter your work email to receive the complete technical report & architecture blueprint.',
  caseStudyTitle = 'Blackboard',
  variant = 'dark',
}: CaseStudyPdfFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid work email address');
      return;
    }

    setErrorMessage('');
    setStatus('loading');

    try {
      await createLead({
        name: 'Technical Reader',
        email,
        message: `Requested PDF Download for ${caseStudyTitle} Case Study`,
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`w-full rounded-xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden group transition-all ${
        isDark
          ? 'bg-slate-900/95 border-blue-500/40 text-white backdrop-blur-md'
          : 'bg-white dark:bg-slate-900/95 border-slate-200 dark:border-blue-500/40 text-slate-900 dark:text-white'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl group-hover:bg-blue-500/25 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider">
          <Download className="w-4 h-4" />
          <span>Free Technical Resource</span>
        </div>

        <h3
          className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-snug ${
            isDark ? 'text-white' : 'text-slate-900 dark:text-white'
          }`}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
              isDark ? 'text-slate-200 font-medium' : 'text-slate-600 dark:text-slate-300 font-medium'
            }`}
          >
            {subtitle}
          </p>
        )}

        {status === 'success' ? (
          <div className="p-4 rounded-lg bg-blue-950/90 border border-blue-500/50 text-blue-200 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <p className="font-bold text-sm text-white">Done! Check your inbox.</p>
              <p className="text-xs text-blue-300">
                We sent the {caseStudyTitle} technical PDF to <strong>{email}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  disabled={status === 'loading'}
                  className={`w-full pl-10 pr-4 py-3 border focus:border-blue-400 font-medium text-xs sm:text-sm rounded-lg outline-none transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-400'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-blue-500/30 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending PDF...</span>
                  </>
                ) : (
                  <>
                    <span>Send PDF</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {errorMessage && (
              <p className="text-rose-400 text-xs font-semibold pt-1">{errorMessage}</p>
            )}

            <p
              className={`text-[11px] font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              We respect your privacy. No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
