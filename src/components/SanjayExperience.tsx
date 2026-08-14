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
    company: 'Tata Consultancy Services (TCS)',
    role: 'AI-UX Designer & Product Designer',
    period: 'Oct 2022 — Present',
    location: 'Hyderabad, India',
    description: 'Leading UX audits, heuristic evaluations, and dashboard redesigns across enterprise customer platforms and TM Systems (TMS). Partnering cross-functionally to build scalable Design Systems and streamline estimation workflows.',
    impact: 'Drove an 80%+ reduction in recurring application issues, decreasing employee-raised tickets by 50%, and rebuilt the Enterprise Search experience with a unified All-Results hierarchy.',
    skills: ['Enterprise SaaS', 'Heuristic Audits', 'TMS System', 'Design Systems', 'Figma & XD', 'WCAG 2.2 AA'],
  },
  {
    company: 'AI Product & Prototyping Lab',
    role: 'AI-UX Researcher & Prototyper',
    period: '2024 — Present',
    location: 'Independent',
    description: 'Designing human-in-the-loop AI assistants, multi-agent state machines, and generative canvas interfaces using modern LLMs (Claude, Gemini, GPT) and rapid deployment environments.',
    impact: 'Created interactive agentic workflows and generative UI prototypes benchmarked with active designer cohorts.',
    skills: ['AI-UX', 'Framer', 'Cursor', 'Lovable', 'Antigravity', 'Agent Workflows'],
  },
];

const certifications = [
  { name: 'Google UX Design Professional Certificate', issuer: 'Coursera' },
  { name: 'AI for Designers', issuer: 'Interaction Design Foundation (IxDF)' },
  { name: 'Design Psychology', issuer: 'LinkedIn Learning' },
  { name: 'Agile User Experience Design', issuer: 'LinkedIn Learning' },
  { name: 'Pillars of Customer Experience', issuer: 'LinkedIn Learning' },
];

export default function SanjayExperience() {
  return (
    <section className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/88 dark:bg-[#081026]/88 border border-white/60 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-[0_16px_45px_rgba(20,60,140,0.12)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Work History &amp; Impact
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Experience &amp; Track Record
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              3+ Years Experience &bull; Enterprise &amp; AI-UX
            </span>
          </div>
        </div>

        {/* Experience List */}
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
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/40">
                  <p className="text-xs sm:text-sm font-medium text-blue-950 dark:text-blue-200 leading-snug">
                    <strong className="text-blue-600 dark:text-blue-400 font-bold font-mono uppercase text-xs mr-1.5">Key Outcomes:</strong>
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

        {/* Education & Certifications Row */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Education Card */}
          <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-black/30 border border-black/5 dark:border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">
              Formal Education
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Bachelor of Fine Arts (BFA)
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Applied Art &bull; Visual Communication &amp; Graphic Design
            </p>
            <p className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              August 2018 — August 2022
            </p>
          </div>

          {/* Certifications Card */}
          <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-black/30 border border-black/5 dark:border-white/10 space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Industry Certifications
            </span>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, cIdx) => (
                <div 
                  key={cIdx}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-sm"
                >
                  <strong>{cert.name}</strong> <span className="text-zinc-500 dark:text-zinc-400">({cert.issuer})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
