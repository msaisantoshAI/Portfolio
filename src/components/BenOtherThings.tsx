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
  tags: string[];
}

const apps: AppItem[] = [
  {
    id: 'ai-orchestrator',
    name: 'Antigravity Studio',
    category: 'Agentic AI Interaction',
    tagline: 'Multi-agent orchestration & streaming UI states',
    description: 'An interactive canvas designed to explore streaming UI components, agent state transitions, human verification checkpoints, and graceful error fallback models.',
    tags: ['Generative UI', 'Agent Trees', 'Human-in-the-Loop'],
  },
  {
    id: 'notion-systems',
    name: 'Product Matrix OS',
    category: 'Information Architecture',
    tagline: 'PRD, Heuristics & Workflow Mapping Hub',
    description: 'A structured workspace for conducting rigorous UX audits, mapping complex user journeys, and establishing consensus with engineering stakeholders.',
    tags: ['Information Architecture', 'Heuristic Audits', 'Stakeholder Alignment'],
  },
  {
    id: 'figma-tokens',
    name: 'WCAG Palette Engine',
    category: 'Design Systems & Accessibility',
    tagline: 'Automated token contrast & APCA validator',
    description: 'An algorithmic design token system that validates WCAG 2.2 AA/AAA color contrast and typography scaling across multi-brand dark/light themes.',
    tags: ['Design Tokens', 'WCAG 2.2 AA', 'APCA Contrast'],
  },
  {
    id: 'creative-canvas',
    name: 'Art & Motion Lab',
    category: 'Generative Canvas & Physics',
    tagline: 'Spring dynamics & spatial interactions',
    description: 'An experimental sandbox of subtle micro-animations, physics-based springs, and fluid visual shaders crafted for responsive web applications.',
    tags: ['Interaction Design', 'Spring Physics', 'Framer Motion'],
  },
];

const processPillars = [
  {
    step: '01',
    title: 'Discover',
    focus: 'User Research, Analytics, & Heuristic Audits',
    tools: ['User Interviews', 'Mixpanel', 'Heuristic Matrix', 'Cognitive Audits'],
  },
  {
    step: '02',
    title: 'Structure',
    focus: 'Information Architecture, Systems, & Workflows',
    tools: ['Miro', 'Notion', 'Workflow Mapping', 'Component Tokens'],
  },
  {
    step: '03',
    title: 'Design',
    focus: 'Figma, Rapid Prototyping, & Design Systems',
    tools: ['Figma', 'WCAG 2.2 AA', 'Interactive Prototyping', 'Adobe CC'],
  },
  {
    step: '04',
    title: 'Build',
    focus: 'AI Orchestration, Front-End Code, & Fast Iteration',
    tools: ['Cursor', 'Claude API', 'Lovable', 'Antigravity Studio', 'TypeScript'],
  },
  {
    step: '05',
    title: 'Validate',
    focus: 'Usability Testing, Iteration, & Business Metrics',
    tools: ['Task Completion Audits', 'A/B Testing', 'Qualitative Synthesis'],
  },
];

export default function BenOtherThings() {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const currentApp = apps[activeAppIndex];

  return (
    <section id="fun" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Process &amp; AI Explorations
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            How I Work &amp; Build
          </h2>
          <p className="body-lead text-zinc-600 dark:text-zinc-400">
            I don&apos;t just create static mocks; I turn complex requirements into validated product systems and functional AI prototypes.
          </p>
        </div>

        {/* 5-Stage Process Methodology Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            The 5-Stage Product Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {processPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {p.step} &frasl;&frasl; {p.title}
                  </span>
                  <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                    {p.focus}
                  </p>
                </div>
                <div className="pt-2 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-1">
                  {p.tools.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono bg-white dark:bg-white/10 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded border border-black/5 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Big Interactive App Card Container */}
        <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-black/50 overflow-hidden shadow-sm p-6 sm:p-10 relative">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            
            {/* Left: App Details */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-800 dark:text-white px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-sm">
                    {currentApp.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Prototype {activeAppIndex + 1} of {apps.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentApp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <h4 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {currentApp.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium font-mono">
                      &frasl;&frasl; {currentApp.tagline}
                    </p>
                    <p className="body-copy text-zinc-600 dark:text-zinc-300">
                      {currentApp.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tags and CTA */}
              <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
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
                    className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Next Prototype &rarr;
                  </button>
                  <span className="caption-meta text-zinc-500 font-mono">Click tabs below to switch</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Artwork / Mockup Box */}
            <div className="w-full lg:w-[46%] h-[240px] sm:h-[300px] relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 flex items-center justify-center p-6 group">
              <Image
                src="/images/gallery_whiteboard.jpg"
                alt="Product Design &amp; Architecture Whiteboard Sessions"
                fill
                className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/90 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  ✨ Interactive Prototype
                </span>
                <span className="text-xs text-blue-400 font-mono">
                  Live
                </span>
              </div>
            </div>

          </div>

          {/* Prototype Switcher Tabs Bottom Carousel */}
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-2 justify-start">
            {apps.map((app, idx) => {
              const isActive = activeAppIndex === idx;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveAppIndex(idx)}
                  className={`touch-target flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                      : 'bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 shadow-sm'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'}`} aria-hidden="true" />
                  {app.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
