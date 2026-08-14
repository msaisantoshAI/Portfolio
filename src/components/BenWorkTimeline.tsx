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
  isPassword?: boolean;
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
      <div className="rounded-[28px] bg-zinc-900/80 border border-white/10 p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-400 font-semibold">
            Featured Case Studies
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Some recent work
            </h2>
            <span className="text-lg md:text-2xl text-zinc-400 font-light">
              (from full-time roles &amp; builds)
            </span>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-6 md:pl-12 space-y-20">
          {workItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Year Marker & Glowing Dot on Line */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-zinc-900 border-2 border-white shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <span className="hidden md:inline-block font-mono text-xl font-bold text-zinc-500 group-hover:text-blue-400 transition-colors">
                  {item.year}
                </span>
              </div>

              <div className="space-y-6">
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="md:hidden font-mono text-sm font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">
                      {item.tagline}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Media Container (Video / High-Res Image Mockup) */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.6)] aspect-[16/9] group-hover:border-blue-500/30 transition-all duration-500">
                  {item.image.endsWith('.mp4') ? (
                    <video
                      src={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Tags & Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-blue-400 hover:text-white transition-all shadow-md group-hover:scale-105 active:scale-95"
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
