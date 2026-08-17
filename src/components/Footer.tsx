'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEnvironment } from '@/context/EnvironmentContext';
import QueryModal from './QueryModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDay, timePhase } = useEnvironment();

  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';

  return (
    <footer className="relative z-20 text-white py-10 sm:py-14 px-4 sm:px-6 md:px-10 lg:px-12 font-sans select-none overflow-hidden">
      
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

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col gap-8 sm:gap-10">
        
        {/* ========================================================================= */}
        {/* TOP ROW: FLOATING IDENTITY PILL BADGE                                    */}
        {/* ========================================================================= */}
        <div className="flex justify-start sm:justify-center">
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
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            lets <span className="italic font-serif font-light text-blue-200">create</span>
            <br />
            incredible work together.
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* CONTACT & SOCIAL DETAILS ROW                                             */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-6 border-b border-white/20">
          
          {/* Left: Email */}
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-white/70 block">
              Email
            </span>
            <a 
              href="mailto:Saisantoshmadhari@gmail.com"
              className="text-base sm:text-xl md:text-2xl font-bold text-white hover:text-blue-300 transition-colors inline-block"
            >
              Saisantoshmadhari@gmail.com
            </a>
          </div>

          {/* Center/Right: Action Buttons & Socials */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70 block">
                Social
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/saisantoshmadhari0711/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center font-bold text-xs sm:text-sm hover:scale-110 hover:bg-blue-500 hover:text-white transition-all shadow-md"
                  aria-label="LinkedIn Profile"
                >
                  in
                </a>
                <a
                  href="https://www.instagram.com/sai_santosh_madhari/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center font-bold text-xs sm:text-sm hover:scale-110 hover:bg-pink-500 hover:text-white transition-all shadow-md"
                  aria-label="Instagram Profile"
                >
                  ig
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="touch-target px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/25 backdrop-blur-md shadow-md hover:scale-105 transition-all ml-1 sm:ml-2"
                >
                  Start a Project ↗
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COPYRIGHT & PRIMARY RADIANT BACK TO TOP BUTTON                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80">
          <p>&copy; {new Date().getFullYear()} Sai Santosh Madhari. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span className="text-white font-bold text-sm">&uarr;</span>
          </button>
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
