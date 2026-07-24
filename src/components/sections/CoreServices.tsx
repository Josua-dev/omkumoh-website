"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { services, serviceCategories } from "@/data/services";
import { fadeInUp, stagger } from "@/config/animations";
import { ArrowUpRight, Building, Ruler, Droplets, Route, Sun, Cog, Zap, Clipboard, Compass, Briefcase } from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "civil-engineering": <Building size={24} />,
  "structural-engineering": <Ruler size={24} />,
  "water-engineering": <Droplets size={24} />,
  "transportation-engineering": <Route size={24} />,
  "renewable-energy": <Sun size={24} />,
  "mechanical-engineering": <Cog size={24} />,
  "electrical-engineering": <Zap size={24} />,
  "project-management": <Clipboard size={24} />,
  "infrastructure-planning": <Compass size={24} />,
  "transaction-advisory": <Briefcase size={24} />,
};

const categoryMap: Record<string, string[]> = {
  "all": services.map(s => s.id),
  "civil-structural": ["civil-engineering", "structural-engineering", "water-engineering", "transportation-engineering"],
  "mechanical-electrical": ["mechanical-engineering", "electrical-engineering", "renewable-energy"],
  "planning-advisory": ["project-management", "infrastructure-planning", "transaction-advisory"],
};

export function CoreServices() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = services.filter((s) =>
    categoryMap[activeCategory]?.includes(s.id)
  );

  return (
    <Section className="bg-gray-50" id="services">
      <Container>
        <SectionHeader
          subtitle="Our Expertise"
          title="Comprehensive Engineering Services"
          description="From concept to completion, our multidisciplinary team delivers engineering solutions across ten specialized disciplines."
        />

        {/* Category filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {serviceCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-dark-blue text-white"
                  : "bg-white text-slate hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service grid */}
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <Card tilt className="group relative h-full p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue group-hover:bg-steel-blue group-hover:text-white transition-colors duration-300">
                      {serviceIcons[service.id] || <Building size={24} />}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-charcoal group-hover:text-steel-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.disciplines.slice(0, 2).map((d) => (
                        <Badge key={d} variant="subtle">{d}</Badge>
                      ))}
                      {service.disciplines.length > 2 && (
                        <Badge variant="subtle">+{service.disciplines.length - 2}</Badge>
                      )}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="absolute top-6 right-6 text-gray-300 transition-all group-hover:text-steel-blue group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
