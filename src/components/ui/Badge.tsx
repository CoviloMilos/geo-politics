import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "outline"
  | "stable"
  | "tension"
  | "conflict"
  | "war"
  | "nuclear"
  | "subtle";

const STYLES: Record<Variant, string> = {
  default: "bg-ink text-white",
  outline: "border border-line text-ink-muted bg-surface",
  subtle: "bg-surface-sunken text-ink-muted",
  stable: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  tension: "bg-amber-50 text-amber-700 border border-amber-100",
  conflict: "bg-red-50 text-red-700 border border-red-100",
  war: "bg-red-100 text-red-800 border border-red-200",
  nuclear: "bg-yellow-50 text-yellow-800 border border-yellow-200",
};

export function Badge({
  variant = "outline",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        STYLES[variant],
        className
      )}
      {...props}
    />
  );
}
