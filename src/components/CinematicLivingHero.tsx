'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function CinematicLivingHero() {
  const { timePhase, weatherState, isDay, themeMode, location, localTime, temperature, weatherDescription } = useEnvironment();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax interaction with smooth physical spring damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  // Multi-depth parallax offsets
  const skyShiftX = useTransform(springX, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const skyShiftY = useTransform(springY, [-0.5, 0.5], ['-2%', '2%']);

  const cloudShiftX = useTransform(springX, [-0.5, 0.5], ['-4.5%', '4.5%']);
  const cloudShiftY = useTransform(springY, [-0.5, 0.5], ['-3%', '3%']);

  const sunShiftX = useTransform(springX, [-0.5, 0.5], ['-6%', '6%']);
  const sunShiftY = useTransform(springY, [-0.5, 0.5], ['-4%', '4%']);

  const personShiftX = useTransform(springX, [-0.5, 0.5], ['-1.2%', '1.2%']);
  const personShiftY = useTransform(springY, [-0.5, 0.5], ['-0.8%', '0.8%']);

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
  const heroScrollY = useTransform(scrollY, [0, 800], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.15]);

  // Determine environmental lighting states
  const isNightTime = !isDay || timePhase === 'night' || themeMode === 'dark';
  const isSunsetTime = (timePhase === 'sunset' || timePhase === 'goldenHour') && themeMode !== 'dark' && themeMode !== 'light';
  const isDawnTime = timePhase === 'dawn' && themeMode === 'system';
  const isRainyWeather = (weatherState === 'rain' || weatherState === 'thunderstorm') && themeMode === 'system';

  // Dynamic sky image based on real-time location, time of day & weather
  const getHeroSkyImage = () => {
    if (themeMode === 'light') return '/images/sky-day.png';
    if (themeMode === 'dark') return '/images/sky-night.png';
    if (isRainyWeather) return '/images/locations/sky-rain.jpg';
    if (isNightTime) return '/images/locations/sky-night.jpg';
    if (isSunsetTime) return '/images/locations/sky-sunset.jpg';
    if (isDawnTime) return '/images/locations/sky-dawn.jpg';
    if (timePhase === 'morning') return '/images/locations/sky-morning.jpg';
    return '/images/locations/sky-afternoon.jpg';
  };

  const currentSkyImage = getHeroSkyImage();

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
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-[#02050e] flex items-center justify-center font-sans"
    >
      {/* ========================================================================= */}
      {/* 1. DYNAMIC LIVING SKY LAYER (Real-time Location, Time & Weather Synced)     */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: heroScrollY, opacity: heroOpacity, x: skyShiftX, translateY: skyShiftY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          key={currentSkyImage}
          src={currentSkyImage}
          alt={`Live sky background for ${location}`}
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center transition-opacity duration-1000"
        />

        {/* Dynamic celestial Sun Flare (Day & Sunset) / Moon Radiance (Night) */}
        {!isNightTime ? (
          <motion.div 
            style={{ x: sunShiftX, y: sunShiftY }}
            className="absolute top-[18%] left-[8%] w-[380px] h-[380px] pointer-events-none rounded-full animate-sun-pulse"
            style-custom={{
              background: isSunsetTime 
                ? 'radial-gradient(circle, rgba(255, 200, 100, 0.7) 0%, rgba(255, 120, 40, 0.3) 45%, transparent 75%)'
                : 'radial-gradient(circle, rgba(255, 255, 230, 0.65) 0%, rgba(255, 220, 140, 0.25) 45%, transparent 75%)',
              filter: 'blur(30px)'
            }}
          />
        ) : (
          <motion.div 
            style={{ x: sunShiftX, y: sunShiftY }}
            className="absolute top-[15%] right-[15%] w-[300px] h-[300px] pointer-events-none rounded-full opacity-60"
            style-custom={{
              background: 'radial-gradient(circle, rgba(200, 230, 255, 0.5) 0%, rgba(80, 130, 220, 0.15) 50%, transparent 75%)',
              filter: 'blur(25px)'
            }}
          />
        )}

        {/* Multi-Depth Animated Cloud Strata (Simulating Living Time-lapse Video) */}
        <motion.div 
          style={{ x: cloudShiftX, y: cloudShiftY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Layer A: High Altitude Cirrus (Slow) */}
          <div className="absolute top-[8%] -left-[20%] w-[140vw] h-[220px] bg-white/20 dark:bg-white/10 rounded-full blur-3xl animate-drift-slow" />
          
          {/* Layer B: Mid Altitude Cumulus (Medium) */}
          <div className="absolute top-[28%] -right-[15%] w-[130vw] h-[260px] bg-white/25 dark:bg-white/8 rounded-full blur-3xl animate-drift-medium" />

          {/* Layer C: Low Altitude Horizon Glow (Fast) */}
          <div className="absolute top-[48%] -left-[10%] w-[120vw] h-[200px] bg-white/15 dark:bg-white/5 rounded-full blur-2xl animate-drift-fast" />
        </motion.div>
      </motion.div>


      {/* ========================================================================= */}
      {/* 2. LIVING SUBJECT & GRASS LAYER (Cutout with Living Micro-Movements)        */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: heroScrollY, opacity: heroOpacity, x: personShiftX, translateY: personShiftY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <div className="relative w-full h-full animate-hero-breathe">
          <Image
            src="/images/hero-person-cutout.png"
            alt="Sai Santosh Madhari in grass with live living environment"
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-center sm:object-[center_35%] transition-all duration-1000 animate-wind-grass"
          />

          {/* Glasses Reflection Light Sweep Shimmer */}
          <div 
            className="absolute top-[58%] right-[28%] sm:right-[31%] w-12 h-6 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[1px] pointer-events-none animate-glass-shimmer"
          />

          {/* Floating Dandelion Seeds / Pollen Breeze Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-[25%] left-[20%] w-2 h-2 rounded-full bg-white/75 blur-[0.5px] animate-seed-1" />
            <div className="absolute bottom-[35%] left-[45%] w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px] animate-seed-2" />
            <div className="absolute bottom-[20%] left-[65%] w-2.5 h-2.5 rounded-full bg-white/70 blur-[0.5px] animate-seed-3" />
          </div>

          {/* ======================================================================= */}
          {/* Dynamic Environmental Lighting Tints on the Person & Grass              */}
          {/* ======================================================================= */}

          {/* Night Mode Cool Moonlight Illumination & Deep Shadows */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              isNightTime ? 'opacity-85' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(2, 6, 25, 0.45) 45%, rgba(1, 4, 18, 0.8) 100%)',
              mixBlendMode: 'multiply'
            }}
          />

          {/* Sunset Golden Rim Light on Subject */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              isSunsetTime ? 'opacity-75' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(240, 110, 45, 0.25) 45%, rgba(255, 170, 50, 0.35) 100%)',
              mixBlendMode: 'color-dodge'
            }}
          />

          {/* Dawn Soft Horizon Light */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              isDawnTime ? 'opacity-65' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 180, 140, 0.2) 50%, rgba(255, 150, 110, 0.3) 100%)',
              mixBlendMode: 'soft-light'
            }}
          />

          {/* Rain / Overcast Diffused Tone */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              isRainyWeather ? 'opacity-60' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.3) 50%, rgba(15, 23, 42, 0.5) 100%)',
              mixBlendMode: 'multiply'
            }}
          />

        </div>
      </motion.div>


      {/* ========================================================================= */}
      {/* 3. HERO CONTENT LAYER (Headline, Subtitle, CTAs & Live Location Pill)     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center h-full pt-16 sm:pt-20 pointer-events-none">
        
        <div className="max-w-xl sm:max-w-2xl space-y-4 sm:space-y-6 pointer-events-auto">
          
          {/* Live Environmental Indicator Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-2xl border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Product Designer &times; AI Builder</span>
            <span className="text-white/30">•</span>
            <span className="text-blue-300 font-sans normal-case font-medium">
              {location} &bull; {temperature !== null ? `${temperature}°C` : ''} ({localTime}) &bull; {weatherDescription}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            I design experiences that feel human.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-zinc-100/95 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
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
              className="touch-target cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black/45 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/30 hover:border-white/60 backdrop-blur-xl transition-all shadow-md hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
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
