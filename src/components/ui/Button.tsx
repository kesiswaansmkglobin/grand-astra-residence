"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-2 focus:ring-offset-dark disabled:pointer-events-none disabled:opacity-50",

          // Variants
          variant === "primary" &&
            "bg-gold text-dark hover:bg-gold-hover shadow-lg hover:shadow-xl active:scale-[0.98]",
          variant === "secondary" &&
            "border border-gold text-gold hover:bg-gold/10 active:scale-[0.98]",
          variant === "outline" &&
            "border border-white/20 text-white hover:border-gold hover:text-gold active:scale-[0.98]",
          variant === "ghost" &&
            "text-white/60 hover:text-gold active:scale-[0.98]",

          // Sizes
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6 text-sm",
          size === "lg" && "h-13 px-8 text-base",

          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
