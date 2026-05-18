import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "ghost" | "outline";

const STYLES: Record<Variant, string> = {
  default: "bg-ink text-white hover:bg-ink/90",
  ghost: "text-ink-muted hover:text-ink hover:bg-surface-sunken",
  outline: "border border-line text-ink hover:bg-surface-sunken",
};

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 disabled:opacity-50",
        STYLES[variant],
        className
      )}
      {...props}
    />
  );
}
