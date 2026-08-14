'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -200], { clamp: true });
  const display1 = useTransform(scrollYProgress, (p) => p > 0.12 ? 'none' : 'flex');

  // Second Sequence: Artist & Designer (Left Negative Space)
  const opacity1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [0, 1, 1, 0], { clamp: true });
  const y1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [40, 0, 0, -40], { clamp: true });

  // Third Sequence: AI Automation (Right Negative Space)
  const opacity2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [40, 0, 0, -40], { clamp: true });

  // Fourth Sequence: Bridging Engineering (Bottom Negative Space)
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [40, 0, 0, -40], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none h-full font-sans">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- LAYER 1: Hero Landing (Face Unobstructed -> Lower Third Typography) --- */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col justify-end text-center pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6"
        >
          {/* Dedicated smooth atmospheric bottom gradient to guarantee crisp 100% WCAG contrast over torso */}
          <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none" aria-hidden="true" />

          {/* Typography positioned in lower negative space (Face completely clear above) */}
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-3 pointer-events-auto">
            
            {/* 01. Small eyebrow / availability indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase font-mono">
                Product Designer &times; AI Builder
              </span>
            </div>

            {/* 02. Name Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.06] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Sai Santosh Madhari
            </h1>

            {/* 03. Value Proposition / Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-200 font-normal leading-relaxed max-w-[58ch] text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              I design complex enterprise systems, AI agent workflows, and thoughtful digital products that feel simple and human.
            </p>

            {/* 04 & 05. Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#work"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-white"
              >
                View my work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#about"
                className="touch-target inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm hover:bg-white/20 border border-white/25 transition-all backdrop-blur-md shadow-sm focus-visible:ring-2 focus-visible:ring-white"
              >
                About me
              </a>
            </div>

          </div>

          {/* Minimalist Arrow Scroll Prompt */}
          <motion.div 
            className="relative z-10 mt-3 flex flex-col items-center opacity-60"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
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

        {/* --- LAYER 1.5: Artist Sequence (Left Negative Space) --- */}
        <motion.div
          style={{ opacity: opacity1_5, y: y1_5 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-12 md:p-20 text-left pointer-events-auto"
        >
          <div className="max-w-md bg-black/75 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5">
            <span className="eyebrow text-amber-400 font-mono text-xs">
              Creative Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Passionate Artist,<br />
              <span className="text-amber-400">
                Professional Designer.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              My foundation in fine arts and visual composition brought me seamlessly into the realm of digital product craft, information architecture, and scalable design systems.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 2: AI Automation & Systems (Right Negative Space) --- */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-6 sm:p-12 md:p-20 text-right pointer-events-auto"
        >
          <div className="max-w-md bg-black/75 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5 text-right">
            <span className="eyebrow text-blue-400 font-mono text-xs">
              AI Orchestration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Human-in-the-Loop AI Systems.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Designing multi-agent workflows, generative UI states, and reliable cognitive models that make artificial intelligence truly actionable for enterprise operators.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 3: Bridging Design & Engineering (Center Lower Space) --- */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center pointer-events-auto"
        >
          <div className="max-w-xl bg-black/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5">
            <span className="eyebrow text-indigo-400 font-mono text-xs">
              Product Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Bridging design and engineering.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Transforming complex multi-stakeholder requirements into crisp component tokens, verified WCAG 2.2 accessibility, and shipped production code.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
