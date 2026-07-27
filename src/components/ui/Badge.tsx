"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "subtle" | "copper" | "accent";
  dot?: boolean;
}

export function Badge({ children, className, variant = "default", dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-steel-blue/10 text-steel-blue",
        variant === "outline" && "border border-steel-blue/30 text-steel-blue",
        variant === "subtle" && "text-slate bg-gray-100",
        variant === "copper" && "bg-copper/10 text-copper border border-copper/20",
        variant === "accent" && "bg-soft-cyan/10 text-soft-cyan-dark border border-soft-cyan/20",
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "copper" && "bg-copper",
            variant === "accent" && "bg-soft-cyan",
            variant === "default" && "bg-steel-blue",
            variant === "outline" && "bg-steel-blue",
            variant === "subtle" && "bg-slate"
          )}
        />
      )}
      {children}
    </span>
  );
}