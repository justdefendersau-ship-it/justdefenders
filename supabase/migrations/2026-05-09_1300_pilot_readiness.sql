-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_1300_pilot_readiness.sql
--
-- Timestamp:
-- 2026-05-09 13:00
--
-- Purpose:
-- - Operational workflow validation
-- - Pilot readiness tracking
-- =====================================================

create table if not exists pilot_workflow_validation (

  id uuid primary key
    default gen_random_uuid(),

  workflow text,

  status text,

  priority text,

  owner_name text,

  last_tested timestamptz,

  notes text,

  created_at timestamptz
    default now()
);

create index if not exists
idx_pilot_workflow_status

on pilot_workflow_validation(status);

alter table pilot_workflow_validation
enable row level security;

create policy if not exists
"public_read_pilot_validation"

on pilot_workflow_validation

for select

using (true);
