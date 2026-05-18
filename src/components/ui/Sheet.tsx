import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <>
      <div
        aria-hidden
        onClick={() => onOpenChange(false)}
        className={cn(
          "fixed inset-0 z-40 bg-ink/10 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[460px] flex-col border-l border-line bg-surface shadow-panel transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
}
