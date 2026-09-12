'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import QueryModal from './QueryModal';

interface ProjectTimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  problem: string;
  role: string;
  impactMetric: number;
  impactSuffix: string;
  impactPrefix?: string;
  impactDecimals?: number;
  impactLabel: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  link?: string;
  actionText: string;
}

const timelineProjects: ProjectTimelineItem[] = [
  {
    id: '01',
    year: '2025',
    title: 'eSOW Planner',
    subtitle: 'Enterprise Contract & Workflow Automation',
    problem: 'Redesigned how global delivery teams author, price, and sign Statement of Work (SOW) documents, eliminating spreadsheet chaos with a streamlined guided authoring platform.',
    role: 'Lead Product Designer · Tata Consultancy Services',
    impactMetric: 68,
    impactSuffix: '%',
    impactLabel: 'faster authoring cycle time (12,000+ SOWs/yr, $45M managed)',
    mediaType: 'image',
    mediaSrc: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    actionText: 'Read case study',
  },
  {
    id: '02',
    year: '2025',
    title: 'AI Orchestration Workspace',
    subtitle: 'Human-in-the-Loop Multi-Agent Systems',
    problem: 'Created an AI-guided orchestration cockpit turning complex reasoning chains into visual, steerable workflows with confidence thresholds and human checkpoint approvals.',
    role: 'Product Designer & AI Prototyper · Interaction Systems',
    impactMetric: 4.2,
    impactSuffix: 'x',
    impactDecimals: 1,
    impactLabel: 'faster iteration speed for testing & validating agent reasoning chains',
    mediaType: 'video',
    mediaSrc: '/images/hero-video.mp4',
    actionText: 'View project',
  },
  {
    id: '03',
    year: '2024',
    title: 'SAS + HRMS Integration',
    subtitle: 'Critical Telemetry & Workforce Dispatch',
    problem: 'Unified high-stress telemetry alerts with real-time field engineer rosters for power grid operations, replacing fragmented screens with an automated emergency response cockpit.',
    role: 'Product UX Designer · Information Architecture',
    impactMetric: 52,
    impactSuffix: '%',
    impactLabel: 'reduction in emergency incident dispatch latency during fault states',
    mediaType: 'image',
    mediaSrc: '/images/project_sas_1775675939361.png',
    actionText: 'View project',
  },
  {
    id: '04',
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    subtitle: 'Developer Sandbox Environment Systems',
    problem: 'Redesigned developer environment setup from manual scripts to a one-click cloud sandbox workspace, removing cognitive load and accelerating squad onboarding.',
    role: 'UI/UX Architect · Systems & Prototype Design',
    impactMetric: 80,
    impactSuffix: '%',
    impactLabel: 'drop in developer environment provisioning friction & setup tickets',
    mediaType: 'image',
    mediaSrc: '/images/project_emulate_1775675955645.png',
    actionText: 'View project',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const years = Array.from(new Set(timelineProjects.map(p => p.year)));

  return (
    <section id="work" className="px-5 py-8 md:px-8 lg:px-[120px] max-w-[1440px] mx-auto w-full font-sans">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/80 dark:bg-[#28282B] border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 transition-colors duration-300">
        
        {/* Section Header - Matching benshih.design typography hierarchy */}
        <div className="mb-10 sm:mb-14 space-y-1">
          <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.02] tracking-[-1px] text-zinc-950 dark:text-white">
            Some recent work
          </h2>
          <p className="text-[17px] sm:text-[19px] lg:text-xl font-medium leading-[1.35] text-zinc-500 dark:text-zinc-400">
            (from full-time &amp; enterprise roles)
          </p>
        </div>

        {/* Vertical Sticky Timeline */}
        <div className="relative space-y-16 sm:space-y-20">
          {/* Vertical Connecting Guide Line (Desktop) */}
          <div 
            className="absolute hidden md:block left-[84px] top-4 bottom-8 w-[2px] bg-zinc-200 dark:bg-white/10" 
            aria-hidden="true"
          />

          {years.map((year) => {
            const projectsForYear = timelineProjects.filter(p => p.year === year);

            return (
              <div key={year} className="relative grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-start">
                
                {/* Left Sticky Year Column (Desktop) */}
                <div className="hidden md:flex sticky top-24 z-10 shrink-0 items-center gap-3.5 self-start pt-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-[#333338] ring-2 ring-zinc-300 dark:ring-white/20 shadow-xs">
                    <div className="h-2 w-2 rounded-full bg-zinc-950 dark:bg-white" />
                  </div>
                  <span className="text-3xl lg:text-4xl font-black font-mono tracking-tight text-zinc-400 dark:text-zinc-500">
                    {year}
                  </span>
                </div>

                {/* Right Project List */}
                <div className="space-y-14 sm:space-y-16 min-w-0">
                  {projectsForYear.map((project, idx) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      className="group space-y-5"
                    >
                      {/* Mobile Year Badge */}
                      <div className="flex items-center gap-2 md:hidden">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                          {project.year} &bull; {project.role}
                        </span>
                      </div>

                      {/* Project Header */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                            {project.title}
                          </h3>
                          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10">
                            {project.role}
                          </span>
                        </div>
                        <p className="max-w-[680px] text-sm sm:text-base lg:text-[17px] font-normal leading-[1.6] text-zinc-600 dark:text-zinc-300">
                          {project.problem}
                        </p>
                      </div>

                      {/* Rich Media Container (16:9 aspect with black frame & rounded corners) */}
                      <div className="relative w-full overflow-hidden rounded-[14px] bg-black shadow-[0px_4px_24px_rgba(0,0,0,0.12)] border border-black/10 dark:border-white/10 aspect-[16/9] sm:aspect-[16/10]">
                        {project.mediaType === 'video' ? (
                          <video
                            src={project.mediaSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                          />
                        ) : (
                          <Image
                            src={project.mediaSrc}
                            alt={project.title}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Measurable Outcome Metric Banner */}
                      <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-[#333338] border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white font-mono shrink-0">
                            <CountUp
                              value={project.impactMetric}
                              prefix={project.impactPrefix}
                              suffix={project.impactSuffix}
                              decimals={project.impactDecimals || 0}
                              duration={1.8}
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-400 block">
                              Measurable Impact
                            </span>
                            <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                              {project.impactLabel}
                            </p>
                          </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="shrink-0 pt-1 sm:pt-0">
                          {project.link ? (
                            <Link
                              href={project.link}
                              className="touch-target inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xs transition-all hover:scale-105 active:scale-95 text-center"
                            >
                              {project.actionText}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsModalOpen(true)}
                              className="touch-target inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
                            >
                              {project.actionText}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
