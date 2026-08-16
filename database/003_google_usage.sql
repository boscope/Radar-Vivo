-- ============================================================
-- Radar Vivo — Migração: controle de uso da Google Places API
-- Aplicar manualmente no Supabase (cada statement roda individual).
--
-- Importante: rodar 1 statement por execução (o editor do Supabase
-- pode "comer" a primeira palavra quando cola SQL multi-linha).
--
-- Depois de criar a tabela, ativar RLS e policies, se aplicável.
-- ============================================================

create table google_usage (
  id uuid primary key default gen_random_uuid(),
  mes text not null unique,
  text_search_calls integer not null default 0,
  details_calls integer not null default 0,
  estimated_cost_brl numeric not null default 0,
  blocked boolean not null default false,
  updated_at timestamptz not null default now()
);
