-- =====================================================
-- JustDefenders ©
-- File: supabase_conversion_tracking.sql
-- Timestamp: 2026-05-07 06:30
-- Purpose:
-- - Affiliate click attribution
-- - Conversion persistence
-- - Revenue intelligence
-- =====================================================

create table if not exists affiliate_clicks (

  id uuid primary key default gen_random_uuid(),

  tracking_id text unique not null,

  supplier text,

  part text,

  vin text,

  price numeric default 0,

  estimated_commission numeric default 0,

  converted boolean default false,

  created_at timestamp default now()
);

create table if not exists affiliate_conversions (

  id uuid primary key default gen_random_uuid(),

  tracking_id text,

  supplier text,

  revenue numeric default 0,

  created_at timestamp default now()
);

create or replace function record_conversion(
  p_tracking_id text,
  p_supplier text,
  p_revenue numeric
)
returns void
language plpgsql
as $$
begin

  insert into affiliate_conversions (
    tracking_id,
    supplier,
    revenue
  )
  values (
    p_tracking_id,
    p_supplier,
    p_revenue
  );

  update affiliate_clicks
  set converted = true
  where tracking_id = p_tracking_id;

  insert into supplier_metrics (
    supplier,
    clicks,
    conversions,
    revenue
  )
  values (
    p_supplier,
    0,
    1,
    p_revenue
  )
  on conflict (supplier)
  do update set
    conversions = supplier_metrics.conversions + 1,
    revenue = supplier_metrics.revenue + p_revenue,
    last_updated = now();

end;
$$;
