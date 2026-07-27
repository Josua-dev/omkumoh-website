"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { sustainabilityData } from "@/data/sustainability";
import { Leaf, Sun, Shield, Users, TrendingUp, ArrowRight, BarChart3, Target, Award } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf size={20} />,
  sun: <Sun size={20} />,
  shield: <Shield size={20} />,
  users: <Users size={20} />,
};

const statusProgress: Record<string, number> = {
  active: 80,
  ongoing: 55,
  planned: 25,
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
            {sustainabilityData.initiatives.map((init, i) => (
              <motion.div
                key={init.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="bordered" className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-charcoal">{init.title}</h3>
                    <span className="shrink-0 ml-4 rounded-full bg-copper/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-copper">
                      {init.status}
                    </span>
                  </div>
                  <p className="text-slate leading-relaxed">{init.description}</p>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-gray-500">Progress</span>
                      <span className="font-semibold text-steel-blue">{statusProgress[init.status] || 50}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-steel-blue to-soft-cyan"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${statusProgress[init.status] || 50}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-steel-blue/5 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-steel-blue/10 text-steel-blue">
                <BarChart3 size={28} />
              </div>
              <div className="text-3xl font-bold text-charcoal">
                <Counter end={100} suffix="%" />
              </div>
              <p className="mt-2 text-sm font-medium text-slate">Carbon-neutral Design Goal</p>
              <p className="mt-1 text-xs text-gray-400">All new projects targeting net-zero operational carbon by 2030</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-soft-cyan/5 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-soft-cyan/10 text-soft-cyan">
                <Target size={28} />
              </div>
              <div className="text-3xl font-bold text-charcoal">
                <Counter end={14} suffix="" />+
              </div>
              <p className="mt-2 text-sm font-medium text-slate">Regions Reached</p>
              <p className="mt-1 text-xs text-gray-400">Sustainability projects across all 14 regions of Namibia</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-copper/5 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-copper/10 text-copper">
                <Award size={28} />
              </div>
              <div className="text-3xl font-bold text-charcoal">
                <Counter end={5} suffix="" />+
              </div>
              <p className="mt-2 text-sm font-medium text-slate">Green Certifications</p>
              <p className="mt-1 text-xs text-gray-400">Projects pursuing EDGE, IFC, and other green building certifications</p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-dark-blue">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-soft-cyan mb-3">
                Join the Movement
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Let&apos;s Build a Sustainable Namibia Together
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Whether you&apos;re planning a new development or retrofitting existing infrastructure, our team can help you achieve your sustainability goals.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-soft-cyan px-6 py-3 text-sm font-semibold text-dark-blue transition-all hover:bg-soft-cyan-dark"
              >
                Start Your Sustainability Journey
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
