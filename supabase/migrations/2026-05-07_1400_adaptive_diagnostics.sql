-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1400_adaptive_diagnostics.sql
--
-- Timestamp:
-- 2026-05-07 14:00
--
-- Purpose:
-- - Adaptive diagnostics
-- - Diagnostic learning
-- =====================================================

-- =====================================================
-- DIAGNOSTIC EVENTS
-- =====================================================

create table if not exists diagnostic_events (

  id uuid primary key
    default gen_random_uuid(),

  symptom text,

  dtc text,

  probable_cause text,

  selected_parts jsonb,

  success_feedback boolean,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEX
-- =====================================================

create index if not exists
idx_diagnostic_events_symptom

on diagnostic_events(symptom);

-- =====================================================
-- RLS
-- =====================================================

alter table diagnostic_events
enable row level security;

-- =====================================================
-- POLICY
-- =====================================================

create policy if not exists
"public_read_diagnostics"

on diagnostic_events

for select

using (true);
