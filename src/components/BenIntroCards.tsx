'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BenIntroCards() {
  return (
    <section className="px-5 pb-0 pt-10 md:px-8 md:pt-16 lg:px-24 max-w-[1280px] mx-auto w-full">
      {/* Intro Surface Box with Dot Grid Background */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[28px] bg-white/85 dark:bg-zinc-900/85 p-8 md:p-14 border border-black/5 dark:border-white/10 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-300">
        {/* Subtle dot matrix pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            backgroundPosition: '8px 8px'
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-mono font-semibold tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AVAILABLE FOR PRODUCT &amp; AI ROLES
            </span>
          </div>

          {/* Large Acorn-style Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
            Hi, I&apos;m Sai Santosh.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Product Designer &amp; AI Builder.
            </span>
          </h1>

          {/* Subtitle with Pill tags */}
          <p className="max-w-[840px] text-lg sm:text-xl md:text-2xl font-light text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Product Designer with a Data Science &amp; Fine Arts background.{' '}
            <span className="hidden md:inline">
              <br />
              Designing enterprise systems and AI experiences at{' '}
              <span className="inline-block whitespace-nowrap align-middle">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white text-sm font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Tata Consultancy Services
                </span>
              </span>{' '}
              by day, building{' '}
              <span className="inline-block whitespace-nowrap align-middle">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-gradient-to-r dark:from-blue-600/30 dark:to-indigo-600/30 px-3 py-1 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-sm font-medium shadow-sm">
                  AI Tools &amp; Experiments
                </span>
              </span>{' '}
              by night.
            </span>
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm md:text-base hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Check out recent work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/15 dark:border-white/20 text-zinc-900 dark:text-white font-medium text-sm md:text-base hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Learn more about me
            </a>
          </div>
        </div>

        {/* 4 Cards Deck (Ben Shih Signature Layout) */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-6 pt-4">
          
          {/* Card 1: Recent Work (Warm Orange/Amber Accent) */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer h-[340px] xl:h-[370px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#d97706] to-[#b45309] text-white shadow-[0_8px_24px_rgba(217,119,6,0.25)] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-100 bg-black/20 px-3 py-1 rounded-full">
                  Case Studies
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Recent work
                </h2>
                <p className="text-sm font-normal text-amber-100/90 leading-relaxed">
                  See how I turn complex enterprise &amp; AI problems into shipped experiences.
                </p>
              </div>
              <div>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  Read Case Studies &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 2: Interactive Video Preview */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer h-[340px] xl:h-[370px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] bg-[#0c1017] shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-black/10 dark:border-white/10 group relative flex flex-col justify-end p-6">
              <Image
                src="/images/project_esow_1775675924462.png"
                alt="eSOW Planner Work"
                fill
                className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                  Enterprise SaaS
                </span>
                <h3 className="text-xl font-bold text-white leading-snug">
                  eSOW Planner
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  68% reduction in SOW generation cycle for global enterprise teams.
                </p>
              </div>
            </article>
          </motion.div>

          {/* Card 3: Indie Apps & AI Tools (Purple Accent) */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer h-[340px] xl:h-[370px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white shadow-[0_8px_24px_rgba(124,58,237,0.25)] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-100 bg-black/20 px-3 py-1 rounded-full">
                  Playground
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Indie &amp; AI tools
                </h2>
                <p className="text-sm font-normal text-purple-100/90 leading-relaxed">
                  I orchestrate multiple AI models (Cursor, Lovable, Claude) to ship working software.
                </p>
              </div>
              <div>
                <a
                  href="#fun"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  What I&apos;ve Shipped &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 4: Public Workshops & Talks (Blue Accent) */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer h-[340px] xl:h-[370px]"
          >
            <article className="h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white shadow-[0_8px_24px_rgba(2,132,199,0.25)] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-100 bg-black/20 px-3 py-1 rounded-full">
                  Speaking
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Public talks
                </h2>
                <p className="text-sm font-normal text-sky-100/90 leading-relaxed">
                  I speak on UX architecture, design psychology, and the emerging wave of AI orchestration.
                </p>
              </div>
              <div>
                <a
                  href="#talks"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  Explore Workshops &rarr;
                </a>
              </div>
            </article>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
