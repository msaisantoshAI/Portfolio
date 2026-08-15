'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import QueryModal from './QueryModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDay, timePhase } = useEnvironment();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.1,
  });

  // Parallax translation for the massive SANTOSH watermark
  const watermarkX = useTransform(smoothProgress, [0.7, 1], ['-4%', '2%']);

  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';

  return (
    <footer className="relative z-20 text-white pt-20 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12 font-sans select-none overflow-hidden">
      
      {/* 1. SEAMLESS LIVING ENVIRONMENT OVERLAY (Adapts to live day/sunset/night sky) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
          isNight
            ? 'bg-gradient-to-t from-[#02050f]/95 via-[#060e20]/60 to-transparent'
            : 'bg-gradient-to-t from-[#0a3570]/85 via-[#1855a8]/40 to-transparent'
        }`}
      />

      {/* Atmospheric light bloom behind footer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col justify-between min-h-[520px]">
        
        {/* ========================================================================= */}
        {/* TOP ROW: FLOATING IDENTITY PILL BADGE                                    */}
        {/* ========================================================================= */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-black/40 border border-white/25 backdrop-blur-2xl shadow-xl">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/40">
              <Image
                src="/images/headshot.png"
                alt="Santosh"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              SANTOSH
            </span>
            <div className="flex items-center gap-1 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN HEADLINE: "lets create incredible work together."                    */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.04] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            lets <span className="italic font-serif font-light text-blue-200">create</span>
            <br />
            incredible work together.
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* CONTACT & SOCIAL DETAILS ROW (Matching user reference layout)            */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pb-8 border-b border-white/20">
          
          {/* Left: Email */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-white/70 block">
              Email
            </span>
            <a 
              href="mailto:Saisantoshmadhari@gmail.com"
              className="text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-blue-300 transition-colors inline-block"
            >
              Saisantoshmadhari@gmail.com
            </a>
          </div>

          {/* Center/Right: Action Buttons & Socials */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70 block">
                Social
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/saisantoshmadhari0711/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center font-bold text-sm hover:scale-110 hover:bg-blue-500 hover:text-white transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  in
                </a>
                <a
                  href="https://www.instagram.com/sai_santosh_madhari/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center font-bold text-sm hover:scale-110 hover:bg-pink-500 hover:text-white transition-all shadow-md"
                  aria-label="Instagram Profile"
                >
                  ig
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="touch-target px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition-all ml-2"
                >
                  Start a Project ↗
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COPYRIGHT & BACK TO TOP                                                   */}
        {/* ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80">
          <p>&copy; {new Date().getFullYear()} Sai Santosh Madhari. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="touch-target inline-flex items-center gap-2 text-white/80 hover:text-white hover:underline cursor-pointer"
          >
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MASSIVE "SANTOSH" WATERMARK TYPOGRAPHY ACROSS BOTTOM SKY                  */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden mt-6 pt-4 pointer-events-none select-none">
          <motion.h1
            style={{ x: watermarkX }}
            className="text-[18vw] font-black uppercase tracking-tighter leading-none text-white/[0.14] whitespace-nowrap text-center drop-shadow-sm font-sans"
          >
            SANTOSH
          </motion.h1>
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
