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
    description: 'Shared deep dives on how AI transforms product design workflows, moving from static mockups into continuous generative orchestration.',
    stats: '1,200+ Attendees',
    tags: ['AI Product Design', 'Generative UI', 'Keynote'],
    image: '/images/workshop_speak_1.jpg',
  },
  {
    date: 'Jun 2024',
    title: 'The Modern Product Designer: Bridging Design & Systems',
    event: 'Campus Tech & Design Summit',
    location: 'Hyderabad, India',
    description: 'Conducted a hands-on masterclass on design systems, component tokenization, and WCAG accessibility standards for 200+ students.',
    stats: '250+ Students',
    tags: ['Design Systems', 'Accessibility', 'Workshop'],
    image: '/images/workshop_group.jpg',
  },
  {
    date: 'Mar 2024',
    title: 'Heuristic Audits & Enterprise SaaS Workflows',
    event: 'TCS Design Guild Knowledge Share',
    location: 'Internal Global Session',
    description: 'Presented an actionable framework for auditing multi-step enterprise workflows to reduce time-to-first-value.',
    stats: '500+ Peers',
    tags: ['Enterprise UX', 'Heuristics', 'Guild Talk'],
    image: '/images/workshop_speak_2.jpg',
  },
];

export default function BenTalks() {
  const mainTalk = talks[0];
  const secondaryTalks = talks.slice(1);

  return (
    <section id="talks" className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Speaking &amp; Community
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            I do public talks &amp; workshops from time to time.
          </h2>
          <p className="max-w-2xl text-base sm:text-lg font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I speak about design systems, growth, artificial intelligence, and the craft behind building accessible products.
          </p>
        </div>

        {/* Layout: Main Featured Talk Card + Secondary List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Featured Talk (Left 7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/50 p-6 sm:p-8 space-y-6 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="relative h-[240px] sm:h-[300px] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-900">
                <Image
                  src={mainTalk.image}
                  alt={mainTalk.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-xs font-mono font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow-md">
                    {mainTalk.date} &bull; {mainTalk.location}
                  </span>
                  <span className="text-xs font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {mainTalk.stats}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  {mainTalk.event}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {mainTalk.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  {mainTalk.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/10">
              {mainTalk.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Secondary Talks (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryTalks.map((talk, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 space-y-4 hover:border-black/15 dark:hover:border-white/20 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-3">
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

                <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 dark:border-white/10">
                  {talk.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-400 px-2.5 py-0.5 rounded-full shadow-sm"
                    >
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
