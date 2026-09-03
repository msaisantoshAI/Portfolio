'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BenIntroCards() {
  return (
    <section className="px-4 pb-0 pt-2 sm:pt-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      {/* Intro Surface Box with Dot Grid Background */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 p-6 sm:p-10 md:p-14 border border-black/10 dark:border-white/15 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Subtle dot matrix pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
          {/* Display Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Hi, I&apos;m Sai Santosh.<br />
            <span className="text-blue-600 dark:text-blue-400">
              Product Designer &amp; AI Builder.
            </span>
          </h2>

          {/* Concise Bio */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Designing complex enterprise systems at <strong className="text-zinc-900 dark:text-white font-semibold">Tata Consultancy Services</strong> by day; building <strong className="text-blue-600 dark:text-blue-400 font-semibold">AI workflows &amp; interactive tools</strong> by night.
          </p>

          {/* Action CTA Button */}
          <div className="pt-2">
            <Link
              href="/about"
              className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Learn more about me
            </Link>
          </div>
        </div>

        {/* 4 Quick Cards Deck */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5 pt-2">
          
          {/* Card 1: Selected Work */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            className="h-[300px]"
          >
            <article className="h-full w-full overflow-hidden rounded-2xl p-6 bg-zinc-900 text-white shadow-md flex flex-col justify-between border border-white/10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60">
                  Case Studies
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Selected Work
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enterprise SaaS automation &amp; AI workflows driving measurable efficiency.
                </p>
              </div>
              <div>
                <a
                  href="#work"
                  className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  View Projects &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 2: eSOW Planner */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            className="h-[300px]"
          >
            <article className="h-full w-full overflow-hidden rounded-2xl bg-[#0c1017] shadow-md border border-black/10 dark:border-white/10 group relative flex flex-col justify-end p-6">
              <Image
                src="/images/project_esow_1775675924462.png"
                alt="eSOW Planner dashboard"
                fill
                className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  Flagship
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  eSOW Planner
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  68% reduction in contract authoring turnaround for global squads.
                </p>
              </div>
            </article>
          </motion.div>

          {/* Card 3: LevelUp Designer */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            className="h-[300px]"
          >
            <article className="h-full w-full overflow-hidden rounded-2xl bg-[#0c1017] shadow-md border border-black/10 dark:border-white/10 group relative flex flex-col justify-between p-6">
              <Image
                src="/images/levelup-designer.png"
                alt="LevelUp Designer AI platform"
                fill
                className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Live Tool
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  LevelUp Designer
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  AI training canvas for product designers mastering agentic UX.
                </p>
              </div>
              <div className="relative z-10 pt-2">
                <a
                  href="https://level-up-designer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  Launch App ↗
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 4: Talks & Mentorship */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            className="h-[300px]"
          >
            <article className="h-full w-full overflow-hidden rounded-2xl p-6 bg-zinc-900 text-white shadow-md flex flex-col justify-between border border-white/10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60">
                  Community
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">
                  Public Talks
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Keynotes &amp; design sprints on design systems and AI orchestration.
                </p>
              </div>
              <div>
                <a
                  href="#talks"
                  className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  View Talks &rarr;
                </a>
              </div>
            </article>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
