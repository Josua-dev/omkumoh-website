"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/animations/Reveal";
import { stats } from "@/data/company";
import { fadeInUp, stagger } from "@/config/animations";

export function Statistics() {
  return (
    <Section className="relative bg-dark-blue text-white overflow-hidden" dark>
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-steel-blue/5 blur-[100px]"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 h-[500px] w-[500px] rounded-full bg-soft-cyan/5 blur-[80px]"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-12 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <Counter
                end={stat.value}
                suffix={stat.suffix || ""}
                prefix={stat.prefix || ""}
                light
              />
              <div className="mt-3 text-sm font-medium uppercase tracking-wider text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
