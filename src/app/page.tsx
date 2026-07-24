"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { EngineeringExcellence } from "@/components/sections/EngineeringExcellence";
import { CoreServices } from "@/components/sections/CoreServices";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Statistics } from "@/components/sections/Statistics";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div>
      {/* ── Cinematic hero: 300vh with sticky 3D canvas ── */}
      <HeroSection />

      {/* ── Content that scrolls in over the hero ── */}
      <div className="relative z-20 bg-background">
        <ClientLogosSection />
        <EngineeringExcellence />
        <CoreServices />
        <FeaturedProjects />
        <Statistics />
        <ProcessSection />
        <SustainabilitySection />
        <LeadershipSection />
        <TimelineSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}
