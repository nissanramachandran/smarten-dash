import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { motion } from "motion/react";
import { getDashboardData } from "@/lib/api/dashboard.functions";
import { Tile, ProgressBar } from "@/components/tile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const dashboardQuery = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData(),
});

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [
      { title: "Progress — EduFlow" },
      { name: "description", content: "Track progress across all your enrolled courses." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(dashboardQuery);
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Tile className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">Couldn't load progress</h2>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
      </Tile>
    );
  },
  notFoundComponent: () => <p>Not found</p>,
  component: () => (
    <Suspense fallback={<div className="space-y-3">{Array.from({length:4}).map((_,i)=>(<Skeleton key={i} className="h-24 rounded-2xl"/>))}</div>}>
      <ProgressContent />
    </Suspense>
  ),
});

function ProgressContent() {
  const { data } = useSuspenseQuery(dashboardQuery);
  const rows = data.enrollments
    .map((e) => ({ e, c: data.courses.find((c) => c.id === e.course_id)! }))
    .filter((r) => r.c)
    .sort((a, b) => b.e.progress - a.e.progress);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground mt-1">Every course you're working through.</p>
      </div>
      <div className="space-y-3">
        {rows.map(({ e, c }, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-xl grid place-items-center text-xl shrink-0"
              style={{ background: `color-mix(in oklch, var(--color-${c.color}) 25%, transparent)` }}
            >
              {c.cover_emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-medium truncate">{c.title}</p>
                <span className="text-sm font-display font-semibold tabular-nums">{e.progress}%</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {e.lessons_completed} / {c.total_lessons} lessons · {c.instructor}
              </p>
              <ProgressBar value={e.progress} color={c.color} />
            </div>
          </motion.div>
        ))}
        {rows.length === 0 && (
          <Tile className="text-center py-16">
            <p className="text-muted-foreground">No courses yet. Head to <span className="text-foreground">Courses</span> to enroll.</p>
          </Tile>
        )}
      </div>
    </div>
  );
}