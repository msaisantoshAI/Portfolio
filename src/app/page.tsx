import React from 'react';
import CinematicLivingHero from '@/components/CinematicLivingHero';
import BenIntroCards from '@/components/BenIntroCards';
import BenAboutSection from '@/components/BenAboutSection';
import SanjayExperience from '@/components/SanjayExperience';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import BenOtherThings from '@/components/BenOtherThings';
import BenWritings from '@/components/BenWritings';
import BenTalks from '@/components/BenTalks';
import BenTestimonials from '@/components/BenTestimonials';
import BenContactLetter from '@/components/BenContactLetter';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-12 md:space-y-20 pb-20">
      {/* 1. CINEMATIC LIVING HERO (Weather, Time & Location Adaptive Hero) */}
      <div id="home" className="relative">
        <CinematicLivingHero />
      </div>

      {/* 2. INTRO BANNER & 4-CARD CURATED DECK */}
      <BenIntroCards />

      {/* 3. A BIT ABOUT ME SECTION */}
      <BenAboutSection />

      {/* 4. WORK HISTORY & EXPERIENCE (Sanjay Menon Inspired) */}
      <SanjayExperience />

      {/* 5. FEATURED CASE STUDIES TIMELINE (2025 -> 2023) */}
      <BenWorkTimeline />

      {/* 6. HOW I WORK (5-Stage Process & AI Playground) */}
      <BenOtherThings />

      {/* 7. I WRITE. QUITE A LOT. (Articles & Case Studies) */}
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
