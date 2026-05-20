-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1800_realtime_vehicle_intelligence.sql
--
-- Timestamp:
-- 2026-05-07 18:00
--
-- Purpose:
-- - Real-time telemetry persistence
-- - Vehicle sessions
-- =====================================================

-- =====================================================
-- TELEMETRY
-- =====================================================

create table if not exists realtime_telemetry (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  coolant_temp numeric,

  battery_voltage numeric,

  rpm numeric,

  speed numeric,

  maf numeric,

  boost numeric,

  ambient_temp numeric,

  created_at timestamptz
    default now()
);

-- =====================================================
-- VEHICLE SESSIONS
-- =====================================================

create table if not exists vehicle_sessions (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  started_at timestamptz,

  ended_at timestamptz,

  telemetry_count integer
    default 0
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_realtime_telemetry_vin

on realtime_telemetry(vin);

create index if not exists
idx_vehicle_sessions_vin

on vehicle_sessions(vin);

-- =====================================================
-- RLS
-- =====================================================

alter table realtime_telemetry
enable row level security;

alter table vehicle_sessions
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_realtime"

on realtime_telemetry

for select

using (true);

create policy if not exists
"public_read_sessions"

on vehicle_sessions

for select

using (true);
