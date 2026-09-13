import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as QUICK_AMOUNTS, h as formatK, n as useLedger, p as formatDayHeading, r as cn, s as PLAN } from "./router-BgWiq2eB.mjs";
import { c as Sheet, d as SheetHeader, f as SheetTitle, l as SheetContent, o as Input, p as Textarea, s as Label, t as Button, u as SheetDescription } from "./stats-D3Jy6S5N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/day-editor-CyMKfEd6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DayEditor({ date, onClose }) {
	const deposits = useLedger((s) => s.deposits);
	const logDeposit = useLedger((s) => s.logDeposit);
	const clearDeposit = useLedger((s) => s.clearDeposit);
	const existing = date ? deposits[date] : void 0;
	const [amount, setAmount] = (0, import_react.useState)("");
	const [bank, setBank] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!date) return;
		setAmount(existing ? String(existing.amount) : String(PLAN.dailyTarget));
		setBank(existing?.bankBalance != null ? String(existing.bankBalance) : "");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: Boolean(date),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: date ? formatDayHeading(date) : "Log deposit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Record what actually went into Patumba. Leave bank balance blank unless you have an SMS confirmation." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "deposit-amount",
									children: "Deposit (K)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "deposit-amount",
									inputMode: "decimal",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									className: "h-12 font-display text-lg tabular-nums"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2 pt-1",
									children: QUICK_AMOUNTS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setAmount(String(value)),
										className: cn("h-10 min-w-14 rounded-md px-3 text-sm font-medium tabular-nums transition-colors duration-150", Number(amount) === value ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"),
										children: formatK(value, { decimals: 0 })
									}, value))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bank-balance",
									children: "Bank balance (K), optional"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "bank-balance",
									inputMode: "decimal",
									placeholder: "From the Patumba SMS",
									value: bank,
									onChange: (e) => setBank(e.target.value),
									className: "tabular-nums"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Interest is the gap between this balance and your deposits."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "notes",
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "notes",
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
						onClick: handleSave,
						children: "Save deposit"
					}), existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full text-destructive sm:w-auto",
						onClick: handleClear,
						children: "Clear day"
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
export { DayEditor as t };
