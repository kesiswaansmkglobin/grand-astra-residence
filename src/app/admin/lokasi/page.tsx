"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Item {
  id: string;
  name: string;
  category: string;
  distance: string;
  travelTime: string;
  icon: string;
}

const defaultForm: Omit<Item, "id"> & { id?: string } = { name: "", category: "", distance: "", travelTime: "", icon: "" };

export default function AdminLocationsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  async function load() {
    const res = await fetch("/api/nearby-places", {
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
      await fetch("/api/nearby-places", { method: "PUT", headers: headers(), body: JSON.stringify(form) });
    } else {
      await fetch("/api/nearby-places", { method: "POST", headers: headers(), body: JSON.stringify(form) });
    }
    resetForm(); load();
  }

  async function remove(id: string) {
    if (!confirm("Hapus lokasi ini?")) return;
    await fetch("/api/nearby-places", { method: "DELETE", headers: headers(), body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lokasi</h1>
          <p className="text-sm text-white/60 mt-0.5">Kelola tempat di sekitar lokasi</p>
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
              <h2 className="text-base font-semibold text-white">{form.id ? "Edit Lokasi" : "Tambah Lokasi"}</h2>
              <button onClick={resetForm} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Nama Tempat</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Kategori</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all">
                  <option value="">Pilih kategori</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Perbelanjaan">Perbelanjaan</option>
                  <option value="Transportasi">Transportasi</option>
                  <option value="Tempat Ibadah">Tempat Ibadah</option>
                  <option value="Hiburan">Hiburan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Jarak</label>
                <input value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="Contoh: 500 m" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Waktu Tempuh</label>
                <input value={form.travelTime} onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="Contoh: 5 menit" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Nama Icon (Lucide)</label>
                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="GraduationCap, Hospital, ..." />
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

      <div className="bg-surface rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Nama</th>
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Kategori</th>
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Jarak</th>
                <th className="text-right px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 text-white font-medium">{item.name}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gold/10 text-gold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/60">{item.distance}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => remove(item.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-16 text-center text-white/60 text-sm">Belum ada lokasi</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
