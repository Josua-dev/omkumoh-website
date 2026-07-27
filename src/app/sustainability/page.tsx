"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { sustainabilityData } from "@/data/sustainability";
import { Leaf, Sun, Shield, Users, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf size={20} />,
  sun: <Sun size={20} />,
  shield: <Shield size={20} />,
  users: <Users size={20} />,
};

export default function SustainabilityPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Sustainability
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Engineering a Greener Future
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            {sustainabilityData.intro}
          </motion.p>
        </Container>
      </section>

      <SustainabilitySection />

      {/* Initiatives */}
      <Section className="bg-gray-50">
        <Container>
          <SectionHeader
            subtitle="Our Commitment"
            title="Sustainability Initiatives"
            description="Concrete actions we're taking to build a more sustainable future through engineering."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sustainabilityData.initiatives.map((init) => (
              <Card key={init.title} variant="bordered" className="p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-3">{init.title}</h3>
                <p className="text-slate leading-relaxed">{init.description}</p>
                <span className="mt-4 inline-block rounded-full bg-copper/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-copper">
                  {init.status}
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
