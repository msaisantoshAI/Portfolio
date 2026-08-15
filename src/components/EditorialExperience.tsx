'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    period: '2022 — PRESENT',
    role: 'Lead Product Designer (TMS & Enterprise AI)',
    company: 'Tata Consultancy Services (TCS)',
    location: 'Hyderabad, India',
    description: 'Spearheading product design and design system architecture for enterprise operations and incident management software. Orchestrated the transition from legacy fragmented tools into a unified, responsive interface with automated triage workflows.',
    impact: 'Accelerated incident triage velocity by 80% and trained 120+ cross-functional engineers on tokenized design system adoption.',
    tags: ['Enterprise SaaS', 'Design Leadership', 'WCAG 2.2 AA', 'Token Systems', 'Figma']
  },
  {
    period: '2021 — 2022',
    role: 'AI UX & Digital Product Architect',
    company: 'Enterprise & AI Consulting',
    location: 'Remote / Global',
    description: 'Advised early-stage teams and enterprise clients on cognitive UI architecture, human-in-the-loop validation dashboards, and agentic workflow interfaces. Translated intricate machine learning state models into predictable user mental models.',
    impact: 'Shipped 6 production web applications with verifiable accessibility benchmarks and sub-second interaction feedback.',
    tags: ['Generative UI', 'Human-in-the-Loop', 'Agent Workflows', 'Next.js', 'React']
  },
  {
    period: '2019 — 2021',
    role: 'Visual & Interaction Designer',
    company: 'Studio Craft & Digital Systems',
    location: 'Hyderabad, India',
    description: 'Synthesized Bachelor of Fine Arts (BFA) foundations in visual composition, proportion, and color theory into high-fidelity digital interfaces, brand identity systems, and spatial web layouts.',
    impact: 'Created design token foundations and multi-device interaction guidelines across 15+ client brand ecosystems.',
    tags: ['Fine Arts', 'Visual Hierarchy', 'Typography Scale', 'Brand Systems']
  }
];

export default function EditorialExperience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          04 // EXPERIENCE
        </span>
        <div className="h-px w-12 bg-blue-500/30 dark:bg-blue-400/30" />
      </motion.div>

      {/* 2. SECTION HEADLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-14 sm:mb-20 max-w-3xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Career &amp; Leadership History
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          A track record of leading product design, shipping mission-critical systems, and mentoring cross-functional teams.
        </p>
      </motion.div>

      {/* 3. CLEAN VERTICAL TIMELINE ROWS */}
      <div className="space-y-12 sm:space-y-16">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="pb-12 sm:pb-16 border-b border-slate-200/60 dark:border-white/10 last:border-b-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left Column: Period & Location */}
              <div className="lg:col-span-3">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider block mb-1">
                  {exp.period}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  {exp.location}
                </span>
              </div>

              {/* Center Column: Role, Company & Story */}
              <div className="lg:col-span-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                  {exp.role}
                </h3>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 block mb-4">
                  {exp.company}
                </span>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block mb-0.5">
                    Measurable Result:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium">
                    {exp.impact}
                  </p>
                </div>
              </div>

              {/* Right Column: Tags */}
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 pt-2 lg:pt-0">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
