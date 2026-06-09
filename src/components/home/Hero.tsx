"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const stats = [
  { label: "Unit Tersedia", value: "48 Unit" },
  { label: "Harga Mulai", value: "Rp 585 Juta" },
  { label: "Luas Lahan", value: "3.5 Ha" },
  { label: "Lokasi Strategis", value: "Kota Baru" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
            alt="Grand Astra Residence"
            fill
            className="object-cover scale-110"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
      </div>

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

      <Container className="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Hunian Premium di Kota Baru
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-white leading-[1.05]"
          >
            Grand Astra
            <br />
            <span className="text-gold">Residence</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            Hunian modern dengan desain premium, lingkungan asri, dan akses
            strategis. Tempat terbaik untuk keluarga Anda tumbuh dan berkembang.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => (window.location.href = "/properti")}
            >
              Lihat Unit
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/booking")}
            >
              <Play className="w-4 h-4 mr-1" />
              Jadwalkan Survey
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm px-6 py-6 sm:py-8 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
