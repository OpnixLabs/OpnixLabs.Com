import React from 'react';
import Link from 'next/link';
import { getPosts, getLeads } from '@/lib/api';
import { FileText, Users, Bot, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [posts, leads] = await Promise.all([getPosts(), getLeads()]);

  const aiPostsCount = posts.filter(
    (p) => p.slug.includes('gemini') || p.slug.includes('ai')
  ).length;

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Administrative Command Console
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">System Dashboard</h1>
        </div>

        <div className="flex gap-3">
          <Link
            href="/create-post"
            className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            Create New Article
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Grid - 6px rounded */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-md border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Published Posts</span>
            <FileText className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{posts.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-md border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase">AI Generated Posts</span>
            <Bot className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{aiPostsCount}</p>
        </div>

        <div className="glass-panel p-5 rounded-md border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Client Leads</span>
            <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{leads.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-md border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase">New Unread Leads</span>
            <Clock className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{newLeadsCount}</p>
        </div>
      </div>

      {/* Quick Action Navigation & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads Preview */}
        <div className="glass-panel p-6 rounded-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Recent Inquiries & Leads
            </h3>
            <Link href="/leads" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
              View All Leads →
            </Link>
          </div>

          {leads.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-xs py-4 text-center">No leads received yet.</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{lead.name}</span>
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">{lead.email}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-1">{lead.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Posts Preview */}
        <div className="glass-panel p-6 rounded-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Recent Published Articles
            </h3>
            <Link href="/posts" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
              Manage Posts →
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-xs py-4 text-center">No posts published yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.slice(0, 4).map((post) => (
                <div key={post.id} className="p-3 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">slug: {post.slug}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 flex-shrink-0 ml-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
