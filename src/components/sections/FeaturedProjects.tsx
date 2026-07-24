"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { projects, projectCategories } from "@/data/projects";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";

export function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.slice(0, 6);

  return (
    <Section id="projects" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Our Portfolio"
          title="Featured Projects"
          description="A selection of the 120+ infrastructure projects we've delivered across Namibia since 2010."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
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

        <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      <div className="text-center p-6">
                        <Badge variant={project.status === "completed" ? "default" : "subtle"} className={project.status === "in-progress" ? "text-copper border-copper/30 bg-copper/5" : ""}>
                          {project.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                        <Badge className="mt-2" variant="outline">
                          {projectCategories.find(c => c.value === project.category)?.label || project.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate mb-2">
                        <MapPin size={12} />
                        <span>{project.location}</span>
                        <span className="text-gray-300">·</span>
                        <Calendar size={12} />
                        <span>{project.period}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-charcoal group-hover:text-steel-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate">{project.client}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-steel-blue">
                        View Project <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-dark-blue/20 px-8 py-3 text-sm font-medium text-dark-blue transition-all hover:bg-dark-blue hover:text-white"
            >
              View All Projects <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
