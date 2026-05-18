import { COUNTRIES } from "@/data/countries";
import { Flame, AlertTriangle, Handshake, Atom, Activity } from "lucide-react";

export function StatusBar() {
  const conflicts = COUNTRIES.filter(
    (c) => c.status === "war" || c.status === "conflict"
  ).length;
  const tensions = COUNTRIES.filter((c) => c.status === "tension").length;
  const recentAgreements = COUNTRIES.flatMap((c) => c.recentAgreements).filter((a) => {
    const d = new Date(a.date);
    const cutoff = new Date("2026-04-01");
    return d >= cutoff;
  }).length;
  const nuclear = COUNTRIES.filter((c) => c.military.nuclear).length;

  return (
    <div className="flex items-center justify-between border-b border-line bg-surface px-6 py-2.5">
      <div className="flex items-center gap-5">
        <Stat
          icon={<Flame size={13} className="text-signal-conflict" />}
          label="Active conflicts"
          value={conflicts}
          accent="conflict"
        />
        <Divider />
        <Stat
          icon={<AlertTriangle size={13} className="text-signal-tension" />}
          label="Tensions"
          value={tensions}
          accent="tension"
        />
        <Divider />
        <Stat
          icon={<Handshake size={13} className="text-ink-muted" />}
          label="Agreements / 30d"
          value={recentAgreements}
        />
        <Divider />
        <Stat
          icon={<Atom size={13} className="text-yellow-600" />}
          label="Nuclear powers"
          value={nuclear}
        />
        <Divider />
        <Stat
          icon={<Activity size={13} className="text-emerald-600" />}
          label="Countries tracked"
          value={COUNTRIES.length}
        />
      </div>

      <div className="flex items-center gap-2 text-[11px] text-ink-subtle">
        <span className="relative inline-flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span>Live · mock feed · synced 2 min ago</span>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: "conflict" | "tension";
}) {
  const valueColor =
    accent === "conflict"
      ? "text-signal-conflict"
      : accent === "tension"
      ? "text-signal-tension"
      : "text-ink";
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex items-baseline gap-1.5">
        <span className={`text-sm font-semibold tabular-nums ${valueColor}`}>{value}</span>
        <span className="text-[11px] uppercase tracking-wider text-ink-muted">{label}</span>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-4 w-px bg-line" />;
}
