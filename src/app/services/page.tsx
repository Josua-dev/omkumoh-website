"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { services, serviceCategories } from "@/data/services";
import { ArrowUpRight, Building, Ruler, Droplets, Route, Sun, Cog, Zap, Clipboard, Compass, Briefcase, CheckCircle } from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "civil-engineering": <Building size={32} />,
  "structural-engineering": <Ruler size={32} />,
  "water-engineering": <Droplets size={32} />,
  "transportation-engineering": <Route size={32} />,
  "renewable-energy": <Sun size={32} />,
  "mechanical-engineering": <Cog size={32} />,
  "electrical-engineering": <Zap size={32} />,
  "project-management": <Clipboard size={32} />,
  "infrastructure-planning": <Compass size={32} />,
  "transaction-advisory": <Briefcase size={32} />,
};

const categoryMap: Record<string, string[]> = {
  "all": services.map(s => s.id),
  "civil-structural": ["civil-engineering", "structural-engineering", "water-engineering", "transportation-engineering"],
  "mechanical-electrical": ["mechanical-engineering", "electrical-engineering", "renewable-energy"],
  "planning-advisory": ["project-management", "infrastructure-planning", "transaction-advisory"],
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = services.filter(s => categoryMap[activeCategory]?.includes(s.id));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Our Expertise
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Comprehensive Engineering Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Ten integrated disciplines working together to deliver complete infrastructure solutions.
          </motion.p>
        </Container>
      </section>

      {/* Filter & Grid */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-wrap gap-2 mb-12">
            {serviceCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-dark-blue text-white"
                    : "bg-gray-50 text-slate hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <Card className="group flex flex-col gap-8 p-8 transition-all hover:shadow-lg md:flex-row">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-steel-blue/5 text-steel-blue shrink-0">
                        {serviceIcons[service.id] || <Building size={32} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-charcoal group-hover:text-steel-blue transition-colors">{service.title}</h2>
                            <p className="mt-2 text-base leading-relaxed text-slate max-w-3xl">{service.description}</p>
                          </div>
                          <ArrowUpRight size={20} className="shrink-0 text-gray-300 transition-all group-hover:text-steel-blue group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {service.features.slice(0, 6).map((f) => (
                            <div key={f} className="flex items-start gap-2">
                              <CheckCircle size={16} className="mt-0.5 shrink-0 text-steel-blue" />
                              <span className="text-sm text-slate">{f}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.disciplines.map((d) => (
                            <Badge key={d}>{d}</Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
    </motion.div>
  );
}
