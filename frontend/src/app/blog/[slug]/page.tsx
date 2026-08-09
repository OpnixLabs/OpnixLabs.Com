import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/api';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | OpnixLabs Blog',
      description: 'The requested technical blog post could not be found.',
    };
  }

  const plainExcerpt = post.content_html.replace(/<[^>]+>/g, ' ').substring(0, 155).trim();

  return {
    title: `${post.title} | OpnixLabs`,
    description: plainExcerpt,
    openGraph: {
      title: post.title,
      description: plainExcerpt,
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isAIGenerated = post.slug.includes('gemini') || post.slug.includes('ai');

  return (
    <article className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center border-b border-slate-800 pb-8">
        <div className="flex items-center justify-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
          >
            {isAIGenerated && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
            {isAIGenerated ? 'Gemini AI Auto-Generated' : 'Technical Analysis'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {dateFormatted}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Article Body Content - 6px rounded */}
      <div className="glass-panel p-6 sm:p-10 rounded-md border border-slate-800">
        <div
          className="prose prose-invert max-w-none text-slate-200"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </div>

      {/* Article Footer */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>Written & Published via OpnixLabs Go Backend Engine</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
        >
          Explore More Tech Insights →
        </Link>
      </div>
    </article>
  );
}

