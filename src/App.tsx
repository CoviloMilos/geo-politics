import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { StatusBar } from "@/components/StatusBar";
import { WorldMap } from "@/components/WorldMap";
import { CountryPanel } from "@/components/CountryPanel";
import { HoverCard } from "@/components/HoverCard";
import { Country, COUNTRIES_BY_ID } from "@/data/countries";

export default function App() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favHoverId, setFavHoverId] = useState<string | null>(null);
  const [favouriteIds, setFavouriteIds] = useState<string[]>(["ua", "il", "cn"]);

  const handleSelect = (country: Country) => {
    setSelected(country);
    setPanelOpen(true);
  };

  const handleClosePanel = () => setPanelOpen(false);

  const toggleFavourite = (id: string) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const hoveredCountry = hoveredId ? COUNTRIES_BY_ID[hoveredId] ?? null : null;

  return (
    <div className="flex h-full w-full bg-surface-alt">
      <Sidebar
        selectedId={selected?.id ?? null}
        favouriteIds={favouriteIds}
        onSelect={handleSelect}
        onHoverFavourite={setFavHoverId}
        onToggleFavourite={toggleFavourite}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <StatusBar />
        <main className="relative flex-1">
          <WorldMap
            selectedId={selected?.id ?? null}
            hoveredId={favHoverId ?? hoveredId}
            favouriteIds={favouriteIds}
            onSelect={handleSelect}
            onHover={setHoveredId}
          />
          <HoverCard country={hoveredCountry} />
        </main>
      </div>

      <CountryPanel
        country={selected}
        open={panelOpen}
        isFavourite={selected ? favouriteIds.includes(selected.id) : false}
        onClose={handleClosePanel}
        onToggleFavourite={() => selected && toggleFavourite(selected.id)}
      />
    </div>
  );
}
