"use client";

import {
  GraduationCap,
  Hospital,
  Route,
  ShoppingCart,
  Bus,
  TreePine,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import type { NearbyPlace } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  hospital: Hospital,
  route: Route,
  "shopping-cart": ShoppingCart,
  bus: Bus,
  tree: TreePine,
};

export default function Location() {
  const { data: nearbyPlaces, loading } = useData<NearbyPlace[]>(() =>
    fetch("/api/nearby-places").then((r) => r.json())
  );

  if (loading || !nearbyPlaces) return null;

  return (
    <section className="py-24 sm:py-32 bg-surface">
      <Container>
        <SectionTitle
          title="Lokasi Strategis"
          subtitle="Grand Astra Residence berada di lokasi premium dengan akses mudah ke berbagai fasilitas umum."
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection className="w-full aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden bg-white/5 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "480px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Grand Astra Residence"
            />
          </AnimatedSection>

          <div className="space-y-4">
            {nearbyPlaces.map((place) => {
              const Icon = iconMap[place.icon] || TreePine;
              return (
                <AnimatedSection key={place.name}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-white/5 hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-white">
                          {place.name}
                        </span>
                        <span className="text-xs text-text-secondary/60 bg-white/5 px-2 py-0.5 rounded-full">
                          {place.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-secondary">
                        <span>{place.distance}</span>
                        <span>•</span>
                        <span>{place.travelTime}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
