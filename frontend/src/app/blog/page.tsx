import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, Post } from '@/lib/api';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import BlogImage from '@/components/BlogImage';

export const metadata: Metadata = {
  title: 'Software Insights & Technology Blog',
  description:
    'Read latest technical articles and industry analysis on enterprise web architecture, cloud systems, and modern software engineering from OpnixLabs.',
};

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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Software & Technology Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Tech <span className="gradient-text">Insights</span></h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Articles and industry analysis on enterprise web architecture, cloud systems, and modern software engineering.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {posts.length === 0 ? (
        <div className="glass-panel p-8 rounded-md text-center max-w-lg mx-auto space-y-4 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles published yet</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Check back soon for latest insights from our senior technical team!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            const coverImages = [
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
            ];
            const fallbackUrl = coverImages[index % coverImages.length];

            // Extract image from post content_html if present
            const firstImageMatch = post.content_html.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
            const coverUrl = firstImageMatch && firstImageMatch[1] ? firstImageMatch[1] : fallbackUrl;

            return (
              <article
                key={post.id}
                className="glass-panel rounded-md overflow-hidden glass-panel-hover border border-slate-200 dark:border-slate-800 flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-900">
                  <BlogImage
                    src={coverUrl}
                    fallbackSrc={fallbackUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                    Technical Analysis
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      {dateFormatted}
                    </span>

                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {getExcerpt(post.content_html)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
