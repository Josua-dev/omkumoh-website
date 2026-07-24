"use client";

import { useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ModernCampus } from "@/components/three/ModernCampus";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  // ── GSAP ScrollTrigger for camera progress ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // ── Framer Motion scroll tracking for UI opacity ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const uiOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 0.6, 0]);
  const uiY = useTransform(scrollYProgress, [0, 0.85], [0, -80]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [1, 1, 0]
  );

  const staggerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={cn("relative h-[300vh]", className)}
    >
      {/* ── Sticky 3D Canvas ── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center bg-[#0a1628]">
              <div className="h-8 w-8 animate-pulse rounded-full bg-steel-blue/50" />
            </div>
          }
        >
          <ModernCampus progressRef={progressRef} />
        </Suspense>

        {/* ── Subtle gradient overlay for readability ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* ── Cinematic UI Overlay ── */}
        <motion.div
          style={{ opacity: uiOpacity, y: uiY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
        >
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
            >
              Multidisciplinary Engineering Consultancy
            </motion.span>

            {/* Main headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Engineering
              <br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Namibia&apos;s Future
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-xl text-sm leading-relaxed tracking-wide text-white/40 md:text-base"
            >
              A multidisciplinary engineering firm delivering iconic infrastructure
              across Namibia — from concept to completion.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              style={{ opacity: ctaOpacity }}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="/projects"
                className="group relative overflow-hidden rounded-full bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span className="relative z-10">Explore Portfolio</span>
                <span className="absolute inset-0 -translate-x-full rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="/contact"
                className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
              Scroll to explore
            </span>
            <div className="relative h-10 w-[1px] overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-white/60 to-transparent"
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Bottom gradient transition edge ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
