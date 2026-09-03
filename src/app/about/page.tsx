import React from 'react';
import Link from 'next/link';
import BenAboutSection from '@/components/BenAboutSection';
import BenWritings from '@/components/BenWritings';
import BenTalks from '@/components/BenTalks';
import BenTestimonials from '@/components/BenTestimonials';
import BenContactLetter from '@/components/BenContactLetter';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-6 sm:space-y-8 md:space-y-12 pt-20 pb-20 font-sans">
      
      {/* Top Header / Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-[#0c111e]/90 hover:bg-white dark:hover:bg-[#111728] text-zinc-800 dark:text-white text-xs font-semibold border border-black/10 dark:border-white/15 shadow-sm backdrop-blur-md transition-all hover:scale-105"
          >
            <span>&larr;</span>
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
            About Me &bull; Craft &bull; Community
          </span>
        </div>
      </div>

      {/* 1. ABOUT ME CORE BIO & STUDIO PORTRAIT */}
      <BenAboutSection />

      {/* 2. ARTWORKS & SKETCHES ("I draw. Quite a lot.") */}
      <BenWritings />

      {/* 3. PUBLIC TALKS & WORKSHOPS */}
      <BenTalks />

      {/* 4. PEER FEEDBACK & COLLABORATION (TESTIMONIALS) */}
      <BenTestimonials />

      {/* 5. GET IN TOUCH / CONTACT LETTER */}
      <BenContactLetter />
    </main>
  );
}
