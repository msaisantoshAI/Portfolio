'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import QueryModal from './QueryModal';

interface ProjectItem {
  title: string;
  problem: string;
  role: string;
  impactMetric: number;
  impactSuffix: string;
  impactPrefix?: string;
  impactDecimals?: number;
  impactLabel: string;
  image: string;
  link?: string;
  actionText: string;
}

const projects: ProjectItem[] = [
  {
    title: 'eSOW Planner',
    problem: 'Simplifying complex contract creation workflows across global enterprise delivery teams.',
    role: 'Lead Product Designer · Enterprise SaaS',
    impactMetric: 68,
    impactSuffix: '%',
    impactLabel: 'faster authoring cycle time (12,000+ SOWs/year, $45M contract value)',
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    actionText: 'View Case Study',
  },
  {
    title: 'AI Orchestration Workspace',
    problem: 'Designing human-in-the-loop controls for complex multi-agent generative systems.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
    impactMetric: 4.2,
    impactSuffix: 'x',
    impactDecimals: 1,
    impactLabel: 'faster iteration speed for testing agent reasoning chains',
    image: '/images/hero-video.mp4',
    actionText: 'View Project',
  },
  {
    title: 'SAS + HRMS Integration',
    problem: 'Unifying critical telemetry alerts and field workforce rosters for power grid operations.',
    role: 'Product UX Designer · Information Architecture',
    impactMetric: 52,
    impactSuffix: '%',
    impactLabel: 'reduction in incident dispatch latency during emergency grid faults',
    image: '/images/project_sas_1775675939361.png',
    actionText: 'View Project',
  },
  {
    title: 'EMULATE Virtual Cloud',
    problem: 'Removing friction for developers spinning up remote engineering sandbox clusters.',
    role: 'UI/UX Architect · Systems & Prototype Design',
    impactMetric: 80,
    impactSuffix: '%',
    impactLabel: 'drop in setup friction for distributed developer squads',
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'View Project',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-1.5">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Selected Work &amp; Experience
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Solving Complex Product Problems
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Tata Consultancy Services &bull; Enterprise SaaS &bull; AI Workflows
            </span>
          </div>
        </div>

        {/* 4 Strongest Project Cards (Problem -> Contribution -> Impact) */}
        <div className="flex flex-col gap-6 sm:gap-8 pt-2">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 sm:p-8 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 group shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Column: Project Name -> Problem -> Role -> Impact -> CTA (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  
                  {/* Role & Domain Badge */}
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                      {project.role}
                    </span>
                  </div>

                  {/* Project Name & One-Line Problem */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {project.problem}
                    </p>
                  </div>

                  {/* Measurable Impact Box */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#0c111e] border border-black/5 dark:border-white/10 flex items-center gap-4 shadow-2xs">
                    <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 shrink-0 font-mono">
                      <CountUp
                        value={project.impactMetric}
                        prefix={project.impactPrefix}
                        suffix={project.impactSuffix}
                        decimals={project.impactDecimals || 0}
                        duration={2.0}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 block">
                        Measurable Impact
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-snug">
                        {project.impactLabel}
                      </p>
                    </div>
                  </div>

                  {/* Clear Action Link */}
                  <div className="pt-2">
                    {project.link ? (
                      <Link
                        href={project.link}
                        className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Frame (5 Cols) */}
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-sm">
                  {project.image.endsWith('.mp4') ? (
                    <video
                      src={project.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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
