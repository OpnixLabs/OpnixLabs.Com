import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OpnixLabs | Enterprise Web Development & IT Solutions Agency',
    template: '%s | OpnixLabs',
  },
  description:
    'OpnixLabs is a premier software engineering and IT consultancy agency. We design and deliver custom web applications, SaaS platforms, enterprise microservices, and cloud architectures for global businesses.',
  keywords: [
    'OpnixLabs',
    'Web Development Agency',
    'IT Solutions Company',
    'Custom Software Engineering',
    'SaaS Development Agency',
    'Enterprise Cloud Architecture',
    'Next.js Web Development',
    'Digital Transformation Consulting',
    'Software Architecture',
    'Cybersecurity & IT Infrastructure',
  ],
  authors: [{ name: 'OpnixLabs Engineering Team', url: siteUrl }],
  creator: 'OpnixLabs Inc.',
  publisher: 'OpnixLabs Inc.',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'OpnixLabs | Enterprise Web Development & IT Solutions Agency',
    description:
      'Premier software engineering firm specializing in high-performance web applications, cloud infrastructure, and enterprise IT consulting.',
    siteName: 'OpnixLabs',
    images: [
      {
        url: `${siteUrl}/logo.webp`,
        width: 1200,
        height: 630,
        alt: 'OpnixLabs Software Engineering & IT Solutions Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpnixLabs | Enterprise Web Development & IT Solutions Agency',
    description:
      'Empowering enterprises with custom software engineering, scalable cloud systems, and strategic IT consulting.',
    images: [`${siteUrl}/logo.webp`],
    creator: '@OpnixLabs',
  },
  icons: {
    icon: '/favIcon.ico',
    shortcut: '/favIcon.ico',
    apple: '/favIcon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'OpnixLabs',
    image: `${siteUrl}/logo.webp`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+1-800-555-6764',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Silicon Valley Headquarters',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.774929,
      longitude: -122.419418,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://twitter.com/opnixlabs',
      'https://linkedin.com/company/opnixlabs',
      'https://github.com/opnixlabs',
    ],
    areaServed: 'Worldwide',
    knowsAbout: [
      'Custom Web Application Development',
      'Enterprise Cloud Infrastructure',
      'Software Engineering & Architecture',
      'Digital Transformation',
      'Cybersecurity Audits',
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favIcon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-gray-100 antialiased selection:bg-cyan-500 selection:text-slate-950 transition-colors">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
