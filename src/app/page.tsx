import React from 'react';
import HeroLanding from '@/components/HeroLanding';
import BenIntroCards from '@/components/BenIntroCards';
import BenAboutSection from '@/components/BenAboutSection';
import SanjayExperience from '@/components/SanjayExperience';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import AiExplorationSection from '@/components/AiExplorationSection';
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

      {/* 2. INTRO BANNER & CURATED DECK */}
      <BenIntroCards />

      {/* 3. A BIT ABOUT ME SECTION */}
      <BenAboutSection />

      {/* 4. WORK HISTORY & EXPERIENCE (TCS Enterprise Systems & AI Workflows) */}
      <SanjayExperience />

      {/* 5. FEATURED CASE STUDIES (Sticky Overlapping Stack) */}
      <BenWorkTimeline />

      {/* 6. AI EXPLORATION & PLAYGROUND */}
      <AiExplorationSection />

      {/* 7. ADDITIONAL WORKS: I DRAW. QUITE A LOT. (Artworks & Workshops) */}
      <BenWritings />

      {/* 8. PUBLIC TALKS & WORKSHOPS */}
      <BenTalks />

      {/* 9. PEER FEEDBACK & COLLABORATION */}
      <BenTestimonials />

      {/* 10. INTERESTED IN COLLABORATING? (Letter & Contact Form) */}
      <BenContactLetter />
    </main>
  );
}
