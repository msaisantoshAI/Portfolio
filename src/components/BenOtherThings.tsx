'use client';

import React from 'react';

const processPillars = [
  {
    step: '01',
    title: 'Discover',
    focus: 'User Research, Analytics, & Heuristic Audits',
    description: 'Deconstructing complex workflows into measurable user journeys, telemetry audits, and behavioral metrics.',
    tools: ['User Interviews', 'Mixpanel', 'Heuristic Matrix', 'Cognitive Audits'],
  },
  {
    step: '02',
    title: 'Structure',
    focus: 'Information Architecture, Systems, & Workflows',
    description: 'Mapping high-density information architecture, permission models, and design system component tokens.',
    tools: ['Miro', 'Notion', 'Workflow Mapping', 'Component Tokens'],
  },
  {
    step: '03',
    title: 'Design',
    focus: 'Figma, Rapid Prototyping, & Design Systems',
    description: 'Crafting pixel-perfect interface states, WCAG 2.2 AA compliant tokens, and clickable prototypes.',
    tools: ['Figma', 'WCAG 2.2 AA', 'Interactive Prototyping', 'Adobe CC'],
  },
  {
    step: '04',
    title: 'Build',
    focus: 'AI Orchestration, Front-End Code, & Fast Iteration',
    description: 'Translating design tokens into live interactive prototypes using TypeScript, Next.js, and LLM APIs.',
    tools: ['Cursor', 'Claude API', 'Antigravity Studio', 'TypeScript'],
  },
  {
    step: '05',
    title: 'Validate',
    focus: 'Usability Testing, Iteration, & Business Metrics',
    description: 'Validating task turnaround time, user error reductions, and stakeholder business outcomes.',
    tools: ['Task Audits', 'A/B Testing', 'Qualitative Synthesis'],
  },
];

export default function BenOtherThings() {
  return (
    <section id="process" className="px-4 py-8 sm:py-10 sm:px-6 md:px-12 max-w-[1240px] mx-auto w-full font-sans">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Methodology &amp; Framework
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            The 5-Stage Product Process
          </h2>
          <p className="body-lead text-zinc-600 dark:text-zinc-400">
            A repeatable, evidence-based design methodology transforming enterprise complexity into calm, human workflows.
          </p>
        </div>

        {/* 5-Stage Process Methodology Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-black/30 border border-black/5 dark:border-white/10 space-y-3 flex flex-col justify-between shadow-sm hover:border-blue-500/30 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-500/20">
                    Step {p.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                  {p.focus}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-1">
                {p.tools.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono bg-white dark:bg-white/10 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded border border-black/5 dark:border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
