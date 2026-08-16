-- Políticas RLS para a tabela google_usage (permitir o servidor gravar)
-- Rodar 1 statement por execução no SQL Editor.

create policy "google_usage_select" on google_usage for select to anon using (true);

create policy "google_usage_insert" on google_usage for insert to anon with check (true);

create policy "google_usage_update" on google_usage for update to anon using (true) with check (true);
