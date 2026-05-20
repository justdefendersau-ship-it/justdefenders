-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1600_adaptive_learning.sql
--
-- Timestamp:
-- 2026-05-07 16:00
--
-- Purpose:
-- - Adaptive learning intelligence
-- - Feedback persistence
-- =====================================================

-- =====================================================
-- REPAIR OUTCOMES
-- =====================================================

create table if not exists repair_outcomes (

  id uuid primary key
    default gen_random_uuid(),

  vin text,

  symptom text,

  diagnosis text,

  repair text,

  supplier text,

  successful boolean,

  feedback text,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_repair_outcomes_diagnosis

on repair_outcomes(diagnosis);

create index if not exists
idx_repair_outcomes_supplier

on repair_outcomes(supplier);

-- =====================================================
-- RLS
-- =====================================================

alter table repair_outcomes
enable row level security;

-- =====================================================
-- POLICY
-- =====================================================

create policy if not exists
"public_read_repair_outcomes"

on repair_outcomes

for select

using (true);
