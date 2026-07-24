"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { siteConfig } from "@/config/site";
import { MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue">
            Contact Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl font-bold text-white md:text-7xl">
            Let&apos;s Build Together
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            Ready to start your next project? Reach out to our team for a consultation.
          </motion.p>
        </Container>
      </section>

      {/* Map area */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={40} className="mx-auto text-steel-blue mb-4" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">{siteConfig.contact.address}</h3>
                <p className="text-slate">Windhoek, Namibia</p>
              </div>
            </div>
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-charcoal mb-4">Office Hours</h3>
              <div className="flex items-start gap-4 mb-6">
                <Clock size={20} className="text-steel-blue mt-0.5" />
                <div>
                  <p className="text-slate">{siteConfig.contact.hours}</p>
                  <p className="text-gray-400 text-sm">{siteConfig.contact.weekendHours}</p>
                </div>
              </div>
              <p className="text-slate leading-relaxed">
                Visit our head office at Ludwigsdorf, Windhoek. We welcome project enquiries,
                partnership discussions, and career applications during business hours.
              </p>
            </Card>
          </div>
        </Reveal>
      </Container>
      </Section>

      <ContactSection />
    </motion.div>
  );
}
