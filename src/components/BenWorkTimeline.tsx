'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import QueryModal from './QueryModal';

interface WorkItem {
  year: string;
  title: string;
  category: string;
  outcome: string;
  outcomeMetricValue: number;
  outcomeMetricPrefix?: string;
  outcomeMetricSuffix?: string;
  outcomeMetricDecimals?: number;
  problem: string;
  role: string;
  tags: string[];
  image: string;
  link?: string;
  actionText: string;
  isFlagship?: boolean;
}

const workItems: WorkItem[] = [
  {
    year: '2024',
    title: 'eSOW Planner',
    category: 'Enterprise SaaS · Contract Automation',
    outcomeMetricValue: 68,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in average SOW authoring cycle time across global teams',
    problem: 'Streamlined unstructured pricing and contract workflows across 10+ countries into a guided, wizard-based enterprise platform.',
    role: 'Lead Product Designer · End-to-End',
    tags: ['Enterprise SaaS', 'Workflow Automation', 'Design System', 'WCAG 2.2 AA'],
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    actionText: 'View Case Study',
    isFlagship: true,
  },
  {
    year: '2025',
    title: 'AI Orchestration Workspace',
    category: 'AI Interaction Design · Generative UI',
    outcomeMetricValue: 4.2,
    outcomeMetricSuffix: 'x',
    outcomeMetricDecimals: 1,
    outcome: 'faster iteration speed for designers & engineers testing agent chains',
    problem: 'Designed interactive canvas patterns for chaining multi-agent reasoning, streaming states, and confidence controls.',
    role: 'Product Designer & AI Prototyper',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows', 'Prompt Canvas'],
    image: '/images/hero-video.mp4',
    actionText: 'Explore AI Workspace',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    category: 'Critical Infrastructure · Telemetry',
    outcomeMetricValue: 52,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in incident dispatch latency for electrical grid operators',
    problem: 'Architected high-density telemetry dashboards unifying disparate hardware alerts and workforce rosters during critical faults.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Telemetry', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    actionText: 'Explore Architecture',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandboxes',
    outcomeMetricValue: 80,
    outcomeMetricSuffix: '%',
    outcome: 'drop in setup friction for spinning up remote engineering sandbox clusters',
    problem: 'Turned complex command-line container setup into a 1-click cloud sandbox environment for distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'Developer Experience', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'Explore Sandbox',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-black/5 dark:border-white/10 pb-4">
          <div className="space-y-1">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Featured Case Studies
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Selected Works
            </h2>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {workItems.length} Featured Projects &bull; Enterprise &amp; AI
          </span>
        </div>

        {/* Sequential Project Cards (One after another with clear CTAs) */}
        <div className="flex flex-col gap-6 sm:gap-8 pt-2">
          {workItems.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 sm:p-8 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 group shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Column: Details & Metric & Clear CTA Button (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  {/* Category & Year */}
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Concise Summary */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  {/* Highlight Metric Card */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0c111e] border border-black/5 dark:border-white/10 flex items-center gap-3.5 shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 shrink-0 font-mono">
                      <CountUp
                        value={item.outcomeMetricValue}
                        prefix={item.outcomeMetricPrefix}
                        suffix={item.outcomeMetricSuffix}
                        decimals={item.outcomeMetricDecimals || 0}
                        duration={2.0}
                      />
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-snug">
                      {item.outcome}
                    </p>
                  </div>

                  {/* Tags & Clear CTA Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.link ? (
                      <Link
                        href={item.link}
                        className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{item.actionText}</span>
                        <span>&rarr;</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs shadow-md hover:opacity-90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>{item.actionText}</span>
                        <span>&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Frame (5 Cols) */}
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-sm">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
