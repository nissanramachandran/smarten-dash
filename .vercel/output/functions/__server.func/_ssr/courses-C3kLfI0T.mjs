import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as dashboardQuery, e as enrollCourse } from "./router-D3vW-uS8.mjs";
import { d as useNavigate, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { a as useSuspenseQuery, u as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { P as ProgressBar } from "./tile-etvfymRs.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { i as ChartColumn, C as Clock, j as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "node:stream";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
function CoursesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-2xl" }, i)) })
  ] });
}
function CoursesContent() {
  const {
    data
  } = useSuspenseQuery(dashboardQuery);
  const queryClient = useQueryClient();
  const enrollFn = useServerFn(enrollCourse);
  const navigate = useNavigate();
  const [filter, setFilter] = reactExports.useState("All");
  const enrollMutation = useMutation({
    mutationFn: (courseId) => enrollFn({
      data: {
        courseId
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard"]
      });
      toast.success("Enrolled!");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const categories = ["All", ...Array.from(new Set(data.courses.map((c) => c.category)))];
  const enrolledIds = new Set(data.enrollments.map((e) => e.course_id));
  const filtered = filter === "All" ? data.courses : data.courses.filter((c) => c.category === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Find your next thing to learn." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(cat), className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === cat ? "bg-white/10 border-white/20 text-foreground" : "bg-transparent border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5"}`, children: cat }, cat)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((c, i) => {
      const enrollment = data.enrollments.find((e) => e.course_id === c.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.04
      }, whileHover: {
        scale: 1.02,
        y: -4
      }, className: "glass rounded-2xl p-5 flex flex-col gap-4 cursor-pointer", onClick: () => {
        if (enrollment) navigate({
          to: "/progress"
        });
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl grid place-items-center text-2xl", style: {
            background: `color-mix(in oklch, var(--color-${c.color}) 30%, transparent)`
          }, children: c.cover_emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground", children: c.difficulty })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: c.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mt-1 leading-snug", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: c.subtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3 h-3" }),
            c.total_lessons,
            " lessons"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            Math.round(c.duration_minutes / 60),
            "h"
          ] })
        ] }),
        enrollment ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              enrollment.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: enrollment.progress, color: c.color })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "bg-white/5 border-white/10", disabled: enrollMutation.isPending, onClick: (e) => {
          e.stopPropagation();
          enrollMutation.mutate(c.id);
        }, children: enrolledIds.has(c.id) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-1" }),
          " Enrolled"
        ] }) : "Enroll" })
      ] }, c.id);
    }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CoursesSkeleton, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoursesContent, {}) });
export {
  SplitComponent as component
};
