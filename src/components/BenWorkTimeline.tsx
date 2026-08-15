'use client';

import React from 'react';
import Image from 'next/image';

interface WorkItem {
  year: string;
  title: string;
  category: string;
  outcome: string;
  outcomeMetric: string;
  problem: string;
  role: string;
  tags: string[];
  image: string;
  isFlagship?: boolean;
}

const workItems: WorkItem[] = [
  {
    year: '2024',
    title: 'eSOW Planner',
    category: 'Enterprise SaaS · Contract & SOW Automation',
    outcomeMetric: '68%',
    outcome: 'reduction in average SOW authoring cycle time across global delivery teams',
    problem: 'Enterprise sales & engineering teams suffered 3+ weeks turnaround due to fragmented pricing matrices and manual audits.',
    role: 'Lead Product Designer · UX Architecture · Design System',
    tags: ['Enterprise SaaS', 'Workflow Automation', 'Design System', 'WCAG 2.2 AA'],
    image: '/images/project_esow_1775675924462.png',
    isFlagship: true,
  },
  {
    year: '2025',
    title: 'AI Orchestration Workspace',
    category: 'AI Interaction Design · Generative UI',
    outcomeMetric: '4.2x',
    outcome: 'faster iteration speed for designers & engineers testing autonomous LLM agent chains',
    problem: 'Navigating non-deterministic AI outputs and complex prompt trees caused developer confusion and poor UI feedback loops.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows', 'Prompt Canvas'],
    image: '/images/hero-video.mp4',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    category: 'Critical Infrastructure · High-Density Telemetry',
    outcomeMetric: '52%',
    outcome: 'reduction in incident dispatch response latency for electrical grid operators',
    problem: 'Field engineers struggled with disparate hardware sensors and legacy workforce rosters during emergency grid faults.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandbox Environments',
    outcomeMetric: '80%',
    outcome: 'drop in setup friction for spinning up remote engineering sandbox clusters',
    problem: 'Developers spent hours configuring local virtualization environments and debugging permission conflicts across distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
  },
];

export default function BenWorkTimeline() {
  return (
    <section id="work" className="px-4 py-8 sm:py-10 sm:px-6 md:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-md backdrop-blur-xl transition-colors duration-300">
        
        {/* Section Header */}
        <div className="mb-8 space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Featured Case Studies
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Selected Case Studies
            </h2>
            <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-light">
              (Enterprise SaaS &amp; AI Systems)
            </span>
          </div>
        </div>

        {/* Compact Case Studies Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workItems.map((item, idx) => (
            <article 
              key={idx} 
              className={`rounded-2xl border ${
                item.isFlagship 
                  ? 'border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10' 
                  : 'border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40'
              } p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="space-y-4">
                {/* Visual Preview */}
                <div className="relative w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 aspect-[16/10] group-hover:border-blue-500/40 transition-all duration-500">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      aria-label={`${item.title} video preview`}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={`${item.title} product user interface screenshot`}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[11px] font-mono font-bold bg-black/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 block">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Impact Metric */}
                  <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                    <p className="text-xs font-medium text-emerald-950 dark:text-emerald-200">
                      <strong className="text-sm text-emerald-700 dark:text-emerald-400 font-bold mr-1">{item.outcomeMetric}</strong>
                      {item.outcome}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* Tags & Coming Soon Button */}
              <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="touch-target inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 font-semibold text-xs border border-black/5 dark:border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Coming Soon
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
