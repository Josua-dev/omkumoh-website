"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { fadeInUp, stagger } from "@/config/animations";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="bg-gray-50" id="contact">
      <Container>
        <SectionHeader
          subtitle="Let's Build Something"
          title="Start Your Next Project"
          description="Tell us about your project and we'll show you how 15 years of Namibian engineering expertise can bring it to life — on time, on budget, and built to last."
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Full Name *"
                    id="name"
                    error={errors.name?.message}
                    placeholder="Your name"
                    autoComplete="name"
                    {...register("name")}
                  />
                  <Input
                    label="Email Address *"
                    id="email"
                    type="email"
                    error={errors.email?.message}
                    placeholder="your@email.com"
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>
                <Input
                  label="Phone Number"
                  id="phone"
                  error={errors.phone?.message}
                  placeholder="+264 61 000 000"
                  autoComplete="tel"
                  {...register("phone")}
                />
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-charcoal">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-steel-blue/30 focus:border-steel-blue disabled:cursor-not-allowed disabled:opacity-50 border-gray-200"
                    placeholder="Tell us about your project..."
                    {...register("message")}
                  />
                  {errors.message?.message && (
                    <p role="alert" className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
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
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-copper hover:text-copper-dark"
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
