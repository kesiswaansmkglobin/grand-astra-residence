"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Unit", href: "/properti" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Lokasi", href: "/lokasi" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-xl"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-dark text-sm font-bold">GA</span>
            </div>
            <span
              className="text-lg font-semibold tracking-tight text-white"
            >
            Grand Astra
          </span></Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300",
                    isActive ? "text-gold" : "text-white/70 hover:text-gold"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_RAW}`}
              className="flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>{process.env.NEXT_PUBLIC_PHONE}</span>
            </a>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => (window.location.href = "/booking")}
            >
              Jadwalkan Survey
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-surface border-t border-white/5 overflow-hidden"
          >
            <Container className="py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-white/70 hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE_RAW}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <Phone className="w-4 h-4" />
                  {process.env.NEXT_PUBLIC_PHONE}
                </a>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => {
                    setMobileOpen(false);
                    window.location.href = "/booking";
                  }}
                >
                  Jadwalkan Survey
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
