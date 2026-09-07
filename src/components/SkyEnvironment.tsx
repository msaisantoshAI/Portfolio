'use client';

import React, { useEffect, useState } from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';
import AtmosphericSkyCanvas from '@/components/AtmosphericSkyCanvas';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode } = useEnvironment();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-700">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Clean Off-White Background (0 Sky Photos)          */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 bg-[#F8F9FA] transition-opacity duration-700 ${
          isManualLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: Clean Matte Black Background (0 Sky Photos)         */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 bg-[#0A0A0B] transition-opacity duration-700 ${
          isManualDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ========================================================================= */}
      {/* 3. AUTO MODE: LIVING PROCEDURAL WEATHER & CELESTIAL DOME                   */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <AtmosphericSkyCanvas />
      </div>

    </div>
  );
}
