'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkItem {
  year: string;
  title: string;
  category: string;
  tagline: string;
  outcome: string;
  outcomeMetric: string;
  problem: string;
  role: string;
  tags: string[];
  image: string;
  link: string;
  isFlagship?: boolean;
}

const workItems: WorkItem[] = [
  {
    year: '2024',
    title: 'eSOW Planner',
    category: 'Enterprise SaaS · Contract & SOW Automation',
    tagline: 'End-to-end Enterprise Statement of Work Platform',
    outcomeMetric: '68%',
    outcome: 'reduction in average SOW authoring cycle time across global delivery teams',
    problem: 'Enterprise sales & engineering teams suffered 3+ weeks turnaround due to fragmented pricing matrices, manual compliance audits, and disjointed approvals.',
    role: 'Lead Product Designer · UX Architecture · Design System',
    tags: ['Enterprise SaaS', 'Workflow Automation', 'Design System', 'WCAG 2.2 AA'],
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    isFlagship: true,
  },
  {
    year: '2025',
    title: 'AI Orchestration Workspace',
    category: 'AI Interaction Design · Generative UI',
    tagline: 'Multi-Agent Canvas & Streaming UI Workspace',
    outcomeMetric: '4.2x',
    outcome: 'faster iteration speed for designers & engineers testing autonomous LLM agent chains',
    problem: 'Navigating non-deterministic AI outputs and complex prompt trees caused developer confusion and poor UI feedback loops.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows', 'Prompt Canvas'],
    image: '/images/hero-video.mp4',
    link: '/projects/esow-planner',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    category: 'Critical Infrastructure · High-Density Telemetry',
    tagline: 'Substation Automation & Field Operations Hub',
    outcomeMetric: '52%',
    outcome: 'reduction in incident dispatch response latency for electrical grid operators',
    problem: 'Field engineers struggled with disparate hardware sensors and legacy workforce rosters during emergency grid faults.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    link: '/projects/esow-planner',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandbox Environments',
    tagline: 'Frictionless Virtual Machine Control Center',
    outcomeMetric: '80%',
    outcome: 'drop in setup friction for spinning up remote engineering sandbox clusters',
    problem: 'Developers spent hours configuring local virtualization environments and debugging permission conflicts across distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    link: '/projects/esow-planner',
  },
];

export default function BenWorkTimeline() {
  return (
    <section id="work" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-xl transition-colors duration-300">
        
        {/* Section Header */}
        <div className="mb-12 space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Featured Case Studies
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Selected Case Studies
            </h2>
            <span className="text-base sm:text-xl text-zinc-500 dark:text-zinc-400 font-light">
              (Enterprise SaaS &amp; AI Systems)
            </span>
          </div>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            Proven outcomes across enterprise contract automation, high-density telemetry, and next-generation AI workflows.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12 sm:space-y-16">
          {workItems.map((item, idx) => (
            <article 
              key={idx} 
              className={`rounded-3xl border ${
                item.isFlagship 
                  ? 'border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10' 
                  : 'border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40'
              } p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                
                {/* Visual Area (~55-60% of card) */}
                <div className="w-full lg:w-[56%] shrink-0">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 shadow-md aspect-[16/10] group-hover:border-blue-500/40 transition-all duration-500">
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
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-mono font-bold bg-black/75 text-white backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-sm">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Area (~40-45% of card) */}
                <div className="w-full lg:w-[44%] flex flex-col justify-between space-y-6">
                  
                  {/* Metadata & Title */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="card-heading text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Measured Outcome Highlight Box */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-1">
                      <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                        Verified Outcome
                      </span>
                      <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-200 leading-snug">
                        <strong className="text-base text-emerald-700 dark:text-emerald-400 font-bold">{item.outcomeMetric}</strong> {item.outcome}
                      </p>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-1 pt-1">
                      <span className="caption-meta font-mono font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        The Challenge:
                      </span>
                      <p className="body-copy text-zinc-600 dark:text-zinc-300">
                        {item.problem}
                      </p>
                    </div>

                    {/* My Role */}
                    <div className="space-y-1">
                      <span className="caption-meta font-mono font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                        My Contribution:
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <Link
                        href={item.link}
                        className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-md group-hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Read case study &rarr;
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
