'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function CinematicLivingHero() {
  const { timePhase, weatherState, isDay, themeMode, location, localTime, temperature, weatherDescription } = useEnvironment();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const skyShiftX = useTransform(springX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const skyShiftY = useTransform(springY, [-0.5, 0.5], ['-1.5%', '1.5%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll parallax
  const { scrollY } = useScroll();
  const heroScrollY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  // Determine environmental lighting states
  const isNightTime = !isDay || timePhase === 'night' || themeMode === 'dark';
  const isSunsetTime = (timePhase === 'sunset' || timePhase === 'goldenHour') && themeMode !== 'dark' && themeMode !== 'light';
  const isDawnTime = timePhase === 'dawn' && themeMode === 'system';
  const isRainyWeather = (weatherState === 'rain' || weatherState === 'thunderstorm') && themeMode === 'system';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-[#03050c] flex items-center justify-center font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. LIVING CINEMATIC PHOTOGRAPHIC BASE (User's Uploaded Hero Scene)         */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: heroScrollY, opacity: heroOpacity, x: skyShiftX, translateY: skyShiftY }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/hero-base.jpg"
          alt="Sai Santosh Madhari lying on grass looking up at the living sky"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center sm:object-[center_35%] transition-all duration-1000"
        />

        {/* ========================================================================= */}
        {/* 2. REAL-TIME ATMOSPHERIC LIGHTING & SKY COLOR SHIFT LAYERS                */}
        {/* ========================================================================= */}

        {/* A. Nighttime Celestial Moonlight Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isNightTime ? 'opacity-85' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.78) 0%, rgba(5, 15, 45, 0.65) 45%, rgba(2, 6, 18, 0.85) 100%)',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Night Cool Blue Rim Lighting on Subject */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isNightTime ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 65% 55%, rgba(140, 195, 255, 0.4) 0%, transparent 65%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* B. Sunset & Golden Hour Rich Warm Amber Lighting */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isSunsetTime ? 'opacity-80' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(140, 45, 60, 0.4) 0%, rgba(240, 110, 45, 0.35) 40%, rgba(255, 170, 50, 0.3) 70%, rgba(100, 30, 20, 0.4) 100%)',
            mixBlendMode: 'color-burn'
          }}
        />

        {/* Sunset Golden Sunlight Flare */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isSunsetTime ? 'opacity-65' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 10% 40%, rgba(255, 200, 100, 0.6) 0%, rgba(255, 130, 40, 0.25) 45%, transparent 75%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* C. Dawn Morning Horizon Glow */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isDawnTime ? 'opacity-75' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(30, 50, 95, 0.4) 0%, rgba(180, 100, 130, 0.3) 40%, rgba(255, 170, 120, 0.35) 75%, transparent 100%)',
            mixBlendMode: 'soft-light'
          }}
        />

        {/* D. Overcast / Rain Moody Cool Slate Tone */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isRainyWeather ? 'opacity-65' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(30, 41, 59, 0.35) 50%, rgba(15, 23, 42, 0.5) 100%)',
            mixBlendMode: 'multiply'
          }}
        />

        {/* E. Soft Animated Living Cloud Strata */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[12%] -left-[10%] w-[60vw] max-w-[650px] h-[220px] rounded-full bg-white/40 blur-3xl animate-drift-slow" />
          <div className="absolute top-[35%] -right-[10%] w-[65vw] max-w-[700px] h-[240px] rounded-full bg-white/30 blur-3xl animate-drift-medium" />
        </div>

        {/* Subtle vignette for crisp text contrast */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 45%, transparent 80%)'
          }}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. HERO CONTENT LAYER (Headline, Subtitle, CTAs & Designer Identity)      */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full pt-16 sm:pt-20">
        
        <div className="max-w-xl sm:max-w-2xl space-y-4 sm:space-y-6">
          
          {/* Subtle Live Environmental Indicator Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Product Designer &times; AI Builder</span>
            <span className="text-white/30">•</span>
            <span className="text-blue-300 font-sans normal-case">
              {location} &bull; {temperature !== null ? `${temperature}°C` : ''} ({localTime}) &bull; {weatherDescription}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            I design experiences that feel human.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-zinc-100/90 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Product Designer crafting digital experiences that are intuitive, accessible and meaningful.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToSection('work')}
              className="touch-target cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-white"
            >
              View my work
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="touch-target cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black/40 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/30 hover:border-white/60 backdrop-blur-xl transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              Let&apos;s talk
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </motion.div>

        </div>

      </div>

      {/* Signature in bottom right corner */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 pointer-events-none opacity-85">
        <span className="font-serif italic text-white/90 text-sm sm:text-base tracking-wider drop-shadow-md">
          Sai Santosh
        </span>
      </div>

    </section>
  );
}
