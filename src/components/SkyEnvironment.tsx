'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase } from '@/context/EnvironmentContext';

function getNaturalSkyAsset(timePhase: TimePhase, isDay: boolean): string {
  if (!isDay || timePhase === 'night' || timePhase === 'twilight') {
    return '/images/sky-night.png';
  }
  switch (timePhase) {
    case 'dawn':
      return '/images/locations/sky-dawn.jpg';
    case 'morning':
      return '/images/locations/sky-morning.jpg';
    case 'goldenHour':
      return '/images/locations/sky-golden.jpg';
    case 'sunset':
      return '/images/locations/sky-sunset.jpg';
    case 'afternoon':
    default:
      return '/images/sky-day.png';
  }
}

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { 
    themeMode, 
    timePhase, 
    weatherState, 
    isDay, 
    isWindy 
  } = useEnvironment();

  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking for smooth natural parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-35%']);
  const canopyScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isManualLight = themeMode === 'light';
  const isAuto = themeMode === 'system';

  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';
  const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';

  const naturalSkySrc = isAuto ? getNaturalSkyAsset(timePhase, isDay) : (isManualLight ? '/images/sky-day.png' : '/images/sky-night.png');

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. CRISP NATURAL NATURE SKY BACKDROP (Looking upward into the zenith)     */}
      {/* ========================================================================= */}
      <motion.div 
        animate={isWindy ? {
          rotate: [-0.3, 0.3, -0.3],
          x: ['-0.3%', '0.3%', '-0.3%'],
        } : {
          rotate: [-0.1, 0.1, -0.1],
          x: ['-0.1%', '0.1%', '-0.1%'],
        }}
        transition={{
          duration: isWindy ? 6 : 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ y: skyY, scale: canopyScale }}
        className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px] origin-top"
      >
        <Image
          src={naturalSkySrc}
          alt="Natural Nature Sky looking upward"
          fill
          priority
          className={`object-cover object-top transition-all duration-1000 ${
            isNight 
              ? 'brightness-[0.9] contrast-[1.1]' 
              : isSunset 
              ? 'brightness-[1.04] contrast-[1.08] saturate-[1.25]' 
              : isDawn 
              ? 'brightness-[1.02] contrast-[1.04] saturate-[1.12]' 
              : isRain 
              ? 'brightness-[0.88] contrast-[1.02] saturate-[0.85]' 
              : 'brightness-[1.06] contrast-[1.02]'
          }`}
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. NATURAL ATMOSPHERIC SOLAR LIGHTING BLOOM                               */}
      {/* ========================================================================= */}

      {/* Daytime Sunlit Radiance */}
      {!isNight && !isRain && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-40"
          style={{
            background: 'radial-gradient(circle at 20% 15%, rgba(255, 255, 240, 0.45) 0%, rgba(255, 230, 160, 0.18) 30%, transparent 65%)'
          }}
        />
      )}

      {/* Golden Hour / Sunset Horizon Amber Tint */}
      {isSunset && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-75"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 160, 40, 0.35) 0%, rgba(255, 90, 60, 0.2) 45%, transparent 75%)'
          }}
        />
      )}

      {/* Dawn Rose Horizon Tint */}
      {isDawn && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-70"
          style={{
            background: 'linear-gradient(to top, rgba(255, 130, 80, 0.3) 0%, rgba(255, 190, 120, 0.15) 35%, transparent 70%)'
          }}
        />
      )}

      {/* Night Cosmic Starfield Texture */}
      {isNight && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-60"
          style={{
            background: 'radial-gradient(circle at 82% 16%, rgba(180, 220, 255, 0.25) 0%, rgba(30, 60, 140, 0.15) 35%, transparent 70%)'
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
        </div>
      )}

      {/* Readability Contrast Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: isDay 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)'
        }}
      />

    </div>
  );
}
