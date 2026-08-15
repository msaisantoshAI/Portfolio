'use client';

import React from 'react';
import CountUp from './CountUp';

export default function SanjayExperience() {
  const highlights = [
    {
      metric: 80,
      suffix: '%+',
      label: 'Reduction in recurring application issues',
      description: 'Conducted heuristic audits and redesigned complex enterprise platforms to eliminate friction and streamline estimation workflows.',
    },
    {
      metric: 50,
      suffix: '%',
      label: 'Fewer employee-raised support tickets',
      description: 'Engineered streamlined user dashboards and telemetry-driven error handling across enterprise operations.',
    },
    {
      metric: 68,
      suffix: '%',
      label: 'Faster turnaround for contract authoring',
      description: 'Architected scalable design solutions and structured taxonomy for the Enterprise Resource Management & Search systems.',
    },
  ];

  const tcsBullets = [
    'Conducted heuristic evaluations and UX audits to identify usability gaps and improve enterprise workflow efficiency.',
    'Redesigned internal customer platforms with user-centric dashboards and streamlined estimation workflows, reducing task time and improving operational visibility.',
    'Delivered end-to-end UX solutions for TM System (TMS), enhancing resource tracking and operational clarity across global squads.',
    'Rebuilt the Enterprise Search experience, designing a structured "All Results" page that improved information hierarchy and discovery.',
    'Engineered multi-state Design System component libraries and interaction tokens in Figma, ensuring WCAG 2.2 AA accessibility and consistency.',
    'Collaborated cross-functionally with product managers and front-end engineering teams to align UX strategy with business delivery goals.',
  ];

  return (
    <section id="experience" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
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

        {/* Live Animated Impact Metrics Counter Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/5 dark:border-white/10 flex flex-col justify-between space-y-2 group hover:border-blue-500/30 transition-all"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400">
                <CountUp value={item.metric} suffix={item.suffix} duration={2.2} />
              </div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {item.label}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Streamlined Single Role Card: Tata Consultancy Services */}
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-black/30 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                Oct 2022 &mdash; Present &bull; Hyderabad, India
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Tata Consultancy Services
              </h3>
              <p className="text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300">
                Lead Product Designer &times; Enterprise Systems &amp; AI Workflows
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/20 font-bold">
                Enterprise SaaS
              </span>
            </div>
          </div>

          {/* Clean 2-Column Responsive Highlights */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
            {tcsBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <span className="text-blue-500 mt-1 shrink-0 font-bold text-base">&bull;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Skill Token Chips */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 dark:border-white/5">
            {['Enterprise SaaS', 'Design Systems', 'Figma', 'UX Audits', 'TMS', 'Information Architecture', 'WCAG 2.2 AA', 'AI Prototyping'].map((tag, tIdx) => (
              <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full shadow-2xs hover:border-blue-400/40 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
