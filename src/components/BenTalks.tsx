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
    date: '2024 — 2025',
    title: 'Designing with AI: Beyond Prompts into Living Interfaces',
    event: 'AI-UX Design & Product Session',
    location: 'Hyderabad, India',
    description: 'Shared deep dives on how AI assistants, automation, and cognitive models transform product design workflows, moving from static mockups into continuous generative orchestration.',
    stats: 'Industry Session',
    tags: ['AI-UX Design', 'Generative UI', 'IxDF Certification'],
    image: '/images/workshop_speak_1.jpg',
  },
  {
    date: '2023 — 2024',
    title: 'Enterprise Design Systems & Icon Architecture',
    event: 'Design Systems Knowledge Share',
    location: 'TCS Design Guild',
    description: 'Building scalable icon libraries, verified WCAG 2.2 accessibility states, and unified component tokens across multi-squad enterprise delivery teams.',
    stats: 'Design Systems',
    tags: ['Design Systems', 'WCAG 2.2 AA', 'Iconography'],
    image: '/images/workshop_group.jpg',
  },
  {
    date: '2023',
    title: 'Heuristic Audits & Enterprise Search Usability',
    event: 'UX Strategy Masterclass',
    location: 'Internal Knowledge Session',
    description: 'Presented an actionable framework for evaluating complex enterprise search and estimation platforms to reduce cognitive fatigue and drop employee support tickets.',
    stats: 'Usability Audit',
    tags: ['Heuristics', 'Search UX', 'User Research'],
    image: '/images/workshop_speak_2.jpg',
  },
];

export default function BenTalks() {
  const mainTalk = talks[0];
  const secondaryTalks = talks.slice(1);

  return (
    <section id="talks" className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/88 dark:bg-[#081026]/88 border border-white/60 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-[0_16px_45px_rgba(20,60,140,0.12)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Speaking &amp; Knowledge Sharing
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            Workshops, Guild Talks &amp; Masterclasses
          </h2>
          <p className="body-lead text-zinc-600 dark:text-zinc-400">
            Sharing practical knowledge on enterprise UX heuristics, scalable design systems, and human-in-the-loop AI orchestration.
          </p>
        </div>

        {/* Layout: Main Featured Talk Card + Secondary List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Featured Talk (Left 7 Cols) */}
          <article className="lg:col-span-7 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/50 p-6 sm:p-8 space-y-6 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="relative h-[220px] sm:h-[280px] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900">
                <Image
                  src={mainTalk.image}
                  alt={`${mainTalk.title} keynote session by Sai Santosh`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-xs font-mono font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow-md">
                    {mainTalk.date} &bull; {mainTalk.location}
                  </span>
                  <span className="text-xs font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {mainTalk.stats}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  {mainTalk.event}
                </span>
                <h3 className="card-heading text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {mainTalk.title}
                </h3>
                <p className="body-copy text-zinc-600 dark:text-zinc-300">
                  {mainTalk.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/5 dark:border-white/10">
              {mainTalk.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Secondary Talks (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {secondaryTalks.map((talk, idx) => (
              <article
                key={idx}
                className="flex-1 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 space-y-3.5 hover:border-black/15 dark:hover:border-white/20 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {talk.date}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {talk.stats}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {talk.title}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {talk.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
                  {talk.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-400 px-2.5 py-0.5 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
