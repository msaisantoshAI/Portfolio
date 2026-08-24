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
    category: 'Interactive Product Design Practice App',
    tagline: 'Master product thinking & agentic workflows through interactive decks',
    description: 'An interactive learning platform for product designers to master problem framing, agentic workflows, and real-world system architecture drills.',
    features: [
      'Interactive Practice Decks covering Beginner, Intermediate & Advanced tiers',
      'Problem Space vs. Solution Space architectural drills',
      'Built-in Focus Timer, Journaling & Gemini AI assistance'
    ],
    tags: ['Product Design', 'Agentic UX', 'Next.js', 'Vercel'],
    image: '/images/levelup-designer.png',
    link: 'https://level-up-designer.vercel.app/',
    status: 'Live Web App'
  },
  {
    id: 'ai-design-system',
    name: 'Token Synthesizer',
    category: 'Design Systems & AI',
    tagline: 'AI-assisted color theory & APCA contrast engine',
    description: 'Algorithmic token engine synthesizing accessible color palettes and typography scales based on real-time environmental telemetry.',
    features: [
      'WCAG 2.2 AAA & APCA compliant contrast algorithms',
      'Automated Figma-to-Code token synchronization',
      'Context-aware dynamic theme interpolation'
    ],
    tags: ['Design Tokens', 'WCAG 2.2 AA', 'APCA Contrast', 'Tailwind'],
    image: '/images/gallery-main.jpg',
    status: 'Active Beta'
  },
  {
    id: 'prompt-canvas',
    name: 'Prompt Flow OS',
    category: 'Spatial Knowledge Graphs',
    tagline: 'Node-based canvas for chaining autonomous LLM agents',
    description: 'Spatial node-based canvas for chaining multi-modal AI agents and memory states into human-manageable modular workflows.',
    features: [
      'Drag-and-drop agent chaining interface',
      'Context window memory management',
      'One-click export to API endpoints'
    ],
    tags: ['Knowledge Graphs', 'Node Interface', 'Claude API'],
    image: '/images/workshop_group.jpg',
    status: 'Research Lab'
  }
];

export default function AiExplorationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeExp = aiExperiments[activeTab];

  return (
    <section id="ai-exploration" className="px-4 py-8 sm:py-12 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-7 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-1.5">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              AI R&amp;D &bull; Prototypes
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

        {/* Experiment Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-black/5 dark:border-white/10 pb-3.5">
          {aiExperiments.map((exp, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`touch-target px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {exp.name}
              </button>
            );
          })}
        </div>

        {/* Active Experiment Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Left Column: Details */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                  {activeExp.category}
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-400 dark:text-zinc-500">
                  &bull; {activeExp.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {activeExp.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {activeExp.tagline}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                  {activeExp.description}
                </p>
              </div>

              {/* Core Features */}
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pt-1">
                {activeExp.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <span className="text-blue-500 font-bold shrink-0">&bull;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Tags & Action CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/5 dark:border-white/10">
                {activeExp.link && (
                  <a
                    href={activeExp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    <span>Launch Live Web App ↗</span>
                  </a>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {activeExp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Frame */}
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-zinc-950 shadow-md">
              <Image
                src={activeExp.image}
                alt={activeExp.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
