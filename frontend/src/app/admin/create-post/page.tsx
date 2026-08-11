'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import { createPost } from '@/lib/api';
import { PenSquare, Send, ArrowLeft, AlertCircle, CheckCircle2, Bot } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('<p>Write your article content here...</p>');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTriggeringCron, setIsTriggeringCron] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError('Article title is required.');
      return;
    }

    if (!contentHtml.trim() || contentHtml === '<p></p>') {
      setError('Article content is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newPost = await createPost({
        title: title.trim(),
        content_html: contentHtml,
      });

      setSuccess(`Post published successfully! Slug: ${newPost.slug}`);
      setTimeout(() => {
        router.push(`/blog/${newPost.slug}`);
      }, 1200);
    } catch (err: any) {
      console.error('Failed to create post:', err);
      setError(err.message || 'Failed to connect to Go backend API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualCronTrigger = async () => {
    setIsTriggeringCron(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('http://localhost:8080/api/admin/trigger-cron', {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error(`Cron trigger failed: ${res.statusText}`);
      }
      setSuccess('Gemini AI Auto-Blogging job triggered in background! Refresh blog in a few seconds.');
    } catch (err: any) {
      setError(err.message || 'Could not reach Go backend to trigger Gemini cron job.');
    } finally {
      setIsTriggeringCron(false);
    }
  };

  return (
    <AdminAuthGuard>
      <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Nav */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <PenSquare className="w-6 h-6 text-cyan-400" /> Admin Article Publisher
            </h1>
          </div>

          <button
            type="button"
            onClick={handleManualCronTrigger}
            disabled={isTriggeringCron}
            className="px-3.5 py-2 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            {isTriggeringCron ? 'Triggering...' : 'Trigger Gemini AI Auto-Post'}
          </button>
        </div>

        {/* Alerts - 6px rounded */}
        {error && (
          <div className="p-3.5 rounded-md bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-md bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Editor Form - 6px rounded */}
        <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 sm:p-8 rounded-md border border-slate-800">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase text-slate-400">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next-Gen Microservices in Go & Gemini Integration"
              className="w-full px-3.5 py-2.5 rounded-md bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-semibold"
              required
            />
            <p className="text-[11px] text-slate-500">
              Note: Slug will be generated on the server (`title-lowercased-timestamp`).
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase text-slate-400">
              Post Content (TipTap WYSIWYG Editor)
            </label>
            <TiptapEditor content={contentHtml} onChange={setContentHtml} />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Article'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </AdminAuthGuard>
  );
}

