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
    <section id="work" className="px-4 py-12 sm:py-16 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[36px] bg-white/95 dark:bg-[#121214]/95 border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl space-y-10 transition-colors duration-300">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
              Selected Work &bull; Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Solving Complex Product Problems
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Tata Consultancy Services &bull; Enterprise SaaS
            </span>
          </div>
        </div>

        {/* Minimalist Card Stack Layout */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-3xl bg-zinc-50/80 dark:bg-[#18181B]/80 border border-black/[0.06] dark:border-white/[0.08] p-6 sm:p-8 md:p-10 hover:border-black/25 dark:hover:border-white/25 transition-all duration-300 shadow-2xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left Side: Number, Metadata, Problem, Impact & Action (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                      {project.id}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/[0.06] dark:border-white/10">
                      {project.role}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {project.problem}
                    </p>
                  </div>

                  {/* Clean Impact Callout */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#121214] border border-black/[0.05] dark:border-white/[0.08] flex items-center gap-4">
                    <div className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white shrink-0 font-mono">
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
                        Measurable Outcome
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-snug">
                        {project.impactLabel}
                      </p>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-1">
                    {project.link ? (
                      <Link
                        href={project.link}
                        className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>{project.actionText}</span>
                        <span>&rarr;</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Right Side: Media Frame (5 cols) */}
                <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 shadow-sm">
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
