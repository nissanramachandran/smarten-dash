import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as dashboardQuery$2 } from "./router-D3vW-uS8.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProgressBar, T as Tile } from "./tile-etvfymRs.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "./auth-middleware-VWYLwu_n.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function ProgressContent() {
  const {
    data
  } = useSuspenseQuery(dashboardQuery$2);
  const rows = data.enrollments.map((e) => ({
    e,
    c: data.courses.find((c) => c.id === e.course_id)
  })).filter((r) => r.c).sort((a, b) => b.e.progress - a.e.progress);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Every course you're working through." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      rows.map(({
        e,
        c
      }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, className: "glass rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl grid place-items-center text-xl shrink-0", style: {
          background: `color-mix(in oklch, var(--color-${c.color}) 25%, transparent)`
        }, children: c.cover_emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display font-semibold tabular-nums", children: [
              e.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
            e.lessons_completed,
            " / ",
            c.total_lessons,
            " lessons · ",
            c.instructor
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: e.progress, color: c.color })
        ] })
      ] }, e.id)),
      rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Tile, { className: "text-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "No courses yet. Head to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Courses" }),
        " to enroll."
      ] }) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
  length: 4
}).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i)) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressContent, {}) });
export {
  SplitComponent as component
};
