import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getDashboardData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [profileRes, coursesRes, enrollRes, activityRes] = await Promise.all([
      supabase.from("profiles").select("display_name, avatar_url").eq("id", userId).maybeSingle(),
      supabase.from("courses").select("*").order("created_at"),
      supabase.from("enrollments").select("*").eq("user_id", userId),
      supabase
        .from("activity")
        .select("day, minutes_studied")
        .eq("user_id", userId)
        .gte("day", new Date(Date.now() - 14 * 86_400_000).toISOString().slice(0, 10))
        .order("day"),
    ]);

    if (coursesRes.error) throw new Error(coursesRes.error.message);
    if (enrollRes.error) throw new Error(enrollRes.error.message);
    if (activityRes.error) throw new Error(activityRes.error.message);

    return {
      profile: profileRes.data ?? { display_name: null, avatar_url: null },
      courses: coursesRes.data ?? [],
      enrollments: enrollRes.data ?? [],
      activity: activityRes.data ?? [],
    };
  });

export const updateProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { courseId: string; progress: number }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("enrollments")
      .update({ progress: data.progress, last_activity_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("course_id", data.courseId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const enrollCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { courseId: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("enrollments")
      .insert({ user_id: userId, course_id: data.courseId, progress: 0, lessons_completed: 0 });
    if (error) throw new Error(error.message);
    return { ok: true };
  });