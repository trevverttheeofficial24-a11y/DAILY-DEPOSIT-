import { createFileRoute } from "@tanstack/react-router";
import { Check, Circle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  BROKERS,
  formatDayShort,
  formatK,
  LUSE_COUNTERS,
  todayISO,
} from "@/lib/plan";
import type { InvestmentEntry } from "@/lib/seed";
import { computeStats } from "@/lib/stats";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/invest")({ component: InvestPage });

function InvestPage() {
  const deposits = useLedger((s) => s.deposits);
  const investments = useLedger((s) => s.investments);
  const recordInvestment = useLedger((s) => s.recordInvestment);
  const clearInvestment = useLedger((s) => s.clearInvestment);
  const stats = useMemo(
    () => computeStats(deposits, investments),
    [deposits, investments],
  );
  const [active, setActive] = useState<number | null>(null);

  const editing = stats.milestones.find((item) => item.threshold === active);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-medium tracking-tight">
          Stock milestones
        </h1>
        <p className="text-sm text-muted-foreground">
          Every time the running total crosses a threshold, move that chunk
          into LuSE shares. Do not wait until 2028.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Saved in Patumba</p>
            <p className="mt-1 font-display text-3xl font-medium tabular-nums">
              {formatK(stats.totalSaved, {
                decimals: stats.totalSaved % 1 === 0 ? 0 : 2,
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Moved into shares</p>
            <p className="mt-1 font-display text-3xl font-medium tabular-nums">
              {formatK(stats.totalInvested, {
                decimals: stats.totalInvested % 1 === 0 ? 0 : 2,
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      <ol className="flex flex-col gap-2">
        {stats.milestones.map((item, index) => {
          const invested = Boolean(item.investment);
          const ready = item.crossed && !invested;
          return (
            <li key={item.threshold}>
              <button
                type="button"
                onClick={() => item.crossed && setActive(item.threshold)}
                disabled={!item.crossed}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl bg-card px-4 py-4 text-left shadow-card transition-[box-shadow,transform] duration-150",
                  item.crossed && "hover:shadow-card-hover",
                  !item.crossed && "opacity-60",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    invested && "bg-positive text-primary-foreground",
                    ready && "bg-primary text-primary-foreground",
                    !item.crossed && "bg-muted text-muted-foreground",
                  )}
                >
                  {invested ? (
                    <Check className="size-4" />
                  ) : (
                    <Circle className="size-3.5" fill="currentColor" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-medium tabular-nums">
                      {formatK(item.threshold, { decimals: 0 })}
                    </span>
                    {ready && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-primary uppercase">
                        Ready to buy
                      </span>
                    )}
                    {invested && (
                      <span className="rounded-full bg-positive/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-positive uppercase">
                        Invested
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {invested && item.investment
                      ? `${item.investment.company} · ${formatK(item.investment.amountInvested)} on ${formatDayShort(item.investment.dateInvested)}`
                      : item.crossed
                        ? `Reached ${item.crossedOn ? formatDayShort(item.crossedOn) : ""} · tap to record the trade`
                        : index === 0 || stats.milestones[index - 1]?.crossed
                          ? `${formatK(Math.max(0, item.threshold - stats.totalSaved), { decimals: 0 })} to go`
                          : "Locked until the previous chunk is reached"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Before the first kwacha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Call a licensed LuSE stockbroker and ask three things: minimum
            trade size, fee per trade (flat or percent), and any account
            minimums. That answer decides whether small frequent buys or fewer
            larger buys make more sense.
          </p>
          <ul className="flex flex-col gap-1">
            {BROKERS.map((broker) => (
              <li key={broker} className="text-foreground">
                {broker}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <InvestSheet
        open={Boolean(editing)}
        threshold={editing?.threshold ?? null}
        crossedOn={editing?.crossedOn ?? null}
        existing={editing?.investment ?? null}
        onClose={() => setActive(null)}
        onSave={(threshold, entry) => {
          recordInvestment(threshold, entry);
          toast.success(
            `Recorded ${formatK(entry.amountInvested)} in ${entry.company}`,
          );
          setActive(null);
        }}
        onClear={(threshold) => {
          clearInvestment(threshold);
          toast("Investment cleared");
          setActive(null);
        }}
      />
    </div>
  );
}

function InvestSheet({
  open,
  threshold,
  crossedOn,
  existing,
  onClose,
  onSave,
  onClear,
}: {
  open: boolean;
  threshold: number | null;
  crossedOn: string | null;
  existing: InvestmentEntry | null;
  onClose: () => void;
  onSave: (threshold: number, entry: InvestmentEntry) => void;
  onClear: (threshold: number) => void;
}) {
  const [dateInvested, setDateInvested] = useState(todayISO());
  const [company, setCompany] = useState<string>(LUSE_COUNTERS[0]);
  const [customCompany, setCustomCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [fees, setFees] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setDateInvested(existing?.dateInvested ?? todayISO());
    const known = LUSE_COUNTERS.find((name) => name === existing?.company);
    setCompany(known ?? (existing?.company ? "Other" : LUSE_COUNTERS[0]));
    setCustomCompany(known || !existing?.company ? "" : existing.company);
    setAmount(
      existing
        ? String(existing.amountInvested)
        : threshold != null
          ? String(threshold)
          : "",
    );
    setFees(existing?.feesConfirmed ?? false);
    setNotes(existing?.notes ?? "");
  }, [open, threshold, existing]);

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="bottom" className="gap-4">
        <SheetHeader>
          <SheetTitle>
            {threshold != null
              ? `${formatK(threshold, { decimals: 0 })} milestone`
              : "Record buy"}
          </SheetTitle>
          <SheetDescription>
            {crossedOn
              ? `Savings crossed this mark on ${formatDayShort(crossedOn)}. Fill this in once the shares are actually bought.`
              : "Fill this in once the shares are actually bought."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="invest-date">Date invested</Label>
            <Input
              id="invest-date"
              type="date"
              value={dateInvested}
              onChange={(e) => setDateInvested(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company / counter</Label>
            <select
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              {LUSE_COUNTERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {company === "Other" && (
              <Input
                placeholder="Counter name"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="invest-amount">Amount invested (K)</Label>
            <Input
              id="invest-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="tabular-nums"
            />
          </div>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <Checkbox
              checked={fees}
              onCheckedChange={(value) => setFees(value === true)}
            />
            Fees confirmed with the broker
          </label>
          <div className="space-y-2">
            <Label htmlFor="invest-notes">Notes</Label>
            <Textarea
              id="invest-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              if (threshold == null) return;
              const parsed = Number(amount);
              if (!Number.isFinite(parsed) || parsed <= 0) {
                toast.error("Enter the amount invested.");
                return;
              }
              const name =
                company === "Other" ? customCompany.trim() : company;
              if (!name) {
                toast.error("Choose a LuSE counter.");
                return;
              }
              onSave(threshold, {
                dateInvested,
                company: name,
                amountInvested: parsed,
                feesConfirmed: fees,
                notes: notes.trim(),
              });
            }}
          >
            Save trade
          </Button>
          {existing && threshold != null ? (
            <Button
              variant="ghost"
              className="w-full text-destructive sm:w-auto"
              onClick={() => onClear(threshold)}
            >
              Remove
            </Button>
          ) : (
            <Button variant="ghost" className="w-full sm:w-auto" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
