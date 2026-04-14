'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  image: string;
}

const projects = [
  {
    slug: 'esow-planner',
    title: 'eSOW Planner',
    category: 'UX Case Study',
    year: '2023',
    tags: ['Enterprise Software', 'SaaS', 'Workflow Optimization'],
    description: 'An internal application streamlining the Statement of Work creation process for enterprise teams, reducing generation time by 68%.',
    image: '/images/project_esow_1775675924462.png'
  },
  {
    slug: 'sas-hrms-integration',
    title: 'SAS + HRMS Integration',
    category: 'UX Research & Design',
    year: '2023',
    tags: ['Substation Automation', 'Workforce Management', 'Information Architecture'],
    description: 'Redesigning workforce and system efficiency by integrating HRMS functionality directly into the SAS platform for field operations.',
    image: '/images/project_sas_1775675939361.png'
  },
  {
    slug: 'emulate-virtual-machine',
    title: 'EMULATE Virtual Machine',
    category: 'UI/UX Design',
    year: '2023',
    tags: ['Virtual Machine', 'Cloud Services', 'Business Infrastructure'],
    description: 'A UI/UX concept for a "Wireless Office". A seamless cloud-based virtual machine control center abstracting severe infrastructure barriers.',
    image: '/images/project_emulate_1775675955645.png'
  },
  {
    slug: 'ai-orchestration',
    title: 'AI Orchestration Engine',
    category: 'Interaction Design',
    year: '2024',
    tags: ['Generative UI', 'Automations', 'Machine Learning'],
    description: 'Conceptualizing a dynamic timeline where designers can orchestrate multiple AI agent behaviors in a unified workspace.',
    image: '/images/headshot.png' 
  },
  {
    slug: 'design-system-v2',
    title: 'Design System Architecture',
    category: 'Design Systems',
    year: '2024',
    tags: ['Glassmorphism', 'Framer Motion', 'React'],
    description: 'A comprehensive study on physics-based UI design and refractive glassmorphism for advanced modern architectures.',
    image: '/images/headshot.png' 
  }
];

const Card = ({ i, project, progress, range, targetScale }: { i: number; project: Project; progress: MotionValue<number>; range: number[]; targetScale: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Image parallax effect as the card enters the viewport
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  // The scale down effect as the next card scrolls OVER this current card
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-[90vh] flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-2vh + ${i * 20}px)` }} 
        className="relative flex flex-col items-center justify-center w-[92vw] md:w-[65vw] h-[65vh] md:h-[68vh] rounded-[2.5rem] origin-top group/card p-[1px] md:p-[1.5px] transition-all cursor-none"
      >
        {/* Link removed to prevent navigation as requested */}
        
        {/* Base static border & shadow */}
        <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 group-hover/card:ring-white/0 transition-all duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]" />

        {/* Animated spinning gradient border on Hover - More subtle */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-[0.5px]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,#3b82f6,#8b5cf6,#06b6d4,transparent)] animate-[spin_6s_linear_infinite]" />
        </div>
        
        {/* Main Card Content Container */}
        <div className="relative w-full h-full bg-[#111418] rounded-[calc(2.5rem-1px)] md:rounded-[calc(2.5rem-2px)] overflow-hidden z-10 box-border border-2 border-white/5">
          
          {/* Parallax Image Background - Darker for contrast */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
                 <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    priority={i < 2} 
                    className="object-cover opacity-30 group-hover/card:opacity-60 group-hover/card:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                    sizes="(max-width: 768px) 100vw, 65vw"
                 />
             </motion.div>
          </div>

          {/* Depth Overlay - More aggressive gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03050c] via-[#03050c]/60 to-transparent pointer-events-none" />

        {/* Card Content (Darker Glassmorphism for Accessibility) */}
        <div className="relative z-10 w-full h-full p-6 md:p-10 flex flex-col justify-end pointer-events-none">
           <div className="w-full md:max-w-xl bg-black/60 backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[1.5rem] transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
              <div className="flex items-center space-x-3 mb-3">
                 <span className="text-blue-400 font-mono text-[10px] tracking-[0.2em] uppercase">
                    Project {i + 1} &frasl;&frasl; {project.category}
                 </span>
                 <span className="text-white/40 font-mono text-xs">
                    {project.year}
                 </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-normal mb-3">
                 {project.title}
              </h3>
              <p className="text-sm md:text-base text-white/80 font-light mb-6 leading-normal">
                 {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                 <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-white/50 border border-white/10 bg-white/10 px-2.5 py-1 rounded-full text-[10px] tracking-wide">
                        {tag}
                      </span>
                    ))}
                 </div>
                 
                 {/* Discover Button - Set to Coming Soon for all */}
                 <div className="flex items-center space-x-2 bg-slate-800 text-white/40 border border-white/10 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg group/btn cursor-not-allowed">
                    <span>Coming Soon</span>
                    <svg className="w-3.5 h-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
              </div>
           </div>
        </div>

        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section className="relative w-full pb-12 bg-gradient-to-b from-[#03050c] to-[#0a1018] shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]" ref={container}>
       {/* Section Header */}
       <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="sticky top-0 h-[20vh] w-full flex items-center justify-center z-0 pointer-events-none drop-shadow-2xl"
       >
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-normal mb-4 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <TextReveal text="Selected Works" delay={0.2} />
            </h2>
          </div>
       </motion.div>

       <div className="relative w-full">
         {projects.map((project, i) => {
           const targetScale = 1 - ((projects.length - 1 - i) * 0.04);
           return (
             <Card 
                key={`p_${i}`} 
                i={i} 
                project={project} 
                progress={scrollYProgress} 
                range={[i * (1/projects.length), 1]} 
                targetScale={targetScale}
             />
           );
         })}
       </div>
    </section>
  );
}
