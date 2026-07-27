"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { services, serviceCategories } from "@/data/services";
import { ServiceCategory } from "@/types";
import { fadeInUp, stagger } from "@/config/animations";
import { ArrowUpRight, Building, Ruler, Droplets, Route, Sun, Cog, Zap, Clipboard, Compass, Briefcase, Search, FileText, PenTool, FileCheck, HardHat, CheckCircle, Activity, Wrench } from "lucide-react";

const processSteps = [
  { icon: <Search size={20} />, title: "Planning", description: "Comprehensive project planning and stakeholder identification to align with client objectives." },
  { icon: <FileText size={20} />, title: "Feasibility", description: "Detailed feasibility studies assessing technical, economic, and environmental viability." },
  { icon: <PenTool size={20} />, title: "Design", description: "Innovative engineering design using cutting-edge BIM and analysis software." },
  { icon: <FileCheck size={20} />, title: "Approvals", description: "Regulatory approvals and environmental compliance documentation." },
  { icon: <HardHat size={20} />, title: "Construction", description: "Construction supervision ensuring quality, safety, and adherence to specifications." },
  { icon: <CheckCircle size={20} />, title: "Quality Assurance", description: "Rigorous QA/QC inspections and testing throughout the construction phase." },
  { icon: <Activity size={20} />, title: "Completion", description: "Project handover with comprehensive documentation and close-out reports." },
  { icon: <Wrench size={20} />, title: "Maintenance", description: "Ongoing maintenance support and facility management advisory services." },
];

type CategoryValue = "all" | "civil-structural" | "mechanical-electrical" | "planning-advisory";

const serviceIcons: Record<ServiceCategory, React.ReactNode> = {
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

const categoryMap: Record<CategoryValue, ServiceCategory[]> = {
  "all": services.map(s => s.id),
  "civil-structural": ["civil-engineering", "structural-engineering", "water-engineering", "transportation-engineering"],
  "mechanical-electrical": ["mechanical-engineering", "electrical-engineering", "renewable-energy"],
  "planning-advisory": ["project-management", "infrastructure-planning", "transaction-advisory"],
};

export function CoreServices() {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("all");

  const filteredServices = services.filter((s) =>
    categoryMap[activeCategory]?.includes(s.id)
  );

  return (
    <Section className="bg-gray-50" id="services">
      <Container>
        <SectionHeader
          subtitle="Ten Disciplines, One Standard"
          title="Full-Spectrum Engineering Under One Roof"
          description="From structural steel to solar PV, our multidisciplinary team eliminates the handoff between consultants. We design it, we detail it, we deliver it."
        />

        {/* Category filter */}
        <h2 className="sr-only">Filter by service category</h2>
        <div className="mt-12 flex flex-wrap justify-center gap-2" role="tablist">
          {serviceCategories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              aria-pressed={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value as CategoryValue)}
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
                      className="absolute top-6 right-6 text-gray-300 transition-all group-hover:text-copper group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── How We Work – engineering process ── */}
        <div className="mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">How We Work</p>
            <h2 className="mt-2 text-3xl font-bold text-charcoal md:text-4xl">Our Engineering Process</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate">
              A proven methodology that ensures every project meets the highest standards of quality, safety, and client satisfaction.
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <motion.div key={step.title} variants={fadeInUp} className="relative">
                <Card className="group h-full p-6 text-center transition-all hover:shadow-lg hover:border-copper/20 border border-transparent">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-copper/5 text-copper transition-all group-hover:bg-copper group-hover:text-white">
                    {step.icon}
                  </div>
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-copper">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-semibold text-charcoal">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
