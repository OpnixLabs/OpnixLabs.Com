import React from 'react';
import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutStoryTimeline from '@/components/about/AboutStoryTimeline';
import AboutClientMarquee from '@/components/about/AboutClientMarquee';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import AboutAwards from '@/components/about/AboutAwards';
import AboutPressAccordion from '@/components/about/AboutPressAccordion';
import AboutCultureBadges from '@/components/about/AboutCultureBadges';

export const metadata: Metadata = {
  title: 'About Us | Premier IT Solutions & Software Engineering Pods',
  description:
    'Learn how OpnixLabs delivers senior software engineering pods, custom enterprise web applications, 99.99% uptime SLAs, and sub-100ms API latency guarantees.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen space-y-4">
      {/* Hero Section */}
      <AboutHero />

      {/* Story & Connected Timeline */}
      <AboutStoryTimeline />

      {/* Enterprise Partners & CSAT Marquee */}
      <AboutClientMarquee />

      {/* Testimonials Slider */}
      <AboutTestimonials />

      {/* Trophy Cabinet & Awards */}
      <AboutAwards />

      {/* Press & Media Highlights Accordion */}
      <AboutPressAccordion />

      {/* Culture Badges & CTA */}
      <AboutCultureBadges />
    </main>
  );
}
