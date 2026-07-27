"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // ── Framer Motion scroll-driven parallax + UI fade ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -25]);
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
        staggerChildren: 0.18,
        delayChildren: 0.4,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
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
        <motion.div
          ref={bgRef}
          className="absolute z-0 will-change-transform"
          style={{
            scale: bgScale,
            y: bgY,
            top: "-5%",
            left: "-5%",
            width: "110%",
            height: "110%",
          }}
        >
          <Image
            src="/images/hero/hero-bg.webp"
            alt="OM&apos;KUMOH Consulting Engineers — modern engineering headquarters building"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </motion.div>

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
            Namibia&apos;s Engineering Partner Since 2010
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
            Structural, civil, mechanical, and electrical engineering — delivering
            Namibia&apos;s most critical infrastructure since 2010.
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
            <Link
              href="/contact#contact"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-copper/20 transition-all hover:bg-copper-dark hover:shadow-xl hover:shadow-copper/30 hover:-translate-y-0.5"
            >
              Discuss Your Project
            </Link>
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