"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  label?: string;
  light?: boolean;
}

export function Counter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  label,
  light,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className={cn("text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl", light ? "text-white" : "text-charcoal")}>
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </div>
      {label && <div className="mt-2 text-sm text-slate">{label}</div>}
    </div>
  );
}
