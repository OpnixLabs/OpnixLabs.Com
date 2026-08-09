import React from 'react';
import Link from 'next/link';
import { Code, Server, Bot, Shield, Globe, Layers, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Code className="w-5 h-5 text-cyan-400" />,
      title: 'Full-Stack Web Engineering',
      description: 'Crafting ultra-responsive Next.js application interfaces with TypeScript, Tailwind CSS, and Server Components for optimal render speeds.',
    },
    {
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      title: 'High-Performance Go APIs',
      description: 'Building microservice backends, REST APIs, and background job queues in Go with low memory footprints and microsecond execution.',
    },
    {
      icon: <Bot className="w-5 h-5 text-cyan-400" />,
      title: 'Generative AI & LLM Automation',
      description: 'Integrating Google GenAI (Gemini) models, automated content generation cron jobs, and agentic workflows directly into business products.',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'Serverless DB & ORM Systems',
      description: 'Designing resilient database schemas on Neon PostgreSQL with type-safe Drizzle ORM queries and seamless data migrations.',
    },
    {
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      title: 'Cloud Infrastructure & DevOps',
      description: 'Containerizing services with Docker, deploying edge functions, and configuring continuous delivery pipelines.',
    },
    {
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      title: 'API Security & Audit',
      description: 'Implementing JWT authentication, rate limiting, data encryption at rest/transit, and strict security posture reviews.',
    },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Our Engineering <span className="gradient-text">Offerings</span></h1>
        <p className="text-slate-400 text-sm sm:text-base">From zero-to-one startups to enterprise software overhauls, we deliver robust solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div key={i} className="glass-panel p-6 rounded-md glass-panel-hover border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{service.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                Inquire Service <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

