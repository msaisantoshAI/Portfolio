'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QueryModal from './QueryModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/saisantoshmadhari0711/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/sai_santosh_madhari/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: 'mailto:Saisantoshmadhari@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#03050c] border-t border-black/5 dark:border-white/5 py-32 relative overflow-hidden transition-colors duration-500">
      {/* Cinematic Pinterest Native Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-40">
        <video 
           autoPlay 
           loop 
           muted 
           playsInline
           preload="none"
           className="w-full h-full object-cover"
        >
           <source src="/images/footer-mp4.mp4" type="video/mp4" />
        </video>
        {/* Aggressive vignette routing to force gradient matching */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/30 to-slate-50 dark:from-[#03050c] dark:via-[#03050c]/30 dark:to-[#03050c] opacity-90" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center space-y-8 mb-32"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-normal text-slate-900 dark:text-white/90">
            Let&apos;s build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 italic font-light drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">something interesting.</span>
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block mt-12 py-4 px-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold tracking-wide rounded-full hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500 hover:scale-105 active:scale-95"
          >
            Start a Conversation
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-12 border-t border-black/5 dark:border-white/5">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-8">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-all transform hover:scale-110 active:scale-90"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-slate-400 dark:text-white/20 text-[10px] tracking-[0.3em] uppercase">Based in India • Open to Global Roles</p>
          </div>
          
          <div className="flex flex-col md:items-end space-y-4">
            <p className="text-slate-400 dark:text-white/30 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} — Sai Santosh Madhari.
            </p>
          </div>
        </div>
      </div>

      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}
