
# EduFlow Dashboard

A premium dark-mode student learning dashboard, bento-grid layout, sidebar nav, animated tiles, dynamic courses from Lovable Cloud, behind email + Google auth.

Note: Lovable runs on TanStack Start (React + TS + Vite), not Next.js — same React/TS/Tailwind/Framer Motion/Supabase/Lucide stack underneath, deploys directly from Lovable (no Vercel step needed).

## Scope

### Backend (Lovable Cloud)
- Enable Cloud (Supabase under the hood).
- Tables:
  - `profiles` (id → auth.users, display_name, avatar_url) + signup trigger.
  - `courses` (id, title, subtitle, category, color, instructor, cover_emoji, total_lessons).
  - `enrollments` (user_id, course_id, progress 0–100, last_activity_at, lessons_completed).
  - `activity` (user_id, day date, minutes_studied) for the chart tile.
- RLS: users read/write only their own enrollments/activity/profile; courses readable by all authenticated users.
- Seed ~6 sample courses + a few weeks of activity rows per signup (seed script).

### Auth
- `/auth` page: email/password + Google (via Lovable's managed Google OAuth).
- `_authenticated/` layout gates the dashboard; sign-out in sidebar.

### UI / Routes
- `/auth` — split-screen login.
- `/_authenticated/` — app shell with collapsible sidebar (Dashboard, Courses, Progress, Schedule, Profile).
- `/_authenticated/index` — Dashboard bento grid:
  - Hero tile (greeting, streak, continue-learning CTA, gradient + subtle animated orbs).
  - Stats tiles (hours this week, courses in progress, completion %).
  - Activity chart tile (Recharts area chart, last 14 days).
  - Course cards grid (dynamic from `courses`+`enrollments`, animated progress bars).
  - Upcoming / next-lesson tile.
- `/_authenticated/courses` — full course list with filter chips.
- `/_authenticated/progress` — per-course progress with animated bars.

### Design system
- Dark-only theme in `src/styles.css` (oklch tokens). Deep indigo/near-black background, electric violet + cyan accents, soft glass cards with subtle borders and glow shadows.
- Typography: Space Grotesk (display) + Inter (body) via `<link>` in `__root.tsx`.
- Bento grid via CSS grid with varied col/row spans; rounded-2xl glass tiles.
- Framer Motion: staggered tile entrance, hover lift on cards, animated progress bar fills, number count-ups.
- Lucide icons throughout. Loading skeletons for every async tile. Error states with retry.
- Fully responsive (1-col mobile → 2-col tablet → 4-col desktop bento).

## Technical notes
- Server functions (`createServerFn` + `requireSupabaseAuth`) for all data reads (courses, enrollments, activity) — no direct Supabase calls from components for app data.
- TanStack Query owns caching; loaders `ensureQueryData`, components `useSuspenseQuery`. `errorComponent` + `notFoundComponent` on every route.
- `attachSupabaseAuth` confirmed in `src/start.ts`.
- Recharts for the activity chart (already Worker-safe).
- SEO: per-route `head()` titles + descriptions.

## Out of scope (this pass)
- Real lesson player / video.
- Quizzes, certificates, payments.
- Admin/instructor side.
- Push notifications.

Want me to build it?
