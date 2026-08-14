'use client';

import React from 'react';

interface Article {
  title: string;
  excerpt: string;
  readCount: string;
  tags: string[];
  gradient: string;
  link: string;
}

const articles: Article[] = [
  {
    title: 'Designing with Autonomous AI Agents: Mental Models for 2025',
    excerpt: 'How multi-agent feedback loops and generative UI are redefining the traditional wireframe-to-code paradigm.',
    readCount: '58k Reads',
    tags: ['AI Product Design', 'Generative UI'],
    gradient: 'from-blue-600/30 to-indigo-900/40',
    link: '#',
  },
  {
    title: 'Designing User Onboarding for Complex Enterprise SaaS',
    excerpt: 'Lessons learned from cutting time-to-first-value and reducing cognitive overload in high-density workflows.',
    readCount: '42k Reads',
    tags: ['Growth Design', 'Enterprise UX'],
    gradient: 'from-cyan-600/30 to-blue-900/40',
    link: '#',
  },
  {
    title: 'WCAG 2.1 Contrast in Modern Dark Mode & Glassmorphism',
    excerpt: 'Practical engineering and design heuristics to guarantee accessibility without sacrificing visual elegance.',
    readCount: '34k Reads',
    tags: ['Accessibility', 'Design Systems'],
    gradient: 'from-purple-600/30 to-pink-900/40',
    link: '#',
  },
  {
    title: 'From Fine Arts to UX Architecture: The Power of Spatial Layouts',
    excerpt: 'Why compositional hierarchy, whitespace tension, and color harmony make or break enterprise software utility.',
    readCount: '29k Reads',
    tags: ['Visual Design', 'HCI'],
    gradient: 'from-amber-600/30 to-orange-900/40',
    link: '#',
  },
];

export default function BenWritings() {
  return (
    <section className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-zinc-900/80 border border-white/10 p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-400 font-semibold">
              Articles &amp; Case Notes
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              I write. Quite a lot.
            </h2>
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400">
              Published on Medium &amp; Substack
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              {/* Card visual banner header */}
              <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${art.gradient} border border-white/10 mb-6 p-4 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {art.readCount}
                  </span>
                  <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="z-10 font-mono text-[10px] text-white/60 uppercase tracking-wider">
                  UX Case Essay // 0{idx + 1}
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {art.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono bg-white/5 border border-white/10 text-zinc-400 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
