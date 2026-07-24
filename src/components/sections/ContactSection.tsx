"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { fadeInUp, stagger } from "@/config/animations";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief sending delay for UX feedback
    setTimeout(() => {
      window.location.href = `mailto:${siteConfig.contact.email}?subject=Website Enquiry from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      )}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <Section className="bg-gray-50" id="contact">
      <Container>
        <SectionHeader
          subtitle="Get in Touch"
          title="Start Your Next Project with OM'KUMOH"
          description="Ready to discuss your engineering needs? Our team is ready to help turn your vision into reality."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-2"
        >
          {/* Contact form */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-charcoal">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-charcoal">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue transition-all"
                    placeholder="+264 61 000 000"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-charcoal">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue transition-all"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Card className="p-8">
              <h3 className="mb-6 text-xl font-semibold text-charcoal">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-charcoal">Head Office</div>
                    <div className="mt-0.5 text-sm text-slate">{siteConfig.contact.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-charcoal">Phone</div>
                    <a href={`tel:${siteConfig.contact.phone}`} className="mt-0.5 block text-sm text-slate hover:text-steel-blue">
                      {siteConfig.contact.phone}
                    </a>
                    <a href={`tel:${siteConfig.contact.phoneAlt}`} className="block text-sm text-slate hover:text-steel-blue">
                      {siteConfig.contact.phoneAlt}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-charcoal">Email</div>
                    <a href={`mailto:${siteConfig.contact.email}`} className="mt-0.5 block text-sm text-slate hover:text-steel-blue">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-steel-blue/5 text-steel-blue">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-charcoal">Office Hours</div>
                    <div className="mt-0.5 text-sm text-slate">{siteConfig.contact.hours}</div>
                    <div className="text-sm text-gray-400">{siteConfig.contact.weekendHours}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-dark-blue text-white p-8">
              <h3 className="text-xl font-semibold">Career Enquiries</h3>
              <p className="mt-2 text-sm text-gray-300">
                Interested in joining our team? Send your CV and cover letter to our HR department.
              </p>
              <a
                href={`mailto:careers@omkumoh.com`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-steel-blue hover:text-soft-cyan"
              >
                careers@omkumoh.com →
              </a>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
