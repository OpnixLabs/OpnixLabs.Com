'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, PenSquare } from 'lucide-react';

import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo from public/logo.webp */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.webp"
              alt="OpnixLabs Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-md"
              priority
            />
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Opnix<span className="gradient-text">Labs</span>
            </span>
          </Link>

          {/* Desktop Nav - 6px rounded container */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-md border border-slate-200 dark:border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons - 6px rounded */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/admin/create-post"
              className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all"
            >
              <PenSquare className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              Write Post
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - 6px rounded */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium ${
                isActive(link.href)
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/create-post"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-medium border border-slate-200 dark:border-slate-800"
            >
              <PenSquare className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              Write Post (Admin)
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-md bg-cyan-500 text-slate-950 text-center font-bold text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
