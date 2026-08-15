'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function LivingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { timePhase, weatherState, isDay, location, temperature, weatherDescription } = useEnvironment();

  // Scroll Parallax Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.15,
  });

  const skyParallax = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const contentY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  // Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 15);
    mouseY.set(y * 15);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[92vh] min-h-[640px] max-h-[960px] overflow-hidden select-none flex items-center justify-center font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. LIVING HERO PHOTOGRAPHIC BASE (Sai Santosh Reclining in Grass)         */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: skyParallax, x: springMouseX, translateY: springMouseY }}
        className="absolute inset-x-0 -top-12 -bottom-12 w-full h-[120%] pointer-events-none"
      >
        <Image
          src="/images/hero-ambient-base.jpg"
          alt="Sai Santosh Madhari reclining on green grass looking up at the sky"
          fill
          priority
          quality={95}
          className="object-cover object-center scale-105 transition-all duration-1000"
          sizes="100vw"
        />
      </motion.div>


      {/* ========================================================================= */}
      {/* 2. DYNAMIC REAL-TIME LIGHTING & ATMOSPHERIC TINTS                          */}
      {/* ========================================================================= */}
      
      {/* A. Daylight Warm Zenith Sun Beam */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isDay && (timePhase === 'morning' || timePhase === 'afternoon') ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 15% 30%, rgba(255, 245, 220, 0.45) 0%, rgba(255, 230, 160, 0.15) 35%, transparent 70%)'
        }}
      />

      {/* B. Dawn Rose-Gold Morning Horizon Light */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          timePhase === 'dawn' ? 'opacity-55' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 140, 90, 0.4) 0%, rgba(255, 190, 130, 0.2) 30%, transparent 70%)'
        }}
      />

      {/* C. Golden Hour Warm Amber Rim Light on Face & Grass */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          timePhase === 'goldenHour' ? 'opacity-65' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, rgba(255, 160, 40, 0.5) 0%, rgba(255, 120, 30, 0.25) 40%, transparent 80%)'
        }}
      />

      {/* D. Sunset Twilight Crimson / Violet Atmospheric Glow */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          timePhase === 'sunset' ? 'opacity-70' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(140, 30, 90, 0.5) 0%, rgba(220, 70, 60, 0.3) 35%, rgba(255, 140, 40, 0.2) 65%, transparent 100%)'
        }}
      />

      {/* E. Night / Midnight Moonlit Celestial Atmosphere */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          !isDay || timePhase === 'night' ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(20, 40, 95, 0.75) 0%, rgba(6, 12, 32, 0.85) 50%, rgba(2, 4, 12, 0.92) 100%)'
        }}
      >
        {/* Glowing Full Moon */}
        <div className="absolute top-[12%] right-[16%] w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 shadow-[0_0_50px_rgba(200,230,255,0.9),0_0_100px_rgba(100,180,255,0.4)] opacity-90 pointer-events-none" />
        
        {/* Twinkling Starfield in the Upper Sky */}
        <div className="absolute inset-x-0 top-0 h-[65%] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[65%] bg-[radial-gradient(#93c5fd_1.5px,transparent_1.5px)] [background-size:52px_52px] opacity-60 pointer-events-none" />
      </div>

      {/* F. Overcast / Monsoon Rain Moody Filter */}
      {(weatherState === 'rain' || weatherState === 'thunderstorm' || weatherState === 'cloudy') && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-1000"
          style={{
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.2) 60%, transparent 100%)'
          }}
        />
      )}


      {/* ========================================================================= */}
      {/* 3. LIVING DRIFTING VOLUMETRIC CLOUDS (Upper Sky Region)                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 top-0 h-[60%] pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[15%] -left-[10%] w-[550px] h-[160px] rounded-full bg-white/20 dark:bg-white/5 blur-3xl animate-drift-slow" />
        <div className="absolute top-[35%] -right-[10%] w-[650px] h-[180px] rounded-full bg-white/15 dark:bg-white/5 blur-3xl animate-drift-medium" />
      </div>


      {/* ========================================================================= */}
      {/* 4. HERO CONTENT & TYPOGRAPHY (Top Left Negative Space)                    */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-12 flex flex-col justify-start items-start pt-16 sm:pt-20 md:pt-24 pointer-events-auto"
      >
        <div className="max-w-xl text-left space-y-4">
          
          {/* Live Location & Availability Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white text-xs font-medium shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Senior Product Design &times; AI Builder</span>
            <span className="text-white/30">•</span>
            <span className="text-blue-300 font-mono text-[11px]">
              {location} {temperature !== null ? `(${temperature}°C • ${weatherDescription})` : ''}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_3px_20px_rgba(0,0,0,0.85)]"
          >
            I design experiences <br className="hidden sm:inline" />
            that feel human.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Product Designer crafting digital experiences that are intuitive, accessible and meaningful.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-3 flex flex-wrap items-center gap-3.5"
          >
            <button
              type="button"
              onClick={() => handleScrollTo('work')}
              className="touch-target cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>View my work</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo('contact')}
              className="touch-target cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white font-medium text-xs sm:text-sm border border-white/30 hover:border-white/50 backdrop-blur-xl transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Let&apos;s talk</span>
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Gradient Fade to Content */}
      <div 
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(3, 5, 12, 0.8) 0%, transparent 100%)'
        }}
      />
    </section>
  );
}
