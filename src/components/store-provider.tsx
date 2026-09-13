import { useEffect, type ReactNode } from "react";
import { useLedger } from "@/lib/store";

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function hydrate() {
      await useLedger.persist.rehydrate();
      useLedger.getState().setHydrated(true);
    }
    void hydrate();
  }, []);
  return children;
}
