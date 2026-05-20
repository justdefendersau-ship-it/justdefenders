-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_1500_operational_observability.sql
--
-- Timestamp:
-- 2026-05-09 15:00
--
-- Purpose:
-- - Operational telemetry
-- - Platform observability
-- =====================================================

create table if not exists telemetry_events (

  id uuid primary key
    default gen_random_uuid(),

  event_name text,

  category text,

  metadata jsonb,

  created_at timestamptz
    default now()
);

create index if not exists
idx_telemetry_category

on telemetry_events(category);

alter table telemetry_events
enable row level security;

create policy if not exists
"public_read_telemetry"

on telemetry_events

for select

using (true);
