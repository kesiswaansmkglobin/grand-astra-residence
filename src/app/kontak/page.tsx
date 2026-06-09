"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSending(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Hubungi Kami"
            subtitle="Tim kami siap membantu Anda. Silakan hubungi melalui form di bawah atau kontak yang tersedia."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="rounded-2xl bg-surface border border-gold/10 p-8 sm:p-10 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Pesan Terkirim!
                      </h3>
                      <p className="text-text-secondary">
                        Tim kami akan menghubungi Anda segera.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          id="name"
                          label="Nama Lengkap"
                          placeholder="Masukkan nama Anda"
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
                      <Input
                        id="subject"
                        label="Subjek"
                        placeholder="Contoh: Info Unit Tipe Astra 45"
                        required
                      />
                      <Textarea
                        id="message"
                        label="Pesan"
                        placeholder="Tulis pesan Anda di sini..."
                        rows={5}
                        required
                      />
                      <Button type="submit" variant="primary" size="lg" disabled={sending}>
                        <Send className="w-4 h-4 mr-2" />
                        {sending ? "Mengirim..." : "Kirim Pesan"}
                      </Button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <div className="rounded-2xl bg-surface border border-white/5 p-6 shadow-sm space-y-6">
                  <h3 className="text-lg font-semibold text-white">
                    Informasi Kontak
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Telepon</p>
                        <a
                          href={`tel:${process.env.NEXT_PUBLIC_PHONE_RAW}`}
                          className="font-medium text-white hover:text-gold transition-colors"
                        >
                          {process.env.NEXT_PUBLIC_PHONE}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Email</p>
                        <a
                          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                          className="font-medium text-white hover:text-gold transition-colors"
                        >
                          {process.env.NEXT_PUBLIC_EMAIL}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Alamat</p>
                        <p className="font-medium text-white">
                          {process.env.NEXT_PUBLIC_ADDRESS}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Jam Operasional</p>
                        <p className="font-medium text-white">
                          Senin - Sabtu: 08:00 - 18:00
                          <br />
                          Minggu: 09:00 - 15:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Map Mini */}
              <AnimatedSection>
                <div className="rounded-2xl overflow-hidden bg-white/5 shadow-sm h-48">
                  <iframe
                    src={process.env.NEXT_PUBLIC_GMAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Lokasi Kantor"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
