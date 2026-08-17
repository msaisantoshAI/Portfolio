'use client';

import React from 'react';
import CountUp from './CountUp';

export default function SanjayExperience() {
  const highlights = [
    {
      metric: 80,
      suffix: '%+',
      label: 'Reduction in recurring issues',
      description: 'Conducted heuristic audits and redesigned complex enterprise platforms to eliminate estimation friction.',
    },
    {
      metric: 50,
      suffix: '%',
      label: 'Fewer employee support tickets',
      description: 'Engineered streamlined user dashboards and telemetry-driven error handling across enterprise operations.',
    },
    {
      metric: 68,
      suffix: '%',
      label: 'Faster contract turnaround',
      description: 'Architected scalable design solutions and structured taxonomy for the Enterprise Resource Management systems.',
    },
  ];

  const tcsBullets = [
    'Conducted heuristic evaluations and UX audits to identify usability gaps and improve enterprise workflow efficiency.',
    'Redesigned internal customer platforms with user-centric dashboards and streamlined estimation workflows, reducing task time and improving operational visibility.',
    'Delivered end-to-end UX solutions for TM System (TMS), enhancing resource tracking and operational clarity across global squads.',
    'Rebuilt the Enterprise Search experience, designing a structured "All Results" page that improved information hierarchy and discovery.',
    'Engineered multi-state Design System component libraries and interaction tokens in Figma, ensuring WCAG 2.2 AA accessibility.',
    'Collaborated cross-functionally with product managers and front-end engineering teams to align UX strategy with business delivery goals.',
  ];

  return (
    <section id="experience" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-6">
          <div className="space-y-2">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Work History &amp; Leadership
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Professional Experience
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Enterprise Scale &bull; Systems Design &bull; AI Workflows
            </span>
          </div>
        </div>

        {/* Cohesive Side-by-Side Experience Layout (TCS Experience + 3 Impact Cards Next To It) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Tata Consultancy Services Role & Responsibilities (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-8 md:p-10 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3 border-b border-black/5 dark:border-white/10 pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Oct 2022 &mdash; Present &bull; Hyderabad, India
                </span>
                <span className="text-[11px] font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20 font-bold">
                  Enterprise SaaS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Tata Consultancy Services
              </h3>
              <p className="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300">
                Lead Product Designer &times; Enterprise Systems &amp; AI Workflows
              </p>
            </div>

            {/* Bullet Highlights */}
            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {tcsBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-blue-500 mt-1 shrink-0 font-bold text-base">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/10">
              {['Enterprise SaaS', 'Design Systems', 'Figma', 'UX Audits', 'TMS', 'Information Architecture', 'WCAG 2.2 AA', 'AI Prototyping'].map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full shadow-2xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3 Metric Cards Stacked Next to Experience (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {highlights.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-1 p-5 sm:p-6 rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/10 dark:border-white/10 flex flex-col justify-center space-y-1.5 shadow-sm hover:border-blue-500/30 transition-all"
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
