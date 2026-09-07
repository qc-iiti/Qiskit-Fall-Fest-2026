-- Qiskit Fall Fest 2026 - Supabase schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query).
--
-- Design: the NestJS backend writes to these tables using the SERVICE ROLE
-- key, which bypasses RLS. RLS is still enabled and left with no policies,
-- so the anon/public key (used nowhere in this stack, but might leak) cannot
-- read or write anything. This keeps attendee PII out of reach of the
-- browser entirely.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- General attendee registrations
-- ---------------------------------------------------------------------------
create table if not exists public.registrations (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  full_name          text not null,
  email              text not null,
  phone              text not null,
  institution        text not null,
  year_of_study      text not null,
  attendance_mode    text not null check (attendance_mode in ('in-person', 'online')),
  experience_level   text not null check (experience_level in ('beginner', 'intermediate', 'advanced')),
  interests          text[] not null default '{}',
  hear_about_us      text,
  constraint registrations_email_unique unique (email)
);

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

alter table public.registrations enable row level security;
-- No policies are defined: only requests authenticated with the service role
-- key (used exclusively by the backend) can read or write this table.

-- ---------------------------------------------------------------------------
-- Hackathon team registrations
-- ---------------------------------------------------------------------------
create table if not exists public.hackathon_teams (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  team_name           text not null,
  track               text not null,
  attendance_mode     text not null check (attendance_mode in ('in-person', 'online')),
  problem_statement   text,
  leader_name         text not null,
  leader_email        text not null,
  leader_phone        text not null,
  leader_institution  text not null,
  -- Each member: { "full_name": string, "email": string, "institution": string }
  members             jsonb not null default '[]',
  github_url          text,
  agreed_to_rules     boolean not null default false,
  constraint hackathon_teams_team_name_unique unique (team_name),
  constraint hackathon_teams_leader_email_unique unique (leader_email)
);

create index if not exists hackathon_teams_created_at_idx on public.hackathon_teams (created_at desc);

alter table public.hackathon_teams enable row level security;
-- Same as above: service-role only, no anon/public policies.

-- ---------------------------------------------------------------------------
-- Optional: a view for quick counts if you want a lightweight admin glance
-- from the Supabase dashboard's Table Editor -> SQL Editor.
-- ---------------------------------------------------------------------------
create or replace view public.registration_counts as
select
  (select count(*) from public.registrations) as attendee_count,
  (select count(*) from public.hackathon_teams) as team_count,
  (select coalesce(sum(jsonb_array_length(members)), 0) + count(*) from public.hackathon_teams) as hacker_count;
