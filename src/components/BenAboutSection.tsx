'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-xl transition-colors duration-300">
        
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
          {/* Framed Photo Frame */}
          <div className="relative h-[260px] sm:h-[300px] w-full max-w-[380px] shrink-0 overflow-hidden rounded-2xl border-4 border-zinc-200 dark:border-zinc-700/60 bg-black shadow-md group">
            <Image
              src="/images/about-podium.jpg"
              alt="Sai Santosh speaking at an AI &amp; Product Design keynote session"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-white/90">
              📍 AI UX Keynote &amp; Masterclass
            </div>
          </div>

          {/* Narrative Progression & 3-Pillar Breakdown */}
          <div className="w-full max-w-[720px] space-y-6">
            <p className="body-lead text-zinc-700 dark:text-zinc-300">
              As a <strong className="text-zinc-900 dark:text-white font-semibold">Passionate Artist, Professional Designer</strong>. Starting in <strong className="text-zinc-900 dark:text-white font-semibold">Fine Arts &amp; Visual Thinking</strong>, I transitioned into UX Design. Today at TCS, I work on high-density enterprise SaaS systems and orchestrate <strong className="text-blue-600 dark:text-blue-400 font-semibold">human-in-the-loop AI interfaces</strong> that turn chaotic operations into calm workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">01 / Discovery</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Data &amp; Research</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Heuristic audits, cognitive load analysis, &amp; metrics.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-bold uppercase tracking-wider">02 / Systems</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Design Systems</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">WCAG 2.2 AA accessibility, design tokens, &amp; reusable UI.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-purple-600 dark:text-indigo-400 font-bold uppercase tracking-wider">03 / AI &amp; Tech</span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">AI Orchestration</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Generative UI, agentic trees, &amp; rapid code prototypes.</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#talks"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Learn More About My Story &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
