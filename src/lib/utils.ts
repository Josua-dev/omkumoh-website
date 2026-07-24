import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-NA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-NA").format(num);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultra: 1536,
} as const;

export function useMediaQuery(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export type MetadataProps = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
};

export function generateMetadata({
  title,
  description,
  path = "",
  ogImage = "/og-image.jpg",
}: MetadataProps) {
  const baseUrl = "https://www.omkumoh.com.na";
  return {
    title: `${title} | OM'KUMOH Consulting Engineers`,
    description,
    openGraph: {
      title: `${title} | OM'KUMOH Consulting Engineers`,
      description,
      url: `${baseUrl}${path}`,
      siteName: "OM'KUMOH Consulting Engineers",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_NA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | OM'KUMOH Consulting Engineers`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
