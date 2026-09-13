import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { formatDayShort, formatK } from "@/lib/plan";

type Point = { date: string; total: number; deposit: number };

export function SavingsChart({ data }: { data: Point[] }) {
  if (data.length < 2) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Chart appears after a few deposits.
      </p>
    );
  }

  return (
    <div className="h-48 w-full text-primary" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="savedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.22} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) => formatDayShort(value)}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const point = payload[0].payload as Point;
              return (
                <div className="rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background">
                  <p>{formatDayShort(point.date)}</p>
                  <p className="tabular-nums">{formatK(point.total)} total</p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="currentColor"
            strokeWidth={2}
            fill="url(#savedFill)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--primary)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
