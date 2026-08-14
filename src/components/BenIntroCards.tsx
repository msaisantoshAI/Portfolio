'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BenIntroCards() {
  return (
    <section className="px-5 pb-0 pt-12 md:px-8 md:pt-16 lg:px-24 max-w-[1280px] mx-auto w-full">
      {/* Intro Surface Box with Dot Grid Background */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 p-8 md:p-14 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Subtle dot matrix pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1.2px, transparent 1.2px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            backgroundPosition: '8px 8px'
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Handwave icon / Pill tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium tracking-wide">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              AVAILABLE FOR PRODUCT & AI ROLES
            </span>
          </div>

          {/* Large Acorn-style Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Hi, I&apos;m Sai Santosh.<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Product Designer &amp; AI Builder.
            </span>
          </h1>

          {/* Subtitle with Pill tags */}
          <p className="max-w-[840px] text-lg sm:text-xl md:text-2xl font-light text-zinc-300 leading-relaxed">
            Product Designer with a Data-Driven and Creative Art background.{' '}
            <span className="hidden md:inline">
              <br />
              Designing enterprise systems and AI interfaces at{' '}
              <span className="inline-block whitespace-nowrap align-middle">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 border border-white/15 text-white text-sm font-medium shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Tata Consultancy Services
                </span>
              </span>{' '}
              by day, building{' '}
              <span className="inline-block whitespace-nowrap align-middle">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 px-3 py-1 border border-blue-500/30 text-blue-300 text-sm font-medium shadow-sm">
                  AI Tools &amp; Experiments
                </span>
              </span>{' '}
              by night.
            </span>
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-sm md:text-base hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
            >
              Check out recent work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm md:text-base hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              Learn more about me
            </a>
          </div>
        </div>

        {/* 4 Overlapping Cards / Deck Preview (Ben Shih Signature Layout) */}
        <div className="relative mt-14 hidden h-[340px] w-full items-center lg:flex xl:h-[390px] pt-4">
          
          {/* Card 1: Recent Work (Warm Orange/Amber Accent) */}
          <motion.div 
            whileHover={{ y: -12, scale: 1.02, zIndex: 10 }}
            className="relative flex h-[310px] w-[290px] xl:h-[350px] xl:w-[320px] -mr-[32px] cursor-pointer"
            style={{ zIndex: 4 }}
          >
            <article className="relative h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#c2410c] to-[#9a3412] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-orange-400/30 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-200 bg-black/20 px-2.5 py-1 rounded-full">
                  Case Studies
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Recent work
                </h2>
                <p className="text-sm xl:text-base font-normal text-orange-100/90 leading-relaxed">
                  See how I turn complex enterprise &amp; AI product problems into shipped experiences.
                </p>
              </div>
              <div className="relative z-10">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  Read Case Studies &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 2: Interactive Video Preview */}
          <motion.div 
            whileHover={{ y: -12, scale: 1.02, zIndex: 10 }}
            className="relative flex h-[310px] w-[290px] xl:h-[350px] xl:w-[320px] -mr-[32px] cursor-pointer"
            style={{ zIndex: 3 }}
          >
            <article className="relative h-full w-full overflow-hidden rounded-[24px] bg-[#0c1017] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 group">
              <div className="relative h-full w-full">
                <Image
                  src="/images/project_esow_1775675924462.png"
                  alt="eSOW Planner Work"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Enterprise SaaS
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    eSOW Planner
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    68% reduction in SOW generation cycle for global enterprise teams.
                  </p>
                </div>
              </div>
            </article>
          </motion.div>

          {/* Card 3: Indie Apps & AI Tools (Purple Accent) */}
          <motion.div 
            whileHover={{ y: -12, scale: 1.02, zIndex: 10 }}
            className="relative flex h-[310px] w-[290px] xl:h-[350px] xl:w-[320px] -mr-[32px] cursor-pointer"
            style={{ zIndex: 2 }}
          >
            <article className="relative h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-purple-400/30 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-200 bg-black/20 px-2.5 py-1 rounded-full">
                  Playground
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Indie &amp; AI tools
                </h2>
                <p className="text-sm xl:text-base font-normal text-purple-100/90 leading-relaxed">
                  I orchestrate multiple AI models (Cursor, Lovable, Claude, Antigravity) to rapidly build functional prototypes.
                </p>
              </div>
              <div className="relative z-10">
                <a
                  href="#fun"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  What I&apos;ve Shipped &rarr;
                </a>
              </div>
            </article>
          </motion.div>

          {/* Card 4: Public Workshops & Talks (Blue Accent) */}
          <motion.div 
            whileHover={{ y: -12, scale: 1.02, zIndex: 10 }}
            className="relative flex h-[310px] w-[290px] xl:h-[350px] xl:w-[320px] cursor-pointer"
            style={{ zIndex: 1 }}
          >
            <article className="relative h-full w-full overflow-hidden rounded-[24px] p-7 xl:p-8 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-sky-400/30 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-200 bg-black/20 px-2.5 py-1 rounded-full">
                  Speaking &amp; Mentorship
                </span>
                <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-tight">
                  Public talks
                </h2>
                <p className="text-sm xl:text-base font-normal text-sky-100/90 leading-relaxed">
                  I speak and mentor on UX architecture, design psychology, and the emerging wave of AI orchestration.
                </p>
              </div>
              <div className="relative z-10">
                <a
                  href="#talks"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-xs xl:text-sm hover:bg-zinc-900 transition-colors shadow-md"
                >
                  Explore Workshops &rarr;
                </a>
              </div>
            </article>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
