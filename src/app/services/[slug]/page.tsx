"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/data/services";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

// Gallery image mapping per service
const galleryMap: Record<string, string[]> = {
  "civil-engineering": ["/images/services/civil-1.webp", "/images/services/civil-2.webp", "/images/services/civil-3.webp"],
  "electrical-engineering": ["/images/services/electrical-1.webp", "/images/services/electrical-2.webp", "/images/services/electrical-3.webp"],
  "mechanical-engineering": ["/images/services/mech-1.webp", "/images/services/mech-2.webp", "/images/services/mech-3.webp"],
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);
  const [galleryIdx, setGalleryIdx] = useState(0);

  if (!service) {
    return (
      <Section className="min-h-screen bg-white pt-32">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-charcoal">Service Not Found</h1>
          <p className="mt-4 text-slate">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-steel-blue font-medium">
            ← Back to Services
          </Link>
        </Container>
      </Section>
    );
  }

  const gallery = galleryMap[service.id] || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.title }]} className="mb-6" />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-white md:text-7xl">
            {service.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl text-lg text-gray-300">
            {service.shortDescription}
          </motion.p>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Overview</h2>
              <p className="text-lg leading-relaxed text-slate">{service.description}</p>

              <h2 className="text-2xl font-bold text-charcoal mt-12 mb-6">Key Capabilities</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-steel-blue" />
                    <span className="text-slate">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-charcoal mb-6">Project Gallery</h2>
                  <div className="relative overflow-hidden rounded-2xl bg-gray-50">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={gallery[galleryIdx]}
                        alt={`${service.title} — project image ${galleryIdx + 1}`}
                        fill
                        className="object-cover transition-opacity duration-500"
                      />
                    </div>
                    {gallery.length > 1 && (
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/40 to-transparent p-4">
                        <button
                          onClick={() => setGalleryIdx((g) => (g - 1 + gallery.length) % gallery.length)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setGalleryIdx(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === galleryIdx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                              }`}
                              aria-label={`Go to image ${i + 1}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setGalleryIdx((g) => (g + 1) % gallery.length)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {service.image && (
                <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Card className="p-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Service Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-charcoal">Disciplines</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.disciplines.map((d) => (
                        <Badge key={d}>{d}</Badge>
                      ))}
                    </div>
                  </div>
                  {service.caseStudies && service.caseStudies.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-charcoal">Related Projects</div>
                      <ul className="mt-2 space-y-2">
                        {service.caseStudies.map((cs) => (
                          <li key={cs} className="text-sm text-slate flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-steel-blue" />
                            {cs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="bg-dark-blue text-white p-8">
                <h3 className="text-lg font-semibold mb-2">Need Engineering Support?</h3>
                <p className="text-sm text-gray-300 mb-4">Contact our team to discuss your project requirements.</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="block w-full rounded-full bg-steel-blue px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-steel-blue/90"
                >
                  Call {siteConfig.contact.phone}
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}