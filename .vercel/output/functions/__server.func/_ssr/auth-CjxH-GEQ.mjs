import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DolQWbtS.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { G as GraduationCap, S as Sparkles, M as Mail, L as Lock, a as LoaderCircle } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/dashboard",
        replace: true
      });
    });
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: name || email.split("@")[0]
            }
          }
        });
        if (error) throw error;
        toast.success("Welcome to EduFlow!");
        navigate({
          to: "/dashboard",
          replace: true
        });
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        navigate({
          to: "/dashboard",
          replace: true
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/dashboard`
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({
      to: "/dashboard",
      replace: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden lg:flex flex-col justify-between p-12 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-cyan/20 blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", className: "flex items-center gap-2 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-background" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold", children: "EduFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-violet" }),
          "Your futuristic learning workspace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl font-bold leading-tight", children: [
          "Learn deeper.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent", children: "Track every minute." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md text-lg", children: "Bento-grid dashboards, real progress, and a study streak that actually feels good to keep." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "© 2026 EduFlow" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "w-full max-w-md glass rounded-3xl p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-background" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold", children: "EduFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-1", children: mode === "signin" ? "Welcome back" : "Create your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: mode === "signin" ? "Pick up right where you left off." : "Start tracking your learning today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "w-full bg-white/5 border-white/10 hover:bg-white/10", onClick: handleGoogle, disabled: loading, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4 mr-2", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5c1.6 0 3 .6 4.1 1.6l3-3C17.2 1.6 14.8.6 12 .6 7.4.6 3.4 3.2 1.4 7l3.5 2.7C5.9 6.9 8.7 5 12 5z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M23.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h6.5c-.3 1.5-1.2 2.7-2.5 3.5l3.4 2.6c2-1.9 3.1-4.6 3.1-8.1z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M4.9 14.3c-.2-.6-.4-1.3-.4-2.1s.1-1.5.4-2.1L1.4 7.4C.5 9.1 0 11 0 12.2s.5 3.1 1.4 4.8l3.5-2.7z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 24c3 0 5.5-1 7.4-2.7l-3.4-2.6c-1 .7-2.3 1.1-4 1.1-3.3 0-6.1-1.9-7.1-4.7L1.4 17.7C3.4 21.5 7.4 24 12 24z" })
        ] }),
        "Continue with Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Ada Lovelace" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "pl-9", placeholder: "you@school.edu" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "pl-9", placeholder: "••••••••" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-gradient-to-r from-violet to-pink text-background hover:opacity-90", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : mode === "signin" ? "Sign in" : "Create account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-center text-muted-foreground mt-6", children: [
        mode === "signin" ? "New to EduFlow?" : "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "text-foreground font-medium hover:text-violet transition-colors", children: mode === "signin" ? "Create an account" : "Sign in" })
      ] })
    ] }) })
  ] });
}
export {
  AuthPage as component
};
