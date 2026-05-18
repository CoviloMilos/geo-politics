import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Country, COUNTRIES, COUNTRIES_BY_ID, resolveCountryId, Status } from "@/data/countries";
import { CAPITAL_COORDS, REGIONS } from "@/data/coordinates";
import { cn } from "@/lib/utils";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FILL: Record<Status | "neutral", { base: string; hover: string; selected: string }> = {
  neutral: { base: "#e4e4e7", hover: "#d4d4d8", selected: "#a1a1aa" },
  stable:  { base: "#e8f0ea", hover: "#d1e5d6", selected: "#9dc7a8" },
  tension: { base: "#fff1d6", hover: "#ffe0a8", selected: "#f5b657" },
  conflict:{ base: "#fde2e2", hover: "#fbc8c8", selected: "#f06a6a" },
  war:     { base: "#fbb4b4", hover: "#f58484", selected: "#dc2626" },
};

interface Props {
  selectedId: string | null;
  hoveredId: string | null;
  favouriteIds: string[];
  onSelect: (country: Country) => void;
  onHover: (id: string | null) => void;
}

export function WorldMap({
  selectedId,
  hoveredId,
  favouriteIds,
  onSelect,
  onHover,
}: Props) {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: REGIONS[0].coordinates,
    zoom: REGIONS[0].zoom,
  });
  const [activeRegion, setActiveRegion] = useState<string>("world");

  const favSet = useMemo(() => new Set(favouriteIds), [favouriteIds]);

  const conflictMarkers = useMemo(
    () =>
      COUNTRIES.filter((c) => c.status === "war" || c.status === "conflict").map((c) => ({
        country: c,
        coords: CAPITAL_COORDS[c.id],
      })).filter((m) => m.coords),
    []
  );

  const setRegion = (id: string) => {
    const r = REGIONS.find((x) => x.id === id);
    if (!r) return;
    setActiveRegion(id);
    setPosition({ coordinates: r.coordinates, zoom: r.zoom });
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-sunken">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [0, 25] }}
        width={980}
        height={520}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          maxZoom={12}
          minZoom={1}
          onMoveEnd={(p) => {
            setPosition(p);
            setActiveRegion("");
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name: string | undefined = geo.properties?.name;
                const id = resolveCountryId(name);
                const country = id ? COUNTRIES_BY_ID[id] : undefined;
                const status: Status | "neutral" = country?.status ?? "neutral";
                const palette = FILL[status];
                const isSelected = id && selectedId === id;
                const isHovered = id && hoveredId === id;
                const isFav = id && favSet.has(id);

                let fill = palette.base;
                if (isHovered) fill = palette.hover;
                if (isSelected) fill = palette.selected;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => id && onHover(id)}
                    onMouseLeave={() => onHover(null)}
                    onClick={() => country && onSelect(country)}
                    className={cn(isFav && isHovered ? "country-glow" : undefined)}
                    style={{
                      default: {
                        fill,
                        stroke: "#ffffff",
                        strokeWidth: 0.55,
                        outline: "none",
                        cursor: country ? "pointer" : "default",
                        transition: "fill 180ms ease",
                      },
                      hover: {
                        fill: palette.hover,
                        stroke: "#ffffff",
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                      pressed: {
                        fill: palette.selected,
                        stroke: "#ffffff",
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Conflict signals — pulsing rings on capital coordinates */}
          {conflictMarkers.map(({ country, coords }) => (
            <Marker
              key={country.id}
              coordinates={coords}
              onClick={() => onSelect(country)}
              style={{ default: { cursor: "pointer" } }}
            >
              <ConflictPulse intensity={country.status === "war" ? "war" : "conflict"} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Region quick-zoom */}
      <div className="absolute left-4 top-4 flex items-center gap-1 rounded-xl border border-line bg-surface/95 p-1 shadow-soft backdrop-blur">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRegion(r.id)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
              activeRegion === r.id
                ? "bg-ink text-white"
                : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
        <button
          type="button"
          onClick={() => setPosition((p) => ({ ...p, zoom: Math.min(p.zoom * 1.5, 12) }))}
          className="px-3 py-2 text-sm text-ink-muted hover:bg-surface-sunken hover:text-ink"
          aria-label="Zoom in"
        >
          +
        </button>
        <div className="h-px bg-line" />
        <button
          type="button"
          onClick={() => setPosition((p) => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }))}
          className="px-3 py-2 text-sm text-ink-muted hover:bg-surface-sunken hover:text-ink"
          aria-label="Zoom out"
        >
          −
        </button>
        <div className="h-px bg-line" />
        <button
          type="button"
          onClick={() => setRegion("world")}
          className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink-muted hover:bg-surface-sunken hover:text-ink"
          aria-label="Reset view"
        >
          Reset
        </button>
      </div>

      <MapLegend />
    </div>
  );
}

function ConflictPulse({ intensity }: { intensity: "war" | "conflict" }) {
  const color = intensity === "war" ? "#dc2626" : "#ef4444";
  const dur = intensity === "war" ? "1.6s" : "2.2s";
  const ringR = intensity === "war" ? 18 : 14;
  return (
    <g style={{ pointerEvents: "auto" }}>
      <circle r={ringR} fill={color} fillOpacity={0.25}>
        <animate
          attributeName="r"
          from="3"
          to={ringR}
          dur={dur}
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.55"
          to="0"
          dur={dur}
          repeatCount="indefinite"
        />
      </circle>
      <circle r={3.2} fill={color} stroke="#ffffff" strokeWidth={0.8} />
    </g>
  );
}

function MapLegend() {
  const items: { label: string; color: string }[] = [
    { label: "Stable", color: "#9dc7a8" },
    { label: "Tension", color: "#f5b657" },
    { label: "Conflict", color: "#f06a6a" },
    { label: "War", color: "#dc2626" },
    { label: "No data", color: "#d4d4d8" },
  ];
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl border border-line bg-surface/95 px-4 py-2.5 shadow-soft backdrop-blur">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ background: it.color }}
          />
          <span className="text-xs text-ink-muted">{it.label}</span>
        </div>
      ))}
      <div className="ml-2 flex items-center gap-1.5 border-l border-line pl-4">
        <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600" />
        </span>
        <span className="text-xs text-ink-muted">Active conflict signal</span>
      </div>
    </div>
  );
}
