'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import QueryModal from './QueryModal';

interface AIProject {
  id: string;
  title: string;
  shortName: string;
  exploration: string;
  category: string;
  status: string;
  readMetric: string;
  image?: string;
  video?: string;
  iconBg: string;
  iconLetter: string;
  link?: string;
  actionText: string;
  tags: string[];
}

const aiProjects: AIProject[] = [
  {
    id: '01',
    title: 'LevelUp Designer',
    shortName: 'LevelUp',
    exploration: 'Exploring how generative AI can help product designers master problem-space reasoning, heuristic audits, and decision trees through interactive coaching.',
    category: 'Interactive Learning Platform',
    status: 'Live Web App',
    readMetric: '56k Reads',
    image: '/images/levelup-designer.png',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    iconLetter: 'LU',
    link: 'https://level-up-designer.vercel.app/',
    actionText: 'Launch Live App',
    tags: ['Interactive Practice', 'Problem vs. Solution Space', 'Gemini AI'],
  },
  {
    id: '02',
    title: 'Prompt Flow OS',
    shortName: 'PromptFlow',
    exploration: 'Exploring spatial node graph interfaces for designing, debugging, and chaining multi-agent LLM context windows in real-time.',
    category: 'Spatial AI & Knowledge Graphs',
    status: 'Research Lab',
    readMetric: '42k Reads',
    video: '/images/hero-video.mp4',
    iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    iconLetter: 'PF',
    actionText: 'Explore Concept',
    tags: ['Node Interface', 'Context Windows', 'Multi-Agent Chaining'],
  },
  {
    id: '03',
    title: 'Agent Orchestration Workbench',
    shortName: 'Workbench',
    exploration: 'Exploring human-in-the-loop controls, streaming UI feedback, and multi-tier checkpoint signoffs for autonomous AI agent pipelines.',
    category: 'Human-in-the-Loop Interaction',
    status: 'Active Prototype',
    readMetric: '38k Reads',
    video: '/images/hero-video.mp4',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    iconLetter: 'OW',
    actionText: 'Explore Workbench',
    tags: ['Streaming UI', 'Confidence Controls', 'Human Signoff'],
  },
  {
    id: '04',
    title: 'Dynamic Token Synthesizer',
    shortName: 'TokenSynth',
    exploration: 'Exploring algorithmic color theory, live APCA contrast models, and context-aware design systems adapted dynamically to ambient environments.',
    category: 'Design Systems & Telemetry',
    status: 'Active Beta',
    readMetric: '29k Reads',
    image: '/images/project_esow_1775675924462.png',
    iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    iconLetter: 'DS',
    actionText: 'Explore Tokens',
    tags: ['Design Tokens', 'WCAG 2.2 AAA', 'APCA Contrast'],
  },
];

export default function AiExplorationSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeProject = aiProjects[selectedIdx];

  return (
    <section id="ai-exploration" className="px-5 py-8 md:px-8 lg:px-[120px] max-w-[1440px] mx-auto w-full font-sans">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/80 dark:bg-[#28282B] border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.02] tracking-[-1px] text-zinc-950 dark:text-white">
            Some other things I do
          </h2>
          <p className="text-[17px] sm:text-[19px] lg:text-xl font-medium leading-[1.35] text-zinc-500 dark:text-zinc-400">
            I build apps and AI experiments. A lot of experiments.
          </p>
        </div>

        {/* Featured Showcase App Container (Interactive) */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[18px] bg-black shadow-[0px_8px_32px_rgba(0,0,0,0.16)] border border-black/10 dark:border-white/10 aspect-[16/10] sm:aspect-[16/8] flex flex-col justify-end p-6 sm:p-8 md:p-10 group">
            
            {/* Background Media Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {activeProject.video ? (
                  <video
                    src={activeProject.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <Image
                    src={activeProject.image || '/images/hero-portrait-color.png'}
                    alt={activeProject.title}
                    fill
                    className="object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Foreground Content */}
            <div className="relative z-10 space-y-3 sm:space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20">
                  {activeProject.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/10 text-white/90 border border-white/15">
                  {activeProject.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                {activeProject.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed max-w-xl">
                {activeProject.exploration}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {activeProject.link ? (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 shadow-md transition-all hover:scale-105 active:scale-95 text-center"
                  >
                    {activeProject.actionText}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="touch-target inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
                  >
                    {activeProject.actionText}
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Interactive Horizontal App Dock (Selector Bar) */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto py-2">
            {aiProjects.map((p, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`touch-target relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-md scale-105 ring-2 ring-zinc-950/20 dark:ring-white/30'
                      : 'bg-zinc-50 dark:bg-[#333338] text-zinc-700 dark:text-zinc-300 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                  aria-label={`Select ${p.title}`}
                >
                  <span className="text-xs sm:text-sm font-black font-mono">
                    {p.iconLetter}
                  </span>
                  <span className="text-[10px] font-semibold truncate max-w-[56px] pt-0.5 opacity-80">
                    {p.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Research & Writing Cards (Matching benshih.design grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 border-t border-black/5 dark:border-white/10">
          {aiProjects.map((proj, idx) => (
            <article 
              key={proj.id}
              onClick={() => setSelectedIdx(idx)}
              className="group cursor-pointer rounded-xl bg-zinc-50 dark:bg-[#333338]/60 border border-black/5 dark:border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                    {proj.readMetric}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    {proj.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {proj.exploration}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-black/[0.05] dark:border-white/[0.08]">
                {proj.tags.slice(0, 2).map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-[#28282B] text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
