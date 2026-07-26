import { siteConfig } from "@/config/site";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EngineeringOrganization",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressLocality: "Windhoek",
          addressCountry: "NA",
        },
        sameAs: [
          siteConfig.links.facebook,
          siteConfig.links.twitter,
          siteConfig.links.linkedin,
          siteConfig.links.instagram,
        ],
        foundingDate: "2010",
        areaServed: {
          "@type": "Country",
          name: "Namibia",
        },
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        openingHours: "Mo-Fr 08:00-17:00",
        telephone: siteConfig.contact.phone,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}
