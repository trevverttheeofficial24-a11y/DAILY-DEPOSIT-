import {
  MILESTONE_THRESHOLDS,
  PLAN,
  PLAN_DAY_COUNT,
  PLAN_DAYS,
  PLAN_TARGET_TOTAL,
  compareISO,
  monthKey,
  todayISO,
} from "./plan";
import type { DepositEntry, InvestmentEntry } from "./seed";

export type DayRow = {
  date: string;
  amount: number | null;
  cumulative: number;
  bankBalance: number | null;
  interest: number | null;
  notes: string;
  isFuture: boolean;
  isToday: boolean;
  isMissed: boolean;
};

export type MilestoneStatus = {
  threshold: number;
  crossed: boolean;
  crossedOn: string | null;
  investment: InvestmentEntry | null;
};

export type LedgerStats = {
  today: string;
  totalSaved: number;
  lastBankBalance: number | null;
  lastBankDate: string | null;
  interestEarned: number | null;
  daysLogged: number;
  daysWithDeposit: number;
  daysElapsed: number;
  daysRemaining: number;
  averageDeposit: number | null;
  expectedByPace: number;
  paceDelta: number;
  streak: number;
  progressPct: number;
  todayLogged: boolean;
  todayAmount: number | null;
  nextMilestone: MilestoneStatus | null;
  readyMilestones: MilestoneStatus[];
  milestones: MilestoneStatus[];
  totalInvested: number;
  projectedIfPaceHolds: number;
  projectedIfTenADay: number;
};

export function buildRows(
  deposits: Record<string, DepositEntry>,
  today = todayISO(),
): DayRow[] {
  let cumulative = 0;
  return PLAN_DAYS.map((date) => {
    const entry = deposits[date];
    const amount = entry ? entry.amount : null;
    if (amount != null) cumulative += amount;
    const bankBalance = entry?.bankBalance ?? null;
    const interest =
      bankBalance != null ? round2(bankBalance - cumulative) : null;
    const isFuture = date > today;
    const isToday = date === today;
    const isMissed = date < today && amount == null;
    return {
      date,
      amount,
      cumulative,
      bankBalance,
      interest,
      notes: entry?.notes ?? "",
      isFuture,
      isToday,
      isMissed,
    };
  });
}

export function computeStats(
  deposits: Record<string, DepositEntry>,
  investments: Record<string, InvestmentEntry>,
  today = todayISO(),
): LedgerStats {
  const rows = buildRows(deposits, today);
  const pastOrToday = rows.filter((row) => row.date <= today);
  const lastPast = pastOrToday[pastOrToday.length - 1];
  const totalSaved = lastPast?.cumulative ?? 0;

  let lastBankBalance: number | null = null;
  let lastBankDate: string | null = null;
  for (let i = pastOrToday.length - 1; i >= 0; i--) {
    const row = pastOrToday[i];
    if (row && row.bankBalance != null) {
      lastBankBalance = row.bankBalance;
      lastBankDate = row.date;
      break;
    }
  }

  const interestEarned =
    lastBankBalance != null && lastBankDate != null
      ? pastOrToday.find((row) => row.date === lastBankDate)?.interest ??
        round2(lastBankBalance - totalSaved)
      : null;

  const daysElapsed = pastOrToday.length;
  const daysRemaining = Math.max(0, PLAN_DAY_COUNT - daysElapsed);
  const filled = pastOrToday.filter((row) => row.amount != null);
  const daysLogged = filled.length;
  const daysWithDeposit = filled.filter(
    (row) => (row.amount ?? 0) > 0,
  ).length;
  const depositSum = filled.reduce((sum, row) => sum + (row.amount ?? 0), 0);
  const averageDeposit = daysLogged > 0 ? depositSum / daysLogged : null;

  // Pace vs K10/day for days that have already closed (exclude an empty today).
  const closedDays = pastOrToday.filter((row) => !row.isToday || row.amount != null);
  const closedCount = closedDays.length;
  const expectedByPace = closedCount * PLAN.dailyTarget;
  const paceDelta = totalSaved - expectedByPace;

  const todayRow = rows.find((row) => row.isToday);
  const todayLogged = todayRow?.amount != null;
  const todayAmount = todayRow?.amount ?? null;

  const streak = computeStreak(pastOrToday, today);
  const progressPct =
    PLAN_TARGET_TOTAL > 0
      ? Math.min(100, (totalSaved / PLAN_TARGET_TOTAL) * 100)
      : 0;

  const milestones = MILESTONE_THRESHOLDS.map((threshold) => {
    const crossedRow = rows.find(
      (row) => row.amount != null && row.cumulative >= threshold,
    );
    return {
      threshold,
      crossed: Boolean(crossedRow) && totalSaved >= threshold,
      crossedOn: crossedRow?.date ?? null,
      investment: investments[String(threshold)] ?? null,
    };
  });

  const nextMilestone =
    milestones.find((item) => !item.crossed) ?? null;
  const readyMilestones = milestones.filter(
    (item) => item.crossed && !item.investment,
  );
  const totalInvested = Object.values(investments).reduce(
    (sum, item) => sum + item.amountInvested,
    0,
  );

  const remainingClosed = Math.max(0, PLAN_DAY_COUNT - closedCount);
  const projectedIfPaceHolds =
    averageDeposit != null
      ? totalSaved + remainingClosed * averageDeposit
      : totalSaved + remainingClosed * PLAN.dailyTarget;
  const projectedIfTenADay = totalSaved + remainingClosed * PLAN.dailyTarget;

  return {
    today,
    totalSaved,
    lastBankBalance,
    lastBankDate,
    interestEarned,
    daysLogged,
    daysWithDeposit,
    daysElapsed,
    daysRemaining,
    averageDeposit,
    expectedByPace,
    paceDelta,
    streak,
    progressPct,
    todayLogged,
    todayAmount,
    nextMilestone,
    readyMilestones,
    milestones,
    totalInvested,
    projectedIfPaceHolds,
    projectedIfTenADay,
  };
}

function computeStreak(pastOrToday: DayRow[], today: string): number {
  if (pastOrToday.length === 0) return 0;
  const startFrom =
    pastOrToday[pastOrToday.length - 1]?.date === today &&
    pastOrToday[pastOrToday.length - 1]?.amount == null
      ? pastOrToday.length - 2
      : pastOrToday.length - 1;
  let streak = 0;
  for (let i = startFrom; i >= 0; i--) {
    const row = pastOrToday[i];
    if (!row || row.amount == null || row.amount <= 0) break;
    streak += 1;
  }
  return streak;
}

export function cumulativeSeries(
  deposits: Record<string, DepositEntry>,
  today = todayISO(),
): Array<{ date: string; total: number; deposit: number }> {
  const rows = buildRows(deposits, today);
  return rows
    .filter((row) => row.date <= today && row.amount != null)
    .map((row) => ({
      date: row.date,
      total: row.cumulative,
      deposit: row.amount ?? 0,
    }));
}

export function groupByMonth(rows: DayRow[]): Array<{
  key: string;
  label: string;
  rows: DayRow[];
  deposited: number;
  loggedDays: number;
  missedDays: number;
}> {
  const groups = new Map<
    string,
    {
      key: string;
      label: string;
      rows: DayRow[];
      deposited: number;
      loggedDays: number;
      missedDays: number;
    }
  >();
  for (const row of rows) {
    const key = monthKey(row.date);
    let group = groups.get(key);
    if (!group) {
      const [year, month] = key.split("-");
      const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(
        "en-GB",
        { month: "long", year: "numeric" },
      );
      group = {
        key,
        label,
        rows: [],
        deposited: 0,
        loggedDays: 0,
        missedDays: 0,
      };
      groups.set(key, group);
    }
    group.rows.push(row);
    if (row.amount != null) {
      group.deposited += row.amount;
      group.loggedDays += 1;
    }
    if (row.isMissed) group.missedDays += 1;
  }
  return [...groups.values()].sort((a, b) => compareISO(a.key, b.key));
}

export function thisWeek(rows: DayRow[], today: string): DayRow[] {
  const idx = rows.findIndex((row) => row.date === today);
  if (idx < 0) return [];
  const date = new Date(`${today}T12:00:00`);
  // Monday-start week in Lusaka.
  const weekday = (date.getDay() + 6) % 7;
  const start = idx - weekday;
  return rows.slice(Math.max(0, start), start + 7);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
