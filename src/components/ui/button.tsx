import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary:
    "border border-black/[.12] bg-transparent hover:bg-black/[.04] dark:border-white/[.16] dark:hover:bg-white/[.06]",
  ghost: "bg-transparent hover:bg-black/[.05] dark:hover:bg-white/[.08]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Atomic button. This is a Server Component by design; it renders markup only.
 * Attach event handlers from a parent Client Component when interactivity is
 * required.
 */
export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "focus-visible:ring-foreground/40 inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
