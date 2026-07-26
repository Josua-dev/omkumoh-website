"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "glass-dark" | "bordered";
  hover?: boolean;
  tilt?: boolean;
}

export function Card({ children, className, variant = "default", hover = true, tilt = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkTouch = () => {
      if ("ontouchstart" in window) return true;
      return matchMedia("(hover: none) and (pointer: coarse)").matches;
    };
    setIsTouchDevice(checkTouch());
  }, []);

  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    x.set(deltaX * 6);
    y.set(-deltaY * 6);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={tilt && !isTouchDevice ? handleMouse : undefined}
      onMouseLeave={tilt && !isTouchDevice ? resetTilt : undefined}
      whileHover={hover ? {
        y: -6,
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(59,111,160,0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      } : undefined}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" } : undefined}
      className={cn(
        "rounded-2xl transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        variant === "default" && "bg-card p-6 shadow-sm border border-border/50",
        variant === "glass" && "glass rounded-2xl p-6",
        variant === "glass-dark" && "glass-dark rounded-2xl p-6",
        variant === "bordered" && "border border-border/50 p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
