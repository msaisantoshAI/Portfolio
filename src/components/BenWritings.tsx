'use client';

import React from 'react';

interface Article {
  title: string;
  excerpt: string;
  topic: string;
  readTime: string;
  tags: string[];
  gradientLight: string;
  gradientDark: string;
  link: string;
}

const articles: Article[] = [
  {
    title: 'Designing with Autonomous AI Agents: Mental Models for 2025',
    excerpt: 'How multi-agent feedback loops and generative UI are redefining the traditional wireframe-to-code paradigm.',
    topic: 'AI Product Design',
    readTime: '6 min read',
    tags: ['Generative UI', 'Agentic UX'],
    gradientLight: 'from-blue-100 to-indigo-100',
    gradientDark: 'from-blue-600/30 to-indigo-900/40',
    link: '#',
  },
  {
    title: 'Designing User Onboarding for Complex Enterprise SaaS',
    excerpt: 'Lessons learned from cutting time-to-first-value and reducing cognitive overload in high-density workflows.',
    topic: 'Enterprise UX',
    readTime: '8 min read',
    tags: ['Enterprise SaaS', 'Heuristic Audits'],
    gradientLight: 'from-cyan-100 to-blue-100',
    gradientDark: 'from-cyan-600/30 to-blue-900/40',
    link: '#',
  },
  {
    title: 'WCAG 2.2 Contrast in Modern Dark Mode & Glassmorphism',
    excerpt: 'Practical engineering and design heuristics to guarantee accessibility without sacrificing visual elegance.',
    topic: 'Accessibility',
    readTime: '5 min read',
    tags: ['Accessibility', 'Design Systems'],
    gradientLight: 'from-purple-100 to-pink-100',
    gradientDark: 'from-purple-600/30 to-pink-900/40',
    link: '#',
  },
  {
    title: 'From Fine Arts to UX Architecture: The Power of Spatial Layouts',
    excerpt: 'Why compositional hierarchy, whitespace tension, and color harmony make or break enterprise software utility.',
    topic: 'Visual Thinking',
    readTime: '7 min read',
    tags: ['Information Architecture', 'HCI'],
    gradientLight: 'from-amber-100 to-orange-100',
    gradientDark: 'from-amber-600/30 to-orange-900/40',
    link: '#',
  },
];

export default function BenWritings() {
  return (
    <section className="px-5 py-12 md:px-8 lg:px-12 max-w-[1240px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-7 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Articles &amp; Case Notes
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              I write. Quite a lot.
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Thoughts on UX, Systems &amp; AI
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="group relative rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/40 p-6 sm:p-8 hover:border-black/15 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              {/* Card visual banner header */}
              <div className={`w-full h-28 rounded-2xl bg-gradient-to-br ${art.gradientLight} dark:${art.gradientDark} border border-black/5 dark:border-white/10 mb-6 p-4 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-mono font-semibold text-zinc-800 dark:text-white bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                    {art.topic}
                  </span>
                  <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    {art.readTime}
                  </span>
                </div>
                <div className="z-10 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  Essay &frasl;&frasl; 0{idx + 1}
                </div>
              </div>

              {/* Title & Excerpt (Hierarchy: Title -> Short description -> Topic -> Read article) */}
              <div className="space-y-3 mb-6">
                <h3 className="card-heading text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="body-copy text-zinc-600 dark:text-zinc-400">
                  {art.excerpt}
                </p>
              </div>

              {/* Tag Chips & Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-400 px-2.5 py-0.5 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={art.link}
                  className="touch-target inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Read essay &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
