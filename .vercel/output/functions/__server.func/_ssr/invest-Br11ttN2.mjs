import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { l as Check, s as Circle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as todayISO, a as LUSE_COUNTERS, h as formatK, i as BROKERS, m as formatDayShort, n as useLedger, r as cn } from "./router-BgWiq2eB.mjs";
import { a as CardTitle, c as Sheet, d as SheetHeader, f as SheetTitle, h as computeStats, i as CardHeader, l as SheetContent, n as Card, o as Input, p as Textarea, r as CardContent, s as Label, t as Button, u as SheetDescription } from "./stats-D3Jy6S5N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invest-Br11ttN2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer size-5 shrink-0 rounded-sm border border-border bg-card shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 2.5
			})
		})
	});
}
function InvestPage() {
	const deposits = useLedger((s) => s.deposits);
	const investments = useLedger((s) => s.investments);
	const recordInvestment = useLedger((s) => s.recordInvestment);
	const clearInvestment = useLedger((s) => s.clearInvestment);
	const stats = (0, import_react.useMemo)(() => computeStats(deposits, investments), [deposits, investments]);
	const [active, setActive] = (0, import_react.useState)(null);
	const editing = stats.milestones.find((item) => item.threshold === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: "Stock milestones"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Every time the running total crosses a threshold, move that chunk into LuSE shares. Do not wait until 2028."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Saved in Patumba"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl font-medium tabular-nums",
						children: formatK(stats.totalSaved, { decimals: stats.totalSaved % 1 === 0 ? 0 : 2 })
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Moved into shares"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl font-medium tabular-nums",
						children: formatK(stats.totalInvested, { decimals: stats.totalInvested % 1 === 0 ? 0 : 2 })
					})]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-2",
				children: stats.milestones.map((item, index) => {
					const invested = Boolean(item.investment);
					const ready = item.crossed && !invested;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => item.crossed && setActive(item.threshold),
						disabled: !item.crossed,
						className: cn("flex w-full items-center gap-4 rounded-xl bg-card px-4 py-4 text-left shadow-card transition-[box-shadow,transform] duration-150", item.crossed && "hover:shadow-card-hover", !item.crossed && "opacity-60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-10 shrink-0 items-center justify-center rounded-full", invested && "bg-positive text-primary-foreground", ready && "bg-primary text-primary-foreground", !item.crossed && "bg-muted text-muted-foreground"),
							children: invested ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
								className: "size-3.5",
								fill: "currentColor"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-lg font-medium tabular-nums",
										children: formatK(item.threshold, { decimals: 0 })
									}),
									ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-primary uppercase",
										children: "Ready to buy"
									}),
									invested && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-positive/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-positive uppercase",
										children: "Invested"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs text-muted-foreground",
								children: invested && item.investment ? `${item.investment.company} · ${formatK(item.investment.amountInvested)} on ${formatDayShort(item.investment.dateInvested)}` : item.crossed ? `Reached ${item.crossedOn ? formatDayShort(item.crossedOn) : ""} · tap to record the trade` : index === 0 || stats.milestones[index - 1]?.crossed ? `${formatK(Math.max(0, item.threshold - stats.totalSaved), { decimals: 0 })} to go` : "Locked until the previous chunk is reached"
							})]
						})]
					}) }, item.threshold);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Before the first kwacha"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Call a licensed LuSE stockbroker and ask three things: minimum trade size, fee per trade (flat or percent), and any account minimums. That answer decides whether small frequent buys or fewer larger buys make more sense." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1",
					children: BROKERS.map((broker) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-foreground",
						children: broker
					}, broker))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestSheet, {
				open: Boolean(editing),
				threshold: editing?.threshold ?? null,
				crossedOn: editing?.crossedOn ?? null,
				existing: editing?.investment ?? null,
				onClose: () => setActive(null),
				onSave: (threshold, entry) => {
					recordInvestment(threshold, entry);
					toast.success(`Recorded ${formatK(entry.amountInvested)} in ${entry.company}`);
					setActive(null);
				},
				onClear: (threshold) => {
					clearInvestment(threshold);
					toast("Investment cleared");
					setActive(null);
				}
			})
		]
	});
}
function InvestSheet({ open, threshold, crossedOn, existing, onClose, onSave, onClear }) {
	const [dateInvested, setDateInvested] = (0, import_react.useState)(todayISO());
	const [company, setCompany] = (0, import_react.useState)(LUSE_COUNTERS[0]);
	const [customCompany, setCustomCompany] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [fees, setFees] = (0, import_react.useState)(false);
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setDateInvested(existing?.dateInvested ?? todayISO());
		const known = LUSE_COUNTERS.find((name) => name === existing?.company);
		setCompany(known ?? (existing?.company ? "Other" : LUSE_COUNTERS[0]));
		setCustomCompany(known || !existing?.company ? "" : existing.company);
		setAmount(existing ? String(existing.amountInvested) : threshold != null ? String(threshold) : "");
		setFees(existing?.feesConfirmed ?? false);
		setNotes(existing?.notes ?? "");
	}, [
		open,
		threshold,
		existing
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: threshold != null ? `${formatK(threshold, { decimals: 0 })} milestone` : "Record buy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: crossedOn ? `Savings crossed this mark on ${formatDayShort(crossedOn)}. Fill this in once the shares are actually bought.` : "Fill this in once the shares are actually bought." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "invest-date",
								children: "Date invested"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invest-date",
								type: "date",
								value: dateInvested,
								onChange: (e) => setDateInvested(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "company",
									children: "Company / counter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "company",
									value: company,
									onChange: (e) => setCompany(e.target.value),
									className: "flex h-11 w-full rounded-md border border-input bg-card px-3 text-sm",
									children: LUSE_COUNTERS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: name,
										children: name
									}, name))
								}),
								company === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Counter name",
									value: customCompany,
									onChange: (e) => setCustomCompany(e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "invest-amount",
								children: "Amount invested (K)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invest-amount",
								inputMode: "decimal",
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								className: "tabular-nums"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: fees,
								onCheckedChange: (value) => setFees(value === true)
							}), "Fees confirmed with the broker"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "invest-notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "invest-notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								rows: 2
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-2 sm:flex-row-reverse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full sm:w-auto",
						onClick: () => {
							if (threshold == null) return;
							const parsed = Number(amount);
							if (!Number.isFinite(parsed) || parsed <= 0) {
								toast.error("Enter the amount invested.");
								return;
							}
							const name = company === "Other" ? customCompany.trim() : company;
							if (!name) {
								toast.error("Choose a LuSE counter.");
								return;
							}
							onSave(threshold, {
								dateInvested,
								company: name,
								amountInvested: parsed,
								feesConfirmed: fees,
								notes: notes.trim()
							});
						},
						children: "Save trade"
					}), existing && threshold != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full text-destructive sm:w-auto",
						onClick: () => onClear(threshold),
						children: "Remove"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full sm:w-auto",
						onClick: onClose,
						children: "Cancel"
					})]
				})
			]
		})
	});
}
//#endregion
export { InvestPage as component };
