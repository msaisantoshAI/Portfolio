'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TimePhase } from '@/context/EnvironmentContext';

interface TreeCanopyProps {
  timePhase: TimePhase;
  isDay: boolean;
  windSpeed: number; // km/h
}

export default function TreeCanopy({ timePhase, isDay, windSpeed }: TreeCanopyProps) {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 20,
    mass: 0.15,
  });

  // Parallax translation on scroll (subtle upward/downward drift)
  const leftBranchY = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  const rightBranchY = useTransform(smoothProgress, [0, 1], ['0%', '-22%']);
  const topCanopyY = useTransform(smoothProgress, [0, 1], ['0%', '-10%']);

  // Wind speed factor calculation (faster & wider sway in high wind)
  const isHighWind = windSpeed > 22;
  const swayDuration = isHighWind ? 3.5 : 7.0;
  const swayAngleLeft = isHighWind ? [-2.5, 3.5, -2.5] : [-1.2, 1.8, -1.2];
  const swayAngleRight = isHighWind ? [3.0, -3.0, 3.0] : [1.5, -1.5, 1.5];

  // Dynamic Lighting Tints based on Daylight Phase
  const isNight = !isDay || timePhase === 'night';
  const isSunset = timePhase === 'sunset';
  const isGolden = timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';

  const leafHue = isNight 
    ? 'brightness(0.35) contrast(1.2) hue-rotate(190deg) drop-shadow(0 15px 30px rgba(0,10,30,0.8))'
    : isSunset
    ? 'brightness(0.75) contrast(1.15) sepia(0.6) hue-rotate(-20deg) drop-shadow(0 15px 30px rgba(40,10,20,0.6))'
    : isGolden
    ? 'brightness(1.05) contrast(1.1) sepia(0.4) hue-rotate(15deg) drop-shadow(0 15px 30px rgba(60,40,0,0.4))'
    : isDawn
    ? 'brightness(0.85) contrast(1.05) hue-rotate(-10deg)'
    : 'brightness(1.08) contrast(1.02)';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-20 transition-all duration-1000">
      
      {/* 1. TOP-LEFT OVERHANGING TREE BRANCH & LUSH LEAVES */}
      <motion.div
        style={{ y: leftBranchY }}
        className="absolute -top-12 -left-12 sm:-top-8 sm:-left-8 w-[380px] sm:w-[540px] md:w-[680px] h-[340px] sm:h-[460px] origin-top-left pointer-events-none"
      >
        <motion.div
          animate={{
            rotate: swayAngleLeft,
            x: [0, 4, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: swayDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full transition-all duration-1000 origin-top-left"
          style={{ filter: leafHue }}
        >
          {/* Organic Vector Foliage Silhouette */}
          <svg viewBox="0 0 500 350" fill="none" className="w-full h-full opacity-90">
            <defs>
              <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isNight ? "#060b18" : isGolden ? "#2d4a12" : "#1b3814"} />
                <stop offset="60%" stopColor={isNight ? "#0b152d" : isGolden ? "#4a781b" : "#2d5a22"} />
                <stop offset="100%" stopColor={isNight ? "#122045" : isGolden ? "#6e9e24" : "#447e33"} />
              </linearGradient>
            </defs>
            {/* Branches */}
            <path d="M-10,-10 Q140,80 280,110 Q380,125 460,95 Q380,140 270,135 Q140,110 -10,30 Z" fill="#1e1811" />
            <path d="M120,70 Q210,160 320,180 Q220,185 110,95 Z" fill="#261f17" />
            <path d="M220,100 Q300,60 390,50 Q310,80 210,115 Z" fill="#261f17" />
            {/* Clustered Leaves */}
            <circle cx="90" cy="40" r="65" fill="url(#leafGradLeft)" />
            <circle cx="160" cy="70" r="75" fill="url(#leafGradLeft)" />
            <circle cx="230" cy="90" r="85" fill="url(#leafGradLeft)" />
            <circle cx="310" cy="110" r="70" fill="url(#leafGradLeft)" />
            <circle cx="390" cy="90" r="60" fill="url(#leafGradLeft)" />
            <circle cx="440" cy="70" r="45" fill="url(#leafGradLeft)" />
            <circle cx="180" cy="140" r="65" fill="url(#leafGradLeft)" />
            <circle cx="260" cy="160" r="60" fill="url(#leafGradLeft)" />
            <circle cx="330" cy="170" r="50" fill="url(#leafGradLeft)" />
            <circle cx="350" cy="45" r="55" fill="url(#leafGradLeft)" />
            <circle cx="280" cy="35" r="50" fill="url(#leafGradLeft)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 2. TOP-RIGHT OVERHANGING TREE CANOPY */}
      <motion.div
        style={{ y: rightBranchY }}
        className="absolute -top-12 -right-12 sm:-top-8 sm:-right-8 w-[360px] sm:w-[500px] md:w-[640px] h-[320px] sm:h-[440px] origin-top-right pointer-events-none"
      >
        <motion.div
          animate={{
            rotate: swayAngleRight,
            x: [0, -5, 0],
            y: [0, 4, 0],
          }}
          transition={{
            duration: swayDuration * 1.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full transition-all duration-1000 origin-top-right"
          style={{ filter: leafHue }}
        >
          <svg viewBox="0 0 500 350" fill="none" className="w-full h-full opacity-85">
            <defs>
              <linearGradient id="leafGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isNight ? "#050914" : isGolden ? "#243c0e" : "#173111"} />
                <stop offset="60%" stopColor={isNight ? "#0d1833" : isGolden ? "#416c17" : "#27501e"} />
                <stop offset="100%" stopColor={isNight ? "#142650" : isGolden ? "#628f20" : "#3c702d"} />
              </linearGradient>
            </defs>
            {/* Branches */}
            <path d="M510,-10 Q360,75 220,105 Q120,120 40,90 Q120,135 230,130 Q360,105 510,30 Z" fill="#1e1811" />
            <path d="M380,65 Q290,155 180,175 Q280,180 390,90 Z" fill="#261f17" />
            {/* Leaves */}
            <circle cx="410" cy="40" r="65" fill="url(#leafGradRight)" />
            <circle cx="340" cy="70" r="75" fill="url(#leafGradRight)" />
            <circle cx="270" cy="90" r="80" fill="url(#leafGradRight)" />
            <circle cx="190" cy="110" r="65" fill="url(#leafGradRight)" />
            <circle cx="110" cy="90" r="55" fill="url(#leafGradRight)" />
            <circle cx="60" cy="70" r="40" fill="url(#leafGradRight)" />
            <circle cx="320" cy="140" r="60" fill="url(#leafGradRight)" />
            <circle cx="240" cy="160" r="55" fill="url(#leafGradRight)" />
            <circle cx="170" cy="170" r="45" fill="url(#leafGradRight)" />
            <circle cx="150" cy="45" r="50" fill="url(#leafGradRight)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3. SUBTLE TOP ZENITH LEAF LACE */}
      <motion.div
        style={{ y: topCanopyY }}
        className="absolute -top-16 inset-x-0 mx-auto w-[600px] h-[160px] opacity-70 pointer-events-none"
      >
        <div 
          className="w-full h-full transition-all duration-1000"
          style={{ filter: leafHue }}
        >
          <svg viewBox="0 0 600 150" fill="none" className="w-full h-full">
            <ellipse cx="300" cy="30" rx="220" ry="60" fill={isNight ? "#081024" : isGolden ? "#335414" : "#1c3c15"} opacity="0.6" />
            <ellipse cx="200" cy="40" rx="140" ry="50" fill={isNight ? "#0b152f" : isGolden ? "#436e1a" : "#2a5420"} opacity="0.7" />
            <ellipse cx="400" cy="40" rx="140" ry="50" fill={isNight ? "#0b152f" : isGolden ? "#436e1a" : "#2a5420"} opacity="0.7" />
          </svg>
        </div>
      </motion.div>

    </div>
  );
}
