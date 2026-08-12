'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { getPostById, updatePost, Post } from '@/lib/api';
import { Edit, Save, ArrowLeft, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params?.id);

  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!postId || isNaN(postId)) {
      setError('Invalid post ID');
      setLoading(false);
      return;
    }

    async function loadPost() {
      try {
        setLoading(true);
        const p: Post = await getPostById(postId);
        setTitle(p.title);
        setContentHtml(p.content_html);
      } catch (err: any) {
        console.error('Failed to load post for editing:', err);
        setError(err.message || 'Failed to fetch article from database.');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);

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
      const updated = await updatePost(postId, {
        title: title.trim(),
        content_html: contentHtml,
      });

      setSuccess(`Article "${updated.title}" updated successfully!`);
      setTimeout(() => {
        router.push('/posts');
      }, 1200);
    } catch (err: any) {
      console.error('Failed to update post:', err);
      setError(err.message || 'Failed to connect to Go backend API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Nav */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Posts
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Edit className="w-6 h-6 text-cyan-400" /> Edit Article #{postId}
          </h1>
        </div>
      </div>

      {/* Alerts */}
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

      {loading ? (
        <div className="glass-panel p-12 rounded-md text-center text-slate-400 text-xs border border-slate-800 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> Loading article content...
        </div>
      ) : (
        /* Editor Form */
        <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 sm:p-8 rounded-md border border-slate-800">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase text-slate-400">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title..."
              className="w-full px-3.5 py-2.5 rounded-md bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-semibold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase text-slate-400">
              Post Content (TipTap WYSIWYG Editor)
            </label>
            <TiptapEditor content={contentHtml} onChange={setContentHtml} />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <Link
              href="/posts"
              className="px-4 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
              <Save className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
