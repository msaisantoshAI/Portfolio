'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -350], { clamp: true });
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
        
        {/* --- LAYER 1: Hero Landing (Sai Santosh Madhari) --- */}
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 md:pb-16 px-4"
        >
          {/* Hello there / Hey there Badge - Moved down with spacing */}
          <div className="flex items-center space-x-2.5 mb-4 bg-white/90 dark:bg-white/10 px-5 py-2 rounded-full border border-black/10 dark:border-white/15 backdrop-blur-md shadow-md">
            <motion.span 
              className="text-lg origin-bottom-right drop-shadow-sm"
              animate={{ rotate: [0, 20, -10, 20, -10, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              👋
            </motion.span>
            <span className="text-zinc-800 dark:text-white/90 text-xs md:text-sm font-semibold tracking-wider uppercase">
              Hey there
            </span>
          </div>

          {/* Sai Santosh Madhari Title - Consistent Font & Spacing */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] drop-shadow-lg max-w-4xl">
            Sai Santosh Madhari
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-lg sm:text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-normal tracking-wide max-w-2xl drop-shadow-md">
            Product Designer &amp; AI Builder
          </p>
 
          {/* Minimalist Arrow Scroll Prompt */}
          <motion.div 
            className="mt-6 flex flex-col items-center opacity-60 dark:opacity-40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
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

        {/* --- LAYER 1.5: Artist Sequence --- */}
        <motion.div
          style={{ opacity: opacity1_5, y: y1_5 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24 lg:p-32 text-left"
        >
          <div className="max-w-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Creative Background
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Passionate Artist,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
                Professional Designer.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
              My foundation in fine arts and visual composition brought me seamlessly into the world of human-computer interaction and digital product craft.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 2: AI Automation & Systems --- */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 lg:p-32 text-right"
        >
          <div className="max-w-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-4 text-right">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Emerging Paradigms
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              AI Automation &amp; Orchestration.
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
              Leveraging cognitive psychology, user research, and agentic workflows to build frictionless software experiences.
            </p>
          </div>
        </motion.div>

        {/* --- LAYER 3: Bridging Design & Engineering --- */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="max-w-3xl bg-white/85 dark:bg-black/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Design Systems &amp; Engineering
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Bridging design and engineering.
            </h2>
            <p className="text-base sm:text-xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Exploring uncharted territories in generative user interfaces, design systems, and rapid prototype development.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
