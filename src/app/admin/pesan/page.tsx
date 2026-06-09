"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, User, MessageSquare } from "lucide-react";

interface Item {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Item[]>([]);

  async function load() {
    const res = await fetch("/api/contact-submissions", {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Hapus pesan ini?")) return;
    await fetch("/api/contact-submissions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Pesan Masuk</h1>
          <p className="text-sm text-white/60 mt-0.5">Pesan dari form kontak</p>
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
                    {item.name}
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
                <div className="flex items-center gap-2 mt-2">
                  <MessageSquare size={14} className="text-gold shrink-0" />
                  <span className="text-sm font-medium text-white/80">{item.subject}</span>
                </div>
                <p className="text-sm text-white/60 mt-1.5 leading-relaxed whitespace-pre-wrap">{item.message}</p>
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
          <p className="text-center text-white/60 text-sm py-16">Belum ada pesan masuk</p>
        )}
      </div>
    </div>
  );
}
