'use client';

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 py-8 px-5 md:px-8 lg:px-[120px] font-sans select-none bg-transparent transition-colors duration-300">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/60 dark:bg-[#28282B]/60 border border-black/5 dark:border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 backdrop-blur-sm">
        
        {/* Left: Brand / Copyright */}
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Sai Santosh Madhari</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">Product Designer</span>
        </div>

        {/* Center: Minimal Direct Platform Links */}
        <div className="flex items-center gap-4 font-semibold text-zinc-700 dark:text-zinc-300 text-xs">
          <a
            href="https://www.linkedin.com/in/sai-santosh-madhari/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/msaisantoshAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            Resume
          </a>
          <a
            href="mailto:msaisantosh99@gmail.com"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Back to Top */}
        <div>
          <button
            type="button"
            onClick={scrollToTop}
            className="touch-target inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200 transition-all hover:scale-105 cursor-pointer text-xs font-medium"
            aria-label="Back to top"
          >
            Top
          </button>
        </div>

      </div>
    </footer>
  );
}
