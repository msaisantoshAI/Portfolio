'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BenIntroCards() {
  return (
    <section className="px-4 pb-0 pt-2 sm:pt-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      {/* Intro Surface Box with Dot Grid Background */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 p-7 sm:p-12 md:p-16 border border-black/10 dark:border-white/15 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Subtle dot matrix pattern */}
        <div 
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
          {/* Display Headline */}
          <h2 className="hero-heading text-zinc-900 dark:text-white">
            Hi, I&apos;m Sai Santosh.<br />
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Product Designer &amp; AI Builder.
            </span>
          </h2>

          {/* Subtitle - Reduced & Articulated */}
          <p className="body-lead text-zinc-700 dark:text-zinc-300">
            Designing enterprise SaaS systems at <strong className="text-zinc-900 dark:text-white font-semibold">Tata Consultancy Services</strong> by day, building agentic AI tooling by night.
          </p>

          {/* Action CTA Button */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#about"
              className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Learn more about me</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* 4 Cards Deck (Unified Blue / Dark Glass Theme) */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5 pt-2">
          
          {/* Card 1: Selected Work */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[320px] xl:h-[340px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-6 bg-zinc-900 text-white shadow-md flex flex-col justify-between border border-blue-500/20 group relative">
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60">
                  Case Studies
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  Selected Work
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Enterprise SaaS platforms and agentic workflows shipped with measurable impact.
                </p>
              </div>
              <div>
                <a
                  href="#work"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs xl:text-sm transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Projects &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 2: eSOW Planner */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[320px] xl:h-[340px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] bg-[#0c1017] shadow-md border border-black/10 dark:border-white/10 group relative flex flex-col justify-end p-6">
              <Image
                src="/images/project_esow_1775675924462.png"
                alt="eSOW Planner enterprise statement of work dashboard screenshot"
                fill
                className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
                  Enterprise SaaS
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  eSOW Planner
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  68% reduction in SOW cycle time across global enterprise teams.
                </p>
              </div>
            </article>
          </motion.div>

          {/* Card 3: LevelUp Designer */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[320px] xl:h-[340px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] bg-[#0c1017] shadow-md border border-black/10 dark:border-white/10 group relative flex flex-col justify-between p-6">
              <Image
                src="/images/levelup-designer.png"
                alt="LevelUp Designer interactive product design mastery platform"
                fill
                className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
                  AI Tool &bull; Live
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  LevelUp Designer
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  Interactive practice platform for designers mastering agentic UX.
                </p>
              </div>
              <div className="relative z-10 pt-2">
                <a
                  href="https://level-up-designer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
                >
                  Launch App &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 4: Public Workshops & Talks */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[320px] xl:h-[340px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-6 bg-zinc-900 text-white shadow-md flex flex-col justify-between border border-blue-500/20 group relative">
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60">
                  Community
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  Public Talks
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Keynotes and campus masterclasses on design systems and AI workflows.
                </p>
              </div>
              <div>
                <a
                  href="#talks"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs xl:text-sm transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
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
