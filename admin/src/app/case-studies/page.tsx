'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCaseStudies, deleteCaseStudy } from '@/lib/api';
import { CaseStudyData } from '@/data/caseStudies';
import { Layers, Plus, Trash2, Edit3, ArrowRight, Loader2, Sparkles, Building2 } from 'lucide-react';

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCaseStudies();
      setCaseStudies(data);
    } catch (err) {
      console.error('Failed to load case studies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: number, slug?: string) => {
    if (!confirm(`Are you sure you want to delete case study '${slug || id}'?`)) return;

    if (id) {
      setDeletingId(id);
      try {
        await deleteCaseStudy(id);
        setCaseStudies((prev) => prev.filter((cs) => (cs as any).id !== id));
      } catch (err) {
        alert('Failed to delete case study: ' + (err as Error).message);
      } finally {
        setDeletingId(null);
      }
    } else {
      setCaseStudies((prev) => prev.filter((cs) => cs.slug !== slug));
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Content Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Case Studies</h1>
        </div>

        <Link
          href="/case-studies/create"
          className="px-4 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Case Study
        </Link>
      </div>

      {/* Case Studies Table / List */}
      <div className="glass-panel rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
        {loading ? (
          <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
            <span>Loading case studies...</span>
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm">No case studies found in database.</p>
            <Link
              href="/case-studies/create"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-500 hover:underline"
            >
              Create the first Case Study →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {caseStudies.map((cs) => {
              const numericId = (cs as any).id;
              return (
                <div
                  key={cs.slug}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold border border-cyan-500/20 uppercase">
                        {cs.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/case-studies/{cs.slug}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {cs.clientName} — {cs.heroTitle}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {cs.summaryText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`https://opnixlabs.com/case-studies/${cs.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      View Live <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    {numericId && (
                      <button
                        onClick={() => handleDelete(numericId, cs.slug)}
                        disabled={deletingId === numericId}
                        className="px-3 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
                      >
                        {deletingId === numericId ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
