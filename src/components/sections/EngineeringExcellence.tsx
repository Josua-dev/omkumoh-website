"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { values } from "@/data/company";
import { fadeInUp, stagger } from "@/config/animations";
import { Shield, Lightbulb, Leaf, Award, Handshake, Compass } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Award size={28} />,
  lightbulb: <Lightbulb size={28} />,
  leaf: <Leaf size={28} />,
  shield: <Shield size={28} />,
  handshake: <Handshake size={28} />,
  building: <Compass size={28} />,
};

export function EngineeringExcellence() {
  return (
    <Section className="bg-white architectural-grid">
      <Container>
        <SectionHeader
          subtitle="Built on Principle"
          title="More Than Engineering — a Philosophy"
          description="Six core values guide every project: from the first feasibility study to the final handover. No shortcuts. No compromises."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={fadeInUp}>
              <Card tilt variant="bordered" className="group h-full p-8 border-copper/0 hover:border-copper/20 transition-colors">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-steel-blue/5 text-steel-blue transition-colors group-hover:bg-steel-blue group-hover:text-white">
                  {iconMap[value.icon] || <Award size={28} />}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-charcoal">{value.title}</h3>
                <p className="leading-relaxed text-slate">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
