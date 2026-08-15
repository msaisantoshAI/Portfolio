'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, isDay, isWindy } = useEnvironment();
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking for smooth parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  // Vertical scroll translation (gliding through the sky & tree canopy)
  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-42%']);
  const canopyScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Manual Modes vs Auto Mode
  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Environmental time phases
  const isNight = !isDay || timePhase === 'night';
  const isDawn = timePhase === 'dawn';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Photorealistic Day Sky & Canopy Trees               */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-day.png"
            alt="Photorealistic Daytime Sky with Trees looking up"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={95}
          />
        </motion.div>
        
        {/* Soft sunlight zenith warmth */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 18% 14%, rgba(255, 255, 240, 0.4) 0%, rgba(255, 235, 170, 0.15) 30%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: Photorealistic Night Sky, Stars & Dark Trees         */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-night.png"
            alt="Photorealistic Night Sky with Stars and Trees looking up"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={95}
          />
        </motion.div>

        {/* Twinkling Starlight Halo */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.25) 0%, rgba(50, 90, 180, 0.1) 35%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. AUTO MODE: REAL-TIME LIVING CANOPY & SKY (Adapted to Time & Weather)    */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dynamic Wind Sway Wrapper */}
        <motion.div 
          animate={isWindy ? {
            rotate: [-0.6, 0.6, -0.6],
            x: ['-0.8%', '0.8%', '-0.8%'],
          } : {
            rotate: [-0.2, 0.2, -0.2],
            x: ['-0.3%', '0.3%', '-0.3%'],
          }}
          transition={{
            duration: isWindy ? 6 : 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px] origin-top"
        >
          {/* Base Photorealistic Tree Canopy Layer (Switches between Day & Night based on exact solar phase) */}
          <Image
            src={isNight ? '/images/sky-night.png' : '/images/sky-day.png'}
            alt="Living Environment Canopy looking up at the sky"
            fill
            priority
            className={`object-cover object-top transition-all duration-1000 ${
              isSunset 
                ? 'brightness-[0.92] contrast-[1.12] saturate-[1.35] hue-rotate-[-8deg]' 
                : isGoldenHour 
                ? 'brightness-[1.06] contrast-[1.06] saturate-[1.3]' 
                : isDawn 
                ? 'brightness-[0.94] contrast-[1.04] saturate-[1.12] hue-rotate-[-4deg]' 
                : 'brightness-[1.08] contrast-[1.02]'
            }`}
            sizes="100vw"
            quality={95}
          />
        </motion.div>

        {/* ------------------------------------------------------------------- */}
        {/* ATMOSPHERIC SOLAR LIGHTING FILTERS (Day, Dawn, Golden, Sunset, Night) */}
        {/* ------------------------------------------------------------------- */}

        {/* Daytime Radiant Solar Glow */}
        {!isNight && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-40"
            style={{
              background: 'radial-gradient(circle at 18% 14%, rgba(255, 255, 240, 0.45) 0%, rgba(255, 235, 170, 0.18) 30%, transparent 65%)'
            }}
          />
        )}

        {/* Golden Hour (5:00 PM - 6:00 PM) Warm Amber Sunlight */}
        {isGoldenHour && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 170, 40, 0.35) 0%, rgba(255, 110, 50, 0.2) 45%, transparent 75%)'
            }}
          />
        )}

        {/* Sunset / Twilight (6:00 PM - 7:00 PM) Crimson & Coral Horizon */}
        {isSunset && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-85"
            style={{
              background: 'linear-gradient(to top, rgba(90, 20, 110, 0.45) 0%, rgba(230, 70, 70, 0.3) 35%, rgba(255, 140, 40, 0.2) 65%, transparent 100%)'
            }}
          />
        )}

        {/* Dawn (5:00 AM - 7:00 AM) Soft Rose & Peach Morning Light */}
        {isDawn && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-75"
            style={{
              background: 'linear-gradient(to top, rgba(255, 120, 80, 0.3) 0%, rgba(255, 190, 130, 0.15) 35%, transparent 70%)'
            }}
          />
        )}

        {/* Night (7:00 PM - 5:00 AM) Starry Cosmic Atmosphere & Moonbeam Glow */}
        {isNight && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-90"
            style={{
              background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.25) 0%, rgba(30, 60, 140, 0.15) 35%, transparent 70%)'
            }}
          >
            {/* Ambient Star Texture Points */}
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
          </div>
        )}

        {/* Contrast Readability Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, transparent 40%, rgba(0,0,0,0.12) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)'
          }}
        />
      </div>

    </div>
  );
}
