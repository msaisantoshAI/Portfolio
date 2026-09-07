'use client';

import React from 'react';

export default function ContactSection() {
  const professionalLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-santosh-madhari/', icon: '↗' },
    { label: 'GitHub', href: 'https://github.com/msaisantoshAI', icon: '↗' },
    { label: 'Resume', href: '/resume.pdf', icon: '↗' },
    { label: 'Email', href: 'mailto:saisantoshmadhari@gmail.com', icon: '✉' },
  ];

  return (
    <section id="contact" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 md:p-14 shadow-sm backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Simple & Confident Headline & Subtext */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <p className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Get in Touch &bull; Open for Opportunities
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            Have a problem worth solving?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-1">
            I&apos;m always interested in high-impact product challenges, AI systems, and ambitious design initiatives that move the needle.
          </p>
        </div>

        {/* Action Button & Platform Links - Pure Monochrome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
          <div>
            <a
              href="mailto:saisantoshmadhari@gmail.com?subject=Product%20Opportunity%20/%20Project%20Inquiry"
              className="touch-target inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans"
            >
              <span>Let&apos;s Talk</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Professional Platform Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {professionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="touch-target inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 dark:bg-[#18181B] hover:bg-zinc-200 dark:hover:bg-[#242428] text-zinc-900 dark:text-zinc-200 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105"
              >
                <span>{link.label}</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
