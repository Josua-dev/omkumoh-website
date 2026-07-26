import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { mainNavigation } from "@/data/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();
  const added = new Set<string>();

  const entries: MetadataRoute.Sitemap = [];

  // Helper to add an entry, skipping duplicates
  function add(
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) {
    const url = path === "/" ? baseUrl : `${baseUrl}${path}`;
    if (added.has(url)) return;
    added.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  }

  // === Homepage ===
  add("/", 1.0, "weekly");

  // === Main navigation items (top-level) ===
  for (const item of mainNavigation) {
    if (item.href === "/") continue; // already added
    add(item.href, 0.9);

    // Sub-navigation children (e.g. About > Leadership, CSR)
    if (item.children) {
      for (const child of item.children) {
        add(child.href, 0.8);
      }
    }
  }

  // === Service detail pages (/services/{slug}) ===
  for (const service of services) {
    add(`/services/${service.slug}`, 0.7);
  }

  // === Project detail pages (/projects/{id}) ===
  for (const project of projects) {
    add(`/projects/${project.id}`, 0.6);
  }

  // === Ensure all explicitly required pages are present ===
  // (they may already be added above, but add() is idempotent)
  add("/about", 0.9);
  add("/about/leadership", 0.8);
  add("/about/csr", 0.8);
  add("/sustainability", 0.8);
  add("/contact", 0.8);

  return entries;
}
