"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

const affiliations = [
  "ECN", "ACEN", "EPA", "SAICE", "SAIMechE", "SAIEE"
];

export function ClientLogosSection() {
  return (
    <Section className="bg-white border-t border-b border-gray-100">
      <Container>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
            Professional Affiliations & Registrations
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {affiliations.map((aff, i) => (
              <motion.div
                key={aff}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex h-16 items-center justify-center rounded-xl bg-gray-50 px-6 text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-steel-blue transition-colors"
              >
                {aff}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
