import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as ChevronDown } from "../_libs/lucide-react.mjs";
import { g as monthKey, h as formatK, m as formatDayShort, n as useLedger, r as cn, s as PLAN } from "./router-BgWiq2eB.mjs";
import { _ as groupByMonth, m as buildRows, n as Card, o as Input, r as CardContent, t as Button } from "./stats-D3Jy6S5N.mjs";
import { t as DayEditor } from "./day-editor-CyMKfEd6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-z0doRP-C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LedgerPage() {
	const deposits = useLedger((s) => s.deposits);
	const rows = (0, import_react.useMemo)(() => buildRows(deposits), [deposits]);
	const months = (0, import_react.useMemo)(() => groupByMonth(rows), [rows]);
	const today = rows.find((row) => row.isToday)?.date ?? PLAN.startDate;
	const currentMonth = monthKey(today);
	const [query, setQuery] = (0, import_react.useState)("");
	const [openMonths, setOpenMonths] = (0, import_react.useState)({ [currentMonth]: true });
	const [showAllMonths, setShowAllMonths] = (0, import_react.useState)(false);
	const [editDate, setEditDate] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const source = months.filter((month) => {
			if (showAllMonths || q) return true;
			return month.key <= currentMonth;
		});
		if (!q) return source;
		return source.map((month) => ({
			...month,
			rows: month.rows.filter((row) => row.date.includes(q) || row.notes.toLowerCase().includes(q) || month.label.toLowerCase().includes(q))
		})).filter((month) => month.rows.length > 0);
	}, [
		months,
		query,
		showAllMonths,
		currentMonth
	]);
	const hiddenCount = months.filter((month) => month.key > currentMonth).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: "Daily ledger"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Log each real deposit as it happens. Leave future days blank — the running total carries itself."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search a date or note",
					className: "bg-card"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "sm:w-40",
					onClick: () => {
						setOpenMonths({ [currentMonth]: true });
						document.getElementById(`month-${currentMonth}`)?.scrollIntoView({
							behavior: "smooth",
							block: "start"
						});
					},
					children: "Jump to today"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: filtered.map((month) => {
					const open = query ? true : Boolean(openMonths[month.key]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						id: `month-${month.key}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-3 px-5 py-4 text-left",
							onClick: () => setOpenMonths((prev) => ({
								...prev,
								[month.key]: !prev[month.key]
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-medium",
									children: month.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground tabular-nums",
									children: [
										formatK(month.deposited, { decimals: 0 }),
										" ·",
										" ",
										month.loggedDays,
										" logged",
										month.missedDays > 0 ? ` · ${month.missedDays} missed` : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180") })]
						}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0 pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border border-t border-border",
								children: month.rows.map((row) => {
									const clickable = !row.isFuture;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: !clickable,
										onClick: () => clickable && setEditDate(row.date),
										className: cn("grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 text-left min-h-14 sm:grid-cols-[7.5rem_minmax(0,1fr)_6.5rem_6.5rem]", clickable && "hover:bg-muted/60", row.isToday && "bg-primary/5", row.isFuture && "opacity-50"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm",
												children: [
													formatDayShort(row.date),
													row.isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-2 text-[10px] font-medium tracking-wide text-primary uppercase",
														children: "Today"
													}),
													row.isMissed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-2 text-[10px] font-medium tracking-wide text-destructive uppercase",
														children: "Missed"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden text-xs text-muted-foreground sm:block truncate",
												children: row.notes || (row.isFuture ? "Not yet" : row.amount == null ? "Tap to log" : "")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-right text-sm font-medium tabular-nums",
												children: row.amount != null ? formatK(row.amount, { decimals: row.amount % 1 ? 2 : 0 }) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden text-right text-sm tabular-nums text-muted-foreground sm:block",
												children: formatK(row.cumulative, { decimals: row.cumulative % 1 ? 2 : 0 })
											})
										]
									}) }, row.date);
								})
							})
						})]
					}, month.key);
				})
			}),
			!query && hiddenCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => setShowAllMonths((value) => !value),
				children: showAllMonths ? "Hide later months" : `Show remaining ${hiddenCount} months`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayEditor, {
				date: editDate,
				onClose: () => setEditDate(null)
			})
		]
	});
}
//#endregion
export { LedgerPage as component };
