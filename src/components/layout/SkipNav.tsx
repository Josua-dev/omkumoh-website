"use client";

import Link from "next/link";

export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="fixed left-1/2 top-0 z-60 -translate-y-full -translate-x-1/2 rounded-b-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform duration-200 focus:translate-y-0 focus:outline-none"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
