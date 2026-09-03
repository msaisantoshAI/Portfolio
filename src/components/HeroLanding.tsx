'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDay, timePhase, themeMode } = useEnvironment();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.06]);
  const contentY = useTransform(smoothY, [0, 1], [0, -45]);
  const contentOpacity = useTransform(smoothY, [0, 0.75], [1, 0]);

  // Interactive subtle 3D mouse parallax
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

  // Determine if Night Hero Image should be active
  const isNightMode = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'twilight'));

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 md:px-10 lg:px-12 select-none font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS DYNAMIC HERO IMAGE (Day vs. Night & Desktop vs. Mobile Images) */}
      {/* ========================================================================= */}
      <motion.div 
        animate={{
          x: -mousePos.x * 10,
          y: -mousePos.y * 10,
          rotate: 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
        style={{ y: imageY, scale: imageScale }}
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none origin-center"
      >
        {/* ==================== DAYTIME HERO IMAGES ==================== */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isNightMode ? 'opacity-0' : 'opacity-100'}`}>
          {/* Desktop/Tablet Daytime */}
          <div className="hidden sm:block absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying.jpg"
              alt="Sai Santosh Madhari lying on green grass looking up at the sky"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.02]"
            />
          </div>
          {/* Mobile Daytime */}
          <div className="block sm:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-mobile.png"
              alt="Sai Santosh Madhari lying on green grass looking up at the sky on mobile"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-bottom filter brightness-[1.04] contrast-[1.02]"
            />
          </div>
        </div>

        {/* ==================== NIGHTTIME HERO IMAGES ==================== */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isNightMode ? 'opacity-100' : 'opacity-0'}`}>
          {/* Desktop/Tablet Nighttime */}
          <div className="hidden sm:block absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-night.jpg"
              alt="Sai Santosh Madhari lying on green grass looking up at the starry sky"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
            />
          </div>
          {/* Mobile Nighttime */}
          <div className="block sm:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-lying-night-mobile.png"
              alt="Sai Santosh Madhari lying on green grass looking up at the starry sky on mobile"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-bottom filter brightness-[1.02] contrast-[1.03]"
            />
          </div>
        </div>
      </motion.div>

      {/* Subtle Readability Contrast Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.4) 0%, rgba(5, 10, 25, 0.08) 50%, rgba(5, 10, 25, 0.5) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT CONTAINER                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full pointer-events-auto my-auto py-4">
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-start justify-start max-w-3xl text-left space-y-4"
        >
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 dark:bg-white/15 backdrop-blur-2xl border border-white/40 shadow-sm text-white"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-white text-xs font-semibold tracking-wide font-sans">
              Product Designer &bull; Systems Thinker
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            I design products that create value for people and growth for businesses.
          </motion.h1>

          {/* Concise Supporting Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-zinc-100 font-normal max-w-2xl leading-relaxed drop-shadow-md font-sans"
          >
            Product Designer combining design, technology, AI, and business thinking to solve complex problems across B2B and B2C products.
          </motion.p>

          {/* Primary and Secondary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              type="button"
              onClick={() => handleScrollTo('work')}
              className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>View My Work</span>
              <span className="text-sm">&darr;</span>
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('ai-exploration')}
              className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore AI Work</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM HERO BAR: SCROLL TO EXPLORE                                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-center text-white/90 font-mono text-xs border-t border-white/15 pt-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
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
