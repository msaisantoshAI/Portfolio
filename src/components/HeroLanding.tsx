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
  const imageY = useTransform(smoothY, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.1]);
  const contentY = useTransform(smoothY, [0, 1], [0, -50]);
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
      className="relative min-h-[90vh] sm:min-h-[94vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BRIGHT, HIGH-RESOLUTION HERO IMAGE WITH 3D PARALLAX & LIGHTING         */}
      {/* ========================================================================= */}
      <motion.div 
        animate={isWindy ? {
          x: [-mousePos.x * 16 - 2, -mousePos.x * 16 + 2, -mousePos.x * 16 - 2],
          y: [-mousePos.y * 16 - 1, -mousePos.y * 16 + 1, -mousePos.y * 16 - 1],
          rotate: [-0.15, 0.15, -0.15]
        } : {
          x: -mousePos.x * 16,
          y: -mousePos.y * 16,
          rotate: 0
        }}
        transition={{
          duration: isWindy ? Math.max(3, 80 / (windSpeed || 10)) : 0.3,
          repeat: isWindy ? Infinity : 0,
          ease: 'easeInOut'
        }}
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 w-full h-full pointer-events-none origin-center"
      >
        <Image
          src="/images/hero-lying.jpg"
          alt="Sai Santosh Madhari lying on green grass looking up at the living sky"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center sm:object-[center_35%] filter brightness-[1.08] contrast-[1.03]"
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC ENVIRONMENTAL LIGHTING OVERLAYS                            */}
      {/* ========================================================================= */}
      
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
          isGoldenHour ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 30%, rgba(255, 170, 50, 0.35) 0%, rgba(255, 120, 30, 0.15) 45%, transparent 75%)'
        }}
      />

      {/* Sunset Rich Coral/Violet Lighting */}
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
      <div className="relative z-20 max-w-[1440px] mx-auto w-full pointer-events-auto my-auto py-6">
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
      {/* 4. BOTTOM HERO BAR: SCROLL TO EXPLORE WITH CENTERED ARROW                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex items-center justify-between text-white/80 font-mono text-xs sm:text-sm border-t border-white/10 pt-4 pointer-events-auto">
        <span className="hidden sm:inline-block text-zinc-300">
          Scroll down to explore works
        </span>

        {/* Center: Animated Scroll Down Button */}
        <button
          type="button"
          onClick={() => handleScrollTo('about')}
          className="touch-target mx-auto sm:mx-0 flex items-center gap-2 text-white hover:text-blue-300 transition-colors cursor-pointer group"
          aria-label="Scroll to about section"
        >
          <span className="tracking-widest uppercase text-[11px] font-bold">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:border-blue-400"
          >
            &darr;
          </motion.span>
        </button>

        <span className="hidden sm:inline-block text-zinc-300">
          Sai Santosh &bull; 2026
        </span>
      </div>

    </section>
  );
}
