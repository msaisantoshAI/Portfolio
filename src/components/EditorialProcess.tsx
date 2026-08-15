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
    <section id="process" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          03 // PROCESS
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
          How I Think &amp; Build
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          A disciplined, 5-stage product lifecycle engineered to turn complex cognitive requirements into intuitive, accessible, and production-tested systems.
        </p>
      </motion.div>

      {/* 3. SEQUENTIAL 5-STAGE PROCESS CARDS */}
      <div className="space-y-6 sm:space-y-8">
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-[#0b0f1a]/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Number & Stage Name */}
              <div className="lg:col-span-4 flex items-start gap-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-tight">
                  {step.num} ⁄⁄
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    {step.subtitle}
                  </span>
                </div>
              </div>

              {/* Center Column: Description & Deliverables */}
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {step.deliverables.map((del) => (
                    <span 
                      key={del} 
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-100/70 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/50 dark:border-white/10"
                    >
                      &bull; {del}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Tools */}
              <div className="lg:col-span-3 flex flex-col lg:items-end pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200/50 dark:border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
                  Stack &amp; Tools
                </span>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {step.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
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
