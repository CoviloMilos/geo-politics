import { Country } from "@/data/countries";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader, CardTitle, StatTile } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  cn,
  formatBillions,
  formatNumber,
  formatTrillions,
} from "@/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Atom, Flame, ShieldAlert, X, Star } from "lucide-react";

interface Props {
  country: Country | null;
  open: boolean;
  isFavourite: boolean;
  onClose: () => void;
  onToggleFavourite: () => void;
}

export function CountryPanel({
  country,
  open,
  isFavourite,
  onClose,
  onToggleFavourite,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      {country && (
        <div className="flex h-full flex-col">
          <PanelHeader
            country={country}
            isFavourite={isFavourite}
            onClose={onClose}
            onToggleFavourite={onToggleFavourite}
          />
          <div className="flex-1 overflow-y-auto scroll-soft px-5 pb-8">
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="economy">Economy</TabsTrigger>
                <TabsTrigger value="military">Military</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
                <TabsTrigger value="diplomacy">Diplomacy</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab country={country} />
              </TabsContent>
              <TabsContent value="economy">
                <EconomyTab country={country} />
              </TabsContent>
              <TabsContent value="military">
                <MilitaryTab country={country} />
              </TabsContent>
              <TabsContent value="science">
                <ScienceTab country={country} />
              </TabsContent>
              <TabsContent value="diplomacy">
                <DiplomacyTab country={country} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Sheet>
  );
}

function PanelHeader({
  country,
  isFavourite,
  onClose,
  onToggleFavourite,
}: {
  country: Country;
  isFavourite: boolean;
  onClose: () => void;
  onToggleFavourite: () => void;
}) {
  return (
    <div className="border-b border-line px-5 pb-4 pt-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-sunken text-2xl leading-none">
            {country.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">
                {country.name}
              </h2>
              <span className="text-[10px] font-medium uppercase tracking-wider text-ink-subtle">
                {country.iso3}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-ink-muted">
              {country.capital} · {country.region} · {formatNumber(country.population)} people
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleFavourite}
            className={cn(
              "rounded-lg p-2 transition-colors",
              isFavourite
                ? "text-ink"
                : "text-ink-subtle hover:bg-surface-sunken hover:text-ink"
            )}
            aria-label="Toggle watchlist"
          >
            <Star size={15} className={isFavourite ? "fill-current" : ""} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-subtle hover:bg-surface-sunken hover:text-ink"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge variant={statusVariant(country.status)}>
          {country.status === "war" || country.status === "conflict" ? (
            <Flame size={10} className="mr-0.5" />
          ) : null}
          {country.status}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {country.government}
        </Badge>
        {country.military.nuclear && (
          <Badge variant="nuclear">
            <Atom size={10} /> Nuclear
          </Badge>
        )}
        {country.alliances.slice(0, 3).map((a) => (
          <Badge key={a} variant="subtle">
            {a}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function OverviewTab({ country }: { country: Country }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <StatTile
          label="GDP"
          value={formatTrillions(country.economy.gdp)}
          hint={`${country.economy.gdpGrowth >= 0 ? "+" : ""}${country.economy.gdpGrowth}% growth`}
        />
        <StatTile
          label="GDP per capita"
          value={`$${formatNumber(country.economy.gdpPerCapita)}`}
          hint="USD"
        />
        <StatTile
          label="Military rank"
          value={`#${country.military.globalRank}`}
          hint={`${formatBillions(country.military.spending)} spending`}
        />
        <StatTile
          label="R&D rank"
          value={country.science.globalRank > 0 ? `#${country.science.globalRank}` : "—"}
          hint={`${country.science.rdSpend}% of GDP`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest news</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {country.news.map((n) => (
            <div key={n.headline} className="rounded-lg border border-line px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="subtle" className="capitalize">
                  {n.category}
                </Badge>
                <span className="text-[10px] text-ink-subtle">
                  {n.source} · {n.date}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink">{n.headline}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      {country.conflicts.length > 0 && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active situations</CardTitle>
            <ShieldAlert size={14} className="text-signal-conflict" />
          </CardHeader>
          <CardBody className="space-y-2">
            {country.conflicts.map((c) => (
              <div key={c.with} className="rounded-lg border border-line px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">vs {c.with}</span>
                  <Badge variant={c.type === "war" ? "war" : c.type === "conflict" ? "conflict" : "tension"}>
                    {c.type}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-ink-muted">{c.summary}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function EconomyTab({ country }: { country: Country }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <StatTile label="GDP" value={formatTrillions(country.economy.gdp)} />
        <StatTile label="Growth" value={`${country.economy.gdpGrowth.toFixed(1)}%`} />
        <StatTile label="Inflation" value={`${country.economy.inflation.toFixed(1)}%`} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>GDP trend (USD trillions)</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={country.economy.gdpHistory}>
                <defs>
                  <linearGradient id="gdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0a0a0b" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0a0a0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f4f4f5" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0b",
                    border: "none",
                    borderRadius: 8,
                    color: "white",
                    fontSize: 11,
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0a0a0b"
                  strokeWidth={1.6}
                  fill="url(#gdp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <StatTile
          label="Unemployment"
          value={`${country.economy.unemployment.toFixed(1)}%`}
        />
        <StatTile
          label="GDP per capita"
          value={`$${formatNumber(country.economy.gdpPerCapita)}`}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Key resources</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-1.5">
          {country.resources.map((r) => (
            <Badge key={r} variant="subtle">
              {r}
            </Badge>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function MilitaryTab({ country }: { country: Country }) {
  const compareData = [
    { name: "Spending $B", value: country.military.spending },
    { name: "Personnel (k)", value: country.military.activePersonnel / 1000 },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <StatTile label="Global rank" value={`#${country.military.globalRank}`} />
        <StatTile label="Spending" value={formatBillions(country.military.spending)} />
        <StatTile
          label="Active force"
          value={formatNumber(country.military.activePersonnel)}
        />
      </div>
      {country.military.nuclear && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardBody className="flex items-center gap-2 py-3">
            <Atom size={14} className="text-yellow-700" />
            <div className="text-sm font-medium text-yellow-800">
              Declared nuclear power
            </div>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Force snapshot</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData}>
                <CartesianGrid stroke="#f4f4f5" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0b",
                    border: "none",
                    borderRadius: 8,
                    color: "white",
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="value" fill="#0a0a0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent military news</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {country.news
            .filter((n) => n.category === "military")
            .map((n) => (
              <NewsRow key={n.headline} item={n} />
            ))}
          {country.news.filter((n) => n.category === "military").length === 0 && (
            <div className="text-xs text-ink-subtle">No military news in mock feed.</div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function ScienceTab({ country }: { country: Country }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <StatTile
          label="R&D spend"
          value={`${country.science.rdSpend}%`}
          hint="of GDP"
        />
        <StatTile
          label="Global rank"
          value={country.science.globalRank > 0 ? `#${country.science.globalRank}` : "—"}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Strength areas</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-1.5">
          {country.science.notableAreas.length === 0 ? (
            <span className="text-xs text-ink-subtle">No data.</span>
          ) : (
            country.science.notableAreas.map((a) => (
              <Badge key={a} variant="subtle">
                {a}
              </Badge>
            ))
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent science news</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {country.news
            .filter((n) => n.category === "science")
            .map((n) => (
              <NewsRow key={n.headline} item={n} />
            ))}
          {country.news.filter((n) => n.category === "science").length === 0 && (
            <div className="text-xs text-ink-subtle">No science news in mock feed.</div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function DiplomacyTab({ country }: { country: Country }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Alliances & blocs</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-wrap gap-1.5">
          {country.alliances.length === 0 ? (
            <span className="text-xs text-ink-subtle">Unaligned in mock feed.</span>
          ) : (
            country.alliances.map((a) => (
              <Badge key={a} variant="outline">
                {a}
              </Badge>
            ))
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent agreements</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {country.recentAgreements.length === 0 ? (
            <span className="text-xs text-ink-subtle">No agreements in mock feed.</span>
          ) : (
            country.recentAgreements.map((a) => (
              <div
                key={a.date + a.partner}
                className="rounded-lg border border-line px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">with {a.partner}</span>
                  <span className="text-[10px] text-ink-subtle">{a.date}</span>
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">{a.summary}</p>
              </div>
            ))
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Frictions</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {country.conflicts.length === 0 ? (
            <span className="text-xs text-ink-subtle">None reported in mock feed.</span>
          ) : (
            country.conflicts.map((c) => (
              <div
                key={c.with}
                className="rounded-lg border border-line px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">vs {c.with}</span>
                  <Badge variant={c.type === "war" ? "war" : c.type === "conflict" ? "conflict" : "tension"}>
                    {c.type}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">{c.summary}</p>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function NewsRow({ item }: { item: Country["news"][number] }) {
  return (
    <div className="rounded-lg border border-line px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="subtle" className="capitalize">
          {item.category}
        </Badge>
        <span className="text-[10px] text-ink-subtle">
          {item.source} · {item.date}
        </span>
      </div>
      <p className="mt-1 text-sm text-ink">{item.headline}</p>
    </div>
  );
}

function statusVariant(status: Country["status"]) {
  if (status === "stable") return "stable" as const;
  if (status === "tension") return "tension" as const;
  if (status === "conflict") return "conflict" as const;
  return "war" as const;
}
