"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/data/navigation";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const prevScrollRef = useRef(0);
  const tickingRef = useRef(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // ── Dark mode state ──
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDarkMode(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setIsScrolled(currentY > 50);
        setNavHidden(currentY > 120 && currentY > prevScrollRef.current);
        prevScrollRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenSubMenu(null);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isMobileOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileOpen) return;
    const toggleBtn = toggleBtnRef.current;
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const focusableEls = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    if (firstFocusable) firstFocusable.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => {
      panel.removeEventListener("keydown", handleKeyDown);
      toggleBtn?.focus();
    };
  }, [isMobileOpen]);

  // Determine active state — top-level link OR any child matches
  const isItemActive = (item: typeof mainNavigation[number]) => {
    if (pathname === item.href) return true;
    if (item.children) return item.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"));
    return false;
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: navHidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav role="navigation" aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-blue"
          >
            <span className="text-xs font-bold text-white">O</span>
          </motion.div>
          <motion.span
            className={cn(
              "text-lg font-semibold tracking-tight transition-colors duration-300",
              isScrolled ? "text-charcoal" : "text-white"
            )}
          >
            OM&apos;KUMOH
          </motion.span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-dark-blue hover:bg-gray-100/50"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                  active && (isScrolled ? "text-dark-blue" : "text-white")
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-[2.5px] rounded-full bg-steel-blue"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "ml-2 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              isScrolled
                ? "text-gray-500 hover:bg-gray-100 hover:text-dark-blue"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="ml-4">
            <Link
              href="/contact"
              className={cn(
                "group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                isScrolled
                  ? "bg-dark-blue text-white hover:bg-dark-blue/90 shadow-sm"
                  : "border border-white/30 text-white hover:bg-white/10"
              )}
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          ref={toggleBtnRef}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "relative z-10 rounded-full p-2 transition-colors lg:hidden",
            isScrolled ? "text-charcoal hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <motion.div
            animate={{ rotate: isMobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile menu panel — now with sub-items */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[5] flex flex-col bg-dark-blue lg:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-6 pt-28 pb-16 overflow-y-auto">
              {mainNavigation.map((item, i) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openSubMenu === item.label;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col items-center"
                  >
                    {/* Top-level item */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        className={cn(
                          "text-3xl font-medium transition-colors hover:text-steel-blue",
                          isItemActive(item) ? "text-steel-blue" : "text-white/90"
                        )}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          onClick={() => setOpenSubMenu(isOpen ? null : item.label)}
                          aria-label={isOpen ? `Collapse ${item.label} sub-menu` : `Expand ${item.label} sub-menu`}
                          aria-expanded={isOpen}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white hover:bg-white/10"
                        >
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={18} />
                          </motion.div>
                        </button>
                      )}
                    </div>

                    {/* Sub-items */}
                    <AnimatePresence>
                      {hasChildren && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="mt-4 flex flex-col items-center gap-3 overflow-hidden"
                        >
                          <div className="h-px w-12 bg-white/10" />
                          {item.children!.map((child, j) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.03 }}
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  "block text-lg transition-colors",
                                  pathname === child.href
                                    ? "text-steel-blue font-medium"
                                    : "text-white/60 hover:text-white"
                                )}
                              >
                                {child.label}
                                {child.description && (
                                  <span className="ml-2 text-xs text-white/30">— {child.description}</span>
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-white/30 px-10 py-3.5 text-lg font-medium text-white transition-all hover:bg-white/10"
                >
                  Get in Touch
                </Link>
              </motion.div>

              {/* Dark mode toggle */}
              <motion.button
                onClick={toggleDarkMode}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="mt-4 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}