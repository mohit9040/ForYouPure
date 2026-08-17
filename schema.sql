-- ===================================================
-- ForYouPure — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ===================================================

-- Table: leads
-- Stores email signups from the "Notify Me" form
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Table: channel_clicks
-- Logs clicks on WhatsApp / Amazon links (useful even while they're "Coming Soon",
-- so you know which channel visitors want most before you launch it)
create table if not exists channel_clicks (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('whatsapp', 'amazon')),
  clicked_at timestamptz not null default now()
);

-- ---------------------------------------------------
-- Row Level Security (RLS)
-- Required so the public anon key can INSERT (signups/clicks)
-- but cannot SELECT, UPDATE, or DELETE — visitors can only
-- add their own data, never read or change anyone else's.
-- ---------------------------------------------------

alter table leads enable row level security;
alter table channel_clicks enable row level security;

create policy "Public can insert leads"
  on leads for insert
  to anon
  with check (true);

create policy "Public can insert channel clicks"
  on channel_clicks for insert
  to anon
  with check (true);

-- Note: no SELECT policy is created for the anon role, so signups
-- are write-only from the website. To view leads, use the Supabase
-- Table Editor while logged into your own account (which uses your
-- service role, not the public anon key).
