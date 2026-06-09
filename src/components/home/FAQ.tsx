"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

export default function FAQ() {
  const { data: faqData, loading } = useData<FAQItem[]>(() =>
    fetch("/api/faq").then((r) => r.json())
  );
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading || !faqData) return null;

  return (
    <section className="py-24 sm:py-32 bg-dark">
      <Container>
        <SectionTitle
          title="Pertanyaan Umum"
          subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item) => (
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
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      </Container>
    </section>
  );
}
