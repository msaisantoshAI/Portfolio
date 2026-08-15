'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import { ArrowDown, FileText } from 'lucide-react';

export default function HeroSection() {
  const { timePhase, weatherState, isDay, location } = useEnvironment();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Engine
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const imageX = useTransform(smoothMouseX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const imageY = useTransform(smoothMouseY, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const skyBloomX = useTransform(smoothMouseX, [-0.5, 0.5], ['-3%', '3%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Lighting & Atmospheric Grading Filters based on Environment
  const getAtmosphericFilters = () => {
    if (!isDay || timePhase === 'night') {
      return {
        filter: 'brightness(0.65) contrast(1.15) saturate(0.85) hue-rotate(200deg)',
      };
    }
    if (timePhase === 'sunset' || timePhase === 'goldenHour') {
      return {
        filter: 'brightness(0.95) contrast(1.08) saturate(1.25) sepia(0.2) hue-rotate(-10deg)',
      };
    }
    if (timePhase === 'dawn') {
      return {
        filter: 'brightness(0.88) contrast(1.05) saturate(0.95) sepia(0.15) hue-rotate(330deg)',
      };
    }
    if (weatherState === 'rain' || weatherState === 'cloudy' || weatherState === 'fog') {
      return {
        filter: 'brightness(0.85) contrast(0.95) saturate(0.85) hue-rotate(190deg)',
      };
    }
    // Clear / Bright Daytime
    return {
      filter: 'brightness(1) contrast(1) saturate(1)',
    };
  };

  const currentAtmosphere = getAtmosphericFilters();

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ========================================================================= */}
      {/* 1. LIVING HERO PHOTOGRAPH (Full Viewport Coverage)                        */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ x: imageX, y: imageY }}
        className="absolute -inset-[3%] w-[106%] h-[106%] pointer-events-none z-0"
      >
        <Image
          src="/images/hero-ambient.jpg"
          alt="Sai Santosh Madhari looking at the open living sky"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-[center_68%] sm:object-[center_62%] transition-all duration-1000 ease-out"
          style={currentAtmosphere}
        />
      </motion.div>


      {/* ========================================================================= */}
      {/* 2. DYNAMIC ENVIRONMENTAL LIGHTING & SKY BLOOM                             */}
      {/* ========================================================================= */}
      
      {/* Daytime Sun Warmth Zenith Bloom */}
      {isDay && (timePhase === 'morning' || timePhase === 'afternoon') && (
        <motion.div 
          style={{ 
            x: skyBloomX,
            background: 'radial-gradient(circle at 18% 30%, rgba(255, 245, 200, 0.45) 0%, rgba(255, 220, 140, 0.18) 35%, transparent 70%)'
          }}
          className="absolute inset-0 pointer-events-none z-[1] opacity-40 transition-opacity duration-1000"
        />
      )}

      {/* Golden Hour / Sunset Amber Glow */}
      {(timePhase === 'goldenHour' || timePhase === 'sunset') && (
        <motion.div 
          style={{ 
            x: skyBloomX,
            background: 'radial-gradient(circle at 12% 40%, rgba(255, 140, 40, 0.55) 0%, rgba(255, 80, 20, 0.25) 35%, rgba(120, 20, 100, 0.15) 60%, transparent 85%)'
          }}
          className="absolute inset-0 pointer-events-none z-[1] opacity-60 transition-opacity duration-1000"
        />
      )}

      {/* Midnight Celestial Stars & Lunar Illumination */}
      {(!isDay || timePhase === 'night') && (
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-75 transition-opacity duration-1000">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 80% 20%, rgba(180, 220, 255, 0.25) 0%, rgba(15, 25, 50, 0.3) 40%, rgba(5, 10, 25, 0.6) 80%)'
            }}
          />
          {/* Subtle Twinkling Star Points in upper sky */}
          <div className="absolute top-[10%] left-[25%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80" />
          <div className="absolute top-[18%] left-[45%] w-1.5 h-1.5 bg-blue-100 rounded-full animate-pulse opacity-70 delay-300" />
          <div className="absolute top-[8%] left-[65%] w-1 h-1 bg-white rounded-full animate-pulse opacity-90 delay-700" />
          <div className="absolute top-[22%] left-[82%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse opacity-60 delay-500" />
          <div className="absolute top-[14%] left-[12%] w-1 h-1 bg-white rounded-full animate-pulse opacity-75 delay-200" />
        </div>
      )}

      {/* Dynamic Drifting Wispy Clouds Layer */}
      <div className="absolute top-0 inset-x-0 h-[45%] pointer-events-none z-[2] overflow-hidden opacity-35">
        <div className="absolute -top-10 -left-[20%] w-[140%] h-[120px] bg-white/20 blur-3xl animate-drift-slow" />
        <div className="absolute top-10 -left-[10%] w-[130%] h-[100px] bg-white/15 blur-2xl animate-drift-medium" />
      </div>

      {/* Subtle Bottom Contrast Vignette for Content Readability */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none z-[3] opacity-85"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, transparent 100%)'
        }}
      />


      {/* ========================================================================= */}
      {/* 3. HERO CONTENT & TYPOGRAPHY OVERLAY                                      */}
      {/* ========================================================================= */}
      
      {/* Top Spacer for Navigation */}
      <div className="pt-24 sm:pt-28 px-6 sm:px-12 md:px-16 relative z-10" />

      {/* Main Content Area positioned elegantly at the lower portion */}
      <div className="px-6 sm:px-12 md:px-16 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-end">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4 sm:space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm font-medium shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Product Designer &bull; AI Systems Builder</span>
          </div>

          {/* Designer Name Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] font-sans">
              Sai Santosh Madhari
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-200 font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] font-sans">
              Designing intelligent enterprise systems, spatial interfaces & ambient environments.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            
            {/* View Work CTA */}
            <a
              href="#work"
              className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
            >
              <span>View Case Studies</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {/* About Me CTA */}
            <a
              href="#about"
              className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl text-white font-medium text-sm border border-white/25 hover:bg-black/70 hover:border-white/40 transition-all duration-200"
            >
              <span>About Me</span>
            </a>

            {/* Resume Button */}
            <a
              href="/sai-santosh-madhari-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-black/40 backdrop-blur-xl text-zinc-200 hover:text-white text-sm border border-white/20 hover:border-white/40 transition-all duration-200"
              title="Download Sai's Resume"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/sai-santosh-madhari/"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target p-3 rounded-full bg-black/40 backdrop-blur-xl text-zinc-200 hover:text-white text-base border border-white/20 hover:border-white/40 transition-all duration-200"
              aria-label="Sai Santosh Madhari LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

          </div>

        </motion.div>

        {/* Bottom subtle scroll cue */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-6 flex items-center justify-between text-xs text-zinc-300 font-mono tracking-wider"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-ping" />
            <span>Living Environment: {location} ({timePhase})</span>
          </div>

          <a href="#work" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
            <span>Scroll down</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </motion.div>

      </div>

    </section>
  );
}
