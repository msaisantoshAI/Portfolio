'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BenIntroCards() {
  return (
    <section className="px-4 pb-0 pt-2 sm:pt-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full">
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

        <div className="relative z-10 flex flex-col gap-5 max-w-4xl">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-mono font-semibold tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
              AVAILABLE FOR AI PRODUCT DESIGN ROLES
            </span>
          </div>

          {/* Large Acorn-style Display Headline */}
          <h2 className="hero-heading text-zinc-900 dark:text-white">
            Hi, I&apos;m Sai Santosh.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Aspiring Product Designer &amp; AI Builder.
            </span>
          </h2>

          {/* Subtitle with Pill tags and controlled width */}
          <p className="body-lead text-zinc-700 dark:text-zinc-300">
            Product Designer with a Visual Design &amp; Creative background. Designing enterprise systems at{' '}
            <span className="inline-block whitespace-nowrap align-middle">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white text-xs sm:text-sm font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
                Tata Consultancy Services
              </span>
            </span>{' '}
            by day, building{' '}
            <span className="inline-block whitespace-nowrap align-middle">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-500/20 px-3 py-1 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium shadow-sm">
                AI Tools &amp; Agentic Workflows
              </span>
            </span>{' '}
            to become AI Product designer in night.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href="#work"
              className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm md:text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Check out recent work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#about"
              className="touch-target inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-black/15 dark:border-white/20 text-zinc-900 dark:text-white font-medium text-sm md:text-base hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Learn more about me
            </a>
          </div>
        </div>

        {/* 4 Cards Deck (Curated 4-Column Layout) */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5 pt-2">
          
          {/* Card 1: Recent Work (Warm Orange/Amber Accent) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[340px] xl:h-[360px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 bg-gradient-to-br from-[#c2410c] to-[#9a3412] text-white shadow-md flex flex-col justify-between border border-orange-400/30">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-200 bg-black/25 px-3 py-1 rounded-full">
                  Case Studies
                </span>
                <h3 className="card-heading text-white leading-tight">
                  Recent work
                </h3>
                <p className="text-sm font-normal text-orange-100/90 leading-relaxed">
                  How I turn complex enterprise &amp; AI problems into shipped, measurable experiences.
                </p>
              </div>
              <div>
                <a
                  href="#work"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
                >
                  Read Case Studies &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 2: Interactive Video Preview */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[340px] xl:h-[360px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] bg-[#0c1017] shadow-md border border-black/10 dark:border-white/10 group relative flex flex-col justify-end p-6">
              <Image
                src="/images/project_esow_1775675924462.png"
                alt="eSOW Planner enterprise statement of work dashboard screenshot"
                fill
                className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                  Flagship Case Study
                </span>
                <h3 className="text-xl font-bold text-white leading-snug">
                  eSOW Planner
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  68% reduction in SOW authoring cycle for global enterprise delivery teams.
                </p>
              </div>
            </article>
          </motion.div>

          {/* Card 3: Indie Apps & AI Tools (Purple Accent) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[340px] xl:h-[360px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 bg-gradient-to-br from-[#6d28d9] to-[#581c87] text-white shadow-md flex flex-col justify-between border border-purple-400/30">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-200 bg-black/25 px-3 py-1 rounded-full">
                  Process &amp; AI
                </span>
                <h3 className="card-heading text-white leading-tight">
                  How I Work
                </h3>
                <p className="text-sm font-normal text-purple-100/90 leading-relaxed">
                  Discover &rarr; Structure &rarr; Design &rarr; Build &rarr; Validate with modern AI tooling.
                </p>
              </div>
              <div>
                <a
                  href="#fun"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore Process &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 4: Public Workshops & Talks (Blue Accent) */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            className="h-[340px] xl:h-[360px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 bg-gradient-to-br from-[#0369a1] to-[#075985] text-white shadow-md flex flex-col justify-between border border-sky-400/30">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-200 bg-black/25 px-3 py-1 rounded-full">
                  Community
                </span>
                <h3 className="card-heading text-white leading-tight">
                  Public talks
                </h3>
                <p className="text-sm font-normal text-sky-100/90 leading-relaxed">
                  Keynotes and campus masterclasses on design systems and AI orchestration.
                </p>
              </div>
              <div>
                <a
                  href="#talks"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
                >
                  View Workshops &rarr;
                </a>
              </div>
            </article>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
