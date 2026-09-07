'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import QueryModal from './QueryModal';

interface ProjectItem {
  id: string;
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
    id: '01',
    title: 'eSOW Planner',
    problem: 'Simplifying complex contract creation workflows across global enterprise delivery teams.',
    role: 'Lead Product Designer · Enterprise SaaS',
    impactMetric: 68,
    impactSuffix: '%',
    impactLabel: 'faster authoring cycle time (12,000+ SOWs/yr, $45M managed)',
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
    actionText: 'View Case Study',
  },
  {
    id: '02',
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
    id: '03',
    title: 'SAS + HRMS Integration',
    problem: 'Unifying critical telemetry alerts and field workforce rosters for power grid operations.',
    role: 'Product UX Designer · Information Architecture',
    impactMetric: 52,
    impactSuffix: '%',
    impactLabel: 'reduction in incident dispatch latency during emergency faults',
    image: '/images/project_sas_1775675939361.png',
    actionText: 'View Project',
  },
  {
    id: '04',
    title: 'EMULATE Virtual Cloud',
    problem: 'Removing friction for developers spinning up remote engineering sandbox clusters.',
    role: 'UI/UX Architect · Systems & Prototype Design',
    impactMetric: 80,
    impactSuffix: '%',
    impactLabel: 'drop in environment setup friction for developer squads',
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'View Project',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#28282B] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
              Selected Work &bull; Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Solving Complex Product Problems
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Tata Consultancy Services &bull; Enterprise SaaS
            </span>
          </div>
        </div>

        {/* Compact 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group rounded-2xl bg-zinc-50/90 dark:bg-[#333338]/60 border border-black/[0.06] dark:border-white/[0.08] p-5 sm:p-6 hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-4">
                {/* Media Preview Thumbnail */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-zinc-950 shadow-inner">
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

                {/* Number & Role Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-400">
                    {project.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/[0.05] dark:border-white/10">
                    {project.role}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {project.problem}
                  </p>
                </div>

                {/* Compact Measurable Outcome Metric */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white shrink-0 font-mono">
                    <CountUp
                      value={project.impactMetric}
                      prefix={project.impactPrefix}
                      suffix={project.impactSuffix}
                      decimals={project.impactDecimals || 0}
                      duration={1.8}
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-400 block">
                      Outcome
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-tight">
                      {project.impactLabel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button - Pure Text, NO ARROWS */}
              <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
                {project.link ? (
                  <Link
                    href={project.link}
                    className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                  >
                    {project.actionText}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
                  >
                    {project.actionText}
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
