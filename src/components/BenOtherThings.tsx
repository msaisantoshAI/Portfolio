'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AppItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  color: string;
  tags: string[];
}

const apps: AppItem[] = [
  {
    id: 'ai-orchestrator',
    name: 'Antigravity Studio',
    category: 'Agentic AI Playground',
    tagline: 'Multi-agent orchestration workflow',
    description: 'A modular canvas designed to test, benchmark, and deploy autonomous LLM coding & design agents with real-time feedback loops.',
    color: '#3b82f6',
    tags: ['Agentic Workflows', 'Claude / Gemini API', 'TypeScript'],
  },
  {
    id: 'notion-systems',
    name: 'Product Matrix OS',
    category: 'Product Management Template',
    tagline: 'All-in-one PRD & UX Audit Hub',
    description: 'A comprehensive operational system for product designers to run lean UX sprints, heuristic evaluations, and stakeholder alignment meetings.',
    color: '#8b5cf6',
    tags: ['Notion API', 'Heuristics', 'Lean UX'],
  },
  {
    id: 'figma-tokens',
    name: 'WCAG Palette Engine',
    category: 'Design Systems Plugin',
    tagline: 'Automated color contrast validator',
    description: 'A lightweight plugin and algorithm that calculates APCA and WCAG 2.1 AAA color ratios across complex multi-theme UI token sets.',
    color: '#10b981',
    tags: ['Figma Plugin API', 'Accessibility', 'Color Science'],
  },
  {
    id: 'creative-canvas',
    name: 'Art & Motion Lab',
    category: 'Generative Canvas & 3D',
    tagline: 'Canvas shaders & interactive physics',
    description: 'A sandbox of experimental 3D canvas shaders, fluid particle systems, and spring physics interactions crafted for high-performance web experiences.',
    color: '#f59e0b',
    tags: ['WebGL', 'Three.js', 'Framer Motion'],
  },
];

const toolLogos = [
  { name: 'Figma', category: 'Design' },
  { name: 'Cursor', category: 'AI Coding' },
  { name: 'Lovable', category: 'AI Fullstack' },
  { name: 'Claude', category: 'LLM Reasoning' },
  { name: 'Gemini', category: 'Multimodal AI' },
  { name: 'Antigravity', category: 'Agent Workspace' },
  { name: 'Notion', category: 'Product OS' },
  { name: 'Adobe CC', category: 'Visual & Motion' },
];

export default function BenOtherThings() {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const currentApp = apps[activeAppIndex];

  return (
    <section id="fun" className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Side Projects &amp; Experiments
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Some other things I do
          </h2>
          <p className="max-w-2xl text-base sm:text-xl font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Something I get asked a lot: <span className="italic text-zinc-800 dark:text-zinc-300">&ldquo;Santosh, how do you explore so many new tools?&rdquo;</span><br />
            My answer is simple: I love building and learning by shipping.
          </p>
        </div>

        {/* Featured Big Interactive App Card Container */}
        <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-black/60 overflow-hidden shadow-sm p-6 sm:p-10 relative">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            
            {/* Left: App Details */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-800 dark:text-white px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-sm">
                    {currentApp.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Project {activeAppIndex + 1} of {apps.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentApp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <h3 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {currentApp.name}
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium font-mono">
                      &frasl;&frasl; {currentApp.tagline}
                    </p>
                    <p className="text-base text-zinc-600 dark:text-zinc-300 font-light leading-relaxed max-w-lg">
                      {currentApp.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tags and CTA */}
              <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex flex-wrap gap-2">
                  {currentApp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveAppIndex((prev) => (prev + 1) % apps.length)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
                  >
                    Next Project &rarr;
                  </button>
                  <span className="text-xs text-zinc-500 font-mono">Click pills below to switch</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Artwork / Mockup Box */}
            <div className="w-full lg:w-[48%] h-[260px] sm:h-[340px] relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 flex items-center justify-center p-6 group">
              <Image
                src="/images/gallery_whiteboard.jpg"
                alt="Sai Santosh Creative Canvas"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/90 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  ✨ Interactive Prototype
                </span>
                <span className="text-xs text-blue-400 font-mono">
                  Active
                </span>
              </div>
            </div>

          </div>

          {/* App Switcher Tabs Bottom Carousel */}
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-2.5 justify-start">
            {apps.map((app, idx) => {
              const isActive = activeAppIndex === idx;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveAppIndex(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400'
                      : 'bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 shadow-sm'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
                  {app.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools & AI Ecosystem Badges Grid */}
        <div className="space-y-4 pt-4">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            Software Tools &amp; AI Stack I Use Daily
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {toolLogos.map((tool, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-blue-400/50 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all flex items-center justify-between shadow-sm"
              >
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{tool.name}</h4>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{tool.category}</span>
                </div>
                <span className="text-zinc-400 dark:text-zinc-600 text-xs">&bull;</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
