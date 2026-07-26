"use client";

import dynamic from "next/dynamic";

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

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </LenisProvider>
  );
}
