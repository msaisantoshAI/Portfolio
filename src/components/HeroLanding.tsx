'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDay, timePhase, weatherState, location, isWindy, windSpeed, themeMode } = useEnvironment();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.06]);
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

  // Environmental lighting & theme variables
  const isNight = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night'));
  const isDawn = themeMode === 'system' && timePhase === 'dawn';
  const isGoldenHour = themeMode === 'system' && timePhase === 'goldenHour';
  const isSunset = themeMode === 'system' && timePhase === 'sunset';
  const isRaining = themeMode === 'system' && (weatherState === 'rain' || weatherState === 'thunderstorm');

  const titleWords = ["I", "design", "experiences", "that", "feel", "human."];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-[94vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-10 px-4 sm:px-6 md:px-10 lg:px-12 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS LIVING SKY SHOWS THROUGH 100% TRANSPARENT BACKGROUND          */}
      {/* ========================================================================= */}

      {/* Atmospheric Ambient Mood Layers */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isRaining ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.35) 0%, rgba(30, 41, 59, 0.25) 50%, rgba(15, 23, 42, 0.5) 100%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isGoldenHour ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 30%, rgba(255, 170, 50, 0.25) 0%, rgba(255, 120, 30, 0.1) 45%, transparent 75%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isSunset ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(90, 20, 110, 0.35) 0%, rgba(220, 60, 80, 0.2) 40%, rgba(255, 140, 50, 0.1) 70%, transparent 100%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDawn ? 'opacity-75' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 130, 80, 0.25) 0%, rgba(255, 190, 120, 0.12) 35%, transparent 70%)'
        }}
      />

      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isNight ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(180, 220, 255, 0.25) 0%, rgba(20, 40, 90, 0.2) 40%, rgba(2, 6, 18, 0.45) 85%)'
        }}
      />

      {/* Subtle Top-to-Bottom Contrast Vignette for Header and Typography */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isNight
            ? 'linear-gradient(to bottom, rgba(5, 10, 25, 0.45) 0%, rgba(5, 10, 25, 0.05) 40%, rgba(5, 10, 25, 0.5) 100%)'
            : 'linear-gradient(to bottom, rgba(10, 25, 60, 0.3) 0%, rgba(255, 255, 255, 0) 40%, rgba(5, 15, 35, 0.45) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 2. TRANSPARENT PNG CUTOUT OF SAI LYING ON GRASS (100vw Responsive)        */}
      {/* ========================================================================= */}
      <motion.div 
        animate={isWindy ? {
          x: [-mousePos.x * 12 - 2, -mousePos.x * 12 + 2, -mousePos.x * 12 - 2],
          y: [-mousePos.y * 12 - 1, -mousePos.y * 12 + 1, -mousePos.y * 12 - 1],
          rotate: [-0.1, 0.1, -0.1]
        } : {
          x: -mousePos.x * 12,
          y: -mousePos.y * 12,
          rotate: 0
        }}
        transition={{
          duration: isWindy ? Math.max(3, 80 / (windSpeed || 10)) : 0.3,
          repeat: isWindy ? Infinity : 0,
          ease: 'easeInOut'
        }}
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-x-0 bottom-0 w-full h-[65vh] sm:h-[72vh] md:h-[80vh] pointer-events-none origin-bottom z-10"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-sai-grass.png"
            alt="Sai Santosh Madhari lying on green grass looking up at the living sky"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-bottom sm:object-[center_bottom] pointer-events-none"
          />
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: RESPONSIVE TYPOGRAPHY & CALL TO ACTION                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full pointer-events-auto my-auto py-4">
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-start justify-start max-w-2xl text-left"
        >
          {/* Availability Badge: Adaptive Frosted Glass Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-2xl border shadow-sm mb-3 ${
              isNight
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white/75 dark:bg-black/60 border-white/60 dark:border-white/20 text-zinc-900 dark:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide font-sans">
              Available for AI Product Design roles
            </span>
            <span className="opacity-40">&bull;</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold opacity-90">
              {location}
            </span>
          </motion.div>

          {/* Master Headline: Pure White Crisp Acorn Typography */}
          <h1 
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
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

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="text-xs sm:text-sm md:text-base text-zinc-100 font-normal max-w-lg leading-relaxed drop-shadow-md mb-5 font-sans"
          >
            Product designer crafting digital experiences that are <span className="text-white font-semibold">intuitive</span>, <span className="text-white font-semibold">accessible</span>, and <span className="text-white font-semibold">meaningful</span>.
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
              className="touch-target inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              View works
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM HERO BAR: ONLY 1 CENTERED "SCROLL TO EXPLORE" BUTTON            */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-center text-white/90 font-mono text-xs border-t border-white/15 pt-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => handleScrollTo('about')}
          className="touch-target flex items-center gap-2 text-white hover:text-blue-300 transition-colors cursor-pointer group"
          aria-label="Scroll to explore"
        >
          <span className="tracking-widest uppercase text-[10px] sm:text-xs font-bold">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center group-hover:border-blue-400 group-hover:text-blue-400 transition-colors text-[10px]"
          >
            &darr;
          </motion.span>
        </button>
      </div>

    </section>
  );
}
