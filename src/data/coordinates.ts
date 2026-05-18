/**
 * Capital coordinates [longitude, latitude] for each country in the dataset.
 * Used to place signal markers (conflict pulses, agreement pins) on the map.
 */
export const CAPITAL_COORDS: Record<string, [number, number]> = {
  us: [-77.04, 38.91],
  cn: [116.40, 39.90],
  ru: [37.62, 55.75],
  ua: [30.52, 50.45],
  il: [35.21, 31.78],
  ir: [51.42, 35.69],
  sa: [46.72, 24.71],
  gb: [-0.13, 51.51],
  fr: [2.35, 48.86],
  de: [13.40, 52.52],
  ca: [-75.70, 45.42],
  jp: [139.69, 35.69],
  in: [77.21, 28.61],
  tr: [32.86, 39.93],
  br: [-47.93, -15.78],
  au: [149.13, -35.28],
  mx: [-99.13, 19.43],
  kr: [126.98, 37.57],
  kp: [125.75, 39.04],
  pk: [73.10, 33.69],
  it: [12.50, 41.90],
  es: [-3.70, 40.42],
  pl: [21.01, 52.23],
  eg: [31.24, 30.04],
};

/**
 * Quick-zoom presets for major regions.
 * Coordinates are the visual center; zoom level tuned for the Mercator projection.
 */
export const REGIONS: { id: string; label: string; coordinates: [number, number]; zoom: number }[] = [
  { id: "world", label: "World", coordinates: [0, 25], zoom: 1 },
  { id: "europe", label: "Europe", coordinates: [15, 52], zoom: 3.2 },
  { id: "mena", label: "MENA", coordinates: [40, 28], zoom: 2.8 },
  { id: "asia", label: "Asia-Pacific", coordinates: [110, 25], zoom: 2.1 },
  { id: "americas", label: "Americas", coordinates: [-80, 10], zoom: 1.8 },
  { id: "africa", label: "Africa", coordinates: [20, 0], zoom: 2.1 },
];
