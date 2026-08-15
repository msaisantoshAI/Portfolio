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
  const imageScale = useTransform(smoothY, [0, 1], [1, 1.08]);
  const contentY = useTransform(smoothY, [0, 1], [0, -60]);
  const contentOpacity = useTransform(smoothY, [0, 0.75], [1, 0]);

  // Interactive 3D mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollToWork = () => {
    const el = document.getElementById('work') || document.getElementById('about');
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
      className="relative min-h-[92vh] sm:min-h-[96vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden font-sans pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 md:px-16 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BRIGHT, HIGH-RESOLUTION HERO IMAGE WITH 3D PARALLAX & LIGHTING         */}
      {/* ========================================================================= */}
      <motion.div 
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
              ? 'brightness-[0.55] contrast-[1.12] saturate-[0.9] hue-rotate-[10deg]' 
              : isSunset 
              ? 'brightness-[0.88] contrast-[1.08] saturate-[1.25] hue-rotate-[-10deg]' 
              : isGoldenHour 
              ? 'brightness-[1.08] contrast-[1.06] saturate-[1.3]' 
              : isDawn 
              ? 'brightness-[0.92] contrast-[1.04] saturate-[1.1] hue-rotate-[-5deg]' 
              : isRaining 
              ? 'brightness-[0.82] contrast-[1.02] saturate-[0.88]' 
              : 'brightness-[1.14] contrast-[1.02] saturate-[1.08]'
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
          background: 'linear-gradient(to bottom, rgba(5, 10, 25, 0.55) 0%, rgba(5, 10, 25, 0.15) 45%, rgba(5, 10, 25, 0.65) 100%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT: EDITORIAL TITLE & ACCESSIBLE SUBTITLE (NO EXTRA BUTTONS)  */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex flex-col items-start justify-start max-w-4xl mx-auto md:mx-0 pt-2 sm:pt-4 text-left pointer-events-auto"
      >
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-white/20 shadow-md mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide font-sans">
            Available for Senior UX & AI Leadership
          </span>
          <span className="text-white/30">&bull;</span>
          <span className="text-zinc-300 text-xs sm:text-sm font-mono">
            {location}
          </span>
        </motion.div>

        {/* Master Headline: "I design experiences that feel human." (Staggered Word Reveal) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight text-white leading-[1.06] drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] mb-4 sm:mb-6">
          {titleWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block mr-2.5 sm:mr-3.5 ${
                word.includes("human") 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 drop-shadow-[0_0_30px_rgba(100,180,255,0.6)]" 
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-lg sm:text-2xl md:text-2xl lg:text-[1.7rem] text-zinc-100 font-light max-w-3xl leading-relaxed drop-shadow-md"
        >
          Product designer crafting digital experiences that are <span className="text-white font-medium">intuitive</span>, <span className="text-white font-medium">accessible</span>, and <span className="text-white font-medium">meaningful</span>.
        </motion.p>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. CENTERED SCROLL TO EXPLORE WITH ANIMATED ARROW                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-6 pb-2">
        <button
          type="button"
          onClick={handleScrollToWork}
          className="touch-target inline-flex flex-col items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all group cursor-pointer"
          aria-label="Scroll to explore projects"
        >
          <span className="tracking-widest uppercase font-mono text-[11px] sm:text-xs text-zinc-300 group-hover:text-blue-400 transition-colors">
            Scroll to explore
          </span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-md"
          >
            <svg className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </button>
      </div>

    </section>
  );
}
