import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createSupabaseClient() {
  const SUPABASE_URL = "https://jjorsrnvarefnwjiwpsf.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb3Jzcm52YXJlZm53aml3cHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTc0NzEsImV4cCI6MjA5NjIzMzQ3MX0.VE1YNBo5lvbuzSefGz9lx8Oj7Oiex0mNretj0RZGJyU";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
