"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const LenisProvider = dynamic(
  () =>
    import("@/components/layout/LenisProvider").then((m) => ({
      default: m.LenisProvider,
    })),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () =>
    import("@/components/ui/ScrollProgress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false }
);
const Navigation = dynamic(
  () =>
    import("@/components/layout/Navigation").then((m) => ({
      default: m.Navigation,
    })),
  { ssr: false }
);
const Footer = dynamic(
  () =>
    import("@/components/layout/Footer").then((m) => ({
      default: m.Footer,
    })),
  { ssr: false }
);
const BackToTop = dynamic(
  () =>
    import("@/components/layout/BackToTop").then((m) => ({
      default: m.BackToTop,
    })),
  { ssr: false }
);
const CookieConsent = dynamic(
  () =>
    import("@/components/layout/CookieConsent").then((m) => ({
      default: m.CookieConsent,
    })),
  { ssr: false }
);

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          id="main-content"
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </LenisProvider>
  );
}