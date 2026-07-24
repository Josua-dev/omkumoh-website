"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const csrInitiatives = [
  { title: "Community Infrastructure", description: "We contribute engineering expertise to community-driven infrastructure projects that improve access to water, sanitation, and energy in underserved areas across Namibia." },
  { title: "Skills Development", description: "Through mentorship programs and graduate training, we invest in Namibia's next generation of engineers, providing practical experience and professional development." },
  { title: "Environmental Stewardship", description: "Our projects incorporate sustainable practices that minimize environmental impact, protect biodiversity, and promote climate resilience in all our work." },
  { title: "Local Enterprise Development", description: "We prioritize local subcontractors and suppliers on our projects, fostering economic growth and building capacity within Namibian communities." },
  { title: "Educational Support", description: "We partner with educational institutions to support STEM education, providing guest lectures, site visits, and internship opportunities for students." },
  { title: "Health & Safety", description: "Beyond our project sites, we promote health and safety awareness in the communities where we work, supporting initiatives that protect workers and residents." },
];

export default function CSRPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Corporate Social Responsibility
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Engineering with Purpose
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            We believe that great engineering goes beyond structures — it builds communities, empowers people, and protects our environment.
          </motion.p>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-slate">
              At OM&apos;KUMOH, corporate social responsibility is not an afterthought — it is woven into the fabric of how we operate. We are committed to making a positive and lasting impact in the communities where we live and work.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {csrInitiatives.map((init) => (
              <Card key={init.title} className="p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-3">{init.title}</h3>
                <p className="text-slate leading-relaxed">{init.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
