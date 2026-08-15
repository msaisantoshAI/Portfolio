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
  }
];

export default function EditorialWork() {
  return (
    <section id="work" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            02 // SELECTED WORK
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
          Featured Systems &amp; Case Studies
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
          A selection of enterprise SaaS platforms, AI orchestration workspaces, and design systems shipped to production.
        </p>
      </motion.div>

      {/* 2. ALTERNATING CASE STUDY CARDS */}
      <div className="space-y-8 sm:space-y-12">
        {CASE_STUDIES.map((project, i) => {
          const isEven = i % 2 === 1; // Project 02 and 04 have Image Left, Text Right
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Text Column (5 cols) */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  {/* Small Meta */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                      {project.num} &bull; {project.year}
                    </span>
                  </div>

                  {/* Category */}
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2 font-semibold">
                    {project.category}
                  </span>

                  {/* Large Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-white tracking-tight mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-normal leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Outcome Badge */}
                  <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 mb-5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                      Key Impact:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 leading-snug">
                      {project.outcome}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300/70 dark:border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Action */}
                  <div>
                    <Link
                      href={project.link}
                      className="touch-target group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-105 active:scale-95"
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
                      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
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
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />

                      {/* Hover pill */}
                      <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Explore case study &rarr;
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
