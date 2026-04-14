'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CaseStudyFooter from '@/components/CaseStudyFooter';

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const formatTitle = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans overflow-x-hidden">
       {/* Stick Back Button */}
       <Link href="/" className="fixed top-8 left-8 z-50 flex items-center space-x-3 text-white/40 hover:text-white transition-all duration-300 group bg-black/20 backdrop-blur-md p-2 pr-6 rounded-full border border-white/5 hover:border-white/20">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Home</span>
       </Link>

       {/* Hero Section */}
       <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-8 border-b border-white/5 bg-gradient-to-b from-[#0a0a0b] to-[#0c0c0d]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block">Case Study Development</span>
            <h1 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tight mb-8">
              {formatTitle(params.slug)}
            </h1>
            <div className="w-16 h-px bg-white/20 mx-auto" />
          </motion.div>
       </section>
       
       {/* Main Content Area */}
       <div className="relative z-20 bg-[#0c0c0d] min-h-[60vh] rounded-t-[4rem] -mt-12 shadow-[0_-40px_100px_rgba(0,0,0,0.5)] py-32 px-8 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="space-y-12"
             >
                <div className="inline-flex items-center space-x-6 px-8 py-3 bg-white/5 rounded-full border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                   <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                   </div>
                   <span className="text-[10px] font-mono tracking-[0.4em] text-white/50 uppercase">Case Study Initializing</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-serif italic text-white font-bold tracking-tight">Coming Soon</h2>

                <p className="text-xl md:text-2xl font-light text-slate-400 leading-relaxed max-w-2xl mx-auto">
                   The comprehensive architectural deep-dive for <span className="text-white border-b border-white/20">{formatTitle(params.slug)}</span> is currently being synthesized for this experience.
                </p>

                <div className="pt-12">
                   <Link href="/" className="inline-flex items-center space-x-4 group text-white hover:text-blue-400 transition-colors">
                      <span className="text-sm font-mono uppercase tracking-widest">Return to Projects</span>
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </Link>
                </div>
             </motion.div>
          </div>
       </div>

       {/* Cross-Project Footer */}
       <CaseStudyFooter currentSlug={params.slug} />
    </div>
  );
}
