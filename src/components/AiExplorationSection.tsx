'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import QueryModal from './QueryModal';

interface AIProject {
  title: string;
  exploration: string;
  category: string;
  status: string;
  image?: string;
  link?: string;
  actionText: string;
  tags: string[];
}

const aiProjects: AIProject[] = [
  {
    title: 'LevelUp Designer',
    exploration: 'Exploring how AI can help product designers learn, practice, and solve real-world product problems.',
    category: 'Interactive Learning Platform',
    status: 'Live Web App',
    image: '/images/levelup-designer.png',
    link: 'https://level-up-designer.vercel.app/',
    actionText: 'Launch App',
    tags: ['Interactive Practice', 'Problem vs. Solution Space', 'Gemini AI'],
  },
  {
    title: 'Prompt Flow OS',
    exploration: 'Exploring better ways to design, manage, and collaborate with spatial AI prompt chains.',
    category: 'Spatial AI & Knowledge Graphs',
    status: 'Research Lab',
    actionText: 'Explore Concept',
    tags: ['Node Interface', 'Context Windows', 'Multi-Agent Chaining'],
  },
  {
    title: 'Agent Orchestration Workbench',
    exploration: 'Exploring how people can understand, control, and seamlessly collaborate with autonomous AI agents.',
    category: 'Human-in-the-Loop Interaction',
    status: 'Prototype',
    actionText: 'Explore Workbench',
    tags: ['Streaming UI', 'Confidence Controls', 'Human Signoff'],
  },
  {
    title: 'Dynamic Token Synthesizer',
    exploration: 'Exploring algorithmic color theory and context-aware design systems adapted to live environments.',
    category: 'Design Systems & Telemetry',
    status: 'Active Beta',
    actionText: 'Explore Tokens',
    tags: ['Design Tokens', 'WCAG 2.2 AAA', 'APCA Contrast'],
  },
];

export default function AiExplorationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="ai-exploration" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Active Learning &bull; Prototyping
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Exploring AI Through Products
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
              I explore how AI, automation, and intelligent systems can improve products, workflows, and business operations.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400 shrink-0">
            Learn by Building &bull; Product Exploration
          </span>
        </div>

        {/* 4 Clean AI Exploration Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Card 1: LevelUp Designer (8 Cols) */}
          <article className="lg:col-span-8 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/90 dark:bg-black/40 p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  {aiProjects[0].category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {aiProjects[0].status}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {aiProjects[0].title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[0].exploration}
                </p>
              </div>

              {/* Visual Preview Frame */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-950 shadow-inner group">
                <Image
                  src={aiProjects[0].image!}
                  alt={aiProjects[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Feature Chips & Clear CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[0].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={aiProjects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>{aiProjects[0].actionText}</span>
                <span>↗</span>
              </a>
            </div>
          </article>

          {/* Card 2: Prompt Flow OS (4 Cols) */}
          <article className="lg:col-span-4 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/90 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  {aiProjects[1].category}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{aiProjects[1].status}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {aiProjects[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[1].exploration}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 space-y-1 text-xs">
                <span className="font-bold text-zinc-900 dark:text-white block">Focus Area:</span>
                <p className="text-zinc-600 dark:text-zinc-400">&bull; Chaining multi-agent context trees</p>
                <p className="text-zinc-600 dark:text-zinc-400">&bull; Spatial prompt versioning</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[1].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer"
              >
                <span>{aiProjects[1].actionText}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </article>

          {/* Card 3: Agent Orchestration Workbench (6 Cols) */}
          <article className="lg:col-span-6 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/90 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  {aiProjects[2].category}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{aiProjects[2].status}</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {aiProjects[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {aiProjects[2].exploration}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[2].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer"
              >
                <span>{aiProjects[2].actionText}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </article>

          {/* Card 4: Dynamic Token Synthesizer (6 Cols) */}
          <article className="lg:col-span-6 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/90 dark:bg-black/40 p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-sm group hover:border-blue-500/40 transition-all">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40">
                  {aiProjects[3].category}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{aiProjects[3].status}</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {aiProjects[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {aiProjects[3].exploration}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[3].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer"
              >
                <span>{aiProjects[3].actionText}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </article>

        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
