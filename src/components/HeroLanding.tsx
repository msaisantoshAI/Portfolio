'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import LivingAtmosphere from '@/components/LivingAtmosphere';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDay, timePhase, weatherState, themeMode } = useEnvironment();

  // Hardware-accelerated Motion Value for subtle horizontal parallax (0 React re-renders)
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [8, -8]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.06]);
  const contentY = useTransform(smoothY, [0, 1], [0, -45]);
  const contentOpacity = useTransform(smoothY, [0, 0.75], [1, 0]);

  // Direct mouse move without React re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { width, left } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    mouseX.set(x);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isNightMode = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'twilight'));
  const isDawn = timePhase === 'dawn';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';
  const isRaining = weatherState === 'rain' || weatherState === 'thunderstorm';

  const titleWords = ["I", "design", "experiences", "that", "feel", "human."];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-5 sm:pb-8 px-4 sm:px-6 md:px-10 lg:px-12 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS DYNAMIC HERO IMAGE (Day vs. Night & Desktop vs. Mobile Images) */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ 
          y: imageY, 
          scale: imageScale,
          x: parallaxX,
        }}
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none origin-center"
      >
        {/* ==================== DAYTIME HERO IMAGES ==================== */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isNightMode ? 'opacity-0' : 'opacity-100'}`}>
          {/* Desktop/Tablet Daytime */}
          <div className="hidden sm:block absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying.jpg"
              alt="Sai Santosh Madhari lying on green grass looking up at the living daytime sky"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-center filter brightness-[1.06] contrast-[1.02]"
            />
          </div>
          {/* Mobile Daytime */}
          <div className="block sm:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-mobile.png"
              alt="Sai Santosh Madhari lying on green grass looking up at the living daytime sky on mobile"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-bottom filter brightness-[1.05] contrast-[1.02]"
            />
          </div>
        </div>

        {/* ==================== NIGHTTIME HERO IMAGES ==================== */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isNightMode ? 'opacity-100' : 'opacity-0'}`}>
          {/* Desktop/Tablet Nighttime */}
          <div className="hidden sm:block absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-night.jpg"
              alt="Sai Santosh Madhari lying on green grass looking up at the starry cosmic night sky"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.04]"
            />
          </div>
          {/* Mobile Nighttime */}
          <div className="block sm:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-night-mobile.png"
              alt="Sai Santosh Madhari lying on green grass looking up at the starry cosmic night sky on mobile"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-bottom filter brightness-[1.04] contrast-[1.04]"
            />
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. LIVING INTERACTIVE ATMOSPHERE (Smooth 60FPS Moving Sky & Stars)        */}
      {/* ========================================================================= */}
      <LivingAtmosphere isHero={true} />

      {/* Rain Atmosphere Mood */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isRaining ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.45) 0%, rgba(30, 41, 59, 0.35) 50%, rgba(15, 23, 42, 0.6) 100%)'
        }}
      />

      {/* Golden Hour Amber Sunlight Bloom */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isGoldenHour && !isNightMode ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 30%, rgba(255, 170, 50, 0.3) 0%, rgba(255, 120, 30, 0.12) 45%, transparent 75%)'
        }}
      />

      {/* Sunset Rich Coral/Violet Lighting */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isSunset && !isNightMode ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(90, 20, 110, 0.35) 0%, rgba(220, 60, 80, 0.25) 40%, rgba(255, 140, 50, 0.12) 70%, transparent 100%)'
        }}
      />

      {/* Dawn Rose Horizon Glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDawn && !isNightMode ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 130, 80, 0.3) 0%, rgba(255, 190, 120, 0.15) 35%, transparent 70%)'
        }}
      />

      {/* Readability Contrast Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.4) 0%, rgba(5, 10, 25, 0.08) 45%, rgba(5, 10, 25, 0.5) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: CENTER-LEFT ALIGNED CONTAINER                            */}
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
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-white text-xs font-semibold tracking-wide">
              Available for AI Product Designer roles
            </span>
          </motion.div>

          {/* Master Headline */}
          <h1 
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-3"
          >
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
              className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm border border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>Explore My Work</span>
              <span>&darr;</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM BAR: SCROLL CUE IN CENTER                                       */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full flex items-center justify-center pointer-events-none mt-auto">
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
          className="touch-target pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
          aria-label="Scroll down to work section"
        >
          <span className="inline-block animate-bounce">↓</span>
          <span>Scroll to explore</span>
        </button>
      </div>
    </section>
  );
}
