import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ArrowRight, i as Target, o as Landmark, r as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { h as formatK, l as PLAN_DAY_COUNT, m as formatDayShort, n as useLedger, r as cn, s as PLAN, u as PLAN_TARGET_TOTAL } from "./router-BgWiq2eB.mjs";
import { a as CardTitle, g as cumulativeSeries, h as computeStats, i as CardHeader, m as buildRows, n as Card, r as CardContent, t as Button, v as thisWeek } from "./stats-D3Jy6S5N.mjs";
import { t as DayEditor } from "./day-editor-CyMKfEd6.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as XAxis, r as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DhEImzem.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavingsChart({ data }) {
	if (data.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-sm text-muted-foreground",
		children: "Chart appears after a few deposits."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-48 w-full text-primary",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 12,
					right: 8,
					left: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "savedFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "currentColor",
							stopOpacity: .22
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "currentColor",
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "date",
						tickFormatter: (value) => formatDayShort(value),
						tick: {
							fontSize: 11,
							fill: "var(--muted-foreground)"
						},
						tickLine: false,
						axisLine: false,
						minTickGap: 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
						if (!active || !payload?.[0]) return null;
						const point = payload[0].payload;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: formatDayShort(point.date) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular-nums",
								children: [formatK(point.total), " total"]
							})]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "total",
						stroke: "currentColor",
						strokeWidth: 2,
						fill: "url(#savedFill)",
						dot: false,
						activeDot: {
							r: 4,
							fill: "var(--primary)"
						}
					})
				]
			})
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		outline: "border border-border text-foreground",
		positive: "bg-positive/10 text-positive"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full w-full flex-1 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
function Home() {
	const deposits = useLedger((s) => s.deposits);
	const investments = useLedger((s) => s.investments);
	const hydrated = useLedger((s) => s.hydrated);
	const [editDate, setEditDate] = (0, import_react.useState)(null);
	const stats = (0, import_react.useMemo)(() => computeStats(deposits, investments), [deposits, investments]);
	const rows = (0, import_react.useMemo)(() => buildRows(deposits, stats.today), [deposits, stats.today]);
	const series = (0, import_react.useMemo)(() => cumulativeSeries(deposits, stats.today), [deposits, stats.today]);
	const week = (0, import_react.useMemo)(() => thisWeek(rows, stats.today), [rows, stats.today]);
	const recent = (0, import_react.useMemo)(() => rows.filter((row) => row.amount != null).slice(-5).reverse(), [rows]);
	const nextGap = stats.nextMilestone != null ? Math.max(0, stats.nextMilestone.threshold - stats.totalSaved) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: [
						"K",
						PLAN.dailyTarget,
						" a day · to ",
						formatDayShort(PLAN.targetDate)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl",
					children: "Daily savings, then LuSE."
				})]
			}),
			!stats.todayLogged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rise rise-1 border-0 bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-primary-foreground/70",
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl font-medium",
							children: ["Log ", formatK(PLAN.dailyTarget, { decimals: 0 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-primary-foreground/70",
							children: [
								"Keep the streak at ",
								stats.streak,
								" days."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
						onClick: () => setEditDate(stats.today),
						children: "Record deposit"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rise rise-2 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Saved so far"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-5xl font-medium tracking-tight tabular-nums sm:text-6xl",
							children: formatK(stats.totalSaved, { decimals: stats.totalSaved % 1 === 0 ? 0 : 2 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"of ",
								formatK(PLAN_TARGET_TOTAL, { decimals: 0 }),
								" if every day is",
								" ",
								formatK(PLAN.dailyTarget, { decimals: 0 })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: stats.progressPct,
							className: "mt-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [stats.progressPct.toFixed(1), "% of the plan"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								stats.daysElapsed,
								" of ",
								PLAN_DAY_COUNT,
								" days"
							] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise rise-3 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Patumba balance",
						value: stats.lastBankBalance != null ? formatK(stats.lastBankBalance) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Interest earned",
						value: stats.interestEarned != null ? formatK(stats.interestEarned) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Pace vs K10",
						value: stats.paceDelta >= 0 ? `+${formatK(stats.paceDelta, { decimals: 0 })}` : formatK(stats.paceDelta, { decimals: 0 }),
						hint: "ahead",
						positive: stats.paceDelta >= 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Average day",
						value: stats.averageDeposit != null ? formatK(stats.averageDeposit) : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rise rise-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "pb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "This week"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground tabular-nums",
							children: [stats.streak, "-day streak"]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid grid-cols-7 gap-2",
					children: week.map((day) => {
						const filled = day.amount != null && day.amount > 0;
						const clickable = !day.isFuture;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !clickable,
							onClick: () => clickable && setEditDate(day.date),
							className: cn("flex w-full flex-col items-center gap-1.5 rounded-lg py-2 text-xs transition-colors duration-150", clickable && "hover:bg-muted", day.isToday && "ring-1 ring-primary/40"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: [
										"M",
										"T",
										"W",
										"T",
										"F",
										"S",
										"S"
									][((/* @__PURE__ */ new Date(`${day.date}T12:00:00`)).getDay() + 6) % 7]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-8 items-center justify-center rounded-full text-[11px] font-medium tabular-nums", filled && "bg-primary text-primary-foreground", day.isMissed && "border border-dashed border-border text-muted-foreground", day.isFuture && "text-muted-foreground/50", day.isToday && !filled && "bg-muted text-foreground"),
									children: (/* @__PURE__ */ new Date(`${day.date}T12:00:00`)).getDate()
								}),
								filled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "deposited"
								})
							]
						}) }, day.date);
					})
				}) })]
			}),
			stats.readyMilestones.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rise rise-5 border-0 bg-primary/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								formatK(stats.readyMilestones[0].threshold, { decimals: 0 }),
								" ",
								"reached"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Move that chunk into LuSE shares instead of letting it sit until 2028."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "default",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/invest",
							children: ["Record a buy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Cumulative deposits"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsChart, { data: series }) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "On this pace"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projection, {
								icon: TrendingUp,
								label: "If the average holds",
								value: formatK(stats.projectedIfPaceHolds, { decimals: 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projection, {
								icon: Target,
								label: `If every remaining day is ${formatK(PLAN.dailyTarget, { decimals: 0 })}`,
								value: formatK(stats.projectedIfTenADay, { decimals: 0 })
							}),
							stats.nextMilestone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Next stock chunk:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground tabular-nums",
										children: formatK(stats.nextMilestone.threshold, { decimals: 0 })
									}),
									" · ",
									formatK(nextGap, { decimals: 0 }),
									" to go"
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Recent deposits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ledger",
						children: "Full ledger"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: recent.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-center justify-between gap-3 border-t border-border px-5 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setEditDate(row.date),
						className: "flex min-h-11 flex-1 items-center justify-between gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: formatDayShort(row.date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium tabular-nums",
							children: row.amount != null ? formatK(row.amount, { decimals: row.amount % 1 ? 2 : 0 }) : "—"
						})]
					})
				}, row.date)) })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: hydrated ? "Saved on this device. Call a licensed LuSE broker before the first trade." : "Loading ledger…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayEditor, {
				date: editDate,
				onClose: () => setEditDate(null)
			})
		]
	});
}
function StatTile({ label, value, hint, positive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-display text-xl font-medium tracking-tight tabular-nums sm:text-2xl", positive && "text-positive"),
				children: value
			}),
			hint && positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "positive",
				className: "mt-2",
				children: hint
			}) : null
		]
	}) });
}
function Projection({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-9 items-center justify-center rounded-md bg-muted text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-medium tabular-nums",
			children: value
		})] })]
	});
}
//#endregion
export { Home as component };
