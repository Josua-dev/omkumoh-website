"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, description, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const descriptionId = description && inputId ? `${inputId}-description` : undefined;

    const ariaDescribedBy =
      [errorId, descriptionId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium",
              error ? "text-red-500" : "text-charcoal"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className={cn(
            "flex h-10 w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 transition-all",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
              : "border-gray-200",
            className
          )}
          {...props}
        />
        {description && !error && (
          <p id={descriptionId} className="text-sm text-slate">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
