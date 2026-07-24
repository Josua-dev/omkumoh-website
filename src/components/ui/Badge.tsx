"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "subtle";
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
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-steel-blue" />}
      {children}
    </span>
  );
}
