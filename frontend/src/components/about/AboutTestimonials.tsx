'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Building, UserCheck } from 'lucide-react';

interface Testimonial {
  id: number;
  author: string;
  role: string;
  companyCategory: string;
  quote: string;
  tag: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'VP of Engineering',
    role: 'Product & UX Engineering Lead',
    companyCategory: 'ConsumerAffairs / MarTech Platform',
    tag: 'MarTech & E-Commerce',
    quote: 
      'We chose to work with OpnixLabs because we wanted an engineering pod that felt like our internal staff. We had a close, fluid relationship with their developers and QA specialists at every step of the way.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Lead Systems Architect',
    role: 'Core Banking & Ledger Systems',
    companyCategory: 'Azlo / FinTech Digital Banking',
    tag: 'FinTech Microservices',
    quote: 
      'OpnixLabs helped us architect core ACH ledger microservices handling real-time transaction processing. Sub-100ms API response times and bank-grade security logging allowed us to scale smoothly.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Technical Director',
    role: 'Managed LMS & Infrastructure',
    companyCategory: 'Blackboard / EdTech Enterprise',
    tag: 'EdTech & Cloud Systems',
    quote: 
      'Their senior developers integrated complex ServiceNow workflows and Salesforce tracking systems seamlessly, improving system stability and incident resolution times across global deployments.',
    rating: 5,
  },
  {
    id: 4,
    author: 'Director of Cloud Infrastructure',
    role: 'SaaS Platform Lead',
    companyCategory: 'Enterprise Cloud SaaS',
    tag: 'DevOps & QA Automation',
    quote: 
      'The code quality, Playwright automated regression suites, and multi-region CI/CD pipelines delivered by OpnixLabs exceeded our expectations. Zero downtime during major platform upgrades.',
    rating: 5,
  },
];

export default function AboutTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            <UserCheck className="w-3.5 h-3.5" /> Client Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Technology Leaders <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified recommendations and engagement outcomes from engineering directors across our project portfolio.
          </p>
        </div>

        {/* Testimonial Card Display */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel bg-white dark:bg-slate-900/80 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              {/* Quote Icon */}
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                <Quote className="w-7 h-7" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 dark:fill-cyan-400 dark:text-cyan-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-2xl text-slate-900 dark:text-slate-100 font-medium leading-relaxed mb-8">
                “{current.quote}”
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {current.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {current.role} • <span className="font-semibold text-slate-900 dark:text-slate-200">{current.companyCategory}</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-cyan-700 dark:text-cyan-400 self-start sm:self-auto">
                  <Building className="w-3.5 h-3.5" />
                  <span>{current.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Slide Index Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-cyan-500 dark:bg-cyan-400' 
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-cyan-500/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-md"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-md"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
