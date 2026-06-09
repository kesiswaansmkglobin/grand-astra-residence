"use client";

import {
  Building2,
  Target,
  Eye,
  Award,
  Users,
  Home,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const timeline = [
  { year: "2018", event: "Berdirinya PT Graha Astra Properti" },
  { year: "2019", event: "Akuisisi lahan 3.5 Ha di Kota Baru" },
  { year: "2020", event: "Groundbreaking Grand Astra Residence" },
  { year: "2021", event: "Peluncuran Tipe Astra 36 & 45" },
  { year: "2022", event: "Serah terima tahap 1 — 20 unit" },
  { year: "2023", event: "Peluncuran Tipe Astra 60 & 75" },
  { year: "2024", event: "Penghargaan Pengembang Terbaik" },
];

const achievements = [
  { label: "Unit Terjual", value: "120+", icon: Home },
  { label: "Tahun Berdiri", value: "7+", icon: Building2 },
  { label: "Penghargaan", value: "5", icon: Award },
  { label: "Keluarga Bahagia", value: "100+", icon: Users },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Tentang Kami"
            subtitle="PT Graha Astra Properti — pengembang properti terpercaya yang berkomitmen menghadirkan hunian berkualitas."
            size="lg"
          />
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85"
                  alt="Grand Astra Residence"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Menghadirkan Hunian Impian,{" "}
                <span className="text-gold">Membangun Masa Depan</span>
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed text-lg">
                PT Graha Astra Properti adalah perusahaan pengembang properti
                yang berfokus pada pembangunan hunian modern dan premium. Dengan
                pengalaman lebih dari 7 tahun, kami telah dipercaya oleh ratusan
                keluarga untuk mewujudkan hunian impian mereka.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Setiap proyek yang kami bangun selalu mengedepankan kualitas,
                desain modern, dan kenyamanan penghuni. Grand Astra Residence
                adalah bukti komitmen kami dalam menghadirkan hunian terbaik.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <div className="grid sm:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="rounded-2xl bg-surface p-8 sm:p-10 shadow-sm border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Visi
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Menjadi pengembang properti terdepan di Indonesia yang
                  menghadirkan hunian berkualitas tinggi dengan desain inovatif
                  dan bernilai investasi tinggi.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-2xl bg-surface p-8 sm:p-10 shadow-sm border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Misi
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  {[
                    "Membangun hunian berkualitas tinggi dengan desain modern",
                    "Mengedepankan kepuasan dan kenyamanan penghuni",
                    "Berkomitmen pada tepat waktu dan transparansi",
                    "Berkontribusi pada pembangunan kota yang berkelanjutan",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-12 tracking-tight">
            Capaian Kami
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {achievements.map((item) => (
              <AnimatedSection key={item.label}>
                <div className="text-center p-6 rounded-2xl bg-surface">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {item.value}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">{item.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-12 tracking-tight">
            Perjalanan Kami
          </h2>

          <div className="max-w-3xl mx-auto relative">
            {/* Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/10 hidden sm:block" />

            <div className="space-y-8">
              {timeline.map((item) => (
                <AnimatedSection key={item.year}>
                  <div className="relative flex items-start gap-6 sm:gap-8">
                    <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-gold text-white items-center justify-center text-xs font-bold z-10 shadow-sm">
                      {item.year}
                    </div>
                    <div className="sm:hidden shrink-0 w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs font-bold">
                      {item.year}
                    </div>
                    <div className="bg-surface rounded-2xl p-5 flex-1 border border-white/5 shadow-sm">
                      <span className="sm:hidden text-xs font-bold text-gold mb-1 block">
                        {item.year}
                      </span>
                      <p className="text-white font-medium">
                        {item.event}
                      </p>
                    </div>
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
