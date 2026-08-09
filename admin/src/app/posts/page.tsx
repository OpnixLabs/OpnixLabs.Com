import React from 'react';
import Link from 'next/link';
import { getPosts, Post } from '@/lib/api';
import { FileText, Sparkles, Calendar, ExternalLink, PenSquare, Bot } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" /> Article Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Total {posts.length} articles published in database
          </p>
        </div>

        <Link
          href="/create-post"
          className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <PenSquare className="w-3.5 h-3.5" />
          Write New Article
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="glass-panel p-8 rounded-md text-center max-w-md mx-auto space-y-4 border border-slate-800">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No articles published</h3>
          <p className="text-slate-400 text-xs">Create your first blog post using the admin editor!</p>
        </div>
      ) : (
        <div className="glass-panel rounded-md border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {posts.map((post) => {
                  const isAIGenerated = post.slug.includes('gemini') || post.slug.includes('ai');
                  const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr key={post.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-5 py-4 font-bold text-white max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        >
                          {isAIGenerated ? (
                            <>
                              <Bot className="w-3 h-3 text-cyan-400" /> AI Cron
                            </>
                          ) : (
                            'Manual Post'
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-slate-400 text-[11px] max-w-xs truncate">
                        {post.slug}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                        {dateFormatted}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <a
                          href={`http://localhost:3000/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                        >
                          Main Blog <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
