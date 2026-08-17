import React from 'react';
import HeroLanding from '@/components/HeroLanding';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import SanjayExperience from '@/components/SanjayExperience';
import AiExplorationSection from '@/components/AiExplorationSection';
import BenAboutSection from '@/components/BenAboutSection';
import BenIntroCards from '@/components/BenIntroCards';
import BenWritings from '@/components/BenWritings';
import BenTalks from '@/components/BenTalks';
import BenTestimonials from '@/components/BenTestimonials';
import BenContactLetter from '@/components/BenContactLetter';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-6 sm:space-y-8 md:space-y-12 pb-16">
      {/* 1. HERO LANDING */}
      <div id="home" className="relative">
        <HeroLanding />
      </div>

      {/* 2. SELECTED WORKS / FEATURED CASE STUDIES */}
      <div id="work">
        <BenWorkTimeline />
      </div>

      {/* 3. WORK HISTORY & EXPERIENCE (TCS Enterprise Systems & AI Workflows) */}
      <div id="experience">
        <SanjayExperience />
      </div>

      {/* 4. AI EXPLORATION & PLAYGROUND */}
      <div id="ai-exploration">
        <AiExplorationSection />
      </div>

      {/* 5. A BIT ABOUT ME SECTION */}
      <div id="about">
        <BenAboutSection />
      </div>

      {/* 6. CURATED HIGHLIGHTS DECK */}
      <BenIntroCards />

      {/* 7. ADDITIONAL WORKS: I DRAW. QUITE A LOT. (Artworks & Workshops) */}
      <div id="drawings">
        <BenWritings />
      </div>

      {/* 8. PUBLIC TALKS & WORKSHOPS */}
      <div id="talks">
        <BenTalks />
      </div>

      {/* 9. PEER FEEDBACK & COLLABORATION (Pinned Papers) */}
      <BenTestimonials />

      {/* 10. INTERESTED IN COLLABORATING? (Letter & Contact Form) */}
      <div id="contact">
        <BenContactLetter />
      </div>
    </main>
  );
}
