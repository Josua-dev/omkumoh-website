"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { projects, projectCategories } from "@/data/projects";
import { ArrowUpRight, MapPin, Calendar, Search } from "lucide-react";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Our Portfolio
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Featured Projects
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Over 120 projects delivered across Namibia — from government buildings to renewable energy systems.
          </motion.p>
        </Container>
      </section>

      <Section className="bg-gray-50">
        <Container>
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
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
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 sm:w-64"
              />
            </div>
          </div>

          {/* Results */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-2 p-6">
                        <Badge variant={project.status === "completed" ? "default" : "subtle"}>
                          {project.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                        <Badge variant="outline">
                          {projectCategories.find(c => c.value === project.category)?.label}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-slate mb-2">
                          <MapPin size={12} /><span>{project.location}</span>
                          <span className="text-gray-300">·</span>
                          <Calendar size={12} /><span>{project.period}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-charcoal group-hover:text-steel-blue transition-colors">{project.title}</h3>
                        <p className="mt-1 text-sm text-slate">{project.client}</p>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.scope}</p>
                        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-steel-blue">
                          View Details <ArrowUpRight size={14} />
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
              <p className="text-lg text-slate">No projects match your criteria.</p>
              <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-4 text-sm font-medium text-steel-blue hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </Section>
    </motion.div>
  );
}
