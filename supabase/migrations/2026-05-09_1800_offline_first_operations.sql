-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-09_1800_offline_first_operations.sql
--
-- Timestamp:
-- 2026-05-09 18:00
--
-- Purpose:
-- - Offline-first field operations
-- - Deferred synchronisation
-- =====================================================

create table if not exists offline_sync_events (

  id uuid primary key
    default gen_random_uuid(),

  sync_type text,

  sync_status text,

  metadata jsonb,

  created_at timestamptz
    default now()
);

create index if not exists
idx_offline_sync_status

on offline_sync_events(sync_status);

alter table offline_sync_events
enable row level security;

create policy if not exists
"public_read_offline_sync"

on offline_sync_events

for select

using (true);
