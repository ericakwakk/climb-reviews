-- climb-reviews database schema
-- Run in the Supabase SQL Editor. "--" starts a comment; the database ignores it.


-- ============================================================
-- gyms: one row per climbing gym
-- ============================================================

create table public.gyms (
  id bigint generated always as identity primary key,  -- auto-numbered 1, 2, 3…
  slug text not null unique,          -- used in the URL: /gyms/brooklyn-boulders
  name text not null,
  neighborhood text,                  -- optional; mostly for NYC
  city text not null,
  state text not null,                -- two-letter code, e.g. NY
  type text not null
    check (type in ('bouldering', 'ropes', 'both')),
  website text,
  google_place_id text unique,        -- optional until gyms are matched to Google
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz not null default now()
);

-- Lock 1: let the site reach this table (read only).
-- anon = visitors who aren't signed in; authenticated = signed-in users.
grant select on public.gyms to anon, authenticated;

-- Lock 2: Row Level Security. On means "deny everything unless a policy allows it".
alter table public.gyms enable row level security;

-- Policy: anyone can read every gym.
create policy "Anyone can read gyms"
  on public.gyms
  for select
  using (true);
