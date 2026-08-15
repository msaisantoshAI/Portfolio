'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  link?: string;
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
    link: '/projects/esow-planner',
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
    <section id="work" className="px-4 py-10 sm:py-14 sm:px-6 md:px-8 max-w-[1320px] mx-auto w-full">
      
      {/* Section Header */}
      <div className="mb-10 space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
        <p className="eyebrow text-blue-600 dark:text-blue-400">
          Featured Case Studies
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Selected Case Studies
          </h2>
          <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-light">
            (Scroll down to explore overlapping projects)
          </span>
        </div>
      </div>

      {/* Sticky Overlapping Project Cards Stack */}
      <div className="relative flex flex-col gap-10 sm:gap-14 pb-16">
        {workItems.map((item, idx) => {
          const topOffset = 110 + idx * 24;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{
                top: `${topOffset}px`,
                zIndex: idx + 10,
              }}
              className="sticky rounded-[28px] sm:rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Case Study Details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Core Problem */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  {/* Impact Metric Highlight */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center gap-4">
                    <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 shrink-0 font-mono">
                      {item.outcomeMetric}
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                      {item.outcome}
                    </div>
                  </div>

                  {/* Role & Tags */}
                  <div className="space-y-3 pt-1 border-t border-black/5 dark:border-white/10">
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <strong className="text-zinc-800 dark:text-zinc-200">Role:</strong> {item.role}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-2">
                    {item.link ? (
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-transform hover:scale-105"
                      >
                        <span>View Deep Dive Case Study</span>
                        <span>&rarr;</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        <span>Enterprise Case Study</span>
                        <span>&bull;</span>
                        <span>Internal Production</span>
                      </span>
                    )}
                  </div>

                </div>

                {/* Right Column: Visual Preview Showcase */}
                <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-black/60 border border-black/10 dark:border-white/10 shadow-inner group-hover:scale-[1.01] transition-transform duration-500">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
