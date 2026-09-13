import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Target, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { DayEditor } from "@/components/day-editor";
import { SavingsChart } from "@/components/savings-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  formatDayShort,
  formatK,
  PLAN,
  PLAN_DAY_COUNT,
  PLAN_TARGET_TOTAL,
} from "@/lib/plan";
import { buildRows, computeStats, cumulativeSeries, thisWeek } from "@/lib/stats";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const deposits = useLedger((s) => s.deposits);
  const investments = useLedger((s) => s.investments);
  const hydrated = useLedger((s) => s.hydrated);
  const [editDate, setEditDate] = useState<string | null>(null);

  const stats = useMemo(
    () => computeStats(deposits, investments),
    [deposits, investments],
  );
  const rows = useMemo(() => buildRows(deposits, stats.today), [deposits, stats.today]);
  const series = useMemo(
    () => cumulativeSeries(deposits, stats.today),
    [deposits, stats.today],
  );
  const week = useMemo(() => thisWeek(rows, stats.today), [rows, stats.today]);
  const recent = useMemo(
    () =>
      rows
        .filter((row) => row.amount != null)
        .slice(-5)
        .reverse(),
    [rows],
  );

  const nextGap =
    stats.nextMilestone != null
      ? Math.max(0, stats.nextMilestone.threshold - stats.totalSaved)
      : 0;

  return (
    <div className="flex flex-col gap-5">
      <section className="rise">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          K{PLAN.dailyTarget} a day · to {formatDayShort(PLAN.targetDate)}
        </p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Daily savings, then LuSE.
        </h1>
      </section>

      {!stats.todayLogged && (
        <Card className="rise rise-1 border-0 bg-primary text-primary-foreground">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-primary-foreground/70">Today</p>
              <p className="font-display text-2xl font-medium">
                Log {formatK(PLAN.dailyTarget, { decimals: 0 })}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Keep the streak at {stats.streak} days.
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => setEditDate(stats.today)}
            >
              Record deposit
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="rise rise-2 overflow-hidden">
        <CardContent className="p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">Saved so far</p>
          <p className="mt-1 font-display text-5xl font-medium tracking-tight tabular-nums sm:text-6xl">
            {formatK(stats.totalSaved, {
              decimals: stats.totalSaved % 1 === 0 ? 0 : 2,
            })}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            of {formatK(PLAN_TARGET_TOTAL, { decimals: 0 })} if every day is{" "}
            {formatK(PLAN.dailyTarget, { decimals: 0 })}
          </p>
          <Progress value={stats.progressPct} className="mt-4" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground tabular-nums">
            <span>{stats.progressPct.toFixed(1)}% of the plan</span>
            <span>
              {stats.daysElapsed} of {PLAN_DAY_COUNT} days
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="rise rise-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          label="Patumba balance"
          value={
            stats.lastBankBalance != null
              ? formatK(stats.lastBankBalance)
              : "—"
          }
        />
        <StatTile
          label="Interest earned"
          value={
            stats.interestEarned != null
              ? formatK(stats.interestEarned)
              : "—"
          }
        />
        <StatTile
          label="Pace vs K10"
          value={
            stats.paceDelta >= 0
              ? `+${formatK(stats.paceDelta, { decimals: 0 })}`
              : formatK(stats.paceDelta, { decimals: 0 })
          }
          hint="ahead"
          positive={stats.paceDelta >= 0}
        />
        <StatTile
          label="Average day"
          value={
            stats.averageDeposit != null
              ? formatK(stats.averageDeposit)
              : "—"
          }
        />
      </div>

      <Card className="rise rise-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base">This week</CardTitle>
            <span className="text-xs text-muted-foreground tabular-nums">
              {stats.streak}-day streak
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const filled = day.amount != null && day.amount > 0;
              const clickable = !day.isFuture;
              return (
                <li key={day.date}>
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={() => clickable && setEditDate(day.date)}
                    className={cn(
                      "flex w-full flex-col items-center gap-1.5 rounded-lg py-2 text-xs transition-colors duration-150",
                      clickable && "hover:bg-muted",
                      day.isToday && "ring-1 ring-primary/40",
                    )}
                  >
                    <span className="text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][
                        (new Date(`${day.date}T12:00:00`).getDay() + 6) % 7
                      ]}
                    </span>
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-[11px] font-medium tabular-nums",
                        filled && "bg-primary text-primary-foreground",
                        day.isMissed && "border border-dashed border-border text-muted-foreground",
                        day.isFuture && "text-muted-foreground/50",
                        day.isToday && !filled && "bg-muted text-foreground",
                      )}
                    >
                      {new Date(`${day.date}T12:00:00`).getDate()}
                    </span>
                    {filled && (
                      <span className="sr-only">deposited</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      {stats.readyMilestones.length > 0 && (
        <Card className="rise rise-5 border-0 bg-primary/5">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <div className="mt-0.5 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Landmark className="size-4" />
              </div>
              <div>
                <p className="font-medium">
                  {formatK(stats.readyMilestones[0]!.threshold, { decimals: 0 })}{" "}
                  reached
                </p>
                <p className="text-sm text-muted-foreground">
                  Move that chunk into LuSE shares instead of letting it sit
                  until 2028.
                </p>
              </div>
            </div>
            <Button asChild variant="default">
              <Link to="/invest">
                Record a buy
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Cumulative deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <SavingsChart data={series} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">On this pace</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Projection
              icon={TrendingUp}
              label="If the average holds"
              value={formatK(stats.projectedIfPaceHolds, { decimals: 0 })}
            />
            <Projection
              icon={Target}
              label={`If every remaining day is ${formatK(PLAN.dailyTarget, { decimals: 0 })}`}
              value={formatK(stats.projectedIfTenADay, { decimals: 0 })}
            />
            {stats.nextMilestone && (
              <p className="text-sm text-muted-foreground">
                Next stock chunk:{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {formatK(stats.nextMilestone.threshold, { decimals: 0 })}
                </span>
                {" · "}
                {formatK(nextGap, { decimals: 0 })} to go
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Recent deposits</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/ledger">Full ledger</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <ul>
            {recent.map((row) => (
              <li
                key={row.date}
                className="flex items-center justify-between gap-3 border-t border-border px-5 py-3"
              >
                <button
                  type="button"
                  onClick={() => setEditDate(row.date)}
                  className="flex min-h-11 flex-1 items-center justify-between gap-3 text-left"
                >
                  <span className="text-sm">{formatDayShort(row.date)}</span>
                  <span className="font-medium tabular-nums">
                    {row.amount != null
                      ? formatK(row.amount, { decimals: row.amount % 1 ? 2 : 0 })
                      : "—"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        {hydrated
          ? "Saved on this device. Call a licensed LuSE broker before the first trade."
          : "Loading ledger…"}
      </p>

      <DayEditor date={editDate} onClose={() => setEditDate(null)} />
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
  positive,
}: {
  label: string;
  value: string;
  hint?: string;
  positive?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={cn(
            "mt-1 font-display text-xl font-medium tracking-tight tabular-nums sm:text-2xl",
            positive && "text-positive",
          )}
        >
          {value}
        </p>
        {hint && positive ? (
          <Badge variant="positive" className="mt-2">
            {hint}
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Projection({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 items-center justify-center rounded-md bg-muted text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-medium tabular-nums">{value}</p>
      </div>
    </div>
  );
}
