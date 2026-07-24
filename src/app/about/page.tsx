"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { companyInfo, values } from "@/data/company";
import { Building, Target, Eye, Award, Shield, Lightbulb, Leaf, Handshake, Compass } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Award size={24} />,
  lightbulb: <Lightbulb size={24} />,
  leaf: <Leaf size={24} />,
  shield: <Shield size={24} />,
  handshake: <Handshake size={24} />,
  building: <Building size={24} />,
};

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            About Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Shaping Namibia&apos;s Infrastructure Landscape
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Since {companyInfo.founded}, we have grown from a focused consultancy into one of Namibia&apos;s most trusted multidisciplinary engineering firms.
          </motion.p>
        </Container>
      </section>

      {/* Vision & Mission */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <Card className="p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-steel-blue/5 text-steel-blue">
                <Eye size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-charcoal">Our Vision</h2>
              <p className="text-lg leading-relaxed text-slate">{companyInfo.vision}</p>
            </Card>
            <Card className="p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-steel-blue/5 text-steel-blue">
                <Target size={28} />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-charcoal">Our Mission</h2>
              <p className="text-lg leading-relaxed text-slate">{companyInfo.mission}</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-gray-50">
        <Container>
          <SectionHeader subtitle="What We Stand For" title="Our Core Values" />
          <Reveal>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                  {iconMap[v.icon] || <Award size={24} />}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-charcoal">{v.title}</h3>
                <p className="leading-relaxed text-slate">{v.description}</p>
              </Card>
            ))}
          </div>
          </Reveal>
        </Container>
      </Section>

      <ClientLogosSection />
      <LeadershipSection />
      <TimelineSection />
    </motion.div>
  );
}
