# Qiskit Fall Fest 2026 — website + registration

Built for QET IIT Indore. Static marketing site (Next.js + Tailwind CSS)
hosted on GitHub Pages, with a small NestJS API backing two registration
forms (general attendance + hackathon teams) that writes to Supabase.

```
qff/
├── frontend/          Next.js 14 (App Router) + Tailwind, static export
├── backend/           NestJS API — validates and writes registrations
├── supabase/          SQL schema + RLS setup for Supabase
└── .github/workflows/ GitHub Actions: builds & deploys frontend to Pages
```

Why a separate backend instead of writing to Supabase straight from the
browser: the Supabase anon key would otherwise need to be public and RLS
policies would need to allow anonymous inserts, which is fine for a toy
project but easy to abuse (spam submissions, scraping attendee emails via a
misconfigured policy). Routing writes through NestJS with the **service
role** key keeps that key server-side only, and gives you one place to add
validation, rate limiting, or a confirmation email later.

---

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates
   `registrations` and `hackathon_teams` tables with RLS enabled and no
   public policies — only the service role key (used by the backend) can
   read or write them.
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key (**not** `anon`) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Run the backend (NestJS)

```bash
cd backend
cp .env.example .env
# edit .env with your Supabase URL/service key and allowed CORS origins
npm install
npm run start:dev
```

The API listens on `http://localhost:3001` by default, with two endpoints:

- `POST /registrations` — general attendee sign-up
- `POST /hackathon-registrations` — hackathon team sign-up

Both validate the payload (see `src/*/dto`) and return `409 Conflict` if the
email/team name is already registered.

**Deploying the backend:** this is a normal NestJS app, so any Node host
works — Render, Railway, Fly.io, or a small VM all work well for a student
event's traffic. Point it at your Supabase project via the same env vars,
set `CORS_ORIGINS` to your GitHub Pages URL, then update
`NEXT_PUBLIC_API_URL` (see below) to that host's URL.

## 3. Run the frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL to your backend URL
npm install
npm run dev
```

Visit `http://localhost:3000`. All event content — dates, schedule,
speakers, hackathon tracks, FAQ copy — lives in one file:
[`frontend/src/data/content.ts`](./frontend/src/data/content.ts). Edit that
file to update the site; you shouldn't need to touch components for routine
content changes.

Brand assets (Qiskit pictogram, IBM Quantum logo) are already in
`frontend/public/images/`. Drop any additional logos, sponsor marks, or
background art you have into that folder and reference them the same way
(see `Sponsors.tsx` or `Footer.tsx` for the pattern).

## 4. Deploy the frontend to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) builds and deploys
`frontend/` automatically on every push to `main`.

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions → Variables**, add a
   repository variable `NEXT_PUBLIC_API_URL` pointing at your deployed
   backend (e.g. `https://qff-api.onrender.com`).
4. Push to `main` (or run the workflow manually from the Actions tab).

The workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` automatically,
which is what GitHub Pages needs for a project site
(`https://<username>.github.io/<repo-name>/`). **If you're deploying to a
user/org root site instead** (a repo literally named
`<username>.github.io`), delete the `NEXT_PUBLIC_BASE_PATH` line in the
workflow so paths resolve from `/`.

## Local development without a backend

The forms call `NEXT_PUBLIC_API_URL`, which defaults to
`http://localhost:3001`. If you just want to work on layout/design, you can
run the frontend alone — the forms will show a friendly "couldn't reach the
server" error on submit instead of crashing.

## Customizing

- **Colors / type / spacing** — `frontend/tailwind.config.ts` and
  `frontend/src/app/globals.css`.
- **Copy, dates, schedule, speakers, FAQ** — `frontend/src/data/content.ts`.
- **Registration fields** — `frontend/src/components/RegisterForm.tsx` /
  `HackathonForm.tsx` on the frontend, and the matching DTOs in
  `backend/src/registrations/dto` / `backend/src/hackathon/dto` on the
  backend. Keep both sides in sync, and add the matching column in
  `supabase/schema.sql` if you add a field.
- **Viewing registrations** — Supabase's Table Editor is enough for a
  student event; open the `registrations` / `hackathon_teams` tables
  directly in the dashboard, or query `public.registration_counts` for a
  quick headcount.

## Notes / things you'll want to change before launch

- Speaker names, the CIM/IBM Quantum sponsor language in `Sponsors.tsx`, and
  the placeholder social links in `content.ts` are all filled with
  reasonable-looking placeholders — replace before publishing.
- The registration forms currently don't send a confirmation email. If you
  want one, the natural place is `registrations.service.ts` /
  `hackathon.service.ts` on the backend, after the Supabase insert succeeds
  (e.g. via Resend, SendGrid, or Supabase's own email provider).
- `class-validator`'s `whitelist: true` means any field not declared in a
  DTO is silently dropped — handy for safety, but worth remembering if a
  form field isn't showing up in Supabase.
