'use client';

import React from 'react';
import Image from 'next/image';

interface Talk {
  date: string;
  title: string;
  event: string;
  location: string;
  description: string;
  stats: string;
  tags: string[];
  image: string;
}

const talks: Talk[] = [
  {
    date: 'Sep 2025',
    title: 'Designing with AI: Beyond Prompts into Living Interfaces',
    event: 'Design Matters Community Session',
    location: 'Bangalore, India',
    description: 'Shared deep dives on how AI transforms product design workflows, moving from static mockups into continuous generative orchestration and streaming UI states.',
    stats: '1,200+ Attendees',
    tags: ['AI Product Design', 'Generative UI', 'Keynote'],
    image: '/images/workshop_speak_1.jpg',
  },
  {
    date: 'Jun 2024',
    title: 'The Modern Product Designer: Bridging Design & Systems',
    event: 'Campus Tech & Design Summit',
    location: 'Hyderabad, India',
    description: 'Conducted a hands-on masterclass on design systems, component tokenization, and WCAG accessibility standards for 200+ design students.',
    stats: '250+ Students',
    tags: ['Design Systems', 'Accessibility', 'Workshop'],
    image: '/images/workshop_group.jpg',
  },
  {
    date: 'Mar 2024',
    title: 'Heuristic Audits & Enterprise SaaS Workflows',
    event: 'TCS Design Guild Knowledge Share',
    location: 'Internal Global Session',
    description: 'Presented an actionable framework for auditing multi-step enterprise workflows to reduce cognitive load and cut time-to-first-value.',
    stats: '500+ Peers',
    tags: ['Enterprise UX', 'Heuristics', 'Guild Talk'],
    image: '/images/workshop_speak_2.jpg',
  },
];

export default function BenTalks() {
  const mainTalk = talks[0];
  const secondaryTalks = talks.slice(1);

  return (
    <section id="talks" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#121214] border border-black/10 dark:border-white/12 p-7 sm:p-12 md:p-16 shadow-md dark:shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Speaking &amp; Masterclasses
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-950 dark:text-white">
              Public Talks &amp; Workshops
            </h2>
            <span className="text-base sm:text-xl text-zinc-500 dark:text-zinc-400 font-light">
              (Sharing what I learn)
            </span>
          </div>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            I regularly speak about AI interaction models, enterprise design scaling, and building accessible products for global teams.
          </p>
        </div>

        {/* Bento Grid: 1 Featured Large Card (Left) + 2 Stacked Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          
          {/* Featured Large Talk (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#18181B] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm hover:border-blue-500/40 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {mainTalk.date} &bull; {mainTalk.location}
                </span>
                <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/60">
                  {mainTalk.stats}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {mainTalk.title}
              </h3>
              
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {mainTalk.event}
              </p>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {mainTalk.description}
              </p>

              {/* Photo Frame */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900 shadow-sm mt-2">
                <Image
                  src={mainTalk.image}
                  alt={mainTalk.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {mainTalk.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-xs font-mono bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 2 Stacked Secondary Talks (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondaryTalks.map((talk, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#18181B] p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-blue-500/40 transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {talk.date} &bull; {talk.location}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      {talk.stats}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {talk.title}
                  </h4>

                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {talk.event}
                  </p>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {talk.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                  {talk.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-mono bg-white dark:bg-[#121214] border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
