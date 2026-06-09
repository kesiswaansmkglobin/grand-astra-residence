"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85",
    alt: "Rumah tampak depan",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=85",
    alt: "Ruang tamu",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
    alt: "Taman",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85",
    alt: "Kamar tidur",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
    alt: "Kolam renang",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-cacf3ee192d8?w=800&q=85",
    alt: "Interior dapur",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const prev = useCallback(() => {
    setSelected((s) => (s !== null ? (s - 1 + images.length) % images.length : null));
  }, []);

  const next = useCallback(() => {
    setSelected((s) => (s !== null ? (s + 1) % images.length : null));
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-dark">
      <Container>
        <SectionTitle
          title="Galeri"
          subtitle="Lihat langsung keindahan dan kualitas hunian Grand Astra Residence."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <AnimatedSection key={i}>
              <button
                onClick={() => setSelected(i)}
                className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5 cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-white/20 transition-colors duration-300" />
              </button>
            </AnimatedSection>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white z-10"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-white/60 hover:text-white z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 text-white/60 hover:text-white z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selected + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
