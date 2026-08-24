'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    // 3.2 seconds quick cinematic entrance
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="sai-minimal-loader"
        initial={{ y: 0 }}
        exit={{ 
          y: '-100%',
          transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] } 
        }}
        className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#F7F5EC] dark:bg-[#060913] select-none overflow-hidden font-sans"
      >
        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center text-center px-6 max-w-lg mx-auto"
        >
          {/* Top Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mb-4"
          >
            Welcome to my portfolio
          </motion.p>

          {/* Master Name with Animated Dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-4 my-2"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              SAI
            </h1>

            {/* Glowing animated dots in the middle */}
            <div className="flex items-center gap-1.5 pt-1">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              />
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-400 dark:bg-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              SANTOSH
            </h1>
          </motion.div>

          {/* Minimal Sleek Loader Below Name */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 140 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-6"
          >
            <motion.div
              animate={{
                x: [-140, 140],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Ambient Subtle Border Frame */}
        <div className="absolute inset-4 sm:inset-6 rounded-2xl border border-black/5 dark:border-white/5 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
