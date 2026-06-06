import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as dashboardQuery$1 } from "./router-D3vW-uS8.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Tile, P as ProgressBar } from "./tile-etvfymRs.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { F as Flame, P as Play, A as ArrowRight, C as Clock, e as BookOpen, g as Trophy, h as Calendar } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./client-DolQWbtS.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-Bl61HSLf.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./auth-middleware-VWYLwu_n.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[minmax(120px,auto)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "md:col-span-2 xl:col-span-3 row-span-2 h-60 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "md:col-span-2 xl:col-span-2 h-72 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "md:col-span-2 xl:col-span-2 h-72 rounded-2xl" })
  ] });
}
function DashboardContent() {
  const {
    data
  } = useSuspenseQuery(dashboardQuery$1);
  const {
    profile,
    courses,
    enrollments,
    activity
  } = data;
  const navigate = useNavigate();
  const name = profile.display_name?.split(" ")[0] ?? "there";
  const minutesThisWeek = activity.slice(-7).reduce((sum, a) => sum + a.minutes_studied, 0);
  const hoursThisWeek = Math.round(minutesThisWeek / 60 * 10) / 10;
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100).length;
  const avgProgress = enrollments.length ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length) : 0;
  const streak = computeStreak(activity);
  const continueEnrollment = [...enrollments].sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())[0];
  const continueCourse = continueEnrollment ? courses.find((c) => c.id === continueEnrollment.course_id) : void 0;
  const chartData = activity.map((a) => ({
    day: new Date(a.day).toLocaleDateString("en-US", {
      weekday: "short"
    }),
    minutes: a.minutes_studied
  }));
  const courseRows = enrollments.map((e) => ({
    e,
    c: courses.find((c) => c.id === e.course_id)
  })).filter((row) => row.c);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold", children: [
        "Welcome back, ",
        name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Here's how your learning is going." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[minmax(0,auto)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tile, { className: "md:col-span-2 xl:col-span-3 relative overflow-hidden min-h-[260px] !p-8", delay: 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-10 w-80 h-80 rounded-full bg-violet/30 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan/20 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
            rotate: 360
          }, transition: {
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }, className: "absolute top-1/2 right-1/4 w-96 h-96 border border-white/5 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-amber" }),
              " ",
              streak,
              "-day streak"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold max-w-lg leading-tight", children: continueCourse ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Pick up ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent", children: continueCourse.title })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Start your first ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent", children: "course" })
            ] }) }),
            continueEnrollment && continueCourse && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Lesson ",
              continueEnrollment.lessons_completed + 1,
              " of ",
              continueCourse.total_lessons,
              " · ",
              continueEnrollment.progress,
              "% complete"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-to-r from-violet to-pink text-background hover:opacity-90", onClick: () => navigate({
              to: "/progress"
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2", fill: "currentColor" }),
              "Continue learning"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "text-muted-foreground hover:text-foreground", onClick: () => navigate({
              to: "/courses"
            }), children: [
              "Browse catalog ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }), label: "Day streak", value: streak, suffix: "days", color: "amber" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }), label: "Hours this week", value: hoursThisWeek, suffix: "h", color: "cyan" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }), label: "In progress", value: inProgress, suffix: "courses", color: "violet" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }), label: "Avg completion", value: avgProgress, suffix: "%", color: "pink" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tile, { className: "md:col-span-2 xl:col-span-2 min-h-[300px]", delay: 0.25, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Study activity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last 14 days" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: chartData, margin: {
          top: 10,
          right: 10,
          left: -20,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-violet)", stopOpacity: 0.6 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-violet)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(1 0 0 / 6%)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "oklch(1 0 0 / 40%)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "oklch(1 0 0 / 40%)", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "oklch(0.2 0.03 270)",
            border: "1px solid oklch(1 0 0 / 10%)",
            borderRadius: 12,
            fontSize: 12
          }, labelStyle: {
            color: "oklch(1 0 0 / 70%)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "minutes", stroke: "var(--color-violet)", strokeWidth: 2, fill: "url(#grad)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tile, { className: "md:col-span-2 xl:col-span-2 min-h-[300px]", delay: 0.3, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Your courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            courseRows.length,
            " enrolled"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: courseRows.slice(0, 4).map(({
          e,
          c
        }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: -10
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          delay: 0.3 + i * 0.06
        }, whileHover: {
          scale: 1.02
        }, onClick: () => navigate({
          to: "/progress"
        }), className: "group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl grid place-items-center text-xl shrink-0", style: {
            background: `color-mix(in oklch, var(--color-${c.color}) 25%, transparent)`
          }, children: c.cover_emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
                e.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mb-1.5", children: [
              c.category,
              " · ",
              c.instructor
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: e.progress, color: c.color })
          ] })
        ] }, e.id)) })
      ] })
    ] })
  ] });
}
function StatTile({
  icon,
  label,
  value,
  suffix,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg grid place-items-center", style: {
      background: `color-mix(in oklch, var(--color-${color}) 25%, transparent)`,
      color: `var(--color-${color})`
    }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "text-3xl font-bold font-display tabular-nums", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: suffix })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
    ] })
  ] });
}
function computeStreak(activity) {
  const days = new Set(activity.filter((a) => a.minutes_studied > 0).map((a) => a.day));
  let streak = 0;
  const cursor = /* @__PURE__ */ new Date();
  for (let i = 0; i < 365; i++) {
    const key = cursor.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
export {
  DashboardPage as component
};
