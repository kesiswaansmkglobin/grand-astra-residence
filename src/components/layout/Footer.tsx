import Container from "@/components/ui/Container";
import { Mail, Phone, MapPin, Camera, Video } from "lucide-react";

const footerLinks = [
  {
    title: "Properti",
    links: [
      { label: "Tipe Astra 36", href: "/properti/tipe-astra-36" },
      { label: "Tipe Astra 45", href: "/properti/tipe-astra-45" },
      { label: "Tipe Astra 60", href: "/properti/tipe-astra-60" },
      { label: "Semua Unit", href: "/properti" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Lokasi", href: "/lokasi" },
      { label: "Tentang Kami", href: "/tentang" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Kontak", href: "/kontak" },
      { label: "Booking Survey", href: "/booking" },
      { label: "Simulasi KPR", href: "/properti" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-dark text-sm font-bold">GA</span>
              </div>
              <span className="text-lg font-semibold text-white">Grand Astra</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Hunian modern dan premium di kota favorit Anda. Dibangun dengan
              kualitas terbaik untuk kenyamanan keluarga Anda.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4 text-white/60 group-hover:text-dark transition-colors duration-300" />
              </a>
              <a
                href="#"
                className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300"
                aria-label="Youtube"
              >
                <Video className="w-4 h-4 text-white/60 group-hover:text-dark transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/40">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/40">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_RAW}`}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {process.env.NEXT_PUBLIC_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  {process.env.NEXT_PUBLIC_ADDRESS}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} Grand Astra Residence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
