import { listLeads } from "@/lib/services/leads-service";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminLeadsClient from "@/components/admin/AdminLeadsClient";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let leads: Awaited<ReturnType<typeof listLeads>> = [];

  let erro: string | null = null;

  try {
    leads = await listLeads(user?.id);
  } catch (error) {
    erro = error instanceof Error ? error.message : "Erro ao carregar leads.";
  }

  return <AdminLeadsClient initialLeads={leads} initialError={erro} />;

}
