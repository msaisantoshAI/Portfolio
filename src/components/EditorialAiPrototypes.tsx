'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROTOTYPES = [
  {
    num: '01 / 04',
    title: 'Antigravity Studio',
    tagline: 'Autonomous Multi-Agent Workflow Orchestrator',
    description: 'A visual canvas interface allowing designers and engineers to wire autonomous LLM subagents together into deterministic DAGs (Directed Acyclic Graphs), with live step inspection and real-time state rollback.',
    features: ['Visual DAG Node Editor', 'Real-Time State Rollback', 'Agent Sandbox Execution', 'Latency & Token Cost Telemetry'],
    stack: ['React Flow', 'Framer Motion', 'WebSockets', 'TypeScript'],
    color: 'from-blue-600 to-cyan-500',
    demoState: {
      status: 'ORCHESTRATING',
      activeAgents: 4,
      throughput: '124 ops/sec',
      confidence: '99.4%'
    }
  },
  {
    num: '02 / 04',
    title: 'Generative UI Canvas',
    tagline: 'Dynamic Intent-to-Interface Synthesis',
    description: 'An experimental interface engine that dynamically renders bespoke, accessibility-compliant micro-components in real-time based on natural language operator queries.',
    features: ['Zero-Latency Component Synthesis', 'Strict Design Token Schema', 'Deterministic Micro-States', 'Keyboard-First Ergonomics'],
    stack: ['JSON Schema', 'Tailwind CSS', 'Dynamic Imports', 'Next.js'],
    demoState: {
      status: 'SYNTHESIZING',
      activeAgents: 2,
      throughput: '32 ms latency',
      confidence: '100% WCAG AA'
    }
  },
  {
    num: '03 / 04',
    title: 'Human-in-the-Loop Workspace',
    tagline: 'Cognitive Review & AI Verification Matrix',
    description: 'A high-speed review console for operators to verify machine-suggested actions with cryptographic provenance, cited rationale, and one-click bulk approvals.',
    features: ['Verifiable Citation Explorer', 'One-Click Diff Inspection', 'Batch Audit Lifecycles', 'Full Action Undo Buffer'],
    stack: ['Zustand', 'Radix UI', 'React Virtual', 'CSS Grid'],
    demoState: {
      status: 'VERIFYING',
      activeAgents: 3,
      throughput: '450 items/min',
      confidence: '99.8% Provenance'
    }
  },
  {
    num: '04 / 04',
    title: 'Intelligent Query Matrix',
    tagline: 'Natural Language Enterprise Telemetry',
    description: 'Converts unstructured operator language into high-dimensional telemetry charts, comparative incident heatmaps, and actionable operational insights.',
    features: ['Natural Language to SQL/Vega', 'Real-Time Anomaly Detection', 'Dynamic Chart Composition', 'Multi-Tenant RBAC'],
    stack: ['Vega-Lite', 'D3.js', 'Web Workers', 'Tailwind'],
    demoState: {
      status: 'QUERYING',
      activeAgents: 1,
      throughput: '18 ms parse',
      confidence: '98.9% Intent'
    }
  }
];

export default function EditorialAiPrototypes() {
  const [activeTab, setActiveTab] = useState(0);
  const current = PROTOTYPES[activeTab];

  return (
    <section id="prototypes" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          05 // PROTOTYPES &amp; LABS
        </span>
        <div className="h-px w-12 bg-blue-500/30 dark:bg-blue-400/30" />
      </motion.div>

      {/* 2. SECTION HEADLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12 sm:mb-16 max-w-3xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Interactive AI &amp; System Labs
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          Experimental prototypes exploring agentic workflows, dynamic generative UI, and cognitive operator ergonomics.
        </p>
      </motion.div>

      {/* 3. INTERACTIVE 4-TAB NAVIGATION */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
        {PROTOTYPES.map((proto, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={proto.title}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`touch-target p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20 scale-[1.02]'
                  : 'bg-white/40 dark:bg-[#0b0f1a]/60 hover:bg-white/60 dark:hover:bg-[#0b0f1a]/90 text-slate-700 dark:text-zinc-300 border-slate-200/60 dark:border-white/10'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold tracking-wider mb-2 ${
                isActive ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {proto.num}
              </span>
              <span className="text-xs sm:text-sm font-bold truncate">
                {proto.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. ACTIVE PROTOTYPE SHOWCASE PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="p-6 sm:p-10 rounded-3xl bg-white/40 dark:bg-[#0b0f1a]/75 backdrop-blur-2xl border border-slate-200/70 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Info & Details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                  {current.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed">
                {current.description}
              </p>

              {/* Core Features */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">
                  Key Architectural Patterns:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-zinc-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Pills */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-2">
                  Built With:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.stack.map((item) => (
                    <span 
                      key={item} 
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/60 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Mock Prototype Terminal / State Monitor */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950 text-white font-mono text-xs border border-white/15 shadow-2xl space-y-4">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Live Lab Console
                  </span>
                </div>

                {/* State Metrics */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Execution State</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {current.demoState.status}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Throughput</span>
                    <span className="text-xs font-bold text-blue-400">
                      {current.demoState.throughput}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Active Nodes</span>
                    <span className="text-xs font-bold text-zinc-200">
                      {current.demoState.activeAgents} Coordinated
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Confidence</span>
                    <span className="text-xs font-bold text-purple-400">
                      {current.demoState.confidence}
                    </span>
                  </div>
                </div>

                {/* Simulated Log Feed */}
                <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] text-zinc-400 space-y-1">
                  <p className="text-emerald-400/90">&gt; state: graph_initialized</p>
                  <p className="text-blue-400/90">&gt; tokens: parsed 1,420 cognitive nodes</p>
                  <p className="text-zinc-300">&gt; verified: human_approval_gate_passed</p>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
