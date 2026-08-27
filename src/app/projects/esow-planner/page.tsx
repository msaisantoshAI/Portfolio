'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Table of Contents Section Definitions for Scrollspy & Sticky Left Sidebar
const SECTIONS = [
  { id: 'overview', label: '01 · Overview' },
  { id: 'situation', label: '02 · Situation (S)' },
  { id: 'task', label: '03 · Task & Mandate (T)' },
  { id: 'discovery', label: '04 · Discovery & Research' },
  { id: 'define', label: '05 · Define & Personas' },
  { id: 'strategy', label: '06 · Strategy & Roadmap' },
  { id: 'ia', label: '07 · Information Architecture' },
  { id: 'ui-design', label: '08 · UI Design & Decisions' },
  { id: 'tradeoffs', label: '09 · What Didn’t Make the Cut' },
  { id: 'validation', label: '10 · Usability Validation' },
  { id: 'impact', label: '11 · Measurable Impact (R)' },
  { id: 'reflection', label: '12 · Reflection & Learnings' },
];

export default function EsowPlannerCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#03050C] text-zinc-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Top Fixed Header with Back Link & Project Meta */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/#work"
          className="touch-target inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-900 dark:text-white font-medium text-xs transition-all hover:scale-105"
        >
          <span>&larr;</span>
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider hidden sm:inline">
            Enterprise Product Design Case Study
          </span>
          <a
            href="mailto:saisantoshmadhari@gmail.com?subject=Inquiry regarding ESOW Planner Case Study"
            className="touch-target inline-flex items-center px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            Get In Touch
          </a>
        </div>
      </header>

      {/* Main Container with Sticky Left Navigation & Main Case Study Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-24 pb-20">
        
        {/* Case Study Header Banner */}
        <div className="mb-10 sm:mb-14 rounded-3xl bg-white dark:bg-[#0c111e] border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-lg backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold tracking-wider uppercase">
              ✦ End-to-End Enterprise SaaS Redesign
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.12]">
              ESOW Planner
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
              Reimagining Statement-of-Work Creation for a Global Enterprise
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              A <strong>40% cut in creation time across 12,000+ SOWs a year</strong> &mdash; turning a 4&ndash;6 hour, error-prone manual process into a guided workflow, designed end-to-end as the product&apos;s sole designer.
            </p>
          </div>

          {/* Quick Metrics Bento Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-black/5 dark:border-white/10">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">40%</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Time Reduction in Creation</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">12,000+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">SOWs Generated Yearly</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">2,500+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Active Enterprise Users</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">$45M+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Contract Value Managed</p>
            </div>
          </div>
        </div>

        {/* 2-Column Main Layout: Left Fixed Sidebar (TOC) + Right Scrollable Content */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start relative">
          
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: FIXED / STICKY TABLE OF CONTENTS NAVIGATION                */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-5 shadow-md backdrop-blur-2xl">
            <div className="space-y-1 mb-4 pb-3 border-b border-black/5 dark:border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 block">
                Case Study Index
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Table of Contents
              </h3>
            </div>

            <nav className="space-y-1 text-xs">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollTo(sec.id)}
                    className={`touch-target w-full text-left px-3 py-2 rounded-xl transition-all font-medium flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{sec.label}</span>
                    {isActive && <span className="text-xs">&rarr;</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 text-[11px] text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
              <p>Sole Designer: Sai Santosh</p>
              <p>Methodology: STAR Framework</p>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: DETAILED CASE STUDY STORYLINE IN BENTO GRID FORMAT          */}
          {/* ========================================================================= */}
          <main className="flex-1 w-full space-y-10 sm:space-y-12">
            
            {/* 01. OVERVIEW & PROJECT SNAPSHOT */}
            <section id="overview" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  01 · Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Project Snapshot &amp; Problem Statement
                </h2>
              </div>

              {/* Project Meta Bento Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold block">Role</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">Lead Product Designer (End-to-End)</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold block">Duration</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">3 Months</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold block">Tools</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">Figma, Jira, Miro</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold block">Squad</span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">1 PM, 2 Devs, 1 Researcher</p>
                </div>
              </div>

              {/* Narrative Context */}
              <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5">What is the ESOW Planner?</h3>
                  <p>
                    The <strong>Employee Statement of Work (ESOW) Planner</strong> is an internal enterprise application used by project managers, procurement teams, and HR vendor partners at a global technology enterprise to create, manage, and track formal work agreements with external contractors and vendors. These documents define project scope, deliverables, timelines, and costs &mdash; forming the binding contractual foundation for thousands of engagements every year.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                    The Problem, In One Line
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    &ldquo;Project managers were losing 4&ndash;6 hours per SOW to a confusing, unstructured tool &mdash; and 35% of what they submitted still bounced back for revision.&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    I owned this problem as the product&apos;s designer &mdash; not just its interface. That meant grounding every screen decision in a business outcome: fewer approval cycles, lower contract risk, faster vendor onboarding, and a tool procurement and legal could trust.
                  </p>
                </div>
              </div>
            </section>

            {/* 02. SITUATION & BLAST RADIUS */}
            <section id="situation" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  02 · Situation (S)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Mapping the Blast Radius
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                The enterprise relied on this internal ESOW tool to run contracted work across <strong>more than 10 countries</strong>. What started as a lightweight internal form had become a genuine operational bottleneck &mdash; one that finance, legal, procurement, and delivery teams all quietly worked around rather than through.
              </p>

              {/* 4-Quadrant Blast Radius Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                    Low Efficiency &bull; Low Complexity
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Outdated Legacy System</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Outdated system, legacy UI, zero integrations with procurement or finance platforms.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">
                    High Complexity &bull; High Effort
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">High Error &amp; Task Friction</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    High user error rate and poor task-level UX for the project managers using it daily.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                    Wide Global Reach
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">10+ Countries Affected</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    This wasn&apos;t a niche internal tool &mdash; it was global enterprise infrastructure.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                    Operational Bottlenecks
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">24-Hour Approval Delays</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Compounding delays across thousands of SOWs annually, risking delivery timelines.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs sm:text-sm text-zinc-800 dark:text-blue-200 leading-relaxed font-medium">
                💡 <strong>The Key Insight:</strong> A UI refresh alone would not fix it &mdash; the entire end-to-end workflow needed to be reimagined.
              </div>
            </section>

            {/* 03. TASK & MANDATE */}
            <section id="task" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  03 · Task &amp; Mandate (T)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  The Mandate &amp; Core Objectives
                </h2>
              </div>

              {/* Highlight Mandate Box */}
              <div className="p-6 rounded-2xl bg-zinc-900 text-white dark:bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                  My Mandate As Framed To The Squad
                </span>
                <p className="text-base sm:text-lg font-bold text-white italic">
                  &ldquo;Cut the time and risk out of creating a SOW, without adding a single field procurement or legal didn&apos;t already require.&rdquo;
                </p>
              </div>

              {/* 5 Objectives Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">01 / User Research</span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">12 Stakeholder Interviews</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Across PMs, HR vendors, and finance to map real workflows.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">02 / Journey Mapping</span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Empathy &amp; Trust Maps</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Locating exactly where trust broke down across steps.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">03 / Wireframing</span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Rapid Iterative Flows</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Low to high fidelity prototypes iterated in weekly reviews.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 sm:col-span-1.5">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">04 / UI Design</span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Design System Scale</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Aligned with enterprise design system tokens and WCAG 2.2 AA.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1 sm:col-span-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">05 / Usability Validation</span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Structured Testing</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Validated error reduction and user speed prior to code freeze.</p>
                </div>
              </div>
            </section>

            {/* 04. DISCOVERY & RESEARCH */}
            <section id="discovery" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  04 · Discovery &amp; Research
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Getting Inside the User&apos;s World
                </h2>
              </div>

              {/* Empathy Map: Sarah Bento Card */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">Empathy Map &mdash; Sarah, Project Manager</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Senior PM creating 15&ndash;20 SOWs per quarter</p>
                  </div>
                  <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-bold">
                    Primary Persona
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase text-[11px]">What Sarah Says</span>
                    <p className="text-zinc-700 dark:text-zinc-300 italic">&ldquo;I spend more time fighting the tool than planning the work. I never know where my SOWs are in approvals.&rdquo;</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase text-[11px]">What Sarah Thinks</span>
                    <p className="text-zinc-700 dark:text-zinc-300">Worries about missing required fields. Feels the tool doesn&apos;t respect her time. Seeks better vendor comparison.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase text-[11px]">What Sarah Does</span>
                    <p className="text-zinc-700 dark:text-zinc-300">Keeps multiple browser tabs open. Maintains personal tracking spreadsheets. Copies and edits old SOWs as workarounds.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase text-[11px]">What Sarah Feels</span>
                    <p className="text-zinc-700 dark:text-zinc-300">Frustrated by inefficient manual steps. Anxious regarding costly contractual errors. Relieved when finally approved.</p>
                  </div>
                </div>
              </div>

              {/* Current-State Journey Steps (As-Is) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Current-State Journey: Creating an ESOW (As-Is)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { step: '01', title: 'Initiate Request', pain: 'Unclear starting point; multiple confusing entry paths.', level: 'High' },
                    { step: '02', title: 'Enter Project Details', pain: 'Repetitive manual entry with no smart defaults or guidance.', level: 'High' },
                    { step: '03', title: 'Add Vendor Info', pain: 'No vendor comparison; manual data entry from emails.', level: 'High' },
                    { step: '04', title: 'Submit for Approval', pain: 'No visibility into who reviews it; no queue.', level: 'Med' },
                    { step: '05', title: 'Wait & Chase Status', pain: 'No notifications; users email stakeholders directly.', level: 'Very High' },
                    { step: '06', title: 'Final Approval', pain: 'Frequent revision cycles causing compounding delays.', level: 'Med' },
                  ].map((j, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{j.step}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          j.level === 'Very High' || j.level === 'High' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                        }`}>
                          Friction: {j.level}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{j.title}</h4>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">{j.pain}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 05. DEFINE & PERSONAS */}
            <section id="define" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  05 · Define &amp; Personas
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Personas &amp; Problem Statements
                </h2>
              </div>

              {/* 2 Personas Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Sarah Chen</h3>
                      <p className="text-xs text-zinc-500">Project Manager &bull; London, UK</p>
                    </div>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">Creator</span>
                  </div>
                  <div className="text-xs space-y-2">
                    <p><strong>Frustrations:</strong> Admin overhead, zero approval visibility, inability to compare vendors, fear of contract revisions.</p>
                    <p><strong>Goals:</strong> Create accurate SOWs quickly, select vendors with confidence, track approvals in real time.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Marcus</h3>
                      <p className="text-xs text-zinc-500">Product Specialist (Approver) &bull; Manchester, UK</p>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">Reviewer</span>
                  </div>
                  <div className="text-xs space-y-2">
                    <p><strong>Frustrations:</strong> Missing context in reviews, cannot review on mobile while travelling, communication bottlenecks.</p>
                    <p><strong>Goals:</strong> Review and approve efficiently, ensure policy compliance, maintain a clean audit trail.</p>
                  </div>
                </div>
              </div>

              {/* Problem Statements -> HMW Matrix */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Problem Statements &rarr; How Might We (HMW)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">4&ndash;6 Hours Per SOW</span>
                    <p className="text-zinc-700 dark:text-zinc-300"><strong>HMW</strong> streamline creation to cut time and cognitive load through guided inputs?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">No Approval Visibility</span>
                    <p className="text-zinc-700 dark:text-zinc-300"><strong>HMW</strong> surface real-time approval visibility and status telemetry automatically?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">Manual Vendor Spreadsheets</span>
                    <p className="text-zinc-700 dark:text-zinc-300"><strong>HMW</strong> enable side-by-side, data-driven vendor comparison directly inside the tool?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 space-y-1">
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-xs">35% Revision Bounce Rate</span>
                    <p className="text-zinc-700 dark:text-zinc-300"><strong>HMW</strong> prevent submission errors with real-time validation and contextual guidance?</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 06. STRATEGY & ROADMAP */}
            <section id="strategy" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  06 · Strategy &amp; Roadmap
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Impact vs. Effort Prioritization
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Rather than pitch every idea at once, I scored each concept against two axes &mdash; <strong>user/business impact</strong> and <strong>implementation effort</strong> &mdash; to align the PM, engineering leads, and procurement stakeholders on a clear phased release.
              </p>

              {/* Now / Next / Later Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">NOW &bull; v1</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Shipped in this Project</h4>
                  <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5 list-disc pl-4">
                    <li>Dashboard Overview</li>
                    <li>Guided 4-Step Wizard</li>
                    <li>Side-by-side Vendor Comparison</li>
                    <li>Real-time Approval Tracking</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">NEXT &bull; Q1</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Scoped &amp; Planned</h4>
                  <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5 list-disc pl-4">
                    <li>Smart SOW Templates</li>
                    <li>Inline Field Validation</li>
                    <li>Contextual Compliance Guidance</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">LATER &bull; Backlog</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Future Groundwork</h4>
                  <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5 list-disc pl-4">
                    <li>Budget Threshold Alerts</li>
                    <li>Mobile Approvals App</li>
                    <li>AI Vendor Scoring Models</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 07. INFORMATION ARCHITECTURE */}
            <section id="ia" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  07 · Information Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Restructuring Navigation (Depth 4 &rarr; 2)
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                I restructured the IA around <strong>user tasks rather than database tables</strong> &mdash; collapsing navigation depth from 4 complex layers down to 2 intuitive levels.
              </p>

              {/* 6 IA Pillars Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  { num: '1', title: 'Dashboard', desc: 'Overview metrics, recent activity, and quick-action triggers.' },
                  { num: '2', title: 'Create SOW', desc: 'Linear, guided step-by-step wizard reducing cognitive overload.' },
                  { num: '3', title: 'My SOWs', desc: 'Global SOW directory with advanced multi-parameter filtering.' },
                  { num: '4', title: 'Approvals Queue', desc: 'A dedicated review stream built specifically for approvers.' },
                  { num: '5', title: 'Vendor Hub', desc: 'Vendor management, historical rates, and comparison matrix.' },
                  { num: '6', title: 'Templates', desc: 'Reusable, pre-filled contractual scope blueprints.' },
                ].map((ia, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{ia.num} · Module</span>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{ia.title}</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{ia.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08. UI DESIGN & DECISIONS + VISUAL SHOWCASE */}
            <section id="ui-design" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  08 · UI Design &amp; Key Decisions
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Bringing the Solution to Life
                </h2>
              </div>

              {/* 5 Key Design Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">✦ Card-based layouts</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Scalable, scannable layouts across high-density enterprise contract data.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">✦ Progressive disclosure</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Step-by-step guidance preventing overwhelming multi-page forms.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">✦ Visual hierarchy</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Built on a strict typography scale so users always know their position.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">✦ Status indicators</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">At-a-glance color coding for Draft, Pending Review, Approved, and Rejected states.</p>
                </div>
              </div>

              {/* High-Fidelity UI Screen Gallery */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">High-Fidelity Interface Showcase</h3>
                  <span className="text-xs text-zinc-500 font-mono">Figma Design System</span>
                </div>

                {/* Screen 1: Dashboard Overview */}
                <div className="space-y-2">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-zinc-950 shadow-md">
                    <Image
                      src="/images/project_esow_1775675924462.png"
                      alt="ESOW Planner Redesigned Analytics Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center font-mono">
                    Screen 01: Centralized Enterprise Dashboard with SOW Distribution &amp; Real-Time Approval Queues
                  </p>
                </div>

                {/* Additional UI Screens Grid / Placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-zinc-950 shadow-md">
                      <Image
                        src="/images/esow-visual-1.jpg"
                        alt="Guided Creation Wizard Flow"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center">
                      Screen 02: 4-Step Guided SOW Creation Wizard
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-zinc-950 shadow-md">
                      <Image
                        src="/images/esow-visual-2.png"
                        alt="Vendor Side-by-Side Comparison Matrix"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center">
                      Screen 03: Data-Driven Vendor Comparison Matrix
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 09. WHAT DIDN'T MAKE THE CUT (TRADEOFFS) */}
            <section id="tradeoffs" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  09 · Product Judgment
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  What Didn&apos;t Make the Cut
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
                    Explored &amp; Rejected &bull; &ldquo;AI Auto-Draft&rdquo; Concept
                  </span>
                </div>
                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  The most tempting feature from our ideation workshops was allowing an LLM to auto-draft the first version of an SOW from a short text prompt. While it tested well for rapid speed, it broke down significantly on <strong>legal compliance and audit trust</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300 pt-1">
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-amber-200/50 dark:border-amber-800/30">
                    <strong>Legal &amp; Procurement:</strong> Could not audit how binding contractual clauses were generated &mdash; creating substantial regulatory risk.
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-amber-200/50 dark:border-amber-800/30">
                    <strong>Project Managers:</strong> Hesitated to submit contract text they hadn&apos;t personally verified &mdash; trust gap outweighed time saved.
                  </div>
                </div>
              </div>
            </section>

            {/* 10. USABILITY VALIDATION */}
            <section id="validation" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  10 · Usability Validation
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Observation &rarr; Design Response
                </h2>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Conducted moderated think-aloud usability testing with <strong>6 participants (4 PMs, 2 approvers)</strong> using real SOW scenarios across 45-minute task sessions.
              </p>

              {/* 3 Usability Feedbacks Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-500">Observation 01</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">&ldquo;I closed the tab thinking I&apos;d lose everything.&rdquo;</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>Design Response:</strong> Added a persistent &ldquo;Saved&rdquo; indicator with live timestamp in the header bar.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-500">Observation 02</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Missed the vendor selection button entirely</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>Design Response:</strong> Converted low-contrast text links in the comparison matrix to filled primary buttons.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-red-500">Observation 03</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Tried to edit an SOW post-submission</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>Design Response:</strong> Engineered an explicit locked / pending-review status state with clear edit-request triggers.</p>
                </div>
              </div>
            </section>

            {/* 11. MEASURABLE IMPACT (R) */}
            <section id="impact" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  11 · Result: Measurable Impact (R)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Quantifiable Business Results
                </h2>
              </div>

              {/* 4 Large Impact Counter Bento Cells */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-center space-y-1">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">40%</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Cycle Reduction</p>
                  <p className="text-[11px] text-zinc-500">From initiation to final signoff</p>
                </div>
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-center space-y-1">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">68%</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Time-to-Create</p>
                  <p className="text-[11px] text-zinc-500">Average time down to 1.1 hours</p>
                </div>
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-center space-y-1">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">91%</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">User Satisfaction</p>
                  <p className="text-[11px] text-zinc-500">Post-launch rating 4 or 5 / 5</p>
                </div>
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-center space-y-1">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">4.5 / 5</span>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Average Score</p>
                  <p className="text-[11px] text-zinc-500">In-app survey (n=71)</p>
                </div>
              </div>

              {/* Stakeholder Testimonial Quote Card */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                  &ldquo;We typically interact with the SOW Planner only once every quarter, but it always felt like a chore. The redesign has transformed that experience &mdash; it&apos;s now clear, engaging, and significantly boosts both satisfaction and productivity.&rdquo;
                </p>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block">
                  &mdash; Product Manager, Client Team
                </span>
              </div>
            </section>

            {/* 12. REFLECTION & KEY LEARNINGS */}
            <section id="reflection" className="rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-sm backdrop-blur-xl space-y-6">
              <div className="space-y-1 border-b border-black/5 dark:border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  12 · Reflection &amp; Next Steps
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  Key Learnings &amp; Product Takeaways
                </h2>
              </div>

              {/* 4 Key Learnings Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">1. Start with the workflow</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The biggest velocity and satisfaction wins came from eliminating systemic friction, not superficial UI polish.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">2. Visibility reduces anxiety</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Simply displaying real-time approval stages eliminated hundreds of manual status inquiries and support tickets.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">3. Iterate with real data</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Testing with actual multi-currency SOW contracts surfaced critical edge cases that dummy prototypes hid.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">4. Stakeholder alignment matters</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Weekly cross-functional reviews with procurement, legal, and engineering kept the design grounded in business reality.
                  </p>
                </div>
              </div>

              {/* Concluding Footer Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white dark:bg-white/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-bold">Ready to discuss this case study further?</h3>
                  <p className="text-xs text-zinc-400">Madhari Sai Santosh &bull; Lead Product Designer</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="mailto:saisantoshmadhari@gmail.com"
                    className="touch-target px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Email Me &rarr;
                  </a>
                  <Link
                    href="/#work"
                    className="touch-target px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all"
                  >
                    View Other Works
                  </Link>
                </div>
              </div>
            </section>

          </main>

        </div>

      </div>

    </div>
  );
}
