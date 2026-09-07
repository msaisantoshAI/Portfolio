'use client';

import React from 'react';
import Image from 'next/image';

export default function BenAboutSection() {
  return (
    <section id="about" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#28282B] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-2xl transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-zinc-500 dark:text-zinc-400 font-mono">
            A bit about me
          </p>
          <h2 className="section-heading text-zinc-950 dark:text-white">
            Design is how I think.<br />
            <span className="text-zinc-500 dark:text-zinc-400 font-light italic">Building is how I prove it.</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Studio Portrait Image */}
          <div className="relative h-[300px] sm:h-[360px] md:h-[400px] w-full max-w-[340px] sm:max-w-[380px] shrink-0 overflow-hidden rounded-3xl border border-black/10 dark:border-white/20 bg-zinc-100 dark:bg-[#333338] shadow-sm group">
            <Image
              src="/images/hero-portrait-color.png"
              alt="Sai Santosh Madhari"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
              <span className="bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md font-semibold">
                Sai Santosh Madhari
              </span>
              <span className="text-zinc-200 text-[11px]">
                Product Designer
              </span>
            </div>
          </div>

          {/* Narrative & Quote by Santosh */}
          <div className="w-full max-w-[680px] space-y-5">
            
            {/* Clean Quote with Monochrome Accent Bar */}
            <div className="border-l-2 border-zinc-950 dark:border-white pl-4 py-0.5">
              <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                &ldquo;I’m a generalist by nature &mdash; curious across strategy, design systems, and AI, connecting the pieces to build better products.&rdquo;
              </p>
              <span className="text-xs font-mono font-bold text-zinc-950 dark:text-white mt-1 block">
                &mdash; Sai Santosh
              </span>
            </div>

            {/* Concise Story Paragraphs */}
            <div className="space-y-3.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                My foundation started in <strong className="text-zinc-950 dark:text-white font-semibold">Fine Arts &amp; Visual Thinking</strong>, training me to observe patterns, human emotion, and systemic balance &mdash; which naturally led into <strong className="text-zinc-950 dark:text-white font-semibold">Product Design</strong>.
              </p>
              <p>
                Today at <strong className="text-zinc-950 dark:text-white font-semibold">Tata Consultancy Services</strong>, I work on complex enterprise SaaS products and the integration of AI workflows, turning complicated requirements into simple, intuitive user experiences.
              </p>
              <p>
                Outside of work, I explore AI, agentic workflows, design tooling, and community initiatives &mdash; bridging engineering pragmatism with human-centric design.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
