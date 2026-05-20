-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_1700_unified_dashboard_consolidation.sql
--
-- Timestamp:
-- 2026-05-09 17:00
--
-- Purpose:
-- - Unified dashboard integration
-- - Shared operational state
-- =====================================================

create table if not exists active_vehicle_context (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  selected_by text,

  created_at timestamptz
    default now()
);

create index if not exists
idx_active_vehicle_context_vin

on active_vehicle_context(vin);

alter table active_vehicle_context
enable row level security;

create policy if not exists
"public_read_vehicle_context"

on active_vehicle_context

for select

using (true);
