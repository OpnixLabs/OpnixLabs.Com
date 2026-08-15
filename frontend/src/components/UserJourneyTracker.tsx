'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getCookieConsent } from './CookieConsentToast';

export default function UserJourneyTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string>('');
  const maxScrollRef = useRef<number>(0);
  const trackedMilestonesRef = useRef<Set<number>>(new Set());
  const initialPathRef = useRef<string>('');

  useEffect(() => {
    // Generate unique session ID if not existing
    let sId = sessionStorage.getItem('opnix_session_id');
    if (!sId) {
      sId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('opnix_session_id', sId);
    }
    sessionIdRef.current = sId;
    initialPathRef.current = window.location.pathname;

    const consent = getCookieConsent();
    if (consent === 'rejected') return;

    // Helper to send telemetry
    const sendTelemetry = (payload: {
      eventType: 'landing' | 'scroll_milestone' | 'click_cta' | 'page_transition' | 'exit';
      sourceRoute: string;
      destinationRoute?: string;
      scrollDepthPercentage?: number;
      clickTarget?: string;
    }) => {
      const currentConsent = getCookieConsent();
      if (currentConsent === 'rejected') return;

      const data = {
        sessionId: sessionIdRef.current,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        ...payload,
      };

      // Save to localStorage for client-side inspection
      try {
        const historyStr = localStorage.getItem('opnix_user_journey') || '[]';
        const history = JSON.parse(historyStr);
        history.push(data);
        if (history.length > 100) history.shift();
        localStorage.setItem('opnix_user_journey', JSON.stringify(history));
      } catch (e) {
        // Ignore quota errors
      }

      // Send to server
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/telemetry', JSON.stringify(data));
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {});
      }
    };

    // Log landing on '/' or initial page
    sendTelemetry({
      eventType: 'landing',
      sourceRoute: pathname,
    });

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScrollPercent = Math.min(
        100,
        Math.round((window.scrollY / scrollHeight) * 100)
      );

      if (currentScrollPercent > maxScrollRef.current) {
        maxScrollRef.current = currentScrollPercent;
      }

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (currentScrollPercent >= milestone && !trackedMilestonesRef.current.has(milestone)) {
          trackedMilestonesRef.current.add(milestone);
          sendTelemetry({
            eventType: 'scroll_milestone',
            sourceRoute: pathname,
            scrollDepthPercentage: milestone,
          });
        }
      });
    };

    // Click tracking for interactive links and CTA buttons
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"]') as HTMLElement | null;
      if (!clickable) return;

      const text = (clickable.innerText || clickable.getAttribute('aria-label') || clickable.tagName).trim();
      const href = clickable.getAttribute('href');

      sendTelemetry({
        eventType: 'click_cta',
        sourceRoute: pathname,
        destinationRoute: href || undefined,
        clickTarget: text.substring(0, 50),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  // Track page transitions when user navigates away from current path (e.g. from '/' to another page)
  const prevPathRef = useRef<string>(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      const consent = getCookieConsent();
      if (consent !== 'rejected') {
        const data = {
          sessionId: sessionIdRef.current,
          timestamp: new Date().toISOString(),
          eventType: 'page_transition' as const,
          sourceRoute: prevPathRef.current,
          destinationRoute: pathname,
          maxScrollPercent: maxScrollRef.current,
        };

        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/telemetry', JSON.stringify(data));
        } else {
          fetch('/api/telemetry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            keepalive: true,
          }).catch(() => {});
        }
      }

      // Reset scroll tracking for new page
      maxScrollRef.current = 0;
      trackedMilestonesRef.current.clear();
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return null;
}
