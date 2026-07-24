import { SustainabilityMetric } from "@/types";

export const sustainabilityData = {
  intro:
    "At OM'KUMOH, sustainability is at the core of our engineering philosophy. We are committed to delivering infrastructure solutions that balance development needs with environmental stewardship, ensuring a resilient and sustainable future for Namibia.",
  approach: [
    {
      title: "Green Engineering Design",
      description:
        "We integrate sustainable design principles into every project, optimizing energy efficiency, water conservation, and material selection to minimize environmental impact.",
      icon: "leaf",
    },
    {
      title: "Renewable Energy Integration",
      description:
        "We champion the transition to renewable energy through solar PV design, energy audits, and sustainable energy solutions for public and private sector clients.",
      icon: "sun",
    },
    {
      title: "Climate Resilience",
      description:
        "Our infrastructure designs account for climate change impacts, incorporating resilience measures that protect communities and assets for decades to come.",
      icon: "shield",
    },
    {
      title: "Community Empowerment",
      description:
        "We engage with local communities to ensure our projects deliver lasting social value, from job creation to skills transfer and improved access to essential services.",
      icon: "users",
    },
  ],
  metrics: [
    {
      label: "Solar PV Installed Capacity",
      value: 500,
      unit: "kWp",
      description: "Of solar photovoltaic systems designed and installed",
      icon: "sun",
      trend: "up",
    },
    {
      label: "Water Infrastructure Projects",
      value: 25,
      unit: "+",
      description: "Water supply and treatment projects delivered",
      icon: "droplets",
      trend: "up",
    },
    {
      label: "Energy Cost Reduction",
      value: 30,
      unit: "%",
      description: "Average energy savings on solar PV projects",
      icon: "zap",
      trend: "up",
    },
    {
      label: "Communities Impacted",
      value: 60,
      unit: "+",
      description: "Rural communities served through infrastructure projects",
      icon: "building",
      trend: "up",
    },
  ] as SustainabilityMetric[],
  initiatives: [
    {
      title: "Eco-Efficient Building Design",
      description:
        "Promoting energy-efficient building services design that reduces operational carbon footprints across all our projects.",
      status: "active",
    },
    {
      title: "Solar Energy Adoption Program",
      description:
        "Facilitating the transition to solar energy for public institutions, reducing reliance on grid electricity and lowering carbon emissions.",
      status: "active",
    },
    {
      title: "Water Conservation in Design",
      description:
        "Implementing water-efficient designs and wastewater treatment solutions that preserve Namibia's precious water resources.",
      status: "active",
    },
    {
      title: "Green Infrastructure Master Planning",
      description:
        "Incorporating green infrastructure principles into municipal and regional master plans for sustainable urban development.",
      status: "ongoing",
    },
  ],
};
