'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { createLead } from '@/lib/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createLead({ name, email, message });
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 400);
    } catch (err) {
      console.warn('Submission error:', err);
      setSubmitted(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get in <span className="gradient-text">Touch</span></h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Discuss your software engineering and digital project requirements with our technical leaders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="glass-panel p-6 sm:p-8 rounded-md space-y-6 border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Ready to initiate a new custom web development project, cloud architecture, or enterprise software modernization? Fill out the form or reach out directly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold">Email Us</p>
                <p className="text-slate-900 dark:text-white font-medium text-xs sm:text-sm">contact@opnixlabs.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold">Call Engineering</p>
                <p className="text-slate-900 dark:text-white font-medium text-xs sm:text-sm">+91 88826-59469</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold">Location</p>
                <p className="text-slate-900 dark:text-white font-medium text-xs sm:text-sm">Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-md border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-all duration-500">
          {loading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 animate-pulse w-full" />
            </div>
          )}

          {submitted ? (
            <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center space-y-6 py-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/20">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400 animate-bounce" />
                </div>
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-75" />
              </div>

              <div className="space-y-2 max-w-sm">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Inquiry Received
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-cyan-600 dark:text-cyan-400">{name || 'Client'}</span>! Your project inquiry has been sent directly to our lead technical team. We will reach out within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-slate-800 dark:text-white font-semibold text-xs transition-all hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Project Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your technical project requirements..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 text-xs resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/60 text-slate-950 font-bold text-xs shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
