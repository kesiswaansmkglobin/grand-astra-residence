"use client";

import Image from "next/image";
import { ChevronRight, Maximize2, Layers, Bed } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

export default function FeaturedUnits() {
  const { data: properties, loading } = useData<Property[]>(() =>
    fetch("/api/properties").then((r) => r.json())
  );

  if (loading || !properties) return null;

  const featured = properties.filter((p) => p.status !== "sold").slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-dark">
      <Container>
        <SectionTitle
          title="Unit Tersedia"
          subtitle="Pilih hunian impian Anda dari berbagai tipe unit yang kami tawarkan."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <AnimatedSection key={property.id}>
              <div className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant={property.status} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-gold text-lg font-bold drop-shadow-sm">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {property.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{property.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {property.landArea} m²
                      </span>
                      <p className="text-xs text-text-secondary">Tanah</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {property.buildingArea} m²
                      </span>
                      <p className="text-xs text-text-secondary">Bangunan</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
                        <Bed className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {property.bedrooms}
                      </span>
                      <p className="text-xs text-text-secondary">K.Tidur</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group/btn"
                    onClick={() =>
                      (window.location.href = `/properti/${property.slug}`)
                    }
                  >
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = "/properti")}
          >
            Lihat Semua Unit
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </AnimatedSection>
      </Container>
    </section>
  );
}
