import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface shadow-soft",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pt-4 pb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-xs font-medium uppercase tracking-wider text-ink-muted", className)}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

export function StatTile({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface px-4 py-3",
        className
      )}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight text-ink">{value}</div>
      {hint ? <div className="mt-0.5 text-xs text-ink-subtle">{hint}</div> : null}
    </div>
  );
}
