'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

  const opacity1 = useTransform(scrollYProgress, [0, 0.02, 0.1], [1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -450], { clamp: true });
  const display1 = useTransform(scrollYProgress, (p) => p > 0.12 ? 'none' : 'flex');

  // Second Sequence: Artist & Designer (Right) - appearing immediately after intro
  const opacity1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [0, 1, 1, 0], { clamp: true });
  const y1_5 = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.4], [60, 0, 0, -60], { clamp: true });

  // Third Sequence: AI Automation (Left) - appearing soon after Artist
  const opacity2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.42, 0.5, 0.65, 0.72], [60, 0, 0, -60], { clamp: true });

  // Fourth Sequence: Bridging Engineering (Right) 
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.75, 0.8, 0.92, 1], [60, 0, 0, -60], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none h-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8 overflow-hidden">
        
        <motion.div
          style={{ opacity: opacity1, y: y1, display: display1 }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center pb-4"
        >
          <div className="flex items-center space-x-3 mb-4 bg-slate-200/50 dark:bg-white/10 px-5 py-2 rounded-full border border-slate-300/50 dark:border-white/10 backdrop-blur-md">
            <motion.span 
              className="text-xl origin-bottom-right drop-shadow-md"
              animate={{ rotate: [0, 20, -10, 20, -10, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              👋
            </motion.span>
            <span className="text-slate-800 dark:text-white/80 text-sm font-semibold tracking-widest uppercase font-outfit">
              Hey there
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 dark:from-white dark:via-blue-300 dark:to-cyan-400 drop-shadow-2xl leading-tight font-outfit">
            Sai Santosh Madhari
          </h1>
          <p className="mt-2 text-xl md:text-2xl text-slate-700 dark:text-white/70 tracking-wide font-light drop-shadow-md font-plus">
            Aspiring AI Product Designer
          </p>
 
          {/* Minimalist Arrow Scroll Prompt */}
          <motion.div 
            className="mt-6 flex flex-col items-center opacity-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-900 dark:text-white"
            >
              <path 
                d="M7 13L12 18L17 13M12 6V17" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>

        </motion.div>

        {/* --- LAYER 1.5: Artist Sequence (Now first) --- */}
        <motion.div
          style={{ opacity: opacity1_5, y: y1_5 }}
          className="absolute inset-0 flex flex-col items-start justify-center p-12 md:p-32 text-left"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-normal text-slate-900 dark:text-white max-w-3xl drop-shadow-2xl leading-tight">
            Passionate Artist,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">Professional Designer.</span>
          </h2>
          <p className="mt-6 text-sm md:text-lg text-slate-700 dark:text-white/70 max-w-xl font-light">
            My passion toward arts brought me seamlessly into the realm of digital product design.
          </p>
        </motion.div>

        {/* --- LAYER 2: AI Automation (Now second) --- */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-normal bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 max-w-md drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            AI Automation & Orchestration.
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-700 dark:text-white/70 max-w-md">
            Leveraging design psychology and rigorous UX research <br className="hidden sm:block" />
            to establish powerful human-computer paradigms.
          </p>
        </motion.div>

        {/* --- LAYER 3: Bridging Design --- */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-normal text-slate-900 dark:text-white max-w-2xl drop-shadow-2xl">
            Bridging design and engineering.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-white/70 max-w-xl">
            Leveraging artificial intelligence to explore uncharted territories in generative interfaces and dynamic visual systems.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
