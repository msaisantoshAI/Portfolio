'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            A bit about me
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            Design is how I think.<br />
            <span className="text-zinc-500 dark:text-zinc-400 font-light italic">Building is how I prove it.</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Studio Portrait Image */}
          <div className="relative h-[300px] sm:h-[360px] md:h-[400px] w-full max-w-[340px] sm:max-w-[380px] shrink-0 overflow-hidden rounded-3xl border border-black/10 dark:border-white/20 bg-[#090d19] shadow-xl group">
            <Image
              src="/images/about-portrait.png"
              alt="Sai Santosh Madhari"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
              <span className="bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md font-semibold">
                Sai Santosh Madhari
              </span>
              <span className="text-zinc-300 text-[11px]">
                Product Designer &bull; AI Builder
              </span>
            </div>
          </div>

          {/* Narrative & Quote by Santosh */}
          <div className="w-full max-w-[680px] space-y-5">
            
            {/* Clean Quote with Blue Accent Bar */}
            <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-4 py-0.5">
              <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                &ldquo;I’m a generalist by nature &mdash; curious across strategy, design systems, and AI, connecting the pieces to build better products.&rdquo;
              </p>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 block">
                &mdash; Sai Santosh
              </span>
            </div>

            {/* Concise Story Paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                My foundation started in <strong className="text-zinc-900 dark:text-white font-semibold">Fine Arts &amp; Visual Thinking</strong>, training me to observe patterns, human emotion, and systemic balance &mdash; which naturally led into <strong className="text-zinc-900 dark:text-white font-semibold">Product Design</strong>.
              </p>
              <p>
                At <strong className="text-zinc-900 dark:text-white font-semibold">Tata Consultancy Services</strong>, I design complex enterprise SaaS systems and <strong className="text-blue-600 dark:text-blue-400 font-semibold">human-in-the-loop AI workflows</strong>, turning dense requirements into calm, intuitive digital experiences.
              </p>
              <p>
                Outside of work, I explore autonomous agent workflows, build experimental design tooling, and lead community workshops &mdash; always finding new ways to bring technology and human-centered craft together.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
