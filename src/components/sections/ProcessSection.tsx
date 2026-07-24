"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, stagger } from "@/config/animations";
import { Search, FileText, PenTool, FileCheck, HardHat, CheckCircle, Activity, Wrench } from "lucide-react";

const steps = [
  { icon: <Search size={24} />, title: "Planning", description: "Comprehensive project planning and stakeholder identification to align with client objectives." },
  { icon: <FileText size={24} />, title: "Feasibility", description: "Detailed feasibility studies assessing technical, economic, and environmental viability." },
  { icon: <PenTool size={24} />, title: "Design", description: "Innovative engineering design using cutting-edge BIM and analysis software." },
  { icon: <FileCheck size={24} />, title: "Approvals", description: "Regulatory approvals and environmental compliance documentation." },
  { icon: <HardHat size={24} />, title: "Construction", description: "Construction supervision ensuring quality, safety, and adherence to specifications." },
  { icon: <CheckCircle size={24} />, title: "Quality Assurance", description: "Rigorous QA/QC inspections and testing throughout the construction phase." },
  { icon: <Activity size={24} />, title: "Completion", description: "Project handover with comprehensive documentation and close-out reports." },
  { icon: <Wrench size={24} />, title: "Maintenance", description: "Ongoing maintenance support and facility management advisory services." },
];

export function ProcessSection() {
  return (
    <Section className="bg-gray-50" id="process">
      <Container>
        <SectionHeader
          subtitle="How We Work"
          title="Our Engineering Process"
          description="A proven methodology that ensures every project meets the highest standards of quality, safety, and client satisfaction."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={fadeInUp} className="relative">
              <Card tilt className="group h-full p-8 text-center transition-shadow hover:shadow-lg hover:border-steel-blue/30">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-steel-blue/5 text-steel-blue transition-all group-hover:bg-steel-blue group-hover:text-white">
                  {step.icon}
                </div>
                <div className="mb-2 text-sm font-bold uppercase tracking-wider text-steel-blue">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{step.description}</p>
              </Card>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-steel-blue/30 lg:block">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
