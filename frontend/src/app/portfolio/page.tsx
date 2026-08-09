import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PortfolioPage() {
  const projects = [
    {
      title: 'NeonPulse Analytics Platform',
      category: 'Full-Stack & Cloud Database',
      tech: ['Next.js', 'Go', 'Neon Postgres', 'Drizzle ORM'],
      description: 'Real-time telemetry dashboard analyzing millions of event logs per second with sub-50ms latency.',
    },
    {
      title: 'AutoBlog AI Engine',
      category: 'GenAI & Scheduled Systems',
      tech: ['Go', 'Gemini 2.5', 'robfig/cron', 'Tailwind CSS'],
      description: 'Autonomous content generation pipeline continuously curating industry analysis and publishing formatted articles.',
    },
    {
      title: 'HyperDrive SaaS Portal',
      category: 'Enterprise Web Application',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Chi Router'],
      description: 'Customer management workflow interface featuring live document collaboration and interactive WYSIWYG editing.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Engineering <span className="gradient-text">Portfolio</span></h1>
        <p className="text-slate-400 text-sm sm:text-base">A showcase of production systems and client innovations engineered by our team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="glass-panel rounded-md p-6 glass-panel-hover border border-slate-800 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Pill shaped category badge */}
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
                  {project.category}
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

