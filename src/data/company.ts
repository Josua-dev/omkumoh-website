import { CompanyStat, TeamMember, TimelineEvent, Value, Affiliation, Office } from "@/types";

export const companyInfo = {
  name: "OM'KUMOH Consulting Engineers",
  shortName: "OM'KUMOH",
  founded: 2010,
  headquarters: "44 Hebenstreit Street, Ludwigsdorf, Windhoek, Namibia",
  phone: "+264 61 232 052",
  phoneAlt: "+264 61 232 053",
  fax: "+264 61 232 054",
  email: "admin@omkumoh.com",
  vision:
    "To be the preferred engineering based consulting firm in Namibia.",
  mission:
    "To build on our existing reputation as a front-runner in professional consulting engineering services by maintaining high standards through the application of appropriate technology, innovative thinking, and the exercise of the highest standards of skill, care, and due diligence on every project we undertake.",
};

export const values: Value[] = [
  {
    title: "Engineering Excellence",
    description:
      "We uphold the highest standards of technical precision and quality in every project, drawing on deep expertise across all engineering disciplines.",
    icon: "trophy",
  },
  {
    title: "Innovation",
    description:
      "We embrace cutting-edge technology and innovative design approaches to deliver solutions that are both forward-thinking and practical.",
    icon: "lightbulb",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to environmentally responsible engineering that balances development needs with ecological stewardship for future generations.",
    icon: "leaf",
  },
  {
    title: "Integrity",
    description:
      "We conduct our business with the utmost professionalism, transparency, and ethical standards, building trust with every client partnership.",
    icon: "shield",
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of collaborative partnerships — working closely with clients, stakeholders, and communities to achieve shared goals.",
    icon: "handshake",
  },
  {
    title: "Community",
    description:
      "We are deeply invested in Namibia's development, contributing our expertise to build infrastructure that improves lives and empowers communities.",
    icon: "building",
  },
];

export const stats: CompanyStat[] = [
  { value: 15, label: "Years of Excellence", suffix: "+" },
  { value: 120, label: "Projects Completed", suffix: "+" },
  { value: 14, label: "Namibian Regions Served", suffix: "" },
  { value: 50, label: "Engineering Professionals", suffix: "+" },
];

export const team: TeamMember[] = [
  {
    name: "Johannes Hafeni",
    role: "Managing Director",
    department: "Civil & Structural",
    image: "/images/team/johannes-hafeni.webp",
    qualifications: ["B.Eng Civil Engineering", "M.Sc Structural Engineering", "Pr.Eng (ECN)"],
    specialties: ["Structural Design", "Project Management", "Infrastructure Development"],
    bio: "Over 20 years of experience leading complex engineering projects across Namibia.",
  },
  {
    name: "Erastus Shikongo",
    role: "Director of Engineering",
    department: "Civil & Structural",
    image: "/images/team/erastus-shikongo.webp",
    qualifications: ["B.Eng Civil Engineering", "MBA", "Pr.Eng (ECN)"],
    specialties: ["Transportation Engineering", "Water Infrastructure", "Municipal Services"],
    bio: "Specializes in large-scale transportation and municipal infrastructure projects.",
  },
  {
    name: "Martha Ndapandula",
    role: "Head of Mechanical & Electrical",
    department: "Mechanical & Electrical",
    image: "/images/team/martha-ndapandula.webp",
    qualifications: ["B.Eng Mechanical Engineering", "M.Eng Energy Systems", "Pr.Eng (ECN)"],
    specialties: ["HVAC Design", "Renewable Energy", "Fire Protection Systems"],
    bio: "Leads multidisciplinary M&E teams on healthcare, commercial, and industrial projects.",
  },
  {
    name: "Tomas Amutenya",
    role: "Senior Structural Engineer",
    department: "Civil & Structural",
    image: "/images/team/tomas-amutenya.webp",
    qualifications: ["B.Eng Civil Engineering", "M.Sc Structural Engineering", "Pr.Eng (ECN)"],
    specialties: ["Steel Structures", "Concrete Design", "Seismic Analysis"],
    bio: "Expert in structural design for commercial, institutional, and industrial buildings.",
  },
  {
    name: "Selma Kadhila",
    role: "Senior Electrical Engineer",
    department: "Mechanical & Electrical",
    image: "/images/team/selma-kadhila.webp",
    qualifications: ["B.Eng Electrical Engineering", "Pr.Eng (ECN)"],
    specialties: ["Power Systems", "Solar Photovoltaic", "Building Services"],
    bio: "Over 15 years experience in electrical building services and renewable energy systems.",
  },
  {
    name: "Michael Namundjebo",
    role: "Project Manager",
    department: "Technical and Administration",
    image: "/images/team/michael-namundjebo.webp",
    qualifications: ["B.Sc Construction Management", "PMP", "Pr.CM"],
    specialties: ["Project Controls", "Contract Administration", "Risk Management"],
    bio: "Ensures projects are delivered on time, within budget, and to the highest quality standards.",
  },
];

export const affiliations: Affiliation[] = [
  { name: "Engineering Council of Namibia", abbreviation: "ECN", logo: "/images/affiliations/ecn.png", description: "Professional regulatory body" },
  { name: "Association of Consulting Engineers of Namibia", abbreviation: "ACEN", logo: "/images/affiliations/acen.png", description: "Industry association" },
  { name: "Engineering Professions Association Namibia", abbreviation: "EPA", logo: "/images/affiliations/epa.png", description: "Professional association" },
  { name: "South African Institution of Civil Engineering", abbreviation: "SAICE", logo: "/images/affiliations/saice.png", description: "Professional society" },
  { name: "South African Institution of Mechanical Engineering", abbreviation: "SAIMechE", logo: "/images/affiliations/saimeche.png", description: "Professional society" },
  { name: "South African Institute of Electrical Engineers", abbreviation: "SAIEE", logo: "/images/affiliations/saiee.png", description: "Professional institute" },
];

export const offices: Office[] = [
  {
    city: "Windhoek (Head Office)",
    address: "44 Hebenstreit Street, Ludwigsdorf, Windhoek, Namibia",
    postal: "P.O. Box 887, Windhoek, Namibia",
    phone: "+264 61 232 052",
    email: "admin@omkumoh.com",
    coordinates: [-22.5705, 17.0738],
    hours: "Mon–Fri: 8:00–17:00",
  },
];

export const timeline: TimelineEvent[] = [
  { year: 2010, title: "Founded in Windhoek", description: "OM'KUMOH Consulting Engineers was established with a vision to deliver exceptional engineering services across Namibia.", type: "milestone" },
  { year: 2011, title: "First Major Contracts", description: "Secured first government contracts with Ministry of Health and Ministry of Defence.", type: "project" },
  { year: 2013, title: "Multidisciplinary Expansion", description: "Expanded services to include full mechanical and electrical engineering capabilities.", type: "milestone" },
  { year: 2014, title: "Regional Project Delivery", description: "Delivered projects across all 14 regions of Namibia, establishing national presence.", type: "achievement" },
  { year: 2016, title: "Transportation Division Launch", description: "Launched dedicated transportation engineering division with Roads Authority contracts.", type: "milestone" },
  { year: 2018, title: "Renewable Energy Milestone", description: "Completed solar PV installations for Bank of Namibia, entering renewable energy sector.", type: "project" },
  { year: 2019, title: "Specialized Infrastructure Growth", description: "Expanded into oil storage, water treatment, and specialized infrastructure projects.", type: "project" },
  { year: 2020, title: "100 Projects Achieved", description: "Reached milestone of 100+ completed projects across all engineering disciplines.", type: "achievement" },
  { year: 2023, title: "Digital Transformation", description: "Adopted advanced BIM and digital engineering technologies for enhanced project delivery.", type: "milestone" },
  { year: 2025, title: "Continued Growth", description: "Ongoing expansion of services with major infrastructure projects nationwide.", type: "achievement" },
];
