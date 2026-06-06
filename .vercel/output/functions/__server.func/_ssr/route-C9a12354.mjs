import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DolQWbtS.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { b as Menu, c as Search, B as Bell, G as GraduationCap, X, d as LayoutDashboard, e as BookOpen, T as TrendingUp, f as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: TrendingUp }
];
function AppShell({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:flex w-64 shrink-0 flex-col border-r border-border/50 bg-sidebar/50 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { pathname, onSignOut: handleSignOut }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden fixed inset-0 z-50 flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm", onClick: () => setMobileOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.aside,
        {
          initial: { x: -280 },
          animate: { x: 0 },
          className: "relative w-64 h-full flex flex-col border-r border-border bg-sidebar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { pathname, onSignOut: handleSignOut, onNavigate: () => setMobileOpen(false) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8 h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden",
            onClick: () => setMobileOpen(true),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              placeholder: "Search courses, lessons...",
              className: "w-full h-10 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-pink animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 lg:p-8", children })
    ] })
  ] });
}
function SidebarContent({
  pathname,
  onSignOut,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2", onClick: onNavigate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-background" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold", children: "EduFlow" })
      ] }),
      onNavigate && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onNavigate, className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 space-y-1", children: nav.map((item) => {
      const active = pathname === item.to || item.to !== "/dashboard" && pathname.startsWith(item.to);
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          onClick: onNavigate,
          className: `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "text-foreground bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
          children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                layoutId: "nav-active",
                className: "absolute inset-0 rounded-xl bg-gradient-to-r from-violet/20 to-pink/10 border border-white/10",
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "relative w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: item.label })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onSignOut,
        className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          "Sign out"
        ]
      }
    ) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};
