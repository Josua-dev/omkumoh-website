"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { caseStudies, caseStudyCategories } from "@/data/case-studies";
import { ArrowUpRight, MapPin, Calendar, Award, BarChart3 } from "lucide-react";

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Case Studies
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Engineering in Depth
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Deep-dive technical narratives on our most impactful projects across Namibia — the challenges, solutions, and measurable results.
          </motion.p>
        </Container>
      </section>

      <Section className="bg-gray-50">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {caseStudyCategories.map((cat) => (
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

          {/* Case studies grid */}
          <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((cs, i) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/case-studies/${cs.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 flex items-end p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-dark-blue/20 to-transparent" />
                        <div className="relative z-10">
                          <Badge variant="copper">{cs.category === "renewable-energy" ? "Renewable Energy" : cs.category === "specialized" ? "Specialized" : cs.category === "building" ? "Building" : cs.category}</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-slate mb-2">
                          <MapPin size={12} />
                          <span>{cs.location}</span>
                          <span className="text-gray-300">·</span>
                          <Calendar size={12} />
                          <span>{cs.period}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-charcoal group-hover:text-steel-blue transition-colors">
                          {cs.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate">{cs.client}</p>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{cs.subtitle}</p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-copper transition-colors">
                          Read Case Study <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-slate">No case studies match this category.</p>
              <button onClick={() => setActiveCategory("all")} className="mt-4 text-sm font-medium text-steel-blue hover:underline">
                View all case studies
              </button>
            </div>
          )}
        </Container>
      </Section>
    </motion.div>
  );
}