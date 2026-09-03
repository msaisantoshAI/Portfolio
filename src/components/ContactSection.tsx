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
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Simple & Confident Headline & Subtext */}
        <div className="max-w-3xl space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Have a problem worth solving?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-1">
            I&apos;m always interested in interesting product challenges, ambitious ideas, and opportunities to build meaningful products.
          </p>
        </div>

        {/* Action Button & Platform Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-black/5 dark:border-white/10">
          <div>
            <a
              href="mailto:saisantoshmadhari@gmail.com?subject=Product%20Opportunity%20/%20Project%20Inquiry"
              className="touch-target inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
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
                className="touch-target inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-black/5 dark:border-white/10 transition-all hover:scale-105"
              >
                <span>{link.label}</span>
                <span className="text-[11px] text-zinc-500">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
