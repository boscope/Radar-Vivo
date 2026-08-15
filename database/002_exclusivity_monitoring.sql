-- ============================================================
-- Radar Vivo — Migração: exclusividade, multi-agência e monitoramento
-- Aplicada manualmente no Supabase (cada statement roda individual).
-- ============================================================

alter table companies add column external_id text;
alter table companies add column owner_id uuid;
alter table companies add column captured_at timestamptz;
alter table companies add column last_checked_at timestamptz;
alter table companies add column lat double precision;
alter table companies add column lon double precision;

alter table leads add column owner_id uuid;
alter table leads add column company_id uuid;
alter table leads add column updated_at timestamptz default now();
alter table leads add column external_id text;
alter table leads add column state text;

create unique index companies_external_id_idx on companies (external_id) where external_id is not null;
create index leads_owner_idx on leads (owner_id);
create index leads_company_idx on leads (company_id);
create index companies_owner_idx on companies (owner_id);
