import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="OpnixLabs Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain rounded-md"
              />
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Opnix<span className="gradient-text">Labs</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Crafting high-performance web applications, full-stack microservice architectures, and AI solutions for growing enterprises.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-xs uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Go Microservices</Link></li>
              <li><Link href="/services" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">AI & GenAI Integration</Link></li>
              <li><Link href="/services" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Cloud Architecture</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-xs uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Tech Blog</Link></li>
              <li><Link href="/admin/create-post" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">Admin Portal <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-xs uppercase tracking-wider mb-4">Connect</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Have a project in mind? Reach out to our engineering team.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold transition-colors"
            >
              Contact Engineering
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} OpnixLabs Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-400">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
