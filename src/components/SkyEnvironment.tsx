'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import AtmosphericSkyCanvas from '@/components/AtmosphericSkyCanvas';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode } = useEnvironment();
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking for smooth manual photo parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-35%']);
  const canopyScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Photorealistic Day Sky Image & Upward Trees         */}
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
            alt="Manual Daytime Sky with Trees looking up"
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
      {/* 2. MANUAL DARK MODE: Photorealistic Night Sky Image & Stars               */}
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
            alt="Manual Night Sky with Stars and Trees looking up"
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
      {/* 3. AUTO MODE: LIVING PROCEDURAL WEATHER & CELESTIAL DOME (0 STATIC IMAGES) */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <AtmosphericSkyCanvas />
      </div>

    </div>
  );
}
