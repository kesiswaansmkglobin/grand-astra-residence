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

const categories = [
  { key: "Pendidikan", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { key: "Kesehatan", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
  { key: "Transportasi", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  { key: "Belanja", color: "bg-gold/10 text-gold" },
  { key: "Rekreasi", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
];

export default function LocationPage() {
  const { data: nearbyPlaces, loading } = useData<NearbyPlace[]>(() =>
    fetch("/api/nearby-places").then((r) => r.json())
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
            title="Lokasi Strategis"
            subtitle="Grand Astra Residence berada di lokasi premium dengan akses mudah ke berbagai fasilitas umum dan pusat kegiatan."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "500px" }}
                    allowFullScreen
                    loading="lazy"
                    title="Lokasi Grand Astra Residence"
                  />
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Tempat di Sekitar
                </h2>
                <div className="space-y-3">
                  {nearbyPlaces?.map((place) => {
                    const Icon = iconMap[place.icon] || TreePine;
                    const cat = categories.find((c) => c.key === place.category);
                    return (
                      <div
                        key={place.name}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-white/5 hover:shadow-sm transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              {place.name}
                            </span>
                            {cat && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}
                              >
                                {place.category}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-text-secondary">
                            <span>{place.distance}</span>
                            <span>•</span>
                            <span>{place.travelTime}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
