import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "available" | "sold" | "reserved";
  className?: string;
}

const labels = {
  available: "Available",
  sold: "Sold Out",
  reserved: "Reserved",
};

export default function Badge({ variant = "available", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium",
        variant === "available" &&
          "bg-gold/10 text-gold border border-gold/20",
        variant === "sold" &&
          "bg-white/5 text-white/40 border border-white/10",
        variant === "reserved" &&
          "bg-gold/10 text-gold border border-gold/20",
        className
      )}
    >
      {labels[variant]}
    </span>
  );
}
