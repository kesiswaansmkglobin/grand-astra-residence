"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center bg-dark">
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="text-3xl font-heading font-semibold text-white mb-3">
          Terjadi Kesalahan
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-gold text-dark font-medium hover:bg-gold-hover transition-all duration-300"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
