'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDay, timePhase, weatherState, location } = useEnvironment();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.06]);
  const contentY = useTransform(smoothY, [0, 1], [0, -60]);
  const contentOpacity = useTransform(smoothY, [0, 0.7], [1, 0]);

  // Subtle interactive mouse parallax
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

  // Time-of-day dynamic atmosphere classes & overlays
  const isNight = !isDay || timePhase === 'night';
  const isDawn = timePhase === 'dawn';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';
  const isRaining = weatherState === 'rain' || weatherState === 'thunderstorm';

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-[95vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden font-sans pt-20 sm:pt-24 pb-10 sm:pb-14 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. HERO BACKGROUND IMAGE WITH 3D PARALLAX & REAL-TIME LIGHTING ADAPTATION */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ 
          y: imageY, 
          scale: imageScale,
          x: mousePos.x * 15,
          rotateX: -mousePos.y * 3,
          rotateY: mousePos.x * 3,
        }}
        className="absolute inset-0 w-full h-full min-h-[110%] -top-4 pointer-events-none transition-transform duration-300 ease-out origin-center"
      >
        <Image
          src="/images/hero-lying.jpg"
          alt="Sai Santosh Madhari lying on grass looking up at the sky"
          fill
          priority
          className={`object-cover object-center sm:object-[center_35%] transition-all duration-1000 ${
            isNight 
              ? 'brightness-[0.42] contrast-[1.15] saturate-[0.85] hue-rotate-[10deg]' 
              : isSunset 
              ? 'brightness-[0.75] contrast-[1.1] saturate-[1.25] hue-rotate-[-10deg]' 
              : isGoldenHour 
              ? 'brightness-[0.95] contrast-[1.08] saturate-[1.3]' 
              : isDawn 
              ? 'brightness-[0.8] contrast-[1.05] saturate-[1.1] hue-rotate-[-5deg]' 
              : isRaining 
              ? 'brightness-[0.7] contrast-[1.0] saturate-[0.8]' 
              : 'brightness-[1.02] contrast-[1.02] saturate-[1.05]'
          }`}
          quality={95}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC ENVIRONMENTAL LIGHTING LAYERS                             */}
      {/* ========================================================================= */}

      {/* A. Daytime Sun Flare & Warm Radiant Bloom */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          !isNight && !isRaining ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 12% 18%, rgba(255, 255, 235, 0.45) 0%, rgba(255, 220, 140, 0.2) 30%, transparent 65%)'
        }}
      />

      {/* B. Golden Hour Warm Saffron & Amber Radiance */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isGoldenHour ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 170, 40, 0.4) 0%, rgba(255, 110, 50, 0.25) 45%, transparent 75%)'
        }}
      />

      {/* C. Sunset Twilight Violet & Crimson Tint */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isSunset ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(90, 20, 110, 0.45) 0%, rgba(220, 60, 80, 0.3) 40%, rgba(255, 140, 50, 0.15) 70%, transparent 100%)'
        }}
      />

      {/* D. Dawn Morning Awakening Horizon Rose Glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDawn ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 130, 80, 0.35) 0%, rgba(255, 190, 120, 0.18) 35%, transparent 70%)'
        }}
      />

      {/* E. Midnight Celestial Moonlit Glow & Starry Aura */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isNight ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(180, 220, 255, 0.3) 0%, rgba(20, 40, 90, 0.25) 40%, rgba(2, 6, 18, 0.55) 85%)'
        }}
      >
        {/* Subtle Star Glistening Particles over Sky Portion */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* F. Top-to-Bottom Contrast Gradient for Flawless Readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.65) 0%, rgba(5, 10, 25, 0.25) 40%, rgba(5, 10, 25, 0.75) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: HEADLINE, ROLE, CTAS, & GLASS BADGES                     */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex flex-col items-start justify-start max-w-3xl mx-auto md:mx-0 pt-4 sm:pt-8 text-left pointer-events-auto"
      >
        {/* 01. Live Environmental Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-white/20 shadow-md mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-xs font-semibold tracking-wide font-sans">
            Available for Senior UX & AI Leadership
          </span>
          <span className="text-white/30">&bull;</span>
          <span className="text-zinc-300 text-xs font-mono">
            {location}
          </span>
        </motion.div>

        {/* 02. Master Name Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] mb-3"
        >
          Sai Santosh <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
            Madhari
          </span>
        </motion.h1>

        {/* 03. Role & Specialization */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-zinc-200 font-medium max-w-2xl leading-relaxed drop-shadow-md mb-6"
        >
          Product Designer &times; AI Builder. Transforming complex multi-agent architectures and enterprise workflows into intuitive, human-centered systems.
        </motion.p>

        {/* 04. Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => handleScrollTo('work')}
            className="touch-target cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0a0f1d] hover:bg-[#141f3d] text-white font-bold text-sm border border-white/30 hover:border-white/60 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.7)] focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View Selected Work
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => handleScrollTo('about')}
            className="touch-target cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black/60 hover:bg-white/10 text-white font-semibold text-sm border border-white/20 hover:border-white/40 backdrop-blur-xl transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
          >
            About My Craft
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target cursor-pointer inline-flex items-center justify-center gap-1.5 px-4.5 py-3 rounded-full bg-black/40 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-sm border border-white/15 hover:border-white/30 backdrop-blur-md transition-all"
          >
            Resume PDF ↗
          </a>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SEAMLESS INTEGRATION WITH NEXT SECTION                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex items-center justify-between pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
          <span className="text-blue-400">⌘</span>
          <span>Lead Designer @ Tata Consultancy Services</span>
        </div>

        {/* Scroll Prompt Indicator */}
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors group cursor-pointer"
        >
          <span>Scroll to explore</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

    </section>
  );
}
