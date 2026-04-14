'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function EsowPlannerCaseStudy() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={container} className="relative bg-[#0a0a0b] text-white overflow-hidden font-sans">
       
       {/* 1. HERO COMPONENT */}
       <section className="relative h-[80vh] w-full flex flex-col items-center justify-center pt-24 px-8 z-10 box-border border-b border-white/5 bg-gradient-to-b from-[#0a0a0b] to-[#0c0c0d]">
          <Link href="/" className="fixed top-8 left-8 z-50 flex items-center space-x-3 text-white/40 hover:text-white transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Return</span>
          </Link>

          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="flex flex-col items-center text-center max-w-5xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="inline-block bg-blue-500/10 border border-blue-500/20 px-6 py-1.5 rounded-full mb-8">
               <span className="text-blue-400 font-mono text-[10px] tracking-[0.3em] uppercase">Enterprise UX Case Study</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-3xl md:text-5xl font-serif italic tracking-tight font-bold mb-8 leading-tight">
              Automating the Enterprise <br/><span className="text-blue-500">SOW Lifecycle Logic</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
              Digitizing complex workflows to eliminate architectural bottlenecks and legal risks for high-stakes engineering environments.
            </motion.p>
          </motion.div>
       </section>

       {/* MAIN CONTENT WRAPPER */}
       <div className="relative z-20 bg-[#0c0c0d] w-full rounded-t-[4rem] shadow-[0_-40px_100px_rgba(0,0,0,0.5)]">
         
         {/* META DATA ROW */}
         <section className="max-w-[1400px] mx-auto px-8 py-16 flex flex-wrap justify-center gap-12 border-b border-white/5">
            <div className="text-center">
               <span className="block text-slate-500 uppercase tracking-widest text-xs font-mono mb-2">Role</span>
               <span className="text-white text-xl font-serif">Lead UX Designer</span>
            </div>
            <div className="text-center">
               <span className="block text-slate-500 uppercase tracking-widest text-xs font-mono mb-2">Domain</span>
               <span className="text-white text-xl font-serif">Enterprise SaaS</span>
            </div>
            <div className="text-center">
               <span className="block text-slate-500 uppercase tracking-widest text-xs font-mono mb-2">Duration</span>
               <span className="text-white text-xl font-serif">4 Months</span>
            </div>
            <div className="text-center">
               <span className="block text-slate-500 uppercase tracking-widest text-xs font-mono mb-2">Platform</span>
               <span className="text-white text-xl font-serif">Desktop / Web App</span>
            </div>
         </section>

         {/* PROBLEM TO OPPORTUNITY & INSIGHTS (Behance Section 1 & 2) */}
         <section className="max-w-[1400px] mx-auto px-8 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-4">Discovery</h3>
                  <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-12">From Problem to Opportunity</h2>
                  
                  <div className="space-y-6">
                     {/* HMW 1 */}
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="text-red-400 text-xs font-mono uppercase tracking-widest block mb-2">Problem: Time-consuming creation process (4-6 hours)</span>
                        <h4 className="text-xl text-white font-serif leading-snug"><span className="text-blue-500 font-bold mr-2">HMW</span> Streamline the SOW creation process to reduce time and cognitive load?</h4>
                     </div>
                     {/* HMW 2 */}
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="text-red-400 text-xs font-mono uppercase tracking-widest block mb-2">Problem: No visibility into approval workflows</span>
                        <h4 className="text-xl text-white font-serif leading-snug"><span className="text-blue-500 font-bold mr-2">HMW</span> Provide real-time visibility into approval workflows and automate status updates?</h4>
                     </div>
                     {/* HMW 3 */}
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="text-red-400 text-xs font-mono uppercase tracking-widest block mb-2">Problem: Manual vendor comparison via spreadsheets</span>
                        <h4 className="text-xl text-white font-serif leading-snug"><span className="text-blue-500 font-bold mr-2">HMW</span> Enable side-by-side vendor comparison to facilitate data-driven engineering?</h4>
                     </div>
                  </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-4">Research Synthesis</h3>
                  <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-12">Key Themes & Insights</h2>
                  
                  <div className="space-y-6">
                     <div className="bg-blue-900/20 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 text-blue-500/20">👁️</div>
                        <h4 className="text-2xl font-bold text-white mb-2">Visibility & Transparency</h4>
                        <p className="text-slate-400 font-light mb-6">Lack of transparency creates extreme project anxiety natively.</p>
                        <span className="inline-block bg-blue-500 text-xs text-white font-mono uppercase px-3 py-1 rounded">82% cited as top frustration</span>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-3xl p-8 relative">
                           <h4 className="text-xl font-bold text-white mb-2">Workflow Efficiency</h4>
                           <span className="text-slate-400 text-sm block mt-4">Avg 3.5 emails sent per SOW just to check status</span>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 rounded-3xl p-8 relative">
                           <h4 className="text-xl font-bold text-white mb-2">Vendor Comparison</h4>
                           <span className="text-slate-400 text-sm block mt-4">100% relied heavily on external manual spreadsheets.</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* UNDERSTANDING THE USER & PERSONAS */}
         <section className="bg-[#0a0a0a] border-y border-white/5 py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-8">
               <div className="text-center mb-16">
                 <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">User Research & Analysis</h3>
                 <h2 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tight">Understanding the User</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                  {/* Persona 1 */}
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#050505] border border-white/10 rounded-[2rem] p-8 md:p-10 relative">
                     <div className="absolute top-8 right-8 text-xs font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">Primary User</div>
                     <div className="flex items-center space-x-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">👩🏻‍💼</div>
                        <div>
                           <h4 className="text-3xl font-serif font-bold text-white">Sarah Chen</h4>
                           <span className="text-slate-400 font-light">Project Manager • &quot;The Overwhelmed Planner&quot;</span>
                        </div>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                        <p className="text-lg text-slate-300 italic">&quot;I spend more time fighting the tool than actually planning the work. I never know where my SOWs are in approvals.&quot;</p>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <h5 className="text-xs text-red-400 font-mono uppercase tracking-widest mb-4">Frustrations</h5>
                           <ul className="space-y-3 text-sm text-slate-300 font-light">
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> Redundant data entry</li>
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> Lack of visibility</li>
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> Fear of system errors</li>
                           </ul>
                        </div>
                        <div>
                           <h5 className="text-xs text-green-400 font-mono uppercase tracking-widest mb-4">Goals</h5>
                           <ul className="space-y-3 text-sm text-slate-300 font-light">
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Create SOWs quickly</li>
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Track status globally</li>
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Compare vendors easily</li>
                           </ul>
                        </div>
                     </div>
                  </motion.div>

                  {/* Persona 2 */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#050505] border border-white/10 rounded-[2rem] p-8 md:p-10 relative">
                     <div className="absolute top-8 right-8 text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full">Approver</div>
                     <div className="flex items-center space-x-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">👨🏽‍💼</div>
                        <div>
                           <h4 className="text-3xl font-serif font-bold text-white">Marcus</h4>
                           <span className="text-slate-400 font-light">Product Specialist • &quot;The Blind Approver&quot;</span>
                        </div>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
                        <p className="text-lg text-slate-300 italic">&quot;I need to see the full picture quickly to make the right decision. Often I&apos;m missing context when reviewing SOWs.&quot;</p>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <h5 className="text-xs text-red-400 font-mono uppercase tracking-widest mb-4">Frustrations</h5>
                           <ul className="space-y-3 text-sm text-slate-300 font-light">
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> Communication bottlenecks</li>
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> Difficult to prioritize queue</li>
                              <li className="flex items-center"><span className="text-red-500 mr-2">⊗</span> No mobile access globally</li>
                           </ul>
                        </div>
                        <div>
                           <h5 className="text-xs text-green-400 font-mono uppercase tracking-widest mb-4">Goals</h5>
                           <ul className="space-y-3 text-sm text-slate-300 font-light">
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Efficient review process</li>
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Ensure strict compliance</li>
                              <li className="flex items-center"><span className="text-green-500 mr-2">⊕</span> Provide quick feedback</li>
                           </ul>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Current State Journey TIMELINE */}
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h3 className="text-2xl font-serif font-bold text-white mb-12 text-center">Current State Journey & Pain Points</h3>
                  <div className="w-full flex items-center justify-between relative px-4 md:px-0">
                     <div className="absolute top-[20px] left-8 right-8 h-1 bg-white/10 -z-10 hidden md:block" />
                     
                     {[ 
                       { step: 'Initiate Request', desc: 'Multiple entry paths cause confusion', friction: 'HIGH FRICTION', color: 'text-red-400 bg-red-400/10' },
                       { step: 'Enter Details', desc: 'Unclear requirements & manual guidance', friction: 'HIGH FRICTION', color: 'text-red-400 bg-red-400/10' },
                       { step: 'Vendor Info', desc: 'Manual array, no comparison tools', friction: 'HIGH FRICTION', color: 'text-red-400 bg-red-400/10' },
                       { step: 'Wait & Chase', desc: 'No visibility, manual email follow-up', friction: 'VERY HIGH', color: 'text-orange-400 bg-orange-400/10' },
                       { step: 'Final Approval', desc: 'Cycles strictly back into severe revisions', friction: 'MED FRICTION', color: 'text-yellow-400 bg-yellow-400/10' }
                     ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center w-48 relative">
                           <div className="w-10 h-10 bg-[#121212] border-2 border-white/20 rounded-full mb-6 relative z-10 flex items-center justify-center text-blue-500">•</div>
                           <h4 className="text-white font-bold text-sm mb-2">{item.step}</h4>
                           <p className="text-slate-400 text-xs font-light px-2 mb-4 h-10">{item.desc}</p>
                           <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border border-transparent ${item.color}`}>{item.friction}</span>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </section>
         
         {/* DESIGN PROCESS & STRATEGY */}
         <section className="py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-8 text-center">
               <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Methodology</h3>
               <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-6">Design Process & Strategy</h2>
               <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto mb-20">An iterative, user-centered approach moving rigorously from broad discovery directly to validated high-fidelity solutions.</p>
               
               <div className="flex flex-wrap justify-center gap-12 md:gap-16">
                  {[
                     { title: "Discover", icon: "🔍", sub: ["12 Stakeholder Interviews", "Empathy Mapping", "Journey Map"] },
                     { title: "Define", icon: "🎯", sub: ["Problem Statements", "HMW Framework", "Affinity Mapping"] },
                     { title: "Ideate", icon: "💡", sub: ["Workshops", "Dot Voting", "IA Restructuring"] },
                     { title: "Design", icon: "🖌️", sub: ["Low-Fi Wireframes", "High-Fi Mockups", "Design System"] },
                     { title: "Validate", icon: "✅", sub: ["Usability Testing", "Design Critiques", "Iterative Refinement"] }
                  ].map((phase, i) => (
                     <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center w-40">
                        <div className="w-20 h-20 rounded-full border border-blue-500/30 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                           {phase.icon}
                        </div>
                        <h4 className="text-white font-bold font-serif text-xl mb-4">{phase.title}</h4>
                        <div className="space-y-2 text-xs text-slate-400 font-light">
                           {phase.sub.map((s, idx) => <span key={idx} className="block border border-white/5 bg-white/[0.02] py-1 px-2 rounded-full">{s}</span>)}
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* BEFORE & AFTER */}
         <section className="bg-blue-900/10 border-y border-blue-500/20 py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-8 relative">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 bg-[#050505] p-8 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
                  
                  <div className="absolute inset-x-0 inset-y-0 w-[1px] bg-white/10 left-1/2 hidden lg:block" />

                  {/* LEGACY */}
                  <div>
                     <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Legacy System</h3>
                     <h2 className="text-4xl font-serif font-bold text-white mb-10">Before</h2>
                     <ul className="space-y-8">
                        <li className="flex items-start">
                           <span className="text-red-500 mr-4 mt-1">⊗</span>
                           <div>
                              <strong className="text-slate-200 block mb-1">No Dashboard</strong>
                              <span className="text-slate-400 text-sm font-light">Users randomly landed on a blank table with zero context or holistic status overview.</span>
                           </div>
                        </li>
                        <li className="flex items-start">
                           <span className="text-red-500 mr-4 mt-1">⊗</span>
                           <div>
                              <strong className="text-slate-200 block mb-1">Unclear Navigation</strong>
                              <span className="text-slate-400 text-sm font-light">Hidden menus and deeply nested hierarchy continually caused extreme confusion.</span>
                           </div>
                        </li>
                        <li className="flex items-start">
                           <span className="text-red-500 mr-4 mt-1">⊗</span>
                           <div>
                              <strong className="text-slate-200 block mb-1">Manual Document Work</strong>
                              <span className="text-slate-400 text-sm font-light">No comparison tools internally forced users rigorously to external corporate spreadsheets.</span>
                           </div>
                        </li>
                     </ul>
                     <div className="flex gap-4 mt-10">
                        <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded font-mono uppercase tracking-widest">High Load</span>
                        <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded font-mono uppercase tracking-widest">Zero Visibility</span>
                     </div>
                  </div>

                  {/* SOLUTION */}
                  <div>
                     <h3 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-4">Redesigned Platform</h3>
                     <h2 className="text-4xl font-serif font-bold text-white mb-10">After: The Solution</h2>
                     <ul className="space-y-8">
                        <li className="flex items-start">
                           <span className="text-green-500 mr-4 mt-1">⊕</span>
                           <div>
                              <strong className="text-white block mb-1">Actionable Dashboard</strong>
                              <span className="text-slate-400 text-sm font-light">Immediate architectural visibility into multi-level approvals and priority tasks.</span>
                           </div>
                        </li>
                        <li className="flex items-start">
                           <span className="text-green-500 mr-4 mt-1">⊕</span>
                           <div>
                              <strong className="text-white block mb-1">Smart Navigation</strong>
                              <span className="text-slate-400 text-sm font-light">Context-aware sidebar routing completely visible permanently.</span>
                           </div>
                        </li>
                        <li className="flex items-start">
                           <span className="text-green-500 mr-4 mt-1">⊕</span>
                           <div>
                              <strong className="text-white block mb-1">Guided Workflows & Vendor Matrix</strong>
                              <span className="text-slate-400 text-sm font-light">Step-by-step wizard radically prevents errors with integrated vendor comparison internally.</span>
                           </div>
                        </li>
                     </ul>
                     <div className="flex gap-4 mt-10">
                        <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded font-mono uppercase tracking-widest">Real-time</span>
                        <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded font-mono uppercase tracking-widest">Analytics Ready</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* VISUAL DESIGN ARCHITECTURE */}
         <section className="py-24 md:py-32 bg-[#0a0a0b] border-y border-white/5">
            <div className="max-w-[1400px] mx-auto px-8">
               <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight mb-24 text-center">Visual Design Architecture</h2>
               
               <div className="space-y-32">
                  {/* Visual 1 */}
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                     <h3 className="text-2xl font-serif font-bold text-white mb-6">User Interface & Design Language</h3>
                     <p className="text-lg text-slate-400 font-light max-w-3xl mb-12">Establishing a clean, minimalist aesthetic optimized for deep focus and operational accuracy within high-stakes project management environments.</p>
                     <div className="w-full aspect-video md:aspect-[21/9] bg-[#121214] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
                        <Image 
                          src="/images/esow-visual-1.jpg" 
                          alt="Visual Design Language" 
                          fill 
                          className="object-cover" 
                        />
                     </div>
                  </motion.div>

                  {/* Visual 2 */}
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                     <h3 className="text-2xl font-serif font-bold text-white mb-6">Centralized Project Dashboard</h3>
                     <p className="text-lg text-slate-400 font-light max-w-3xl mb-12">A unified hub providing real-time visibility into complex SOW lifecycles, reducing cognitive load and simplifying cross-team approvals.</p>
                     <div className="w-full aspect-video md:aspect-[21/9] bg-[#121214] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
                        <Image 
                          src="/images/esow-visual-2.png" 
                          alt="Project Dashboard Visualization" 
                          fill 
                          className="object-cover" 
                        />
                     </div>
                  </motion.div>

                  {/* Visual 3 */}
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                     <h3 className="text-2xl font-serif font-bold text-white mb-6">Data Architecture & Analytics</h3>
                     <p className="text-lg text-slate-400 font-light max-w-3xl mb-12">Intelligent data modeling that transforms raw operational metrics into actionable insights for corporate engineering teams.</p>
                     <div className="w-full aspect-video md:aspect-[21/9] bg-[#121214] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
                        <Image 
                          src="/images/esow-visual-3.png" 
                          alt="Data Visualization" 
                          fill 
                          className="object-cover" 
                        />
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>
         
         {/* KPI & RESULTS (Reused Section structure from previous code with updated Behance precise stats) */}
         <section className="bg-[#050505] border-t border-white/5 py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-8 text-center">
               <h3 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-4">Impact & Results</h3>
               <h2 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tight mb-16">Metrics Achieved</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
                  <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-12 relative overflow-hidden">
                     <span className="text-5xl font-serif text-white font-bold block mb-4">68%</span>
                     <p className="text-blue-400 font-mono text-sm tracking-widest uppercase relative z-10">Faster Creation</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-12 relative overflow-hidden">
                     <span className="text-5xl font-serif text-white font-bold block mb-4">35%</span>
                     <p className="text-purple-400 font-mono text-sm tracking-widest uppercase relative z-10">Error Rate Drop</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-12 relative overflow-hidden">
                     <span className="text-5xl font-serif text-white font-bold block mb-4">100%</span>
                     <p className="text-green-400 font-mono text-sm tracking-widest uppercase relative z-10">Platform Adoption</p>
                  </div>
               </div>

               <p className="mt-16 text-xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed border-t border-white/10 pt-16">
                  &quot;This project fundamentally solved complex enterprise-level communication bottlenecks through intuitive system feedback, standardized configurations, and real-time dashboard data modeling.&quot;
               </p>
            </div>
         </section>

       </div>
    </div>
  );
}
