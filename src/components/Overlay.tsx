'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -180], { clamp: true });
  const display1 = useTransform(scrollYProgress, (p) => p > 0.12 ? 'none' : 'flex');

  // Second Sequence: Artist & Designer (Left Negative Space - Editorial Clean)
  const opacity1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [0, 1, 1, 0], { clamp: true });
  const y1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [30, 0, 0, -30], { clamp: true });

  // Third Sequence: AI Automation (Right Negative Space)
  const opacity2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [30, 0, 0, -30], { clamp: true });

  // Fourth Sequence: Bridging Engineering (Center Bottom)
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [30, 0, 0, -30], { clamp: true });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none h-full font-sans">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- LAYER 1: Hero Editorial Landing (Face 100% Unobstructed -> Headline in Lower Space) --- */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col justify-end text-center pb-6 sm:pb-8 md:pb-11 px-4 sm:px-6 pointer-events-none"
        >
          {/* Subtle bottom gradient to guarantee crisp contrast over torso */}
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" aria-hidden="true" />

          {/* Typography positioned down in lower negative space */}
          <div className="relative z-30 flex flex-col items-center max-w-2xl mx-auto space-y-3 pointer-events-auto">
            
            {/* 01. Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-white text-[11px] font-semibold tracking-wider uppercase font-mono">
                Product Designer &times; AI Builder
              </span>
            </div>

            {/* 02. Editorial Headline & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                Designing systems that feel human.
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                Sai Santosh Madhari &mdash; Crafting AI-native orchestration workflows, scalable design systems, and complex enterprise software.
              </p>
            </div>

            {/* 03. Interactive Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleScrollTo('work')}
                className="touch-target cursor-pointer relative z-50 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0a0f1d] hover:bg-[#131d38] text-white font-bold text-xs sm:text-sm border border-white/25 hover:border-white/50 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.7)] focus-visible:ring-2 focus-visible:ring-white"
              >
                View my work &rarr;
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo('about')}
                className="touch-target cursor-pointer relative z-50 inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-full bg-black/60 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/20 hover:border-white/40 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                About me
              </button>
            </div>

          </div>

          {/* Minimalist Arrow Scroll Prompt */}
          <motion.div 
            className="relative z-10 mt-3 flex flex-col items-center opacity-60"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <svg 
              width="18" 
              height="18" 
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

        {/* --- LAYER 1.5: Artist Sequence (Left Negative Space - Signature Blue Accent) --- */}
        <motion.div
          style={{ opacity: opacity1_5, y: y1_5 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-12 md:p-20 text-left pointer-events-auto"
        >
          <div className="max-w-md bg-[#0b0f1a]/85 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5">
            <span className="eyebrow text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
              01 // Creative Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Passionate Artist,<br />
              <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Professional Designer.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              My foundation in fine arts and visual composition brought me seamlessly into digital product craft, information architecture, and scalable design systems.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 2: AI Automation & Systems (Right Negative Space) --- */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-6 sm:p-12 md:p-20 text-right pointer-events-auto"
        >
          <div className="max-w-md bg-[#0b0f1a]/85 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5 text-right">
            <span className="eyebrow text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
              02 // AI Orchestration
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
          className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center pointer-events-auto"
        >
          <div className="max-w-lg bg-[#0b0f1a]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-2.5">
            <span className="eyebrow text-blue-400 font-mono text-xs uppercase tracking-wider font-semibold">
              03 // Product Leadership
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
