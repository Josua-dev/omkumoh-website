export interface CaseStudy {
  id: string;
  projectId: string;
  title: string;
  subtitle: string;
  heroImage: string;
  client: string;
  location: string;
  period: string;
  disciplines: string[];
  category: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  impact: { label: string; value: string }[];
  testimonial?: { quote: string; name: string; role: string };
  gallery: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "bon-solar-pv",
    projectId: "bon-solar-pv",
    title: "Bank of Namibia Solar PV Installation",
    subtitle: "Powering Namibia's Central Bank with Clean Energy",
    heroImage: "/images/projects/special-1.jpg",
    client: "Bank of Namibia",
    location: "Windhoek & Oshakati",
    period: "2018–2019",
    disciplines: ["Electrical Engineering", "Renewable Energy"],
    category: "renewable-energy",
    overview:
      "A landmark renewable energy project that saw the design and installation of grid-tied solar photovoltaic systems at the Bank of Namibia's Windhoek head office and Oshakati branch — reducing the central bank's reliance on grid electricity and advancing Namibia's national renewable energy agenda.",
    challenge:
      "The Bank of Namibia required a reliable, grid-tied solar PV system that could meaningfully offset its substantial energy consumption across two sites without compromising operational continuity. The Windhoek head office — a high-occupancy commercial building — demanded a complex roof-integrated array, while the Oshakati branch presented a smaller but logistically remote installation. Both sites needed seamless grid integration with zero downtime during commissioning, and the system had to meet stringent reliability standards befitting a national financial institution.",
    solution:
      "Our multidisciplinary team conducted detailed site assessments and energy audits at both locations, modelling solar irradiance data and consumption patterns to right-size each installation. We designed a grid-tied system with bi-directional metering, allowing surplus generation to feed back into the municipal grid. The Windhoek installation used high-efficiency monocrystalline panels with optimised tilt angles for maximum yield, while the Oshakati system was designed for the northern climate with enhanced dust mitigation and simplified maintenance access. Both installations included comprehensive SCADA monitoring for real-time performance tracking.",
    results: [
      "Reduced grid energy consumption by 30% across both sites",
      "Seamless grid integration with zero operational disruptions during commissioning",
      "Positive ROI within the projected 5-year window",
      "Enhanced energy resilience for the nation's central bank",
      "Demonstration project that catalysed further public-sector renewable energy adoption in Namibia",
    ],
    impact: [
      { label: "Energy Reduction", value: "30%" },
      { label: "System Capacity", value: "150 kWp" },
      { label: "CO₂ Offset", value: "~120 t/yr" },
      { label: "Project Term", value: "5-Year ROI" },
    ],
    testimonial: {
      quote:
        "OM'KUMOH's technical rigour and project management made this a benchmark public-sector renewable installation. The system has performed beyond expectations.",
      name: "T. Ipinge",
      role: "Facilities Manager, Bank of Namibia",
    },
    gallery: ["/images/projects/special-1.jpg", "/images/projects/special-2.jpg"],
  },
  {
    id: "namcor-oil-storage",
    projectId: "namcor-oil-storage",
    title: "Windhoek Oil Storage Facility",
    subtitle: "National Strategic Petroleum Infrastructure",
    heroImage: "/images/projects/special-2.jpg",
    client: "NAMCOR (National Petroleum Corporation of Namibia)",
    location: "Windhoek, Khomas Region",
    period: "2016–2019",
    disciplines: ["Civil Engineering", "Structural Engineering", "Mechanical Engineering", "Electrical Engineering"],
    category: "specialized",
    overview:
      "A multidisciplinary design and construction supervision project for a strategic petroleum storage facility in Windhoek — a critical piece of national energy infrastructure that enhances Namibia's fuel security and storage capacity.",
    challenge:
      "The project demanded integrated civil, structural, mechanical, and electrical engineering for a greenfield petroleum storage facility near Windhoek. Key challenges included: designing fuel-grade tank foundations and containment bunds to international standards; integrating fire suppression systems that met SANS and NFPA codes; ensuring absolute environmental containment with leak detection and groundwater monitoring; and coordinating multiple subcontractor workstreams on a critical-path schedule for the client's strategic fuel reserve programme.",
    solution:
      "Our team delivered a fully integrated design package spanning all four engineering disciplines. Civil works included site grading, stormwater management, and access roads. Structural engineering covered reinforced concrete tank foundations, containment bund walls, and a pump-gantry support structure. The mechanical scope included fuel-handling piping systems, transfer pumps, and tank gauging — while electrical engineering addressed lighting, lightning protection, instrumentation, and a dedicated fire detection and suppression control panel. We supervised construction through every phase, ensuring compliance with NAMCOR's stringent HSE requirements.",
    results: [
      "Successfully delivered Namibia's largest strategic fuel storage augmentation in the central region",
      "Full compliance with SANS, NFPA, and international petroleum industry standards",
      "Zero environmental incidents during construction — full containment systems operational",
      "Integrated fire suppression with foam and deluge systems covering all storage tanks",
      "Project completed within budget and on the client's strategic timeline",
    ],
    impact: [
      { label: "Storage Capacity", value: "Multi-Million Litre" },
      { label: "Engineering Disciplines", value: "4" },
      { label: "Safety Record", value: "Zero Incidents" },
      { label: "Project Duration", value: "3 Years" },
    ],
    testimonial: {
      quote:
        "The multidisciplinary coordination OM'KUMOH brought to this project was outstanding. They understood the strategic importance of this facility and delivered accordingly.",
      name: "M. Shivute",
      role: "Projects Director, NAMCOR",
    },
    gallery: ["/images/projects/special-2.jpg", "/images/projects/special-3.jpg"],
  },
  {
    id: "katima-mulilo-hq",
    projectId: "katima-mulilo-hq",
    title: "Katima Mulilo Town Council Head Offices",
    subtitle: "A Landmark Government Building in the Zambezi Region",
    heroImage: "/images/projects/special-3.jpg",
    client: "Katima Mulilo Town Council",
    location: "Katima Mulilo, Zambezi Region",
    period: "2013–2015",
    disciplines: ["Civil Engineering", "Structural Engineering", "Mechanical Engineering", "Electrical Engineering"],
    category: "building",
    overview:
      "OM'KUMOH's first major multidisciplinary project — the design and construction supervision of the Katima Mulilo Town Council headquarters. A 3-story government office building that set the standard for the firm's integrated engineering delivery model and established our reputation in northern Namibia.",
    challenge:
      "As one of OM'KUMOH's earliest large-scale projects, the Katima Mulilo headquarters presented unique challenges. The 3-story building required comprehensive civil, structural, and M&E design in a region with limited local engineering support infrastructure. Key challenges included: designing for the Zambezi Region's high water table and expansive soils; integrating full M&E building services (HVAC, fire protection, electrical, plumbing) into a government office layout; coordinating with multiple stakeholders across the Town Council's departments; and managing construction logistics for a site 1,200 km from Windhoek.",
    solution:
      "We deployed our full multidisciplinary team from the outset, with civil and structural engineers collaborating closely with M&E designers to produce an integrated building services solution. Foundation design accounted for the challenging geotechnical conditions with a reinforced concrete raft slab to mitigate soil movement. The structural frame used a ductile moment-resisting concrete frame designed to SANS 10160 loading standards. M&E services included a split-type HVAC system sized for the subtropical climate, a compliant fire detection and suppression network, and energy-efficient LED lighting throughout. Our site supervision team maintained a permanent presence in Katima Mulilo for the duration of construction.",
    results: [
      "First major multidisciplinary project delivered by OM'KUMOH as lead consultant",
      "Building completed to SANS compliance with zero structural defects",
      "HVAC system delivering consistent indoor comfort despite Zambezi's subtropical climate",
      "Project completed within the original contract budget and timeline",
      "Established OM'KUMOH as a credible multidisciplinary engineering firm in northern Namibia",
    ],
    impact: [
      { label: "Building Height", value: "3 Stories" },
      { label: "Engineering Disciplines", value: "4" },
      { label: "Project Year", value: "2013–2015" },
      { label: "Client Satisfaction", value: "100%" },
    ],
    testimonial: {
      quote:
        "OM'KUMOH delivered our headquarters to the highest standard. Their ability to coordinate all engineering disciplines under one roof saved us time and eliminated the usual consultant coordination headaches.",
      name: "C. Simataa",
      role: "Chief Executive Officer, Katima Mulilo Town Council (2013–2015)",
    },
    gallery: ["/images/projects/special-3.jpg", "/images/projects/special-4.jpg"],
  },
];

export const caseStudyCategories = [
  { label: "All Case Studies", value: "all" },
  { label: "Building", value: "building" },
  { label: "Renewable Energy", value: "renewable-energy" },
  { label: "Specialized", value: "specialized" },
] as const;