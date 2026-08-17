'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import QueryModal from '@/components/QueryModal';

function CountUp({ end, decimals = 0, suffix = '' }: { end: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * end;
      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface WorkItem {
  year: string;
  title: string;
  category: string;
  outcomeMetricValue: number;
  outcomeMetricSuffix: string;
  outcomeMetricDecimals?: number;
  outcome: string;
  problem: string;
  role: string;
  tags: string[];
  image: string;
  actionText: string;
  isFlagship?: boolean;
}

const workItems: WorkItem[] = [
  {
    year: '2024',
    title: 'eSOW Planner',
    category: 'Enterprise SaaS · Tata Consultancy Services',
    outcomeMetricValue: 68,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in Statement of Work authoring cycle for enterprise delivery managers',
    problem: 'SOW generation spanned 3–5 disconnected tools and required 14 days of manual back-and-forth between legal, commercial, and delivery teams.',
    role: 'Lead Product Designer · End-to-End Systems UX',
    tags: ['Enterprise SaaS', 'Design Systems', 'Data Density', 'WCAG 2.2 AA'],
    image: '/images/project_esow_1775675924462.png',
    actionText: 'Explore Case Study',
    isFlagship: true,
  },
  {
    year: '2024',
    title: 'Antigravity Studio',
    category: 'AI Tooling & Orchestration',
    outcomeMetricValue: 3.4,
    outcomeMetricSuffix: 'x',
    outcomeMetricDecimals: 1,
    outcome: 'faster iteration speed for designers & engineers testing autonomous LLM agent chains',
    problem: 'Navigating non-deterministic AI outputs and complex prompt trees caused developer confusion and poor UI feedback loops.',
    role: 'Product Designer & AI Prototyper · Interaction Model',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows', 'Prompt Canvas'],
    image: '/images/hero-video.mp4',
    actionText: 'Explore AI Workspace',
    isFlagship: true,
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    category: 'Critical Infrastructure · High-Density Telemetry',
    outcomeMetricValue: 52,
    outcomeMetricSuffix: '%',
    outcome: 'reduction in incident dispatch response latency for electrical grid operators',
    problem: 'Field engineers struggled with disparate hardware sensors and legacy workforce rosters during emergency grid faults.',
    role: 'Product UX Designer · Information Architecture',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    actionText: 'Explore System Architecture',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    category: 'Cloud Infrastructure · Sandbox Environments',
    outcomeMetricValue: 80,
    outcomeMetricSuffix: '%',
    outcome: 'drop in setup friction for spinning up remote engineering sandbox clusters',
    problem: 'Developers spent hours configuring local virtualization environments and debugging permission conflicts across distributed squads.',
    role: 'UI/UX Architect · Concept & Prototype Design',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    actionText: 'Explore Cloud Sandbox',
  },
];

export default function BenWorkTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="work" className="px-3 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full py-10 sm:py-14 font-sans">
      
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
        <p className="eyebrow text-blue-600 dark:text-blue-400">
          Featured Case Studies
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Selected Case Studies
          </h2>
          <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            Enterprise Platforms &bull; AI Products
          </span>
        </div>
      </div>

      {/* Sticky Overlapping Project Cards Stack with Ocean Blue Styling & Expanded Size */}
      <div className="relative flex flex-col gap-8 sm:gap-12 pb-12">
        {workItems.map((item, idx) => {
          const topOffset = 100 + idx * 24;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{
                top: `${topOffset}px`,
                zIndex: idx + 10,
              }}
              className="sticky rounded-[32px] bg-gradient-to-br from-[#0c2354]/95 via-[#081738]/95 to-[#040c1e]/95 text-white border border-blue-400/30 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_-10px_rgba(10,35,90,0.5)] backdrop-blur-3xl transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left Column: Case Study Details (6 Cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                  
                  {/* Category & Year */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-300/80">
                      {item.year}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-blue-300">
                      {item.role}
                    </p>
                  </div>

                  {/* Problem & Impact Summary */}
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    {item.problem}
                  </p>

                  {/* Quantified Metric Badge */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/40 border border-blue-400/20 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono shrink-0">
                      <CountUp 
                        end={item.outcomeMetricValue} 
                        decimals={item.outcomeMetricDecimals || 0} 
                        suffix={item.outcomeMetricSuffix} 
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-blue-100 leading-snug">
                      {item.outcome}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono bg-white/10 text-blue-200 px-3 py-1 rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-300/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>{item.actionText}</span>
                      <span className="font-bold">&rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Larger High-Resolution Media Frame (6 Cols) */}
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] md:min-h-[380px] rounded-2xl overflow-hidden border border-blue-400/30 bg-black/60 shadow-xl group">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={`${item.title} case study interactive preview`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040c1e]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 font-mono">
                    <span className="bg-black/70 px-3 py-1.5 rounded-full border border-blue-400/30 backdrop-blur-md text-[11px]">
                      🚀 Shipped Enterprise Experience
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
