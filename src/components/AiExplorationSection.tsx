'use client';

import React from 'react';
import Image from 'next/image';

export default function AiExplorationSection() {
  return (
    <section id="ai-exploration" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-2">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              R&amp;D &bull; Prototypes &bull; Side Projects
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              AI Exploration &amp; Playground
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Interactive Canvas &bull; Live Workflows
            </span>
          </div>
        </div>

        {/* Modern Bento Grid Layout for AI Experiments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Cell 1: Flagship Live App — LevelUp Designer (8 Cols) */}
          <article className="lg:col-span-8 rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                    Interactive AI Web App
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <a
                  href="https://level-up-designer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
                >
                  <span>Launch App</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  LevelUp Designer
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Interactive learning &amp; practice platform for product designers to master problem space vs. solution space, agentic design workflows, and AI-accelerated product mastery.
                </p>
              </div>

              {/* Visual Preview Frame */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-inner group">
                <Image
                  src="/images/levelup-designer.png"
                  alt="LevelUp Designer App"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5 dark:border-white/10">
              {['Interactive Decks', 'Problem vs. Solution Space', 'Focus Timer & Journal', 'Gemini AI Assistant', 'Next.js'].map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Bento Cell 2: Prompt Flow OS (4 Cols) */}
          <article className="lg:col-span-4 rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  Spatial AI
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Research Lab</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Prompt Flow OS
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Spatial node-based canvas for chaining multi-modal AI agents, persistent memory states, and knowledge graphs into modular human workflows.
              </p>

              <div className="p-3.5 rounded-xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 space-y-1 text-xs">
                <p className="font-bold text-zinc-900 dark:text-white">Key Capabilities:</p>
                <p className="text-zinc-600 dark:text-zinc-400">&bull; Visual drag-and-drop agent chaining</p>
                <p className="text-zinc-600 dark:text-zinc-400">&bull; Context window memory trees</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {['Knowledge Graphs', 'Node Interface', 'Claude API'].map((tag, tIdx) => (
                <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Bento Cell 3: Dynamic Token Synthesizer (6 Cols) */}
          <article className="lg:col-span-6 rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  Design Systems &bull; Algorithmic
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Active Beta</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Dynamic Token Synthesizer
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Algorithmic token engine that generates accessible color palettes and typography scales based on ambient lighting and real-time environmental telemetry.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {['Design Tokens', 'WCAG 2.2 AA', 'APCA Contrast', 'Tailwind'].map((tag, tIdx) => (
                <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Bento Cell 4: Agent Orchestration Workbench (6 Cols) */}
          <article className="lg:col-span-6 rounded-3xl border border-black/10 dark:border-white/15 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  Interaction Model &bull; UI States
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Prototype</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Agent Orchestration Workbench
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Human-in-the-loop interface modeling streaming generative outputs, confidence bounds, and approval handoffs for autonomous enterprise agents.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {['Generative UI', 'Human-in-the-Loop', 'Streaming States'].map((tag, tIdx) => (
                <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
