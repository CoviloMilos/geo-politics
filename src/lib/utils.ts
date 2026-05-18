import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTrillions(value: number) {
  if (value >= 1) return `$${value.toFixed(2)}T`;
  return `$${(value * 1000).toFixed(0)}B`;
}

export function formatBillions(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}T`;
  return `$${value.toFixed(0)}B`;
}

export function formatNumber(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
