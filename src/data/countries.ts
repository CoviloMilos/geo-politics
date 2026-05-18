export type Government =
  | "democracy"
  | "republic"
  | "monarchy"
  | "authoritarian"
  | "theocracy"
  | "communist";

export type Status = "stable" | "tension" | "conflict" | "war";

export interface NewsItem {
  date: string;
  source: string;
  headline: string;
  category: "economy" | "military" | "science" | "diplomacy" | "general";
}

export interface Agreement {
  date: string;
  partner: string;
  summary: string;
}

export interface Conflict {
  with: string;
  type: "war" | "conflict" | "tension" | "dispute";
  summary: string;
}

export interface Country {
  id: string;
  iso2: string;
  iso3: string;
  name: string;
  flag: string;
  capital: string;
  population: number;
  government: Government;
  status: Status;
  region: string;
  economy: {
    gdp: number; // USD trillions
    gdpPerCapita: number;
    gdpGrowth: number; // %
    inflation: number; // %
    unemployment: number; // %
    gdpHistory: { year: number; value: number }[];
  };
  military: {
    spending: number; // USD billions
    activePersonnel: number;
    nuclear: boolean;
    globalRank: number;
  };
  science: {
    rdSpend: number; // % of GDP
    globalRank: number;
    notableAreas: string[];
  };
  resources: string[];
  alliances: string[];
  recentAgreements: Agreement[];
  conflicts: Conflict[];
  news: NewsItem[];
}

const trend = (start: number, growth: number[]): { year: number; value: number }[] => {
  const baseYear = 2018;
  let v = start;
  return growth.map((g, i) => {
    v = v * (1 + g / 100);
    return { year: baseYear + i, value: Number(v.toFixed(2)) };
  });
};

export const COUNTRIES: Country[] = [
  {
    id: "us",
    iso2: "US",
    iso3: "USA",
    name: "United States",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    population: 334_900_000,
    government: "democracy",
    status: "stable",
    region: "North America",
    economy: {
      gdp: 27.36,
      gdpPerCapita: 81_695,
      gdpGrowth: 2.5,
      inflation: 3.1,
      unemployment: 3.9,
      gdpHistory: trend(20.5, [2.3, 2.9, -2.8, 5.9, 2.1, 2.5, 2.7]),
    },
    military: { spending: 916, activePersonnel: 1_320_000, nuclear: true, globalRank: 1 },
    science: {
      rdSpend: 3.46,
      globalRank: 2,
      notableAreas: ["AI", "Aerospace", "Biotech", "Semiconductors"],
    },
    resources: ["Oil", "Natural gas", "Coal", "Rare earths"],
    alliances: ["NATO", "Five Eyes", "QUAD", "G7", "OECD"],
    recentAgreements: [
      { date: "2025-11-04", partner: "Japan", summary: "Semiconductor co-investment pact." },
      { date: "2025-09-22", partner: "EU", summary: "Critical minerals trade framework." },
      { date: "2025-07-12", partner: "Philippines", summary: "Expanded defence cooperation." },
    ],
    conflicts: [
      { with: "China", type: "tension", summary: "Trade and technology competition; Taiwan posture." },
    ],
    news: [
      { date: "2026-05-12", source: "Reuters", headline: "Fed signals slower pace of cuts amid sticky services inflation.", category: "economy" },
      { date: "2026-05-09", source: "AP", headline: "Pentagon outlines Indo-Pacific posture review.", category: "military" },
      { date: "2026-05-03", source: "WSJ", headline: "Chip subsidies pull $42B in private commitments.", category: "science" },
    ],
  },
  {
    id: "cn",
    iso2: "CN",
    iso3: "CHN",
    name: "China",
    flag: "🇨🇳",
    capital: "Beijing",
    population: 1_409_670_000,
    government: "communist",
    status: "tension",
    region: "Asia",
    economy: {
      gdp: 17.79,
      gdpPerCapita: 12_614,
      gdpGrowth: 5.2,
      inflation: 0.6,
      unemployment: 5.1,
      gdpHistory: trend(13.9, [6.7, 6.0, 2.2, 8.1, 3.0, 5.2, 4.8]),
    },
    military: { spending: 296, activePersonnel: 2_035_000, nuclear: true, globalRank: 3 },
    science: {
      rdSpend: 2.43,
      globalRank: 1,
      notableAreas: ["AI", "5G", "EVs", "Solar", "Quantum"],
    },
    resources: ["Rare earths", "Coal", "Steel", "Lithium"],
    alliances: ["BRICS", "SCO"],
    recentAgreements: [
      { date: "2025-12-01", partner: "Saudi Arabia", summary: "Yuan-settled crude oil framework." },
      { date: "2025-10-18", partner: "Russia", summary: "Extended gas pipeline financing." },
    ],
    conflicts: [
      { with: "United States", type: "tension", summary: "Trade, tech, and Taiwan strait posture." },
      { with: "Taiwan", type: "dispute", summary: "Sovereignty claim; cross-strait air incursions." },
      { with: "Philippines", type: "tension", summary: "South China Sea maritime standoffs." },
    ],
    news: [
      { date: "2026-05-14", source: "SCMP", headline: "Yuan-settled crude volume hits new monthly high.", category: "economy" },
      { date: "2026-05-10", source: "Xinhua", headline: "PLA Navy conducts dual carrier drills in South China Sea.", category: "military" },
      { date: "2026-05-04", source: "Caixin", headline: "Domestic EV exports rebound 11% YoY.", category: "economy" },
    ],
  },
  {
    id: "ru",
    iso2: "RU",
    iso3: "RUS",
    name: "Russia",
    flag: "🇷🇺",
    capital: "Moscow",
    population: 144_400_000,
    government: "authoritarian",
    status: "war",
    region: "Europe / Asia",
    economy: {
      gdp: 2.02,
      gdpPerCapita: 13_817,
      gdpGrowth: 3.6,
      inflation: 7.4,
      unemployment: 2.9,
      gdpHistory: trend(1.66, [2.0, 2.2, -2.7, 5.9, -1.2, 3.6, 2.6]),
    },
    military: { spending: 109, activePersonnel: 1_320_000, nuclear: true, globalRank: 2 },
    science: { rdSpend: 0.94, globalRank: 12, notableAreas: ["Aerospace", "Nuclear", "Cyber"] },
    resources: ["Oil", "Natural gas", "Wheat", "Nickel", "Palladium"],
    alliances: ["CSTO", "BRICS", "SCO"],
    recentAgreements: [
      { date: "2025-10-18", partner: "China", summary: "Extended energy financing in yuan." },
      { date: "2025-08-30", partner: "Iran", summary: "Strategic partnership treaty signed." },
    ],
    conflicts: [
      { with: "Ukraine", type: "war", summary: "Full-scale war ongoing since February 2022." },
      { with: "NATO", type: "tension", summary: "Heightened posture along eastern flank." },
    ],
    news: [
      { date: "2026-05-15", source: "TASS", headline: "Ruble steadies as central bank holds rates at 16%.", category: "economy" },
      { date: "2026-05-13", source: "Reuters", headline: "Heavy fighting reported around Pokrovsk axis.", category: "military" },
      { date: "2026-05-08", source: "Bloomberg", headline: "Oil revenue rises on discounted shipments to Asia.", category: "economy" },
    ],
  },
  {
    id: "ua",
    iso2: "UA",
    iso3: "UKR",
    name: "Ukraine",
    flag: "🇺🇦",
    capital: "Kyiv",
    population: 37_500_000,
    government: "democracy",
    status: "war",
    region: "Europe",
    economy: {
      gdp: 0.179,
      gdpPerCapita: 4_770,
      gdpGrowth: 4.7,
      inflation: 5.1,
      unemployment: 18.2,
      gdpHistory: trend(0.153, [3.5, 3.2, -3.8, 3.4, -28.8, 5.3, 4.7]),
    },
    military: { spending: 64, activePersonnel: 900_000, nuclear: false, globalRank: 18 },
    science: { rdSpend: 0.41, globalRank: 47, notableAreas: ["Drones", "Aerospace", "Cyber"] },
    resources: ["Wheat", "Iron ore", "Lithium", "Titanium"],
    alliances: ["EU candidate", "NATO partner"],
    recentAgreements: [
      { date: "2025-11-22", partner: "EU", summary: "€50B Ukraine Facility tranche disbursed." },
      { date: "2025-09-15", partner: "United States", summary: "Long-range munitions agreement." },
    ],
    conflicts: [
      { with: "Russia", type: "war", summary: "Defensive war since February 2022." },
    ],
    news: [
      { date: "2026-05-16", source: "Kyiv Independent", headline: "Drone strikes target Russian refining capacity.", category: "military" },
      { date: "2026-05-12", source: "FT", headline: "EU finalizes seventh aid disbursement.", category: "economy" },
      { date: "2026-05-05", source: "BBC", headline: "Power grid stabilizes ahead of summer load.", category: "general" },
    ],
  },
  {
    id: "il",
    iso2: "IL",
    iso3: "ISR",
    name: "Israel",
    flag: "🇮🇱",
    capital: "Jerusalem",
    population: 9_840_000,
    government: "democracy",
    status: "conflict",
    region: "Middle East",
    economy: {
      gdp: 0.521,
      gdpPerCapita: 52_960,
      gdpGrowth: 2.0,
      inflation: 3.0,
      unemployment: 3.4,
      gdpHistory: trend(0.373, [4.1, 3.8, -1.5, 8.6, 6.5, 2.0, 1.6]),
    },
    military: { spending: 27.5, activePersonnel: 170_000, nuclear: true, globalRank: 17 },
    science: {
      rdSpend: 5.71,
      globalRank: 6,
      notableAreas: ["Cybersecurity", "AI", "Defense tech", "Biotech"],
    },
    resources: ["Natural gas", "Potash"],
    alliances: ["Abraham Accords", "US strategic ally"],
    recentAgreements: [
      { date: "2025-12-09", partner: "Cyprus", summary: "Eastern Mediterranean gas corridor MoU." },
      { date: "2025-08-04", partner: "UAE", summary: "Tech transfer and joint VC fund." },
    ],
    conflicts: [
      { with: "Hamas / Gaza", type: "war", summary: "Ongoing conflict in Gaza." },
      { with: "Hezbollah / Lebanon", type: "conflict", summary: "Cross-border exchanges in the north." },
      { with: "Iran", type: "tension", summary: "Proxy and direct strikes; nuclear program standoff." },
    ],
    news: [
      { date: "2026-05-15", source: "Haaretz", headline: "Cabinet debates phased northern de-escalation.", category: "military" },
      { date: "2026-05-11", source: "Globes", headline: "Tech exports rise 8% despite war drag.", category: "economy" },
    ],
  },
  {
    id: "ir",
    iso2: "IR",
    iso3: "IRN",
    name: "Iran",
    flag: "🇮🇷",
    capital: "Tehran",
    population: 89_200_000,
    government: "theocracy",
    status: "tension",
    region: "Middle East",
    economy: {
      gdp: 0.404,
      gdpPerCapita: 4_530,
      gdpGrowth: 3.3,
      inflation: 40.7,
      unemployment: 8.2,
      gdpHistory: trend(0.46, [-6.0, -6.8, 1.9, 4.7, 3.8, 3.3, 3.0]),
    },
    military: { spending: 10.3, activePersonnel: 610_000, nuclear: false, globalRank: 14 },
    science: { rdSpend: 0.83, globalRank: 22, notableAreas: ["Missiles", "Drones", "Nuclear"] },
    resources: ["Oil", "Natural gas", "Copper"],
    alliances: ["BRICS", "SCO"],
    recentAgreements: [
      { date: "2025-08-30", partner: "Russia", summary: "Strategic partnership treaty signed." },
      { date: "2025-05-12", partner: "Pakistan", summary: "Border security framework." },
    ],
    conflicts: [
      { with: "Israel", type: "tension", summary: "Direct and proxy exchanges; nuclear standoff." },
      { with: "United States", type: "tension", summary: "Sanctions, regional posture." },
    ],
    news: [
      { date: "2026-05-13", source: "Al Jazeera", headline: "IAEA flags reduced inspection access.", category: "diplomacy" },
      { date: "2026-05-07", source: "Reuters", headline: "Oil exports to Asia hit 1.7M bpd.", category: "economy" },
    ],
  },
  {
    id: "sa",
    iso2: "SA",
    iso3: "SAU",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    capital: "Riyadh",
    population: 36_400_000,
    government: "monarchy",
    status: "stable",
    region: "Middle East",
    economy: {
      gdp: 1.07,
      gdpPerCapita: 32_881,
      gdpGrowth: -0.8,
      inflation: 2.3,
      unemployment: 4.4,
      gdpHistory: trend(0.79, [0.3, -0.7, -4.3, 5.1, 8.7, -0.8, 1.6]),
    },
    military: { spending: 75.8, activePersonnel: 257_000, nuclear: false, globalRank: 23 },
    science: { rdSpend: 0.46, globalRank: 31, notableAreas: ["Energy", "Desalination"] },
    resources: ["Oil", "Natural gas"],
    alliances: ["GCC", "OPEC+", "Arab League"],
    recentAgreements: [
      { date: "2025-12-01", partner: "China", summary: "Yuan-settled oil pilot framework." },
      { date: "2025-06-18", partner: "United States", summary: "Civil nuclear talks resumed." },
    ],
    conflicts: [
      { with: "Houthis / Yemen", type: "tension", summary: "Truce holding, intermittent incidents." },
    ],
    news: [
      { date: "2026-05-14", source: "Arab News", headline: "NEOM phase-1 milestones formally revised.", category: "economy" },
      { date: "2026-05-09", source: "Reuters", headline: "Aramco maintains output cuts through Q3.", category: "economy" },
    ],
  },
  {
    id: "gb",
    iso2: "GB",
    iso3: "GBR",
    name: "United Kingdom",
    flag: "🇬🇧",
    capital: "London",
    population: 68_300_000,
    government: "democracy",
    status: "stable",
    region: "Europe",
    economy: {
      gdp: 3.34,
      gdpPerCapita: 48_867,
      gdpGrowth: 0.5,
      inflation: 2.3,
      unemployment: 4.2,
      gdpHistory: trend(2.86, [1.6, 1.4, -10.4, 8.7, 4.3, 0.1, 0.5]),
    },
    military: { spending: 75, activePersonnel: 184_000, nuclear: true, globalRank: 6 },
    science: { rdSpend: 2.91, globalRank: 5, notableAreas: ["AI", "Pharma", "Aerospace"] },
    resources: ["North Sea oil & gas"],
    alliances: ["NATO", "Five Eyes", "G7", "AUKUS"],
    recentAgreements: [
      { date: "2025-11-20", partner: "Australia", summary: "AUKUS pillar-2 technology MoU." },
      { date: "2025-09-08", partner: "Japan", summary: "Hiroshima Accord defense framework." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-14", source: "FT", headline: "BoE holds rates; cuts expected in autumn.", category: "economy" },
      { date: "2026-05-11", source: "BBC", headline: "Carrier strike group deploys to Pacific.", category: "military" },
    ],
  },
  {
    id: "fr",
    iso2: "FR",
    iso3: "FRA",
    name: "France",
    flag: "🇫🇷",
    capital: "Paris",
    population: 68_400_000,
    government: "democracy",
    status: "stable",
    region: "Europe",
    economy: {
      gdp: 3.03,
      gdpPerCapita: 44_408,
      gdpGrowth: 0.9,
      inflation: 2.3,
      unemployment: 7.5,
      gdpHistory: trend(2.78, [1.8, 1.9, -7.7, 6.4, 2.6, 0.9, 1.1]),
    },
    military: { spending: 61.3, activePersonnel: 203_000, nuclear: true, globalRank: 7 },
    science: { rdSpend: 2.22, globalRank: 9, notableAreas: ["Aerospace", "Nuclear", "Pharma"] },
    resources: ["Uranium", "Agriculture"],
    alliances: ["NATO", "EU", "G7", "OECD"],
    recentAgreements: [
      { date: "2025-10-04", partner: "India", summary: "Joint defence production roadmap." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-13", source: "Le Monde", headline: "Government tables 2027 budget framework.", category: "economy" },
    ],
  },
  {
    id: "de",
    iso2: "DE",
    iso3: "DEU",
    name: "Germany",
    flag: "🇩🇪",
    capital: "Berlin",
    population: 84_400_000,
    government: "democracy",
    status: "stable",
    region: "Europe",
    economy: {
      gdp: 4.46,
      gdpPerCapita: 52_823,
      gdpGrowth: 0.0,
      inflation: 2.4,
      unemployment: 5.9,
      gdpHistory: trend(4.0, [1.1, 1.1, -4.1, 3.7, 1.8, -0.3, 0.0]),
    },
    military: { spending: 66.8, activePersonnel: 181_000, nuclear: false, globalRank: 8 },
    science: { rdSpend: 3.13, globalRank: 4, notableAreas: ["Engineering", "Auto", "Chemicals"] },
    resources: ["Coal", "Lignite"],
    alliances: ["NATO", "EU", "G7", "OECD"],
    recentAgreements: [
      { date: "2025-11-12", partner: "Norway", summary: "Long-term hydrogen import pact." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-12", source: "Handelsblatt", headline: "Industrial output ticks up after three quarters flat.", category: "economy" },
    ],
  },
  {
    id: "ca",
    iso2: "CA",
    iso3: "CAN",
    name: "Canada",
    flag: "🇨🇦",
    capital: "Ottawa",
    population: 40_770_000,
    government: "democracy",
    status: "stable",
    region: "North America",
    economy: {
      gdp: 2.14,
      gdpPerCapita: 53_247,
      gdpGrowth: 1.1,
      inflation: 2.7,
      unemployment: 6.1,
      gdpHistory: trend(1.72, [2.0, 1.9, -5.0, 5.3, 3.8, 1.1, 1.2]),
    },
    military: { spending: 27.2, activePersonnel: 70_000, nuclear: false, globalRank: 27 },
    science: { rdSpend: 1.55, globalRank: 16, notableAreas: ["AI", "Mining tech", "Clean energy"] },
    resources: ["Oil sands", "Potash", "Uranium", "Timber"],
    alliances: ["NATO", "Five Eyes", "G7", "OECD"],
    recentAgreements: [
      { date: "2025-09-20", partner: "EU", summary: "Critical minerals partnership renewed." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-14", source: "Globe and Mail", headline: "Bank of Canada signals cautious easing path.", category: "economy" },
    ],
  },
  {
    id: "jp",
    iso2: "JP",
    iso3: "JPN",
    name: "Japan",
    flag: "🇯🇵",
    capital: "Tokyo",
    population: 124_400_000,
    government: "democracy",
    status: "stable",
    region: "Asia",
    economy: {
      gdp: 4.21,
      gdpPerCapita: 33_834,
      gdpGrowth: 1.9,
      inflation: 2.7,
      unemployment: 2.6,
      gdpHistory: trend(5.04, [0.6, -0.4, -4.1, 2.2, 1.0, 1.9, 0.9]),
    },
    military: { spending: 50.2, activePersonnel: 247_000, nuclear: false, globalRank: 9 },
    science: { rdSpend: 3.41, globalRank: 3, notableAreas: ["Robotics", "Auto", "Materials"] },
    resources: ["Limited; net importer"],
    alliances: ["QUAD", "G7", "US ally", "OECD"],
    recentAgreements: [
      { date: "2025-11-04", partner: "United States", summary: "Semiconductor co-investment pact." },
    ],
    conflicts: [
      { with: "China", type: "tension", summary: "Senkaku islands dispute." },
      { with: "North Korea", type: "tension", summary: "Missile overflights and abduction issue." },
    ],
    news: [
      { date: "2026-05-13", source: "Nikkei", headline: "Yen recovers after MoF signals readiness to act.", category: "economy" },
    ],
  },
  {
    id: "in",
    iso2: "IN",
    iso3: "IND",
    name: "India",
    flag: "🇮🇳",
    capital: "New Delhi",
    population: 1_428_630_000,
    government: "democracy",
    status: "tension",
    region: "Asia",
    economy: {
      gdp: 3.55,
      gdpPerCapita: 2_485,
      gdpGrowth: 7.2,
      inflation: 5.4,
      unemployment: 8.0,
      gdpHistory: trend(2.7, [6.5, 3.9, -5.8, 9.1, 7.0, 7.2, 6.8]),
    },
    military: { spending: 83.6, activePersonnel: 1_455_000, nuclear: true, globalRank: 4 },
    science: { rdSpend: 0.65, globalRank: 11, notableAreas: ["Space", "Pharma", "Software"] },
    resources: ["Coal", "Iron ore", "Bauxite"],
    alliances: ["QUAD", "BRICS", "SCO"],
    recentAgreements: [
      { date: "2025-10-04", partner: "France", summary: "Joint defence production roadmap." },
    ],
    conflicts: [
      { with: "Pakistan", type: "tension", summary: "Kashmir; periodic LoC incidents." },
      { with: "China", type: "dispute", summary: "Disputed LAC in Ladakh." },
    ],
    news: [
      { date: "2026-05-15", source: "The Hindu", headline: "Manufacturing PMI hits 18-month high.", category: "economy" },
    ],
  },
  {
    id: "tr",
    iso2: "TR",
    iso3: "TUR",
    name: "Turkey",
    flag: "🇹🇷",
    capital: "Ankara",
    population: 85_330_000,
    government: "democracy",
    status: "tension",
    region: "Middle East / Europe",
    economy: {
      gdp: 1.11,
      gdpPerCapita: 13_022,
      gdpGrowth: 4.5,
      inflation: 64.8,
      unemployment: 9.4,
      gdpHistory: trend(0.778, [3.0, 0.8, 1.9, 11.4, 5.5, 4.5, 3.8]),
    },
    military: { spending: 15.8, activePersonnel: 355_000, nuclear: false, globalRank: 11 },
    science: { rdSpend: 1.4, globalRank: 19, notableAreas: ["Drones", "Defense exports"] },
    resources: ["Boron", "Coal", "Agriculture"],
    alliances: ["NATO"],
    recentAgreements: [
      { date: "2025-09-30", partner: "Sweden", summary: "Defense industry cooperation MoU." },
    ],
    conflicts: [
      { with: "Greece", type: "tension", summary: "Aegean maritime boundary disputes." },
      { with: "PKK / N. Iraq", type: "conflict", summary: "Cross-border operations ongoing." },
    ],
    news: [
      { date: "2026-05-12", source: "Hurriyet", headline: "Central bank holds rate at 50%.", category: "economy" },
    ],
  },
  {
    id: "br",
    iso2: "BR",
    iso3: "BRA",
    name: "Brazil",
    flag: "🇧🇷",
    capital: "Brasília",
    population: 216_400_000,
    government: "democracy",
    status: "stable",
    region: "South America",
    economy: {
      gdp: 2.17,
      gdpPerCapita: 10_022,
      gdpGrowth: 2.9,
      inflation: 4.6,
      unemployment: 7.8,
      gdpHistory: trend(1.92, [1.8, 1.4, -3.3, 5.0, 3.0, 2.9, 2.1]),
    },
    military: { spending: 22.9, activePersonnel: 366_000, nuclear: false, globalRank: 15 },
    science: { rdSpend: 1.17, globalRank: 21, notableAreas: ["Agritech", "Aerospace"] },
    resources: ["Iron ore", "Soybeans", "Beef", "Oil"],
    alliances: ["BRICS", "Mercosur"],
    recentAgreements: [
      { date: "2025-10-22", partner: "China", summary: "Soy logistics corridor financing." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-11", source: "Folha", headline: "Real strengthens on rate-cut pause.", category: "economy" },
    ],
  },
  {
    id: "au",
    iso2: "AU",
    iso3: "AUS",
    name: "Australia",
    flag: "🇦🇺",
    capital: "Canberra",
    population: 26_640_000,
    government: "democracy",
    status: "stable",
    region: "Oceania",
    economy: {
      gdp: 1.69,
      gdpPerCapita: 63_487,
      gdpGrowth: 1.4,
      inflation: 3.6,
      unemployment: 4.0,
      gdpHistory: trend(1.43, [2.4, 2.0, -1.8, 5.2, 3.8, 1.4, 1.6]),
    },
    military: { spending: 32.3, activePersonnel: 60_000, nuclear: false, globalRank: 22 },
    science: { rdSpend: 1.83, globalRank: 14, notableAreas: ["Mining tech", "Quantum"] },
    resources: ["Iron ore", "Coal", "Lithium", "Gold"],
    alliances: ["AUKUS", "Five Eyes", "QUAD", "ANZUS"],
    recentAgreements: [
      { date: "2025-11-20", partner: "United Kingdom", summary: "AUKUS pillar-2 MoU." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-10", source: "ABC", headline: "RBA holds cash rate at 4.10%.", category: "economy" },
    ],
  },
  {
    id: "mx",
    iso2: "MX",
    iso3: "MEX",
    name: "Mexico",
    flag: "🇲🇽",
    capital: "Mexico City",
    population: 129_000_000,
    government: "democracy",
    status: "tension",
    region: "North America",
    economy: {
      gdp: 1.79,
      gdpPerCapita: 13_804,
      gdpGrowth: 2.4,
      inflation: 4.7,
      unemployment: 2.7,
      gdpHistory: trend(1.22, [2.1, -0.2, -8.5, 5.7, 3.9, 2.4, 1.9]),
    },
    military: { spending: 11.8, activePersonnel: 277_000, nuclear: false, globalRank: 32 },
    science: { rdSpend: 0.28, globalRank: 33, notableAreas: ["Auto", "Aerospace assembly"] },
    resources: ["Oil", "Silver", "Lithium"],
    alliances: ["USMCA", "OECD"],
    recentAgreements: [
      { date: "2025-07-04", partner: "United States", summary: "Joint border security framework refresh." },
    ],
    conflicts: [
      { with: "Cartel violence (internal)", type: "tension", summary: "High-intensity criminal violence." },
    ],
    news: [
      { date: "2026-05-11", source: "El Universal", headline: "Nearshoring FDI hits record quarter.", category: "economy" },
    ],
  },
  {
    id: "kr",
    iso2: "KR",
    iso3: "KOR",
    name: "South Korea",
    flag: "🇰🇷",
    capital: "Seoul",
    population: 51_780_000,
    government: "democracy",
    status: "tension",
    region: "Asia",
    economy: {
      gdp: 1.71,
      gdpPerCapita: 33_120,
      gdpGrowth: 2.5,
      inflation: 2.6,
      unemployment: 2.8,
      gdpHistory: trend(1.72, [2.9, 2.2, -0.7, 4.1, 2.6, 1.4, 2.5]),
    },
    military: { spending: 47.9, activePersonnel: 555_000, nuclear: false, globalRank: 10 },
    science: { rdSpend: 4.93, globalRank: 7, notableAreas: ["Semiconductors", "Displays", "Auto"] },
    resources: ["Limited; net importer"],
    alliances: ["US ally", "OECD"],
    recentAgreements: [
      { date: "2025-12-12", partner: "Japan", summary: "Trilateral with US: extended deterrence framework." },
    ],
    conflicts: [
      { with: "North Korea", type: "tension", summary: "Frequent missile tests; armistice still." },
    ],
    news: [
      { date: "2026-05-15", source: "Yonhap", headline: "Semiconductor exports up 12% YoY.", category: "economy" },
    ],
  },
  {
    id: "kp",
    iso2: "KP",
    iso3: "PRK",
    name: "North Korea",
    flag: "🇰🇵",
    capital: "Pyongyang",
    population: 26_160_000,
    government: "authoritarian",
    status: "tension",
    region: "Asia",
    economy: {
      gdp: 0.029,
      gdpPerCapita: 1_217,
      gdpGrowth: -0.2,
      inflation: 0,
      unemployment: 0,
      gdpHistory: trend(0.03, [-4.1, 0.4, -4.5, -0.1, -1.2, -0.2, 0]),
    },
    military: { spending: 4.4, activePersonnel: 1_280_000, nuclear: true, globalRank: 36 },
    science: { rdSpend: 0, globalRank: 0, notableAreas: ["Missiles", "Nuclear"] },
    resources: ["Coal", "Iron ore", "Rare earths"],
    alliances: ["Russia (treaty)"],
    recentAgreements: [
      { date: "2025-06-19", partner: "Russia", summary: "Comprehensive strategic partnership." },
    ],
    conflicts: [
      { with: "South Korea", type: "tension", summary: "Armistice; periodic provocations." },
      { with: "United States / Japan", type: "tension", summary: "Missile and nuclear program." },
    ],
    news: [
      { date: "2026-05-09", source: "KCNA", headline: "New ICBM cold-launch test announced.", category: "military" },
    ],
  },
  {
    id: "pk",
    iso2: "PK",
    iso3: "PAK",
    name: "Pakistan",
    flag: "🇵🇰",
    capital: "Islamabad",
    population: 240_500_000,
    government: "democracy",
    status: "tension",
    region: "Asia",
    economy: {
      gdp: 0.375,
      gdpPerCapita: 1_561,
      gdpGrowth: 2.0,
      inflation: 23.4,
      unemployment: 6.3,
      gdpHistory: trend(0.314, [5.5, 1.0, -0.9, 5.8, 6.2, -0.2, 2.0]),
    },
    military: { spending: 8.5, activePersonnel: 654_000, nuclear: true, globalRank: 13 },
    science: { rdSpend: 0.16, globalRank: 38, notableAreas: ["Textiles", "Agritech"] },
    resources: ["Coal", "Cotton"],
    alliances: ["SCO", "China partner"],
    recentAgreements: [
      { date: "2025-05-12", partner: "Iran", summary: "Border security framework." },
    ],
    conflicts: [
      { with: "India", type: "tension", summary: "Kashmir; periodic LoC incidents." },
      { with: "TTP / internal", type: "conflict", summary: "Insurgency in KP / Balochistan." },
    ],
    news: [
      { date: "2026-05-10", source: "Dawn", headline: "IMF cleared next tranche review.", category: "economy" },
    ],
  },
  {
    id: "it",
    iso2: "IT",
    iso3: "ITA",
    name: "Italy",
    flag: "🇮🇹",
    capital: "Rome",
    population: 58_870_000,
    government: "democracy",
    status: "stable",
    region: "Europe",
    economy: {
      gdp: 2.25,
      gdpPerCapita: 38_373,
      gdpGrowth: 0.7,
      inflation: 1.2,
      unemployment: 7.4,
      gdpHistory: trend(2.09, [0.8, 0.5, -9.0, 7.0, 3.8, 0.7, 0.6]),
    },
    military: { spending: 35.5, activePersonnel: 161_000, nuclear: false, globalRank: 12 },
    science: { rdSpend: 1.45, globalRank: 17, notableAreas: ["Manufacturing", "Pharma"] },
    resources: ["Limited"],
    alliances: ["NATO", "EU", "G7"],
    recentAgreements: [
      { date: "2025-10-30", partner: "Albania", summary: "Migration processing arrangement renewed." },
    ],
    conflicts: [],
    news: [
      { date: "2026-05-12", source: "La Stampa", headline: "Industrial production stabilizes after dip.", category: "economy" },
    ],
  },
  {
    id: "es",
    iso2: "ES",
    iso3: "ESP",
    name: "Spain",
    flag: "🇪🇸",
    capital: "Madrid",
    population: 48_590_000,
    government: "democracy",
    status: "stable",
    region: "Europe",
    economy: {
      gdp: 1.58,
      gdpPerCapita: 32_677,
      gdpGrowth: 2.5,
      inflation: 3.1,
      unemployment: 11.2,
      gdpHistory: trend(1.42, [2.0, 2.0, -11.2, 5.5, 5.8, 2.5, 2.1]),
    },
    military: { spending: 23.7, activePersonnel: 121_000, nuclear: false, globalRank: 20 },
    science: { rdSpend: 1.43, globalRank: 18, notableAreas: ["Renewables", "Pharma"] },
    resources: ["Renewables capacity"],
    alliances: ["NATO", "EU"],
    recentAgreements: [],
    conflicts: [],
    news: [
      { date: "2026-05-13", source: "El País", headline: "Tourism receipts on track for record year.", category: "economy" },
    ],
  },
  {
    id: "pl",
    iso2: "PL",
    iso3: "POL",
    name: "Poland",
    flag: "🇵🇱",
    capital: "Warsaw",
    population: 36_820_000,
    government: "democracy",
    status: "tension",
    region: "Europe",
    economy: {
      gdp: 0.811,
      gdpPerCapita: 22_058,
      gdpGrowth: 2.8,
      inflation: 3.7,
      unemployment: 2.8,
      gdpHistory: trend(0.59, [5.4, 4.5, -2.0, 6.9, 5.3, 0.2, 2.8]),
    },
    military: { spending: 31.6, activePersonnel: 202_000, nuclear: false, globalRank: 19 },
    science: { rdSpend: 1.46, globalRank: 23, notableAreas: ["Gaming", "Defense industry"] },
    resources: ["Coal", "Copper"],
    alliances: ["NATO", "EU"],
    recentAgreements: [
      { date: "2025-09-12", partner: "South Korea", summary: "Tank and howitzer co-production deal." },
    ],
    conflicts: [
      { with: "Russia / Belarus", type: "tension", summary: "Eastern flank posture; border pressure." },
    ],
    news: [
      { date: "2026-05-10", source: "Rzeczpospolita", headline: "Defense spending crosses 4.2% of GDP.", category: "military" },
    ],
  },
  {
    id: "eg",
    iso2: "EG",
    iso3: "EGY",
    name: "Egypt",
    flag: "🇪🇬",
    capital: "Cairo",
    population: 113_330_000,
    government: "authoritarian",
    status: "tension",
    region: "Africa",
    economy: {
      gdp: 0.397,
      gdpPerCapita: 3_504,
      gdpGrowth: 3.0,
      inflation: 33.7,
      unemployment: 7.2,
      gdpHistory: trend(0.249, [5.3, 5.6, 3.6, 3.3, 6.7, 3.8, 3.0]),
    },
    military: { spending: 4.6, activePersonnel: 440_000, nuclear: false, globalRank: 16 },
    science: { rdSpend: 0.96, globalRank: 39, notableAreas: ["Agritech", "Energy"] },
    resources: ["Natural gas", "Suez Canal revenue"],
    alliances: ["Arab League", "African Union"],
    recentAgreements: [
      { date: "2025-03-06", partner: "IMF / EU / UAE", summary: "$57B financing package finalized." },
    ],
    conflicts: [
      { with: "Sinai insurgency", type: "tension", summary: "Low-intensity counter-insurgency operations." },
    ],
    news: [
      { date: "2026-05-12", source: "Al-Ahram", headline: "Suez Canal revenue still 60% below pre-2024 levels.", category: "economy" },
    ],
  },
];

export const COUNTRIES_BY_ID = Object.fromEntries(COUNTRIES.map((c) => [c.id, c]));
export const COUNTRIES_BY_ISO3 = Object.fromEntries(COUNTRIES.map((c) => [c.iso3, c]));

/**
 * Map names as they appear in the world-atlas TopoJSON (countries-110m) to our country IDs.
 * The atlas property `name` varies — keep this list in sync as you add more countries.
 */
export const NAME_ALIASES: Record<string, string> = {
  "United States of America": "us",
  "United States": "us",
  "USA": "us",
  "China": "cn",
  "Russia": "ru",
  "Russian Federation": "ru",
  "Ukraine": "ua",
  "Israel": "il",
  "Iran": "ir",
  "Iran (Islamic Republic of)": "ir",
  "Saudi Arabia": "sa",
  "United Kingdom": "gb",
  "France": "fr",
  "Germany": "de",
  "Canada": "ca",
  "Japan": "jp",
  "India": "in",
  "Turkey": "tr",
  "Türkiye": "tr",
  "Brazil": "br",
  "Australia": "au",
  "Mexico": "mx",
  "South Korea": "kr",
  "Korea, Republic of": "kr",
  "Republic of Korea": "kr",
  "North Korea": "kp",
  "Korea, Democratic People's Republic of": "kp",
  "Dem. Rep. Korea": "kp",
  "Pakistan": "pk",
  "Italy": "it",
  "Spain": "es",
  "Poland": "pl",
  "Egypt": "eg",
};

export function resolveCountryId(geoName: string | undefined): string | undefined {
  if (!geoName) return undefined;
  return NAME_ALIASES[geoName];
}
