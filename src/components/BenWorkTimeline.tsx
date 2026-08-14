'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkItem {
  year: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

const workItems: WorkItem[] = [
  {
    year: '2025',
    title: 'AI Orchestration Workspace',
    tagline: 'Generative UI & Agent Workflows',
    description: 'Designed a next-gen canvas where designers and engineers can orchestrate multi-agent AI behaviors, dynamic prompt trees, and streaming UI states in real time.',
    tags: ['AI Product Design', 'Generative UI', 'Agent Workflows'],
    image: '/images/hero-video.mp4',
    link: '/projects/esow-planner',
  },
  {
    year: '2024',
    title: 'eSOW Planner',
    tagline: 'Enterprise Statement of Work Platform',
    description: 'Redesigned the end-to-end enterprise contract and SOW authoring experience, cutting operational turnaround time by 68% for global delivery teams.',
    tags: ['Enterprise SaaS', 'Workflow Automation', 'Design System'],
    image: '/images/project_esow_1775675924462.png',
    link: '/projects/esow-planner',
  },
  {
    year: '2023',
    title: 'SAS + HRMS Integration',
    tagline: 'Substation Automation & Field Operations',
    description: 'Unified high-density electrical grid telemetry with field engineer workforce scheduling, significantly reducing incident response cognitive load.',
    tags: ['Critical Infrastructure', 'Information Architecture', 'Data Density'],
    image: '/images/project_sas_1775675939361.png',
    link: '/projects/esow-planner',
  },
  {
    year: '2023',
    title: 'EMULATE Virtual Cloud',
    tagline: 'Cloud Infrastructure Workspace',
    description: 'A frictionless virtual machine control hub enabling distributed teams to spin up, collaborate within, and manage remote sandbox environments in seconds.',
    tags: ['Cloud Computing', 'UI/UX Architecture', 'Concept Design'],
    image: '/images/project_emulate_1775675955645.png',
    link: '/projects/esow-planner',
  },
];

export default function BenWorkTimeline() {
  return (
    <section id="work" className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300">
        
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Featured Case Studies
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Some recent work
            </h2>
            <span className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-light">
              (from full-time roles &amp; builds)
            </span>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="relative border-l-2 border-zinc-200 dark:border-white/10 ml-3 md:ml-12 pl-6 md:pl-12 space-y-16">
          {workItems.map((item, idx) => (
            <div key={idx} className="relative group pt-2">
              {/* Year Marker & Glowing Dot on Line */}
              <div className="absolute -left-[33px] md:-left-[58px] top-4 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 ring-4 ring-white dark:ring-zinc-900 border-2 border-white shadow-md" />
                <span className="hidden md:inline-block font-mono text-xl font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.year}
                </span>
              </div>

              {/* Card Container with generous internal padding and white space */}
              <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/50 p-6 sm:p-10 space-y-6 shadow-sm group-hover:shadow-md transition-all">
                
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="md:hidden font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.tagline}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="max-w-3xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Media Container (Video / High-Res Image Mockup) */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 shadow-lg aspect-[16/9] group-hover:border-blue-500/40 transition-all duration-500">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Tags & Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/5 dark:border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-md group-hover:scale-105 active:scale-95"
                  >
                    Read case study &rarr;
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
