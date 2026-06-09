"use client";

import { useEffect, useState } from "react";
import { Building2, Trees, MessageSquareText, HelpCircle, MapPin, Mail, CalendarCheck } from "lucide-react";

interface Stat {
  label: string;
  count: number;
  icon: typeof Building2;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("admin_token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [props, facs, tests, faqs, places, msgs, bookings] = await Promise.all([
          fetch("/api/properties").then((r) => r.json()),
          fetch("/api/facilities", { headers }).then((r) => r.json()),
          fetch("/api/testimonials", { headers }).then((r) => r.json()),
          fetch("/api/faq", { headers }).then((r) => r.json()),
          fetch("/api/nearby-places", { headers }).then((r) => r.json()),
          fetch("/api/contact-submissions", { headers }).then((r) => r.json()),
          fetch("/api/booking-inquiries", { headers }).then((r) => r.json()),
        ]);

        setStats([
          { label: "Properti", count: Array.isArray(props) ? props.length : 0, icon: Building2, color: "bg-gold/10 text-gold" },
          { label: "Fasilitas", count: Array.isArray(facs) ? facs.length : 0, icon: Trees, color: "bg-gold/10 text-gold" },
          { label: "Testimoni", count: Array.isArray(tests) ? tests.length : 0, icon: MessageSquareText, color: "bg-gold/10 text-gold" },
          { label: "Pesan Masuk", count: Array.isArray(msgs) ? msgs.length : 0, icon: Mail, color: "bg-blue-500/10 text-blue-400" },
          { label: "Booking", count: Array.isArray(bookings) ? bookings.length : 0, icon: CalendarCheck, color: "bg-emerald-500/10 text-emerald-400" },
          { label: "FAQ", count: Array.isArray(faqs) ? faqs.length : 0, icon: HelpCircle, color: "bg-gold/10 text-gold" },
          { label: "Lokasi", count: Array.isArray(places) ? places.length : 0, icon: MapPin, color: "bg-gold/10 text-gold" },
        ]);
      } catch {
        // silently fail
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-white/60 mt-1">Ringkasan website Grand Astra Residence</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-surface rounded-xl border border-white/10 p-5 hover:shadow-lg hover:border-gold/30 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
                <Icon size={22} />
              </div>
              <p className="text-2xl font-bold text-white">{s.count}</p>
              <p className="text-sm text-white/60 mt-0.5">{s.label}</p>
            </div>
          );
        })}
        {stats.length === 0 && (
          <div className="col-span-full flex items-center justify-center py-20 text-white/60 text-sm">
            Memuat data...
          </div>
        )}
      </div>
    </div>
  );
}
