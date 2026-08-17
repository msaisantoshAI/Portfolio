'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Section Eyebrow */}
        <div className="mb-6">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            A bit about me
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-stretch lg:flex-row gap-10 xl:gap-14">
          
          {/* Left: Studio Portrait Photo (Taller Portrait Height) */}
          <div className="relative h-[420px] sm:h-[480px] md:h-[520px] w-full max-w-[360px] sm:max-w-[380px] shrink-0 overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-900 shadow-2xl group">
            <Image
              src="/images/sai-portrait-studio.png"
              alt="Sai Santosh Madhari studio portrait"
              fill
              priority
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90">
              ✨ Sai Santosh &bull; Product Designer &amp; AI Builder
            </div>
          </div>

          {/* Right: Narrative Content Aligned Straight */}
          <div className="w-full flex-1 flex flex-col justify-center space-y-6">
            
            {/* Main Statement Heading Aligned With Narrative */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Design is how I think.<br />
              <span className="text-blue-600 dark:text-blue-400 font-light italic">
                Building is how I prove it.
              </span>
            </h2>

            {/* Core Narrative Body */}
            <p className="text-base sm:text-lg md:text-[19px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              As a <strong className="text-zinc-900 dark:text-white font-semibold">Passionate Artist, Professional Designer</strong>. Starting in <strong className="text-zinc-900 dark:text-white font-semibold">Fine Arts &amp; Visual Thinking</strong>, I transitioned into UX Design. Today at TCS, I work on high-density enterprise SaaS systems and orchestrate <strong className="text-blue-600 dark:text-blue-400 font-semibold">human-in-the-loop AI interfaces</strong> that turn chaotic operations into calm workflows.
            </p>

            {/* Italian/Italic Stylized Generalist Editorial Quote */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border-l-4 border-blue-500 border border-black/5 dark:border-white/10 shadow-sm">
              <p className="italic text-base sm:text-lg md:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif">
                &ldquo;I’m a generalist by nature, curious across strategy, research, Design systems, Business and AI going deep where the problem demands, and connecting the pieces to create better products.&rdquo;
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
