-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-08_0800_supplier_csv_analytics.sql
--
-- Timestamp:
-- 2026-05-08 08:00
--
-- Purpose:
-- - Supplier CSV ingestion
-- - Supplier analytics
-- =====================================================

-- =====================================================
-- CSV IMPORTS
-- =====================================================

create table if not exists supplier_csv_imports (

  id uuid primary key
    default gen_random_uuid(),

  supplier_name text,

  imported_rows integer,

  valid_rows integer,

  invalid_rows integer,

  created_at timestamptz
    default now()
);

-- =====================================================
-- SUPPLIER ANALYTICS
-- =====================================================

create table if not exists supplier_analytics (

  id uuid primary key
    default gen_random_uuid(),

  supplier_name text,

  inventory_items integer,

  lead_count integer,

  lead_value numeric,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_supplier_csv_imports_supplier

on supplier_csv_imports(supplier_name);

create index if not exists
idx_supplier_analytics_supplier

on supplier_analytics(supplier_name);

-- =====================================================
-- RLS
-- =====================================================

alter table supplier_csv_imports
enable row level security;

alter table supplier_analytics
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_supplier_csv_imports"

on supplier_csv_imports

for select

using (true);

create policy if not exists
"public_read_supplier_analytics"

on supplier_analytics

for select

using (true);
