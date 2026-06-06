import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-Bl61HSLf.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-VWYLwu_n.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
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
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDashboardData_createServerFn_handler = createServerRpc({
  id: "b6fc71d242071d137840a72f04ba960c612aa824c43b4cfe38cfc23bbd85efa6",
  name: "getDashboardData",
  filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
const getDashboardData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getDashboardData_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const [profileRes, coursesRes, enrollRes, activityRes] = await Promise.all([supabase.from("profiles").select("display_name, avatar_url").eq("id", userId).maybeSingle(), supabase.from("courses").select("*").order("created_at"), supabase.from("enrollments").select("*").eq("user_id", userId), supabase.from("activity").select("day, minutes_studied").eq("user_id", userId).gte("day", new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10)).order("day")]);
  if (coursesRes.error) throw new Error(coursesRes.error.message);
  if (enrollRes.error) throw new Error(enrollRes.error.message);
  if (activityRes.error) throw new Error(activityRes.error.message);
  return {
    profile: profileRes.data ?? {
      display_name: null,
      avatar_url: null
    },
    courses: coursesRes.data ?? [],
    enrollments: enrollRes.data ?? [],
    activity: activityRes.data ?? []
  };
});
const updateProgress_createServerFn_handler = createServerRpc({
  id: "7ed414b627119343abbb5f5a3f21ecec84d79c7c95b26590d8b2cb51c452790e",
  name: "updateProgress",
  filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => updateProgress.__executeServer(opts));
const updateProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(updateProgress_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("enrollments").update({
    progress: data.progress,
    last_activity_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("user_id", userId).eq("course_id", data.courseId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const enrollCourse_createServerFn_handler = createServerRpc({
  id: "b59dc20ac2c1e5e958d5a8a40005a9e8ebd2ca895fd31610b71188ee0b98a0e3",
  name: "enrollCourse",
  filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => enrollCourse.__executeServer(opts));
const enrollCourse = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(enrollCourse_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("enrollments").insert({
    user_id: userId,
    course_id: data.courseId,
    progress: 0,
    lessons_completed: 0
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  enrollCourse_createServerFn_handler,
  getDashboardData_createServerFn_handler,
  updateProgress_createServerFn_handler
};
