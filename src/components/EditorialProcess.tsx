'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    subtitle: 'Deep User Research & Cognitive Mapping',
    description: 'Deconstruct user mental models, interview domain operators, and map existing friction points across high-density workflows before writing a single requirement.',
    deliverables: ['Stakeholder Interviews', 'User Journey Maps', 'Cognitive Load Audits', 'Workflow Bottleneck Trees'],
    tools: ['FigJam', 'Dovetail', 'UserTesting']
  },
  {
    num: '02',
    title: 'STRUCTURE',
    subtitle: 'Information Architecture & State Logic',
    description: 'Architect scalable navigational structures, finite state machines, and data models to ensure every user action has predictable, deterministic feedback.',
    deliverables: ['Information Architecture', 'Finite State Machines', 'Data Flow Diagrams', 'System Scaffolding'],
    tools: ['Miro', 'Notion', 'Mermaid.js']
  },
  {
    num: '03',
    title: 'DESIGN',
    subtitle: 'High-Fidelity Craft & Token Taxonomies',
    description: 'Craft comprehensive design system components with multi-theme support, rigorous typography scale, micro-interactions, and verified WCAG 2.2 AA accessibility.',
    deliverables: ['Component Libraries', 'Token Taxonomies', 'Micro-Interactions', 'Multi-Theme Systems'],
    tools: ['Figma', 'Tokens Studio', 'WCAG 2.2 AA']
  },
  {
    num: '04',
    title: 'BUILD',
    subtitle: 'Production Code & Engineering Sync',
    description: 'Author and validate responsive React/Next.js front-end components, ensuring 1-to-1 fidelity between Figma tokens and shipped production styling.',
    deliverables: ['React Components', 'Tailwind CSS Tokens', 'Interactive Prototypes', 'Production Storybook'],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    num: '05',
    title: 'VALIDATE',
    subtitle: 'Telemetry Analytics & Usability Audits',
    description: 'Measure real-world completion velocity, conduct rigorous accessibility audits, and iteratively refine UX ergonomics based on behavioral telemetry.',
    deliverables: ['Task Completion Audits', 'Telemetry Analytics', 'A11y Compliance Reports', 'Post-Launch Iteration'],
    tools: ['Mixpanel', 'Axe DevTools', 'Hotjar']
  }
];

export default function EditorialProcess() {
  return (
    <section id="process" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
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
            03 // PROCESS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
          How I Think &amp; Build
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
          A disciplined, 5-stage product lifecycle engineered to turn complex cognitive requirements into intuitive, accessible, and production-tested systems.
        </p>
      </motion.div>

      {/* 2. SEQUENTIAL 5-STAGE PROCESS CARDS */}
      <div className="space-y-6 sm:space-y-8">
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Number & Stage Name */}
              <div className="lg:col-span-4 flex items-start gap-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-tight">
                  {step.num} ⁄⁄
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-xs text-slate-600 dark:text-zinc-400 font-semibold">
                    {step.subtitle}
                  </span>
                </div>
              </div>

              {/* Center Column: Description & Deliverables */}
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-normal leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {step.deliverables.map((del) => (
                    <span 
                      key={del} 
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300/70 dark:border-white/15"
                    >
                      &bull; {del}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Tools */}
              <div className="lg:col-span-3 flex flex-col lg:items-end pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2 font-bold">
                  Stack &amp; Tools
                </span>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {step.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
