'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Section Eyebrow & Heading */}
        <div className="space-y-3 border-b border-black/5 dark:border-white/10 pb-6">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            A bit about me
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Design is how I think.<br />
            <span className="text-zinc-500 dark:text-zinc-400 font-light italic">Building is how I prove it.</span>
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Studio Portrait Image */}
          <div className="relative h-[320px] sm:h-[380px] md:h-[420px] w-full max-w-[360px] sm:max-w-[400px] shrink-0 overflow-hidden rounded-3xl border border-black/10 dark:border-white/20 bg-[#090d19] shadow-xl group">
            <Image
              src="/images/about-portrait.png"
              alt="Sai Santosh Madhari - Product Designer & AI Builder"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
              <span className="bg-black/60 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md font-semibold">
                Sai Santosh Madhari
              </span>
              <span className="text-zinc-300 text-[11px]">
                Product Designer &bull; AI Builder
              </span>
            </div>
          </div>

          {/* Narrative & Quote by Santosh */}
          <div className="w-full max-w-[700px] space-y-6">
            
            {/* Clean Quote by Santosh (No outside card/border, matches body size) */}
            <div className="border-l-2 border-blue-500 pl-4 py-1">
              <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                &ldquo;I’m a generalist by nature, curious across strategy, research, Design systems, Business and AI going deep where the problem demands, and connecting the pieces to create better products.&rdquo;
              </p>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-1.5 block">
                — Sai Santosh
              </span>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                My foundation started in <strong className="text-zinc-900 dark:text-white font-semibold">Fine Arts &amp; Visual Thinking</strong>, which trained me to observe patterns, human emotion, and systemic balance. that foundation eventually led me into <strong className="text-zinc-900 dark:text-white font-semibold">UX and Product Design</strong>.
              </p>
              <p>
                Today at <strong className="text-zinc-900 dark:text-white font-semibold">Tata Consultancy Services</strong>, I work on complex enterprise SaaS products and Integration of AI workflows, turning complicated requirements into simple, intuitive workflows.
              </p>
              <p>
                Outside of work, I explore AI, agentic workflows, design tools, Content Creation and community learning &mdash; always experimenting, learning, and finding new ways to bring technology and human-centered design together.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
