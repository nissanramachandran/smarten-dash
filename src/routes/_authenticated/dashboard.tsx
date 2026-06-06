import { createFileRoute, useRouter, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { motion } from "motion/react";
import { Flame, Clock, BookOpen, Trophy, Play, ArrowRight, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getDashboardData } from "@/lib/api/dashboard.functions";
import { Tile, ProgressBar } from "@/components/tile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const dashboardQuery = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData(),
});

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduFlow" },
      { name: "description", content: "Your learning dashboard with courses, streaks, and activity." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(dashboardQuery);
  },
  errorComponent: DashboardError,
  notFoundComponent: () => <p>Not found</p>,
  component: DashboardPage,
});

function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <Tile className="text-center py-16">
      <h2 className="text-xl font-semibold mb-2">Couldn't load your dashboard</h2>
      <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
    </Tile>
  );
}

function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[minmax(120px,auto)]">
      <Skeleton className="md:col-span-2 xl:col-span-3 row-span-2 h-60 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="md:col-span-2 xl:col-span-2 h-72 rounded-2xl" />
      <Skeleton className="md:col-span-2 xl:col-span-2 h-72 rounded-2xl" />
    </div>
  );
}

function DashboardContent() {
  const { data } = useSuspenseQuery(dashboardQuery);
  const { profile, courses, enrollments, activity } = data;
  const navigate = useNavigate();

  const name = profile.display_name?.split(" ")[0] ?? "there";
  const minutesThisWeek = activity
    .slice(-7)
    .reduce((sum, a) => sum + a.minutes_studied, 0);
  const hoursThisWeek = Math.round((minutesThisWeek / 60) * 10) / 10;
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100).length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0;
  const streak = computeStreak(activity);

  const continueEnrollment = [...enrollments]
    .sort((a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime())[0];
  const continueCourse = continueEnrollment
    ? courses.find((c) => c.id === continueEnrollment.course_id)
    : undefined;

  const chartData = activity.map((a) => ({
    day: new Date(a.day).toLocaleDateString("en-US", { weekday: "short" }),
    minutes: a.minutes_studied,
  }));

  const courseRows = enrollments
    .map((e) => ({ e, c: courses.find((c) => c.id === e.course_id)! }))
    .filter((row) => row.c);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
        <p className="text-muted-foreground mt-1">Here's how your learning is going.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[minmax(0,auto)]">
        {/* Hero */}
        <Tile className="md:col-span-2 xl:col-span-3 relative overflow-hidden min-h-[260px] !p-8" delay={0}>
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-20 -right-10 w-80 h-80 rounded-full bg-violet/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan/20 blur-3xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 right-1/4 w-96 h-96 border border-white/5 rounded-full"
            />
          </div>
          <div className="flex flex-col h-full justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                <Flame className="w-3 h-3 text-amber" /> {streak}-day streak
              </div>
              <h2 className="text-3xl md:text-4xl font-bold max-w-lg leading-tight">
                {continueCourse ? (
                  <>Pick up <span className="bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent">{continueCourse.title}</span></>
                ) : (
                  <>Start your first <span className="bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent">course</span></>
                )}
              </h2>
              {continueEnrollment && continueCourse && (
                <p className="text-sm text-muted-foreground">
                  Lesson {continueEnrollment.lessons_completed + 1} of {continueCourse.total_lessons} · {continueEnrollment.progress}% complete
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="bg-gradient-to-r from-violet to-pink text-background hover:opacity-90"
                onClick={() => navigate({ to: "/progress" })}
              >
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                Continue learning
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: "/courses" })}
              >
                Browse catalog <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Tile>

        {/* Stat tile — streak */}
        <Tile delay={0.05}>
          <StatTile
            icon={<Flame className="w-4 h-4" />}
            label="Day streak"
            value={streak}
            suffix="days"
            color="amber"
          />
        </Tile>

        {/* Stat tile — hours */}
        <Tile delay={0.1}>
          <StatTile
            icon={<Clock className="w-4 h-4" />}
            label="Hours this week"
            value={hoursThisWeek}
            suffix="h"
            color="cyan"
          />
        </Tile>

        {/* Stat tile — in progress */}
        <Tile delay={0.15}>
          <StatTile
            icon={<BookOpen className="w-4 h-4" />}
            label="In progress"
            value={inProgress}
            suffix="courses"
            color="violet"
          />
        </Tile>

        {/* Stat tile — avg progress */}
        <Tile delay={0.2}>
          <StatTile
            icon={<Trophy className="w-4 h-4" />}
            label="Avg completion"
            value={avgProgress}
            suffix="%"
            color="pink"
          />
        </Tile>

        {/* Activity chart */}
        <Tile className="md:col-span-2 xl:col-span-2 min-h-[300px]" delay={0.25}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Study activity</h3>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-violet)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-violet)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 40%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 40%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.2 0.03 270)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "oklch(1 0 0 / 70%)" }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="var(--color-violet)"
                  strokeWidth={2}
                  fill="url(#grad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Tile>

        {/* Course cards */}
        <Tile className="md:col-span-2 xl:col-span-2 min-h-[300px]" delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Your courses</h3>
              <p className="text-xs text-muted-foreground">{courseRows.length} enrolled</p>
            </div>
          </div>
          <div className="space-y-3">
            {courseRows.slice(0, 4).map(({ e, c }, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate({ to: "/progress" })}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded-xl grid place-items-center text-xl shrink-0"
                  style={{ background: `color-mix(in oklch, var(--color-${c.color}) 25%, transparent)` }}
                >
                  {c.cover_emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm truncate">{c.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{e.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1.5">{c.category} · {c.instructor}</p>
                  <ProgressBar value={e.progress} color={c.color} />
                </div>
              </motion.div>
            ))}
          </div>
        </Tile>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}) {
  return (
    <div className="flex flex-col h-full justify-between gap-3">
      <div
        className="w-8 h-8 rounded-lg grid place-items-center"
        style={{ background: `color-mix(in oklch, var(--color-${color}) 25%, transparent)`, color: `var(--color-${color})` }}
      >
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold font-display tabular-nums"
          >
            {value}
          </motion.span>
          <span className="text-sm text-muted-foreground">{suffix}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function computeStreak(activity: { day: string; minutes_studied: number }[]): number {
  const days = new Set(activity.filter((a) => a.minutes_studied > 0).map((a) => a.day));
  let streak = 0;
  const cursor = new Date();
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