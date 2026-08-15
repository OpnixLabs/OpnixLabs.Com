import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, ArrowRight, MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-slate-300 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="OpnixLabs Logo"
                width={38}
                height={38}
                className="w-9 h-9 object-contain rounded-md"
              />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Opnix<span className="gradient-text">Labs</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Engineered IT solutions, custom enterprise web applications, and resilient cloud infrastructure for growth-focused organizations.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/opnixlabs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-md bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/OpnixLabs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2.5 rounded-md bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/OpnixLabs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-md bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enterprise Solutions */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">Enterprise Services</p>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Custom Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Enterprise Backend Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Cloud Systems & DevOps
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Cybersecurity & Compliance
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-blue-400 transition-colors">
                  Case Studies & Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Technical Insights Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Schedule Technical Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-4">Location & Contact</p>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.google.com/?q=Uttar+Pradesh,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Uttar Pradesh, India
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>9:00 AM - 9:00 PM IST (Mon - Sun)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:contact@opnixlabs.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  contact@opnixlabs.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+918882659469"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 88826-59469
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} OpnixLabs Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-blue-400 transition-colors">
              Refund Policy
            </Link>
            <Link href="/security-sla" className="hover:text-blue-400 transition-colors">
              Security SLA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
