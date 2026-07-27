import { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", description: "Our story and philosophy" },
      { label: "Leadership", href: "/about/leadership", description: "Meet our team" },
      { label: "CSR", href: "/about/csr", description: "Corporate social responsibility" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    megaMenu: true,
    children: [
      { label: "Civil Engineering", href: "/services/civil-engineering" },
      { label: "Structural Engineering", href: "/services/structural-engineering" },
      { label: "Water Engineering", href: "/services/water-engineering" },
      { label: "Transportation Engineering", href: "/services/transportation-engineering" },
      { label: "Renewable Energy", href: "/services/renewable-energy" },
      { label: "Mechanical Engineering", href: "/services/mechanical-engineering" },
      { label: "Electrical Engineering", href: "/services/electrical-engineering" },
      { label: "Project Management", href: "/services/project-management" },
      { label: "Infrastructure Planning", href: "/services/infrastructure-planning" },
      { label: "Transaction Advisory", href: "/services/transaction-advisory" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects", description: "Our complete portfolio" },
      { label: "Case Studies", href: "/case-studies", description: "Deep-dive technical narratives" },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
  },
  {
    label: "Insights",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
