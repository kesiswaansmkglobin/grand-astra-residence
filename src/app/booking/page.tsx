"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import AnimatedSection from "@/components/ui/AnimatedSection";

const propertyTypes = [
  "Rumah Tapak",
  "Rumah Cluster",
  "Town House",
];

export default function BookingPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      preferredType: (form.elements.namedItem("preferredType") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLInputElement).value,
      surveyDate: (form.elements.namedItem("surveyDate") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLInputElement).value,
    };
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSending(false);
    setStep("success");
  };

  if (step === "success") {
    return (
      <section className="pt-32 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Permintaan Terkirim!
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Terima kasih! Tim marketing kami akan menghubungi Anda dalam
              1x24 jam untuk mengkonfirmasi jadwal survey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_WHATSAPP_URL}${process.env.NEXT_PUBLIC_WHATSAPP_MSG}`,
                    "_blank"
                  )
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Hubungi via WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Kembali ke Beranda
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Jadwalkan Survey"
            subtitle="Isi form di bawah untuk menjadwalkan survey langsung ke Grand Astra Residence. Tim kami akan menghubungi Anda untuk konfirmasi."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <div className="rounded-2xl bg-surface border border-gold/10 p-8 sm:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      id="fullName"
                      label="Nama Lengkap"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                    <Input
                      id="phone"
                      label="Nomor Telepon"
                      type="tel"
                      placeholder="+62 812-3456-7890"
                      required
                    />
                  </div>

                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                  />

                  <Select
                    id="preferredType"
                    label="Tipe Rumah yang Diminati"
                    options={propertyTypes.map((t) => ({ value: t, label: t }))}
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      id="budget"
                      label="Budget (Rp)"
                      type="number"
                      placeholder="Contoh: 500000000"
                      required
                    />
                    <Input
                      id="surveyDate"
                      label="Tanggal Survey"
                      type="date"
                      required
                    />
                  </div>

                  <Input
                    id="notes"
                    label="Catatan (Opsional)"
                    placeholder="Pesan atau pertanyaan tambahan"
                  />

                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={sending}>
                    <Calendar className="w-5 h-5 mr-2" />
                    {sending ? "Mengirim..." : "Jadwalkan Survey"}
                  </Button>

                  <p className="text-xs text-text-secondary text-center">
                    Dengan mengirim form ini, Anda menyetujui kebijakan privasi
                    kami. Data Anda akan aman dan tidak akan disalahgunakan.
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  );
}
