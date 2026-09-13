import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  formatDayHeading,
  formatK,
  PLAN,
  QUICK_AMOUNTS,
} from "@/lib/plan";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

type DayEditorProps = {
  date: string | null;
  onClose: () => void;
};

export function DayEditor({ date, onClose }: DayEditorProps) {
  const deposits = useLedger((s) => s.deposits);
  const logDeposit = useLedger((s) => s.logDeposit);
  const clearDeposit = useLedger((s) => s.clearDeposit);
  const existing = date ? deposits[date] : undefined;

  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!date) return;
    setAmount(existing ? String(existing.amount) : String(PLAN.dailyTarget));
    setBank(
      existing?.bankBalance != null ? String(existing.bankBalance) : "",
    );
    setNotes(existing?.notes ?? "Deposited Successfully");
  }, [date, existing]);

  function handleSave() {
    if (!date) return;
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed < 0) {
      toast.error("Enter a valid deposit amount.");
      return;
    }
    const bankParsed = bank.trim() === "" ? null : Number(bank);
    if (bankParsed != null && !Number.isFinite(bankParsed)) {
      toast.error("Bank balance must be a number, or left blank.");
      return;
    }
    logDeposit(date, parsed, bankParsed, notes);
    toast.success(`Logged ${formatK(parsed, { decimals: parsed % 1 ? 2 : 0 })}`);
    onClose();
  }

  function handleClear() {
    if (!date) return;
    clearDeposit(date);
    toast("Deposit cleared");
    onClose();
  }

  return (
    <Sheet open={Boolean(date)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="gap-4">
        <SheetHeader>
          <SheetTitle>{date ? formatDayHeading(date) : "Log deposit"}</SheetTitle>
          <SheetDescription>
            Record what actually went into Patumba. Leave bank balance blank
            unless you have an SMS confirmation.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="deposit-amount">Deposit (K)</Label>
            <Input
              id="deposit-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 font-display text-lg tabular-nums"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  className={cn(
                    "h-10 min-w-14 rounded-md px-3 text-sm font-medium tabular-nums transition-colors duration-150",
                    Number(amount) === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-border",
                  )}
                >
                  {formatK(value, { decimals: 0 })}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank-balance">Bank balance (K), optional</Label>
            <Input
              id="bank-balance"
              inputMode="decimal"
              placeholder="From the Patumba SMS"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="tabular-nums"
            />
            <p className="text-xs text-muted-foreground">
              Interest is the gap between this balance and your deposits.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse">
          <Button className="w-full sm:w-auto" onClick={handleSave}>
            Save deposit
          </Button>
          {existing ? (
            <Button
              variant="ghost"
              className="w-full text-destructive sm:w-auto"
              onClick={handleClear}
            >
              Clear day
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
