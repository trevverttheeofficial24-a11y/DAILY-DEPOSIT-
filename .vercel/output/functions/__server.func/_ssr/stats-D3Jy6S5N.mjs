import "../_runtime.mjs";
import { c as Slot, h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { _ as todayISO, c as PLAN_DAYS, f as compareISO, g as monthKey, l as PLAN_DAY_COUNT, o as MILESTONE_THRESHOLDS, r as cn, s as PLAN, u as PLAN_TARGET_TOTAL } from "./router-BgWiq2eB.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, { ...props });
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, { ...props });
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "bottom", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-card text-card-foreground shadow-card outline-none", side === "bottom" && "inset-x-0 bottom-0 max-h-[90dvh] rounded-t-2xl border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-border p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-sm p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8 pb-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-20 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-card text-card-foreground shadow-card", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-medium leading-snug tracking-tight", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pt-0", className),
		...props
	});
}
function buildRows(deposits, today = todayISO()) {
	let cumulative = 0;
	return PLAN_DAYS.map((date) => {
		const entry = deposits[date];
		const amount = entry ? entry.amount : null;
		if (amount != null) cumulative += amount;
		const bankBalance = entry?.bankBalance ?? null;
		const interest = bankBalance != null ? round2(bankBalance - cumulative) : null;
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
			isMissed
		};
	});
}
function computeStats(deposits, investments, today = todayISO()) {
	const rows = buildRows(deposits, today);
	const pastOrToday = rows.filter((row) => row.date <= today);
	const totalSaved = pastOrToday[pastOrToday.length - 1]?.cumulative ?? 0;
	let lastBankBalance = null;
	let lastBankDate = null;
	for (let i = pastOrToday.length - 1; i >= 0; i--) {
		const row = pastOrToday[i];
		if (row && row.bankBalance != null) {
			lastBankBalance = row.bankBalance;
			lastBankDate = row.date;
			break;
		}
	}
	const interestEarned = lastBankBalance != null && lastBankDate != null ? pastOrToday.find((row) => row.date === lastBankDate)?.interest ?? round2(lastBankBalance - totalSaved) : null;
	const daysElapsed = pastOrToday.length;
	const daysRemaining = Math.max(0, PLAN_DAY_COUNT - daysElapsed);
	const filled = pastOrToday.filter((row) => row.amount != null);
	const daysLogged = filled.length;
	const daysWithDeposit = filled.filter((row) => (row.amount ?? 0) > 0).length;
	const depositSum = filled.reduce((sum, row) => sum + (row.amount ?? 0), 0);
	const averageDeposit = daysLogged > 0 ? depositSum / daysLogged : null;
	const closedCount = pastOrToday.filter((row) => !row.isToday || row.amount != null).length;
	const expectedByPace = closedCount * PLAN.dailyTarget;
	const paceDelta = totalSaved - expectedByPace;
	const todayRow = rows.find((row) => row.isToday);
	const todayLogged = todayRow?.amount != null;
	const todayAmount = todayRow?.amount ?? null;
	const streak = computeStreak(pastOrToday, today);
	const progressPct = PLAN_TARGET_TOTAL > 0 ? Math.min(100, totalSaved / PLAN_TARGET_TOTAL * 100) : 0;
	const milestones = MILESTONE_THRESHOLDS.map((threshold) => {
		const crossedRow = rows.find((row) => row.amount != null && row.cumulative >= threshold);
		return {
			threshold,
			crossed: Boolean(crossedRow) && totalSaved >= threshold,
			crossedOn: crossedRow?.date ?? null,
			investment: investments[String(threshold)] ?? null
		};
	});
	const nextMilestone = milestones.find((item) => !item.crossed) ?? null;
	const readyMilestones = milestones.filter((item) => item.crossed && !item.investment);
	const totalInvested = Object.values(investments).reduce((sum, item) => sum + item.amountInvested, 0);
	const remainingClosed = Math.max(0, PLAN_DAY_COUNT - closedCount);
	const projectedIfPaceHolds = averageDeposit != null ? totalSaved + remainingClosed * averageDeposit : totalSaved + remainingClosed * PLAN.dailyTarget;
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
		projectedIfTenADay
	};
}
function computeStreak(pastOrToday, today) {
	if (pastOrToday.length === 0) return 0;
	const startFrom = pastOrToday[pastOrToday.length - 1]?.date === today && pastOrToday[pastOrToday.length - 1]?.amount == null ? pastOrToday.length - 2 : pastOrToday.length - 1;
	let streak = 0;
	for (let i = startFrom; i >= 0; i--) {
		const row = pastOrToday[i];
		if (!row || row.amount == null || row.amount <= 0) break;
		streak += 1;
	}
	return streak;
}
function cumulativeSeries(deposits, today = todayISO()) {
	return buildRows(deposits, today).filter((row) => row.date <= today && row.amount != null).map((row) => ({
		date: row.date,
		total: row.cumulative,
		deposit: row.amount ?? 0
	}));
}
function groupByMonth(rows) {
	const groups = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const key = monthKey(row.date);
		let group = groups.get(key);
		if (!group) {
			const [year, month] = key.split("-");
			group = {
				key,
				label: new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-GB", {
					month: "long",
					year: "numeric"
				}),
				rows: [],
				deposited: 0,
				loggedDays: 0,
				missedDays: 0
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
function thisWeek(rows, today) {
	const idx = rows.findIndex((row) => row.date === today);
	if (idx < 0) return [];
	const start = idx - ((/* @__PURE__ */ new Date(`${today}T12:00:00`)).getDay() + 6) % 7;
	return rows.slice(Math.max(0, start), start + 7);
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
//#endregion
export { groupByMonth as _, CardTitle as a, Sheet as c, SheetHeader as d, SheetTitle as f, cumulativeSeries as g, computeStats as h, CardHeader as i, SheetContent as l, buildRows as m, Card as n, Input as o, Textarea as p, CardContent as r, Label as s, Button as t, SheetDescription as u, thisWeek as v };
