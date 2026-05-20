-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_0905_real_maintenance_intelligence.sql
--
-- Timestamp:
-- 2026-05-09 09:05
--
-- Purpose:
-- - Real maintenance intelligence
-- - Ownership operational history
-- =====================================================

create table if not exists ownership_maintenance (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  service_date date,

  supplier text,

  description text,

  parts_used text,

  labour_cost numeric,

  odometer integer,

  notes text,

  created_at timestamptz
    default now()
);

create index if not exists
idx_ownership_maintenance_vin

on ownership_maintenance(vin);

alter table ownership_maintenance
enable row level security;

create policy if not exists
"public_read_ownership_maintenance"

on ownership_maintenance

for select

using (true);
