'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ArrowRight, Smile, MessageSquare, Lock, Heart, Clock } from 'lucide-react';

const WhatsAppIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.852 0-3.666-.499-5.253-1.442l-.377-.225-3.901 1.023 1.041-3.804-.247-.393A9.79 9.79 0 012.25 12c0-5.385 4.38-9.765 9.766-9.765 5.384 0 9.765 4.38 9.765 9.765 0 5.386-4.381 9.766-9.766 9.766m0-21.531C5.358.312 0 5.67 0 12.27c0 2.1.545 4.149 1.583 5.955L0 24.27l6.237-1.636a11.9 11.9 0 005.778 1.488c6.602 0 11.96-5.358 11.96-11.96 0-3.197-1.245-6.202-3.504-8.461A11.88 11.88 0 0012.051.312z" />
  </svg>
);

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('I want to get consulting for my business');

  const phoneNumber = '918882659469';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(message.trim() || 'I want to get consulting for my business');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* WhatsApp Modal Card */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-2 sm:p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full p-1 bg-transparent dark:bg-transparent border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <Image
                  src="/logo.webp"
                  alt="OpnixLabs Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain rounded-full"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  OpnixLabs <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  We&apos;re online and reply quickly ⚡
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              aria-label="Close WhatsApp Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Welcome Greeting Box */}
          <div className="p-4 rounded-2xl bg-[#f0fdf4] dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-200/60 dark:bg-emerald-900/60 flex items-center justify-center text-xl flex-shrink-0">
              👋
            </div>
            <div className="space-y-1 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
              <p className="font-bold text-slate-900 dark:text-white">Hi there! 👋</p>
              <p className="leading-relaxed">
                Welcome to OpnixLabs! Click below to chat with us on WhatsApp for instant consulting for your business.
              </p>
            </div>
          </div>

          {/* Business Hours Banner */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-[11px] font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" /> Business Hours:
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">9:00 AM - 9:00 PM IST</span>
          </div>

          {/* Message Input & Form */}
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Your message
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I want to get consulting for my business"
                  className="w-full p-3.5 pr-9 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium text-xs shadow-sm focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] resize-none"
                />
                <Smile className="w-4 h-4 text-slate-400 absolute right-3 bottom-3" />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#00a884] hover:bg-[#008f70] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* 3 Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-[10px]">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <MessageSquare className="w-3 h-3" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white">Quick Response</p>
              <p className="text-slate-400">We reply quickly</p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Lock className="w-3 h-3" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white">100% Private</p>
              <p className="text-slate-400">Your info is safe</p>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Heart className="w-3 h-3" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white">Here to Help</p>
              <p className="text-slate-400">We care</p>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="pt-2 text-center text-[10px] text-slate-400 font-medium flex items-center justify-center gap-2">
            <span>♡ Trusted by businesses</span>
            <span>|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">OpnixLabs Engineering</span>
          </div>
        </div>
      )}

      {/* Floating Double-Ringed Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-[#00a884] hover:bg-[#008f70] text-white shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-105 flex items-center justify-center ring-[3px] ring-white dark:ring-slate-950"
        aria-label="Open WhatsApp Chat"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </button>
    </div>
  );
}
