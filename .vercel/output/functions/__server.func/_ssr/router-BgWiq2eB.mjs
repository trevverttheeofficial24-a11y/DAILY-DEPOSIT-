import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LayoutDashboard, n as TriangleAlert, o as Landmark, u as BookOpen } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as format, r as addDays, t as parseISO } from "../_libs/date-fns.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BgWiq2eB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var PLAN = {
	name: "K10 Ledger",
	startDate: "2026-07-29",
	targetDate: "2028-07-31",
	dailyTarget: 10,
	currency: "ZMW",
	symbol: "K"
};
var MILESTONE_THRESHOLDS = [
	500,
	1e3,
	2e3,
	3e3,
	4e3,
	5e3,
	6e3,
	7e3,
	8e3
];
var QUICK_AMOUNTS = [
	10,
	15,
	20,
	25
];
var LUSE_COUNTERS = [
	"Airtel Networks Zambia",
	"Copperbelt Energy Corporation",
	"Lafarge Zambia",
	"Madison Financial Services",
	"Puma Energy Zambia",
	"Real Estate Investments Zambia",
	"Shoprite Holdings",
	"Standard Chartered Bank Zambia",
	"Zambeef Products",
	"Zambia National Commercial Bank",
	"Zambia Sugar",
	"ZCCM Investments Holdings",
	"Other"
];
var BROKERS = ["Pangaea Securities", "Stockbrokers Zambia"];
/** Today's date in Africa/Lusaka as YYYY-MM-DD. */
function todayISO(now = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Africa/Lusaka",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(now);
}
function eachDay(start, end) {
	const days = [];
	let cursor = parseISO(start);
	const last = parseISO(end);
	while (cursor.getTime() <= last.getTime()) {
		days.push(format(cursor, "yyyy-MM-dd"));
		cursor = addDays(cursor, 1);
	}
	return days;
}
var PLAN_DAYS = eachDay(PLAN.startDate, PLAN.targetDate);
var PLAN_DAY_COUNT = PLAN_DAYS.length;
var PLAN_TARGET_TOTAL = PLAN_DAY_COUNT * PLAN.dailyTarget;
function formatK(value, options = {}) {
	const decimals = options.decimals ?? 2;
	return `K${value.toLocaleString("en-GB", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	})}`;
}
function formatDayHeading(iso) {
	return format(parseISO(iso), "EEEE, d MMMM yyyy");
}
function formatDayShort(iso) {
	return format(parseISO(iso), "d MMM");
}
function monthKey(iso) {
	return iso.slice(0, 7);
}
function compareISO(a, b) {
	return a.localeCompare(b);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: LayoutDashboard
	},
	{
		to: "/ledger",
		label: "Ledger",
		icon: BookOpen
	},
	{
		to: "/invest",
		label: "Invest",
		icon: Landmark
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const today = todayISO();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-medium tracking-tight text-primary",
						children: "K10 Ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted-foreground sm:inline",
						children: "Patumba to LuSE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted-foreground tabular-nums",
						children: formatDayShort(today)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 md:flex",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
								children: item.label
							}, item.to);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 py-6 pb-28 sm:px-6 md:pb-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-5xl grid-cols-3 pb-[env(safe-area-inset-bottom)]",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.8
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
/** Spreadsheet history through 7 September 2026. */
var SEED_ROWS = [
	[
		"2026-07-29",
		10,
		10
	],
	[
		"2026-07-30",
		10,
		20
	],
	[
		"2026-07-31",
		10,
		30
	],
	[
		"2026-08-01",
		10,
		40.01
	],
	[
		"2026-08-02",
		10,
		50.01
	],
	[
		"2026-08-03",
		10,
		60.01
	],
	[
		"2026-08-04",
		10,
		70.02
	],
	[
		"2026-08-05",
		10,
		80.03
	],
	[
		"2026-08-06",
		20,
		100.04
	],
	[
		"2026-08-07",
		10,
		110.05
	],
	[
		"2026-08-08",
		10,
		120.05
	],
	[
		"2026-08-09",
		10,
		130.06
	],
	[
		"2026-08-10",
		10,
		140.07
	],
	[
		"2026-08-11",
		20,
		160.09
	],
	[
		"2026-08-12",
		15,
		175.09
	],
	[
		"2026-08-13",
		10,
		185.11
	],
	[
		"2026-08-14",
		15,
		200.12
	],
	[
		"2026-08-15",
		10,
		210.15
	],
	[
		"2026-08-16",
		10,
		220.15
	],
	[
		"2026-08-17",
		7,
		227.19
	],
	[
		"2026-08-18",
		10,
		237.23
	],
	[
		"2026-08-19",
		13,
		250.28
	],
	[
		"2026-08-20",
		10,
		260.28
	],
	[
		"2026-08-21",
		10,
		270.34
	],
	[
		"2026-08-22",
		10,
		280.39
	],
	[
		"2026-08-23",
		20,
		300.5
	],
	[
		"2026-08-24",
		10,
		310.5
	],
	[
		"2026-08-25",
		20,
		330.62
	],
	[
		"2026-08-26",
		15,
		345.69
	],
	[
		"2026-08-27",
		10,
		355.69
	],
	[
		"2026-08-28",
		25,
		380.82
	],
	[
		"2026-08-29",
		20,
		400.9
	],
	[
		"2026-08-30",
		10,
		410.9
	],
	[
		"2026-08-31",
		10,
		420.98
	],
	[
		"2026-09-01",
		10,
		431.05
	],
	[
		"2026-09-02",
		10,
		441.29
	],
	[
		"2026-09-03",
		10,
		451.42
	],
	[
		"2026-09-04",
		10,
		461.54
	],
	[
		"2026-09-05",
		10,
		471.67
	],
	[
		"2026-09-06",
		20,
		491.8
	],
	[
		"2026-09-07",
		10,
		501.8
	]
];
function buildSeedDeposits() {
	const deposits = {};
	for (const [date, amount, bankBalance] of SEED_ROWS) deposits[date] = {
		amount,
		bankBalance,
		notes: "Deposited Successfully"
	};
	return deposits;
}
function canEditDate(date, today = todayISO()) {
	return date >= PLAN.startDate && date <= PLAN.targetDate && date <= today;
}
var useLedger = create()(persist((set) => ({
	deposits: buildSeedDeposits(),
	investments: {},
	hydrated: false,
	setHydrated: (value) => set({ hydrated: value }),
	logDeposit: (date, amount, bankBalance, notes) => {
		if (!canEditDate(date)) return;
		set((state) => ({ deposits: {
			...state.deposits,
			[date]: {
				amount,
				bankBalance,
				notes: notes.trim()
			}
		} }));
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
		set((state) => ({ investments: {
			...state.investments,
			[String(threshold)]: entry
		} }));
	},
	clearInvestment: (threshold) => {
		set((state) => {
			const next = { ...state.investments };
			delete next[String(threshold)];
			return { investments: next };
		});
	},
	resetToSeed: () => set({
		deposits: buildSeedDeposits(),
		investments: {}
	})
}), {
	name: "k10-ledger-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		deposits: state.deposits,
		investments: state.investments
	})
}));
function StoreProvider({ children }) {
	(0, import_react.useEffect)(() => {
		async function hydrate() {
			await useLedger.persist.rehydrate();
			useLedger.getState().setHydrated(true);
		}
		hydrate();
	}, []);
	return children;
}
function Toaster$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "light",
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast bg-card text-foreground border-border shadow-card",
			description: "text-muted-foreground",
			actionButton: "bg-primary text-primary-foreground",
			cancelButton: "bg-muted text-foreground"
		} },
		...props
	});
}
function TooltipProvider({ delayDuration = 200, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
var styles_default = "/assets/styles-B6DbC_ZH.css";
var APP_NAME = "K10 Ledger";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "A daily K10 savings ledger from Patumba to LuSE shares, running through July 2028."
			},
			{
				name: "theme-color",
				content: "#efeae0"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$2 = () => import("./routes-DhEImzem.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./invest-Br11ttN2.mjs");
var Route$1 = createFileRoute("/invest")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./ledger-z0doRP-C.mjs");
var Route = createFileRoute("/ledger")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	InvestRoute: Route$1.update({
		id: "/invest",
		path: "/invest",
		getParentRoute: () => Route$3
	}),
	LedgerRoute: Route.update({
		id: "/ledger",
		path: "/ledger",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { todayISO as _, LUSE_COUNTERS as a, PLAN_DAYS as c, QUICK_AMOUNTS as d, compareISO as f, monthKey as g, formatK as h, BROKERS as i, PLAN_DAY_COUNT as l, formatDayShort as m, useLedger as n, MILESTONE_THRESHOLDS as o, formatDayHeading as p, cn as r, PLAN as s, router_exports as t, PLAN_TARGET_TOTAL as u };
