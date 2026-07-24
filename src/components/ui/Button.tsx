"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionButtonProps = React.ComponentPropsWithoutRef<typeof motion.button>;

interface ButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue rounded-full",
          {
            "bg-dark-blue text-white hover:bg-dark-blue/90 shadow-sm": variant === "primary",
            "bg-steel-blue text-white hover:bg-steel-blue/90": variant === "secondary",
            "border border-dark-blue/20 text-dark-blue hover:bg-dark-blue/5": variant === "outline",
            "text-dark-blue hover:bg-dark-blue/5": variant === "ghost",
            "border border-white/30 text-white hover:bg-white/10": variant === "light",
            "px-4 py-2 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3 text-base": size === "lg",
            "px-8 py-4 text-lg": size === "xl",
          },
          className
        )}
        {...props}
      >
        {/* Shine overlay */}
        <span className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
