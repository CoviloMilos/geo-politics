import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Country, COUNTRIES_BY_ID, resolveCountryId, Status } from "@/data/countries";
import { cn } from "@/lib/utils";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FILL: Record<Status | "neutral", { base: string; hover: string; selected: string }> = {
  neutral: { base: "#e4e4e7", hover: "#d4d4d8", selected: "#a1a1aa" },
  stable: { base: "#dcfce7", hover: "#bbf7d0", selected: "#86efac" },
  tension: { base: "#fef3c7", hover: "#fde68a", selected: "#fcd34d" },
  conflict: { base: "#fecaca", hover: "#fca5a5", selected: "#f87171" },
  war: { base: "#fca5a5", hover: "#f87171", selected: "#ef4444" },
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
    coordinates: [10, 20],
    zoom: 1,
  });

  const favSet = useMemo(() => new Set(favouriteIds), [favouriteIds]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-sunken">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          maxZoom={8}
          minZoom={1}
          onMoveEnd={(p) => setPosition(p)}
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
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
        <button
          type="button"
          onClick={() => setPosition((p) => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }))}
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
          onClick={() => setPosition({ coordinates: [10, 20], zoom: 1 })}
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

function MapLegend() {
  const items: { label: string; color: string }[] = [
    { label: "Stable", color: "#86efac" },
    { label: "Tension", color: "#fcd34d" },
    { label: "Conflict", color: "#f87171" },
    { label: "War", color: "#ef4444" },
    { label: "No data", color: "#d4d4d8" },
  ];
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-line bg-surface/95 px-3 py-2 shadow-soft backdrop-blur">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ background: it.color }}
          />
          <span className="text-[11px] text-ink-muted">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
