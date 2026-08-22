'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import LivingSkyEngine from '@/components/LivingSkyEngine';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { timePhase, weatherState, isWindy, windSpeed, themeMode } = useEnvironment();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '14%']);
  const contentY = useTransform(smoothY, [0, 1], [0, -40]);
  const contentOpacity = useTransform(smoothY, [0, 0.75], [1, 0]);

  // Interactive 3D mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine modes:
  const isAutoMode = themeMode === 'system';
  const isManualDark = themeMode === 'dark';
  const isManualLight = themeMode === 'light';

  const isDawn = timePhase === 'dawn';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';
  const isRaining = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';

  const titleWords = ["I", "design", "experiences", "that", "feel", "human."];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-5 sm:pb-8 px-4 sm:px-6 md:px-10 lg:px-12 select-none font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. DYNAMIC LIVING SKY (0 Static Images when in Auto / Location Search)     */}
      {/* ========================================================================= */}
      {isAutoMode ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <LivingSkyEngine />
        </div>
      ) : (
        /* Manual Photo Modes */
        <motion.div 
          animate={{
            x: [-mousePos.x * 16, -mousePos.x * 16 + 4, -mousePos.x * 16 - 4, -mousePos.x * 16],
            y: [-mousePos.y * 16, -mousePos.y * 16 - 3, -mousePos.y * 16 + 3, -mousePos.y * 16],
            scale: [1.02, 1.05, 1.03, 1.02],
          }}
          transition={{
            duration: isWindy ? Math.max(4, 70 / (windSpeed || 10)) : 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ y: imageY }}
          className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none origin-center"
        >
          {/* Manual Light Mode */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isManualLight ? 'opacity-100' : 'opacity-0'}`}>
            <div className="hidden sm:block absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying.jpg"
                alt="Sai Santosh Madhari daytime hero"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-center filter brightness-[1.08] contrast-[1.03]"
              />
            </div>
            <div className="block sm:hidden absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-mobile.png"
                alt="Sai Santosh Madhari daytime mobile"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-bottom filter brightness-[1.05] contrast-[1.02]"
              />
            </div>
          </div>

          {/* Manual Dark Mode */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isManualDark ? 'opacity-100' : 'opacity-0'}`}>
            <div className="hidden sm:block absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-night.jpg"
                alt="Sai Santosh Madhari nighttime hero"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.04]"
              />
            </div>
            <div className="block sm:hidden absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-night-mobile.png"
                alt="Sai Santosh Madhari nighttime mobile"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-bottom filter brightness-[1.04] contrast-[1.04]"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Atmospheric Overlays */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isRaining ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.45) 0%, rgba(30, 41, 59, 0.35) 50%, rgba(15, 23, 42, 0.6) 100%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isGoldenHour && !isManualDark ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 30%, rgba(255, 170, 50, 0.35) 0%, rgba(255, 120, 30, 0.15) 45%, transparent 75%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isSunset && !isManualDark ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(90, 20, 110, 0.45) 0%, rgba(220, 60, 80, 0.3) 40%, rgba(255, 140, 50, 0.15) 70%, transparent 100%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDawn && !isManualDark ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 130, 80, 0.35) 0%, rgba(255, 190, 120, 0.18) 35%, transparent 70%)'
        }}
      />

      {/* Readability Contrast Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.45) 0%, rgba(5, 10, 25, 0.1) 45%, rgba(5, 10, 25, 0.55) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT: PRECISE, ARTICULATED & CRISP                              */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full pointer-events-auto my-auto py-2 sm:py-4">
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-start justify-start max-w-2xl text-left"
        >
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 dark:bg-white/15 backdrop-blur-2xl border border-white/40 shadow-sm mb-3.5 text-white"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
            <span className="text-white text-xs font-semibold tracking-wide">
              Available for AI Product Designer roles
            </span>
          </motion.div>

          {/* Master Headline */}
          <h1 
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-3"
          >
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-2 text-white"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle - Reduced, Concise & High-Impact */}
          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="text-xs sm:text-sm md:text-base text-zinc-100 font-normal max-w-lg leading-relaxed drop-shadow-md mb-5"
          >
            Product designer shaping enterprise systems and human-in-the-loop AI interfaces.
          </motion.p>

          {/* View Works Button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
          >
            <button
              type="button"
              onClick={() => handleScrollTo('work')}
              className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm border border-blue-400/40 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>Explore Works</span>
              <span>&darr;</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Center Scroll Cue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-20 w-full flex justify-center items-center pointer-events-none pb-1"
      >
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
          className="touch-target pointer-events-auto flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full px-4 py-1"
          aria-label="Scroll to exploration"
        >
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="text-xs text-blue-300 group-hover:text-white"
          >
            &darr;
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
