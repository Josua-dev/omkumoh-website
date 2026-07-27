"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { caseStudies } from "@/data/case-studies";
import { MapPin, Calendar, CheckCircle, ArrowLeft, Quote, Award, BarChart3, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudies.find((cs) => cs.id === slug);

  if (!study) {
    return (
      <Section className="min-h-screen bg-white pt-32">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-charcoal">Case Study Not Found</h1>
          <p className="mt-4 text-slate">The case study you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/case-studies" className="mt-6 inline-flex items-center gap-2 text-steel-blue font-medium">
            ← Back to Case Studies
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pb-16 pt-32">
          <Breadcrumb items={[{ label: "Case Studies", href: "/case-studies" }, { label: study.title }]} className="mb-6" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mb-4">
            <Badge variant="copper">{study.category === "renewable-energy" ? "Renewable Energy" : study.category === "specialized" ? "Specialized" : study.category === "building" ? "Building" : study.category}</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-bold text-white md:text-5xl lg:text-6xl max-w-4xl">
            {study.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 max-w-2xl text-lg text-gray-300">
            {study.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {study.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {study.period}</span>
            <span className="flex items-center gap-1.5"><Award size={14} /> {study.client}</span>
          </motion.div>
        </Container>
      </section>

      {/* Impact Stats */}
      <Section className="bg-white py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {study.impact.map((item) => (
              <div key={item.label} className="rounded-2xl bg-gray-50 p-6 text-center">
                <div className="text-3xl font-bold text-copper md:text-4xl">{item.value}</div>
                <div className="mt-1 text-sm text-slate">{item.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Main content */}
      <Section className="bg-white pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
                  <BarChart3 size={24} className="text-steel-blue" /> Project Overview
                </h2>
                <p className="text-lg leading-relaxed text-slate">{study.overview}</p>
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">The Challenge</h2>
                <p className="text-lg leading-relaxed text-slate">{study.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Our Solution</h2>
                <p className="text-lg leading-relaxed text-slate">{study.solution}</p>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Results & Impact</h2>
                <ul className="space-y-4">
                  {study.results.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <CheckCircle size={22} className="mt-0.5 shrink-0 text-copper" />
                      <span className="text-lg text-slate">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project details */}
              <Card className="p-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Project Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium text-charcoal">Client</span>
                    <p className="text-slate mt-1">{study.client}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Location</span>
                    <p className="text-slate mt-1">{study.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Period</span>
                    <p className="text-slate mt-1">{study.period}</p>
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Disciplines</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {study.disciplines.map((d) => (
                        <Badge key={d} variant="subtle">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Testimonial */}
              {study.testimonial && (
                <Card className="bg-dark-blue text-white p-8 relative overflow-hidden">
                  <Quote size={32} className="absolute top-4 right-4 text-white/10" />
                  <p className="text-sm leading-relaxed text-gray-300 italic">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-medium text-white">{study.testimonial.name}</p>
                    <p className="text-xs text-gray-400">{study.testimonial.role}</p>
                  </div>
                </Card>
              )}

              {/* CTA */}
              <Card className="p-8 text-center">
                <h3 className="text-lg font-semibold text-charcoal mb-2">Need Similar Expertise?</h3>
                <p className="text-sm text-slate mb-4">Let&apos;s discuss how we can deliver for your next project.</p>
                <Link href="/contact#contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-white hover:bg-copper-dark transition-colors">
                  Start a Conversation
                </Link>
              </Card>

              {/* View project */}
              <Link href={`/projects/${study.projectId}`}>
                <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm font-medium text-steel-blue">← View Standard Project Page</p>
                </Card>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}