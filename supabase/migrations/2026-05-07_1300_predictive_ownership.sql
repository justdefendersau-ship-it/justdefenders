-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1300_predictive_ownership.sql
--
-- Timestamp:
-- 2026-05-07 13:00
--
-- Purpose:
-- - Predictive ownership intelligence
-- - Service history ingestion
-- =====================================================

-- =====================================================
-- SERVICE HISTORY
-- =====================================================

create table if not exists vehicle_service_history (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  service_type text,

  mileage integer,

  service_date timestamptz,

  notes text,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEX
-- =====================================================

create index if not exists
idx_vehicle_service_history_vin

on vehicle_service_history(vin);

-- =====================================================
-- RLS
-- =====================================================

alter table vehicle_service_history
enable row level security;

-- =====================================================
-- POLICY
-- =====================================================

create policy if not exists
"public_read_service_history"

on vehicle_service_history

for select

using (true);
