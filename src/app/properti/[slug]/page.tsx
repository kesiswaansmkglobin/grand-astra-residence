"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  Bed,
  Bath,
  Car,
  Zap,
  Droplets,
  Check,
  MessageCircle,
  Calendar,
  Calculator,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { formatPrice, cn } from "@/lib/utils";
import type { Property } from "@/types";

export default function PropertyDetail() {
  const params = useParams();
  const { data: properties, loading } = useData<Property[]>(() =>
    fetch("/api/properties").then((r) => r.json())
  );
  const [imageIndex, setImageIndex] = useState(0);

  if (loading) {
    return (
      <Container className="pt-32 pb-20">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </Container>
    );
  }

  const property = properties?.find((p) => p.slug === params.slug);

  if (!property) {
    return (
      <Container className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-semibold">Unit tidak ditemukan</h1>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => (window.location.href = "/properti")}
        >
          Kembali
        </Button>
      </Container>
    );
  }

  const specs = [
    { label: "Luas Tanah", value: `${property.landArea} m²`, icon: Maximize2 },
    { label: "Luas Bangunan", value: `${property.buildingArea} m²`, icon: Layers },
    { label: "Kamar Tidur", value: property.bedrooms, icon: Bed },
    { label: "Kamar Mandi", value: property.bathrooms, icon: Bath },
    { label: "Carport", value: property.carport, icon: Car },
    { label: "Listrik", value: `${property.electricity} VA`, icon: Zap },
    { label: "Air", value: property.waterSupply, icon: Droplets },
  ];

  return (
    <>
      <section className="relative pt-20">
        <div className="relative h-[50vh] sm:h-[65vh] lg:h-[70vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={property.images[imageIndex]}
                alt={property.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {property.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setImageIndex(
                    (i) => (i - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setImageIndex((i) => (i + 1) % property.images.length)
                }
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === imageIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          <div className="absolute top-28 left-6 sm:left-12">
            <Badge variant={property.status} />
          </div>
        </div>

        {property.images.length > 1 && (
          <Container className="py-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "shrink-0 relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all",
                    i === imageIndex
                      ? "border-gold opacity-100"
                      : "border-transparent opacity-60 hover:opacity-80"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </Container>
        )}
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                      {property.title}
                    </h1>
                    <p className="text-text-secondary mt-1">{property.type}</p>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gold">
                    {formatPrice(property.price)}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-xl font-semibold text-white mb-4">Deskripsi</h2>
                <p className="text-text-secondary leading-relaxed">{property.description}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-xl font-semibold text-white mb-6">Spesifikasi</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface"
                    >
                      <spec.icon className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <p className="text-sm text-text-secondary">{spec.label}</p>
                        <p className="font-medium text-white">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-xl font-semibold text-white mb-6">Fitur Unggulan</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white"
                    >
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {property.floorPlan && (
                <AnimatedSection>
                  <h2 className="text-xl font-semibold text-white mb-6">Denah</h2>
                  <Image
                    src={property.floorPlan}
                    alt="Floor Plan"
                    width={800}
                    height={600}
                    className="w-full rounded-2xl border border-white/5"
                  />
                </AnimatedSection>
              )}

              <AnimatedSection>
                <h2 className="text-xl font-semibold text-white mb-6">Lokasi</h2>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-white/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    title="Lokasi"
                  />
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                <AnimatedSection>
                  <div className="rounded-2xl border border-white/5 bg-surface p-6 shadow-sm space-y-4">
                    <div>
                      <p className="text-sm text-text-secondary">Harga</p>
                      <p className="text-2xl font-bold text-gold">
                        {formatPrice(property.price)}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() =>
                          window.open(
                            `${process.env.NEXT_PUBLIC_WHATSAPP_URL}Halo%20Grand%20Astra%20Residence%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(property.title)}`,
                            "_blank"
                          )
                        }
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Tanya via WhatsApp
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => (window.location.href = "/booking")}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Jadwalkan Survey
                      </Button>

                      <Button variant="ghost" className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Simulasi KPR
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="rounded-2xl border border-white/5 bg-surface p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-semibold text-white">Ringkasan</h3>
                    <div className="space-y-3">
                      {specs.slice(0, 4).map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-text-secondary flex items-center gap-2">
                            <spec.icon className="w-4 h-4" />
                            {spec.label}
                          </span>
                          <span className="font-medium text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <Container className="relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Tertarik dengan Unit Ini?
          </h2>
          <p className="mt-4 text-white/70 max-w-lg mx-auto">
            Hubungi kami sekarang untuk informasi lebih lanjut.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.open(process.env.NEXT_PUBLIC_WHATSAPP_URL, "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hubungi WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/booking")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Jadwalkan Survey
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
