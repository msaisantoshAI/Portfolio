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
    <section id="talks" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
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
            07 // TALKS &amp; WORKSHOPS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
          Public Speaking &amp; Workshops
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
          Sharing lessons on AI interface architecture, enterprise token adoption, and accessible design leadership.
        </p>
      </motion.div>

      {/* 2. TALK CARDS */}
      <div className="space-y-6 sm:space-y-8">
        {TALKS.map((talk, i) => (
          <motion.div
            key={talk.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left: Date & Scope */}
              <div className="lg:col-span-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 inline-block mb-2">
                  {talk.date}
                </span>
                <span className="text-xs font-bold text-slate-950 dark:text-white block">
                  {talk.scope}
                </span>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                  {talk.location}
                </span>
              </div>

              {/* Center & Right: Title & Summary */}
              <div className="lg:col-span-9">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-2">
                  {talk.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-normal leading-relaxed">
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
