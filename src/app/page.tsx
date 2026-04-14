import React from 'react';
import Link from 'next/link';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';
import TextReveal from '@/components/TextReveal';
import AnimatedQuote from '@/components/AnimatedQuote';
import MyApproach from '@/components/MyApproach';

import Experience from '@/components/Experience';
import Tools from '@/components/Tools';
import AiStack from '@/components/AiStack';
import BentoSkills from '@/components/BentoSkills';
import GlowCard from '@/components/GlowCard';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip">
      <div className="relative">
        <ScrollyCanvas />
      </div>

      <Projects />
      <Experience />
      <AnimatedQuote />
      <MyApproach />
      
      {/* Structural Master Bento Wrapper */}
      <section className="pb-8 pt-4 px-8 max-w-[1400px] mx-auto w-full">
         <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-normal text-slate-900 dark:text-white mb-6">
               <TextReveal text="The Arsenal" delay={0.2} />
            </h2>
            <div className="w-16 h-1 bg-black/10 dark:bg-white/20 rounded-full" />
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 flex flex-col h-full">
               {/* Tools */}
               <GlowCard className="h-full">
                 <Tools />
               </GlowCard>
            </div>
            
            <div className="lg:col-span-6 flex flex-col h-full">
               {/* Ai Stack */}
               <GlowCard className="h-full">
                 <AiStack />
               </GlowCard>
            </div>

            <div className="lg:col-span-12">
               {/* Horizontal bottom block: Skills */}
               <GlowCard>
                 <BentoSkills />
               </GlowCard>
            </div>
         </div>
      </section>

      {/* Quick About Me Summary at the Bottom */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto w-full">
         <GlowCard>
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-normal text-slate-900 dark:text-white">
                     <TextReveal text="Learning the future of AI" delay={0.1} />
                  </h2>
                  <div className="w-16 h-1 bg-blue-500 rounded-full" />
                  <div className="space-y-4 text-slate-600 dark:text-white/60 text-base md:text-lg leading-normal font-light">
                     <p>
                        I am an aspiring **AI Product Designer** who is currently deep-diving into the world of AI tools, integration, and orchestration. I believe the best way to design the future is to actively build it.
                     </p>
                     <p>
                        While working on various AI-driven projects, I am constantly learning how to bridge technical complexity with human intuition, ensuring that as AI evolves, it remains accessible, seamless, and truly valuable.
                     </p>
                  </div>
                  <div className="pt-6">
                     <Link 
                        href="/about" 
                        className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors"
                     >
                        <span>Learn more about my journey</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                     </Link>
                  </div>
               </div>
               <div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden border border-white/5">
                  <img 
                     src="/images/about-podium.jpg" 
                     alt="Sai Santosh at Workshop" 
                     className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-105"
                  />
               </div>
            </div>
         </GlowCard>
      </section>
      
    </main>
  );
}
