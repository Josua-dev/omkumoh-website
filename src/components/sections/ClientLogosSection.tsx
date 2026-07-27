"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import Image from "next/image";

const affiliations = [
  { name: "Engineering Council of Namibia", abbr: "ECN", image: "/images/affiliations/ecn.webp" },
  { name: "Association of Consulting Engineers of Namibia", abbr: "ACEN", image: "/images/affiliations/acen.webp" },
  { name: "Engineering Professions Association Namibia", abbr: "EPA", image: "/images/affiliations/epa.webp" },
  { name: "South African Institution of Civil Engineering", abbr: "SAICE", image: "/images/affiliations/saice.webp" },
  { name: "South African Institution of Mechanical Engineering", abbr: "SAIMechE", image: "/images/affiliations/saimeche.webp" },
  { name: "South African Institute of Electrical Engineers", abbr: "SAIEE", image: "/images/affiliations/saiee.webp" },
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
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {affiliations.map((aff, i) => (
              <motion.div
                key={aff.abbr}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col items-center gap-2"
                title={aff.name}
              >
                <div className="relative flex h-16 w-24 items-center justify-center rounded-lg bg-gray-50 px-3 transition-all group-hover:bg-gray-100 group-hover:shadow-sm">
                  <Image
                    src={aff.image}
                    alt={`${aff.name} logo`}
                    width={80}
                    height={48}
                    className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-steel-blue">
                  {aff.abbr}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
