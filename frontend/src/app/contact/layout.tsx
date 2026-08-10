import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Engineering Team & Free Project Consultation',
  description:
    'Schedule a technical project consultation with OpnixLabs engineers for custom web development, SaaS product architecture, and enterprise IT solutions.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
