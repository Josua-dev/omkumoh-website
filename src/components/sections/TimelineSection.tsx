"use client";

import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { timeline } from "@/data/company";
import { fadeInUp } from "@/config/animations";
import { Award, Building, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  milestone: <Milestone size={16} />,
  project: <Building size={16} />,
  achievement: <Award size={16} />,
};

export function TimelineSection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Our Journey"
          title="A Decade of Engineering Excellence"
          description="From our founding in 2010 to becoming one of Namibia's trusted multidisciplinary engineering consultancies."
        />

        <div className="relative mx-auto mt-20 max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-steel-blue via-steel-blue/30 to-transparent" />

          <div className="space-y-12">
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={i}
                className="relative flex gap-8"
              >
                {/* Dot */}
                <div className={cn(
                  "relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-2 bg-white",
                  event.type === "achievement" ? "border-copper text-copper" : "border-steel-blue text-steel-blue"
                )}>
                  {typeIcons[event.type] || <Milestone size={16} />}
                </div>

                <div className="flex-1 pb-4">
                  <div className={cn(
                    "text-sm font-bold uppercase tracking-wider",
                    event.type === "achievement" ? "text-copper" : "text-steel-blue"
                  )}>
                    {event.year}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-charcoal">{event.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
