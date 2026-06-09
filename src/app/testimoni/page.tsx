"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import type { Testimonial } from "@/types";

export default function TestimonialsPage() {
  const { data: testimonials, loading } = useData<Testimonial[]>(() =>
    fetch("/api/testimonials").then((r) => r.json())
  );
  const [current, setCurrent] = useState(0);

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

  if (!testimonials) return null;

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Testimoni Penghuni"
            subtitle="Dengarkan pengalaman langsung dari keluarga yang telah merasakan kenyamanan tinggal di Grand Astra Residence."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-navy rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden mb-16">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:32px_32px]" />

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden ring-2 ring-gold/30">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[current].rating
                            ? "text-gold fill-gold"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 italic max-w-2xl mx-auto">
                    &ldquo;{testimonials[current].review}&rdquo;
                  </blockquote>

                  <div>
                    <p className="font-semibold text-white text-lg">
                      {testimonials[current].name}
                    </p>
                    <p className="text-white/50 mt-1">
                      {testimonials[current].role}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-10">
                    <button
                      onClick={prev}
                      aria-label="Sebelumnya"
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          aria-label={`Testimoni ${i + 1}`}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            i === current
                              ? "bg-gold w-7"
                              : "bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={next}
                      aria-label="Selanjutnya"
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <h2 className="text-2xl font-semibold text-white mb-8 text-center">
              Semua Testimoni
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <AnimatedSection key={t.id}>
                  <div className="rounded-2xl bg-surface border border-white/5 p-6 shadow-sm h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {t.name}
                        </p>
                        <p className="text-xs text-text-secondary">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < t.rating
                              ? "text-gold fill-gold"
                              : "text-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t.review}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
