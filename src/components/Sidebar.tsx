import { useMemo, useState } from "react";
import { Country, COUNTRIES } from "@/data/countries";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Search, Star, Globe2, Flame } from "lucide-react";

interface Props {
  selectedId: string | null;
  favouriteIds: string[];
  onSelect: (country: Country) => void;
  onHoverFavourite: (id: string | null) => void;
  onToggleFavourite: (id: string) => void;
}

export function Sidebar({
  selectedId,
  favouriteIds,
  onSelect,
  onHoverFavourite,
  onToggleFavourite,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q)
    );
  }, [query]);

  const favourites = COUNTRIES.filter((c) => favouriteIds.includes(c.id));
  const activeConflicts = COUNTRIES.filter(
    (c) => c.status === "war" || c.status === "conflict"
  );

  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-line bg-surface">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
          <Globe2 size={15} strokeWidth={2.2} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">Geopolitica</span>
          <span className="text-[10px] uppercase tracking-wider text-ink-subtle">
            World in focus
          </span>
        </div>
      </div>

      <div className="h-px bg-line" />

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries"
            className="w-full rounded-lg border border-line bg-surface-sunken py-2 pl-8 pr-3 text-sm placeholder:text-ink-subtle focus:border-ink/30 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-soft">
        {/* Favourites */}
        {favourites.length > 0 && (
          <SectionHeader icon={<Star size={12} />} label="Watchlist" />
        )}
        {favourites.length > 0 && (
          <div className="mb-2 px-2">
            {favourites.map((c) => (
              <CountryRow
                key={c.id}
                country={c}
                selected={selectedId === c.id}
                isFavourite
                onClick={() => onSelect(c)}
                onMouseEnter={() => onHoverFavourite(c.id)}
                onMouseLeave={() => onHoverFavourite(null)}
                onStarClick={() => onToggleFavourite(c.id)}
              />
            ))}
          </div>
        )}

        {/* Active conflicts */}
        <SectionHeader icon={<Flame size={12} />} label="Active conflicts" />
        <div className="mb-2 px-2">
          {activeConflicts.map((c) => (
            <CountryRow
              key={c.id}
              country={c}
              selected={selectedId === c.id}
              isFavourite={favouriteIds.includes(c.id)}
              onClick={() => onSelect(c)}
              onStarClick={() => onToggleFavourite(c.id)}
            />
          ))}
        </div>

        {/* All countries */}
        <SectionHeader
          icon={<Globe2 size={12} />}
          label={query ? "Results" : "All countries"}
          right={
            <span className="text-[10px] text-ink-subtle">
              {filtered.length}
            </span>
          }
        />
        <div className="px-2 pb-4">
          {filtered.map((c) => (
            <CountryRow
              key={c.id}
              country={c}
              selected={selectedId === c.id}
              isFavourite={favouriteIds.includes(c.id)}
              onClick={() => onSelect(c)}
              onStarClick={() => onToggleFavourite(c.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-ink-subtle">
              No matches.
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-line px-5 py-3 text-[10px] text-ink-subtle">
        Mock data · Demo build
      </div>
    </aside>
  );
}

function SectionHeader({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex items-center justify-between px-5 pb-1">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-subtle">
        {icon}
        {label}
      </div>
      {right}
    </div>
  );
}

function CountryRow({
  country,
  selected,
  isFavourite,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onStarClick,
}: {
  country: Country;
  selected: boolean;
  isFavourite: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onStarClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 transition-colors",
        selected
          ? "bg-ink text-white"
          : "text-ink hover:bg-surface-sunken"
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-sm leading-none">{country.flag}</span>
        <span className="truncate text-sm font-medium">{country.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant={selected ? "subtle" : statusVariant(country.status)}
          className={cn(selected && "bg-white/15 text-white border-white/0")}
        >
          {country.status}
        </Badge>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStarClick();
          }}
          className={cn(
            "rounded p-1 transition-colors",
            selected ? "text-white/60 hover:text-white" : "text-ink-subtle hover:text-ink"
          )}
          aria-label={isFavourite ? "Remove from watchlist" : "Add to watchlist"}
        >
          <Star
            size={12}
            strokeWidth={2}
            className={cn(isFavourite ? "fill-current" : "fill-none")}
          />
        </button>
      </div>
    </div>
  );
}

function statusVariant(status: Country["status"]) {
  if (status === "stable") return "stable" as const;
  if (status === "tension") return "tension" as const;
  if (status === "conflict") return "conflict" as const;
  return "war" as const;
}
