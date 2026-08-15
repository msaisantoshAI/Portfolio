'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDay, timePhase, weatherState, location, isWindy, windSpeed } = useEnvironment();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const imageY = useTransform(smoothY, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.08]);
  const contentY = useTransform(smoothY, [0, 1], [0, -45]);
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

  // Environmental lighting variables
  const isNight = !isDay || timePhase === 'night';
  const isDawn = timePhase === 'dawn';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';
  const isRaining = weatherState === 'rain' || weatherState === 'thunderstorm';

  const titleWords = ["I", "design", "experiences", "that", "feel", "human."];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-[94vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BRIGHT, HIGH-RESOLUTION HERO IMAGE WITH 3D PARALLAX & LIGHTING         */}
      {/* ========================================================================= */}
      <motion.div 
        animate={isWindy ? {
          x: [-mousePos.x * 16 - 2, -mousePos.x * 16 + 2, -mousePos.x * 16 - 2],
          rotate: [-0.3, 0.3, -0.3],
        } : {}}
        transition={{ duration: 7 / Math.max(0.7, windSpeed / 10), repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          y: imageY, 
          scale: imageScale,
          x: mousePos.x * 16,
          rotateX: -mousePos.y * 3,
          rotateY: mousePos.x * 3,
        }}
        className="absolute inset-0 w-full h-full min-h-[112%] -top-4 pointer-events-none transition-transform duration-300 ease-out origin-center"
      >
        <Image
          src="/images/hero-lying.jpg"
          alt="Sai Santosh Madhari lying on grass looking up at the sky"
          fill
          priority
          className={`object-cover object-center sm:object-[center_35%] transition-all duration-1000 ${
            isNight 
              ? 'brightness-[0.62] contrast-[1.1] saturate-[0.92] hue-rotate-[10deg]' 
              : isSunset 
              ? 'brightness-[0.92] contrast-[1.06] saturate-[1.25] hue-rotate-[-10deg]' 
              : isGoldenHour 
              ? 'brightness-[1.12] contrast-[1.05] saturate-[1.3]' 
              : isDawn 
              ? 'brightness-[0.96] contrast-[1.04] saturate-[1.1] hue-rotate-[-5deg]' 
              : isRaining 
              ? 'brightness-[0.88] contrast-[1.02] saturate-[0.9]' 
              : 'brightness-[1.18] contrast-[1.02] saturate-[1.08]'
          }`}
          quality={95}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC ENVIRONMENTAL LIGHTING LAYERS                             */}
      {/* ========================================================================= */}

      {/* Daytime Sun Flare & Warm Radiant Bloom */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          !isNight && !isRaining ? 'opacity-75' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 14% 16%, rgba(255, 255, 235, 0.45) 0%, rgba(255, 220, 140, 0.2) 30%, transparent 65%)'
        }}
      />

      {/* Golden Hour Warm Saffron Radiance */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isGoldenHour ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 170, 40, 0.4) 0%, rgba(255, 110, 50, 0.25) 45%, transparent 75%)'
        }}
      />

      {/* Sunset Twilight Crimson Tint */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isSunset ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(90, 20, 110, 0.45) 0%, rgba(220, 60, 80, 0.3) 40%, rgba(255, 140, 50, 0.15) 70%, transparent 100%)'
        }}
      />

      {/* Dawn Rose Horizon Glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDawn ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(255, 130, 80, 0.35) 0%, rgba(255, 190, 120, 0.18) 35%, transparent 70%)'
        }}
      />

      {/* Midnight Starry Cosmic Atmosphere */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isNight ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 85% 15%, rgba(180, 220, 255, 0.3) 0%, rgba(20, 40, 90, 0.25) 40%, rgba(2, 6, 18, 0.55) 85%)'
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* Readability Contrast Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.5) 0%, rgba(5, 10, 25, 0.1) 45%, rgba(5, 10, 25, 0.6) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: CENTER-LEFT ALIGNED CONTAINER                            */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1320px] mx-auto w-full pointer-events-auto my-auto py-6">
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-start justify-start max-w-2xl text-left"
        >
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-white/20 shadow-md mb-3.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide font-sans">
              Available for AI Product Design roles
            </span>
            <span className="text-white/30">&bull;</span>
            <span className="text-zinc-300 text-xs sm:text-sm font-mono">
              {location}
            </span>
          </motion.div>

          {/* Master Headline: Acorn Fallback Serif Display Typography */}
          <h1 className="hero-heading text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] mb-3.5">
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block mr-2 sm:mr-2.5 ${
                  word.includes("human") 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 drop-shadow-[0_0_25px_rgba(100,180,255,0.5)]" 
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="body-lead text-zinc-200 font-normal max-w-xl leading-relaxed drop-shadow-md mb-6 font-sans"
          >
            Product designer crafting digital experiences that are <span className="text-white font-semibold">intuitive</span>, <span className="text-white font-semibold">accessible</span>, and <span className="text-white font-semibold">meaningful</span>.
          </motion.p>

          {/* View Works Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <button
              type="button"
              onClick={() => handleScrollTo('work')}
              className="touch-target inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              View works
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CENTERED SCROLL TO EXPLORE WITH ANIMATED ARROW                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-2 pb-1">
        <button
          type="button"
          onClick={() => handleScrollTo('work')}
          className="touch-target inline-flex flex-col items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-white transition-all group cursor-pointer"
          aria-label="Scroll to explore projects"
        >
          <span className="tracking-widest uppercase font-mono text-[10px] sm:text-xs text-zinc-300 group-hover:text-blue-400 transition-colors">
            Scroll to explore
          </span>
          <motion.div 
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-md"
          >
            <svg className="w-3.5 h-3.5 text-blue-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </button>
      </div>

    </section>
  );
}
