import React from 'react';
import HeroLanding from '@/components/HeroLanding';
import BenIntroCards from '@/components/BenIntroCards';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import SanjayExperience from '@/components/SanjayExperience';
import AiExplorationSection from '@/components/AiExplorationSection';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-6 sm:space-y-8 md:space-y-12 pb-16 font-sans">
      {/* 1. HERO LANDING */}
      <div id="home" className="relative">
        <HeroLanding />
      </div>

      {/* 2. INTRO BANNER ("Hi, I'm Sai Santosh...") */}
      <BenIntroCards />

      {/* 3. SELECTED WORKS / FEATURED CASE STUDIES */}
      <BenWorkTimeline />

      {/* 4. WORK HISTORY & EXPERIENCE (TCS Enterprise Systems & AI Workflows) */}
      <SanjayExperience />

      {/* 5. AI EXPLORATION & PLAYGROUND */}
      <AiExplorationSection />
    </main>
  );
}
