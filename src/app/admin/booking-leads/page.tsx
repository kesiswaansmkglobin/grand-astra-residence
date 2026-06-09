"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Trash2, User, Phone, Mail, Home, DollarSign, Calendar, FileText } from "lucide-react";

interface Item {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredType: string;
  budget: number;
  surveyDate: string;
  notes: string | null;
  createdAt: string;
}

export default function AdminBookingLeadsPage() {
  const [items, setItems] = useState<Item[]>([]);

  async function load() {
    const res = await fetch("/api/booking-inquiries", {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Hapus permintaan booking ini?")) return;
    await fetch("/api/booking-inquiries", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      body: JSON.stringify({ id }),
    });
    load();
  }

  function formatBudget(n: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Booking Survey</h1>
          <p className="text-sm text-white/60 mt-0.5">Permintaan jadwal survey dari pengunjung</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-xl border border-white/10 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-white font-medium">
                    <User size={14} className="text-gold" />
                    {item.fullName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <Mail size={12} />
                    {item.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <Phone size={12} />
                    {item.phone}
                  </span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3 mt-3">
                  <span className="flex items-center gap-1.5 text-xs text-white/70">
                    <Home size={12} className="text-gold" />
                    {item.preferredType}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/70">
                    <DollarSign size={12} className="text-gold" />
                    {formatBudget(item.budget)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/70">
                    <Calendar size={12} className="text-gold" />
                    {new Date(item.surveyDate).toLocaleDateString("id-ID", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
                {item.notes && (
                  <div className="flex items-start gap-1.5 mt-2">
                    <FileText size={12} className="text-gold mt-0.5 shrink-0" />
                    <p className="text-xs text-white/60">{item.notes}</p>
                  </div>
                )}
                <p className="text-xs text-white/40 mt-2">
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-900/20 ml-4 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-white/60 text-sm py-16">Belum ada permintaan booking</p>
        )}
      </div>
    </div>
  );
}
