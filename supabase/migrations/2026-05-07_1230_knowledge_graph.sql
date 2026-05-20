-- =====================================================
-- JustDefenders ©
-- File:
-- C:\dev\justdefenders\frontend\supabase\migrations\2026-05-07_1230_knowledge_graph.sql
--
-- Timestamp:
-- 2026-05-07 12:30
--
-- Purpose:
-- - Persistent knowledge graph
-- - Intelligence persistence
-- =====================================================

-- =====================================================
-- KNOWLEDGE NODES
-- =====================================================

create table if not exists knowledge_nodes (

  id uuid primary key
    default gen_random_uuid(),

  part_number text not null,

  category text,

  source text,

  title text,

  insights jsonb,

  confidence numeric,

  metadata jsonb,

  created_at timestamptz
    default now(),

  updated_at timestamptz
    default now()
);

-- =====================================================
-- RELATIONSHIPS
-- =====================================================

create table if not exists knowledge_relationships (

  id uuid primary key
    default gen_random_uuid(),

  from_part text not null,

  to_part text not null,

  relationship_type text,

  created_at timestamptz
    default now(),

  updated_at timestamptz
    default now()
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists
idx_knowledge_nodes_part

on knowledge_nodes(part_number);

create index if not exists
idx_relationships_from

on knowledge_relationships(from_part);

create index if not exists
idx_relationships_to

on knowledge_relationships(to_part);

-- =====================================================
-- RLS
-- =====================================================

alter table knowledge_nodes
enable row level security;

alter table knowledge_relationships
enable row level security;

-- =====================================================
-- PUBLIC READ
-- =====================================================

create policy if not exists
"public_read_nodes"

on knowledge_nodes

for select

using (true);

create policy if not exists
"public_read_relationships"

on knowledge_relationships

for select

using (true);
