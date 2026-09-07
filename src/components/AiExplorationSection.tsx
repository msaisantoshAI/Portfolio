'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import QueryModal from './QueryModal';

interface AIProject {
  id: string;
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
    id: '01',
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
    id: '02',
    title: 'Prompt Flow OS',
    exploration: 'Exploring better ways to design, manage, and collaborate with spatial AI prompt chains.',
    category: 'Spatial AI & Knowledge Graphs',
    status: 'Research Lab',
    actionText: 'Explore Concept',
    tags: ['Node Interface', 'Context Windows', 'Multi-Agent Chaining'],
  },
  {
    id: '03',
    title: 'Agent Orchestration Workbench',
    exploration: 'Exploring how people can understand, control, and seamlessly collaborate with autonomous AI agents.',
    category: 'Human-in-the-Loop Interaction',
    status: 'Prototype',
    actionText: 'Explore Workbench',
    tags: ['Streaming UI', 'Confidence Controls', 'Human Signoff'],
  },
  {
    id: '04',
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
    <section id="ai-exploration" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#28282B] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
              Active Learning &bull; Prototyping
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Exploring AI Through Products
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed pt-0.5">
              I explore how AI, automation, and intelligent systems can improve products, workflows, and business operations.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
            Learn by Building &bull; Product Exploration
          </span>
        </div>

        {/* Compact 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: LevelUp Designer */}
          <article className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/90 dark:bg-[#333338]/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs group hover:border-black/20 dark:hover:border-white/20 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 border border-black/[0.05] dark:border-white/10">
                  {aiProjects[0].category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/[0.05] dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
                  {aiProjects[0].status}
                </span>
              </div>

              {/* Visual Preview Frame */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-zinc-950 shadow-inner">
                <Image
                  src={aiProjects[0].image!}
                  alt={aiProjects[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  {aiProjects[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[0].exploration}
                </p>
              </div>
            </div>

            {/* Feature Chips & Clear CTA - NO ARROWS */}
            <div className="space-y-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[0].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={aiProjects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                {aiProjects[0].actionText}
              </a>
            </div>
          </article>

          {/* Card 2: Prompt Flow OS */}
          <article className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/90 dark:bg-[#333338]/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs group hover:border-black/20 dark:hover:border-white/20 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 border border-black/[0.05] dark:border-white/10">
                  {aiProjects[1].category}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{aiProjects[1].status}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  {aiProjects[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[1].exploration}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] space-y-1 text-xs">
                <span className="font-bold text-zinc-950 dark:text-white block text-[11px]">Focus Architecture:</span>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Chaining multi-agent context trees</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Spatial prompt graph execution</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[1].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
              >
                {aiProjects[1].actionText}
              </button>
            </div>
          </article>

          {/* Card 3: Dynamic Token Synthesizer */}
          <article className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/90 dark:bg-[#333338]/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs group hover:border-black/20 dark:hover:border-white/20 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 border border-black/[0.05] dark:border-white/10">
                  {aiProjects[3].category}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{aiProjects[3].status}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  {aiProjects[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[3].exploration}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] space-y-1 text-xs">
                <span className="font-bold text-zinc-950 dark:text-white block text-[11px]">System Capabilities:</span>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Algorithmic contrast synthesis (APCA / WCAG)</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Real-time token synchronization</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[3].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
              >
                {aiProjects[3].actionText}
              </button>
            </div>
          </article>

          {/* Card 4: Agent Orchestration Workbench */}
          <article className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/90 dark:bg-[#333338]/60 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs group hover:border-black/20 dark:hover:border-white/20 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10 border border-black/[0.05] dark:border-white/10">
                  {aiProjects[2].category}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{aiProjects[2].status}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  {aiProjects[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {aiProjects[2].exploration}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] space-y-1 text-xs">
                <span className="font-bold text-zinc-950 dark:text-white block text-[11px]">Human-AI Interaction:</span>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Streaming intent &amp; confidence boundaries</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">&bull; Multi-tier human sign-off checkpoints</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
              <div className="flex flex-wrap gap-1.5">
                {aiProjects[2].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-[#28282B] border border-black/[0.05] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="touch-target w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
              >
                {aiProjects[2].actionText}
              </button>
            </div>
          </article>

        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
