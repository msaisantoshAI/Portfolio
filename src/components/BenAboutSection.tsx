'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300">
        <div className="space-y-3">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            A bit about me
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Design is how I think.<br />
            <span className="text-zinc-500 dark:text-zinc-400 font-light italic">Building is how I prove it.</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Framed Photo Frame */}
          <div className="relative h-[260px] w-full max-w-[380px] shrink-0 overflow-hidden rounded-2xl border-4 border-zinc-200 dark:border-zinc-700/60 bg-black shadow-xl group">
            <Image
              src="/images/about-podium.jpg"
              alt="Sai Santosh speaking at a design workshop"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-white/80">
              📍 AI UX Workshop &amp; Keynote Session
            </div>
          </div>

          {/* Description & Impact Points */}
          <div className="w-full max-w-[720px] space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-zinc-700 dark:text-zinc-300">
              Being a designer with a strong foundation in <span className="text-zinc-900 dark:text-white font-semibold">Data Analytics</span>, <span className="text-zinc-900 dark:text-white font-semibold">Fine Arts</span>, and modern <span className="text-blue-600 dark:text-blue-400 font-semibold">AI Tooling</span>, I bridge the gap between creative intuition and engineering feasibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">01 / DISCOVERY</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Data &amp; Research</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Heuristic audits, user journeys, &amp; metrics.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-bold">02 / SYSTEMS</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Design Systems</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">WCAG accessibility, tokens, &amp; components.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 shadow-sm">
                <span className="text-xs font-mono text-purple-600 dark:text-indigo-400 font-bold">03 / AI &amp; TECH</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">AI Orchestration</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Generative UI, agentic flows, &amp; fast builds.</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#talks"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md"
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
