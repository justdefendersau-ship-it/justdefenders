-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-08_0700_supplier_operations.sql
--
-- Timestamp:
-- 2026-05-08 07:00
--
-- Purpose:
-- - Supplier operations
-- - Inventory ingestion
-- - Supplier leads
-- =====================================================

-- =====================================================
-- SUPPLIERS
-- =====================================================

create table if not exists suppliers (

  id uuid primary key
    default gen_random_uuid(),

  name text,

  country text,

  state text,

  emergency_fulfilment boolean
    default false,

  inventory_feed boolean
    default false,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INVENTORY
-- =====================================================

create table if not exists supplier_inventory (

  id uuid primary key
    default gen_random_uuid(),

  supplier_id uuid,

  part_number text,

  quantity integer,

  price numeric,

  updated_at timestamptz
    default now()
);

-- =====================================================
-- LEADS
-- =====================================================

create table if not exists supplier_leads (

  id uuid primary key
    default gen_random_uuid(),

  supplier_id uuid,

  part_number text,

  urgency text,

  customer_region text,

  lead_score numeric,

  created_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_supplier_inventory_part

on supplier_inventory(part_number);

create index if not exists
idx_supplier_leads_part

on supplier_leads(part_number);

-- =====================================================
-- RLS
-- =====================================================

alter table suppliers
enable row level security;

alter table supplier_inventory
enable row level security;

alter table supplier_leads
enable row level security;

-- =====================================================
-- POLICIES
-- =====================================================

create policy if not exists
"public_read_suppliers"

on suppliers

for select

using (true);

create policy if not exists
"public_read_supplier_inventory"

on supplier_inventory

for select

using (true);

create policy if not exists
"public_read_supplier_leads"

on supplier_leads

for select

using (true);
