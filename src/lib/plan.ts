import { addDays, format, parseISO } from "date-fns";

export const PLAN = {
  name: "K10 Ledger",
  startDate: "2026-07-29",
  targetDate: "2028-07-31",
  dailyTarget: 10,
  currency: "ZMW",
  symbol: "K",
} as const;

export const MILESTONE_THRESHOLDS = [
  500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
] as const;

export const QUICK_AMOUNTS = [10, 15, 20, 25] as const;

export const LUSE_COUNTERS = [
  "Airtel Networks Zambia",
  "Copperbelt Energy Corporation",
  "Lafarge Zambia",
  "Madison Financial Services",
  "Puma Energy Zambia",
  "Real Estate Investments Zambia",
  "Shoprite Holdings",
  "Standard Chartered Bank Zambia",
  "Zambeef Products",
  "Zambia National Commercial Bank",
  "Zambia Sugar",
  "ZCCM Investments Holdings",
  "Other",
] as const;

export const BROKERS = [
  "Pangaea Securities",
  "Stockbrokers Zambia",
] as const;

/** Today's date in Africa/Lusaka as YYYY-MM-DD. */
export function todayISO(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lusaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function eachDay(start: string, end: string): string[] {
  const days: string[] = [];
  let cursor = parseISO(start);
  const last = parseISO(end);
  while (cursor.getTime() <= last.getTime()) {
    days.push(format(cursor, "yyyy-MM-dd"));
    cursor = addDays(cursor, 1);
  }
  return days;
}

export const PLAN_DAYS = eachDay(PLAN.startDate, PLAN.targetDate);

export const PLAN_DAY_COUNT = PLAN_DAYS.length;

export const PLAN_TARGET_TOTAL = PLAN_DAY_COUNT * PLAN.dailyTarget;

export function formatK(
  value: number,
  options: { decimals?: number } = {},
): string {
  const decimals = options.decimals ?? 2;
  const formatted = value.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `K${formatted}`;
}

export function formatDayHeading(iso: string): string {
  return format(parseISO(iso), "EEEE, d MMMM yyyy");
}

export function formatDayShort(iso: string): string {
  return format(parseISO(iso), "d MMM");
}

export function formatMonthLabel(iso: string): string {
  return format(parseISO(iso), "MMMM yyyy");
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function compareISO(a: string, b: string): number {
  return a.localeCompare(b);
}

export function clampDateToPlan(iso: string): string {
  if (iso < PLAN.startDate) return PLAN.startDate;
  if (iso > PLAN.targetDate) return PLAN.targetDate;
  return iso;
}
