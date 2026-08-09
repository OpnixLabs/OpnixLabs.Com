import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'OpnixLabs Admin Console',
  description: 'Control portal to publish blog posts, trigger AI workflows, and manage customer leads.',
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
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
