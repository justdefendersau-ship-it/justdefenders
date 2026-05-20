-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_2000_command_centre.sql
--
-- Timestamp:
-- 2026-05-07 20:00
--
-- Purpose:
-- - Unified command centre persistence
-- - Operational dashboards
-- =====================================================

-- =====================================================
-- DASHBOARD SNAPSHOTS
-- =====================================================

create table if not exists dashboard_snapshots (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  health_score numeric,

  risk_score numeric,

  telemetry jsonb,

  alerts jsonb,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_dashboard_snapshots_vin

on dashboard_snapshots(vin);

-- =====================================================
-- RLS
-- =====================================================

alter table dashboard_snapshots
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_dashboard_snapshots"

on dashboard_snapshots

for select

using (true);
