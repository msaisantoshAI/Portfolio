'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Scroll Parallax Transforms
  const cloudsY1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const cloudsY2 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const cloudsY3 = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const treeTopLeftY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, -60, -140, -220]);
  const treeTopRightY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -90, -180, -280]);
  const treeBottomRightY = useTransform(scrollYProgress, [0, 0.5, 1], [40, -40, -160]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================= */}
      {/* 1. SKY BASE DOME (Day vs Night Environmental Gradient)    */}
      {/* ========================================================= */}
      {/* Light Mode: Bright, sunny, expansive summer sky */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 opacity-100 dark:opacity-0 bg-gradient-to-b from-[#2170df] via-[#4895f0] to-[#7cb5f9]"
        style={{
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overhead Sun Warmth & Soft Atmospheric Glow */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: 'radial-gradient(circle at 75% 18%, rgba(255, 252, 235, 0.55) 0%, rgba(255, 235, 175, 0.25) 25%, rgba(120, 185, 255, 0.08) 55%, transparent 80%)'
          }}
        />
        {/* Soft cyan atmospheric zenith glow */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 60%, rgba(135, 225, 255, 0.3) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Dark Mode: Deep velvet starry night sky */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 opacity-0 dark:opacity-100 bg-gradient-to-b from-[#020512] via-[#060f26] to-[#0b1b42]"
        style={{
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Moon Radiance Aura */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at 78% 22%, rgba(180, 215, 255, 0.25) 0%, rgba(70, 110, 200, 0.1) 35%, transparent 65%)'
          }}
        />
        {/* Deep space indigo wash */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 20% 70%, rgba(30, 45, 95, 0.3) 0%, transparent 60%)'
          }}
        />
      </div>


      {/* ========================================================= */}
      {/* 2. NIGHT SKY ASSETS: MOON & TWINKLING STARS               */}
      {/* ========================================================= */}
      <motion.div 
        style={{ y: moonY }} 
        className="absolute top-12 sm:top-16 right-[12%] sm:right-[16%] w-24 h-24 sm:w-32 sm:h-32 transition-opacity duration-1000 opacity-0 dark:opacity-100"
      >
        {/* Moon Luminous Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-100/20 blur-2xl animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-cyan-100/30 blur-lg" />
        {/* Moon Body */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#e2edff] via-[#f7faff] to-[#ffffff] shadow-[0_0_50px_rgba(200,230,255,0.6)]">
          {/* Subtle lunar crater textures */}
          <div className="absolute top-4 left-5 w-4 h-4 rounded-full bg-blue-900/10 blur-[1px]" />
          <div className="absolute top-8 left-10 w-6 h-5 rounded-full bg-blue-900/10 blur-[1px]" />
          <div className="absolute bottom-6 left-7 w-5 h-5 rounded-full bg-blue-900/15 blur-[1px]" />
        </div>
      </motion.div>

      {/* Layered Twinkling Starfield */}
      <motion.div 
        style={{ y: starsY }} 
        className="absolute inset-0 transition-opacity duration-1000 opacity-0 dark:opacity-90"
      >
        {/* Natural random stars */}
        <svg className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
          {/* Group 1: Tiny micro-stars */}
          <g fill="#ffffff" opacity="0.65">
            <circle cx="10%" cy="15%" r="1" />
            <circle cx="22%" cy="8%" r="0.8" />
            <circle cx="35%" cy="28%" r="1" />
            <circle cx="48%" cy="12%" r="0.7" />
            <circle cx="62%" cy="32%" r="1" />
            <circle cx="85%" cy="18%" r="0.9" />
            <circle cx="15%" cy="45%" r="1" />
            <circle cx="28%" cy="62%" r="0.8" />
            <circle cx="42%" cy="75%" r="1.1" />
            <circle cx="55%" cy="52%" r="0.7" />
            <circle cx="70%" cy="68%" r="1" />
            <circle cx="88%" cy="58%" r="0.9" />
            <circle cx="92%" cy="82%" r="1" />
            <circle cx="8%" cy="88%" r="0.8" />
            <circle cx="25%" cy="92%" r="1" />
            <circle cx="65%" cy="88%" r="0.7" />
          </g>
          {/* Group 2: Medium glowing stars */}
          <g fill="#e0f2fe" opacity="0.85">
            <circle cx="18%" cy="22%" r="1.6" className="animate-pulse" />
            <circle cx="40%" cy="16%" r="1.8" />
            <circle cx="68%" cy="14%" r="1.5" className="animate-pulse" />
            <circle cx="82%" cy="38%" r="1.7" />
            <circle cx="30%" cy="48%" r="1.5" />
            <circle cx="52%" cy="65%" r="1.8" className="animate-pulse" />
            <circle cx="75%" cy="82%" r="1.6" />
            <circle cx="12%" cy="72%" r="1.5" className="animate-pulse" />
          </g>
          {/* Group 3: Bright prominent stars with soft 4-point sparkle */}
          <g fill="#ffffff" opacity="0.95">
            <circle cx="26%" cy="34%" r="2.2" />
            <circle cx="58%" cy="24%" r="2.4" className="animate-pulse" />
            <circle cx="86%" cy="72%" r="2.2" />
            <circle cx="45%" cy="84%" r="2.3" className="animate-pulse" />
          </g>
        </svg>
      </motion.div>


      {/* ========================================================= */}
      {/* 3. VOLUMETRIC SCATTERED CLOUDS (Parallax & Drift)          */}
      {/* ========================================================= */}

      {/* CLOUD LAYER 1: Distant Wispy High Altitude Clouds */}
      <motion.div 
        style={{ y: cloudsY1 }} 
        className="absolute inset-0"
      >
        <div className="absolute top-[8%] -left-[15%] w-[80vw] max-w-[900px] h-[280px] rounded-full bg-white/40 dark:bg-slate-300/10 blur-3xl transform -rotate-6 animate-drift-slow" />
        <div className="absolute top-[35%] right-[-10%] w-[70vw] max-w-[800px] h-[240px] rounded-full bg-white/35 dark:bg-slate-300/10 blur-3xl transform rotate-3 animate-drift-medium" />
        <div className="absolute top-[65%] left-[10%] w-[75vw] max-w-[850px] h-[260px] rounded-full bg-white/30 dark:bg-slate-300/8 blur-3xl transform -rotate-3 animate-drift-slow" />
      </motion.div>

      {/* CLOUD LAYER 2: Mid-Level Volumetric Soft Clouds */}
      <motion.div 
        style={{ y: cloudsY2 }} 
        className="absolute inset-0"
      >
        {/* Sculpted SVG Cloud 1 (Top Center-Right) */}
        <svg 
          viewBox="0 0 600 300" 
          className="absolute top-[18%] left-[25%] sm:left-[35%] w-[65vw] max-w-[680px] h-auto opacity-70 dark:opacity-20 blur-xl animate-drift-medium"
        >
          <path 
            d="M 120,200 C 90,200 60,170 80,130 C 95,95 150,85 180,110 C 210,60 300,50 350,95 C 400,70 460,95 470,140 C 510,145 530,185 500,210 C 470,230 150,225 120,200 Z" 
            fill="url(#cloudGradDay)" 
          />
          <defs>
            <linearGradient id="cloudGradDay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e1effe" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sculpted SVG Cloud 2 (Mid-Left) */}
        <svg 
          viewBox="0 0 600 300" 
          className="absolute top-[52%] -left-[10%] w-[60vw] max-w-[620px] h-auto opacity-65 dark:opacity-20 blur-xl animate-drift-fast"
        >
          <path 
            d="M 100,180 C 70,180 50,150 70,120 C 90,80 140,80 170,100 C 200,50 280,45 330,85 C 380,60 430,85 440,125 C 480,130 500,170 470,195 C 440,210 130,205 100,180 Z" 
            fill="#ffffff" 
          />
        </svg>
      </motion.div>

      {/* CLOUD LAYER 3: Foreground Atmospheric Depth */}
      <motion.div 
        style={{ y: cloudsY3 }} 
        className="absolute inset-0"
      >
        <div className="absolute top-[28%] -right-[5%] w-[55vw] max-w-[600px] h-[220px] rounded-full bg-white/55 dark:bg-slate-200/15 blur-2xl transform rotate-6 animate-drift-fast" />
        <div className="absolute top-[80%] left-[5%] w-[65vw] max-w-[700px] h-[250px] rounded-full bg-white/50 dark:bg-slate-200/15 blur-2xl transform -rotate-4 animate-drift-medium" />
      </motion.div>


      {/* ========================================================= */}
      {/* 4. TREE CANOPIES & FOLIAGE (Looking Up from Grass Level)   */}
      {/* ========================================================= */}

      {/* TOP-LEFT OVERHANGING CANOPY BRANCHES */}
      <motion.div 
        style={{ y: treeTopLeftY }}
        className="absolute -top-10 -left-12 sm:-left-6 w-[340px] sm:w-[500px] md:w-[620px] h-auto transition-all duration-700 pointer-events-none"
      >
        <svg 
          viewBox="0 0 600 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        >
          {/* Main Organic Trunk & Branches */}
          <path 
            d="M -20,-20 Q 80,60 160,110 Q 240,160 360,190 Q 260,130 190,70 Q 120,20 -20,-20 Z" 
            className="fill-[#1c2d1b] dark:fill-[#080d07] transition-colors duration-1000"
          />
          <path 
            d="M 120,80 Q 180,160 260,220 Q 320,270 410,310 Q 310,250 230,180 Q 160,120 120,80 Z" 
            className="fill-[#182817] dark:fill-[#050905] transition-colors duration-1000"
          />
          <path 
            d="M 220,150 Q 290,130 380,140 Q 450,150 510,170 Q 430,140 340,125 Q 260,125 220,150 Z" 
            className="fill-[#182817] dark:fill-[#050905] transition-colors duration-1000"
          />

          {/* Dappled Leaves Clusters (Light mode: rich sunlit forest green, Dark mode: moonlit dark silhouettes) */}
          <g className="transition-colors duration-1000">
            {/* Cluster 1 */}
            <ellipse cx="180" cy="90" rx="65" ry="45" transform="rotate(-15 180 90)" className="fill-[#2d5a27]/85 dark:fill-[#0a1409]/90" />
            <ellipse cx="220" cy="115" rx="75" ry="50" transform="rotate(10 220 115)" className="fill-[#386b31]/80 dark:fill-[#0e1c0d]/90" />
            <ellipse cx="195" cy="80" rx="50" ry="35" transform="rotate(-5 195 80)" className="fill-[#4d8c44]/75 dark:fill-[#132412]/80" />

            {/* Cluster 2 (Mid-branch) */}
            <ellipse cx="320" cy="180" rx="85" ry="55" transform="rotate(25 320 180)" className="fill-[#285023]/85 dark:fill-[#0a1409]/90" />
            <ellipse cx="370" cy="195" rx="75" ry="48" transform="rotate(-10 370 195)" className="fill-[#36682f]/80 dark:fill-[#0e1c0d]/90" />
            <ellipse cx="340" cy="165" rx="60" ry="40" transform="rotate(15 340 165)" className="fill-[#48853f]/75 dark:fill-[#142613]/80" />

            {/* Cluster 3 (Tips) */}
            <ellipse cx="440" cy="240" rx="70" ry="45" transform="rotate(-20 440 240)" className="fill-[#24471f]/85 dark:fill-[#091208]/90" />
            <ellipse cx="480" cy="270" rx="65" ry="42" transform="rotate(15 480 270)" className="fill-[#34652d]/80 dark:fill-[#0d1a0c]/90" />
            <ellipse cx="450" cy="225" rx="50" ry="32" transform="rotate(5 450 225)" className="fill-[#498940]/75 dark:fill-[#122211]/80" />

            {/* Sunlight Rim Edge Highlights (Light mode only) */}
            <circle cx="210" cy="70" r="18" className="fill-[#86efac]/35 dark:fill-transparent" />
            <circle cx="350" cy="150" r="22" className="fill-[#86efac]/30 dark:fill-transparent" />
            <circle cx="460" cy="210" r="16" className="fill-[#86efac]/30 dark:fill-transparent" />
          </g>
        </svg>
      </motion.div>

      {/* TOP-RIGHT DELICATE BRANCH SILHOUETTE */}
      <motion.div 
        style={{ y: treeTopRightY }}
        className="absolute -top-8 -right-10 sm:-right-4 w-[280px] sm:w-[420px] md:w-[500px] h-auto transition-all duration-700 pointer-events-none"
      >
        <svg 
          viewBox="0 0 500 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
        >
          {/* Main Branch Inward */}
          <path 
            d="M 520,-20 Q 420,50 330,90 Q 230,130 120,150 Q 210,110 310,60 Q 410,15 520,-20 Z" 
            className="fill-[#1c2d1b] dark:fill-[#070b06] transition-colors duration-1000"
          />
          <path 
            d="M 360,70 Q 280,120 220,180 Q 150,240 70,280 Q 160,220 250,150 Q 320,100 360,70 Z" 
            className="fill-[#182817] dark:fill-[#050905] transition-colors duration-1000"
          />

          {/* Leaves */}
          <g className="transition-colors duration-1000">
            <ellipse cx="280" cy="100" rx="70" ry="48" transform="rotate(20 280 100)" className="fill-[#2a5424]/85 dark:fill-[#091308]/90" />
            <ellipse cx="240" cy="120" rx="65" ry="42" transform="rotate(-15 240 120)" className="fill-[#386c31]/80 dark:fill-[#0d1b0c]/90" />
            <ellipse cx="180" cy="155" rx="60" ry="40" transform="rotate(10 180 155)" className="fill-[#2d5b27]/85 dark:fill-[#0a1409]/90" />
            <ellipse cx="130" cy="190" rx="55" ry="38" transform="rotate(-25 130 190)" className="fill-[#3a7033]/80 dark:fill-[#0e1d0d]/90" />
            <ellipse cx="80" cy="240" rx="48" ry="32" transform="rotate(15 80 240)" className="fill-[#45813d]/75 dark:fill-[#112110]/80" />
          </g>
        </svg>
      </motion.div>

      {/* BOTTOM-RIGHT OCCASIONAL PASSING FOLIAGE */}
      <motion.div 
        style={{ y: treeBottomRightY }}
        className="absolute -bottom-16 -right-12 sm:-right-6 w-[260px] sm:w-[380px] md:w-[460px] h-auto transition-all duration-700 pointer-events-none"
      >
        <svg 
          viewBox="0 0 500 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_-15px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_-15px_30px_rgba(0,0,0,0.7)]"
        >
          <path 
            d="M 520,420 Q 410,340 310,290 Q 200,240 90,210 Q 210,255 320,320 Q 420,370 520,420 Z" 
            className="fill-[#1c2d1b] dark:fill-[#070b06] transition-colors duration-1000"
          />
          <g className="transition-colors duration-1000">
            <ellipse cx="260" cy="270" rx="75" ry="50" transform="rotate(-20 260 270)" className="fill-[#285023]/85 dark:fill-[#091308]/90" />
            <ellipse cx="190" cy="245" rx="65" ry="44" transform="rotate(15 190 245)" className="fill-[#366a2f]/80 dark:fill-[#0d1a0c]/90" />
            <ellipse cx="120" cy="215" rx="55" ry="36" transform="rotate(-10 120 215)" className="fill-[#45813d]/75 dark:fill-[#10200f]/80" />
          </g>
        </svg>
      </motion.div>

    </div>
  );
}
