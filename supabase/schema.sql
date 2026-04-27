-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/rtnmayzfviaggouedmzq/sql

-- Professionals table (from /join form)
create table if not exists professionals (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text not null,
  type          text not null,         -- financial_advisor | property_agent | interior_designer
  licence_number text not null,
  years_experience integer not null,
  bio           text not null,
  verified      boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Consumer leads table (from /find-advisor, /find-agent, /find-designer)
create table if not exists consumer_leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null,
  category   text not null,           -- financial_advisor | property_agent | interior_designer
  details    jsonb not null default '{}',
  status     text not null default 'new',
  created_at timestamptz not null default now()
);

-- Matches table
create table if not exists matches (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references consumer_leads(id) on delete cascade,
  professional_id uuid not null references professionals(id) on delete cascade,
  status          text not null default 'pending',
  created_at      timestamptz not null default now()
);

-- Enable Row Level Security
alter table professionals    enable row level security;
alter table consumer_leads   enable row level security;
alter table matches          enable row level security;

-- Allow anyone (anon) to insert — public lead capture forms
create policy "allow_insert_professionals"
  on professionals for insert to anon with check (true);

create policy "allow_insert_consumer_leads"
  on consumer_leads for insert to anon with check (true);
