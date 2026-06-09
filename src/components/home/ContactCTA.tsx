"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/90 to-dark/80" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Siap Mendapatkan Hunian Impian?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Jangan tunda lagi. Hubungi kami sekarang untuk konsultasi gratis
            dan jadwalkan survey langsung ke lokasi.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_WHATSAPP_URL}${process.env.NEXT_PUBLIC_WHATSAPP_MSG}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hubungi WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/booking")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Jadwalkan Survey
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/40">
            Atau hubungi {process.env.NEXT_PUBLIC_PHONE}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
