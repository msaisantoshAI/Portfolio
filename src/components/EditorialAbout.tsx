'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Creative Foundation',
    description: 'Rooted in fine arts and visual composition, translating dense cognitive tasks into clean, intuitive, and visually harmonious digital systems.',
    tags: ['Fine Arts', 'Visual Hierarchy', 'Design Systems', 'Micro-Interactions']
  },
  {
    num: '02',
    title: 'AI Orchestration',
    description: 'Architecting human-in-the-loop workflows, generative UI paradigms, and real-time agentic interaction models with verifiable trust.',
    tags: ['Agent Workflows', 'Generative UI', 'HITL Systems', 'LLM UX Patterns']
  },
  {
    num: '03',
    title: 'Product Leadership',
    description: 'Leading end-to-end product design lifecycles, establishing scalable token architectures, and engineering bridges for seamless production handoff.',
    tags: ['Enterprise SaaS', 'WCAG 2.2 AA', 'Design Tokens', 'Cross-Functional']
  }
];

const METRICS = [
  { value: '03+', label: 'Years', sublabel: 'Enterprise Product & AI Design' },
  { value: '20+', label: 'Systems', sublabel: 'Production Interfaces Shipped' },
  { value: '80%', label: 'Resolution', sublabel: 'Triage Acceleration (TCS TMS)' },
  { value: '100%', label: 'Compliance', sublabel: 'WCAG 2.2 AA Accessibility' },
];

export default function EditorialAbout() {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. NARRATIVE HERO CARD (Solid frosted glass container separating completely from sky) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            01 // ABOUT
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2] mb-6">
          Design is how I think.<br />
          <span className="text-blue-600 dark:text-blue-400">
            Building is how I prove it.
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-200 font-normal leading-relaxed max-w-3xl">
          I am Sai Santosh Madhari, a Product Designer and AI Builder based in Hyderabad. My work sits at the intersection of human cognitive flow, multi-agent AI orchestration, and complex enterprise software. Having designed mission-critical systems at Tata Consultancy Services (TCS) and consulted on emerging AI tools, I bridge high-fidelity craft with production engineering.
        </p>
      </motion.div>

      {/* 2. THREE COMPACT CAPABILITY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                  {cap.num}
                </span>
                <div className="w-2 h-2 rounded-full bg-blue-500/60 dark:bg-blue-400/60 group-hover:scale-150 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-normal mb-6">
                {cap.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-white/10">
              {cap.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300/70 dark:border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. RESTRAINED HORIZONTAL METRICS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/10">
          {METRICS.map((metric, i) => (
            <div key={metric.label} className={`flex flex-col ${i !== 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-tight mb-1 font-mono">
                {metric.value}
              </span>
              <span className="text-sm font-bold text-slate-950 dark:text-white">
                {metric.label}
              </span>
              <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
                {metric.sublabel}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
