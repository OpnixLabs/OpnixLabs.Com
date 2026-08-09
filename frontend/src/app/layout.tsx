import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'OpnixLabs | Next-Gen Full-Stack Engineering & AI Solutions',
  description: 'Enterprise software development, Go microservices, serverless cloud architectures, and autonomous AI engine integration.',
  keywords: ['Go', 'Next.js', 'Drizzle ORM', 'Neon Postgres', 'Gemini AI', 'Full Stack Development', 'Software Agency'],
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
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favIcon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-gray-100 antialiased selection:bg-blue-600 selection:text-white transition-colors">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
