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
    impactLabel: 'faster authoring cycle time (12,000+ SOWs/year, $45M contract value)',
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
    impactLabel: 'reduction in incident dispatch latency during emergency grid faults',
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
    impactLabel: 'drop in setup friction for distributed developer squads',
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'View Project',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-4 py-12 sm:py-16 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="space-y-8">
        
        {/* Minimal Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1.5">
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              01 &bull; Selected Work
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-zinc-950 dark:text-white tracking-tight">
              Solving Complex Product Problems
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Problem &rarr; Contribution &rarr; Measurable Impact
          </div>
        </div>

        {/* Minimalist Architectural Project Stack */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-3xl bg-white dark:bg-[#121214] border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 md:p-10 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 group shadow-xs hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Content Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                      /{project.id}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                      {project.role}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-xl">
                      {project.problem}
                    </p>
                  </div>

                  {/* Measurable Impact Metric Box */}
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/30 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-5">
                    <div className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white shrink-0 font-mono tracking-tight">
                      <CountUp
                        value={project.impactMetric}
                        prefix={project.impactPrefix}
                        suffix={project.impactSuffix}
                        decimals={project.impactDecimals || 0}
                        duration={2.0}
                      />
                    </div>
                    <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block font-semibold">
                        Impact Outcome
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-snug">
                        {project.impactLabel}
                      </p>
                    </div>
                  </div>

                  {/* Minimalist Action CTA */}
                  <div className="pt-2">
                    {project.link ? (
                      <Link
                        href={project.link}
                        className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm shadow-xs hover:opacity-90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Visual Frame (5 cols) */}
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xs">
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
