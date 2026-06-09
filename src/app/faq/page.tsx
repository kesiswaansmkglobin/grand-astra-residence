"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

export default function FAQPage() {
  const { data: faqData, loading } = useData<FAQItem[]>(() =>
    fetch("/api/faq").then((r) => r.json())
  );
  const [openId, setOpenId] = useState<string | null>(null);

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
            title="Pertanyaan Umum"
            subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan seputar Grand Astra Residence."
            size="lg"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-3">
              {faqData?.map((item) => (
                <AnimatedSection key={item.id}>
                  <div className="rounded-2xl border border-white/5 bg-surface overflow-hidden transition-shadow hover:shadow-sm">
                    <button
                      onClick={() =>
                        setOpenId(openId === item.id ? null : item.id)
                      }
                      className="flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer"
                    >
                      <span className="text-base font-medium text-white pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300",
                          openId === item.id && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openId === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div>
              <AnimatedSection>
                <div className="rounded-2xl bg-navy p-8 text-center sticky top-28">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Masih Punya Pertanyaan?
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    Tim kami siap membantu Anda. Hubungi kami melalui WhatsApp
                    untuk respon yang lebih cepat.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      window.open("https://wa.me/6281234567890", "_blank")
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Tanya via WhatsApp
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
