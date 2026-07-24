"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { slideUp, stagger } from "@/config/animations";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
}

export function Container({ children, className, as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  grid?: boolean;
  grain?: boolean;
}

export function Section({
  children,
  className,
  id,
  dark = false,
  grid = false,
  grain = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        dark && "bg-dark-blue text-white",
        grid && "architectural-grid",
        grain && "grain",
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {subtitle && (
        <motion.span
          variants={slideUp}
          className={cn(
            "mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em]",
            dark ? "text-steel-blue" : "text-steel-blue"
          )}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        variants={slideUp}
        className={cn(
          "text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
          dark ? "text-white" : "text-charcoal"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={slideUp}
          className={cn(
            "mx-auto mt-6 max-w-2xl text-lg leading-relaxed",
            dark ? "text-gray-300" : "text-slate"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
