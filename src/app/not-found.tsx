import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-8xl font-bold text-gold mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-white mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak tersedia.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-gold text-dark font-medium hover:bg-gold-hover transition-all duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
