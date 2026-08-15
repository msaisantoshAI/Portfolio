'use client';

import React, { useState } from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';
import QueryModal from './QueryModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { location, localTime } = useEnvironment();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#fun' },
    { name: 'Talks', href: '#talks' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/saisantoshmadhari0711/',
      label: 'LinkedIn'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/sai_santosh_madhari/',
      label: 'Instagram'
    },
    { 
      name: 'Email', 
      url: 'mailto:Saisantoshmadhari@gmail.com',
      label: 'Saisantoshmadhari@gmail.com'
    }
  ];

  return (
    <footer className="relative z-20 bg-[#060a17]/95 border-t border-white/15 text-white py-16 sm:py-20 px-4 sm:px-8 md:px-12 backdrop-blur-3xl font-sans select-none overflow-hidden">
      
      {/* Subtle atmospheric ambient glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col gap-12 sm:gap-16">
        
        {/* Top Row: CTA & Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3">
              ✦ Open for Collaborations &amp; Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Let&apos;s build experiences that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                feel human.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              Have a complex enterprise challenge, an AI agent system, or an ambitious product in mind? Let&apos;s talk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="touch-target px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start a Conversation ↗
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="touch-target px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-200 hover:text-white font-medium text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Scroll back to top"
            >
              ↑ Back to top
            </button>
          </div>
        </div>

        {/* Middle Row: Quick Navigation & Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          {/* Navigation Links */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-3">
              Navigation
            </span>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-3">
              Connect
            </span>
            <ul className="space-y-1.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a 
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-300 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{s.name}</span>
                    <span className="text-xs text-zinc-500">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Atmosphere */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-3">
              Environment
            </span>
            <p className="text-xs text-zinc-300 font-mono leading-relaxed">
              📍 {location} &bull; {localTime}
              <br />
              <span className="text-zinc-400 text-[11px]">Living weather-synced portfolio</span>
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Signoff */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <p>&copy; {new Date().getFullYear()} Sai Santosh Madhari. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Look up. Keep exploring.</span>
            <span className="text-blue-400">✦</span>
          </p>
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
