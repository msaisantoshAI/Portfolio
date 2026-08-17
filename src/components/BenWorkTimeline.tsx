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
    category: 'Enterprise SaaS · Contract & SOW Automation',
    outcomeMetricValue: 68,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in average SOW authoring cycle time across global delivery teams',
    problem: 'Enterprise sales & engineering teams suffered 3+ weeks turnaround due to fragmented pricing matrices and manual audits.',
    role: 'Lead Product Designer · UX Architecture · Design System',
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
    outcome: 'faster iteration speed for designers & engineers testing autonomous LLM agent chains',
    problem: 'Navigating non-deterministic AI outputs and complex prompt trees caused developer confusion and poor UI feedback loops.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows', 'Prompt Canvas'],
    image: '/images/hero-video.mp4',
    actionText: 'Explore AI Workspace',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    category: 'Critical Infrastructure · High-Density Telemetry',
    outcomeMetricValue: 52,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in incident dispatch response latency for electrical grid operators',
    problem: 'Field engineers struggled with disparate hardware sensors and legacy workforce rosters during emergency grid faults.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    actionText: 'Explore System Architecture',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandbox Environments',
    outcomeMetricValue: 80,
    outcomeMetricSuffix: '%',
    outcome: 'drop in setup friction for spinning up remote engineering sandbox clusters',
    problem: 'Developers spent hours configuring local virtualization environments and debugging permission conflicts across distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'Explore Cloud Sandbox',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      
      {/* Sticky Overlapping Project Cards Stack with Integrated Header */}
      <div className="relative flex flex-col gap-10 sm:gap-14 pb-16">
        {workItems.map((item, idx) => {
          const topOffset = 100 + idx * 24;

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
              className="sticky rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 group space-y-6"
            >
              {/* Integrated Header at the top of Card 1 */}
              {idx === 0 && (
                <div className="border-b border-black/5 dark:border-white/10 pb-5 mb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <p className="eyebrow text-blue-600 dark:text-blue-400">
                      Featured Case Studies
                    </p>
                    <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      Selected Case Studies
                    </h2>
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                    (Scroll down to explore overlapping projects)
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Case Study Details */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
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

                  {/* Impact Metric Highlight with Live CountUp Animation */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center gap-4">
                    <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 shrink-0 font-mono">
                      <CountUp
                        value={item.outcomeMetricValue}
                        prefix={item.outcomeMetricPrefix}
                        suffix={item.outcomeMetricSuffix}
                        decimals={item.outcomeMetricDecimals || 0}
                        duration={2.0}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-snug">
                      {item.outcome}
                    </p>
                  </div>

                  {/* Tags & Direct Action Button */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      {item.link ? (
                        <Link
                          href={item.link}
                          className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                        >
                          <span>{item.actionText}</span>
                          <span>&rarr;</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <span>Request Deep-Dive</span>
                          <span>&rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Column: Visual Mockup / Video */}
                <div className="lg:col-span-6 relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-md">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
