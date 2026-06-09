"use client";

import {
  LampCeiling,
  TreePine,
  ShieldCheck,
  Camera,
  Sprout,
  Footprints,
  ShoppingBag,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { cn } from "@/lib/utils";
import type { Facility } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  LampCeiling,
  TreePine,
  ShieldCheck,
  Camera,
  Sprout,
  Footprints,
  ShoppingBag,
};

export default function Facilities() {
  const { data: facilities, loading } = useData<Facility[]>(() =>
    fetch("/api/facilities").then((r) => r.json())
  );

  if (loading || !facilities) return null;

  return (
    <section className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionTitle
          title="Fasilitas Lengkap"
          subtitle="Nikmati berbagai fasilitas premium yang dirancang untuk kenyamanan seluruh keluarga."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility) => {
            const Icon = iconMap[facility.icon] || TreePine;
            return (
              <AnimatedSection key={facility.id}>
                <div className="group relative bg-surface rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
