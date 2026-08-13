'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCaseStudy } from '@/lib/api';
import { CaseStudyData } from '@/data/caseStudies';
import { ArrowLeft, Save, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreateCaseStudyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<CaseStudyData>>({
    slug: '',
    clientName: '',
    category: 'Enterprise SaaS',
    title: '',
    heroCategoryText: 'CASE STUDY > ',
    heroTitle: '',
    heroImage: '/images/hero.jpg',
    metaDescription: '',
    summaryTitle: 'The summary.',
    summaryText: '',
    clientBrandName: '',
    engagementLengthValue: '1',
    engagementLengthUnit: 'years',
    engagementLengthLabel: 'Engagement length',
    frontEndTechTags: ['React', 'TypeScript'],
    engagementType: 'Dedicated Software Team',
    aboutClientHeading: 'About Client',
    aboutClientText: '',
    challengeTitle: 'The challenge.',
    challengeParagraphs: [''],
    challengeCalloutQuote: '',
    solutionTitle: 'The solution.',
    solutionSubtitle: 'Our rigorous vetting process ensured we provided top-tier software engineers.',
    technologiesTitle: 'All technologies used.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    outcomeTitle: 'The outcome.',
    outcomeSubtitle: 'During our engagement, we were involved with:',
    outcomeBullets: [{ text: 'Delivered high performance software microservices.' }],
    outcomeImage: '/images/project1.jpg',
    ctaHeading: 'Facing similar challenges?',
    ctaSubheading: 'See how we can help.',
    ctaButtonText: 'Schedule a Call',
  });

  const handleChange = (field: keyof CaseStudyData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.slug || !formData.clientName || !formData.heroTitle) {
      setError('Please fill in required fields: Slug, Client Name, and Hero Title.');
      return;
    }

    setSubmitting(true);
    try {
      await createCaseStudy(formData as CaseStudyData);
      router.push('/case-studies');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
        <span className="text-xs font-bold uppercase text-cyan-500">Create Case Study</span>
      </div>

      <div className="glass-panel p-8 rounded-md border border-slate-200 dark:border-slate-800 space-y-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Add New Case Study</h1>

        {error && (
          <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  handleChange('clientName', val);
                  handleChange('clientBrandName', val);
                  if (!formData.slug) {
                    handleChange('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                placeholder="e.g. Acme Corp"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug || ''}
                onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                placeholder="e.g. acme-corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hero Title *</label>
              <input
                type="text"
                required
                value={formData.heroTitle || ''}
                onChange={(e) => {
                  handleChange('heroTitle', e.target.value);
                  handleChange('title', `${formData.clientName} Case Study - OpnixLabs`);
                }}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                placeholder="Building Custom Tech Solutions for..."
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Summary Text *</label>
            <textarea
              rows={3}
              required
              value={formData.summaryText || ''}
              onChange={(e) => {
                handleChange('summaryText', e.target.value);
                handleChange('metaDescription', e.target.value);
              }}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              placeholder="Summary paragraph describing the engagement..."
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">About Client Text</label>
            <textarea
              rows={3}
              value={formData.aboutClientText || ''}
              onChange={(e) => handleChange('aboutClientText', e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Challenge Callout Quote</label>
            <input
              type="text"
              value={formData.challengeCalloutQuote || ''}
              onChange={(e) => handleChange('challengeCalloutQuote', e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              value={(formData.technologies || []).join(', ')}
              onChange={(e) => handleChange('technologies', e.target.value.split(',').map((s) => s.trim()))}
              className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              placeholder="C#, .NET, Java, PostgreSQL"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Case Study...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save & Publish Case Study
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
