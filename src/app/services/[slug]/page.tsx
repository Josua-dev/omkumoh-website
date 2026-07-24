"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/data/services";
import { ArrowUpRight, CheckCircle, Building } from "lucide-react";
import { siteConfig } from "@/config/site";

const serviceIcons: Record<string, React.ReactNode> = {
  "civil-engineering": <Building size={40} />,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="relative flex min-h-[40vh] items-center bg-dark-blue">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <Container className="relative z-10 pt-24">
          <Link href="/services" className="mb-6 inline-flex items-center gap-2 text-sm text-steel-blue hover:text-soft-cyan">
            ← All Services
          </Link>
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
            </div>

            <div className="space-y-8">
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
