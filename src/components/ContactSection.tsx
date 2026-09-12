'use client';

import React from 'react';

export default function ContactSection() {
  const professionalLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-santosh-madhari/' },
    { label: 'GitHub', href: 'https://github.com/msaisantoshAI' },
    { label: 'Resume', href: '/resume.pdf' },
    { label: 'Email', href: 'mailto:msaisantosh99@gmail.com' },
  ];

  return (
    <section id="contact" className="px-5 py-8 md:px-8 lg:px-[120px] max-w-[1440px] mx-auto w-full font-sans">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/80 dark:bg-[#28282B] border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.02] tracking-[-1px] text-zinc-950 dark:text-white">
              Interested in collaborating?
            </h2>
            <span className="text-[17px] sm:text-[19px] lg:text-xl font-medium text-zinc-500 dark:text-zinc-400">
              (Or mentoring / roles)
            </span>
          </div>
          <p className="text-[17px] sm:text-[19px] lg:text-xl font-medium leading-[1.35] text-zinc-500 dark:text-zinc-400">
            I wrote a little letter for you if you are interested in chatting.
          </p>
        </div>

        {/* Split Grid: Yellow Letter on Left, Action Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 items-center">
          
          {/* Left: Yellow Envelope / Note Card */}
          <div className="relative w-full rounded-[18px] bg-[#fbc600] p-4 sm:p-6 shadow-sm rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
            <div className="rounded-[12px] bg-white p-6 sm:p-8 space-y-4 text-zinc-900 shadow-xs">
              <p className="text-base sm:text-lg font-bold">
                Dear potential collaborator,
              </p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-800">
                I enjoy building cool products with cool humans.
              </p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-800">
                I enjoy products that are building small magics that make complex everyday workflows calm and effective.
              </p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-800">
                ...and I enjoy wearing different hats to ship out the best product — bridging systems design, business metrics, and AI engineering.
              </p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-800">
                If that feels like your team, let&apos;s chat.
              </p>
              <div className="pt-2 border-t border-zinc-200">
                <p className="text-xs font-semibold text-zinc-500">Thanks for reading this,</p>
                <p className="text-base font-bold text-zinc-950 mt-0.5">Sai Santosh</p>
              </div>
            </div>
          </div>

          {/* Right: Direct Actions & Links */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Let&apos;s build together.
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Available for AI Product Designer, Lead UX, and founding designer roles.
              </p>
            </div>

            {/* Primary Action Button */}
            <div>
              <a
                href="mailto:msaisantosh99@gmail.com?subject=Product%20Opportunity%20/%20Project%20Inquiry"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-sm shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
                </svg>
                <span>Say Hello</span>
              </a>
            </div>

            {/* Social & Reference Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/5 dark:border-white/10">
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

            {/* Location & Status Info */}
            <div className="pt-1">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Hyderabad, India &bull; Available Worldwide (Remote / Relocation)
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
