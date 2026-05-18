import { useEffect, useState } from "react";
import { Country } from "@/data/countries";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatTrillions } from "@/lib/utils";

interface Props {
  country: Country | null;
}

export function HoverCard({ country }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!country) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [country]);

  if (!country) return null;

  const offsetX = 18;
  const offsetY = 18;
  const maxX = typeof window !== "undefined" ? window.innerWidth - 280 : 1000;
  const x = Math.min(pos.x + offsetX, maxX);
  const y = pos.y + offsetY;

  return (
    <div
      className="pointer-events-none fixed z-30 w-[280px] rounded-xl border border-line bg-surface/95 p-3.5 shadow-panel backdrop-blur"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{country.flag}</span>
          <span className="text-[15px] font-semibold tracking-tight">{country.name}</span>
        </div>
        <Badge variant={country.status === "stable" ? "stable" : country.status}>
          {country.status}
        </Badge>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <div className="uppercase tracking-wider text-[10px] text-ink-subtle">GDP</div>
          <div className="text-ink font-semibold">{formatTrillions(country.economy.gdp)}</div>
        </div>
        <div>
          <div className="uppercase tracking-wider text-[10px] text-ink-subtle">Population</div>
          <div className="text-ink font-semibold">{formatNumber(country.population)}</div>
        </div>
        <div>
          <div className="uppercase tracking-wider text-[10px] text-ink-subtle">Government</div>
          <div className="text-ink font-semibold capitalize">{country.government}</div>
        </div>
        <div>
          <div className="uppercase tracking-wider text-[10px] text-ink-subtle">Mil rank</div>
          <div className="text-ink font-semibold">#{country.military.globalRank}</div>
        </div>
      </div>
      <div className="mt-3 border-t border-line pt-2 text-[10px] uppercase tracking-wider text-ink-subtle">
        Click to open full profile
      </div>
    </div>
  );
}
