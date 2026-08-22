'use client';

import React from 'react';
import CountUp from './CountUp';

export default function SanjayExperience() {
  const highlights = [
    {
      metric: 80,
      suffix: '%+',
      label: 'Friction Reduction',
      description: 'Heuristic audits and platform redesigns eliminating enterprise application friction.',
    },
    {
      metric: 68,
      suffix: '%',
      label: 'Faster Contract Turnaround',
      description: 'Structured taxonomy and automation for enterprise authoring & estimation systems.',
    },
    {
      metric: 50,
      suffix: '%',
      label: 'Fewer Support Tickets',
      description: 'Telemetry-driven error handling and clear data-dense dashboards.',
    },
  ];

  const tcsBullets = [
    'Conducted heuristic UX audits and redesigned enterprise platforms, reducing task friction by 80%+.',
    'Rebuilt the eSOW contract authoring system, cutting cycle times by 68% for global delivery teams.',
    'Delivered end-to-end UX for TM System (TMS) and Enterprise Search, streamlining operational clarity.',
    'Engineered multi-state Design System libraries in Figma with strict WCAG 2.2 AA accessibility.',
  ];

  return (
    <section id="experience" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-1.5">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Work History &amp; Leadership
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Professional Experience
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Enterprise Scale &bull; Systems Design &bull; AI Workflows
            </span>
          </div>
        </div>

        {/* Side-by-Side Layout: TCS Experience + 3 Impact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: TCS Role (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-8 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-2.5 border-b border-black/5 dark:border-white/10 pb-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Oct 2022 &mdash; Present &bull; Hyderabad, India
                </span>
                <span className="text-[11px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50 font-bold">
                  Enterprise SaaS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Tata Consultancy Services
              </h3>
              <p className="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300">
                Lead Product Designer &bull; Enterprise Systems &amp; AI Workflows
              </p>
            </div>

            {/* Crisp 4 Bullet Highlights */}
            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {tcsBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-blue-600 dark:text-blue-400 mt-1 shrink-0 font-bold text-base">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {['Enterprise SaaS', 'Design Systems', 'Figma', 'UX Audits', 'TMS', 'Information Architecture', 'WCAG 2.2 AA', 'AI Prototyping'].map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3 Metric Cards Stacked (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
            {highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-1 p-5 rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/10 dark:border-white/10 flex flex-col justify-center space-y-1 shadow-sm hover:border-blue-500/30 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  <CountUp value={item.metric} suffix={item.suffix} duration={2.2} />
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {item.label}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
