"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Property {
  slug: string;
  title: string;
  type: string;
  price: number;
  status: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
}

const defaultForm: Omit<Property, "slug"> & { slug: string } = {
  slug: "", title: "", type: "Rumah Tapak", price: 0, status: "available",
  landArea: 0, buildingArea: 0, bedrooms: 0, bathrooms: 0,
  description: "", features: [], images: [],
};

export default function AdminPropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [featureInput, setFeatureInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  async function load() {
    const res = await fetch("/api/properties");
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  const token = () => localStorage.getItem("admin_token");
  const headers = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token()}` });

  function resetForm() { setForm(defaultForm); setFeatureInput(""); setImageInput(""); setShowForm(false); setEditing(null); }

  function openEdit(item: Property) { setForm({ ...item, features: [...item.features], images: [...item.images] }); setEditing(item); setShowForm(true); }

  async function save() {
    if (editing) {
      await fetch(`/api/properties/${editing.slug}`, { method: "PUT", headers: headers(), body: JSON.stringify(form) });
    } else {
      await fetch("/api/properties", { method: "POST", headers: headers(), body: JSON.stringify(form) });
    }
    resetForm(); load();
  }

  async function remove(slug: string) {
    if (!confirm("Hapus properti ini?")) return;
    await fetch(`/api/properties/${slug}`, { method: "DELETE", headers: headers() });
    load();
  }

  function addFeature() { if (featureInput.trim()) { setForm({ ...form, features: [...form.features, featureInput.trim()] }); setFeatureInput(""); } }
  function addImage() { if (imageInput.trim()) { setForm({ ...form, images: [...form.images, imageInput.trim()] }); setImageInput(""); } }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Properti</h1>
          <p className="text-sm text-white/60 mt-0.5">Kelola data unit properti</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 h-10 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Tambah
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl border border-white/10">
            <div className="flex items-center justify-between px-6 h-14 border-b border-white/10">
              <h2 className="text-base font-semibold text-white">{editing ? "Edit Properti" : "Tambah Properti"}</h2>
              <button onClick={resetForm} className="text-white/60 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white mb-1.5">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white mb-1.5">Judul</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Tipe</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all">
                  <option>Rumah Tapak</option><option>Apartemen</option><option>Ruko</option><option>Tanah</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all">
                  <option value="available">Tersedia</option><option value="sold">Terjual</option><option value="reserved">Dipesan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">Harga (Rp)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">LT (m²)</label>
                  <input type="number" value={form.landArea} onChange={(e) => setForm({ ...form, landArea: Number(e.target.value) })}
                    className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">LB (m²)</label>
                  <input type="number" value={form.buildingArea} onChange={(e) => setForm({ ...form, buildingArea: Number(e.target.value) })}
                    className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Kamar Tidur</label>
                  <input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                    className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">Kamar Mandi</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                    className="w-full h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white mb-1.5">Deskripsi</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white mb-1.5">Fitur</label>
                <div className="flex gap-2 mb-2.5">
                  <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    className="flex-1 h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="Tambah fitur..." />
                  <button onClick={addFeature} className="px-4 h-10 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors">Tambah</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.features.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg">
                      {f}
                      <button onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="text-white/60 hover:text-red-400"><X size={13} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-white mb-1.5">Gambar (URL)</label>
                <div className="flex gap-2 mb-2.5">
                  <input value={imageInput} onChange={(e) => setImageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                    className="flex-1 h-10 px-3.5 rounded-lg border border-white/10 bg-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" placeholder="URL gambar..." />
                  <button onClick={addImage} className="px-4 h-10 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors">Tambah</button>
                </div>
                <div className="space-y-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg bg-dark border border-white/10">
                      <img src={img} alt="" className="w-10 h-7 object-cover rounded" />
                      <span className="flex-1 truncate text-white/60 text-xs">{img}</span>
                      <button onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="text-white/60 hover:text-red-400"><X size={15} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
              <button onClick={resetForm} className="h-10 px-5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">Batal</button>
              <button onClick={save} className="h-10 px-6 bg-gold hover:bg-gold-hover text-dark rounded-lg text-sm font-medium transition-colors shadow-sm">
                {editing ? "Simpan" : "Tambah"}
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
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Judul</th>
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Tipe</th>
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Harga</th>
                <th className="text-left px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 font-medium text-white/60 text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.slug} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 text-white font-medium">{item.title}</td>
                  <td className="px-5 py-4 text-white/60">{item.type}</td>
                  <td className="px-5 py-4 text-white">Rp {item.price.toLocaleString("id-ID")}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      item.status === "available" ? "bg-gold/10 text-gold" :
                      item.status === "reserved" ? "bg-gold/10 text-gold" :
                      "bg-white/5 text-white/40"
                    }`}>
                      {item.status === "available" ? "Tersedia" : item.status === "reserved" ? "Dipesan" : "Terjual"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => remove(item.slug)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-16 text-center text-white/60 text-sm">Belum ada properti</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
