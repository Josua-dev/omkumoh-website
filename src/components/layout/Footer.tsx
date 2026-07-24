"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp, Globe, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNavigation } from "@/data/navigation";
import { services } from "@/data/services";

export function Footer() {
  const scrollToTop = () => {
    // Use Lenis if available, fallback to native scroll
    const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: number, opts: Record<string, unknown>) => void } | undefined;
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-dark-blue text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <span className="text-sm font-bold text-white">O</span>
              </div>
              <span className="text-xl font-semibold">OM&apos;KUMOH</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Engineering Namibia&apos;s future through innovative, sustainable, and
              high-quality infrastructure solutions since 2010.
            </p>
            <div className="mt-6 flex gap-3">
              {["in", "X", "fb", "ig"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-copper hover:text-white hover:shadow-lg hover:shadow-copper/20"
                >
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-3 inline-block text-sm font-medium text-steel-blue hover:text-soft-cyan"
            >
              View All Services →
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Quick Links</h4>
            <ul className="space-y-3">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-steel-blue" />
                <span className="text-sm text-gray-400">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-steel-blue" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-gray-400 transition-colors hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-steel-blue" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-gray-400 transition-colors hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-lg bg-white/5 p-4">
              <p className="text-xs text-gray-400">{siteConfig.contact.hours}</p>
              <p className="text-xs text-gray-500">{siteConfig.contact.weekendHours}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["ECN", "ACEN", "EPA", "SAICE", "SAIMechE", "SAIEE"].map((aff) => (
                <span key={aff} className="rounded bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-400">
                  {aff}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-steel-blue"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
