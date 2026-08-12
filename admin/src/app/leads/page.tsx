'use client';

import React, { useEffect, useState } from 'react';
import { getLeads, deleteLead, updateLeadStatus, Lead } from '@/lib/api';
import { Users, Trash2, Mail, Calendar, Search, RefreshCw, CheckCircle2, Tag, AlertCircle } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLeadsData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err: any) {
      console.error('Failed to fetch leads:', err);
      setErrorMessage(err.message || 'Failed to connect to Go backend API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setErrorMessage(null);
    setMessage(null);
    try {
      setUpdatingId(id);
      await updateLeadStatus(id, newStatus);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      setMessage(`Lead status updated to '${newStatus}'.`);
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error('Lead status change error:', err);
      setErrorMessage(err.message || 'Failed to update lead status on backend server.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this lead inquiry?')) return;
    setErrorMessage(null);
    setMessage(null);
    try {
      setDeletingId(id);
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setMessage('Lead deleted successfully.');
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error('Lead delete error:', err);
      setErrorMessage(err.message || 'Failed to delete lead from backend server.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-400" /> Client Leads & Inquiries
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Total {leads.length} customer inquiries received
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeadsData}
          className="px-3.5 py-2 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Leads
        </button>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="p-4 rounded-md bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-300">Backend API Error</p>
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

      {/* Success Alert Message */}
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
            placeholder="Search leads by name, email, or message..."
            className="w-full pl-9 pr-4 py-2 rounded-md bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
          />
        </div>
      </div>

      {/* Leads Table / Cards */}
      {loading ? (
        <div className="glass-panel p-12 rounded-md text-center text-slate-400 text-xs border border-slate-800">
          Loading client leads from Go backend...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="glass-panel p-12 rounded-md text-center max-w-md mx-auto space-y-3 border border-slate-800">
          <Users className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No leads found</h3>
          <p className="text-slate-400 text-xs">
            {searchTerm ? 'No leads match your search criteria.' : 'Submissions from the main site contact form will appear here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map((lead) => {
            const dateFormatted = new Date(lead.created_at).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={lead.id}
                className="glass-panel p-5 rounded-md border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{lead.name}</h3>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono mt-0.5"
                      >
                        <Mail className="w-3 h-3" /> {lead.email}
                      </a>
                    </div>
                    
                    {/* Dynamic Status Dropdown Selector */}
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <select
                        value={lead.status || 'new'}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-md border bg-slate-900 focus:outline-none cursor-pointer ${
                          lead.status === 'contacted'
                            ? 'text-amber-400 border-amber-500/30'
                            : lead.status === 'qualified'
                            ? 'text-emerald-400 border-emerald-500/30'
                            : lead.status === 'closed'
                            ? 'text-slate-400 border-slate-700'
                            : 'text-cyan-400 border-cyan-500/30'
                        }`}
                      >
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="qualified">qualified</option>
                        <option value="closed">closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 text-xs leading-relaxed font-normal">
                    {lead.message}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" /> {dateFormatted}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(lead.id)}
                    disabled={deletingId === lead.id}
                    className="p-1.5 rounded-md hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-800 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
