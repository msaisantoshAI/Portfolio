'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking that adapts dynamically to user's scrolling speed
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  // Vertical scroll translation (drifting through the sky proportionally to scroll speed)
  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-42%']);
  const cloudGlowY = useTransform(smoothProgress, [0, 1], [0, -160]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* ========================================================= */}
      {/* 1. LIGHT MODE: SUNNY DAY SKY (With Speed-Responsive Scroll) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 transition-opacity duration-1000 opacity-100 dark:opacity-0">
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-day.png"
            alt="Sunny blue sky background"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        
        {/* Soft sunlight zenith bloom */}
        <motion.div 
          style={{ 
            y: cloudGlowY,
            background: 'radial-gradient(circle at 15% 12%, rgba(255, 255, 240, 0.4) 0%, rgba(255, 235, 170, 0.15) 30%, transparent 65%)'
          }}
          className="absolute inset-0 opacity-45 pointer-events-none"
        />
      </div>

      {/* ========================================================= */}
      {/* 2. DARK MODE: STARRY NIGHT SKY (With Speed-Responsive Scroll) */}
      {/* ========================================================= */}
      <div className="absolute inset-0 transition-opacity duration-1000 opacity-0 dark:opacity-100">
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-night.png"
            alt="Starry night sky background with moon"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
        </motion.div>

        {/* Soft moonlight aura */}
        <motion.div 
          style={{ 
            y: cloudGlowY,
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.2) 0%, rgba(50, 90, 180, 0.08) 35%, transparent 65%)'
          }}
          className="absolute inset-0 opacity-40 pointer-events-none"
        />
      </div>

      {/* Subtle volumetric drift highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[60vw] max-w-[700px] h-[220px] rounded-full bg-white/20 dark:bg-blue-400/5 blur-3xl animate-drift-slow" />
        <div className="absolute top-[60%] -right-[10%] w-[65vw] max-w-[750px] h-[240px] rounded-full bg-white/15 dark:bg-blue-400/5 blur-3xl animate-drift-medium" />
      </div>

    </div>
  );
}
