'use client';

import React from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  impact: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Tata Consultancy Services',
    role: 'Lead Product Designer',
    period: '2023 — Present',
    location: 'Hyderabad, India',
    description: 'Leading end-to-end UX architecture for enterprise platforms, field operations automation, and internal tooling across multi-national delivery centers.',
    impact: 'Architected eSOW Planner, reducing SOW generation turnaround time by 68% for global delivery teams.',
    skills: ['Enterprise SaaS', 'Design Systems', 'Workflow Automation', 'WCAG 2.2 AA'],
  },
  {
    company: 'AI Product & Agentic Lab',
    role: 'AI UX Researcher & Prototyper',
    period: '2024 — Present',
    location: 'Independent',
    description: 'Designing and prototyping generative human-in-the-loop interfaces, agent state visualization trees, and streaming UI components.',
    impact: 'Built Antigravity Studio and generative canvas prototypes benchmarked with active designer cohorts.',
    skills: ['Generative UI', 'Agent Workflows', 'Claude / Gemini API', 'Rapid Prototyping'],
  },
  {
    company: 'Substation SAS & Energy Systems',
    role: 'Product UX Designer',
    period: '2023 — 2024',
    location: 'Client Engagement',
    description: 'Unified high-density electrical grid telemetry with field engineer workforce scheduling to minimize human cognitive error in critical infrastructure.',
    impact: 'Decreased emergency grid dispatch latency by 52% through simplified telemetry hierarchy.',
    skills: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
  },
];

export default function SanjayExperience() {
  return (
    <section className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Work History &amp; Leadership
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Experience
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              0&rarr;1 Product Design &bull; Enterprise Scale
            </span>
          </div>
        </div>

        {/* Experience List (Sanjay Menon Inspired Minimalist Grid) */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-8 hover:border-black/15 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col md:flex-row gap-6 md:gap-8 justify-between"
            >
              {/* Left: Company, Role & Duration */}
              <div className="w-full md:w-[35%] shrink-0 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {exp.role}
                </p>
                <p className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
                  📍 {exp.location}
                </p>
              </div>

              {/* Right: Description, Measurable Impact & Skills */}
              <div className="w-full md:w-[65%] space-y-4">
                <p className="body-copy text-zinc-600 dark:text-zinc-300">
                  {exp.description}
                </p>

                {/* Impact Highlight Box */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/30">
                  <p className="text-xs sm:text-sm font-medium text-blue-950 dark:text-blue-200">
                    <strong className="text-blue-600 dark:text-blue-400 font-bold font-mono uppercase text-xs mr-1.5">Key Impact:</strong>
                    {exp.impact}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-2.5 py-0.5 rounded-full shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
