'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Artwork {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const artworks: Artwork[] = [
  {
    id: 'fine-art',
    title: 'Fine Art & Visual Thinking',
    category: 'Fine Arts · Oil on Canvas',
    image: '/images/gallery_painting.jpg',
    description: 'Explorations in light, texture, spatial depth, and human emotion through traditional fine arts.'
  },
  {
    id: 'mural',
    title: 'Large-Scale Spatial Mural',
    category: 'Spatial Design · Environmental Art',
    image: '/images/mural_art.jpg',
    description: 'Environmental mural composition designed to energize workspace collaboration and creative flow.'
  },
  {
    id: 'whiteboard',
    title: 'Visual Architecture & Mapping',
    category: 'Visual Thinking · UX Architecture',
    image: '/images/gallery_whiteboard.jpg',
    description: 'Low-latency whiteboard thinking mapping complex multi-state systems and user journey nodes.'
  },
  {
    id: 'workshop-collage',
    title: 'Design Thinking Masterclass',
    category: 'Workshops · Mentorship',
    image: '/images/workshop_collage.jpg',
    description: 'Leading hands-on design sprints, heuristic exercises, and product strategy sessions.'
  },
  {
    id: 'workshop-group',
    title: 'Collaborative Design Sprint',
    category: 'Community · Design Leadership',
    image: '/images/workshop_group.jpg',
    description: 'Cross-functional design workshops facilitating ideation between engineers, product managers, and designers.'
  },
  {
    id: 'keynote',
    title: 'AI & UX Design Keynote',
    category: 'Public Speaking · AI Interaction',
    image: '/images/workshop_speak_1.jpg',
    description: 'Keynote presentation on human-in-the-loop AI interfaces and mental models for next-gen SaaS.'
  },
  {
    id: 'gallery',
    title: 'Fine Arts Studio & Exhibition',
    category: 'Exhibitions · Studio Art',
    image: '/images/gallery-main.jpg',
    description: 'Studio curation exploring composition, color contrast theory, and aesthetic balance.'
  },
  {
    id: 'podium',
    title: 'Product Design Leadership Talk',
    category: 'Conferences · Industry Talk',
    image: '/images/about-podium.jpg',
    description: 'Sharing insights on enterprise UX scaling, design systems, and design career growth.'
  },
];

export default function BenWritings() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <section id="drawings" className="px-4 py-8 sm:py-10 sm:px-6 md:px-8 max-w-[1320px] mx-auto w-full font-sans">
      <div className="rounded-[28px] bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 shadow-sm dark:shadow-md backdrop-blur-xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-2">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Additional Works
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              I Draw. Quite a lot.
            </h2>
          </div>
          <div>
            <span className="caption-meta font-mono text-zinc-500 dark:text-zinc-400">
              Fine Arts &bull; Murals &bull; Workshop Sessions
            </span>
          </div>
        </div>

        {/* Artworks & Workshop Grid Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArtwork(art)}
              className="group cursor-pointer rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-50/80 dark:bg-black/30 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] bg-zinc-900 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] font-mono text-white bg-black/60 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    Click to view full ↗
                  </span>
                </div>
              </div>

              {/* Title & Tag */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block">
                  {art.category}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Popup Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0b0f1a] border border-white/20 shadow-2xl overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-base transition-all cursor-pointer"
                aria-label="Close image popup"
              >
                ✕
              </button>

              {/* Large Image View */}
              <div className="relative w-full h-[340px] sm:h-[450px] bg-black">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Description Footer */}
              <div className="p-5 sm:p-6 bg-[#080d18] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                    {selectedArtwork.category}
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {selectedArtwork.title}
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArtwork(null)}
                  className="touch-target px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-all shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
