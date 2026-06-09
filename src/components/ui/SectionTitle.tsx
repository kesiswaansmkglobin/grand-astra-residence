"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  light = false,
  size = "md",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-2xl mb-16",
        centered && "mx-auto text-center",
        className
      )}
    >
      <h2
        className={cn(
          "font-semibold tracking-tight",
          size === "sm" && "text-2xl sm:text-3xl",
          size === "md" && "text-3xl sm:text-4xl",
          size === "lg" && "text-4xl sm:text-5xl",
          "text-white"
        )}
      >
        {title}
      </h2>
      {centered && (
        <div className="mt-5 flex items-center justify-center">
          <span className="inline-block w-12 h-0.5 rounded-full bg-gold" />
        </div>
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto",
            light ? "text-white/60" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
