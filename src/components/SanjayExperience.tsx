'use client';

import React from 'react';

export default function SanjayExperience() {
  const tcsBullets = [
    "Conducted heuristic evaluations and UX audits to identify usability gaps and improve enterprise workflow efficiency.",
    "Redesigned internal customer platforms with user-centric dashboards and streamlined estimation workflows, reducing task time and improving visibility.",
    "Delivered UX solutions for TM System (TMS), enhancing resource tracking and operational clarity.",
    "Drove an 80%+ reduction in recurring application issues through strategic UI improvements, decreasing employee-raised tickets by 50%.",
    "Rebuilt the Enterprise Search experience, designing a structured 'All Results' page that improved hierarchy, reduced chaos, and resolved search usability challenges.",
    "Created prototypes and design specifications in Figma/XD, collaborating cross-functionally to align UX strategy with business goals.",
    "Contributed to the Design System by building scalable icon libraries and interaction states, ensuring consistency and accessibility.",
    "Used analytics, user feedback, and UX best practices to continuously optimize usability and satisfaction."
  ];

  const techSwBullets = [
    "Designed low-fidelity wireframes and clickable prototypes to validate requirements and gather stakeholder feedback.",
    "Developed high-fidelity mock-ups using Figma to bring functional requirements to life, ensuring alignment with stakeholder expectations.",
    "Collaborated with developers and project managers to optimize user-centered design processes, integrating design systems to streamline development.",
    "Successfully managed projects with tight deadlines, consistently delivering high-quality designs on time and within budget.",
    "Provided regular progress updates to management and communicated detailed design specs to internal teams."
  ];

  return (
    <section id="experience" className="px-4 py-8 sm:py-10 sm:px-6 md:px-8 max-w-[1320px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-6">
          <div className="space-y-2">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Work History &amp; Leadership
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Experience
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Enterprise Scale &bull; Systems &bull; AI Workflows
            </span>
          </div>
        </div>

        {/* Merged Comprehensive Experience Card Layout */}
        <div className="space-y-8">
          
          {/* Role 1: Tata Consultancy Services */}
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/30 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Oct 2022 &mdash; Present &bull; Hyderabad, India
                </span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Tata Consultancy Services
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Lead Product Designer &times; Enterprise UX
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20 font-semibold">
                  Enterprise SaaS
                </span>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              {tcsBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-blue-500 mt-1 shrink-0 font-bold">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
              {['Design Systems', 'Figma', 'UX Audits', 'Enterprise Dashboards', 'TMS', 'Accessibility WCAG 2.2'].map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Role 2: Tech SW Service - Next Gen */}
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/30 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Oct 2022 &mdash; Sept 2025
                </span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Tech SW Service &mdash; Next Gen
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  UX &amp; Interaction Designer
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 font-semibold">
                  Product UX
                </span>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              {techSwBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-indigo-500 mt-1 shrink-0 font-bold">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
              {['Wireframing', 'Clickable Prototypes', 'Stakeholder Alignment', 'Cross-Functional UX', 'Design Specs'].map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
