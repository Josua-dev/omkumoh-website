"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { team } from "@/data/company";
import { fadeInUp, stagger } from "@/config/animations";
import { ExternalLink, Mail } from "lucide-react";

export function LeadershipSection() {
  return (
    <Section className="bg-white" id="leadership">
      <Container>
        <SectionHeader
          subtitle="Our Team"
          title="Meet Our Leadership"
          description="A dedicated team of engineering professionals committed to delivering excellence across every discipline."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={fadeInUp}>
              <Card className="group h-full p-8 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-steel-blue/10">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-steel-blue/10 to-steel-blue/5 text-2xl font-bold text-steel-blue">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{member.name}</h3>
                <p className="text-sm font-medium text-steel-blue">{member.role}</p>
                <p className="mt-1 text-xs text-slate">{member.department}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {member.qualifications.map((q) => (
                    <span key={q} className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-slate">
                      {q}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {member.linkedin && (
                    <a href={member.linkedin} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-slate transition-colors hover:bg-steel-blue hover:text-white">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-slate transition-colors hover:bg-steel-blue hover:text-white">
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
