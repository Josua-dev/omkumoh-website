export const siteConfig = {
  name: "OM'KUMOH Consulting Engineers",
  shortName: "OM'KUMOH",
  tagline: "Engineering Namibia's Future",
  description:
    "OM'KUMOH Consulting Engineers is a Namibian multidisciplinary engineering consultancy specializing in civil, structural, mechanical, electrical, and transportation engineering, providing innovative and sustainable infrastructure solutions since 2010.",
  url: "https://www.omkumoh.com.na",
  ogImage: "/og-image.jpg",
  founderYear: 2010,
  links: {
    facebook: "https://facebook.com/omkumoh",
    twitter: "https://twitter.com/omkumoh",
    linkedin: "https://linkedin.com/company/omkumoh",
    instagram: "https://instagram.com/omkumoh",
  },
  contact: {
    phone: "+264 61 232 052",
    phoneAlt: "+264 61 304 220",
    phoneAlt2: "+264 61 307 087",
    email: "admin@omkumoh.com",
    address: "44 Hebenstreit Street, Ludwigsdorf, Windhoek, Namibia",
    hours: "Monday – Friday: 8:00 – 17:00",
    weekendHours: "Saturday – Sunday: Closed",
  },
  professionalRegistrations: [
    "Engineering Council of Namibia (ECN)",
    "Association of Consulting Engineers of Namibia (ACEN)",
  ],
} as const;

export const siteMetadata = {
  title: {
    default: "OM'KUMOH Consulting Engineers | Namibia",
    template: "%s | OM'KUMOH Consulting Engineers",
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
    "project management Namibia",
    "infrastructure development",
    "Windhoek engineers",
    "OMKUMOH",
    "construction consulting Namibia",
  ],
};
