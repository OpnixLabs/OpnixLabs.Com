import React from 'react';
import type { Metadata } from 'next';
import CaseStudyDetailPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Blackboard Case Study - OpnixLabs',
  description:
    'Discover how OpnixLabs helped Blackboard scale their Learning Management System (LMS), handle 100M+ global students with 99.99% uptime, and automate ServiceNow workflows.',
  keywords: [
    'Blackboard Case Study',
    'EdTech Software Engineering',
    'LMS Cloud Scalability',
    'OpnixLabs Case Studies',
    'ServiceNow Integration',
    'Microservices Architecture',
    'High Concurrency Software',
  ],
  alternates: {
    canonical: 'https://opnixlabs.com/case-studies/blackboard',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://opnixlabs.com/case-studies/blackboard',
    title: 'Blackboard Case Study - OpnixLabs',
    description:
      'Discover how OpnixLabs helped Blackboard scale their Learning Management System (LMS), handle 100M+ global students with 99.99% uptime, and automate ServiceNow workflows.',
    siteName: 'OpnixLabs',
    images: [
      {
        url: 'https://opnixlabs.com/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Blackboard Case Study OpnixLabs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blackboard Case Study - OpnixLabs',
    description:
      'Discover how OpnixLabs helped Blackboard scale their Learning Management System (LMS), handle 100M+ global students with 99.99% uptime.',
    images: ['https://opnixlabs.com/images/hero.png'],
    creator: '@OpnixLabs',
  },
};

export default async function BlackboardCaseStudyPage() {
  return <CaseStudyDetailPage params={Promise.resolve({ slug: 'blackboard' })} />;
}
