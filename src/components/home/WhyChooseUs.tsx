"use client";

import {
  Crosshair,
  Umbrella,
  Fingerprint,
  SwatchBook,
  TrendingUp,
  TreePine,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

const benefits = [
  {
    icon: Crosshair,
    title: "Lokasi Strategis",
    description:
      "Dekat dengan pusat kota, akses tol, sekolah, rumah sakit, dan pusat perbelanjaan.",
  },
  {
    icon: Umbrella,
    title: "Bebas Banjir",
    description:
      "Area bebas banjir dengan sistem drainase modern dan pengelolaan air yang baik.",
  },
  {
    icon: Fingerprint,
    title: "One Gate System",
    description:
      "Sistem satu pintu dengan keamanan 24 jam dan CCTV di setiap sudut cluster.",
  },
  {
    icon: SwatchBook,
    title: "Desain Modern",
    description:
      "Arsitektur kontemporer dengan material berkualitas tinggi dan finishing premium.",
  },
  {
    icon: TrendingUp,
    title: "Potensi Investasi",
    description:
      "Nilai properti terus meningkat setiap tahun dengan lokasi yang terus berkembang.",
  },
  {
    icon: TreePine,
    title: "Fasilitas Lengkap",
    description:
      "Masjid, taman, playground, jogging track, dan area komersial terpadu.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionTitle
          title="Mengapa Memilih Grand Astra?"
          subtitle="Kami menghadirkan hunian terbaik dengan berbagai keunggulan yang sulit ditandingi."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <AnimatedSection key={benefit.title} direction="none">
              <div className="group relative bg-surface rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
