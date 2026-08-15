'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CASE_STUDIES = [
  {
    num: '01',
    year: '2024',
    category: 'Enterprise SaaS · Contract & SOW Automation',
    title: 'eSOW Planner',
    description: 'A comprehensive enterprise SaaS platform engineered to eliminate multi-week contract approval bottlenecks. Replaced fragmented spreadsheets and static email threads with a real-time clause composer, dynamic pricing matrix, and role-governed review lifecycle.',
    outcome: '68% reduction in average SOW authoring cycle time & zero compliance regressions across 450+ client contracts.',
    tags: ['Enterprise SaaS', 'Workflow Automation', 'Design System', 'WCAG 2.2 AA'],
    image: '/images/esow-planner.png',
    link: '/projects/esow-planner',
    isExternal: false,
    color: 'from-blue-600/20 to-cyan-600/20'
  },
  {
    num: '02',
    year: '2024',
    category: 'Enterprise AI · Agent Workflows & HITL Systems',
    title: 'AI Orchestration Workspace',
    description: 'An advanced cognitive interface designed for enterprise incident triage. Enables operators to coordinate autonomous LLM subagents, review suggested remediations with verifiable citations, and maintain complete human-in-the-loop governance.',
    outcome: 'Automated 80% of repetitive operational triage while reducing critical escalation MTTR by 42%.',
    tags: ['Generative UI', 'Human-in-the-Loop', 'Multi-Agent', 'Real-Time Telemetry'],
    image: '/images/ai-workspace.png',
    link: '/projects/ai-workspace',
    isExternal: false,
    color: 'from-purple-600/20 to-blue-600/20'
  },
  {
    num: '03',
    year: '2023',
    category: 'Operations SaaS · Unified Workflow Portal',
    title: 'SAS + HRMS Integration',
    description: 'Unified 14 fragmented legacy internal enterprise tools into a singular, responsive workforce command center. Standardized typography, component states, and micro-interactions across cross-departmental operations.',
    outcome: 'Boosted daily internal task completion velocity by 54% and trained 120+ engineers on tokenized design system adoption.',
    tags: ['Design System', 'Information Architecture', 'Enterprise Portal', 'Micro-Interactions'],
    image: '/images/sas-hrms.png',
    link: '/projects/sas-hrms',
    isExternal: false,
    color: 'from-emerald-600/20 to-teal-600/20'
  },
  {
    num: '04',
    year: '2023',
    category: 'Cloud Infrastructure · Sandbox & Testing Console',
    title: 'EMULATE Virtual Cloud',
    description: 'A developer-centric cloud sandbox platform for instantaneously provisioning isolated testing environments. Streamlined intricate cloud topologies into a visual, node-based infrastructure canvas.',
    outcome: 'Reduced sandbox environment provisioning latency from 45 minutes down to 90 seconds.',
    tags: ['Cloud Infrastructure', 'Developer Tooling', 'Canvas UI', 'Real-time State'],
    image: '/images/emulate-cloud.png',
    link: '/projects/emulate-cloud',
    isExternal: false,
    color: 'from-amber-600/20 to-orange-600/20'
  }
];

export default function EditorialWork() {
  return (
    <section id="work" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          02 // SELECTED WORK
        </span>
        <div className="h-px w-12 bg-blue-500/30 dark:bg-blue-400/30" />
      </motion.div>

      {/* 2. SECTION HEADLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16 sm:mb-24 max-w-3xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Featured Systems &amp; Case Studies
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          A selection of enterprise SaaS platforms, AI orchestration workspaces, and design systems shipped to production.
        </p>
      </motion.div>

      {/* 3. ALTERNATING CASE STUDY BLOCKS */}
      <div className="space-y-24 sm:space-y-36">
        {CASE_STUDIES.map((project, i) => {
          const isEven = i % 2 === 1; // Project 02 and 04 have Image Left, Text Right
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Column (5 cols) */}
              <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                
                {/* Small Meta */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {project.num} &bull; {project.year}
                  </span>
                </div>

                {/* Category */}
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
                  {project.category}
                </span>

                {/* Large Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Outcome Badge */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 mb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                    Key Impact:
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200 leading-snug">
                    {project.outcome}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action */}
                <div>
                  <Link
                    href={project.link}
                    className="touch-target group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    Read case study
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>

              </div>

              {/* Visual Column (7 cols) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Link href={project.link} className="block group">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} Preview Interface`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      quality={90}
                    />

                    {/* Subtle inner border overlay */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />

                    {/* Hover pill */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Explore case study &rarr;
                    </div>
                  </motion.div>
                </Link>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
