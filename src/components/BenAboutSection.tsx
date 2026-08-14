'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/88 dark:bg-[#081026]/88 border border-white/60 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-[0_16px_45px_rgba(20,60,140,0.12)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Section Eyebrow & Heading */}
        <div className="space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            A bit about me
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            Design is how I think.<br />
            <span className="text-zinc-500 dark:text-zinc-400 font-light italic">Building is how I prove it.</span>
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Framed Photo */}
          <div className="relative h-[260px] sm:h-[300px] w-full max-w-[380px] shrink-0 overflow-hidden rounded-2xl border-4 border-zinc-200 dark:border-zinc-700/60 bg-black shadow-md group">
            <Image
              src="/images/about-podium.jpg"
              alt="Sai Santosh speaking on AI-UX Design and System Architecture"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-white/90">
              📍 AI-UX Design &bull; Product Systems
            </div>
          </div>

          {/* Narrative Progression matching Resume */}
          <div className="w-full max-w-[720px] space-y-6">
            <p className="body-lead text-zinc-700 dark:text-zinc-300">
              With a <strong className="text-zinc-900 dark:text-white font-semibold">Bachelor of Fine Arts (BFA) in Applied Art &amp; Visual Communication</strong> (2018–2022), my visual foundation evolved naturally into digital product design. Over the last <strong className="text-zinc-900 dark:text-white font-semibold">3+ years at Tata Consultancy Services (Oct 2022 – Present)</strong>, I have conducted heuristic UX audits, streamlined internal customer estimation platforms, and rebuilt unified search architectures to eliminate cognitive friction for thousands of enterprise users.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">01 / Audits</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Heuristics &amp; UX Audit</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Systematic evaluations, user testing, and data-driven workflow optimization.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-bold uppercase tracking-wider">02 / Systems</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Design Systems</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Scalable icon libraries, component states, and verified WCAG accessibility.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-purple-600 dark:text-indigo-400 font-bold uppercase tracking-wider">03 / AI &amp; Agents</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">AI-UX Orchestration</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">AI assistants, human-in-the-loop workflows, and rapid Framer/Cursor prototypes.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                View Case Studies &rarr;
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-black/15 dark:border-white/20 text-zinc-900 dark:text-white font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Download Resume PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
