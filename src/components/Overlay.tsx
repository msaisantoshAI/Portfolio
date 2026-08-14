'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -300], { clamp: true });
  const display1 = useTransform(scrollYProgress, (p) => p > 0.12 ? 'none' : 'flex');

  // Second Sequence: Artist & Designer (Right) - appearing immediately after intro
  const opacity1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [0, 1, 1, 0], { clamp: true });
  const y1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [40, 0, 0, -40], { clamp: true });

  // Third Sequence: AI Automation (Left) - appearing soon after Artist
  const opacity2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [40, 0, 0, -40], { clamp: true });

  // Fourth Sequence: Bridging Engineering (Right) 
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [40, 0, 0, -40], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none h-full font-sans">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden">
        
        {/* --- LAYER 1: Hero Landing (3-Second Comprehension & Clear Hierarchy) --- */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center pb-10 sm:pb-14 md:pb-16 px-4"
        >
          {/* Subtle adaptive scrim to guarantee 100% readability over canvas photography */}
          <div className="relative flex flex-col items-center max-w-4xl mx-auto p-6 sm:p-8 rounded-[28px] bg-white/70 dark:bg-black/55 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-lg pointer-events-auto">
            
            {/* 01. Small eyebrow / availability indicator */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="text-zinc-800 dark:text-zinc-200 text-xs md:text-sm font-semibold tracking-wider uppercase font-mono">
                Product Designer &times; AI Builder
              </span>
            </div>

            {/* 02. Main Value Proposition (Controlled Clamp H1) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.04] text-balance">
              Sai Santosh Madhari
            </h1>

            {/* 03. Short Supporting Description (Controlled Width) */}
            <p className="mt-3 text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed max-w-[62ch] text-balance">
              I design complex enterprise systems, AI agent workflows, and thoughtful digital products that feel simple and human.
            </p>

            {/* 04 & 05. Primary and Secondary CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#work"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                View my work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#about"
                className="touch-target inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-black/15 dark:border-white/20 text-zinc-900 dark:text-white font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                About me
              </a>
            </div>

          </div>

          {/* Minimalist Arrow Scroll Prompt */}
          <motion.div 
            className="mt-4 flex flex-col items-center opacity-50 dark:opacity-40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-zinc-900 dark:text-white"
            >
              <path 
                d="M7 13L12 18L17 13M12 6V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>

        </motion.div>

        {/* --- LAYER 1.5: Artist Sequence (Creative Foundation) --- */}
        <motion.div
          style={{ opacity: opacity1_5, y: y1_5 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-20 lg:p-32 text-left pointer-events-auto"
        >
          <div className="max-w-xl bg-white/85 dark:bg-black/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3">
            <span className="eyebrow text-amber-600 dark:text-amber-400">
              Creative Foundation
            </span>
            <h2 className="card-heading text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white">
              Passionate Artist,<br />
              <span className="text-amber-600 dark:text-amber-400">
                Professional Designer.
              </span>
            </h2>
            <p className="body-copy text-zinc-700 dark:text-zinc-300">
              My foundation in fine arts and visual composition brought me seamlessly into the realm of digital product craft, information architecture, and scalable design systems.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 2: AI Automation & Systems --- */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-6 md:p-20 lg:p-32 text-right pointer-events-auto"
        >
          <div className="max-w-xl bg-white/85 dark:bg-black/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3 text-right">
            <span className="eyebrow text-blue-600 dark:text-blue-400">
              AI Orchestration
            </span>
            <h2 className="card-heading text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white">
              Human-in-the-loop AI Systems.
            </h2>
            <p className="body-copy text-zinc-700 dark:text-zinc-300">
              Designing multi-agent workflows, generative UI states, and reliable cognitive models that make artificial intelligence truly actionable for enterprise operators.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 3: Bridging Design & Engineering --- */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
        >
          <div className="max-w-2xl bg-white/90 dark:bg-black/75 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3">
            <span className="eyebrow text-indigo-600 dark:text-indigo-400">
              Product Leadership
            </span>
            <h2 className="section-heading text-2xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white">
              Bridging design and engineering.
            </h2>
            <p className="body-copy text-zinc-700 dark:text-zinc-300 mx-auto">
              Transforming complex multi-stakeholder requirements into crisp component tokens, verified WCAG 2.2 accessibility, and shipped production code.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
