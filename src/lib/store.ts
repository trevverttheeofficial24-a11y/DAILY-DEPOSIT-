import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PLAN, todayISO } from "./plan";
import {
  buildSeedDeposits,
  type DepositEntry,
  type InvestmentEntry,
} from "./seed";

type LedgerState = {
  deposits: Record<string, DepositEntry>;
  investments: Record<string, InvestmentEntry>;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  logDeposit: (
    date: string,
    amount: number,
    bankBalance: number | null,
    notes: string,
  ) => void;
  clearDeposit: (date: string) => void;
  recordInvestment: (threshold: number, entry: InvestmentEntry) => void;
  clearInvestment: (threshold: number) => void;
  resetToSeed: () => void;
};

function canEditDate(date: string, today = todayISO()): boolean {
  return date >= PLAN.startDate && date <= PLAN.targetDate && date <= today;
}

export const useLedger = create<LedgerState>()(
  persist(
    (set) => ({
      deposits: buildSeedDeposits(),
      investments: {},
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      logDeposit: (date, amount, bankBalance, notes) => {
        if (!canEditDate(date)) return;
        set((state) => ({
          deposits: {
            ...state.deposits,
            [date]: {
              amount,
              bankBalance,
              notes: notes.trim(),
            },
          },
        }));
      },
      clearDeposit: (date) => {
        if (!canEditDate(date)) return;
        set((state) => {
          const next = { ...state.deposits };
          delete next[date];
          return { deposits: next };
        });
      },
      recordInvestment: (threshold, entry) => {
        set((state) => ({
          investments: {
            ...state.investments,
            [String(threshold)]: entry,
          },
        }));
      },
      clearInvestment: (threshold) => {
        set((state) => {
          const next = { ...state.investments };
          delete next[String(threshold)];
          return { investments: next };
        });
      },
      resetToSeed: () =>
        set({
          deposits: buildSeedDeposits(),
          investments: {},
        }),
    }),
    {
      name: "k10-ledger-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        deposits: state.deposits,
        investments: state.investments,
      }),
    },
  ),
);
