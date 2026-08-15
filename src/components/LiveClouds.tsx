'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WeatherState, TimePhase } from '@/context/EnvironmentContext';

interface LiveCloudsProps {
  weatherState: WeatherState;
  timePhase: TimePhase;
  isDay: boolean;
}

export default function LiveClouds({ weatherState, timePhase, isDay }: LiveCloudsProps) {
  // Determine cloud tier based on live weather
  const isClear = weatherState === 'clear';
  const isPartlyCloudy = weatherState === 'partlyCloudy';
  const isOvercast = weatherState === 'cloudy' || weatherState === 'rain' || weatherState === 'thunderstorm' || weatherState === 'fog';

  const isNight = !isDay || timePhase === 'night';
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';

  // Base opacity based on live weather
  const baseOpacity = isClear ? 0.25 : isPartlyCloudy ? 0.6 : 0.85;

  // Cloud styling based on time phase
  const cloudTint = isNight
    ? 'rgba(180, 210, 255, 0.25)'
    : isSunset
    ? 'rgba(255, 190, 140, 0.55)'
    : isDawn
    ? 'rgba(255, 215, 190, 0.5)'
    : 'rgba(255, 255, 255, 0.7)';

  const cloudGlow = isNight
    ? 'drop-shadow(0 15px 35px rgba(100, 150, 255, 0.15))'
    : isSunset
    ? 'drop-shadow(0 20px 45px rgba(255, 140, 70, 0.4))'
    : 'drop-shadow(0 20px 50px rgba(255, 255, 255, 0.55))';

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transition-opacity duration-1000 z-10"
      style={{ opacity: baseOpacity }}
    >
      {/* Tier 1: Slow High-Altitude Cirrus Clouds (Upper Sky) */}
      <motion.div
        animate={{
          x: ['-5%', '8%', '-5%'],
          y: ['0%', '-4%', '0%'],
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 -left-20 w-[140%] h-[320px] filter blur-2xl pointer-events-none"
        style={{ filter: cloudGlow }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(ellipse 65% 50% at 30% 40%, ${cloudTint} 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 75% 35%, ${cloudTint} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      {/* Tier 2: Mid-Altitude Cumulus Cloud Formations (Center Horizon) */}
      {(isPartlyCloudy || isOvercast) && (
        <motion.div
          animate={{
            x: ['6%', '-8%', '6%'],
            y: ['0%', '3%', '0%'],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-24 -right-20 w-[135%] h-[420px] filter blur-xl pointer-events-none"
          style={{ filter: cloudGlow }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 60% 45%, ${cloudTint} 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 55%, ${cloudTint} 0%, transparent 60%)`
            }}
          />
        </motion.div>
      )}

      {/* Tier 3: Rolling Dense Atmospheric Cloud Bank (When Overcast / Rain / Cloudy) */}
      {isOvercast && (
        <motion.div
          animate={{
            x: ['-8%', '10%', '-8%'],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-48 -left-32 w-[150%] h-[500px] filter blur-3xl pointer-events-none"
          style={{ filter: cloudGlow }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 45% 50%, ${cloudTint} 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 45%, ${cloudTint} 0%, transparent 65%)`
            }}
          />
        </motion.div>
      )}

      {/* Soft Ambient Horizon Fog / Light Diffusion */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[220px] pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${cloudTint.replace(/[\d\.]+\)$/, '0.35)')} 0%, transparent 100%)`
        }}
      />
    </div>
  );
}
