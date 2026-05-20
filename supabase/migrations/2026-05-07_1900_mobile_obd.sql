-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1900_mobile_obd.sql
--
-- Timestamp:
-- 2026-05-07 19:00
--
-- Purpose:
-- - Mobile telemetry
-- - OBD sessions
-- =====================================================

-- =====================================================
-- MOBILE TELEMETRY
-- =====================================================

create table if not exists mobile_telemetry (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  coolant_temp numeric,

  battery_voltage numeric,

  rpm numeric,

  speed numeric,

  boost numeric,

  created_at timestamptz
    default now()
);

-- =====================================================
-- MOBILE SESSIONS
-- =====================================================

create table if not exists mobile_sessions (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  session_mode text,

  started_at timestamptz,

  ended_at timestamptz
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_mobile_telemetry_vin

on mobile_telemetry(vin);

create index if not exists
idx_mobile_sessions_vin

on mobile_sessions(vin);

-- =====================================================
-- RLS
-- =====================================================

alter table mobile_telemetry
enable row level security;

alter table mobile_sessions
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_mobile_telemetry"

on mobile_telemetry

for select

using (true);

create policy if not exists
"public_read_mobile_sessions"

on mobile_sessions

for select

using (true);
