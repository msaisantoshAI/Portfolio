'use client';

import React from 'react';

export default function ContactSection() {
  const professionalLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-santosh-madhari/' },
    { label: 'GitHub', href: 'https://github.com/msaisantoshAI' },
    { label: 'Resume', href: '/resume.pdf' },
    { label: 'Email', href: 'mailto:saisantoshmadhari@gmail.com' },
  ];

  return (
    <section id="contact" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#28282B] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Simple & Confident Headline & Subtext */}
        <div className="max-w-3xl space-y-2">
          <p className="eyebrow text-zinc-500 dark:text-zinc-400 font-mono">
            Get in Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
            Have a problem worth solving?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-1">
            I&apos;m always interested in interesting product challenges, ambitious ideas, and opportunities to build meaningful products.
          </p>
        </div>

        {/* Action Button & Platform Links - NO ARROWS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-black/5 dark:border-white/10">
          <div>
            <a
              href="mailto:saisantoshmadhari@gmail.com?subject=Product%20Opportunity%20/%20Project%20Inquiry"
              className="touch-target inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Professional Platform Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {professionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="touch-target inline-flex items-center justify-center px-4 py-2 rounded-full bg-zinc-100 dark:bg-[#333338] hover:bg-zinc-200 dark:hover:bg-[#3d3d44] text-zinc-900 dark:text-zinc-200 text-xs font-semibold border border-black/5 dark:border-white/10 transition-all hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
