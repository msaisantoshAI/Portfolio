import React from 'react';
import HeroLanding from '@/components/HeroLanding';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import AiExplorationSection from '@/components/AiExplorationSection';
import WhatIBringSection from '@/components/WhatIBringSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-6 sm:space-y-8 md:space-y-12 pb-16 font-sans">
      {/* 1. HERO */}
      <div id="home" className="relative">
        <HeroLanding />
      </div>

      {/* 2. WORK EXPERIENCE / SELECTED WORK */}
      <BenWorkTimeline />

      {/* 3. AI EXPLORATION ("Exploring AI Through Products") */}
      <AiExplorationSection />

      {/* 4. WHAT I BRING TO THE TABLE */}
      <WhatIBringSection />

      {/* 5. CONTACT ("Have a problem worth solving?") */}
      <ContactSection />
    </main>
  );
}
