'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export type CookieConsentStatus = 'accepted' | 'rejected' | null;

export const COOKIE_CONSENT_KEY = 'opnix_cookie_consent';

export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === 'accepted' || stored === 'rejected') {
    return stored;
  }
  return null;
}

export default function CookieConsentToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);

  useEffect(() => {
    const status = getCookieConsent();
    setConsentStatus(status);
    if (!status) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    setConsentStatus(status);
    setIsVisible(false);
    
    // Dispatch custom event so trackers can update state dynamically
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: status }));
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Notification"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 transition-all duration-300 transform translate-y-0"
    >
      <div className="glass-panel p-5 rounded-xl border border-blue-500/30 bg-slate-900/95 text-white shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm">We value your privacy</h3>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We use cookies and telemetry tools to optimize performance, remember your preferences, and analyze how visitors interact with our platform.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss cookie toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 border-t border-slate-800">
          <div className="text-xs text-slate-400 w-full sm:w-auto">
            <Link
              href="/privacy-policy"
              className="text-blue-400 hover:underline font-medium"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <button
              onClick={() => handleConsent('rejected')}
              className="w-1/2 sm:w-auto px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => handleConsent('accepted')}
              className="w-1/2 sm:w-auto px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
