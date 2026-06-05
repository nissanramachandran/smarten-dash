import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Loader2, Mail, Lock, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — EduFlow" },
      { name: "description", content: "Sign in to your EduFlow learning dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Welcome to EduFlow!");
        navigate({ to: "/dashboard", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard", replace: true });
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
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-cyan/20 blur-3xl" />
        </div>
        <Link to="/auth" className="flex items-center gap-2 text-foreground">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center">
            <GraduationCap className="w-5 h-5 text-background" />
          </div>
          <span className="font-display text-xl font-semibold">EduFlow</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-violet" />
            Your futuristic learning workspace
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            Learn deeper.<br />
            <span className="bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent">
              Track every minute.
            </span>
          </h1>
          <p className="text-muted-foreground max-w-md text-lg">
            Bento-grid dashboards, real progress, and a study streak that actually feels good to keep.
          </p>
        </motion.div>
        <p className="text-xs text-muted-foreground">© 2026 EduFlow</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass rounded-3xl p-8"
        >
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center">
              <GraduationCap className="w-5 h-5 text-background" />
            </div>
            <span className="font-display text-lg font-semibold">EduFlow</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signin" ? "Pick up right where you left off." : "Start tracking your learning today."}
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/5 border-white/10 hover:bg-white/10"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3-3C17.2 1.6 14.8.6 12 .6 7.4.6 3.4 3.2 1.4 7l3.5 2.7C5.9 6.9 8.7 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h6.5c-.3 1.5-1.2 2.7-2.5 3.5l3.4 2.6c2-1.9 3.1-4.6 3.1-8.1z"/>
              <path fill="#FBBC05" d="M4.9 14.3c-.2-.6-.4-1.3-.4-2.1s.1-1.5.4-2.1L1.4 7.4C.5 9.1 0 11 0 12.2s.5 3.1 1.4 4.8l3.5-2.7z"/>
              <path fill="#34A853" d="M12 24c3 0 5.5-1 7.4-2.7l-3.4-2.6c-1 .7-2.3 1.1-4 1.1-3.3 0-6.1-1.9-7.1-4.7L1.4 17.7C3.4 21.5 7.4 24 12 24z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" placeholder="you@school.edu" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" placeholder="••••••••" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-violet to-pink text-background hover:opacity-90">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === "signin" ? "Sign in" : "Create account")}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "New to EduFlow?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-foreground font-medium hover:text-violet transition-colors"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}