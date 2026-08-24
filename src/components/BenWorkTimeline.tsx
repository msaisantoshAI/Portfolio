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
    outcome: 'reduction in SOW authoring cycle time across global teams',
    problem: 'Rebuilt pricing matrices and authoring workflows to eliminate weeks of manual delivery delay.',
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
    outcome: 'faster iteration speed for testing multi-agent chains',
    problem: 'Visual prompt tree canvas with streaming state feedback for complex multi-agent LLM systems.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
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
    outcome: 'reduction in emergency incident dispatch latency',
    problem: 'Unified disparate hardware telemetry and legacy rosters into a real-time operator console.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    actionText: 'Explore Architecture',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandboxes',
    outcomeMetricValue: 80,
    outcomeMetricSuffix: '%',
    outcome: 'drop in developer environment setup friction',
    problem: 'One-click cloud sandboxes eliminating local virtualization conflicts for distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'Explore Sandbox',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderCardContent = (item: WorkItem) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
      {/* Left Column: Case Study Details (6 Cols) */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
        {/* Category, Year & Click Indicator */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
              {item.category}
            </span>
            <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
              {item.year}
            </span>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{item.actionText}</span>
            <span>&rarr;</span>
          </span>
        </div>

        {/* Title & Core Problem */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
            {item.problem}
          </p>
        </div>

        {/* Impact Metric Highlight with Live CountUp */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center gap-3.5">
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

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {item.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Visual Mockup / Video (6 Cols) */}
      <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-sm">
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
  );

  return (
    <section id="work" className="px-4 py-8 sm:py-12 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full font-sans">
      {/* Sticky Overlapping Project Cards Stack with Integrated Header */}
      <div className="relative flex flex-col gap-6 sm:gap-8 pb-10">
        {workItems.map((item, idx) => {
          const topOffset = 84 + idx * 18;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              style={{
                top: `${topOffset}px`,
                zIndex: idx + 10,
              }}
              className="sticky rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-5 sm:p-7 md:p-8 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 group hover:border-blue-500/40 hover:shadow-2xl"
            >
              {/* Integrated Header at the top of Card 1 */}
              {idx === 0 && (
                <div className="border-b border-black/5 dark:border-white/10 pb-3.5 mb-3.5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div className="space-y-1">
                    <p className="eyebrow text-blue-600 dark:text-blue-400">
                      Featured Case Studies
                    </p>
                    <h2 className="section-heading text-zinc-900 dark:text-white">
                      Selected Case Studies
                    </h2>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    (Scroll to explore stacked projects)
                  </span>
                </div>
              )}

              {item.link ? (
                <Link href={item.link} className="block w-full text-left outline-none cursor-pointer">
                  {renderCardContent(item)}
                </Link>
              ) : (
                <div 
                  onClick={() => setIsModalOpen(true)} 
                  role="button" 
                  tabIndex={0} 
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true); }}
                  className="block w-full text-left outline-none cursor-pointer"
                >
                  {renderCardContent(item)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
