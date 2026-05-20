-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_1215_predictive_risk_intelligence.sql
--
-- Timestamp:
-- 2026-05-09 12:15
--
-- Purpose:
-- - Ownership operational cost intelligence
-- - Predictive maintenance intelligence
-- =====================================================

create table if not exists ownership_costs (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  cost_date date,

  type text,

  provider text,

  description text,

  cost numeric,

  state text,

  notes text,

  created_at timestamptz
    default now()
);

create index if not exists
idx_ownership_costs_vin

on ownership_costs(vin);

alter table ownership_costs
enable row level security;

create policy if not exists
"public_read_ownership_costs"

on ownership_costs

for select

using (true);
