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
    event: 'Design Matters Community',
    location: 'Bangalore, India',
    description: 'How AI transforms static interfaces into streaming generative workflows and dynamic UI models.',
    stats: '1,200+ Attendees',
    tags: ['AI Product Design', 'Generative UI', 'Keynote'],
    image: '/images/workshop_speak_1.jpg',
  },
  {
    date: 'Jun 2024',
    title: 'The Modern Product Designer: Bridging Design & Systems',
    event: 'Campus Tech & Design Summit',
    location: 'Hyderabad, India',
    description: 'Hands-on masterclass on design systems, token architecture, and WCAG accessibility standards.',
    stats: '250+ Students',
    tags: ['Design Systems', 'Accessibility', 'Workshop'],
    image: '/images/workshop_group.jpg',
  },
  {
    date: 'Mar 2024',
    title: 'Heuristic Audits & Enterprise SaaS Workflows',
    event: 'TCS Design Guild',
    location: 'Internal Global Session',
    description: 'Actionable frameworks for auditing multi-step enterprise workflows to reduce cognitive friction.',
    stats: '500+ Peers',
    tags: ['Enterprise UX', 'Heuristics', 'Guild Talk'],
    image: '/images/workshop_speak_2.jpg',
  },
];

export default function BenTalks() {
  const mainTalk = talks[0];
  const secondaryTalks = talks.slice(1);

  return (
    <section id="talks" className="px-4 py-8 sm:py-12 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-7 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Speaking &amp; Mentorship
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            Public Talks &amp; Workshops
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Sharing knowledge on design systems, enterprise UX heuristics, and human-in-the-loop AI interfaces.
          </p>
        </div>

        {/* Layout: Main Featured Talk Card + Secondary List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Featured Talk (Left 7 Cols) */}
          <article className="lg:col-span-7 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-black/50 p-5 sm:p-7 space-y-4 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all">
            <div className="space-y-3.5">
              <div className="relative h-[200px] sm:h-[250px] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900">
                <Image
                  src={mainTalk.image}
                  alt={`${mainTalk.title} keynote session`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow-md">
                    {mainTalk.date} &bull; {mainTalk.location}
                  </span>
                  <span className="text-[11px] font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {mainTalk.stats}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  {mainTalk.event}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {mainTalk.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {mainTalk.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 dark:border-white/10">
              {mainTalk.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Secondary Talks (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {secondaryTalks.map((talk, idx) => (
              <article
                key={idx}
                className="flex-1 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-5 space-y-2.5 hover:border-blue-500/30 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      {talk.date}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      {talk.stats}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {talk.title}
                  </h4>
                  
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {talk.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-black/5 dark:border-white/10">
                  {talk.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-400 px-2 py-0.5 rounded-full"
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
