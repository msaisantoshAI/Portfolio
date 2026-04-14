'use client';

import React from 'react';
import TextReveal from '@/components/TextReveal';
import GlowCard from '@/components/GlowCard';

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-8 pt-40 pb-24 min-h-screen">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Bento Image Matrix */}
        <div className="md:col-span-4 flex flex-col gap-8">
          <GlowCard className="md:sticky md:top-40 h-[60vh] md:h-auto md:aspect-[3/4]">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-200 dark:from-[#121212] via-transparent to-transparent flex items-end p-8 z-10 transition-all duration-500 opacity-80 group-hover:opacity-100">
             <div className="space-y-1">
               <p className="text-slate-900 dark:text-white font-medium text-lg tracking-wide">Sai Santosh</p>
               <p className="text-slate-600 dark:text-white/50 text-sm">Product Designer</p>
             </div>
          </div>
          <div className="absolute inset-0 bg-stone-100 dark:bg-[#1a1a1a] flex items-center justify-center bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('/images/about-podium.jpg')" }}>
             {/* The image acts as the absolute background element */}
          </div>
          </GlowCard>
        </div>

        {/* Right Side: Bento Content Feed */}
        <div className="md:col-span-8 flex flex-col gap-8">
          
          {/* Main Story Bento Block */}
          <GlowCard className="h-full z-10">
            <div className="p-8 md:p-12">
              <h1 className="text-xl md:text-2xl font-bold tracking-normal text-slate-900 dark:text-white mb-6 underline decoration-blue-500/20 underline-offset-8">
                <TextReveal text="My Story" delay={0.1} />
              </h1>
              
              <div className="space-y-4 text-slate-700 dark:text-white/80 text-sm md:text-base leading-normal font-light">
                <p className="border-l-2 border-blue-500 pl-4 py-1 italic text-slate-800 dark:text-white">
                  I bridge the gap between AI capability and human understanding.
                </p>
                <p>
                  I focus on making AI tools intuitive and practical. Many AI agents fail because users feel overwhelmed. I design interactions that simplify complex outputs, guide users naturally, and build trust.
                </p>
                <p>
                  By working directly with AI assistants and orchestration tools, I ensure designs are aligned with real-world technical capabilities. I&apos;m not just designing interfaces—I&apos;m designing the future of human-AI collaboration.
                </p>
              </div>
            </div>
          </GlowCard>

          {/* Aspirations Bento Block */}
          <GlowCard className="h-full z-10">
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
             <h2 className="text-xl font-bold tracking-normal text-slate-900 dark:text-white mb-4">
                <TextReveal text="Aspiration" delay={0.2} />
             </h2>
             <p className="text-slate-600 dark:text-white/70 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed italic">
                Shaping my path from Figma Design to designing AI experiences that are intuitive, human-friendly, and truly usable.
             </p>
             <div className="mt-8">
                <span className="text-blue-400 font-mono tracking-widest text-[10px] uppercase bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20">
                   AI Integration, Automation & Orchestration Designer
                </span>
             </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* --- REIMAGINED GALLERY: Masonry Proportional Grid --- */}
      <section className="mt-24 w-full mb-32">
         <div className="mb-12 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-normal">
               <TextReveal text="Workshops & Creative Canvas" delay={0.1} />
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light italic border-l border-blue-500/30 pl-6">
               A glimpse into the workshops I’ve conducted at various campuses, exploring the future of UX design and human-AI systems, alongside a collection of my personal artworks and canvas meditations.
            </p>
            <div className="w-12 h-0.5 bg-blue-500/50 mt-6 rounded-full" />
         </div>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            
            {/* 01: Speaking Photo (Vertical/Tall) */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/workshop_speak_1.jpg" alt="Humanizing AI" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="p-6 bg-[#111] border-t border-white/5">
                      <h3 className="text-sm font-bold text-white">Humanizing AI</h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">Main Stage session</p>
                  </div>
               </GlowCard>
            </div>

            {/* 02: Whiteboard Art (Contain/Fits) */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group bg-[#0a0a0a]">
                  <img src="/images/gallery_whiteboard.jpg" alt="Whiteboard Art" className="w-full h-auto object-contain p-2" />
                  <div className="p-4 bg-[#111] border-t border-white/5 text-center">
                      <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Process Sketching</span>
                  </div>
               </GlowCard>
            </div>

            {/* 03: Podium Speak (Vertical) */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/podium_speak.jpg" alt="Keynote" className="w-full h-auto object-cover" />
               </GlowCard>
            </div>

            {/* 04: Krishna Painting (Contain/Fits) */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group bg-[#0a0a0a]">
                  <img src="/images/gallery_painting.jpg" alt="Painting" className="w-full h-auto object-contain p-2" />
                  <div className="p-4 bg-[#111] border-t border-white/5 text-center">
                      <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Canvas Meditation</span>
                  </div>
               </GlowCard>
            </div>

            {/* 05: Group Collage */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/workshop_collage.jpg" alt="Collage" className="w-full h-auto object-cover" />
               </GlowCard>
            </div>

            {/* 06: Workshop Side View */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/workshop_speak_2.jpg" alt="Workshop Session" className="w-full h-auto object-cover" />
               </GlowCard>
            </div>

            {/* 07: Mural Art (Wide proportional) */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/mural_art.jpg" alt="Mural Art" className="w-full h-auto object-cover" />
               </GlowCard>
            </div>

            {/* 08: Original Batch Photo */}
            <div className="break-inside-avoid">
               <GlowCard className="relative overflow-hidden group">
                  <img src="/images/workshop_group.jpg" alt="Batch 2024" className="w-full h-auto object-cover" />
               </GlowCard>
            </div>

         </div>
      </section>

    </main>
  );
}
