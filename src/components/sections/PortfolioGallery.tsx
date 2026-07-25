"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, SectionHeader } from "@/components/ui/Container";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/images/slider/slide-1.jpg", alt: "OM'KUMOH Engineering Project 1" },
  { src: "/images/slider/slide-2.jpg", alt: "OM'KUMOH Engineering Project 2" },
  { src: "/images/slider/slide-3.jpg", alt: "OM'KUMOH Engineering Project 3" },
  { src: "/images/slider/slide-4.jpg", alt: "OM'KUMOH Engineering Project 4" },
  { src: "/images/projects/special-1.jpg", alt: "NAMCOR Oil Storage Facility" },
  { src: "/images/projects/special-2.jpg", alt: "Okongo Sewerage Treatment Plant" },
  { src: "/images/projects/special-3.jpg", alt: "Sesfontein Water Supply" },
  { src: "/images/projects/special-4.jpg", alt: "Ekolola Settlement Electrification" },
];

export function PortfolioGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Section className="bg-gray-50" id="gallery">
        <Container>
          <SectionHeader
            subtitle="Our Portfolio"
            title="Project Gallery"
            description="A selection of engineering projects showcasing our multidisciplinary expertise across Namibia."
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {galleryImages.map((img, i) => (
              <motion.button
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedImage(img.src)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </motion.button>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Project gallery image"
                width={1200}
                height={800}
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
