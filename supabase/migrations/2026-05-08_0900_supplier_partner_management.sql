-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-08_0900_supplier_partner_management.sql
--
-- Timestamp:
-- 2026-05-08 09:00
--
-- Purpose:
-- - Supplier onboarding
-- - Partner management
-- =====================================================

-- =====================================================
-- PARTNER APPLICATIONS
-- =====================================================

create table if not exists supplier_partner_applications (

  id uuid primary key
    default gen_random_uuid(),

  supplier_name text,

  state text,

  email text,

  inventory_capability text,

  status text
    default 'pending',

  created_at timestamptz
    default now()
);

-- =====================================================
-- PARTNERS
-- =====================================================

create table if not exists supplier_partners (

  id uuid primary key
    default gen_random_uuid(),

  supplier_name text,

  partner_status text,

  health_score numeric,

  emergency_fulfilment boolean
    default false,

  inventory_coverage numeric,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_supplier_partner_applications_name

on supplier_partner_applications(supplier_name);

create index if not exists
idx_supplier_partners_name

on supplier_partners(supplier_name);

-- =====================================================
-- RLS
-- =====================================================

alter table supplier_partner_applications
enable row level security;

alter table supplier_partners
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_supplier_partner_applications"

on supplier_partner_applications

for select

using (true);

create policy if not exists
"public_read_supplier_partners"

on supplier_partners

for select

using (true);
