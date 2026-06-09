"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Trees,
  MessageSquareText,
  HelpCircle,
  MapPin,
  Mail,
  CalendarCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properti", label: "Properti", icon: Building2 },
  { href: "/admin/fasilitas", label: "Fasilitas", icon: Trees },
  { href: "/admin/testimoni", label: "Testimoni", icon: MessageSquareText },
  { href: "/admin/pesan", label: "Pesan Masuk", icon: Mail },
  { href: "/admin/booking-leads", label: "Booking", icon: CalendarCheck },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/lokasi", label: "Lokasi", icon: MapPin },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthenticated(true);
      return;
    }
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAdminName(localStorage.getItem("admin_name") ?? "");
      setAuthenticated(true);
    }
  }, [router, pathname]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    router.push("/admin/login");
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-white/10 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-dark text-sm font-bold">
              G
            </div>
            <div>
              <h2 className="text-base font-semibold text-white leading-tight">Grand Astra</h2>
              <p className="text-[11px] text-white/60 leading-tight">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-gold/10 text-gold"
                    : "text-white/60 hover:text-gold hover:bg-white/5"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="ml-auto flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">
                {adminName?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <span className="text-sm text-white font-medium">{adminName}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
