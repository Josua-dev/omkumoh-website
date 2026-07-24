export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  megaMenu?: boolean;
  description?: string;
}

export type ServiceCategory =
  | "civil-engineering"
  | "structural-engineering"
  | "water-engineering"
  | "transportation-engineering"
  | "renewable-energy"
  | "mechanical-engineering"
  | "electrical-engineering"
  | "project-management"
  | "transaction-advisory"
  | "infrastructure-planning";

export interface Service {
  id: string;
  title: string;
  slug: ServiceCategory;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  caseStudies?: string[];
  disciplines: string[];
}

export type ProjectCategory =
  | "building"
  | "renewable-energy"
  | "municipal"
  | "transportation"
  | "specialized"
  | "water";

export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  status: ProjectStatus;
  period: string;
  startDate?: string;
  endDate?: string;
  location: string;
  region: string;
  description: string;
  scope: string;
  disciplines: string[];
  images?: string[];
  highlights?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
  bio?: string;
  qualifications: string[];
  specialties: string[];
  linkedin?: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
  project?: string;
}

export interface CompanyStat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: "milestone" | "project" | "achievement";
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface SustainabilityMetric {
  label: string;
  value: number;
  unit: string;
  description: string;
  icon: string;
  trend: "up" | "down" | "stable";
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  projectCount: number;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  coordinates: [number, number];
  hours: string;
}

export interface Affiliation {
  name: string;
  abbreviation: string;
  logo: string;
  description: string;
}
