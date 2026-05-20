-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1700_platform_governance.sql
--
-- Timestamp:
-- 2026-05-07 17:00
--
-- Purpose:
-- - Platform governance
-- - Audit logging
-- - Operational intelligence
-- =====================================================

-- =====================================================
-- PLATFORM LOGS
-- =====================================================

create table if not exists platform_logs (

  id uuid primary key
    default gen_random_uuid(),

  category text,

  severity text,

  message text,

  metadata jsonb,

  created_at timestamptz
    default now()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================

create table if not exists audit_logs (

  id uuid primary key
    default gen_random_uuid(),

  actor text,

  action text,

  entity text,

  entity_id text,

  metadata jsonb,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_platform_logs_category

on platform_logs(category);

create index if not exists
idx_audit_logs_entity

on audit_logs(entity);

-- =====================================================
-- RLS
-- =====================================================

alter table platform_logs
enable row level security;

alter table audit_logs
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_platform_logs"

on platform_logs

for select

using (true);

create policy if not exists
"public_read_audit_logs"

on audit_logs

for select

using (true);
