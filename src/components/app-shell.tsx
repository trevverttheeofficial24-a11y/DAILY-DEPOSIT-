import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Landmark, LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";
import { formatDayShort, todayISO } from "@/lib/plan";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/ledger", label: "Ledger", icon: BookOpen },
  { to: "/invest", label: "Invest", icon: Landmark },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const today = todayISO();

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight text-primary">
            K10 Ledger
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Patumba to LuSE
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-muted-foreground tabular-nums">
            {formatDayShort(today)}
          </p>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-28 sm:px-6 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 pb-[env(safe-area-inset-bottom)]">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
