import { createFileRoute, useRouter, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Suspense, useState } from "react";
import { motion } from "motion/react";
import { Clock, BarChart3, CheckCircle2 } from "lucide-react";
import { getDashboardData, enrollCourse } from "@/lib/api/dashboard.functions";
import { Tile, ProgressBar } from "@/components/tile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const dashboardQuery = queryOptions({
  queryKey: ["dashboard"],
  queryFn: () => getDashboardData(),
});

export const Route = createFileRoute("/_authenticated/courses")({
  head: () => ({
    meta: [
      { title: "Courses — EduFlow" },
      { name: "description", content: "Browse and continue your courses." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(dashboardQuery);
  },
  errorComponent: ({ error, reset }) => <ErrorTile error={error} reset={reset} />,
  notFoundComponent: () => <p>Not found</p>,
  component: () => (
    <Suspense fallback={<CoursesSkeleton />}>
      <CoursesContent />
    </Suspense>
  ),
});

function ErrorTile({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <Tile className="text-center py-16">
      <h2 className="text-xl font-semibold mb-2">Couldn't load courses</h2>
      <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
    </Tile>
  );
}

function CoursesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48 rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function CoursesContent() {
  const { data } = useSuspenseQuery(dashboardQuery);
  const queryClient = useQueryClient();
  const enrollFn = useServerFn(enrollCourse);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollFn({ data: { courseId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Enrolled!");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const categories = ["All", ...Array.from(new Set(data.courses.map((c) => c.category)))];
  const enrolledIds = new Set(data.enrollments.map((e) => e.course_id));
  const filtered = filter === "All" ? data.courses : data.courses.filter((c) => c.category === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground mt-1">Find your next thing to learn.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === cat
                ? "bg-white/10 border-white/20 text-foreground"
                : "bg-transparent border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => {
          const enrollment = data.enrollments.find((e) => e.course_id === c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl p-5 flex flex-col gap-4 cursor-pointer"
              onClick={() => {
                if (enrollment) navigate({ to: "/progress" });
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 rounded-2xl grid place-items-center text-2xl"
                  style={{ background: `color-mix(in oklch, var(--color-${c.color}) 30%, transparent)` }}
                >
                  {c.cover_emoji}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">{c.difficulty}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.category}</p>
                <h3 className="font-semibold mt-1 leading-snug">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.subtitle}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><BarChart3 className="w-3 h-3" />{c.total_lessons} lessons</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{Math.round(c.duration_minutes / 60)}h</span>
              </div>
              {enrollment ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{enrollment.progress}%</span>
                  </div>
                  <ProgressBar value={enrollment.progress} color={c.color} />
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10"
                  disabled={enrollMutation.isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    enrollMutation.mutate(c.id);
                  }}
                >
                  {enrolledIds.has(c.id) ? <><CheckCircle2 className="w-4 h-4 mr-1" /> Enrolled</> : "Enroll"}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}