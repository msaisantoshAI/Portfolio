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
  const imageY = useTransform(smoothY, [0, 1], ['0%', '12%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.05]);
  const contentY = useTransform(smoothY, [0, 1], [0, -40]);
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

  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // In Auto mode, decide day vs night
  const isAutoNight = isAuto && (!isDay || timePhase === 'night' || timePhase === 'twilight');

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 md:px-10 lg:px-12 select-none font-sans transition-colors duration-700 ${
        isManualLight ? 'bg-[#F8F9FA]' : isManualDark ? 'bg-[#0A0A0B]' : 'bg-transparent'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. HERO BACKGROUND IMAGES CONTAINER                                       */}
      {/* ========================================================================= */}
      <motion.div 
        animate={{
          x: -mousePos.x * 8,
          y: -mousePos.y * 8,
          rotate: 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
        style={{ y: imageY, scale: imageScale }}
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none origin-center"
      >
        {/* ----------------------------------------------------------------------- */}
        {/* A. MANUAL LIGHT MODE: Color Studio Portrait on Off-White                */}
        {/* ----------------------------------------------------------------------- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isManualLight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-portrait-color.png"
              alt="Sai Santosh Madhari - Product Designer"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-right md:object-center filter brightness-[1.01] contrast-[1.01]"
            />
          </div>
          {/* Subtle directional gradient for crystal clear text readability on smaller screens */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F9FA]/90 via-[#F8F9FA]/60 sm:via-[#F8F9FA]/20 to-transparent pointer-events-none" />
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* B. MANUAL DARK MODE: Black & White Studio Portrait on Matte Black       */}
        {/* ----------------------------------------------------------------------- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isManualDark ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 w-full h-full bg-[#0A0A0B]">
            <Image
              src="/images/hero-portrait-bw.png"
              alt="Sai Santosh Madhari - Product Designer (B&W)"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="w-full h-full object-cover object-right md:object-center filter brightness-[0.88] contrast-[1.08] mix-blend-screen opacity-90"
            />
          </div>
          {/* Matte black gradient overlay on the left for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/80 sm:via-[#0A0A0B]/40 to-transparent pointer-events-none" />
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* C. AUTO MODE: Nature Lying Day & Night Hero Images                       */}
        {/* ----------------------------------------------------------------------- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Auto Daytime Nature Image */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${!isAutoNight ? 'opacity-100' : 'opacity-0'}`}>
            <div className="hidden sm:block absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying.jpg"
                alt="Sai Santosh Madhari looking at the daytime sky"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.02]"
              />
            </div>
            <div className="block sm:hidden absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-mobile.png"
                alt="Sai Santosh Madhari looking at the daytime sky on mobile"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-bottom filter brightness-[1.04] contrast-[1.02]"
              />
            </div>
          </div>

          {/* Auto Nighttime Nature Image */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${isAutoNight ? 'opacity-100' : 'opacity-0'}`}>
            <div className="hidden sm:block absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-night.jpg"
                alt="Sai Santosh Madhari looking at the starry sky"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
              />
            </div>
            <div className="block sm:hidden absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-lying-night-mobile.png"
                alt="Sai Santosh Madhari looking at the starry sky on mobile"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="w-full h-full object-cover object-bottom filter brightness-[1.02] contrast-[1.03]"
              />
            </div>
          </div>

          {/* Auto mode outdoor contrast vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.4) 0%, rgba(5, 10, 25, 0.08) 50%, rgba(5, 10, 25, 0.5) 100%)'
            }}
          />
        </div>

      </motion.div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT CONTAINER (WCAG AAA High Contrast in All Modes)           */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full pointer-events-auto my-auto py-4">
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-start justify-start max-w-3xl text-left space-y-4"
        >
          {/* Availability / Position Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm ${
              isManualLight 
                ? 'bg-white/90 border-black/10 text-zinc-800' 
                : 'bg-white/10 dark:bg-white/15 backdrop-blur-2xl border-white/30 text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-semibold tracking-wide font-sans">
              Product Designer &bull; Systems Thinker
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight ${
              isManualLight 
                ? 'text-zinc-950' 
                : 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]'
            }`}
          >
            I design products that create value for people and growth for businesses.
          </motion.h1>

          {/* Concise Supporting Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className={`text-sm sm:text-base md:text-lg font-normal max-w-2xl leading-relaxed font-sans ${
              isManualLight 
                ? 'text-zinc-700' 
                : 'text-zinc-100 drop-shadow-md'
            }`}
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
              className={`touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm backdrop-blur-md border shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans ${
                isManualLight 
                  ? 'bg-white/80 hover:bg-white text-zinc-900 border-black/15 focus-visible:ring-2 focus-visible:ring-zinc-900' 
                  : 'bg-white/15 hover:bg-white/25 text-white border-white/30 focus-visible:ring-2 focus-visible:ring-white'
              }`}
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
      <div className={`relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-center font-mono text-xs border-t pt-3 pointer-events-auto ${
        isManualLight ? 'border-black/10 text-zinc-600' : 'border-white/15 text-white/90'
      }`}>
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
          className={`touch-target flex items-center gap-2 transition-colors cursor-pointer group ${
            isManualLight ? 'text-zinc-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
          }`}
          aria-label="Scroll to explore"
        >
          <span className="tracking-widest uppercase text-[10px] sm:text-xs font-bold">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors text-[10px] ${
              isManualLight 
                ? 'border-zinc-400 group-hover:border-blue-600 group-hover:text-blue-600' 
                : 'border-white/50 group-hover:border-blue-400 group-hover:text-blue-400'
            }`}
          >
            &darr;
          </motion.span>
        </button>
      </div>

    </section>
  );
}
