"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // ── GSAP parallax on scroll ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(bg, {
            scale: 1 + p * 0.05,
            y: p * -25,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ── Framer Motion scroll-driven UI fade ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const uiOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.3, 0]);
  const uiY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35],
    [1, 1, 0]
  );

  // ── Animation variants ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.18,
        delayChildren: prefersReducedMotion ? 0 : 0.4,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.9,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={cn("relative h-screen overflow-hidden bg-dark-blue", className)}
    >
      {/* ── Photographic Background ── */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Base dark layer for depth */}
        <div className="absolute inset-0 z-[1] bg-dark-blue/10" />

        {/* Parallax image wrapper (oversized to hide edges when scaled) */}
        <div
          ref={bgRef}
          className="absolute z-0 will-change-transform"
          style={{ top: "-5%", left: "-5%", width: "110%", height: "110%" }}
        >
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="OM&apos;KUMOH Consulting Engineers — modern engineering headquarters building"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>

        {/* ── Gradient Overlays ── */}
        {/* Left-to-right: dark → transparent for text readability */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[70%] bg-gradient-to-r from-dark-blue/95 via-dark-blue/50 to-transparent md:w-[60%] lg:w-[55%]" />

        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-background to-transparent" />

        {/* Top atmospheric darkening */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-dark-blue/40 to-transparent" />
      </div>

      {/* ── Content Layer ── */}
      <motion.div
        style={{ opacity: uiOpacity, y: uiY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12 lg:px-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70"
          >
            Multidisciplinary Engineering Consultancy
          </motion.span>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-7xl lg:text-8xl"
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
            className="mt-6 max-w-lg text-sm leading-relaxed tracking-wide text-white/70 md:text-base"
          >
            A multidisciplinary engineering firm delivering iconic infrastructure
            across Namibia — from concept to completion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
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
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
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
    </section>
  );
}
