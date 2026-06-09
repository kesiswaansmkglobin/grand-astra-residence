"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

const defaultForm: Omit<Item, "id"> & { id?: string } = { name: "", description: "", icon: "", image: "" };

export default function AdminFacilitiesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  async function load() {
    const res = await fetch("/api/facilities", {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  const headers = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  function resetForm() { setForm(defaultForm); setShowForm(false); }

  function openEdit(item: Item) { setForm(item); setShowForm(true); }

  async function save() {
    if (form.id) {
      await fetch("/api/facilities", { method: "PUT", headers: headers(), body: JSON.stringify(form) });
    } else {
      await fetch("/api/facilities", { method: "POST", headers: headers(), body: JSON.stringify(form) });
    }
    resetForm(); load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus fasilitas ini?")) return;
    await fetch("/api/facilities", { method: "DELETE", headers: headers(), body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Fasilitas</h1>
          <p className="text-sm text-white/60 mt-0.5">Kelola data fasilitas</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 h-10 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl w-full max-w-lg shadow-xl border border-white/10">
            <div className="flex items-center justify-between px-6 h-14 border-b border-white/10">
              <h2 className="text-base font-semibold text-white">{form.id ? "Edit Fasilitas" : "Tambah Fasilitas"}</h2>
              <button onClick={resetForm} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Nama</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Deskripsi</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Nama Icon (Lucide)</label>
                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="SwimmingPool, TreePine, ..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">URL Gambar</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="https://images.unsplash.com/..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
              <button onClick={resetForm} className="h-10 px-5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">Batal</button>
              <button onClick={save} className="h-10 px-6 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors shadow-sm">
                {form.id ? "Simpan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-xl border border-white/10 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">{item.name}</h3>
              <div className="flex items-center gap-0.5">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10"><Pencil size={14} /></button>
                <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-900/20"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
            {item.icon && (
              <span className="inline-block mt-2 text-[11px] text-white/60 bg-white/5 px-2 py-0.5 rounded">{item.icon}</span>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-white/60 text-sm py-16">Belum ada fasilitas</p>
        )}
      </div>
    </div>
  );
}
