'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TALKS = [
  {
    date: 'SEP 2025',
    title: 'Designing with AI: Beyond Prompts into Living Interfaces',
    scope: '1,200+ Attendees',
    location: 'Tech Design Summit · Virtual Keynote',
    description: 'Deconstructing the next generation of generative user interfaces. Explored how deterministic design systems, confidence gauges, and real-time LLM orchestration create cohesive software experiences rather than chaotic chat boxes.'
  },
  {
    date: 'APR 2025',
    title: 'Tokenized Enterprise Design Systems at Scale',
    scope: '850+ Attendees',
    location: 'DesignOps Global · Hyderabad & Online',
    description: 'A masterclass for enterprise product leads on architecting token taxonomies that effortlessly synchronize Figma designs with React production repositories while maintaining strict WCAG 2.2 AA accessibility.'
  },
  {
    date: 'NOV 2024',
    title: 'Human-in-the-Loop: Trust and Verifiability in Autonomous UX',
    scope: '600+ Attendees',
    location: 'UX India Conference · Bangalore',
    description: 'Practical architectural patterns for maintaining human oversight across high-stakes automation pipelines. Addressed the cognitive ergonomics of review fatigue and how to design verifiable citation interfaces.'
  }
];

export default function EditorialTalks() {
  return (
    <section id="talks" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          07 // TALKS &amp; WORKSHOPS
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
          Public Speaking &amp; Workshops
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          Sharing lessons on AI interface architecture, enterprise token adoption, and accessible design leadership.
        </p>
      </motion.div>

      {/* 3. CHRONOLOGICAL EDITORIAL SPEAKING LIST */}
      <div className="space-y-10 sm:space-y-14">
        {TALKS.map((talk, i) => (
          <motion.div
            key={talk.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="pb-10 sm:pb-14 border-b border-slate-200/60 dark:border-white/10 last:border-b-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left: Date & Scope */}
              <div className="lg:col-span-3">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {talk.date}
                </span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                  {talk.scope}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400">
                  {talk.location}
                </span>
              </div>

              {/* Center & Right: Title & Summary */}
              <div className="lg:col-span-9">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  {talk.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed">
                  {talk.description}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
