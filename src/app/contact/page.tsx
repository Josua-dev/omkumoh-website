"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { siteConfig } from "@/config/site";
import { MapPin, Clock, ChevronDown, Phone, Mail } from "lucide-react";

const faqItems = [
  {
    q: "How do I engage OM'KUMOH for a project?",
    a: "Simply reach out via our contact form, phone, or email. We'll schedule an initial consultation to understand your project scope, objectives, and requirements. From there, we prepare a tailored proposal outlining our approach, timeline, and fee structure.",
  },
  {
    q: "What types of projects do you handle?",
    a: "We cover civil, structural, mechanical, electrical, and water engineering across residential, commercial, industrial, and public infrastructure sectors — from hospitals and schools to water treatment plants, solar PV installations, and transportation networks.",
  },
  {
    q: "What is the typical project timeline?",
    a: "Timelines vary by scope. A feasibility study may take 4–8 weeks, detailed design 8–16 weeks, and full construction supervision spans the build duration. We provide clear milestones at the proposal stage and keep you updated throughout.",
  },
  {
    q: "Which regions of Namibia do you serve?",
    a: "We have delivered projects in all 14 regions of Namibia, from urban centres like Windhoek and Swakopmund to rural communities in Kunene, Kavango, and Zambezi. Our team is equipped to mobilise nationwide.",
  },
  {
    q: "What should I prepare for an initial consultation?",
    a: "Any available site information, concept drawings, project briefs, budget parameters, and timelines help us provide a more accurate assessment. If you're unsure what's needed, we can guide you through the preparation process.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Map + Office Info */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl overflow-hidden bg-gray-100 min-h-[300px] relative">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=17.0688%2C-22.5755%2C17.0788%2C-22.5655&amp;layer=mapnik&amp;marker=-22.5705%2C17.0738"
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OM'KUMOH Office Location"
                />
              </div>
              <div className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Visit Our Office</h3>
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin size={20} className="text-steel-blue mt-0.5 shrink-0" />
                    <div>
                      <p className="text-slate font-medium">{siteConfig.contact.address}</p>
                      <p className="text-gray-400 text-sm">Windhoek, Namibia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <Clock size={20} className="text-steel-blue mt-0.5 shrink-0" />
                    <div>
                      <p className="text-slate">{siteConfig.contact.hours}</p>
                      <p className="text-gray-400 text-sm">{siteConfig.contact.weekendHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-steel-blue mt-0.5 shrink-0" />
                    <div>
                      <p className="text-slate">{siteConfig.contact.phone}</p>
                      <p className="text-gray-400 text-sm">{siteConfig.contact.phoneAlt}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 bg-dark-blue text-white">
                  <h3 className="text-lg font-semibold mb-2">Have a Project in Mind?</h3>
                  <p className="text-sm text-gray-300 mb-4">Drop us a message and we&apos;ll get back to you within 24 hours.</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-steel-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-steel-blue/90 transition-colors">
                    <Mail size={16} /> Email Us
                  </a>
                </Card>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactSection />

      {/* FAQ */}
      <Section className="bg-gray-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-steel-blue mb-3">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
                Everything You Need to Know
              </h2>
            </motion.div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between rounded-2xl bg-white px-6 py-5 text-left shadow-sm transition-all hover:shadow-md"
                  >
                    <span className="text-base font-medium text-charcoal pr-4">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-steel-blue transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 text-slate leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
