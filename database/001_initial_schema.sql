-- Radar Vivo — Schema inicial
-- Execute uma vez no Supabase SQL Editor
-- Projeto: https://supabase.com/dashboard/project/iyginnufctumttkkkahx/sql/new

create extension if not exists pgcrypto;

-- ============================================================
-- Tabela: companies (empresas analisadas)
-- ============================================================

create table if not exists companies (

  id uuid primary key default gen_random_uuid(),

  name text not null,

  city text,

  state text,

  category text,

  phone text,

  website text,

  rating numeric,

  reviews integer,

  google_place_id text,

  radar_score integer,

  status text default 'disponivel',

  external_id text,

  owner_id uuid,

  captured_at timestamptz,

  last_checked_at timestamptz,

  lat double precision,

  lon double precision,

  created_at timestamptz default now()

);

-- RLS para inserir/ler empresas (anon — MVP)
alter table companies enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'companies' and policyname = 'anon_insert_companies'
  ) then
    create policy "anon_insert_companies" on companies
      for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'companies' and policyname = 'anon_select_companies'
  ) then
    create policy "anon_select_companies" on companies
      for select to anon using (true);
  end if;
end $$;

-- ============================================================
-- Tabela: leads (pipeline de vendas da agência)
-- ============================================================

create table if not exists leads (

  id uuid primary key default gen_random_uuid(),

  name text not null,

  whatsapp text,

  company text not null,

  city text,

  state text,

  category text,

  score integer,

  priority text,

  status text default 'Novo',

  owner_id uuid,

  company_id uuid,

  external_id text,

  created_at timestamptz default now(),

  updated_at timestamptz default now()

);

-- RLS para leads (anon — MVP)
alter table leads enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'leads' and policyname = 'anon_insert_leads'
  ) then
    create policy "anon_insert_leads" on leads
      for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'leads' and policyname = 'anon_select_leads'
  ) then
    create policy "anon_select_leads" on leads
      for select to anon using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'leads' and policyname = 'anon_update_leads'
  ) then
    create policy "anon_update_leads" on leads
      for update to anon using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'leads' and policyname = 'anon_delete_leads'
  ) then
    create policy "anon_delete_leads" on leads
      for delete to anon using (true);
  end if;
end $$;

-- Índices de exclusividade e multi-agência
create unique index if not exists companies_external_id_idx
  on companies (external_id)
  where external_id is not null;

create index if not exists leads_owner_idx on leads (owner_id);
create index if not exists leads_company_idx on leads (company_id);
create index if not exists companies_owner_idx on companies (owner_id);

-- ============================================================
-- Tabela: reports (relatórios gerados)
-- ============================================================

create table if not exists reports (

  id uuid primary key default gen_random_uuid(),

  company_id uuid references companies(id) on delete cascade,

  summary text,

  score integer,

  created_at timestamptz default now()

);

alter table reports enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'reports' and policyname = 'anon_insert_reports'
  ) then
    create policy "anon_insert_reports" on reports
      for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'reports' and policyname = 'anon_select_reports'
  ) then
    create policy "anon_select_reports" on reports
      for select to anon using (true);
  end if;
end $$;

-- ============================================================
-- Tabela: notifications
-- ============================================================

create table if not exists notifications (

  id uuid primary key default gen_random_uuid(),

  title text,

  message text,

  type text,

  read boolean default false,

  created_at timestamptz default now()

);

alter table notifications enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'notifications' and policyname = 'anon_insert_notifications'
  ) then
    create policy "anon_insert_notifications" on notifications
      for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'notifications' and policyname = 'anon_select_notifications'
  ) then
    create policy "anon_select_notifications" on notifications
      for select to anon using (true);
  end if;
end $$;

-- ============================================================
-- Tabela: opportunities (oportunidades por empresa)
-- ============================================================

create table if not exists opportunities (

  id uuid primary key default gen_random_uuid(),

  company_id uuid references companies(id) on delete cascade,

  title text,

  description text,

  score integer,

  status text default 'ABERTA',

  created_at timestamptz default now()

);

alter table opportunities enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'opportunities' and policyname = 'anon_insert_opportunities'
  ) then
    create policy "anon_insert_opportunities" on opportunities
      for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'opportunities' and policyname = 'anon_select_opportunities'
  ) then
    create policy "anon_select_opportunities" on opportunities
      for select to anon using (true);
  end if;
end $$;
