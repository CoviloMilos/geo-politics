import { useMemo, useState } from "react";
import { Country, COUNTRIES, COUNTRIES_BY_ID } from "@/data/countries";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Search, Star, Globe2, Flame, Handshake, AlertTriangle } from "lucide-react";

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

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const favourites = COUNTRIES.filter((c) => favouriteIds.includes(c.id));
  const activeConflicts = COUNTRIES.filter(
    (c) => c.status === "war" || c.status === "conflict"
  );
  const tensions = COUNTRIES.filter((c) => c.status === "tension");

  const latestAgreements = useMemo(() => {
    const flat = COUNTRIES.flatMap((c) =>
      c.recentAgreements.map((a) => ({ country: c, agreement: a }))
    );
    flat.sort((a, b) => b.agreement.date.localeCompare(a.agreement.date));
    return flat.slice(0, 6);
  }, []);

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-line bg-surface">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
          <Globe2 size={16} strokeWidth={2.2} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-semibold tracking-tight">Geopolitica</span>
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
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any country"
            className="w-full rounded-lg border border-line bg-surface-sunken py-2 pl-9 pr-3 text-sm placeholder:text-ink-subtle focus:border-ink/30 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-soft pt-2">
        {/* Search results override default sections */}
        {query.trim() ? (
          <Section title="Results" right={`${searchResults.length}`}>
            {searchResults.length === 0 ? (
              <Empty>No matches in tracked countries.</Empty>
            ) : (
              searchResults.map((c) => (
                <CountryRow
                  key={c.id}
                  country={c}
                  selected={selectedId === c.id}
                  isFavourite={favouriteIds.includes(c.id)}
                  onClick={() => onSelect(c)}
                  onStarClick={() => onToggleFavourite(c.id)}
                />
              ))
            )}
          </Section>
        ) : (
          <>
            <Section
              title="Watchlist"
              icon={<Star size={12} />}
              right={favourites.length > 0 ? `${favourites.length}` : undefined}
            >
              {favourites.length === 0 ? (
                <Empty>Star countries to watch them here.</Empty>
              ) : (
                favourites.map((c) => (
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
                ))
              )}
            </Section>

            <Section
              title="Active conflicts"
              icon={<Flame size={12} />}
              accent="conflict"
              right={`${activeConflicts.length}`}
            >
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
            </Section>

            <Section
              title="Tensions to watch"
              icon={<AlertTriangle size={12} />}
              accent="tension"
              right={`${tensions.length}`}
            >
              {tensions.map((c) => (
                <CountryRow
                  key={c.id}
                  country={c}
                  selected={selectedId === c.id}
                  isFavourite={favouriteIds.includes(c.id)}
                  onClick={() => onSelect(c)}
                  onStarClick={() => onToggleFavourite(c.id)}
                />
              ))}
            </Section>

            <Section
              title="Latest agreements"
              icon={<Handshake size={12} />}
              right={`${latestAgreements.length}`}
            >
              {latestAgreements.map(({ country, agreement }) => (
                <AgreementRow
                  key={country.id + agreement.date + agreement.partner}
                  country={country}
                  partner={agreement.partner}
                  date={agreement.date}
                  summary={agreement.summary}
                  onClick={() => onSelect(country)}
                />
              ))}
            </Section>
          </>
        )}
        <div className="h-4" />
      </div>

      <div className="border-t border-line px-5 py-3 text-[10px] uppercase tracking-wider text-ink-subtle">
        Mock data · Demo build · v0.1
      </div>
    </aside>
  );
}

function Section({
  title,
  icon,
  right,
  accent,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  accent?: "conflict" | "tension";
  children: React.ReactNode;
}) {
  const accentDot =
    accent === "conflict" ? "bg-signal-conflict" : accent === "tension" ? "bg-signal-tension" : null;
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between px-5 pb-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          {accentDot && <span className={cn("h-1.5 w-1.5 rounded-full", accentDot)} />}
          {icon}
          <span>{title}</span>
        </div>
        {right !== undefined && (
          <span className="text-[10px] font-medium text-ink-subtle">{right}</span>
        )}
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-surface-sunken px-3 py-3 text-xs text-ink-subtle">
      {children}
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
        "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors",
        selected ? "bg-ink text-white" : "text-ink hover:bg-surface-sunken"
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="text-base leading-none">{country.flag}</span>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-medium">{country.name}</span>
          <span
            className={cn(
              "truncate text-[11px]",
              selected ? "text-white/70" : "text-ink-subtle"
            )}
          >
            {country.region}
          </span>
        </div>
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
            size={13}
            strokeWidth={2}
            className={cn(isFavourite ? "fill-current" : "fill-none")}
          />
        </button>
      </div>
    </div>
  );
}

function AgreementRow({
  country,
  partner,
  date,
  summary,
  onClick,
}: {
  country: Country;
  partner: string;
  date: string;
  summary: string;
  onClick: () => void;
}) {
  // Try to render the partner's flag too if it's a known country
  const partnerCountry = Object.values(COUNTRIES_BY_ID).find(
    (c) => c.name === partner || partner.includes(c.name)
  );

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-surface-sunken"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>{country.flag}</span>
          <span>{country.name}</span>
          <span className="text-ink-subtle">·</span>
          {partnerCountry && <span>{partnerCountry.flag}</span>}
          <span className="truncate">{partner}</span>
        </div>
        <span className="shrink-0 text-[10px] text-ink-subtle">{date}</span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted">{summary}</p>
    </div>
  );
}

function statusVariant(status: Country["status"]) {
  if (status === "stable") return "stable" as const;
  if (status === "tension") return "tension" as const;
  if (status === "conflict") return "conflict" as const;
  return "war" as const;
}
