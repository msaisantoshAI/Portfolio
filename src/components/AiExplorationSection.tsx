'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AIExperiment {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
  image: string;
  link?: string;
  status: string;
}

const aiExperiments: AIExperiment[] = [
  {
    id: 'levelup-designer',
    name: 'LevelUp Designer',
    category: 'Interactive AI & Product Design Practice Deck',
    tagline: 'Master Product Design & Agentic Workflows with interactive decks',
    description: 'An interactive learning & practice application for product designers to master problem space vs. solution space, agentic design workflows, and AI-accelerated product mastery with real-world practice modules.',
    features: [
      'Interactive Practice Decks covering Beginner, Intermediate & Advanced tiers',
      'Problem Space vs. Solution Space architectural exercises and case drills',
      'Built-in Focus Timer, Journaling & Gemini AI assistance integration'
    ],
    tags: ['Product Design', 'Interactive Learning', 'Agentic UX', 'Next.js', 'Vercel'],
    image: '/images/levelup-designer.png',
    link: 'https://level-up-designer.vercel.app/',
    status: 'Live Web App'
  },
  {
    id: 'ai-design-system',
    name: 'Dynamic Token Synthesizer',
    category: 'Design Systems & AI',
    tagline: 'AI-assisted color theory & APCA contrast matrix',
    description: 'An algorithmic token engine that synthesizes accessible color palettes and typography scales based on ambient lighting and real-time environmental telemetry.',
    features: [
      'WCAG 2.2 AAA & APCA compliant contrast algorithms',
      'Automated Figma-to-Code token sync',
      'Context-aware dark/light theme interpolation'
    ],
    tags: ['Design Tokens', 'WCAG 2.2 AA', 'APCA Contrast', 'Tailwind'],
    image: '/images/gallery-main.jpg',
    status: 'Active Beta'
  },
  {
    id: 'prompt-canvas',
    name: 'Prompt Flow OS',
    category: 'Productivity & Knowledge Graphs',
    tagline: 'Spatial prompt engineering & memory matrices',
    description: 'A spatial node-based canvas for chaining multi-modal AI agents, memory states, and knowledge graphs into human-manageable modular workflows.',
    features: [
      'Drag-and-drop agent chaining interface',
      'Context window memory management',
      'One-click export to API endpoints'
    ],
    tags: ['Knowledge Graphs', 'Node Interface', 'Claude 3.5 API'],
    image: '/images/workshop_group.jpg',
    status: 'Research Lab'
  }
];

export default function AiExplorationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeExp = aiExperiments[activeTab];

  return (
    <section id="ai-exploration" className="px-3 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full py-10 sm:py-14 font-sans">
      <div className="rounded-[32px] bg-gradient-to-br from-[#0c2354]/95 via-[#081738]/95 to-[#040c1e]/95 text-white border border-blue-400/30 p-7 sm:p-12 md:p-14 shadow-[0_20px_60px_-10px_rgba(10,35,90,0.5)] backdrop-blur-3xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <p className="eyebrow text-blue-300">
              R&amp;D &bull; Prototypes &bull; Side Projects
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              AI Exploration &amp; Playground
            </h2>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-mono text-blue-300">
              Interactive Canvas &bull; Live Workflows
            </span>
          </div>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-white/10 pb-4">
          {aiExperiments.map((exp, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`touch-target px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{exp.name}</span>
                {exp.status === 'Live Web App' && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Experiment Dynamic Detail Card */}
        <div className="relative rounded-2xl border border-blue-400/20 bg-black/40 p-6 sm:p-8 md:p-10 shadow-sm backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Conceptual Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Meta & Status */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                    {activeExp.category}
                  </span>
                  <span className="text-xs font-mono text-blue-300/80">
                    &bull; {activeExp.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {activeExp.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-blue-300">
                    {activeExp.tagline}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
                    {activeExp.description}
                  </p>

                  {/* Key Capabilities List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold block">
                      Core Innovations:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-blue-100/90">
                      {activeExp.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5 font-bold">✔</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags & Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono bg-white/10 border border-white/10 text-blue-200 px-3 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {activeExp.link ? (
                    <a
                      href={activeExp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Launch {activeExp.name}</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-blue-300/80">
                      Prototype {activeTab + 1} of {aiExperiments.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Frame (5 Cols) */}
              <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-blue-400/30 bg-zinc-900 shadow-xl group">
                <Image
                  src={activeExp.image}
                  alt={`${activeExp.name} interface preview`}
                  fill
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
                  <span className="bg-black/70 px-3 py-1.5 rounded-full border border-blue-400/30 backdrop-blur-md">
                    ⚡ {activeExp.status}
                  </span>
                  {activeExp.link && (
                    <a
                      href={activeExp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded-full font-bold shadow-md transition-colors"
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
