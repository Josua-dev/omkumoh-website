import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipNav } from "@/components/layout/SkipNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Namibia`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "engineering consultants Namibia",
    "civil engineering Namibia",
    "structural engineering",
    "mechanical engineering",
    "electrical engineering",
    "water engineering",
    "transportation engineering",
    "renewable energy Namibia",
    "infrastructure development",
    "Windhoek engineers",
  ],
  openGraph: {
    title: `${siteConfig.name} | Namibia`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Namibia`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#0F1B2D",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <SkipNav />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <JsonLd />
      </body>
    </html>
  );
}
