"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = testimonials[current];

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <Section className="bg-gray-50">
      <Container>
        <SectionHeader
          subtitle="Client Feedback"
          title="Trusted by Namibia's Leading Institutions"
          description="Hear from the clients and partners who have trusted us with their most important infrastructure projects."
        />

        <div
          className="relative mx-auto mt-16 max-w-4xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card variant="default" className="relative p-12 md:p-16">
                <Quote size={40} className="absolute top-8 left-8 text-steel-blue/10" />
                <blockquote className="relative text-xl leading-relaxed text-charcoal md:text-2xl">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-steel-blue/10 text-sm font-bold text-steel-blue">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{t.name}</div>
                    <div className="text-sm text-slate">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate transition-colors hover:border-steel-blue hover:text-steel-blue"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-steel-blue" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate transition-colors hover:border-steel-blue hover:text-steel-blue"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
