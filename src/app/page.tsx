import React from 'react';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import BenIntroCards from '@/components/BenIntroCards';
import BenAboutSection from '@/components/BenAboutSection';
import BenWorkTimeline from '@/components/BenWorkTimeline';
import BenOtherThings from '@/components/BenOtherThings';
import BenWritings from '@/components/BenWritings';
import BenTalks from '@/components/BenTalks';
import BenTestimonials from '@/components/BenTestimonials';
import BenContactLetter from '@/components/BenContactLetter';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-12 md:space-y-20 pb-20">
      {/* 1. HERO SCROLL CANVAS (Kept 100% intact as requested) */}
      <div id="home" className="relative">
        <ScrollyCanvas />
      </div>

      {/* 2. INTRO BANNER & 4-CARD OVERLAPPING DECK (Ben Shih Style) */}
      <BenIntroCards />

      {/* 3. A BIT ABOUT ME SECTION */}
      <BenAboutSection />

      {/* 4. SOME RECENT WORK TIMELINE (2025 -> 2023) */}
      <BenWorkTimeline />

      {/* 5. SOME OTHER THINGS I DO (Indie Apps & AI Playground) */}
      <BenOtherThings />

      {/* 6. I WRITE. QUITE A LOT. (Articles & Case Studies) */}
      <BenWritings />

      {/* 7. I DO PUBLIC TALKS & WORKSHOPS */}
      <BenTalks />

      {/* 8. WHAT'S IT LIKE WORKING WITH ME (Sticky Notes & Testimonials) */}
      <BenTestimonials />

      {/* 9. INTERESTED IN COLLABORATING? (Letter & Contact Form) */}
      <BenContactLetter />
    </main>
  );
}
