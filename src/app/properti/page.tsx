"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Maximize2,
  Layers,
  Bed,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useData } from "@/lib/use-data";
import { formatPrice, cn } from "@/lib/utils";
import type { Property } from "@/types";

const propertyTypes = [
  "Semua Tipe",
  "Rumah Tapak",
  "Rumah Cluster",
  "Town House",
];

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "< Rp 500 Juta", min: 0, max: 500000000 },
  { label: "Rp 500 - 750 Juta", min: 500000000, max: 750000000 },
  { label: "Rp 750 Juta - 1 M", min: 750000000, max: 1000000000 },
  { label: "> Rp 1 Miliar", min: 1000000000, max: Infinity },
];

const ITEMS_PER_PAGE = 6;

export default function PropertyListing() {
  const { data: properties, loading } = useData<Property[]>(() =>
    fetch("/api/properties").then((r) => r.json())
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua Tipe");
  const [priceFilter, setPriceFilter] = useState("Semua Harga");
  const [bedrooms, setBedrooms] = useState(0);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (!properties) return [];
    const range = priceRanges.find((r) => r.label === priceFilter) || priceRanges[0];
    const result = properties.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase());
      const matchType =
        typeFilter === "Semua Tipe" || p.type === typeFilter;
      const matchPrice = p.price >= range.min && p.price <= range.max;
      const matchBedrooms = bedrooms === 0 || p.bedrooms >= bedrooms;
      return matchSearch && matchType && matchPrice && matchBedrooms;
    });

    if (sort === "lowest") result.sort((a, b) => a.price - b.price);
    else if (sort === "highest") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => (b.id > a.id ? 1 : -1));

    return result;
  }, [properties, search, typeFilter, priceFilter, bedrooms, sort]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("Semua Tipe");
    setPriceFilter("Semua Harga");
    setBedrooms(0);
    setPage(1);
  };

  const hasActiveFilters =
    search || typeFilter !== "Semua Tipe" || priceFilter !== "Semua Harga" || bedrooms > 0;

  if (loading) {
    return (
      <section className="pt-32 pb-20">
        <Container>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <Container>
          <SectionTitle
            title="Unit Tersedia"
            subtitle={`Temukan ${filtered.length} unit hunian impian Anda dari berbagai tipe yang kami tawarkan.`}
            size="lg"
          />
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary/60" />
              <input
                type="text"
                placeholder="Cari unit..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-white/10 bg-surface text-white placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 px-4 rounded-xl border border-white/10 bg-surface text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold/40 appearance-none"
              >
                <option value="newest">Terbaru</option>
                <option value="lowest">Harga Terendah</option>
                <option value="highest">Harga Tertinggi</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-12 px-4 rounded-xl border flex items-center gap-2 text-sm transition-all",
                  showFilters || hasActiveFilters
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-white/10 bg-surface text-white"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-gold" />
                )}
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-2xl bg-surface border border-white/5"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tipe Rumah
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-surface text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold/40 appearance-none"
                  >
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Rentang Harga
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-surface text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold/40 appearance-none"
                  >
                    {priceRanges.map((r) => (
                      <option key={r.label} value={r.label}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Kamar Tidur
                  </label>
                  <div className="flex gap-2">
                    {[0, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setBedrooms(n);
                          setPage(1);
                        }}
                        className={cn(
                          "h-11 px-5 rounded-xl border text-sm font-medium transition-all",
                          bedrooms === n
                            ? "border-gold bg-gold text-dark"
                            : "border-white/10 bg-surface text-white hover:border-white/20"
                        )}
                      >
                        {n === 0 ? "Semua" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="h-11 px-6 rounded-xl border border-white/10 text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-text-secondary">Tidak ada unit yang ditemukan.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((property) => (
                <AnimatedSection key={property.id}>
                  <div className="group bg-surface rounded-2xl overflow-hidden border border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant={property.status} />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white text-lg font-bold drop-shadow-sm">
                          {formatPrice(property.price)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {property.title}
                        </h3>
                        <p className="text-sm text-text-secondary">{property.type}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                        <div className="text-center">
                          <Maximize2 className="w-3.5 h-3.5 mx-auto text-text-secondary mb-1" />
                          <span className="text-sm font-medium text-white block">
                            {property.landArea} m²
                          </span>
                          <p className="text-xs text-text-secondary">Tanah</p>
                        </div>
                        <div className="text-center">
                          <Layers className="w-3.5 h-3.5 mx-auto text-text-secondary mb-1" />
                          <span className="text-sm font-medium text-white block">
                            {property.buildingArea} m²
                          </span>
                          <p className="text-xs text-text-secondary">Bangunan</p>
                        </div>
                        <div className="text-center">
                          <Bed className="w-3.5 h-3.5 mx-auto text-text-secondary mb-1" />
                          <span className="text-sm font-medium text-white block">
                            {property.bedrooms}
                          </span>
                          <p className="text-xs text-text-secondary">K.Tidur</p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group/btn"
                        onClick={() =>
                          (window.location.href = `/properti/${property.slug}`)
                        }
                      >
                        Lihat Detail
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {paginated.length < filtered.length && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPage((p) => p + 1)}
              >
                Lihat Lebih Banyak ({filtered.length - paginated.length} tersisa)
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
