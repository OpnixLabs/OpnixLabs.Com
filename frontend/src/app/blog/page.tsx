import React from 'react';
import Link from 'next/link';
import { getPosts, Post } from '@/lib/api';
import { Sparkles, Calendar, ArrowRight, BookOpen, Bot } from 'lucide-react';

export const revalidate = 0; // Ensure Server Component always gets fresh posts

export default async function BlogListPage() {
  const posts: Post[] = await getPosts();

  // Helper to extract a short text snippet from HTML string
  const getExcerpt = (html: string) => {
    const cleanText = html.replace(/<[^>]+>/g, ' ');
    if (cleanText.length <= 160) return cleanText;
    return cleanText.substring(0, 160).trim() + '...';
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" /> Auto-Blogging & Tech Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Engineering <span className="gradient-text">Blog</span></h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Insights on Go APIs, Next.js architecture, Neon Postgres, and weekly AI auto-generated industry reports.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {posts.length === 0 ? (
        <div className="glass-panel p-8 rounded-md text-center max-w-lg mx-auto space-y-4 border border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No posts published yet</h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Trigger the weekly Gemini cron job or write your first post in the Admin Editor!
          </p>
          <Link
            href="/admin/create-post"
            className="inline-block px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const isAIGenerated = post.slug.includes('gemini') || post.slug.includes('ai');
            const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <article
                key={post.id}
                className="glass-panel rounded-md p-6 glass-panel-hover border border-slate-800 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                    >
                      {isAIGenerated && <Sparkles className="w-3 h-3 text-cyan-400" />}
                      {isAIGenerated ? 'Gemini Auto-Post' : 'Technical Insights'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateFormatted}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {getExcerpt(post.content_html)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

