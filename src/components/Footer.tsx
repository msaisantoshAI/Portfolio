'use client';

import React from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function Footer() {
  const { location, country, localTime } = useEnvironment();
  const year = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-12 font-sans select-none border-t border-black/10 dark:border-white/10 bg-transparent transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto w-full space-y-6">
        
        {/* Main Clean Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Identity & Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-950 dark:text-white tracking-tight">
                Sai Santosh Madhari
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-600">&bull;</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Product Designer
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
              Design &times; Business &times; Technology &times; AI
            </p>
          </div>

          {/* Location & Time Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{location}, {country}</span>
            {localTime && <span>&bull; {localTime}</span>}
          </div>

          {/* Minimal Platform Links & Back to Top */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
            <a
              href="https://www.linkedin.com/in/sai-santosh-madhari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/msaisantoshAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Resume ↗
            </a>
            <button
              type="button"
              onClick={handleScrollTop}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <span>↑</span>
            </button>
          </div>

        </div>

        {/* Bottom Sub-row */}
        <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          <p>&copy; {year} Sai Santosh Madhari. All rights reserved.</p>
          <p>Engineered with systems thinking, Next.js &amp; Tailwind CSS.</p>
        </div>

      </div>
    </footer>
  );
}
