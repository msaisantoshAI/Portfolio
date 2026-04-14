'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const otherProjects = [
  {
    title: "eSOW Planner",
    slug: "esow-planner",
    image: "/images/project_esow_1775675924462.png",
    category: "Enterprise UX"
  },
  {
    title: "SAS + HRMS Integration",
    slug: "sas-hrms-integration",
    image: "/images/project_sas_1775675939361.png",
    category: "UX Research"
  },
  {
    title: "Future of Fintech",
    slug: "fintech-future",
    image: "/images/project3.jpg",
    category: "Fintech"
  },
  {
    title: "Smart Home OS",
    slug: "smart-home",
    image: "/images/project4.jpg",
    category: "IoT / UX"
  }
];

export default function CaseStudyFooter({ currentSlug }: { currentSlug: string }) {
  const filteredProjects = otherProjects.filter(p => p.slug !== currentSlug);

  return (
    <section className="py-32 bg-[#0a0a0b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-serif font-bold text-white mb-16 text-center italic">Explore More</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 border border-white/10 group-hover:border-white/30 transition-colors bg-[#121214]">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        {project.slug === 'esow-planner' ? 'Available Now' : 'Development'}
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className={`px-6 py-2 ${project.slug === 'esow-planner' ? 'bg-white text-black' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'} text-[10px] font-bold uppercase tracking-widest rounded-full transform scale-90 group-hover:scale-100 transition-transform`}>
                        {project.slug === 'esow-planner' ? 'Explore Case' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h3 className="text-xl font-serif font-bold text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/" className="inline-flex items-center space-x-4 text-white/40 hover:text-white transition-colors group">
             <span className="w-12 h-px bg-white/10 group-hover:bg-white/40 transition-colors" />
             <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Back to main portfolio</span>
             <span className="w-12 h-px bg-white/10 group-hover:bg-white/40 transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}
