'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts, deletePost, Post } from '@/lib/api';
import {
  FileText,
  Calendar,
  ExternalLink,
  PenSquare,
  Bot,
  Trash2,
  Edit,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPostsData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      setErrorMessage(err.message || 'Failed to connect to Go backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    setErrorMessage(null);
    setMessage(null);
    try {
      setDeletingId(id);
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage(`Article "${title}" deleted successfully.`);
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error('Post delete error:', err);
      setErrorMessage(err.message || 'Failed to delete post from backend database.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" /> Article Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Total {posts.length} articles published in database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchPostsData}
            className="px-3.5 py-2 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <Link
            href="/create-post"
            className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <PenSquare className="w-3.5 h-3.5" />
            Write New Article
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {errorMessage && (
        <div className="p-4 rounded-md bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-300">Error</p>
              <p className="text-red-300/80">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-white text-xs font-bold px-2 py-1 rounded bg-red-900/50 hover:bg-red-900 border border-red-700 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {message && (
        <div className="p-3.5 rounded-md bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-md bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
          />
        </div>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="glass-panel p-12 rounded-md text-center text-slate-400 text-xs border border-slate-800">
          Loading published articles...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="glass-panel p-12 rounded-md text-center max-w-md mx-auto space-y-4 border border-slate-800">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No articles found</h3>
          <p className="text-slate-400 text-xs">
            {searchTerm ? 'No articles match your search query.' : 'Create your first blog post using the admin editor!'}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-md border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredPosts.map((post) => {
                  const isAIGenerated = post.slug.includes('gemini') || post.slug.includes('ai') || post.slug.includes('architecting');
                  const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr key={post.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-5 py-4 font-mono text-slate-400 text-[11px]">#{post.id}</td>
                      <td className="px-5 py-4 font-bold text-white max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        >
                          {isAIGenerated ? (
                            <>
                              <Bot className="w-3 h-3 text-cyan-400" /> AI Generated
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
                      <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/edit-post/${post.id}`}
                          className="inline-flex items-center gap-1 p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold transition-colors"
                          title="Edit article"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="inline-flex items-center gap-1 p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 hover:border-red-700 text-xs font-semibold transition-colors disabled:opacity-50"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
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
