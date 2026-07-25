"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { projects, projectCategories } from "@/data/projects";
import { MapPin, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

// Map project images for key projects
const projectImageMap: Record<string, string> = {
  "namcor-oil-storage": "/images/projects/special-1.jpg",
  "okongo-stp": "/images/projects/special-2.jpg",
  "sesfontein-water": "/images/projects/special-3.jpg",
  "ekolola-electrification": "/images/projects/special-4.jpg",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Section className="min-h-screen bg-white pt-32">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-charcoal">Project Not Found</h1>
          <p className="mt-4 text-slate">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-steel-blue font-medium">
            ← Back to Projects
          </Link>
        </Container>
      </Section>
    );
  }

  const catLabel = projectCategories.find(c => c.value === project.category)?.label;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-end bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pb-16 pt-32">
          <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-steel-blue hover:text-soft-cyan">
            <ArrowLeft size={14} /> All Projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mb-4">
            <Badge>{catLabel}</Badge>
            <Badge variant={project.status === "completed" ? "default" : "subtle"}>
              {project.status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {project.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.period}</span>
          </motion.div>
        </Container>
      </section>

      {/* Project Image Hero */}
      {projectImageMap[project.id] && (
        <div className="relative h-[35vh] md:h-[45vh] w-full overflow-hidden">
          <Image
            src={projectImageMap[project.id]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
      )}

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Project Overview</h2>
                <p className="text-lg leading-relaxed text-slate">{project.description}</p>
              </div>

              {project.highlights && (
                <div>
                  <h2 className="text-2xl font-bold text-charcoal mb-4">Project Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle size={20} className="mt-0.5 shrink-0 text-steel-blue" />
                        <span className="text-slate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Project Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium text-charcoal">Client</span>
                    <p className="text-slate mt-1">{project.client}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Location</span>
                    <p className="text-slate mt-1">{project.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Period</span>
                    <p className="text-slate mt-1">{project.period}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Scope</span>
                    <p className="text-slate mt-1">{project.scope}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Disciplines</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.disciplines.map((d) => (
                        <Badge key={d} variant="subtle">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-dark-blue text-white p-8">
                <h3 className="text-lg font-semibold mb-2">Similar Project?</h3>
                <p className="text-sm text-gray-300 mb-4">Contact us to discuss your engineering needs.</p>
                <a href={`tel:${siteConfig.contact.phone}`} className="block w-full rounded-full bg-steel-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-steel-blue/90">
                  Call {siteConfig.contact.phone}
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
