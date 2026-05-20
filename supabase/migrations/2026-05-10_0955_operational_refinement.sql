-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-10_0955_operational_refinement.sql
--
-- Timestamp:
-- 2026-05-10 09:55
--
-- Purpose:
-- - Warranty intelligence
-- - Service workflow intelligence
-- - Expedition operational refinement
-- =====================================================

create table if not exists operational_warranty_tracking (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  component_type text,

  component_name text,

  supplier text,

  installed_date date,

  warranty_expiry date,

  metadata jsonb,

  created_at timestamptz
    default now()
);

create index if not exists
idx_operational_warranty_tracking_vin

on operational_warranty_tracking(vin);

alter table operational_warranty_tracking
enable row level security;

create policy if not exists
"public_read_operational_warranty_tracking"

on operational_warranty_tracking

for select

using (true);
