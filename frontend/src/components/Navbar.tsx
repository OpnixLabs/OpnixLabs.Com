'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquareHeart,
  Menu,
  X,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Clock,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

import ThemeToggle from './ThemeToggle';
import { popularTechnologies } from '@/data/technologies';
import { servicesData } from '@/data/services';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (techRef.current && !techRef.current.contains(event.target as Node)) {
        setTechDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Split popular technologies into 3 columns
  const col1 = popularTechnologies.slice(0, 8);
  const col2 = popularTechnologies.slice(8, 16);
  const col3 = popularTechnologies.slice(16, 24);

  // Split top services into 2 columns
  const topServicesCol1 = servicesData.topServices.slice(0, 8);
  const topServicesCol2 = servicesData.topServices.slice(8, 16);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95">
      {/* Top Utility Contact Bar */}
      <div className="hidden lg:block bg-slate-900 dark:bg-slate-950 text-slate-300 text-xs border-b border-slate-800 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>9:00 AM - 9:00 PM IST (Mon - Sun)</span>
            </div>
            <a href="mailto:contact@opnixlabs.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>contact@opnixlabs.com</span>
            </a>
            <a href="tel:+918882659469" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+91 88826-59469</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              <MessageSquareHeart className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">24/7 Live Support & Maintenance</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://www.linkedin.com/company/opnixlabs" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://x.com/OpnixLabs" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Twitter / X">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://github.com/OpnixLabs" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.webp"
              alt="OpnixLabs Logo"
              width={38}
              height={38}
              className="w-9 h-9 object-contain rounded-md"
              priority
            />
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Opnix<span className="gradient-text">Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-md border border-slate-200 dark:border-slate-800">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isActive('/') && pathname === '/'
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              Home
            </Link>

            {/* SERVICES MEGA DROPDOWN TAB */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setTechDropdownOpen(false);
                }}
                onMouseEnter={() => {
                  setServicesDropdownOpen(true);
                  setTechDropdownOpen(false);
                }}
                className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isActive('/services') || servicesDropdownOpen
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-cyan-500' : ''
                  }`}
                />
              </button>

              {/* Services Mega-Dropdown Container matching BairesDev Screenshot 2 */}
              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[880px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-fadeIn"
                >
                  <div className="grid grid-cols-12 min-h-[390px]">
                    {/* Left Column matching BairesDev Screenshot 2 */}
                    <div className="col-span-4 bg-slate-50 dark:bg-slate-950 p-6 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                          Services<span className="text-cyan-500">.</span>
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          Get software development services, built around your specific enterprise requirements:
                        </p>

                        <div className="space-y-2 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                          {servicesData.sidebarLinks.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="flex items-center gap-2 hover:text-cyan-500 transition-colors py-0.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Case Study Quote Box */}
                      <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                          FEATURED CASE STUDY
                        </span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-medium">
                          We built real-time platform monitoring & scalable architecture for global enterprise systems.
                        </p>
                        <Link
                          href="/case-studies/blackboard"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline pt-1"
                        >
                          Read Case Study →
                        </Link>
                      </div>
                    </div>

                    {/* Right Columns Grid: TOP SERVICES & ENTERPRISE FOCUSED */}
                    <div className="col-span-8 p-6 flex flex-col justify-between space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Column 1: TOP SERVICES part 1 */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-3">
                            TOP SERVICES
                          </span>
                          {topServicesCol1.map((service, i) => (
                            <Link
                              key={i}
                              href={service.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>

                        {/* Column 2: TOP SERVICES part 2 */}
                        <div className="space-y-2.5 pt-6">
                          {topServicesCol2.map((service, i) => (
                            <Link
                              key={i}
                              href={service.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>

                        {/* Column 3: ENTERPRISE FOCUSED */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-3">
                            ENTERPRISE FOCUSED
                          </span>
                          {servicesData.enterpriseFocused.map((service, i) => (
                            <Link
                              key={i}
                              href={service.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Link: All Services */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors"
                        >
                          <span>All Services</span>
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* TECHNOLOGIES MEGA DROPDOWN TAB */}
            <div className="relative" ref={techRef}>
              <button
                onClick={() => {
                  setTechDropdownOpen(!techDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                onMouseEnter={() => {
                  setTechDropdownOpen(true);
                  setServicesDropdownOpen(false);
                }}
                className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isActive('/technologies') || techDropdownOpen
                    ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <span>Technologies</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    techDropdownOpen ? 'rotate-180 text-cyan-500' : ''
                  }`}
                />
              </button>

              {/* Mega-Dropdown Container matching BairesDev Screenshot 1 */}
              {techDropdownOpen && (
                <div
                  onMouseLeave={() => setTechDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[850px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-fadeIn"
                >
                  <div className="grid grid-cols-12 min-h-[380px]">
                    {/* Left Column matching BairesDev screenshot */}
                    <div className="col-span-4 bg-slate-50 dark:bg-slate-950 p-6 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                          Technologies<span className="text-cyan-500">.</span>
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          Get experts in 100+ technologies. Cover any tech stack with top 1% senior engineers.
                        </p>

                        <div className="space-y-2 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span>Hire Senior Software Developers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span>Top 1% Nearshore Talent</span>
                          </div>
                        </div>
                      </div>

                      {/* Featured Case Study Quote Box */}
                      <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                          BLACKBOARD & CONSUMERAFFAIRS
                        </span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-medium">
                          We optimized core platform performance, leading to high availability & scaling.
                        </p>
                        <Link
                          href="/case-studies/blackboard"
                          onClick={() => setTechDropdownOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline pt-1"
                        >
                          Read Case Study →
                        </Link>
                      </div>
                    </div>

                    {/* Right Columns Grid matching BairesDev screenshot */}
                    <div className="col-span-8 p-6 flex flex-col justify-between space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Column 1 */}
                        <div className="space-y-2.5">
                          {col1.map((tech) => (
                            <Link
                              key={tech.slug}
                              href={`/technologies/${tech.slug}`}
                              onClick={() => setTechDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {tech.name}
                            </Link>
                          ))}
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2.5">
                          {col2.map((tech) => (
                            <Link
                              key={tech.slug}
                              href={`/technologies/${tech.slug}`}
                              onClick={() => setTechDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {tech.name}
                            </Link>
                          ))}
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-2.5">
                          {col3.map((tech) => (
                            <Link
                              key={tech.slug}
                              href={`/technologies/${tech.slug}`}
                              onClick={() => setTechDropdownOpen(false)}
                              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-0.5"
                            >
                              {tech.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Link: All Technologies */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          href="/technologies"
                          onClick={() => setTechDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors"
                        >
                          <span>All Technologies</span>
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isActive('/portfolio')
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              Work
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isActive('/about')
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              About
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isActive('/blog')
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isActive('/contact')
                  ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70 border border-transparent'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md hover:shadow-cyan-500/25 transition-all"
            >
              Get Free Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Home
          </Link>

          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Services
          </Link>

          <Link
            href="/technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Technologies
          </Link>

          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Work
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            About
          </Link>

          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-cyan-500 text-slate-950 text-center font-bold text-sm"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
