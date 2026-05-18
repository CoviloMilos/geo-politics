import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-line bg-surface px-6">
      <div className="flex items-center gap-6 text-sm text-ink-muted">
        <button className="font-medium text-ink">Map</button>
        <button className="hover:text-ink">Rankings</button>
        <button className="hover:text-ink">Reports</button>
        <button className="hover:text-ink">Alerts</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
          />
          <input
            placeholder="Search the world…"
            className="w-72 rounded-lg border border-line bg-surface-sunken py-1.5 pl-8 pr-3 text-sm placeholder:text-ink-subtle focus:border-ink/30 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>
        <button className="relative rounded-lg p-2 text-ink-muted hover:bg-surface-sunken hover:text-ink">
          <Bell size={14} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-conflict" />
        </button>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-semibold uppercase text-white">
          MC
        </div>
      </div>
    </header>
  );
}
