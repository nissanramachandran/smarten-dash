import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DolQWbtS.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-Bl61HSLf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-VWYLwu_n.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-BlcIo09w.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EduFlow — Student Learning Dashboard" },
      { name: "description", content: "A futuristic dark-mode learning dashboard. Track courses, streaks, and progress in one premium workspace." },
      { name: "author", content: "EduFlow" },
      { property: "og:title", content: "EduFlow — Student Learning Dashboard" },
      { property: "og:description", content: "Track courses, streaks, and progress in one premium dark workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right" })
  ] });
}
const $$splitComponentImporter$4 = () => import("./auth-CjxH-GEQ.mjs");
const Route$5 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — EduFlow"
    }, {
      name: "description",
      content: "Sign in to your EduFlow learning dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./route-C9a12354.mjs");
const Route$4 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/auth"
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const Route$3 = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/auth" });
  }
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDashboardData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b6fc71d242071d137840a72f04ba960c612aa824c43b4cfe38cfc23bbd85efa6"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(createSsrRpc("7ed414b627119343abbb5f5a3f21ecec84d79c7c95b26590d8b2cb51c452790e"));
const enrollCourse = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(createSsrRpc("b59dc20ac2c1e5e958d5a8a40005a9e8ebd2ca895fd31610b71188ee0b98a0e3"));
const dashboardQuery$2 = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData()
});
const $$splitComponentImporter$2 = () => import("./progress-kds7S6Kt.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./progress-DKYUQ24e.mjs");
const $$splitErrorComponentImporter$2 = () => import("./progress-Bk7AElke.mjs");
const Route$2 = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [{
      title: "Progress — EduFlow"
    }, {
      name: "description",
      content: "Track progress across all your enrolled courses."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(dashboardQuery$2);
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const dashboardQuery$1 = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData()
});
const $$splitComponentImporter$1 = () => import("./dashboard-BsgiZBv8.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./dashboard-DKYUQ24e.mjs");
const $$splitErrorComponentImporter$1 = () => import("./dashboard-BoyRCoip.mjs");
const Route$1 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — EduFlow"
    }, {
      name: "description",
      content: "Your learning dashboard with courses, streaks, and activity."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(dashboardQuery$1);
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const dashboardQuery = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData()
});
const $$splitComponentImporter = () => import("./courses-C3kLfI0T.mjs");
const $$splitNotFoundComponentImporter = () => import("./courses-DKYUQ24e.mjs");
const $$splitErrorComponentImporter = () => import("./courses-CggLEL_l.mjs");
const Route = createFileRoute("/_authenticated/courses")({
  head: () => ({
    meta: [{
      title: "Courses — EduFlow"
    }, {
      name: "description",
      content: "Browse and continue your courses."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(dashboardQuery);
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthRoute = Route$5.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$6
});
const AuthenticatedRouteRoute = Route$4.update({
  id: "/_authenticated",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const AuthenticatedProgressRoute = Route$2.update({
  id: "/progress",
  path: "/progress",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCoursesRoute = Route.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedCoursesRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedProgressRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  dashboardQuery$1 as a,
  dashboardQuery as b,
  dashboardQuery$2 as d,
  enrollCourse as e,
  router as r
};
