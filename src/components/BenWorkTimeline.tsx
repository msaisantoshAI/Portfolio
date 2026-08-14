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
    year: '2023 — Present',
    title: 'TM System (TMS) & Estimation Platform',
    category: 'Enterprise SaaS · TCS Core Platform',
    tagline: 'Resource Tracking & Streamlined Estimation Workflows',
    outcomeMetric: '80%+',
    outcome: 'reduction in recurring application issues and 50% decrease in employee-raised tickets',
    problem: 'Internal customer platforms and resource allocation systems suffered from high cognitive load, redundant data entry, and fragmented estimation workflows.',
    role: 'AI-UX Designer · Heuristic Audits · Dashboard Architecture · Design System',
    tags: ['TCS Enterprise', 'Heuristic Audits', 'TMS System', 'Design Systems', 'WCAG 2.2 AA'],
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    isFlagship: true,
  },
  {
    year: '2023 — 2024',
    title: 'Enterprise Unified Search ("All Results")',
    category: 'Enterprise Architecture · Search & Retrieval',
    tagline: 'Structured Multi-Entity Search Hierarchy',
    outcomeMetric: '100%',
    outcome: 'structured hierarchy overhaul resolving search usability bottlenecks and query chaos',
    problem: 'Enterprise users faced confusing, disjointed search result lists that lacked clear categorization, filtering facets, and visual clarity across enterprise entities.',
    role: 'UX Designer · Information Architecture · Figma/XD Interactive Specs',
    tags: ['Search UX', 'Information Architecture', 'Figma Prototyping', 'User Research'],
    image: '/images/project_sas_1775675939361.png',
    link: '/projects/esow-planner',
  },
  {
    year: '2024 — Present',
    title: 'AI-UX Agent Orchestration Canvas',
    category: 'AI Interaction Design · Generative UI',
    tagline: 'Human-in-the-Loop Multi-Agent Interface',
    outcomeMetric: '4.2x',
    outcome: 'faster prototyping cycles and higher trust in non-deterministic AI agent outputs',
    problem: 'Complex multi-agent chains and generative models created black-box confusion for users requiring real-time transparency and state inspection.',
    role: 'AI-UX Researcher & Prototyper · Prompt Canvas · Antigravity & Framer',
    tags: ['AI-UX', 'Generative UI', 'Agent Workflows', 'Prompt Canvas', 'Cursor / Claude'],
    image: '/images/hero-video.mp4',
    link: '/projects/esow-planner',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'Scalable Enterprise Design System & Iconography',
    category: 'Design Systems · Accessibility & Components',
    tagline: 'Multi-Product Component Library & Tokens',
    outcomeMetric: '100%',
    outcome: 'WCAG 2.2 AA compliance and consistent interaction states across product squads',
    problem: 'Disparate product teams created isolated UI patterns, resulting in inconsistent icon styles, missing accessibility states, and developer handoff friction.',
    role: 'Design System Lead · Scalable Icon Library · Token Architecture',
    tags: ['Design Systems', 'Iconography', 'WCAG 2.2 AA', 'Figma Tokens'],
    image: '/images/project_emulate_1775675955645.png',
    link: '/projects/esow-planner',
  },
];

export default function BenWorkTimeline() {
  return (
    <section id="work" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/88 dark:bg-[#081026]/88 border border-white/60 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-[0_16px_45px_rgba(20,60,140,0.12)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
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
              (Enterprise &amp; AI-UX Systems)
            </span>
          </div>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            Measurable impact delivered across TCS enterprise platforms, search architectures, and AI agent orchestration.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12 sm:space-y-16">
          {workItems.map((item, idx) => (
            <article 
              key={idx} 
              className={`rounded-3xl border ${
                item.isFlagship 
                  ? 'border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20' 
                  : 'border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40'
              } p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                
                {/* Visual Area */}
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

                {/* Content Area */}
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

                    {/* Role */}
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
