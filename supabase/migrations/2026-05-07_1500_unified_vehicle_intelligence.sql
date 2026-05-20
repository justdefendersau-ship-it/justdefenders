-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1500_unified_vehicle_intelligence.sql
--
-- Timestamp:
-- 2026-05-07 15:00
--
-- Purpose:
-- - Unified vehicle intelligence
-- - Orchestration persistence
-- =====================================================

-- =====================================================
-- INTELLIGENCE EVENTS
-- =====================================================

create table if not exists intelligence_events (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  mileage integer,

  symptom text,

  dtc text,

  confidence numeric,

  risk_score numeric,

  priority text,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEX
-- =====================================================

create index if not exists
idx_intelligence_events_vin

on intelligence_events(vin);

-- =====================================================
-- RLS
-- =====================================================

alter table intelligence_events
enable row level security;

-- =====================================================
-- POLICY
-- =====================================================

create policy if not exists
"public_read_intelligence"

on intelligence_events

for select

using (true);
