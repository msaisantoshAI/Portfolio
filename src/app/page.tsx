import React from 'react';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import EditorialAbout from '@/components/EditorialAbout';
import EditorialWork from '@/components/EditorialWork';
import EditorialProcess from '@/components/EditorialProcess';
import EditorialExperience from '@/components/EditorialExperience';
import EditorialAiPrototypes from '@/components/EditorialAiPrototypes';
import EditorialArticles from '@/components/EditorialArticles';
import EditorialTalks from '@/components/EditorialTalks';
import EditorialTestimonials from '@/components/EditorialTestimonials';
import EditorialContact from '@/components/EditorialContact';

export default function Home() {
  return (
    <main className="bg-transparent transition-colors duration-300 relative overflow-x-clip space-y-16 sm:space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO SCROLL CANVAS (100% LOCKED: Environmental parallax, living sky, face unobstructed) */}
      <div id="home" className="relative">
        <ScrollyCanvas />
      </div>

      {/* 2. EDITORIAL ABOUT (Narrative Statement, 3 Capabilities & Restrained Metrics Row) */}
      <EditorialAbout />

      {/* 3. SELECTED WORK (Alternating Editorial Case Studies with Measurable Outcomes) */}
      <EditorialWork />

      {/* 4. PROCESS (5 Sequential Stages: Discover -> Structure -> Design -> Build -> Validate) */}
      <EditorialProcess />

      {/* 5. EXPERIENCE (Clean Vertical Career Timeline & Leadership History) */}
      <EditorialExperience />

      {/* 6. PROTOTYPES & LABS (Interactive 4-Tab AI Workspace & Live State Terminal) */}
      <EditorialAiPrototypes />

      {/* 7. WRITINGS (Editorial Row Layout: "I Write. Quite a Lot.") */}
      <EditorialArticles />

      {/* 8. TALKS & WORKSHOPS (Chronological Speaking Résumé) */}
      <EditorialTalks />

      {/* 9. TESTIMONIALS (Large Quotation Typography with Carousel Controls) */}
      <EditorialTestimonials />

      {/* 10. CLOSING & CONTACT ("Let's Build Something Interesting" & Interactive Letter) */}
      <EditorialContact />
    </main>
  );
}
