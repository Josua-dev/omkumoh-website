import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HeroSection } from "@/components/sections/HeroSection";
import { EngineeringExcellence } from "@/components/sections/EngineeringExcellence";
import { CoreServices } from "@/components/sections/CoreServices";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { Statistics } from "@/components/sections/Statistics";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function HomePage() {
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
        <PortfolioGallery />
        <Statistics />
        <SustainabilitySection />
        <LeadershipSection />
        <TimelineSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}
