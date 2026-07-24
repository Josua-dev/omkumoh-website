import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "civil-engineering",
    title: "Civil Engineering",
    slug: "civil-engineering",
    shortDescription:
      "Comprehensive civil engineering services from due diligence to contract supervision, specializing in municipal infrastructure and land development.",
    description:
      "Our civil engineering capabilities encompass a full range of services from due diligence investigations to preparation of contract plans, specifications, and construction supervision. We develop site plans that comply with environmental and land-use regulations while maximizing utility and ensuring cost-effective, timely delivery. Our team has delivered municipal services, roads, stormwater management, and water reticulation projects across Namibia.",
    icon: "building",
    features: [
      "Feasibility studies and site investigations",
      "Stormwater drainage design and management",
      "Water and sewer reticulation networks",
      "Residential, commercial, and industrial site development",
      "Construction supervision and contract administration",
      "Environmental compliance and land-use planning",
      "Bulk earthworks and grading design",
      "Municipal infrastructure master planning",
    ],
    disciplines: ["Civil Engineering", "Water Engineering", "Project Management"],
    caseStudies: ["Otavi Town Council Offices", "Katima Mulilo Town Council", "Ondangwa Municipal Services"],
  },
  {
    id: "structural-engineering",
    title: "Structural Engineering",
    slug: "structural-engineering",
    shortDescription:
      "Expert structural design for commercial, institutional, industrial, and residential buildings with extensive experience across Namibia.",
    description:
      "Our structural engineering team brings extensive experience in the design of reinforced concrete, structural steel, masonry, and timber structures. We deliver innovative, cost-effective structural solutions for buildings of all scales — from healthcare facilities and government offices to commercial developments and industrial structures. Every design is optimized for safety, durability, and constructability.",
    icon: "ruler",
    features: [
      "Reinforced concrete design (beams, slabs, columns, foundations)",
      "Structural steel design and connection detailing",
      "Masonry and timber structure design",
      "Foundation engineering (shallow and deep foundations)",
      "Structural assessments and condition surveys",
      "Retrofitting and rehabilitation design",
      "3D structural modeling and analysis",
      "Construction-stage structural support",
    ],
    disciplines: ["Structural Engineering", "Civil Engineering"],
    caseStudies: ["Hardap Regional Council HQ", "Heinitzburg Heights", "Nored Head Offices"],
  },
  {
    id: "water-engineering",
    title: "Water Engineering",
    slug: "water-engineering",
    shortDescription:
      "Complete water engineering solutions including supply networks, storage, treatment facilities, and master planning for communities across Namibia.",
    description:
      "We provide comprehensive water engineering services addressing Namibia's unique water challenges. Our expertise spans bulk water supply networks, storage reservoirs, wastewater treatment, borehole development, and water master planning. We are committed to delivering sustainable water solutions that ensure reliable access to clean water for communities, industry, and agriculture.",
    icon: "droplets",
    features: [
      "Water storage reservoirs and dam design",
      "Wastewater treatment facility design",
      "Bulk water supply network design",
      "Booster pump station design and specification",
      "Elevated water tower design (pressed steel and LDPE)",
      "Water master planning and demand analysis",
      "Borehole development and groundwater augmentation",
      "Sewer reticulation and treatment systems",
    ],
    disciplines: ["Civil Engineering", "Water Engineering", "Mechanical Engineering"],
    caseStudies: ["Sesfontein Water Supply", "Okongo Sewerage Treatment Plant", "NamWater Groundwater"],
  },
  {
    id: "transportation-engineering",
    title: "Transportation Engineering",
    slug: "transportation-engineering",
    shortDescription:
      "Full-service transportation engineering covering road design, highways, rural roads, and transportation infrastructure nationwide.",
    description:
      "Our transportation engineering division provides a comprehensive service covering feasibility studies, geometric design, pavement rehabilitation, drainage design, and construction supervision for roads and highways. We have delivered projects ranging from rural gravel-to-bitumen upgrades to municipal road networks and haul roads for mining and industrial clients.",
    icon: "route",
    features: [
      "Feasibility studies and traffic analysis",
      "Geometric design and alignment optimization",
      "Pavement and rehabilitation design",
      "Drainage and hydraulic design",
      "Road safety audits and visual assessments",
      "Material and borrow pit investigation",
      "Route determination and corridor selection",
      "Road marking, signage, and intelligent transport systems",
    ],
    disciplines: ["Transportation Engineering", "Civil Engineering"],
    caseStudies: ["DR3639 Oshikango-Ondobe Road", "DR3507 Bukalo-Ngoma Road", "Borrow Pit Network Investigation"],
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    slug: "renewable-energy",
    shortDescription:
      "Sustainable energy solutions including solar photovoltaic systems, energy efficiency consulting, and renewable energy integration for public and private clients.",
    description:
      "We deliver end-to-end renewable energy solutions tailored to Namibia's abundant solar resources. Our team has designed and supervised the installation of solar photovoltaic systems for major institutions, reducing carbon footprints and energy costs. We provide energy audits, feasibility studies, system design, procurement support, and construction supervision for renewable energy projects.",
    icon: "sun",
    features: [
      "Solar photovoltaic system design and installation supervision",
      "Grid-tied and off-grid renewable energy systems",
      "Energy efficiency audits and consulting",
      "Feasibility studies and resource assessment",
      "Battery energy storage system design",
      "Renewable energy master planning",
      "Power quality assessment and monitoring",
      "Hybrid energy system integration",
    ],
    disciplines: ["Electrical Engineering", "Mechanical Engineering", "Project Management"],
    caseStudies: [
      "Bank of Namibia Solar PV Installation",
      "Muparara Clinic Solar System",
      "Seaflower Power Quality Assessment",
    ],
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    slug: "mechanical-engineering",
    shortDescription:
      "Complete mechanical engineering design services including HVAC, fire protection, plumbing, and building services for all project types.",
    description:
      "Our mechanical engineering team provides a complete range of design services covering HVAC systems, fire protection, plumbing, and mechanical building services. We have extensive experience designing mechanical systems for healthcare facilities, government buildings, commercial developments, and industrial projects, ensuring optimal indoor comfort, safety, and energy efficiency.",
    icon: "cog",
    features: [
      "HVAC system design and load calculations",
      "Fire protection system design (sprinklers, hydrants, suppression)",
      "Plumbing and drainage system design",
      "Mechanical ventilation and smoke control",
      "Lift and escalator system coordination",
      "Energy-efficient mechanical system selection",
      "Building management system integration",
      "Mechanical condition assessments and audits",
    ],
    disciplines: ["Mechanical Engineering", "Electrical Engineering", "Project Management"],
    caseStudies: ["Opuwo Government Garage", "Outapi Hospital", "Osona Military Base Kitchen"],
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    slug: "electrical-engineering",
    shortDescription:
      "Innovative electrical engineering services focusing on efficient energy utilization, power systems, and building electrical infrastructure.",
    description:
      "Our electrical engineering division delivers innovative electrical design solutions that ensure efficient utilization of energy. We specialize in power distribution, lighting design, fire detection, security systems, and electrical infrastructure for buildings and municipal services. Our team brings deep expertise in both low-voltage and medium-voltage electrical systems, always prioritizing energy efficiency and reliability.",
    icon: "zap",
    features: [
      "Electrical building services design",
      "Power distribution and reticulation",
      "Lighting design (interior, exterior, emergency)",
      "Fire detection and alarm systems",
      "Security and access control systems",
      "Medium and low voltage switchgear specification",
      "Electrical reticulation for municipal services",
      "Power quality assessment and harmonic analysis",
    ],
    disciplines: ["Electrical Engineering", "Mechanical Engineering"],
    caseStudies: [
      "Nored Head Offices Electrification",
      "Otavi Electrical Services",
      "Ekolola Settlement Electrification",
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    slug: "project-management",
    shortDescription:
      "Professional project and construction management ensuring timely, budget-conscious delivery of complex engineering projects.",
    description:
      "Our project management practice ensures that every project is delivered on time, within budget, and to the highest quality standards. We provide full project management services including scope definition, scheduling, cost control, risk management, quality assurance, and stakeholder communication. Our certified project managers bring engineering domain expertise to every engagement.",
    icon: "clipboard",
    features: [
      "Project planning and scheduling",
      "Cost estimation and budget control",
      "Risk assessment and mitigation",
      "Quality assurance and quality control",
      "Contract administration and procurement",
      "Stakeholder management and reporting",
      "Construction monitoring and site supervision",
      "Project close-out and handover",
    ],
    disciplines: ["Project Management", "Civil Engineering", "Structural Engineering"],
    caseStudies: ["AIJ Head Offices", "Namcor Petroleum Infrastructure", "Ondangwa Sports Stadium Feasibility"],
  },
  {
    id: "infrastructure-planning",
    title: "Infrastructure Planning",
    slug: "infrastructure-planning",
    shortDescription:
      "Strategic infrastructure planning and feasibility studies for municipal, regional, and national development projects.",
    description:
      "We provide strategic infrastructure planning services that help clients make informed decisions about capital investments. Our planning engagements encompass feasibility studies, master planning, infrastructure needs assessments, and development frameworks. We combine technical engineering expertise with economic analysis to deliver practical, implementable infrastructure strategies.",
    icon: "compass",
    features: [
      "Infrastructure master planning",
      "Feasibility studies and options analysis",
      "Infrastructure needs assessment",
      "Development frameworks and strategies",
      "Capital investment planning",
      "Environmental and social impact assessment",
      "Stakeholder consultation and engagement",
      "Regulatory approval and permitting support",
    ],
    disciplines: ["Civil Engineering", "Project Management", "Transportation Engineering"],
    caseStudies: ["Oniipa Stormwater Masterplan", "Municipal Services Planning", "Regional Infrastructure Assessment"],
  },
  {
    id: "transaction-advisory",
    title: "Transaction Advisory",
    slug: "transaction-advisory",
    shortDescription:
      "Technical advisory services supporting infrastructure transactions, due diligence, and investment decision-making.",
    description:
      "Our transaction advisory practice provides independent technical due diligence, vendor assistance, and technical advisory services for infrastructure investments and transactions. We help clients assess technical risks, evaluate infrastructure assets, and make informed investment decisions with confidence.",
    icon: "briefcase",
    features: [
      "Technical due diligence for infrastructure assets",
      "Vendor assistance and technical reporting",
      "Infrastructure asset valuation support",
      "Technical risk assessment and mitigation",
      "Independent engineering reviews",
      "Feasibility validation and review",
      "Technical specifications for procurement",
      "Construction progress monitoring for lenders",
    ],
    disciplines: ["Project Management", "All Engineering Disciplines"],
    caseStudies: ["Infrastructure Asset Assessments", "Technical Due Diligence Engagements"],
  },
];

export const serviceCategories = [
  { label: "All Services", value: "all" },
  { label: "Civil & Structural", value: "civil-structural" },
  { label: "Mechanical & Electrical", value: "mechanical-electrical" },
  { label: "Planning & Advisory", value: "planning-advisory" },
];
