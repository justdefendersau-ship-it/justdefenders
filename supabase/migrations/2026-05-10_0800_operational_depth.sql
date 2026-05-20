-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-10_0800_operational_depth.sql
--
-- Timestamp:
-- 2026-05-10 08:00
--
-- Purpose:
-- - Operational depth
-- - Explainable intelligence
-- - Service forecasting
-- =====================================================

create table if not exists operational_service_forecasts (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  service_type text,

  due_km integer,

  due_date date,

  operational_priority text,

  created_at timestamptz
    default now()
);

create index if not exists
idx_operational_service_forecasts_vin

on operational_service_forecasts(vin);

alter table operational_service_forecasts
enable row level security;

create policy if not exists
"public_read_operational_service_forecasts"

on operational_service_forecasts

for select

using (true);
