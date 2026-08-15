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
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
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
            04 // EXPERIENCE
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
          Career &amp; Leadership History
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
          A track record of leading product design, shipping mission-critical systems, and mentoring cross-functional teams.
        </p>
      </motion.div>

      {/* 2. VERTICAL TIMELINE CARDS */}
      <div className="space-y-6 sm:space-y-8">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left Column: Period & Location */}
              <div className="lg:col-span-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 inline-block mb-2">
                  {exp.period}
                </span>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium block">
                  {exp.location}
                </span>
              </div>

              {/* Center Column: Role, Company & Story */}
              <div className="lg:col-span-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-1">
                  {exp.role}
                </h3>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block mb-3">
                  {exp.company}
                </span>
                <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-normal leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/10 border border-slate-300/80 dark:border-white/15">
                  <span className="text-xs font-mono font-bold text-slate-950 dark:text-white block mb-0.5">
                    Measurable Result:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-semibold">
                    {exp.impact}
                  </p>
                </div>
              </div>

              {/* Right Column: Tags */}
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 pt-2 lg:pt-0">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300/70 dark:border-white/15"
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
