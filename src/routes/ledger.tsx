import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { DayEditor } from "@/components/day-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDayShort, formatK, monthKey, PLAN } from "@/lib/plan";
import { buildRows, groupByMonth } from "@/lib/stats";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ledger")({ component: LedgerPage });

function LedgerPage() {
  const deposits = useLedger((s) => s.deposits);
  const rows = useMemo(() => buildRows(deposits), [deposits]);
  const months = useMemo(() => groupByMonth(rows), [rows]);
  const today = rows.find((row) => row.isToday)?.date ?? PLAN.startDate;
  const currentMonth = monthKey(today);

  const [query, setQuery] = useState("");
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({
    [currentMonth]: true,
  });
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [editDate, setEditDate] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = months.filter((month) => {
      if (showAllMonths || q) return true;
      return month.key <= currentMonth;
    });
    if (!q) return source;
    return source
      .map((month) => ({
        ...month,
        rows: month.rows.filter(
          (row) =>
            row.date.includes(q) ||
            row.notes.toLowerCase().includes(q) ||
            month.label.toLowerCase().includes(q),
        ),
      }))
      .filter((month) => month.rows.length > 0);
  }, [months, query, showAllMonths, currentMonth]);

  const hiddenCount = months.filter((month) => month.key > currentMonth).length;

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Daily ledger
        </h1>
        <p className="text-sm text-muted-foreground">
          Log each real deposit as it happens. Leave future days blank — the
          running total carries itself.
        </p>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a date or note"
          className="bg-card"
        />
        <Button
          variant="outline"
          className="sm:w-40"
          onClick={() => {
            setOpenMonths({ [currentMonth]: true });
            document
              .getElementById(`month-${currentMonth}`)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Jump to today
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((month) => {
          const open = query ? true : Boolean(openMonths[month.key]);
          return (
            <Card key={month.key} id={`month-${month.key}`}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
                onClick={() =>
                  setOpenMonths((prev) => ({
                    ...prev,
                    [month.key]: !prev[month.key],
                  }))
                }
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-medium">
                    {month.label}
                  </p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {formatK(month.deposited, { decimals: 0 })} ·{" "}
                    {month.loggedDays} logged
                    {month.missedDays > 0 ? ` · ${month.missedDays} missed` : ""}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>
              {open && (
                <CardContent className="px-0 pt-0">
                  <ul className="divide-y divide-border border-t border-border">
                    {month.rows.map((row) => {
                      const clickable = !row.isFuture;
                      return (
                        <li key={row.date}>
                          <button
                            type="button"
                            disabled={!clickable}
                            onClick={() => clickable && setEditDate(row.date)}
                            className={cn(
                              "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 text-left min-h-14 sm:grid-cols-[7.5rem_minmax(0,1fr)_6.5rem_6.5rem]",
                              clickable && "hover:bg-muted/60",
                              row.isToday && "bg-primary/5",
                              row.isFuture && "opacity-50",
                            )}
                          >
                            <span className="text-sm">
                              {formatDayShort(row.date)}
                              {row.isToday && (
                                <span className="ml-2 text-[10px] font-medium tracking-wide text-primary uppercase">
                                  Today
                                </span>
                              )}
                              {row.isMissed && (
                                <span className="ml-2 text-[10px] font-medium tracking-wide text-destructive uppercase">
                                  Missed
                                </span>
                              )}
                            </span>
                            <span className="hidden text-xs text-muted-foreground sm:block truncate">
                              {row.notes ||
                                (row.isFuture
                                  ? "Not yet"
                                  : row.amount == null
                                    ? "Tap to log"
                                    : "")}
                            </span>
                            <span className="text-right text-sm font-medium tabular-nums">
                              {row.amount != null
                                ? formatK(row.amount, {
                                    decimals: row.amount % 1 ? 2 : 0,
                                  })
                                : "—"}
                            </span>
                            <span className="hidden text-right text-sm tabular-nums text-muted-foreground sm:block">
                              {formatK(row.cumulative, {
                                decimals: row.cumulative % 1 ? 2 : 0,
                              })}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {!query && hiddenCount > 0 && (
        <Button
          variant="outline"
          onClick={() => setShowAllMonths((value) => !value)}
        >
          {showAllMonths
            ? "Hide later months"
            : `Show remaining ${hiddenCount} months`}
        </Button>
      )}

      <DayEditor date={editDate} onClose={() => setEditDate(null)} />
    </div>
  );
}
