"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { sustainabilityData } from "@/data/sustainability";
import { fadeInUp, stagger } from "@/config/animations";
import { Leaf, Sun, Shield, Users, Droplets, Zap, TrendingUp, Building } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf size={20} />,
  sun: <Sun size={20} />,
  shield: <Shield size={20} />,
  users: <Users size={20} />,
  droplets: <Droplets size={20} />,
  zap: <Zap size={20} />,
  building: <Building size={20} />,
};

export function SustainabilitySection() {
  return (
    <Section className="bg-white" id="sustainability">
      <Container>
        <SectionHeader
          subtitle="Sustainable Engineering"
          title="Building a Greener Namibia"
          description="We integrate sustainable design principles into every project, ensuring our infrastructure serves both people and planet."
        />

        {/* Approach cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {sustainabilityData.approach.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <Card className="h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                  {iconMap[item.icon] || <Leaf size={20} />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics */}
        <div className="mt-20 grid gap-8 md:grid-cols-4">
          {sustainabilityData.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-soft-cyan/10 text-soft-cyan">
                {iconMap[metric.icon] || <TrendingUp size={20} />}
              </div>
              <div className="text-4xl font-bold tracking-tight text-charcoal">
                <Counter end={metric.value} suffix={metric.unit} />
              </div>
              <div className="mt-2 text-sm text-slate">{metric.label}</div>
              <div className="mt-1 text-xs text-gray-400">{metric.description}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
