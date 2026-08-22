'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [curtainProgress, setCurtainProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    // Reduced motion preference check
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    // Progress animation for curtain opening
    const startTime = Date.now();
    const duration = 2800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setCurtainProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => setIsComplete(true), 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted || isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="curtain-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-[999999] pointer-events-auto select-none overflow-hidden font-sans"
      >
        {/* ========================================================================= */}
        {/* 1. CINEMATIC CURTAIN REVEAL PANELS (Splits/Slides Open as Character Pulls) */}
        {/* ========================================================================= */}
        
        {/* Main Curtain Body Sliding from Left to Right */}
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${Math.max(0, (1 - curtainProgress) * 100)}%` }}
          transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.1 }}
          className="absolute inset-y-0 left-0 bg-[#070b14] border-r-4 border-blue-500/80 shadow-[15px_0_50px_rgba(0,0,0,0.85)] z-20 flex items-center justify-end overflow-hidden"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, 
                rgba(255,255,255,0.02) 0px, 
                rgba(255,255,255,0.06) 18px, 
                rgba(0,0,0,0.4) 36px, 
                rgba(255,255,255,0.03) 54px
              ),
              radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.15), transparent 70%),
              linear-gradient(to bottom, #090e1c 0%, #050811 100%)
            `
          }}
        >
          {/* Decorative Curtain Rope Tassel / Border Trim */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

          {/* Curtain Fabric Folds Texture */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" />

          {/* Brand Monogram in Curtain Center (Fades as curtain pulls open) */}
          <motion.div
            animate={{ opacity: 1 - curtainProgress * 1.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap pointer-events-none"
          >
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-blue-400 font-bold mb-2">
              Portfolio
            </p>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              SAI SANTOSH
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-2">
              Opening stage...
            </p>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. ANIMATED CHARACTER PULLING THE CURTAIN FROM LEFT TO RIGHT               */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            left: `calc(${Math.max(0, (1 - curtainProgress) * 100)}% - 60px)`,
          }}
          className="absolute bottom-12 sm:bottom-16 z-30 flex flex-col items-center pointer-events-none transition-all duration-75"
        >
          {/* Animated SVG Character Pulling the Curtain */}
          <div className="relative w-24 h-28 flex items-center justify-center">
            
            {/* The Character Figure */}
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rope Attached to Curtain */}
              <path
                d="M48 55 Q 30 52 10 50"
                stroke="#60a5fa"
                strokeWidth="3.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Head / Cap */}
              <circle cx="58" cy="26" r="11" fill="#f8fafc" />
              {/* Sleek Cap */}
              <path d="M46 22 C46 16 70 16 70 22 L76 24 L72 27 L46 26 Z" fill="#2563eb" />
              {/* Designer Glasses */}
              <rect x="58" y="24" width="7" height="4" rx="1.5" fill="#0f172a" />
              <line x1="56" y1="26" x2="58" y2="26" stroke="#0f172a" strokeWidth="1.5" />

              {/* Torso / Jacket */}
              <path
                d="M47 38 C47 36 69 36 69 38 L72 65 C72 67 44 67 44 65 Z"
                fill="#1e293b"
              />
              {/* Inner Blue Shirt Accent */}
              <path d="M54 38 L62 38 L58 52 Z" fill="#3b82f6" />

              {/* Left Arm Pulling Back the Curtain */}
              <motion.g
                animate={{
                  rotate: [-8, 12, -8],
                  transformOrigin: '48px 42px',
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M48 42 L34 52 L44 56"
                  stroke="#f8fafc"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Hand Gripping Rope */}
                <circle cx="44" cy="56" r="4.5" fill="#f8fafc" />
              </motion.g>

              {/* Right Arm Balancing */}
              <motion.g
                animate={{
                  rotate: [10, -10, 10],
                  transformOrigin: '68px 42px',
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M68 42 L80 50 L84 62"
                  stroke="#f8fafc"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>

              {/* Left Leg Walking Motion */}
              <motion.g
                animate={{
                  rotate: [-20, 24, -20],
                  transformOrigin: '50px 65px',
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M50 65 L46 88 L38 98"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Modern Sneaker */}
                <path d="M34 98 L44 98 L43 103 L32 103 Z" fill="#2563eb" />
              </motion.g>

              {/* Right Leg Walking Motion */}
              <motion.g
                animate={{
                  rotate: [24, -20, 24],
                  transformOrigin: '64px 65px',
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M64 65 L68 86 L76 98"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Modern Sneaker */}
                <path d="M72 98 L82 98 L81 103 L70 103 Z" fill="#2563eb" />
              </motion.g>
            </svg>

            {/* Walking Dust/Effort Particles */}
            <motion.div
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8], x: [0, -10, -20] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              className="absolute bottom-2 -left-2 w-2 h-2 rounded-full bg-blue-400/60 blur-[0.5px]"
            />
          </div>

          {/* Action Speech Bubble */}
          <div className="bg-blue-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-lg border border-blue-400 whitespace-nowrap mt-1">
            Pulling stage open...
          </div>
        </motion.div>

        {/* Skip / Enter Immediately Button */}
        <button
          type="button"
          onClick={() => setIsComplete(true)}
          className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 text-xs font-mono backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        >
          Skip Intro ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
