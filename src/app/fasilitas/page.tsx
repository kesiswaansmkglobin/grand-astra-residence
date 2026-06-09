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
import Image from "next/image";
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

export default function FacilitiesPage() {
  const { data: facilities, loading } = useData<Facility[]>(() =>
    fetch("/api/facilities").then((r) => r.json())
  );

  if (loading) {
    return (
      <section className="pt-32 pb-20">
        <Container>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Fasilitas Lengkap"
            subtitle="Grand Astra Residence menyediakan berbagai fasilitas premium untuk menunjang kenyamanan dan kebahagiaan keluarga Anda."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="space-y-16">
            {facilities?.map((facility, i) => {
              const Icon = iconMap[facility.icon] || TreePine;
              const isReversed = i % 2 === 1;

              return (
                <AnimatedSection key={facility.id}>
                  <div
                    className={cn(
                      "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                      isReversed && "lg:direction-rtl"
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 shadow-sm",
                        isReversed && "lg:order-1"
                      )}
                    >
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className={isReversed ? "lg:order-0" : ""}>
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                          "bg-gold/10 text-gold"
                        )}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                        {facility.name}
                      </h2>
                      <p className="text-text-secondary leading-relaxed text-lg">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
